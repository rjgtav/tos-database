# coding=utf-8
import logging
import os
import xml.etree.ElementTree as ET

from parserr.parser_enums import TOSLanguage

import constants
import globals
from utils import stringutil
from utils.stringutil import is_ascii

TRANSLATION_PREFIX = '@dicID_^*$'
TRANSLATION_SUFFIX = '$*^'


def parse(language):
    parse_translations(language)


def parse_translations(language):
    logging.debug('Parsing translations for %s... (data)', TOSLanguage.to_string(language))
    translations = parse_translations_data(language)
    translations_global = globals.translations = {}

    if not translations:
        return

    logging.debug('Parsing translations for %s... (dictionary)', TOSLanguage.to_string(language))
    dictionary_path = os.path.join(constants.PATH_INPUT_DATA, 'language.ipf', 'wholedicid.xml')
    dictionary = ET.parse(dictionary_path).getroot()

    # example: <file name="xml\item_Equip.xml">
    for file in dictionary:
        # <data original="없음_helmet" dicid="@dicID_^*$ITEM_20150317_000001$*^"/>
        for data in file:
            key = data.get('original')
            value = data.get('dicid')
            value_translated = stringutil.to_unicode(data.get('dicid'))

            for dicid in value.split(TRANSLATION_SUFFIX):  # Sometimes there are multiple ids in a single entry (as translations are re-used)
                if TRANSLATION_PREFIX in dicid:
                    dicid = dicid[dicid.index(TRANSLATION_PREFIX) + len(TRANSLATION_PREFIX):]

                    if dicid not in translations and not dicid.startswith('BADWORDS_'):
                        logging.warn('Missing translation for dicid: (%s)', dicid)

                    translation = stringutil.to_unicode(translations[dicid]) if dicid in translations else dicid
                    translation_replace = stringutil.to_unicode(TRANSLATION_PREFIX + dicid + TRANSLATION_SUFFIX)

                    value_translated = value_translated.replace(translation_replace, translation)

            translations_global[key] = value_translated


def parse_translations_data(language):
    result = {}
    tsv_path = os.path.join(constants.PATH_INPUT_RELEASE, 'languageData', TOSLanguage.to_string(language))

    if not os.path.exists(tsv_path):
        return result

    for tsv in [file for file in os.listdir(tsv_path) if file.endswith('.tsv')]:
        with open(os.path.join(tsv_path, tsv), 'rU') as tsv:
            for row in tsv:
                row = row.split('\t')
                i = 0

                # Hotfix: parse the tsv manually, as sometimes it comes with \n inside unquoted fields
                while i < len(row) - 1:
                    if len(row[i]) > 0 and stringutil.is_ascii(row[i]):
                        if len(row[i + 1]) > 0:
                            result[row[i]] = row[i + 1].decode('utf-8', 'ignore').encode('utf-8').strip()
                            i += 1
                    i += 1

    return result


def translate(key):
    # In case no translations are available, just return as is
    if not globals.translations:
        return key

    # In case the key is already in english, there's no need to translate
    if isinstance(key, (int, float, long)) or key == '' or is_ascii(key):
        return key

    key = stringutil.to_unicode(key)

    if key not in globals.translations:
        # logging.warn('Missing translation for key: %s', key)
        return key

    return globals.translations[key]
