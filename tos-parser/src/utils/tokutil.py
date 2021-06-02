# Thanks Tachiorz
# https://gist.github.com/Tachiorz/3d4aac8e5e418f20725c153835637016

# Documentation for PathEngine's .tok format:
# https://www.pathengine.com/Contents/ProgrammersGuide/WorldRepresentation/DirectXMLGeneration/TokenisedXML/page.php

import struct
import xml.etree.ElementTree as XML


class TokAttrType:
    C_STR = 1
    SINT_32 = 2
    SINT_16 = 3
    SINT_8 = 4
    UINT_32 = 5
    UINT_16 = 6
    UINT_8 = 7

    def __init__(self):
        pass


def _read_string(buf, pos):
    l = buf.find(b'\x00', pos)
    if l == pos:
        return None
    print(str(l-pos) + "s")



def tok2xml(f):
    """
    :param f: PathEngine *.tok file
    :return: xml.etree.ElementTree
    @type f: file
    @rtype xml.etree.ElementTree
    """
    s = []
    attr = []
    buf = f.read()
    pos = 0
    # read strings
    while True:
        _s = _read_string(buf, pos)
        if _s is None:
            pos += 1
            break
        pos += len(_s) + 1
        s.append(_s)
        # print _s
    # read attributes
    while True:
        _type = struct.unpack("b", buf[pos:pos+1])[0]
        pos += 1
        if _type == 0:
            break
        _s = _read_string(buf, pos)
        pos += len(_s) + 1
        attr.append((_type, _s))
        # print (_type, _s)
    root_node = None
    while True:
        # read node name
        _name_idx = struct.unpack("b", buf[pos:pos+1])[0] - 1
        pos += 1
        if _name_idx == -1:  # end of element
            node = node.parent
            if node is None:
                break
            continue
        if root_node is None:
            root_node = XML.Element(s[_name_idx])
            root_node.parent = None
            node = root_node
        else:
            parent = node
            node = XML.SubElement(node, s[_name_idx])
            node.parent = parent
        # print s[_name_idx]
        # read attributes
        while True:
            _attr_idx = struct.unpack("b", buf[pos:pos+1])[0] - 1
            if buf[pos] == b'\x00':
                pos += 1
                break
            pos += 1
            _attr_type, _attr_name = attr[_attr_idx]
            if _attr_type == TokAttrType.C_STR:
                _val = _read_string(buf, pos)
                pos += len(_val) + 1
            elif _attr_type == TokAttrType.SINT_8:
                _val = struct.unpack("b", buf[pos:pos+1])[0]
                pos += 1
            elif _attr_type == TokAttrType.SINT_16:
                _val = struct.unpack("h", buf[pos:pos+2])[0]
                pos += 2
            elif _attr_type == TokAttrType.SINT_32:
                _val = struct.unpack("i", buf[pos:pos+4])[0]
                pos += 4
            elif _attr_type == TokAttrType.UINT_8:
                _val = struct.unpack("B", buf[pos:pos+1])[0]
                pos += 1
            elif _attr_type == TokAttrType.UINT_16:
                _val = struct.unpack("H", buf[pos:pos+2])[0]
                pos += 2
            elif _attr_type == TokAttrType.UINT_32:
                _val = struct.unpack("I", buf[pos:pos+4])[0]
                pos += 4
            node.set(_attr_name, _val)
            # print _attr_name, _val
    return root_node