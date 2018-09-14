import csv
import logging
import os

from ipf_parser import constants
from ipf_parser.parsers.parser_items_equipment import TOSEquipmentGrade


def parse():
    logging.debug('Parsing data to typescript...')

    parse_item_grade()
    parse_item_transcend()


def parse_item_grade():
    data = []

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_grade.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        grade = TOSEquipmentGrade.value_of(int(row['Grade']))

        if grade is None:
            continue

        data.append('    %d: { AnvilRatio: %.2f, AnvilRatioCost: %.2f, TranscendRatioCost: %.2f },\n' % (
            grade,
            int(row['ReinforceRatio']) / 100.0,
            int(row['ReinforceCostRatio']) / 100.0,
            int(row['TranscendCostRatio']) / 100.0,
        ))

    ies_file.close()

    write_typescript('tos-item-grade.ts', data)


def parse_item_transcend():
    data = []

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_transcend.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        data.append('    { ATKRatio: %.2f, MDEFRatio: %.2f, PDEFRatio: %.2f },\n' % (
            int(row['AtkRatio']) / 100.0,
            int(row['DefRatio']) / 100.0,
            int(row['MdefRatio']) / 100.0,
        ))

    ies_file.close()

    write_typescript('tos-item-transcend.ts', data)


def write_typescript(file_name, data):
    data = list(reversed(data))
    file_path = os.path.join(constants.PATH_WEB_DATA, file_name)

    with open(file_path, 'r') as file:
        file_data = file.readlines()

    for i in range(len(file_data)):
        if 'python-start' in file_data[i]:
            i = i + 1

            # delete existing entries
            while 'python-end' not in file_data[i]:
                file_data.remove(file_data[i])

            # insert new entries (note: this inserts in a reverse order)
            for j in range(len(data)):
                file_data[i:i] = [data[j]]

            break

    with open(file_path, 'w') as file:
        file.writelines(file_data)
