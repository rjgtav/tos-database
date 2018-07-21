import csv
import os
import shutil

from ipf_parser import constants, globals, parser


def copy_dir(source, destination):
    for file_name in os.listdir(source):
        shutil.copy2(os.path.join(source, file_name), destination)


def csv_write(data, path):
    file = open(path, 'w')
    writer = csv.DictWriter(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL,
                            fieldnames=sorted(data[0].keys()))
    writer.writeheader()
    writer.writerows(data)
    file.close()


# Uncomment to extract all assets from original *.ipf files
# extractor.extract()

# Parse
parser.parse()

# Write parsed data
csv_write(globals.items.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'items.csv'))

# Copy assets
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'acc'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'emoticon'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'equip'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'hairacc'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'item'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'mongem'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'monster', 'boss'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'monster', 'mon'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'payment'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'skill', 'archer'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'skill', 'cleric'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'skill', 'warrior'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'skill', 'wizard'), constants.PATH_WEB_ASSETS_ICONS)
copy_dir(os.path.join(constants.PATH_IPF_PARSER_OUTPUT, 'ui.ipf', 'icon', 'weapon'), constants.PATH_WEB_ASSETS_ICONS)
