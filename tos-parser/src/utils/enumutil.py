from enum import IntEnum


# HotFix: make sure enums are serialized into an int
class Enum(IntEnum):

    def __int__(self):
        return self.value

    def __str__(self):
        return str(self.value)


class TOSRegion(Enum):
    iTOS = 0
    jTOS = 1
    kTEST = 2
    kTOS = 3
    twTOS = 4

    @staticmethod
    def to_string(value):
        return {
            TOSRegion.iTOS: 'iTOS',
            TOSRegion.jTOS: 'jTOS',
            TOSRegion.kTEST: 'kTEST',
            TOSRegion.kTOS: 'kTOS',
            TOSRegion.twTOS: 'twTOS',
        }[value]

    @staticmethod
    def value_of(string):
        return {
            'iTOS': TOSRegion.iTOS,
            'jTOS': TOSRegion.jTOS,
            'kTEST': TOSRegion.kTEST,
            'kTOS': TOSRegion.kTOS,
            'twTOS': TOSRegion.twTOS,
            '': None
        }[string]