import numpy

from PIL import Image


def optimize(path, mode, rect, size):
    format = 'JPEG' if mode == 'RGB' else 'PNG'
    quality = 80 if mode == 'RGB' else 1

    image = Image.open(path)
    image = image.convert(mode) if image.mode != mode else image
    image = image.crop((rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3])) if (rect[2], rect[3]) != image.size else image
    image = image.resize((size[0], size[1]), Image.ANTIALIAS) if size < image.size else image
    image = image.save(path, format, optimize=True, quality=quality)


# https://stackoverflow.com/a/6501902
def replace_color(image, color_from, color_to):
    image_data = numpy.array(image)

    red, green, blue = image_data[:, :, 0], image_data[:, :, 1], image_data[:, :, 2]
    mask = (red == color_from[0]) & (green == color_from[1]) & (blue == color_from[2])
    image_data[:, :, :3][mask] = [color_to[0], color_to[1], color_to[2]]

    return Image.fromarray(image_data)
