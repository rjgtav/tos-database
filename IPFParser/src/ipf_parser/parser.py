from ipf_parser.parsers import parser_items, parser_translations


def parse():
    parser_translations.parse()
    parser_items.parse()
