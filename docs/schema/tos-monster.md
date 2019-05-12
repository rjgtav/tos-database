## TOSMonster :: TOSEntity

#### Properties
- Armor `TOSEquipmentMaterial`
- Element `TOSElement`
- Level `int`
- Race `TOSMonsterRace`
- Rank `TOSMonsterRank`
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
- Stat_ATTACK_MAGICAL_MAX `int`
- Stat_ATTACK_MAGICAL_MIN `int`
- Stat_ATTACK_PHYSICAL_MAX `int`
- Stat_ATTACK_PHYSICAL_MIN `int`
- Stat_DEFENSE_MAGICAL `int`
- Stat_DEFENSE_PHYSICAL `int`
- Stat_Accuracy `int`
- Stat_Evasion `int`
- Stat_CriticalDamage `int`
- Stat_CriticalDefense `int`
- Stat_CriticalRate `int`
- Stat_BlockPenetration `int`
- Stat_BlockRate `int`
- Type `TOSMonsterType`

#### Links
- Link_Drops `TOSItemDropLink[]`
- Link_Maps `TOSMapSpawnLink[]`

### TOSMonsterRace
- BEAST
- DEMON
- INSECT
- MUTANT
- PLANT

### TOSMonsterRank
- BOSS
- ELITE
- NORMAL
- SPECIAL

### TOSMonsterSize
- S
- M
- L
- XL

### TOSMonsterType
- MONSTER
- NEUTRAL
- NPC
- SIGN

## TOSItemDropLink

#### Properties
- Chance `float`
- Item `TOSEntityLink`
- Quantity_MAX `int`
- Quantity_MIN `int`

## TOSMapSpawnLink

### Properties
- Map `TOSEntityLink`
- Population `int`
- TimeRespawn `int`