import os
import shutil


# Removes all files inside a folder
def clear(path):
    for file in os.listdir(path):
        file = os.path.join(path, file)
        if os.path.isfile(file):
            os.unlink(file)


# Converts all children files to lower case
def to_lower(path):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file != file.lower():
                source = os.path.join(root, file)
                destination = os.path.join(root, file.lower())

                # workaround due to Windows case insensitive file system
                shutil.move(source, destination + '.tmp')
                shutil.move(destination + '.tmp', destination)


# Thanks to https://stackoverflow.com/a/7420617
def move_tree(source, destination):
    for src_dir, dirs, files in os.walk(source):
        dst_dir = src_dir.replace(source, destination, 1)
        if not os.path.exists(dst_dir):
            os.makedirs(dst_dir)
        for file_ in files:
            src_file = os.path.join(src_dir, file_)
            dst_file = os.path.join(dst_dir, file_)
            if os.path.exists(dst_file):
                os.remove(dst_file)
            shutil.move(src_file, dst_dir)
