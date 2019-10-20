def is_ascii(txt):
    try:
        txt.decode('ascii')
        return True
    except UnicodeDecodeError:
        return False
    except UnicodeEncodeError:
        return False


def is_unicode(txt):
    return isinstance(txt, unicode)


def to_unicode(txt):
    return txt if is_unicode(txt) else unicode(txt, 'utf-8')