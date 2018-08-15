## TOSEquipment :: TOSItem

#### Properties
- Bonuses `[TOSEntityStat, int][]`
- Durability `int`
- Grade `TOSEquipmentGrade`
- Material `TOSEquipmentMaterial`
- Potential `int`
- RequiredClass `boolean[]` Whether this equipment can be used by:
    - [0] Archer
    - [1] Cleric
    - [2] Swordsman
    - [3] Wizard
- RequiredGender ?? - maybe put this one just on costumes/premium
- RequiredLevel `int`
- Sockets `int`
- SocketsLimit `int`
- Stars `int`
- Stat_ATTACK_MAGICAL `int`
- Stat_ATTACK_PHYSICAL_MAX `int`
- Stat_ATTACK_PHYSICAL_MIN `int`
- Stat_DEFENSE_MAGICAL `int`
- Stat_DEFENSE_PHYSICAL `int`
- TypeAttack `TOSEquipmentAttackType`
- TypeEquipment `TOSEquipmentType`
- Unidentified `bool`
- UnidentifiedRandom `bool`

## TOSEquipmentAttackType
- PIERCING - or Aries
- BOW - or Arrow
- CANNON
- GUN
- SLASH
- STRIKE
- THRUST
- UNKNOWN

## TOSEquipmentGrade
- NORMAL - or White
- MAGIC - or Blue
- RARE - or Purple
- UNIQUE - or Orange
- LEGENDARY - or Yellow

### TOSEquipmentMaterial
- CLOTH
- GHOST
- LEATHER
- PLATE
- UNKNOWN

## TOSEquipmentType
- BOTTOM - or Pants
- BRACELET - or Ring
- CANNON
- CHARM
- COSTUME_ARMBAND - or Armband
- COSTUME_EFFECT - or EffectCostume
- COSTUME_HAIR - or Hair
- COSTUME_HAIR_ACCESSORY - or Hat
- COSTUME_HELMET - or Helmet
- COSTUME_LENS - or Lens
- COSTUME_OUTFIT - or Outer
- COSTUME_SPECIAL - SpecialCostume
- COSTUME_TOY - or Artefact
- COSTUME_WING - or Wing
- DAGGER
- GLOVES
- NECKLACE
- ONE_HANDED_BOW - or Crossbow
- ONE_HANDED_GUN - or Pistol
- ONE_HANDED_MACE - or Mace
- ONE_HANDED_SPEAR - or Spear
- ONE_HANDED_STAFF - or Staff
- ONE_HANDED_SWORD - or Sword
- RAPIER
- SHIELD
- SHOES - or Boots
- TOP - or Shirt
- TWO_HANDED_BOW - or Bow
- TWO_HANDED_GUN - or Musket
- TWO_HANDED_MACE - or THMace
- TWO_HANDED_SPEAR - or THSpear
- TWO_HANDED_STAFF - or THStaff
- TWO_HANDED_SWORD - or THSword
