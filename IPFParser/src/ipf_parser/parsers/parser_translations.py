# coding=utf-8
import csv
import logging
import os
import xml.etree.ElementTree as ET

from ipf_parser import constants, globals


TRANSLATION_PREFIX = '@dicID_^*$'
TRANSLATION_SUFFIX = '$*^'


def parse():
    logging.debug('Parsing translations...')
    dictionary_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'language.ipf', 'wholeDicID.xml')
    dictionary = ET.parse(dictionary_path).getroot()

    # <file name="xml\item_Equip.xml">
    for file in dictionary:
        if any(s in file.get('name') for s in ['xml\\item', 'xml\\item_colorspray', 'xml\\item_Equip', 'xml\\item_Quest']):
            # Parse english translations
            translations = {}
            parse_translation(translations, 'BADWORDS.tsv')
            parse_translation(translations, 'ETC.tsv')
            parse_translation(translations, 'INTL.tsv')
            parse_translation(translations, 'ITEM.tsv')
            parse_translation(translations, 'QUEST.tsv')
            parse_translation(translations, 'QUEST_JOBSTEP.tsv')
            parse_translation(translations, 'QUEST_LV_0100.tsv')
            parse_translation(translations, 'QUEST_LV_0200.tsv')
            parse_translation(translations, 'QUEST_LV_0300.tsv')
            parse_translation(translations, 'QUEST_LV_0400.tsv')
            parse_translation(translations, 'QUEST_UNUSED.tsv')
            parse_translation(translations, 'SKILL.tsv')
            parse_translation(translations, 'UI.tsv')

            # Map translations
            # <data original="없음_helmet" dicid="@dicID_^*$ITEM_20150317_000001$*^"/>
            for data in file:
                key = data.get('original').replace('"', '')
                value = data.get('dicid')
                value_translated = '%s' % data.get('dicid')

                for dicid in value.split(TRANSLATION_SUFFIX):  # Sometimes there are multiple ids in a single entry (as translations are re-used)
                    if len(dicid) > 1:                         # > 1 to ignore apostrophes
                        dicid = dicid[dicid.index(TRANSLATION_PREFIX) + len(TRANSLATION_PREFIX):]
                        translation = translations[dicid] if dicid in translations else dicid

                        if dicid not in translations:
                            logging.warn('Missing translation for dicid: %s', dicid)

                        value_translated = value_translated.replace(TRANSLATION_PREFIX + dicid + TRANSLATION_SUFFIX, translation)

                globals.translations[key] = value_translated


def parse_translation(translation, translation_path):
    translation_path = os.path.join(constants.PATH_PARSER_INPUT_TRANSLATIONS, 'English', translation_path)
    translation_file = open(translation_path, 'rb')

    for row in csv.reader(translation_file, delimiter='\t', quotechar='"'):
        translation[row[0]] = row[1]

    translation_file.close()


