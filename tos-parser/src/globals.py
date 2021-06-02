#from multiprocessing import Manager

import constants

assets_icons = {}
#assets_icons = Manager().dict()
#assets_icons_used = []

attributes = {}
attributes_by_name = {}
books = {}
books_by_name = {}
cards = {}
cards_by_name = {}
jobs = {}
jobs_by_name = {}
collections = {}
collections_by_name = {}
cubes = {}
cubes_by_name = {}
cubes_by_stringarg = {}
gems = {}
gems_by_name = {}
equipment = {}
equipment_by_name = {}
equipment_sets = {}
equipment_sets_by_name = {}
items = {}
items_by_name = {}
maps = {}
maps_by_name = {}
maps_by_position = {}
monsters = {}
monsters_by_name = {}
npcs = {}
npcs_by_name = {}
recipes = {}
recipes_by_name = {}
skills = {}
skills_by_name = {}
translations = {}

all_items_by_name = [
    books_by_name,
    cards_by_name,
    collections_by_name,
    cubes_by_name,
    gems_by_name,
    equipment_by_name,
    items_by_name,
    recipes_by_name
]
all_npcs_by_name = [
    monsters_by_name,
    npcs_by_name,
]


def get_attribute_link(name):
    return _get_entity_link(name, attributes_by_name)


def get_book_link(name):
    return _get_entity_link(name, books_by_name)


def get_card_link(name):
    return _get_entity_link(name, cards_by_name)


def get_job_link(name):
    return _get_entity_link(name, jobs_by_name)


def get_collection_link(name):
    return _get_entity_link(name, collections_by_name)


def get_cube_link(name):
    return _get_entity_link(name, cubes_by_name)


def get_gem_link(name):
    return _get_entity_link(name, gems_by_name)


def get_equipment_link(name):
    return _get_entity_link(name, equipment_by_name)


def get_equipment_set_link(name):
    return _get_entity_link(name, equipment_sets_by_name)


def get_item_link(name):
    for xx_by_name in all_items_by_name:
        link = _get_entity_link(name, xx_by_name)

        if link is not None:
            return link

    return None


def get_map_link(name):
    return _get_entity_link(name, maps_by_name)


def get_monster_link(name):
    return _get_entity_link(name, monsters_by_name)


def get_npc_link(name):
    for xx_by_name in all_npcs_by_name:
        link = _get_entity_link(name, xx_by_name)

        if link is not None:
            return link

    return None


def get_recipe_link(name):
    return _get_entity_link(name, recipes_by_name)


def get_skill_link(name):
    return _get_entity_link(name, skills_by_name)


def _get_entity_link(name, collection):
    if not isinstance(name, str):
        name = name['$ID_NAME']
    if name not in collection:
        return None

    collection_path = None
    collection_path = constants.OUTPUT_ATTRIBUTES if collection == attributes_by_name else collection_path
    collection_path = constants.OUTPUT_BOOKS if collection == books_by_name else collection_path
    collection_path = constants.OUTPUT_CARDS if collection == cards_by_name else collection_path
    collection_path = constants.OUTPUT_JOBS if collection == jobs_by_name else collection_path
    collection_path = constants.OUTPUT_COLLECTIONS if collection == collections_by_name else collection_path
    collection_path = constants.OUTPUT_CUBES if collection == cubes_by_name else collection_path
    collection_path = constants.OUTPUT_GEMS if collection == gems_by_name else collection_path
    collection_path = constants.OUTPUT_EQUIPMENT if collection == equipment_by_name else collection_path
    collection_path = constants.OUTPUT_EQUIPMENT_SETS if collection == equipment_sets_by_name else collection_path
    collection_path = constants.OUTPUT_ITEMS if collection == items_by_name else collection_path
    collection_path = constants.OUTPUT_MAPS if collection == maps_by_name else collection_path
    collection_path = constants.OUTPUT_MONSTERS if collection == monsters_by_name else collection_path
    collection_path = constants.OUTPUT_NPCS if collection == npcs_by_name else collection_path
    collection_path = constants.OUTPUT_RECIPES if collection == recipes_by_name else collection_path
    collection_path = constants.OUTPUT_SKILLS if collection == skills_by_name else collection_path

    return Link(collection[name], collection_path[:-4])


def link(a, a_key, a_link, b, b_key, b_link):
    if a_key in a and b_link is not None:
        if isinstance(a[a_key], list):
            a[a_key].append(b_link)
        else:
            a[a_key] = b_link

    if b_key in b and a_link is not None:
        if isinstance(b[b_key], list):
            b[b_key].append(a_link)
        else:
            b[b_key] = a_link


# Helper class to delay the toString operation
# For example, Recipes only have their name calculated after the parse_links operation
class Link:

    def __eq__(self, other):
        return isinstance(other, Link) and self.entity['$ID'] == other.entity['$ID']

    def __init__(self, entity, collection):
        self.entity = entity
        self.collection = collection

    def __getitem__(self, item):
        return self.entity[item]

    def __str__(self):
        return str(self.dict())

    def dict(self):
        return self.entity['$ID']
        #return {
        #    '$ID': self.entity['$ID'],
        #    '$ID_NAME': self.entity['$ID_NAME'],
        #    'Icon': self.entity['Icon'],
        #    'Name': self.entity['Name'],
        #    'Url': self.collection,
        #}

    @staticmethod
    def to_dict(obj, level=2):
        if isinstance(obj, list) and level > 0:
            return Link.to_dict([Link.to_dict(o, level - 1) for o in obj], level - 1)
        if isinstance(obj, dict) and level > 0:
            return Link.to_dict({k: Link.to_dict(v, level - 1) for k, v in obj.items()}, level - 1)
        if isinstance(obj, Link):
            return obj.dict()
        return obj
