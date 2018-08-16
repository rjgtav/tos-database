# coding=utf-8
import csv
import logging
import os
import xml.etree.ElementTree as ET

from ipf_parser import constants, globals


TRANSLATION_PREFIX = '@dicID_^*$'
TRANSLATION_SUFFIX = '$*^'


def parse():
    translations = parse_translations('English')
    parse_dictionary(translations)


def parse_dictionary(translations):
    logging.debug('Parsing translations dictionary...')
    dictionary_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'language.ipf', 'wholeDicID.xml')
    dictionary = ET.parse(dictionary_path).getroot()

    # example: <file name="xml\item_Equip.xml">
    for file in dictionary:
        if any(s in file.get('name').lower() for s in ['xml\\item', 'xml\\item_colorspray', 'xml\\item_equip', 'xml\\item_quest', 'xml\\monster', 'xml_client\\dialogtext.xml']):

            # Map translations
            # <data original="없음_helmet" dicid="@dicID_^*$ITEM_20150317_000001$*^"/>
            for data in file:
                key = data.get('original').replace('"', '')
                value = data.get('dicid')
                value_translated = '%s' % data.get('dicid')

                for dicid in value.split(TRANSLATION_SUFFIX):  # Sometimes there are multiple ids in a single entry (as translations are re-used)
                    if TRANSLATION_PREFIX in dicid:
                        dicid = dicid[dicid.index(TRANSLATION_PREFIX) + len(TRANSLATION_PREFIX):]
                        translation = translations[dicid] if dicid in translations else dicid

                        if dicid not in translations:
                            logging.warn('Missing translation for dicid: %s', dicid)

                        value_translated = value_translated.replace(TRANSLATION_PREFIX + dicid + TRANSLATION_SUFFIX, translation)

                globals.translations[key] = value_translated


def parse_translations(language):
    logging.debug('Parsing translations for %s...', language)
    result = {}

    for translation in [
        'BADWORDS.tsv',
        'ETC.tsv',
        'INTL.tsv',
        'ITEM.tsv',
        'QUEST.tsv',
        'QUEST_JOBSTEP.tsv',
        'QUEST_LV_0100.tsv',
        'QUEST_LV_0200.tsv',
        'QUEST_LV_0300.tsv',
        'QUEST_LV_0400.tsv',
        'QUEST_UNUSED.tsv',
        'SKILL.tsv',
        'UI.tsv'
    ]:
        translation_path = os.path.join(constants.PATH_PARSER_INPUT_TRANSLATIONS, language, translation)
        translation_file = open(translation_path, 'rb')

        for row in csv.reader(translation_file, delimiter='\t', quotechar='"'):
            result[row[0]] = row[1]

        translation_file.close()

    return result


def parse_translation_key(key):
    key = unicode(key.replace('"', ''), 'utf-8')

    if key != '' and key not in globals.translations:
        logging.warn('Missing translation for key: %s', key)

    return globals.translations[key] if key in globals.translations else key
