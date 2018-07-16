# coding=utf-8
import csv
import os
import xml.etree.ElementTree as ET

from ipf_parser import constants


def parse(global_translations):
    dictionary_path = os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'language.ipf', 'wholeDicID.xml')
    dictionary = ET.parse(dictionary_path).getroot()

    # <file name="xml\item_Equip.xml">
    for file in dictionary:
        if file.get('name') in ['xml\item.xml', 'xml\item_Equip.xml']:
            output = global_translations.setdefault(constants.PARSER_TRANSLATIONS.ITEMS, {})

            # Parse english translations
            translation = {}
            parse_translation(translation, 'ETC.tsv')
            parse_translation(translation, 'ITEM.tsv')
            parse_translation(translation, 'QUEST.tsv')
            parse_translation(translation, 'SKILL.tsv')
            parse_translation(translation, 'QUEST_JOBSTEP.tsv')
            parse_translation(translation, 'QUEST_LV_0100.tsv')
            parse_translation(translation, 'QUEST_LV_0200.tsv')
            parse_translation(translation, 'QUEST_LV_0300.tsv')
            parse_translation(translation, 'QUEST_LV_0400.tsv')

            # Map translations
            # <data original="없음_helmet" dicid="@dicID_^*$ITEM_20150317_000001$*^"/>
            for data in file:
                for dicid in data.get('dicid').replace("'", "").split('$*^'):  # Sometimes there are multiple ids
                    if len(dicid) > 0:
                        key = data.get('original')
                        value = translation[dicid[len('@dicID_^*$'):]]
                        output[key] = value


def parse_translation(translation, translation_path):
    translation_path = os.path.join(constants.PATH_IPF_PARSER_INPUT_TRANSLATIONS, 'English', translation_path)
    translation_file = open(translation_path, 'rb')

    for row in csv.reader(translation_file, delimiter='\t', quotechar='"'):
        translation[row[0]] = row[1]

    translation_file.close()
