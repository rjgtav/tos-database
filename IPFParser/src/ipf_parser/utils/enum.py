def enum(*sequential, **named):
    enums = dict(zip(sequential, range(len(sequential))), **named)

    value_of = dict((key, value) for key, value in enums.iteritems())
    to_string = dict((value, key) for key, value in enums.iteritems())

    enums['value_of'] = value_of
    enums['value_of'][''] = None
    enums['to_string'] = to_string

    return type('Enum', (), enums)