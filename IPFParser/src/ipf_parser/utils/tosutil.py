# coding=utf-8
from math import floor

# all formulae in this file come from [calc_property_monster.lua, item_calculate.lua]
# they and are copyrighted by © IMCGAMES CO., LTD. All Rights Reserved.

# NOTE: all methods are ignoring buffs (BM properties) as it seems they are no longer used?


def tos_item_get_basic_atk(item, item_grade):
    lv = tos_item_get_lv(item)

    if item_grade is None or lv == 0:
        return [0, 0]
    if item['DefaultEqpSlot'] == '' or item['ClassType'] == '' or item['DamageRange'] == 0:
        return [0, 0]

    slot = item['DefaultEqpSlot']
    classType = item['ClassType']
    damageRange = int(item['DamageRange']) / 100.0

    itemATK = (20 + (lv * 3)) * (int(item_grade['BasicRatio']) / 100.0)

    if classType in ['Shield', 'Staff', 'THStaff']:
        return [0, 0]  # HotFix: if rod/shield/staff, return 0 so it doesn't show up
    elif slot == "RH":
        if classType == 'THSpear' or classType == 'Musket':
            itemATK = itemATK * 1.95
        elif classType == 'Spear':
            itemATK = itemATK * 1.65
        elif classType == 'Mace':
            itemATK = itemATK * 1.35
        elif classType == 'THMace':
            itemATK = itemATK * 1.62
        elif classType == 'Bow' or classType == 'Rapier':
            itemATK = itemATK * 1.5
        else:
            itemATK = itemATK * 1.8
    elif slot == "RH LH":
        if classType == 'Sword':
            itemATK = itemATK * 1.5
    elif slot == "LH":
        if classType == 'Cannon':
            itemATK = itemATK * 1.65
        elif classType == 'Pistol':
            itemATK = itemATK * 1.5
        else:
            itemATK = itemATK * 1.35
    else:
        return [0, 0]

    maxAtk = round(itemATK * damageRange)
    minAtk = round(itemATK * (2 - damageRange))

    return [minAtk, maxAtk]


def tos_item_get_basic_matk(item, item_grade):
    lv = tos_item_get_lv(item)

    if item_grade is None or lv == 0:
        return 0
    if item['ClassType'] == '':
        return 0

    itemMATK = (20 + (lv * 3)) * (int(item_grade['BasicRatio']) / 100.0)
    classType = item['ClassType']

    if classType == 'THStaff':
        itemMATK = itemMATK * 1.8
    elif classType == 'Staff':
        itemMATK = itemMATK * 1.5
    elif classType == 'Mace':
        itemMATK = itemMATK * 1.35
    elif classType == 'THMace':
        itemMATK = itemMATK * 1.62
    else:
        return 0

    return itemMATK


def tos_item_get_basic_def(item, item_grade):
    lv = tos_item_get_lv(item)

    if item_grade is None or lv == 0:
        return 0
    if item['ClassType'] == '':
        return 0
    if 'DEF' not in item['BasicTooltipProp'].split(';'):
        return 0

    classType = item['ClassType']

    if classType in ['Shirt', 'Pants', 'Shield']:
        equipRatio = 3.5
    elif classType in ['Boots', 'Gloves']:
        equipRatio = 4.5
    elif classType == 'Neck':
        equipRatio = 5.5
    elif classType == 'Ring':
        equipRatio = 11
    elif classType == 'Hat':
        equipRatio = 0
    else:
        return 0

    itemDEF = ((20 + lv * 3) / equipRatio) * (int(item_grade['BasicRatio']) / 100.0)
    equipMaterial = item['Material']

    if equipMaterial == 'Cloth':
        itemDEF = itemDEF * 1.7
    elif equipMaterial == 'Leather':
        itemDEF = itemDEF * 1.7
    elif equipMaterial == 'Iron':
        itemDEF = itemDEF * 3.4
    elif classType == 'Shield':
        itemDEF = itemDEF * 3.4

    itemDEF = 1 if itemDEF < 1 else itemDEF
    itemDEF = floor(itemDEF)

    return itemDEF


