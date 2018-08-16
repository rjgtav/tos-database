import os
import shutil

from ipf_parser import constants, globals


def parse_entity_icon(icon):
    icon = icon.lower()
    if icon in globals.assets_icons:
        return icon

    for icon2 in globals.assets_icons:
        if icon.replace('0', '') in icon2 or icon2 in icon:
            return icon2

    return icon


def parse():
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'acc'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'emoticon'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'equip'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'hairacc'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'item'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'mongem'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'monster', 'boss'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'monster', 'mon'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'payment'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'archer'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'cleric'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'common'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'summon'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'warrior'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'wizard'), constants.PATH_WEB_ASSETS_ICONS)
    parse_icons(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'weapon'), constants.PATH_WEB_ASSETS_ICONS)


def parse_icons(source, destination):
    for file_name in os.listdir(source):
        file_name_new = file_name.lower()

        shutil.copy2(os.path.join(source, file_name), os.path.join(destination, file_name_new))
        globals.assets_icons.append(file_name_new[:-4])
