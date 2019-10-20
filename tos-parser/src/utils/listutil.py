def unique(l, transform=None):
    result = []
    result_transform = []

    if transform is not None:
        for i in l:
            if transform(i) not in result_transform:
                result.append(i)
                result_transform.append(transform(i))
    else:
        for i in l:
            if i not in result:
                result.append(i)

    return result
