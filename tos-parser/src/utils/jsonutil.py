import json
import os


def dump(obj, path):
    with open(path, 'w') as f:
        json.dump(obj, f, separators=(',', ':'), sort_keys=True)


def dumps(obj):
    return json.dumps(obj)


def load(path):
    if os.path.isfile(path):
        with open(path, 'r') as f:
            return json.load(f)


def loads(s):
    return json.loads(s)