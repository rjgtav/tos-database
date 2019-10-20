import csv
import httplib
import logging
import multiprocessing
import os
import threading
import urllib
import xml.etree.ElementTree as ET

from PIL import Image, ImageDraw, ImageColor, ImageFilter

import constants
from utils import imageutil, tokutil, fileutil, jsonutil
from utils.enumutil import TOSRegion

MAPS_SCALE = 0.2

WHITELIST_BASESKINSET = [
    'bosscard2',
    'minimap_icons',
    'sub_card3',
    'wearing_weapon',
]

WHITELIST_RGB = [
    'bosscard2',
    'sub_card3',
]

threads = []
threads_error = False
threads_semaphore = threading.Semaphore(multiprocessing.cpu_count() * 2)


def parse(region, update):
    if not update:
        return

    # Parse icons
    parse_icons()
    #parse_icons('baseskinset.xml', region)
    #parse_icons('classicon.xml', region)
    #parse_icons('itemicon.xml', region)
    #parse_icons('mongem.xml', region)
    #parse_icons('monillust.xml', region)
    #parse_icons('skillicon.xml', region)

    # Parse images
    parse_images_jobs(region)
    parse_images_maps(region)


def parse_icons():
    global threads, threads_semaphore
    logging.debug("Parsing icons...")

    images = {}
    images_tga = []
    path = os.path.join(constants.PATH_INPUT_DATA, 'ui.ipf')

    # Collect all image IDs and their respective rects
    for xml in fileutil.walk(os.path.join(path, 'baseskinset'), '*.xml'):
        xml_data = ET.parse(xml).getroot()

        for image in [image for imagelist in xml_data if imagelist.tag == 'imagelist' for image in imagelist]:
            file = image.get('file').replace('\\', '/').lower()[1:]
            images[image.get('name')] = ';'.join([file.replace('.tga', '.png'), image.get('imgrect')])

            if image.get('file').endswith('.tga'):
                images_tga.append(os.path.join(path, file))

    # Convert all TGA images to PNG, in parallel
    for tga in [image for image in set(images_tga) if os.path.exists(image)]:
        threads_semaphore.acquire()
        thread = ParseIconsThread(tga)
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    if threads_error:
        raise Exception

    # Update ui.json.js
    jsonutil.dump(images, os.path.join(constants.PATH_WEB_WWW_ASSETS_REGION_UI, 'ui.json.js'))

    # Create a symlink for all ui.ipf folders
    for dir in [d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]:
        link = os.path.join(constants.PATH_WEB_WWW_ASSETS_REGION_UI, dir)
        link_target = os.path.join(path, dir)

        fileutil.symlink(link, link_target)
        if not os.path.exists(link):
            os.symlink(os.path.relpath(link_target, constants.PATH_WEB_WWW_ASSETS_REGION), link)


class ParseIconsThread(threading.Thread):
    def __init__(self, image):
        threading.Thread.__init__(self)

        self.image = image

    def run(self):
        global threads_error, threads_semaphore

        try:
            imageutil.png(self.image)
        except:
            logging.error('Failed to parse icons. image: %s', self.image)
            threads_error = True
            raise
        finally:
            threads_semaphore.release()

#def parse_icons(file_name, region):
#    global threads, threads_semaphore
#    logging.debug('Parsing icons from %s...', file_name)
#
#    data_path = os.path.join(constants.PATH_INPUT_DATA, 'ui.ipf', 'baseskinset', file_name)
#    data = ET.parse(data_path).getroot()
#    threads = []
#
#    # example: <imagelist category="Monster_icon_boss_02">
#    # example: <image name="icon_wizar_energyBolt" file="\icon\skill\wizard\icon_wizar_energyBolt.png" />
#    for work in [(image, imagelist) for imagelist in data for image in imagelist]:
#        threads_semaphore.acquire()
#        thread = ParseIconsThread(region, file_name, work[0], work[1])
#        thread.start()
#        threads.append(thread)
#
#    for thread in threads:
#        thread.join()
#
#    if threads_error:
#        raise Exception

#class ParseIconsThread(threading.Thread):
#    def __init__(self, region, xml_file, xml_image, xml_imagelist):
#        threading.Thread.__init__(self)
#
#        self.region = region
#        self.xml_file = xml_file
#        self.xml_image = xml_image
#        self.xml_image_category = xml_imagelist.get('category')
#
#    def run(self):
#        global threads_error, threads_semaphore
#
#        try:
#            file = self.xml_file
#            image = self.xml_image
#            image_category = self.xml_image_category
#
#            if image.get('file') is None or image.get('name') is None:
#                return
#            if file == 'baseskinset.xml' and image_category not in WHITELIST_BASESKINSET:
#                return
#
#            image_extension = '.jpg' if image_category in WHITELIST_RGB else '.png'
#            image_file = image.get('file').split('\\')[-1].lower()
#            image_name = image.get('name').lower()
#            image_rect = tuple(int(x) for x in image.get('imgrect').split()) if len(image.get('imgrect')) else None  # top, left, width, height
#
#            # Copy icon to web assets folder
#            copy_from = os.path.join(constants.PATH_INPUT_DATA, 'ui.ipf', *image.get('file').lower().split('\\')[:-1])
#            copy_from = os.path.join(copy_from, image_file)
#            copy_to = os.path.join(constants.PATH_WEB_WWW_ASSETS_ICONS, image_name + image_extension)
#
#            if not os.path.isfile(copy_from):
#                # Note for future self:
#                # if you find missing files due to wrong casing, go to the Hotfix at unpacker.py and force lowercase
#                #logging.warning('Non-existing icon: %s', copy_from)
#                return
#
#            if self.region == TOSRegion.kTEST or not os.path.isfile(copy_to):
#                shutil.copy(copy_from, copy_to)
#
#                # Crop, Resize, Optimize and convert to JPG/PNG
#                image_mode = 'RGB' if image_extension == '.jpg' else 'RGBA'
#                image_size = IMAGE_SIZE[image_category] if image_category in IMAGE_SIZE else (image_rect[2], image_rect[3])
#                image_size = (80, 80) if file == 'classicon.xml' else image_size
#                image_size = (80, 80) if file == 'skillicon.xml' else image_size
#
#                imageutil.optimize(copy_to, image_mode, image_rect, image_size)
#        except:
#            logging.error('Failed to parse icons. xml_file: %s, xml_image: %s, xml_image_category: %s', self.xml_file, self.xml_image, self.xml_image_category)
#            threads_error = True
#            raise
#        finally:
#            threads_semaphore.release()


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