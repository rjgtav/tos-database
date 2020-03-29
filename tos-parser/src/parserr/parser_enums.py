from utils.tosenum import TOSEnum


class TOSRegion(TOSEnum):
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
    def to_string(value):
        return {
            TOSElement.DARK: 'Dark',
            TOSElement.EARTH: 'Earth',
            TOSElement.FIRE: 'Fire',
            TOSElement.HOLY: 'Holy',
            TOSElement.ICE: 'Ice',
            TOSElement.LIGHTNING: 'Lightning',
            TOSElement.MELEE: 'None',
            TOSElement.POISON: 'Poison',
            TOSElement.SOUL: 'Soul',
        }[value]

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
    BUFF = 0
    MAGIC = 1
    MISSILE = 2
    MISSILE_BOW = 3
    MISSILE_CANNON = 4
    MISSILE_GUN = 5
    MELEE = 6
    MELEE_PIERCING = 7
    MELEE_SLASH = 8
    MELEE_STRIKE = 9
    MELEE_THRUST = 10
    TRUE = 11
    UNKNOWN = 12

    @staticmethod
    def to_string(value):
        return {
            TOSAttackType.BUFF: 'Buff',
            TOSAttackType.MAGIC: 'Magic',
            TOSAttackType.MISSILE: 'Missile',
            TOSAttackType.MISSILE_BOW: 'Bow',
            TOSAttackType.MISSILE_CANNON: 'Cannon',
            TOSAttackType.MISSILE_GUN: 'Gun',
            TOSAttackType.MELEE: 'Physical',
            TOSAttackType.MELEE_PIERCING: 'Piercing',
            TOSAttackType.MELEE_SLASH: 'Slash',
            TOSAttackType.MELEE_STRIKE: 'Strike',
            TOSAttackType.MELEE_THRUST: 'Thrust',
            TOSAttackType.TRUE: 'True Damage',
            TOSAttackType.UNKNOWN: '',
        }[value]

    @staticmethod
    def value_of(string):
        return {
            'ARIES': TOSAttackType.MELEE_PIERCING,
            'ARROW': TOSAttackType.MISSILE_BOW,
            'CANNON': TOSAttackType.MISSILE_CANNON,
            'GUN': TOSAttackType.MISSILE_GUN,
            'HOLY': None,  # HotFix: obsolete skill #40706 uses it
            'MAGIC': TOSAttackType.MAGIC,
            'MELEE': TOSAttackType.MELEE,
            'MISSILE': TOSAttackType.MISSILE,
            'SLASH': TOSAttackType.MELEE_SLASH,
            'STRIKE': TOSAttackType.MELEE_STRIKE,
            'THRUST': TOSAttackType.MELEE_THRUST,
            'TRUEDAMAGE': TOSAttackType.TRUE,
            '': TOSAttackType.UNKNOWN
        }[string.upper()]
