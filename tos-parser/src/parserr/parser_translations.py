# coding=utf-8
import csv
import logging
import os
import xml.etree.ElementTree as ET

import constants
import globals
from parserr.parser_enums import TOSRegion
from utils.stringutil import is_ascii

TRANSLATION_PREFIX = '@dicID_^*$'
TRANSLATION_SUFFIX = '$*^'


def parse(region):
    translations = None
    translations = parse_translations('English') if region == TOSRegion.iTOS else translations
    translations = parse_translations('Japanese') if region == TOSRegion.jTOS else translations
    translations = parse_translations('Taiwanese') if region == TOSRegion.twTOS else translations

    if translations:
        parse_dictionary(translations)


def parse_dictionary(translations):
    logging.debug('Parsing translations dictionary...')
    dictionary_path = os.path.join(constants.PATH_INPUT_DATA, 'language.ipf', 'wholedicid.xml')
    dictionary = ET.parse(dictionary_path).getroot()

    # example: <file name="xml\item_Equip.xml">
    for file in dictionary:
        # <data original="없음_helmet" dicid="@dicID_^*$ITEM_20150317_000001$*^"/>
        for data in file:
            key = data.get('original').replace('"', '')
            value = data.get('dicid')
            value_translated = '%s' % data.get('dicid')

            for dicid in value.split(TRANSLATION_SUFFIX):  # Sometimes there are multiple ids in a single entry (as translations are re-used)
                if TRANSLATION_PREFIX in dicid:
                    dicid = dicid[dicid.index(TRANSLATION_PREFIX) + len(TRANSLATION_PREFIX):]
                    if dicid not in translations:
                        logging.warn('Missing translation for dicid: (%s)', dicid)

                    translation = translations[dicid] if dicid in translations else dicid
                    value_translated = value_translated.replace(TRANSLATION_PREFIX + dicid + TRANSLATION_SUFFIX, translation)

            globals.translations[key] = value_translated


def parse_translations(language):
    logging.debug('Parsing translations for %s...', language)
    result = {}

    translation_folder = os.path.join(constants.PATH_INPUT_RELEASE, 'languageData', language)

    for translation in os.listdir(translation_folder):
        translation_path = os.path.join(translation_folder, translation)

        if '.tsv' not in translation:
            continue

        with open(translation_path, 'rb') as translation_file:
            for row in csv.reader(translation_file, delimiter='\t', quotechar='"'):
                if len(row) > 1:
                    result[row[0]] = unicode(row[1], 'utf-8')

    return result


def translate(key):
    try:
        key = unicode(key.replace('"', ''), 'utf-8')
    except TypeError:
        pass

    # In case the key is already in english, there's no need to translate
    if is_ascii(key):
        return key
    if not globals.translations:
        return key

    if key != '' and key not in globals.translations:
        logging.warn('Missing translation for key: %s', key)
        return key

    return globals.translations[key]
