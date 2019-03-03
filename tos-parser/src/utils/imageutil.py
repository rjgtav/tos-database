from PIL import Image


def optimize(path, mode, rect, size):
    format = 'JPEG' if mode == 'RGB' else 'PNG'
    quality = 80 if mode == 'RGB' else 1

    image = Image.open(path)
    image = image.convert(mode) if image.mode != mode else image
    image = image.crop((rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3])) if (rect[2], rect[3]) != image.size else image
    image = image.resize((size[0], size[1]), Image.ANTIALIAS) if size < image.size else image
    image = image.save(path, format, optimize=True, quality=quality)
