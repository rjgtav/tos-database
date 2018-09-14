from ipf_parser.utils.tosenum import TOSEnum


class TOSElement(TOSEnum):
    DARK = 0
    EARTH = 1
    FIRE = 2
    HOLY = 3
    ICE = 4
    LIGHTNING = 5
    MELEE = 6
    POISON = 7
    SOUL = 8

    @staticmethod
    def value_of(string):
        return {
            'DARK': TOSElement.DARK,
            'EARTH': TOSElement.EARTH,
            'FIRE': TOSElement.FIRE,
            'HOLY': TOSElement.HOLY,
            'ICE': TOSElement.ICE,
            'LIGHTING': TOSElement.LIGHTNING,
            'LIGHTNING': TOSElement.LIGHTNING,
            'MELEE': TOSElement.MELEE,
            'POISON': TOSElement.POISON,
            'SOUL': TOSElement.SOUL,
            '': None
        }[string.upper()]


class TOSAttackType(TOSEnum):
    PIERCING = 0
    BOW = 1
    CANNON = 2
    GUN = 3
    MAGIC = 4
    MELEE = 5
    SLASH = 6
    STRIKE = 7
    THRUST = 8
    UNKNOWN = 9

    @staticmethod
    def value_of(string):
        return {
            'ARIES': TOSAttackType.PIERCING,
            'ARROW': TOSAttackType.BOW,
            'CANNON': TOSAttackType.CANNON,
            'GUN': TOSAttackType.GUN,
            'HOLY': None,  # HotFix: obsolete skill #40706 uses it
            'MAGIC': TOSAttackType.MAGIC,
            'MELEE': TOSAttackType.MELEE,
            'SLASH': TOSAttackType.SLASH,
            'STRIKE': TOSAttackType.STRIKE,
            '': TOSAttackType.UNKNOWN
        }[string.upper()]