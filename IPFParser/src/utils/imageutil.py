import os

from PIL import Image


def optimize(before, mode, rect, size):
    extension = '.jpg' if mode == 'RGB' else '.png'
    format = 'JPEG' if mode == 'RGB' else 'PNG'
    quality = 80 if mode == 'RGB' else 1

    after = (before[:-4] if '.' == before[-4] else before) + extension

    image = Image.open(before)
    image = image.convert(mode) if image.mode != mode else image
    image = image.crop((rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3])) if (rect[2], rect[3]) != image.size else image
    image = image.resize((size[0], size[1]), Image.ANTIALIAS) if size < image.size else image
    image = image.save(after, format, optimize=True, quality=quality)

    if before != after:
        os.remove(before)

    return after
