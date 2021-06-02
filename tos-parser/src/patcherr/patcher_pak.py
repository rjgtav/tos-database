import logging
import os
import struct
import zlib

import constants

PAK_BLACKLIST = [
    b'.aes',
    b'.dll',
    b'.lua',
    b'beforedata/',
    b'bgm/',
    b'BlackCipher/',
    b'loadingimg/',
    b'Client_tos.exe',
    b'hotkey',
    b'xigncode',
]

OFFSET_FILE_NAME_LEN = 0
OFFSET_CHECKSUM = 2 + OFFSET_FILE_NAME_LEN
OFFSET_SIZE_COMPRESSED = 4 + OFFSET_CHECKSUM
OFFSET_SIZE_UNCOMPRESSED = 4 + OFFSET_SIZE_COMPRESSED
OFFSET_FILE_NAME = 4 + OFFSET_SIZE_UNCOMPRESSED


def unpack(pak):
    pak = os.path.join(constants.PATH_INPUT_RELEASE_PATCH, pak)
    logging.debug('Unpacking %s...', pak)

    pak = open(pak, 'rb').read()
    pak_offset = 0

    while pak_offset < len(pak):
        # Thanks to https://github.com/celophi/Arboretum/blob/master/Arboretum.Lib/PakFile.cs
        file_name_len = struct.unpack_from('@h', pak, OFFSET_FILE_NAME_LEN + pak_offset)[0]
        checksum = struct.unpack_from('@i', pak, OFFSET_CHECKSUM + pak_offset)[0]
        size_compressed = struct.unpack_from('@i', pak, OFFSET_SIZE_COMPRESSED + pak_offset)[0]
        size_uncompressed = struct.unpack_from('@i', pak, OFFSET_SIZE_UNCOMPRESSED + pak_offset)[0]

        file_name = pak[
            OFFSET_FILE_NAME + pak_offset:
            OFFSET_FILE_NAME + file_name_len + pak_offset
        ]
        
        if not any(s in file_name for s in PAK_BLACKLIST):
            logging.debug('Unzipping %s...', file_name)
            data = pak[
                OFFSET_FILE_NAME + file_name_len + pak_offset:
                OFFSET_FILE_NAME + file_name_len + size_compressed + pak_offset
            ]
            file_name=file_name.decode(encoding="utf-8")        
            file_path = os.path.join(constants.PATH_INPUT_RELEASE, file_name )

            # ensure file_path exists
            if not os.path.exists(os.path.dirname(file_path)):
                os.makedirs(os.path.dirname(file_path))

            with open(os.path.join(constants.PATH_INPUT_RELEASE, file_name), 'wb') as file:
                # For more information regarding WBITS, read: https://stackoverflow.com/a/22310760
                data = zlib.decompress(data, -zlib.MAX_WBITS)

                file.write(data)
                file.close()

        pak_offset += OFFSET_FILE_NAME + file_name_len + size_compressed

