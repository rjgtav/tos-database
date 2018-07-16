import os
import shutil
import subprocess

from ipf_parser import constants


def extract():
    for file_name in os.listdir(constants.PATH_IPF_PARSER_INPUT):
        # Make a backup of the file
        shutil.rmtree(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, file_name), ignore_errors=True)
        shutil.copy2(os.path.join(constants.PATH_IPF_PARSER_INPUT, file_name), constants.PATH_IPF_PARSER_OUTPUT)

        # Decrypt and extract
        subprocess.check_call(
            [constants.PATH_IPF_UNPACKER_EXE, os.path.join(constants.PATH_IPF_PARSER_OUTPUT, file_name), "decrypt"],
            stdin=None, stdout=None, stderr=None, shell=False)
        subprocess.check_call(
            [constants.PATH_IPF_UNPACKER_EXE, os.path.join(constants.PATH_IPF_PARSER_OUTPUT, file_name), "extract"], stdin=None, stdout=None, stderr=None, shell=False)

        # Move result to output
        os.remove(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, file_name))
        shutil.move(os.path.join(constants.PATH_IPF_PARSER_EXTRACT, file_name),
                    os.path.join(constants.PATH_IPF_PARSER_OUTPUT, file_name))
