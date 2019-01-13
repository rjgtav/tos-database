import csv
import logging
import os

import constants
import globals
from parserr import parser_translations


def parse():
    parse_books()
    parse_books_dialog()


def parse_books():
    logging.debug('Parsing books...')

    for book_id in globals.books:
        obj = globals.books[book_id]

        # Add additional fields
        obj['Text'] = None


def parse_books_dialog():
    logging.debug('Parsing books dialog...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_client.ipf', 'dialogtext.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['ClassName'] not in globals.books_by_name:
            continue

        book = globals.books_by_name[row['ClassName']]
        book['Text'] = parser_translations.translate(row['Text'])

    ies_file.close()