def tos_item_get_basic_mdef(item, item_grade):  # based on SCR_REFRESH_ACC and SCR_REFRESH_ARMOR
    lv = tos_item_get_lv(item)

    if item_grade is None or lv == 0:
        return 0
    if item['ClassType'] == '':
        return 0
    if 'MDEF' not in item['BasicTooltipProp'].split(';'):
        return 0

    classType = item['ClassType']

    if classType in ['Shirt', 'Pants', 'Shield']:
        equipRatio = 3.5
    elif classType in ['Boots', 'Gloves']:
        equipRatio = 4.5
    elif classType == 'Neck':
        equipRatio = 5.5
    elif classType == 'Ring':
        equipRatio = 11
    elif classType == 'Hat':
        equipRatio = 0
    else:
        return 0

    itemMDEF = ((20 + lv * 3) / equipRatio) * (int(item_grade['BasicRatio']) / 100.0)
    equipMaterial = item['Material']

    if equipMaterial == 'Cloth':
        itemMDEF = itemMDEF * 3.4
    elif equipMaterial == 'Leather':
        itemMDEF = itemMDEF * 1.7
    elif equipMaterial == 'Iron':
        itemMDEF = itemMDEF * 1.7
    elif classType == 'Shield':
        itemMDEF = itemMDEF * 3.4

    itemMDEF = 1 if itemMDEF < 1 else itemMDEF
    itemMDEF = floor(itemMDEF)

    return itemMDEF


def tos_item_get_lv(item):
    return int(item['ItemLv']) if int(item['ItemLv']) > 0 else int(item['UseLv'])


def tos_mon_get_lv(monster):
    return int(monster['Level']) if 'Level' in monster else 1


def tos_mon_get_stat(monster, stat): # stat (STR, INT, CON, MNA/SPR, DEX
    reducer = lambda x, y: (x if isinstance(x, int) else int(monster[x])) + int(monster[y])

    lv = tos_mon_get_lv(monster)
    allStatMax = 10 + lv

    stat = 'MNA' if stat == 'SPR' else stat
    stat = stat + '_Rate'
    statRate = int(monster[stat]) if stat in monster else 0
    statRateList = ['STR_Rate', 'INT_Rate', 'CON_Rate', 'MNA_Rate', 'DEX_Rate']
    statRateTotal = float(reduce(reducer, statRateList))

    value = allStatMax * (statRate / statRateTotal) + floor(lv / 10)

    return 1 if value < 1 else floor(value)


def tos_mon_get_mhp(monster, monster_stat_type): # maximum HP
    hpCount = int(monster['HPCount'])
    if hpCount > 0:
        return hpCount

    byLevel = 30 * tos_mon_get_lv(monster)

    stat = tos_mon_get_stat(monster, 'CON')
    byStat = (byLevel * (stat * 0.005)) + (byLevel * (floor(stat / 10) * 0.015))

    byMHPRate = (int(monster['MHPRate']) if 'MHPRate' in monster else 100) / 100.0
    byStatType = (int(monster_stat_type['HP']) if monster_stat_type is not None else 100) / 100.0
    byRaceType = tos_race_type_rate(monster, "MHP")
    bySizeType = tos_size_type_rate(monster, "MHP")

    byFaction = 5000 if monster['Faction'] == 'Summon' else 0

    value = byLevel + byStat
    value = value * (byMHPRate * byStatType * byRaceType * bySizeType)
    value = value + byFaction

    return 1 if value < 1 else floor(value)


def tos_mon_get_msp(monster): # maximum SP
    mna = tos_mon_get_stat(monster, 'MNA')
    lv = tos_mon_get_lv(monster)

    byLevel = floor((lv - 1) * 6.7)
    byStat = floor(mna * 13)

    value = byLevel + byStat

    return 1 if value < 1 else floor(value)


