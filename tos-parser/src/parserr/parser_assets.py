import csv
import httplib
import logging
import multiprocessing
import os
import threading
import urllib
import xml.etree.ElementTree as ET

from PIL import Image, ImageDraw, ImageColor, ImageFilter
from wand.image import Image as WandImage

import constants
from utils import imageutil, tokutil, fileutil, jsonutil, xacutil
from utils.enumutil import TOSRegion

MAPS_SCALE = 0.2

BLACKLIST_MODELS = [
    'char_hi.ipf/pc/faces/'
]

BLACKLIST_TEXTURES = [
    'char_texture.ipf/pc/face/'
]

threads = []
threads_error = False
threads_semaphore = threading.Semaphore(multiprocessing.cpu_count() * 2)


def parse(region, update):
    if not update:
        return

    # Parse icons
    parse_icons()

    # Parse images
    parse_images_jobs(region)
    #TODO: parse_images_maps(region)

    # Parse models & textures
    parse_models()
    #TODO: parse_textures()


def parse_icons():
    global threads, threads_semaphore
    logging.debug("Parsing icons...")

    images = {}
    images_path = os.path.join(constants.PATH_INPUT_DATA, 'ui.ipf')

    def texture(path):
        return path.replace('\\', '/').lower()[1:].replace('.tga', '.png')

    # Collect all image IDs and their respective rects
    for xml in fileutil.walk(os.path.join(images_path, 'baseskinset'), '*.xml'):
        xml_data = ET.parse(xml).getroot()

        for element in xml_data:
            if element.tag in ['effectimagelist', 'fontlist', 'spriteimagelist']:
                continue

            if element.tag == 'skinlist':
                skinlist = element

                for skin in skinlist:
                    for img in skin:
                        key = '%s/%s' % (skin.get('name'), img.get('name'))
                        value = '%s;%s' % (texture(skin.get('texture')), img.get('imgrect'))

                        images[key.lower()] = value.lower()

            elif element.tag == 'imagelist':
                imagelist = element

                for image in imagelist:
                    key = '%s' % (image.get('name'))
                    value = '%s;%s' % (texture(image.get('file')), image.get('imgrect'))

                    images[key.lower()] = value.lower()
            else:
                raise Exception('Unsupported tag: %s' % element.tag)

    # Convert all TGA images to PNG, in parallel
    for tga in fileutil.walk(images_path, '*.tga'):
        threads_semaphore.acquire()
        thread = ParseIconsThread(tga)
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    if threads_error:
        raise Exception

    # Update ui.json
    jsonutil.dump(images, os.path.join(constants.PATH_WEB_WWW_ASSETS_REGION_UI, 'ui.json'))

    # Create symlinks
    fileutil.symlink_dirs(constants.PATH_WEB_WWW_ASSETS_REGION_UI, images_path)


class ParseIconsThread(threading.Thread):
    def __init__(self, image):
        threading.Thread.__init__(self)

        self.image = image

    def run(self):
        global threads_error, threads_semaphore

        try:
            imageutil.png(self.image)
            os.remove(self.image)
        except:
            logging.error('Failed to parse icons. image: %s', self.image)
            threads_error = True
            raise
        finally:
            threads_semaphore.release()


def parse_images_jobs(region):
    global threads, threads_semaphore

    if region != TOSRegion.kTEST:
        return

    logging.debug('Parsing images from Jobs...')
    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'job.ies')
    threads = []

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            image_path = os.path.join(constants.PATH_WEB_WWW_ASSETS_IMAGES, 'classes', row['ClassName'])
            image_path_f = image_path + '_f.gif'
            image_path_m = image_path + '_m.gif'

            if os.path.exists(image_path_f):
                continue

            treeofsavior_domain = 'http://tosweb.vod.nexoncdn.co.kr'
            treeofsavior_path_f = 'Job_sd_w/' + row['ClassID'] + '.gif'
            treeofsavior_path_m = 'Job_sd_m/' + row['ClassID'] + '.gif'

            threads_semaphore.acquire()
            thread = ParseImagesJobsThread(treeofsavior_domain, treeofsavior_path_f, image_path_f)
            thread.start()
            threads.append(thread)

            threads_semaphore.acquire()
            thread = ParseImagesJobsThread(treeofsavior_domain, treeofsavior_path_m, image_path_m)
            thread.start()
            threads.append(thread)

    for thread in threads:
        thread.join()

    if threads_error:
        raise Exception


