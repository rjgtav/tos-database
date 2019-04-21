from PIL import Image


def optimize(path, mode, rect, size):
    format = 'JPEG' if mode == 'RGB' else 'PNG'
    quality = 80 if mode == 'RGB' else 1

    image = Image.open(path)
    image = image.convert(mode) if image.mode != mode else image
    image = image.crop((rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3])) if (rect[2], rect[3]) != image.size else image
    image = image.resize((size[0], size[1]), Image.ANTIALIAS) if size < image.size else image
    image = image.save(path, format, optimize=True, quality=quality)


# https://stackoverflow.com/a/6483549
def replace_color(image, color_from, color_to):
    image = image.copy()
    image_width, image_height = image.size
    image_data = image.load()

    for x in range(0, image_width):
        for y in range(0, image_height):
            if image_data[x,y] == color_from:
                image_data[x,y] = color_to

    return image
