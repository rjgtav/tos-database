import logging
import os
import struct
import urllib2

import constants
from libs import blowfish
from patcherr import patcher_ipf, patcher_pak
from patcherr.patcher_ipf import IPF_BLACKLIST

CHUNK_SIZE = 128 * 1024 * 1024  # 128MB of Chunk Size


def patch():
    logging.debug('Patching...')

    # Full patch
    patch_full(
        constants.PATH_INPUT_DATA, constants.PATH_INPUT_DATA_PATCH, constants.PATH_INPUT_DATA_PATCH_URL_FULL, '.ipf', patcher_ipf.unpack,
        constants.PATH_INPUT_DATA_REVISION_URL_FULL
    )

    # Partial patches
    version_data, version_data_new = patch_partial(
        constants.PATH_INPUT_DATA_PATCH, constants.PATH_INPUT_DATA_PATCH_URL, '.ipf', patcher_ipf.unpack,
        constants.PATH_INPUT_DATA_REVISION, constants.PATH_INPUT_DATA_REVISION_URL,
    )
    version_release, version_release_new = patch_partial(
        constants.PATH_INPUT_RELEASE_PATCH, constants.PATH_INPUT_RELEASE_PATCH_URL, '.pak', patcher_pak.unpack,
        constants.PATH_INPUT_RELEASE_REVISION, constants.PATH_INPUT_RELEASE_REVISION_URL,
    )

    version_new = 'patch_' + str(version_data_new) + '_release_' + str(version_release_new)
    version_old = 'patch_' + str(version_data) + '_release_' + str(version_release)

    return version_old, version_new


def patch_full(patch_destination, patch_path, patch_url, patch_ext, patch_unpack, revision_url):
    logging.debug('Patching %s...', revision_url)
    revision_list = urllib2.urlopen(revision_url).read()
    revision_list = revision_decrypt(revision_list)

    for revision in revision_list:
        # Download patch
        patch_name = revision + patch_ext
        patch_file = os.path.join(patch_path, patch_name)

        if not os.path.exists(os.path.join(patch_destination, patch_name)) and patch_name not in IPF_BLACKLIST:
            logging.debug('Downloading %s...', patch_url + patch_name)
            patch_process(patch_file, patch_name, patch_unpack, patch_url)


def patch_partial(patch_path, patch_url, patch_ext, patch_unpack, revision_path, revision_url):
    logging.debug('Patching %s...', revision_url)
    revision_list = urllib2.urlopen(revision_url).read()
    revision_list = revision_decrypt(revision_list)
    revision_old = revision_txt_read(revision_path)
    revision_new = revision_old

    for revision in revision_list:
        revision = revision.split(' ')[0]

        if int(revision) > int(revision_old) and revision not in ['147674']:
            # Process patch
            patch_name = revision + '_001001' + patch_ext
            patch_file = os.path.join(patch_path, patch_name)
            patch_process(patch_file, patch_name, patch_unpack, patch_url)

            # Update revision
            revision_txt_write(revision_path, revision)
            revision_new = revision

    return revision_old, revision_new


def patch_process(patch_file, patch_name, patch_unpack, patch_url):
    # Ensure patch_file destination exists
    if not os.path.exists(os.path.dirname(patch_file)):
        os.makedirs(os.path.dirname(patch_file))

    # Download patch
    logging.debug('Downloading %s...', patch_url + patch_name)
    patch_response = urllib2.urlopen(patch_url + patch_name)

    with open(patch_file, 'wb') as file:
        for chunk in iter(lambda: patch_response.read(CHUNK_SIZE), ''):
            file.write(chunk)

    # Extract patch
    patch_unpack(patch_name)

    # Delete patch
    os.remove(patch_file)


def revision_decrypt(revision):
    # Thanks to https://github.com/celophi/Arboretum/blob/master/Arboretum.Lib/Decryptor.cs
    size_unencrypted = struct.unpack_from('@i', revision, 0)[0]
    size_encrypted = struct.unpack_from('@i', revision, 4)[0]

    revision = [ord(c) for c in revision]               # Convert to binary
    blowfish.Decipher(revision, 8, size_encrypted)      # Decrypt with blowfish
    revision = [unichr(c) for c in revision]            # Convert back to unicode characters

    # Clean and split into a list
    revision = ''\
        .join(revision[8:])\
        .encode('ascii', 'ignore')\
        .split('\r\n')

    return revision[:-1]


def revision_txt_read(revision_txt):
    if os.path.isfile(revision_txt):
        with open(revision_txt, 'r') as file:
            return file.readline()
    else:
        return 0


def revision_txt_write(revision_txt, revision):
    with open(revision_txt, 'w') as file:
        file.write(revision)
