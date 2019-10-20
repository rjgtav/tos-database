import json
import os

environment = None


def postgres():
    return _get()['postgres']


def _get():
    global environment

    if not environment:
        with open(os.path.join('..', 'environment.json')) as f:
            environment = json.load(f)

    return environment
