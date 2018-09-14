from enum import IntEnum


# HotFix: make sure enums are serialized into an int
class TOSEnum(IntEnum):

    def __int__(self):
        return self.value

    def __str__(self):
        return str(self.value)
