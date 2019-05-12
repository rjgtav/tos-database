## TOSMap :: TOSEntity

#### Properties
- HasChallengeMode `boolean`
- Level `int`
- Prop_EliteMonsterCapacity
- Prop_MaxHateCount `int`
- Prop_RewardEXPBM `double`
- Stars `int`
- Type `TOSMapType`
- Warp `int`
- WorldMap `int[]`

#### Links
- Link_Collections `TOSEntityLink[]`
- Link_Items `TOSItemDropLink[]`
- Link_Items_Exploration `TOSItemDropLink[]`
- Link_Maps `TOSEntityLink[]`
- Link_Maps_Floors `TOSEntityLink[]`
- Link_NPCs `TOSNPCSpawnLink[]`
- Link_Quests ???
- Link_Songs ???

### TOSMapType
- BARRACK
- CITY
- DUNGEON
- FIELD
- INSTANCE
- LOGIN

## TOSNPCSpawnLink

### Properties
- NPC `TOSEntityLink`
- Population `int`
- Positions `double[3][]`
- TimeRespawn `int`