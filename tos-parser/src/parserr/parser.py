import csv
import logging
import os
import shutil

import constants
from parserr import parser_ies, parser_assets
from patcherr import patcher_ipf, patcher_pak, patcher
from utils import pgutil, listutil, fileutil, jsonutil, threadingutil

META_TABLE = '__meta__'
META_KEY_VERSION = 'tos-parser/version'


def parse(region, update):

    # Initialize csv dialects
    csv.register_dialect('ies', delimiter=',', doublequote=False, escapechar=None, lineterminator='\r\n', quotechar='"', quoting=csv.QUOTE_MINIMAL, skipinitialspace=False)
    csv.register_dialect('tsv', delimiter='\t', doublequote=False, escapechar=None, lineterminator='\r\n', quotechar='', quoting=csv.QUOTE_NONE, skipinitialspace=False)

    # Initialize schema
    schema = pgutil.schema(region)
    pgutil.execute('CREATE SCHEMA IF NOT EXISTS %(schema)s' % { 'schema': schema }, None)

    # Initialize version
    version_data, version_release = version_read(schema)

    # Patch the base game (in case it's the first time we're running)
    if version_data is None:
        logging.debug('Patching the base game...')
        shutil.rmtree(constants.PATH_INPUT_DATA)

        for version_data in [TOSVersion(file, constants.PATH_INPUT_PATCH_DATA_FULL_URL) for file in fileutil.walk(constants.PATH_INPUT_PATCH_DATA_FULL, '*.ipf')]:
            for ies in parse_ies_list([ies for ies in patcher_ipf.unpack(version_data.patch) if ies.endswith('.ies')]):
                threadingutil.start(ParseThread(ies, schema, version_data))
            threadingutil.join()

    # Patch data to the latest version
    for version_data_new in [TOSVersion(file, constants.PATH_INPUT_PATCH_DATA_PARTIAL_URL) for file in fileutil.walk(constants.PATH_INPUT_PATCH_DATA_PARTIAL, '*.ipf')]:
        if version_data_new > version_data:
            #logging.debug('Patching data %s @ %s', version_data_new.version, version_data_new.modified())
            # Parse data
            for ies in parse_ies_list([ies for ies in patcher_ipf.unpack(version_data_new.patch) if ies.endswith('.ies')]):
                threadingutil.start(ParseThread(ies, schema, version_data_new))
            threadingutil.join()

            # Save version
            version_data = version_data_new
            version_write(schema, version_data, version_release)

    # Update release to the latest version
    for version_release_new in [TOSVersion(file, constants.PATH_INPUT_PATCH_RELEASE_URL) for file in fileutil.walk(constants.PATH_INPUT_PATCH_RELEASE, '*.pak')]:
        if version_release_new > version_release:
            #logging.debug('Patching release %s @ %s', version_release_new.version, version_release_new.modified())
            # Extract release
            patcher_pak.unpack(version_release_new.patch)

            # Save version
            version_release = version_release_new
            version_write(schema, version_data, version_release)

    # Parse assets
    parser_assets.parse(region, update)


def parse_ies_list(ies_list):
    # HotFix: ignore broken files
    # HotFix: ignore duplicate files (e.g. smartgen are located in ies_mongen and ies_mongen/smartgen)
    ies_list = [ies for ies in ies_list if os.path.basename(ies) not in ['loadingfaq.ies', 'sessionobject_main.ies']]
    ies_list = listutil.unique(ies_list, lambda x: os.path.basename(x))

    return ies_list


def version_read(schema):
    version = pgutil.storage_get(schema, pgutil.STORAGE_KEY_VERSION)
    version = jsonutil.loads(version[0][0]) if version else None

    version_data = int(version['version_data']) if version is not None and 'version_data' in version else None
    version_release = int(version['version_release']) if version is not None and 'version_release' in version else None

    return version_data, version_release


def version_write(schema, version_data, version_release):
    version = {
        'version_data': int(str(version_data)),
        'version_release': int(str(version_release)) if version_release is not None else 0,
    }

    pgutil.storage_set(schema, pgutil.STORAGE_KEY_VERSION, jsonutil.dumps(version))


class ParseThread(threadingutil.TOSThread):

    def __init__(self, ies, schema, version):
        threadingutil.TOSThread.__init__(self)

        self.ies = ies
        self.schema = schema
        self.version_modified = version.modified()

    def run_implementation(self):
        connection = None
        cursor = None

        try:
            connection, cursor = pgutil.cursor(self.schema)
            parser_ies.parse(cursor, self.ies, self.schema, self.version_modified)
        except:
            logging.error('Failed to parse ies: %s, schema: %s, version: %s', self.ies, self.schema, self.version_modified)
            raise
        finally:
            if cursor:      cursor.close()
            if connection:  connection.close()


class TOSVersion:
    def __init__(self, patch, patch_url):
        self.patch = patch
        self.patch_url = patch_url
        self.version = int(os.path.basename(patch).split('_')[0]) if patch is not None and os.path.basename(patch).split('_')[0].isdigit() else 0
        self._version_modified = None

    def __cmp__(self, other):
        if isinstance(other, TOSVersion):
            return cmp(self.version, other.version)
        if other is None:
            return cmp(self.version, 0)

        return cmp(self.version, other)

    def __eq__(self, other):
        if isinstance(other, TOSVersion):
            return self.version == other.version
        if other is None:
            return self.version == 0

        return self.version == other

    def __str__(self):
        return str(self.version)

    def modified(self):
        if self._version_modified is None:
            self._version_modified = patcher.patch_modified(self.patch_url + os.path.basename(self.patch))

        return self._version_modified
