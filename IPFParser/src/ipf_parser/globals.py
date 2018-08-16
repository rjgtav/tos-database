assets_icons = []

books = {}
books_by_name = {}
collections = {}
collections_by_name = {}
equipment = {}
equipment_by_name = {}
items = {}
items_by_name = {}
monsters = {}
monsters_by_name = {}
recipes = {}
recipes_by_name = {}
translations = {}


def get_book_link(name):
    return _get_entity_link(name, books_by_name)


def get_collection_link(name):
    return _get_entity_link(name, collections_by_name)


def get_equipment_link(name):
    return _get_entity_link(name, equipment_by_name)


def get_item_link(name):
    if name == 'Moneybag1':
        return {
            'Icon': 'icon_item_silver2',
            'Name': 'Silver'
        }
    else:
        item = None
        item = _get_entity_link(name, books_by_name) if item is None else item
        item = _get_entity_link(name, collections_by_name) if item is None else item
        item = _get_entity_link(name, equipment_by_name) if item is None else item
        item = _get_entity_link(name, items_by_name) if item is None else item
        item = _get_entity_link(name, recipes_by_name) if item is None else item
        return item


def get_monster_link(name):
    return _get_entity_link(name, monsters_by_name)


def get_recipe_link(name):
    return _get_entity_link(name, recipes_by_name)


def _get_entity_link(name, collection):
    if name not in collection:
        return None

    return Link(collection[name])


# Helper class to delay the toString operation
# For example, Recipes only have their name calculated after the parse_links operation
class Link:

    def __init__(self, entity):
        self.entity = entity

    def __getitem__(self, item):
        return self.entity[item]

    def __str__(self):
        return str(self.dict())

    def dict(self):
        return {
            '$ID': self.entity['$ID'],
            'Icon': self.entity['Icon'],
            'Name': self.entity['Name'],
        }

    @staticmethod
    def to_dict(obj, level=2):
        if isinstance(obj, (list,)) and level > 0:
            return Link.to_dict([Link.to_dict(o, level - 1) for o in obj], level - 1)
        if isinstance(obj, (dict,)) and level > 0:
            return Link.to_dict({k: Link.to_dict(v, level - 1) for k, v in obj.iteritems()}, level - 1)
        if isinstance(obj, (Link,)):
            return obj.dict()
        return obj
