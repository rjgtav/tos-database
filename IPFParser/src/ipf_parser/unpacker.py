import logging
import os
import shutil
import subprocess

from ipf_parser import constants
from utils import fileutil

IPF_WHITELIST = [
    'addon',
    'global',
    'ies',
    'script',
    'language',
    'shared',
    'ui',
    'xml'
]


def version_as_int(file_name):
    return int(file_name[:-4].replace('_', '')) if file_name is not None else -1


def version_read():
    if os.path.isfile(constants.PATH_PARSER_INPUT_VERSION):
        with open(constants.PATH_PARSER_INPUT_VERSION, 'r') as file:
            return file.readline()
    else:
        return None


def version_write(version):
    with open(constants.PATH_PARSER_INPUT_VERSION, 'w') as file:
        file.write(version)


def unpack_file(file_name, source, destination):
    logging.debug('Unpacking file: %s' % file_name)

    # Copy ipf file from Tree of Savior's installation to destination directory
    shutil.copy(
        os.path.join(source, file_name),
        os.path.join(destination, file_name)
    )

    # Decrypt and extract ipf file
    subprocess.check_call(
        [constants.PATH_UNPACKER_EXE, os.path.join(destination, file_name), "decrypt"],
        stdin=None, stdout=None, stderr=None, shell=False
    )
    subprocess.check_call(
        [constants.PATH_UNPACKER_EXE, os.path.join(destination, file_name), "extract"],
        stdin=None, stdout=None, stderr=None, shell=False
    )

    destination_extract = os.path.join(destination, '..', 'extract')

    # Delete ipf file
    os.remove(os.path.join(destination, file_name))

    # Clean result
    for file_name in os.listdir(destination_extract):
        if not any(file_name.find(s) == 0 for s in IPF_WHITELIST):
            shutil.rmtree(os.path.join(destination, '..', 'extract', file_name))

    # Move result to destination directory
    fileutil.move_tree(destination_extract, destination)

    # Delete extract directory
    shutil.rmtree(destination_extract)


def unpack_patch():
    version = version_read()

    for file_name in sorted(os.listdir(constants.PATH_TOS_PATCH)):
        if version_as_int(version) >= version_as_int(file_name):
            continue

        logging.debug('Unpacking patch: %s', file_name)

        # Unpack patch
        unpack_file(file_name, constants.PATH_TOS_PATCH, constants.PATH_PARSER_INPUT_IPF)

        # Update version
        version_write(file_name)


def unpack_release():
    logging.debug('Unpacking initial release...')
    if len(os.listdir(constants.PATH_PARSER_INPUT_IPF)) == 0:
        for file_name in os.listdir(constants.PATH_TOS_DATA):
            if not any(file_name.find(s) == 0 for s in IPF_WHITELIST):
                continue

            unpack_file(file_name, constants.PATH_TOS_DATA, constants.PATH_PARSER_INPUT_IPF)


def unpack_translations():
    logging.debug('Unpacking translations...')

    destination = os.path.join(constants.PATH_PARSER_INPUT_TRANSLATIONS, 'English')
    source = os.path.join(constants.PATH_TOS_RELEASE_LANGUAGEDATA, 'English')

    if os.path.exists(destination):
        shutil.rmtree(destination)

    shutil.copytree(source, destination)


def unpack():
    logging.debug('Unpacking...')
    unpack_release()
    unpack_patch()
    unpack_translations()
