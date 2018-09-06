def is_ascii(txt):
    try:
        txt.decode('ascii')
        return True
    except UnicodeDecodeError:
        return False
    except UnicodeEncodeError:
        return False