def tos_mon_get_exp(monster, monster_stat, monster_stat_type): # exp
    if int(monster['EXP_Rate']) + int(monster['JEXP_Rate']) == 0 or monster_stat is None or monster_stat_type is None:
        return 0

    expValue = int(monster_stat_type['EXP']) if monster_stat_type is not None else 100

    value = int(monster_stat['EXP_BASE'])
    value = value * (expValue / 100.0) * (int(monster['EXP_Rate']) / 100.0)

    return floor(value)


def tos_mon_get_jobexp(monster, monster_stat, monster_stat_type): # class exp
    if int(monster['EXP_Rate']) + int(monster['JEXP_Rate']) == 0 or monster_stat is None or monster_stat_type is None:
        return 0

    expValue = int(monster_stat_type['JEXP']) if monster_stat_type is not None else 100

    value = int(monster_stat['JEXP_BASE'])
    value = value * (expValue / 100.0) * (int(monster['JEXP_Rate']) / 100.0)

    return floor(value)


def tos_mon_get_def(monster, monster_stat_type): # defense
    fixedDEF = int(monster['FixedDefence'])
    if fixedDEF > 0:
        return fixedDEF

    byLevel = tos_mon_get_lv(monster) * 1.0
    basicGradeRatio, reinforceGradeRatio = tos_mon_item_grade_rate(monster)

    byReinforce = tos_mon_item_reinforce_armor_calc(monster, monster_stat_type, reinforceGradeRatio)
    byTranscend = tos_mon_item_transcend_armor_calc(monster, monster_stat_type)

    byItem = tos_mon_item_armor_calc(monster)
    byItem = floor(byItem * basicGradeRatio)
    byItem = floor(byItem * byTranscend) + byReinforce

    byDEFRate = (int(monster['DEFRate']) if 'DEFRate' in monster else 100) / 100.0
    byRaceType = tos_race_type_rate(monster, 'DEF')

    value = byLevel + byItem
    value = value * (byDEFRate * byRaceType)

    return 0 if value < 0 else floor(value)


def tos_mon_get_mdef(monster, monster_stat_type): # magic defense (same as defense, but uses MDEF stats)
    fixedDEF = int(monster['FixedDefence'])
    if fixedDEF > 0:
        return fixedDEF

    byLevel = tos_mon_get_lv(monster) * 1.0
    basicGradeRatio, reinforceGradeRatio = tos_mon_item_grade_rate(monster)

    byReinforce = tos_mon_item_reinforce_armor_calc(monster, monster_stat_type, reinforceGradeRatio)
    byTranscend = tos_mon_item_transcend_armor_calc(monster, monster_stat_type)

    byItem = tos_mon_item_armor_calc(monster)
    byItem = floor(byItem * basicGradeRatio)
    byItem = floor(byItem * byTranscend) + byReinforce

    byDEFRate = (int(monster['MDEFRate']) if 'MDEFRate' in monster else 100) / 100.0
    byRaceType = tos_race_type_rate(monster, 'MDEF')

    value = byLevel + byItem
    value = value * (byDEFRate * byRaceType)

    return 0 if value < 0 else floor(value)


def tos_mon_get_hr(monster): # hit rate

    byLevel = tos_mon_get_lv(monster) * 0.25

    stat = tos_mon_get_stat(monster, 'STR')
    byStat = byStat = (stat * 0.5) + (floor(stat / 15) * 3)
    byHitRate = (int(monster['HitRate']) if 'HitRate' in monster else 100) / 100.0

    value = ((byLevel + byStat) * byHitRate)

    return floor(value)


def tos_mon_get_dr(monster): # evasion/dodge rate
    if int(monster['HPCount']) > 0:
        return 0

    byLevel = tos_mon_get_lv(monster) * 0.25

    stat = tos_mon_get_stat(monster, 'DEX')
    byStat = (stat * 0.5) + (floor(stat / 15) * 3)
    byDodgeRate = (int(monster['DodgeRate']) if 'DodgeRate' in monster else 100) / 100.0

    value = ((byLevel + byStat) * byDodgeRate)

    return floor(value)


