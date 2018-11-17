import logging
import os
import shutil
import subprocess

from ipf_parser import constants
from ipf_parser.parsers.parser_enums import TOSRegion
from utils import fileutil

IPF_BLACKLIST = [
    'animation.ipf',
    'bg.ipf',
    'bg_hi.ipf',
    'bg_hi2.ipf',
    'bg_hi3.ipf',
    'bg_lightcell.ipf',
    'bg_texture.ipf',
    'char_hi.ipf',
    'char_texture.ipf',
    'char_texture_low.ipf',
    'deadslice.ipf',
    'decal.ipf',
    'effect.ipf',
    'etc.ipf',
    'item_hi.ipf',
    'item_texture.ipf',
    'item_texture_low.ipf',
    'shader.ipf',
    'sound.ipf',
    'sprite.ipf',
    'SumAni.ipf',
    'templatepc.ipf',
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
    logging.debug('Unpacking file: %s => %s' % (os.path.join(source, file_name), os.path.join(destination, file_name)))

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

    destination_extract = os.path.join(constants.PATH_PARSER_INPUT_IPF, '..', '..', 'extract')

    # Delete ipf file
    os.remove(os.path.join(destination, file_name))

    # Clean result
    for file_name in os.listdir(destination_extract):
        if any(file_name == s for s in IPF_BLACKLIST):
            shutil.rmtree(os.path.join(destination_extract, file_name))

    # Move result to destination directory
    fileutil.move_tree(destination_extract, destination)

    # Delete extract directory
    shutil.rmtree(destination_extract)


def unpack_patch(version):
    version_new = version

    for file_name in sorted(os.listdir(constants.PATH_TOS_PATCH)):
        if version_as_int(version) >= version_as_int(file_name):
            continue

        logging.debug('Unpacking patch: %s', file_name)

        # Unpack patch
        unpack_file(file_name, constants.PATH_TOS_PATCH, constants.PATH_PARSER_INPUT_IPF)

        # Update version
        version_new = file_name
        version_write(version_new)

    return version_new


def unpack_release():
    logging.debug('Unpacking initial release...')
    if len(os.listdir(constants.PATH_PARSER_INPUT_IPF)) > 0:
        return

    for file_name in os.listdir(constants.PATH_TOS_DATA):
        if any(file_name == s for s in IPF_BLACKLIST):
            continue

        unpack_file(file_name, constants.PATH_TOS_DATA, constants.PATH_PARSER_INPUT_IPF)


def unpack_translations(region):
    logging.debug('Unpacking translations...')

    language = None
    language = 'English' if region == TOSRegion.iTOS else language
    language = 'Japanese' if region == TOSRegion.jTOS else language

    if language:
        destination = os.path.join(constants.PATH_PARSER_INPUT_TRANSLATIONS, language)
        source = os.path.join(constants.PATH_TOS_RELEASE_LANGUAGEDATA, language)

        if os.path.exists(destination):
            shutil.rmtree(destination)

        shutil.copytree(source, destination)


def unpack(region):
    logging.debug('Unpacking...')
    unpack_release()

    version = version_read()
    version_new = unpack_patch(version)

    # HotFix: make image assets lowercase
    if version != version_new:
        fileutil.to_lower(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon'))
        fileutil.to_lower(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'skin'))
        fileutil.to_lower(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_mongen.ipf'))

    unpack_translations(region)

    return version_as_int(version), version_as_int(version_new)
