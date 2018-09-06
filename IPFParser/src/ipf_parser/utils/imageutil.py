from PIL import Image
import os


def optimize_to_jpg(before, size):
    after = before[:-4] + '.jpg'

    image = Image.open(before)
    image = image if '.jpg' in before else image.convert('RGB')
    image = image.resize(size, Image.ANTIALIAS) if size < image.size else image
    image = image.save(after, 'JPEG', optimize=True, quality=80)

    if before != after:
        os.remove(before)

    return after


def optimize_to_png(before, size):
    after = before[:-4] + '.png'

    image = Image.open(before)
    image = image if '.png' in before else image.convert('RGBA')
    image = image.resize(size, Image.ANTIALIAS) if size < image.size else image
    image = image.save(before, 'PNG', optimize=True, quality=1)

    if before != after:
        os.remove(before)

    return before
