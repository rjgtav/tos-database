import os
import shutil
import subprocess

import constants
from utils import fileutil

IPF_BLACKLIST = [
    'animation.ipf',
    'bg_hi.ipf',
    'bg_hi2.ipf',
    'bg_hi3.ipf',
    'bg_lightcell.ipf',
    'bg_texture.ipf',
    #'char_hi.ipf',
    #'char_texture.ipf',
    'char_texture_low.ipf',
    'deadslice.ipf',
    'decal.ipf',
    'effect.ipf',
    'etc.ipf',
    #'item_hi.ipf',
    #'item_texture.ipf',
    'item_texture_low.ipf',
    'shader.ipf',
    'sound.ipf',
    'sprite.ipf',
    'sumani.ipf',
    'templatepc.ipf',
]


def unpack(ipf):
    ipf = str(ipf) + '_001001.ipf' if isinstance(ipf, (int, long)) else ipf
    ipf = os.path.join(constants.PATH_INPUT_PATCH_DATA_FULL, ipf) if os.path.exists(os.path.join(constants.PATH_INPUT_PATCH_DATA_FULL, ipf)) else ipf
    ipf = os.path.join(constants.PATH_INPUT_PATCH_DATA_PARTIAL, ipf) if os.path.exists(os.path.join(constants.PATH_INPUT_PATCH_DATA_PARTIAL, ipf)) else ipf

    ipf_destination = constants.PATH_INPUT_DATA
    ipf_origin = os.path.join(os.path.dirname(ipf), 'extract')

    # Clear extract directory
    fileutil.clear(ipf_origin)

    # Extract ipf file
    subprocess.check_call(
        [constants.PATH_UNPACKER_EXE, ipf, "extract"],
        stdin=None, stdout=None, stderr=None, shell=False
    )

    # In case the ipf patch is empty, just return
    if not os.path.exists(ipf_origin):
        return []

    # Remove blacklisted IPF files from extracted result
    for file_name in os.listdir(ipf_origin):
        if any(file_name.lower() == s for s in IPF_BLACKLIST):
            shutil.rmtree(os.path.join(ipf_origin, file_name))

    # Make all files lower case
    fileutil.to_lower(ipf_origin)

    # Store list of extracted files
    ipf_extract_list = [(root.replace(ipf_origin, ipf_destination), dirs, files) for root, dirs, files in os.walk(ipf_origin)]
    ipf_extract_list = [os.path.join(root, file) for root, dirs, files in ipf_extract_list for file in files]

    # Move extracted IPF files to data directory
    fileutil.move_tree(ipf_origin, ipf_destination)

    # Remove extract directory
    shutil.rmtree(ipf_origin)

    return ipf_extract_list


def decrypt(ipf):
    if ipf[-4:] != '.ipf':
        return

    if os.path.basename(ipf) in ['29_001001.ipf']:  # HotFix: these specific patches aren't encrypted for some reason
        return

    subprocess.check_call(
        [constants.PATH_UNPACKER_EXE, ipf, "decrypt"],
        stdin=None, stdout=None, stderr=None, shell=False
    )