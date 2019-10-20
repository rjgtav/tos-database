import fnmatch
import os
import platform
import shutil


# Removes all files & folders inside a directory
def clear(path):
    if os.path.exists(path):
        shutil.rmtree(path)

    os.makedirs(path)


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


# Thanks https://akudo.codes/2018/12/10/mklink-command-in-windows-ubuntu-wsl/
def symlink(link, link_target):
    link_data = os.path.relpath(link_target, os.path.join('..', link))

    if not os.path.exists(link):
        if "microsoft" in platform.uname()[3].lower():
            os.system("cmd.exe /c \"mklink /J %(link)s %(link_data)s\"" % {
                'link': link.replace("/", "\\"),
                'link_data': link_target.replace("/", "\\")
            })
        else:
            os.symlink(link_data, link)

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


# Returns all files that satisfy the provided pattern
# Thanks https://stackoverflow.com/a/2186565
def walk(path, pattern):
    result = []

    for root, dirs, files in os.walk(path):
        for file in fnmatch.filter(files, pattern):
            result.append(os.path.join(root, file))

    return result