def tos_mon_get_crthr(monster): # crit hit rate

    byLevel = tos_mon_get_lv(monster) * 0.5
    byCRTHitRate = (int(monster['CRTHitRate']) if 'CRTHitRate' in monster else 100) / 100.0

    value = byLevel * byCRTHitRate

    return floor(value)


def tos_mon_get_crtdr(monster): # crit dodge rate

    byLevel = tos_mon_get_lv(monster) * 0.5

    return floor(byLevel)


def tos_mon_get_crtatk(monster): # crit attack

    stat = tos_mon_get_stat(monster, 'DEX')
    value = (stat * 2) + (floor(stat / 10) * 5);

    return floor(value)


def tos_mon_get_atk_ratio(monster, monster_stat_type): # attack ratio
    return (int(monster_stat_type['ATK']) if monster_stat_type is not None else 100) / 100.0


def tos_mon_get_minpatk(monster, monster_stat_type): # minimum physical attack
    return tos_mon_atk(monster, monster_stat_type, is_physical=True, is_min=True)


def tos_mon_get_maxpatk(monster, monster_stat_type): # maximum physical attack (same as minimum, except the ATKRange)
    return tos_mon_atk(monster, monster_stat_type, is_physical=True, is_min=False)


def tos_mon_get_minmatk(monster, monster_stat_type): # minimum magic attack (same as minpatk, but uses INT instead)
    return tos_mon_atk(monster, monster_stat_type, is_physical=False, is_min=True)


def tos_mon_get_maxmatk(monster, monster_stat_type): # maximum magic attack (same as maxpatk, but uses INT instead)
    return tos_mon_atk(monster, monster_stat_type, is_physical=False, is_min=False)


def tos_mon_get_blkable(monster):
    return monster['Blockable']


def tos_mon_get_blk(monster): # block rate
    if int(monster['Blockable']) == 0:
        return 0

    byLevel = tos_mon_get_lv(monster) * 0.25

    stat = tos_mon_get_stat(monster, 'CON')
    byStat = (stat * 0.5) + (floor(stat / 15) * 3)

    byBlockRate = int(monster['BlockRate']) if 'BlockRate' in monster else 100
    byBlockRate = (byLevel + byStat) * (byBlockRate * 0.01)

    value = byLevel + byStat + byBlockRate

    return floor(value)


def tos_mon_get_blk_break(monster):

    byLevel = tos_mon_get_lv(monster) * 0.25

    stat = tos_mon_get_stat(monster, 'DEX')
    byStat = (stat * 0.5) + (floor(stat / 15) * 3)

    value = byLevel + byStat

    return floor(value)


########################################################################################################################
#   Private methods
########################################################################################################################


def tos_mon_atk(monster, monster_stat_type, is_min, is_physical):
    stat = tos_mon_get_stat(monster, ('STR' if is_physical else 'INT'))
    byStat = (stat * 2) + (floor(stat / 10) * 5)

    byLevel = tos_mon_get_lv(monster) * 0.5
    basicGradeRatio, reinforceGradeRatio = tos_mon_item_grade_rate(monster)

    byReinforce = tos_mon_item_reinforce_weapon_calc(monster, monster_stat_type, reinforceGradeRatio)
    byTranscend = tos_mon_item_transcend_weapon_calc(monster, monster_stat_type)

    byItem = tos_mon_item_weapon_calc(monster)
    byItem = floor(byItem * basicGradeRatio)
    byItem = floor(byItem * byTranscend) + byReinforce

    byATKRange = (int(monster['ATK_RANGE']) if 'ATK_RANGE' in monster else 100)
    byATKRange = min(max(100, byATKRange), 200)

    byATKRate = (int(monster['ATKRate']) if 'ATKRate' in monster else 100) / 100.0
    byRaceType = tos_race_type_rate(monster, 'ATK')

    value = byStat + byLevel + byItem
    value = value * ((2.0 - byATKRange / 100.0) if is_min else (byATKRange / 100.0))
    value = value * (byATKRate * byRaceType)

    return 1 if value < 1 else floor(value)


