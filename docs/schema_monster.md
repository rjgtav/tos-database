## TOSMonster :: TOSEntity

#### Properties
- Armor `TOSEquipmentMaterial`
- Element `TOSMonsterElement`
- Level `int`
- Race `TOSMonsterRace`
- Size `TOSMonsterSize`
- EXP `int`
- EXPClass `int`
- Stat_CON `int`
- Stat_DEX `int`
- Stat_INT `int`
- Stat_SPR `int`
- Stat_STR `int`
- Stat_HP `int`
- Stat_SP `int`
- Stat_MATK_MIN `int`
- Stat_MATK_MAX `int`
- Stat_MDEF `int`
- Stat_PATK_MIN `int`
- Stat_PATK_MAX `int`
- Stat_PDEF `int`
- Stat_Accuracy `int`
- Stat_Evasion `int`
- Stat_CriticalDamage `int`
- Stat_CriticalDefense `int`
- Stat_CriticalRate `int`
- Stat_BlockPenetration `int`
- Stat_BlockRate `int`
- Type `TOSMonsterType`

#### Links
- Link_Drops `TOSMonsterDropLink[]`
- Link_Map

### TOSMonsterElement
- DARK
- EARTH
- FIRE
- HOLY
- ICE
- LIGHTNING
- MELEE
- POISON
- SOUL

### TOSMonsterRace
- BEAST
- DEVIL
- INSECT
- MUTANT
- PLANT

### TOSMonsterRank
- BOSS
- ELITE
- NORMAL

### TOSMonsterSize
- S
- M
- L
- XL

## TOSMonsterDropLink :: TOSEntityLink

#### Properties
- Chance `float`
- Item `TOSEntityLink`
- Map `TOSEntityLink`
- Quantity_MAX `int`
- Quantity_MIN `int`