class ParseImagesJobsThread(threading.Thread):
    def __init__(self, domain, path, path_destination):
        threading.Thread.__init__(self)

        self.domain = domain
        self.path = path
        self.path_destination = path_destination

    def run(self):
        global threads_error, threads_semaphore

        try:
            if self.domain.startswith('https://'):
                conn = httplib.HTTPSConnection(self.domain.split('://')[1])
                conn.request('HEAD', self.path)
            else:
                conn = httplib.HTTPConnection(self.domain.split('://')[1])
                conn.request('HEAD', self.path)

            response = conn.getresponse()
            conn.close()

            if response.status != 200:
                logging.warn('Failed to retrieve job image: %s, status %s', os.path.join(self.domain, self.path), response.status)
                return

            urllib.urlretrieve(os.path.join(self.domain, self.path), self.path_destination)
        except:
            logging.error('Failed to parse images jobs. domain: %s, path: %s, path_destination: %s', self.domain, self.path, self.path_destination)
            threads_error = True
            raise
        finally:
            threads_semaphore.release()


def parse_images_maps(region):
    global threads, threads_semaphore
    logging.debug('Parsing images from Maps...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'map.ies')
    threads = []

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            threads_semaphore.acquire()
            thread = ParseImagesMapsThread(region, row)
            thread.start()
            threads.append(thread)

    for thread in threads:
        thread.join()

    if threads_error:
        raise Exception


class ParseImagesMapsThread(threading.Thread):
    def __init__(self, region, row):
        threading.Thread.__init__(self)

        self.region = region
        self.row = row

    def run(self):
        global threads_error, threads_semaphore

        region = self.region
        row = self.row

        try:
            # TODO: in the future I should reconsider just storing the XML data (maybe in a more compressed version) and render the 2D mesh on the client
            image_path = os.path.join(constants.PATH_WEB_WWW_ASSETS_IMAGES_MAPS, row['ClassName'].lower() + '.png')
            tok_path = os.path.join(constants.PATH_INPUT_DATA, 'bg.ipf', row['ClassName'].lower() + '.tok')

            if not os.path.exists(tok_path):
                return
            if region != TOSRegion.kTEST and os.path.exists(image_path):
                return

            # Parse .tok mesh file
            tok_file = open(tok_path, 'rb')
            tok_xml = tokutil.tok2xml(tok_file)

            mesh3D = [elem for elem in tok_xml.getchildren() if elem.tag == 'mesh3D'][0]
            mesh3DVerts = [elem for elem in mesh3D.getchildren() if elem.tag == 'verts'][0]
            mappingTo2D = [elem for elem in tok_xml.getchildren() if elem.tag == 'mappingTo2D'][0]

            polygons = []

            for polygon in mappingTo2D.getchildren():
                points = []

                for edge in polygon.getchildren():
                    vertex = mesh3DVerts.getchildren()[int(edge.attrib['startVert'])]
                    points.append((int(vertex.attrib['x']), -int(vertex.attrib['y'])))

                polygons.append(points)

            # Free some memory before continuing
            tok_file.close()
            tok_xml.clear()

            del mesh3D
            del mesh3DVerts
            del mappingTo2D
            del tok_xml

            # Scale map to save some space
            image_height = int(round(int(row['Height']) * MAPS_SCALE))
            image_width = int(round(int(row['Width']) * MAPS_SCALE))

            offset_x = image_width / 2.0
            offset_y = image_height / 2.0

            # Render map to image
            image = Image.new("RGBA", (image_width, image_height), (0, 0, 0, 0))
            image_draw = ImageDraw.Draw(image)

            for points in polygons:
                # Make sure coordinates are centered
                points = [(int(offset_x + coords[0] * MAPS_SCALE), int(offset_y + coords[1] * MAPS_SCALE)) for coords in points]

                image_draw.polygon(points, fill=ImageColor.getrgb('#F2BC65'))

            # Add a shadow
            image_shadow = imageutil.replace_color(image, ImageColor.getcolor('#F2BC65', 'RGBA'), ImageColor.getcolor('#000000', 'RGBA'))
            image_shadow = image_shadow.filter(ImageFilter.GaussianBlur(2))
            image = Image.composite(image, image_shadow, image_shadow)

            # Save image to disk
            image.save(image_path, optimize=True)
            image.close()
            image_shadow.close()
        except:
            logging.error('Failed to parse images maps. row: %s', self.row)
            threads_error = True
            raise
        finally:
            threads_semaphore.release()


def parse_models():
    global threads, threads_semaphore
    logging.debug("Parsing models...")

    list_path = [
        os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf'),
        os.path.join(constants.PATH_INPUT_DATA, 'item_hi.ipf'),
    ]

    for path in list_path:
        for xac in fileutil.walk(path, '*.xac'):
            if any(p in xac.lower() for p in BLACKLIST_MODELS):
                continue

            threads_semaphore.acquire()
            thread = ParseModelsThread(xac)
            thread.start()
            threads.append(thread)

    for thread in threads:
        thread.join()

    if threads_error:
        raise Exception

    # Create symlinks
    for path in list_path:
        fileutil.symlink(os.path.join(constants.PATH_WEB_WWW_ASSETS_REGION_3D, os.path.basename(path).replace('.ipf', '')), path)


class ParseModelsThread(threading.Thread):
    def __init__(self, xac):
        threading.Thread.__init__(self)

        self.xac = xac

    def run(self):
        global threads_error, threads_semaphore

        try:
            xacutil.xac2obj(self.xac)
            #TODO: os.remove(self.xac)
        except:
            logging.error('Failed to parse models. xac: %s', self.xac)
            threads_error = True
            raise
        finally:
            threads_semaphore.release()


def parse_textures():
    global threads, threads_semaphore
    logging.debug("Parsing textures...")

    list_path = [
        os.path.join(constants.PATH_INPUT_DATA, 'char_texture.ipf'),
        os.path.join(constants.PATH_INPUT_DATA, 'item_texture.ipf'),
    ]

    for path in list_path:
        for dds in fileutil.walk(path, '*.dds'):
            if any(p in dds.lower() for p in BLACKLIST_TEXTURES):
                continue

            threads_semaphore.acquire()
            thread = ParseTexturesThread(dds)
            thread.start()
            threads.append(thread)

    for thread in threads:
        thread.join()

    if threads_error:
        raise Exception

    # Create symlinks
    for path in list_path:
        fileutil.symlink(os.path.join(constants.PATH_WEB_WWW_ASSETS_REGION_3D, os.path.basename(path).replace('.ipf', '')), path)


class ParseTexturesThread(threading.Thread):
    def __init__(self, dds):
        threading.Thread.__init__(self)

        self.dds = dds

    def run(self):
        global threads_error, threads_semaphore

        try:
            logging.debug('Parsing textures... %s' % self.dds)

            # Note: unfortunately Pillow, despite being faster, doesn't support all variants of the .dds format, so we have to use wand
            with WandImage(filename=self.dds) as img:
                img.compression = "no"
                img.save(filename=self.dds.lower().replace('.dds', '.png'))

            #TODO: os.remove(self.image)
        except:
            logging.error('Failed to parse textures. dds: %s', self.dds)
            threads_error = True
            raise
        finally:
            threads_semaphore.release()
