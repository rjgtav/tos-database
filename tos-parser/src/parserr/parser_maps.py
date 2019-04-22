import csv
import logging
import os

from PIL import Image, ImageDraw, ImageColor, ImageFilter

import constants
import globals
from parserr import parser_translations
from parserr.parser_enums import TOSRegion
from utils import tokutil, imageutil
from utils.tosenum import TOSEnum

MAP_SCALE = 0.2


class TOSMapType(TOSEnum):
    BARRACK = 0
    CITY = 1
    DUNGEON = 2
    FIELD = 3
    INSTANCE = 4
    LOGIN = 5

    @staticmethod
    def value_of(string):
        return {
            'BARRACK': TOSMapType.BARRACK,
            'CITY': TOSMapType.CITY,
            'DUNGEON': TOSMapType.DUNGEON,
            'FIELD': TOSMapType.FIELD,
            'INSTANCE': TOSMapType.INSTANCE,
            'LOGIN': TOSMapType.LOGIN,
            '': None
        }[string.upper()]


def parse(region, version_update):
    parse_maps()


def parse_maps():
    logging.debug('Parsing Maps...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'map.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            obj = {}
            obj['$ID'] = int(row['ClassID'])
            obj['$ID_NAME'] = row['ClassName']
            obj['Icon'] = None
            obj['Name'] = parser_translations.translate(row['Name'])

            obj['HasChallengeMode'] = row['ChallengeMode'] == 'YES'
            obj['HasWarp'] = int(row['WarpCost']) > 0
            obj['Level'] = int(row['QuestLevel'])
            obj['Prop_EliteMonsterCapacity'] = int(row['EliteMonsterCapacity'])
            obj['Prop_MaxHateCount'] = int(row['MaxHateCount'])
            obj['Prop_RewardEXPBM'] = float(row['MaxHateCount'])
            obj['Stars'] = int(row['MapRank'])
            obj['Type'] = TOSMapType.value_of(row['MapType'])
            obj['Warp'] = int(row['WarpCost'])
            obj['WorldMap'] = [int(coord) for coord in row['WorldMap'].split('/')] if row['WorldMap'] else None

            obj['Link_Items'] = []
            obj['Link_Items_Exploration'] = []
            obj['Link_Maps'] = []
            obj['Link_Maps_Floors'] = []
            obj['Link_NPCs'] = []

            globals.maps[obj['$ID']] = obj
            globals.maps_by_name[obj['$ID_NAME']] = obj
            globals.maps_by_position['-'.join(row['WorldMap'].split('/')) if obj['WorldMap'] else ''] = obj


def parse_maps_images(region, version_update):
    logging.debug('Parsing Maps images...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'map.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            image_path = os.path.join(constants.PATH_BUILD_ASSETS_IMAGES_MAPS, row['ClassName'].lower() + '.png')
            tok_path = os.path.join(constants.PATH_INPUT_DATA, 'bg.ipf', row['ClassName'].lower() + '.tok')

            if not os.path.exists(tok_path):
                continue
            if not (region == TOSRegion.kTEST and version_update) and os.path.exists(image_path):
                continue

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
            image_height = int(round(int(row['Height']) * MAP_SCALE))
            image_width = int(round(int(row['Width']) * MAP_SCALE))

            offset_x = image_width / 2.0
            offset_y = image_height / 2.0

            # Render map to image
            image = Image.new("RGBA", (image_width, image_height), (0, 0, 0, 0))
            image_draw = ImageDraw.Draw(image)

            for points in polygons:
                # Make sure coordinates are centered
                points = [(int(offset_x + coords[0] * MAP_SCALE), int(offset_y + coords[1] * MAP_SCALE)) for coords in points]

                image_draw.polygon(points, fill=ImageColor.getrgb('#F2BC65'))

            # Add a shadow
            image_shadow = imageutil.replace_color(image, ImageColor.getcolor('#F2BC65', 'RGBA'), ImageColor.getcolor('#000000', 'RGBA'))
            image_shadow = image_shadow.filter(ImageFilter.GaussianBlur(2))
            image = Image.composite(image, image_shadow, image_shadow)

            # Save image to disk
            image.save(image_path, optimize=True)
            image.close()
            image_shadow.close()


def parse_links():
    parse_links_items()
    parse_links_items_rewards()
    parse_links_maps()
    parse_links_npcs()


def parse_links_items():
    logging.debug('Parsing Maps <> Items...')

    for map in globals.maps.values():
        ies_file = 'zonedropitemlist_' + map['$ID_NAME'] + '.ies'
        ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_drop.ipf', 'zonedrop', ies_file.lower())

        try:
            drops = []

            with open(ies_path, 'rb') as ies_file:
                for zone_drop in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                    if len(zone_drop['ItemClassName']) > 0:
                        drops.append({
                            'ItemClassName': zone_drop['ItemClassName'],
                            'DropRatio': int(zone_drop['DropRatio']) / 100.0,
                            'Money_Max': int(zone_drop['Money_Max']),
                            'Money_Min': int(zone_drop['Money_Min']),
                        })

                    if len(zone_drop['DropGroup']) > 0:
                        ies_file = zone_drop['DropGroup'] + '.ies'
                        ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_drop.ipf', 'dropgroup', ies_file.lower())

                        with open(ies_path, 'rb') as ies_file:
                            for group_drop in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                                drops.append({
                                    'ItemClassName': group_drop['ItemClassName'],
                                    'DropRatio': (int(group_drop['DropRatio']) / 100.0) * (int(zone_drop['DropRatio']) / 100.0),
                                    'Money_Max': 0,
                                    'Money_Min': 0,
                                })

                for drop in drops:
                    item_link = {
                        'Chance': drop['DropRatio'],
                        'Item': globals.get_item_link(drop['ItemClassName']),
                        'Quantity_MAX': drop['Money_Max'],
                        'Quantity_MIN': drop['Money_Min'],
                    }

                    map_link = {
                        'Chance': drop['DropRatio'],
                        'Map': globals.get_map_link(map['$ID_NAME']),
                        'Quantity_MAX': drop['Money_Max'],
                        'Quantity_MIN': drop['Money_Min'],
                    }

                    globals.link(
                        map_link['Map'].entity, 'Link_Items', map_link,
                        item_link['Item'].entity, 'Link_Maps', item_link
                    )

        except IOError:
            continue


def parse_links_items_rewards():
    logging.debug('Parsing Maps <> Items (Rewards)...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'map.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            if int(row['MapRatingRewardCount1']) == 0 or len(row['MapRatingRewardItem1']) == 0:
                continue

            item = globals.get_item_link(row['MapRatingRewardItem1']).entity
            item_link = globals.get_item_link(row['MapRatingRewardItem1'])
            item_link = {
                'Chance': 1,
                'Item': item_link,
                'Quantity_MAX': int(row['MapRatingRewardCount1']),
                'Quantity_MIN': int(row['MapRatingRewardCount1']),
            }

            map = globals.maps_by_name[row['ClassName']]
            map_link = globals.get_map_link(map['$ID_NAME'])
            map_link = {
                'Chance': 1,
                'Map': map_link,
                'Quantity_MAX': int(row['MapRatingRewardCount1']),
                'Quantity_MIN': int(row['MapRatingRewardCount1']),
            }

            globals.link(
                map, 'Link_Items_Exploration', map_link,
                item, 'Link_Maps_Exploration', item_link
            )


def parse_links_maps():
    logging.debug('Parsing Maps <> Maps...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'map.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            if len(row['PhysicalLinkZone']) == 0:
                continue

            map = globals.maps_by_name[row['ClassName']]
            map['Link_Maps'] = [globals.get_map_link(name) for name in row['PhysicalLinkZone'].split('/')]

            map_link = globals.get_map_link(map['$ID_NAME'])

            # Floors
            if map['WorldMap'] is not None and map['WorldMap'][2] > 0:
                map_ground_floor = globals.maps_by_position['-'.join([str(i) for i in (map['WorldMap'][0:2] + [1])])]
                map_ground_floor['Link_Maps_Floors'].append(map_link)


def parse_links_npcs():
    logging.debug('Parsing Maps <> NPCs...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'map.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            map = globals.maps_by_name[row['ClassName']]
            map_offset_x = int(round(int(row['Width']) / 2.0))
            map_offset_y = int(round(int(row['Height']) / 2.0))

            anchors = {}

            # Spawn Positions (aka Anchors)
            ies_file = 'anchor_' + map['$ID_NAME'] + '.ies'
            ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_mongen.ipf', ies_file.lower())

            try:
                with open(ies_path, 'rb') as ies_file:
                    for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                        obj = anchors[row['GenType']] if row['GenType'] in anchors else []
                        obj.append([
                            int((map_offset_x + float(row['PosX'])) * MAP_SCALE),
                            int((map_offset_y - float(row['PosZ'])) * MAP_SCALE),
                        ])

                        anchors[row['GenType']] = obj
            except IOError:
                continue

            # Spawn NPCs
            ies_file = 'gentype_' + map['$ID_NAME'] + '.ies'
            ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_mongen.ipf', ies_file.lower())

            try:
                with open(ies_path, 'rb') as ies_file:
                    for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                        if globals.get_npc_link(row['ClassType']) is None:
                            continue
                        if row['GenType'] not in anchors:
                            continue

                        map_link = globals.get_map_link(map['$ID_NAME'])
                        map_link = {
                            'Map': map_link,
                            'Population': int(row['MaxPop']),
                            'TimeRespawn': int(row['RespawnTime']),
                        }

                        npc = globals.get_npc_link(row['ClassType']).entity
                        npc_link = globals.get_npc_link(row['ClassType'])
                        npc_link = {
                            'NPC': npc_link,
                            'Population': int(row['MaxPop']),
                            'Positions': anchors[row['GenType']],
                            'TimeRespawn': int(row['RespawnTime']),
                        }

                        globals.link(
                            map, 'Link_NPCs', map_link,
                            npc, 'Link_Maps', npc_link
                        )
            except IOError:
                continue
