import logging
import os
import shutil
import struct
import time
import urllib2
from datetime import datetime

import constants
from libs import blowfish
from patcherr import patcher_ipf
from utils import fileutil

CHUNK_SIZE = 128 * 1024 * 1024  # 128MB of Chunk Size


def patch():
    logging.debug('Patching...')

    # Patch the full data
    patch_revision(
        constants.PATH_INPUT_PATCH_DATA_FULL,
        constants.PATH_INPUT_PATCH_DATA_FULL_URL,
        constants.PATH_INPUT_PATCH_DATA_FULL_URL_REVISION,
        patcher_ipf.IPF_BLACKLIST,
        lambda revision: revision + '.ipf',
    )

    # Patch the partial data updates
    patch_revision(
        constants.PATH_INPUT_PATCH_DATA_PARTIAL,
        constants.PATH_INPUT_PATCH_DATA_PARTIAL_URL,
        constants.PATH_INPUT_PATCH_DATA_PARTIAL_URL_REVISION,
        ['147674_001001.ipf'],
        lambda revision: revision.split(' ')[0] + '_001001.ipf',
    )

    # Patch the partial release updates
    patch_revision(
        constants.PATH_INPUT_PATCH_RELEASE,
        constants.PATH_INPUT_PATCH_RELEASE_URL,
        constants.PATH_INPUT_PATCH_RELEASE_URL_REVISION,
        [],
        lambda revision: revision.split(' ')[0] + '_001001.pak',
    )

    return patch_version(constants.PATH_INPUT_PATCH_DATA_PARTIAL), patch_version(constants.PATH_INPUT_PATCH_RELEASE)


def patch_download(patch_file, patch_file_tmp, patch_url, progress, progress_total):
    # Skip missing files
    if os.path.basename(patch_file) in ['147674_001001.pak']:
        return False

    # Skip already downloaded files
    if os.path.exists(patch_file):
        return False

    # Clear temporary folder
    fileutil.clear(os.path.dirname(patch_file_tmp))

    logging.debug('Downloading (%d/%d) %s...', progress, progress_total, patch_url)

    # Download patch
    patch_response = urllib2.urlopen(patch_url)

    with open(patch_file_tmp, 'wb') as file:
        for chunk in iter(lambda: patch_response.read(CHUNK_SIZE), ''):
            file.write(chunk)

    # Keep original modified datetime
    # https://docs.python.org/2/library/time.html#time.strftime
    modified = datetime.strptime(patch_response.headers.dict['last-modified'], "%a, %d %b %Y %H:%M:%S %Z")
    modified = time.mktime(modified.timetuple())
    os.utime(patch_file_tmp, (modified, modified))

    return True


def patch_revision(download_path, download_url, revision_url, revision_blacklist, revision_name):
    logging.debug('Patching %s...', revision_url)
    revision_list = urllib2.urlopen(revision_url).read()
    revision_list = patch_revision_decrypt(revision_list)

    revision_list = [revision_name(revision) for revision in revision_list]
    revision_list = [revision for revision in revision_list if revision not in revision_blacklist]
    revision_list_len = len(revision_list)

    for i in range(revision_list_len):
        download_name = revision_list[i]
        download_file = os.path.join(download_path, download_name)
        download_file_tmp = os.path.join(constants.PATH_INPUT_PATCH_TEMPORARY, download_name)

        if patch_download(download_file, download_file_tmp, download_url + download_name, i, revision_list_len - 1):
            # Decrypt
            patcher_ipf.decrypt(download_file_tmp)

            # Move to final destination
            shutil.move(download_file_tmp, download_file)


def patch_revision_decrypt(revision):
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


def patch_version(path):
    return os.listdir(path)[-1].split('_')[0]