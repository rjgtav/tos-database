import csv
import os

from ipf_parser import constants
from ipf_parser.parsers import parser_items, parser_translations

items = {}
translations = {}


def parse():
    parser_translations.parse(translations)
    parser_items.parse(items, translations)

    # TODO: this is temporary
    #items_path = os.path.join(constants.PATH_IPF_PARSER, '..', 'items.csv')
    #items_file = open(items_path, 'w')
    #items_writer = csv.DictWriter(items_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, fieldnames=sorted(items.values()[0].keys()))
    #items_writer.writeheader()
    #items_writer.writerows(items.values())
    #items_file.close()