def tos_mon_item_grade_rate(monster):
    monRank = monster['MonRank'] if 'MonRank' in monster else 'Normal'

    basicGradeRatio = 1
    reinforceGradeRatio = 1

    if monRank == 'Normal' or monRank == 'Material':
        basicGradeRatio = 0.9  # normal
        reinforceGradeRatio = 1.0
    elif monRank == 'Special':
        basicGradeRatio = 1.0  # rare
        reinforceGradeRatio = 1.2
    elif monRank == 'Elite':
        basicGradeRatio = 1.1  # rare
        reinforceGradeRatio = 1.5
    elif monRank == 'Boss':
        basicGradeRatio = 1.25  # unique
        reinforceGradeRatio = 2.0

    return basicGradeRatio, reinforceGradeRatio


def tos_mon_item_armor_calc(monster):
    lv = tos_mon_get_lv(monster)
    value = 20 + (max(1, lv - 50) * 3)

    return floor(value * 1.0)


def tos_mon_item_weapon_calc(monster):
    lv = tos_mon_get_lv(monster)
    value = 20 + (max(1, lv - 50) * 3)

    return floor(value * 1.0)


def tos_mon_item_reinforce_armor_calc(monster, monster_stat_type, reinforceGradeRatio):
    if monster_stat_type is None:
        return 0

    lv = tos_mon_get_lv(monster)
    reinforceValue = int(monster_stat_type['ReinforceArmor'])

    value = floor((reinforceValue + (max(1, lv - 50) * (reinforceValue * (0.12 + (floor((min(21, reinforceValue) - 1) / 5) * 0.0225 ))))))
    value = floor(value * reinforceGradeRatio)

    return value


def tos_mon_item_reinforce_weapon_calc(monster, monster_stat_type, reinforceGradeRatio):
    if monster_stat_type is None:
        return 0

    lv = tos_mon_get_lv(monster)
    reinforceValue = int(monster_stat_type['ReinforceWeapon'])

    value = floor((reinforceValue + (max(1, lv - 50) * (reinforceValue * (0.08 + (floor((min(21, reinforceValue) - 1) / 5) * 0.015 ))))))
    value = floor(value * reinforceGradeRatio)

    return value


def tos_mon_item_transcend_armor_calc(monster, monster_stat_type):
    if monster_stat_type is None:
        return 1

    return 1 + (int(monster_stat_type['TranscendArmor']) * 0.1)


def tos_mon_item_transcend_weapon_calc(monster, monster_stat_type):
    if monster_stat_type is None:
        return 1

    return 1 + (int(monster_stat_type['TranscendWeapon']) * 0.1)


def tos_race_type_rate(monster, prop):
    raceList = ['Widling', 'Forester', 'Paramune', 'Velnias', 'Klaida']
    raceRateList = {
        'ATK':  [1.0, 1.0, 1.0, 1.0, 1.0],
        'DEF':  [0.95, 0.8, 1, 0.9, 0.85],
        'MDEF': [0.85, 1, 0.8, 0.9, 0.95],
        'MHP':  [1.0, 1.0, 1.0, 1.0, 1.0]
    }

    if prop not in raceRateList or 'RaceType' not in monster or monster['RaceType'] == '':
        return 1.0

    raceType = raceList.index(monster['RaceType'])

    return raceRateList[prop][raceType]


def tos_size_type_rate(monster, prop):
    sizeList = ['S', 'M', 'L', 'XL']
    sizeRateList = {
        #'ATK': [1.0, 1.0, 1.0, 1.0, 1.0],
        #'DEF': [1.6, 0.72, 2.0, 1.2, 0.8],
        #'MDEF': [0.8, 1, 1.25, 1.5],
        'MHP': [0.8, 1, 1.25, 1.5]
    }

    if prop not in sizeRateList or 'Size' not in monster:
        return 1.0

    sizeType = sizeList.index(monster['Size'])

    return sizeRateList[prop][sizeType]
