## TOSJob :: TOSEntity

#### Properties
- CircleMax `int`
- JobDifficulty `TOSJobDifficulty`
- JobTree `TOSJobTree`
- JobType `TOSJobType[]`
- IsHidden `boolean`
- IsSecret `boolean`
- Rank `int`
- Stat_CON `number`
- Stat_DEX `number`
- Stat_INT `number`
- Stat_SPR `number`
- Stat_STR `number`

#### Links
- Link_Attributes `TOSEntityLink[]`
- Link_Skills `TOSSkillLink[]`

### TOSJobDifficulty
- EASY
- NORMAL
- HARD

### TOSJobTree
- ARCHER
- CLERIC
- WARRIOR
- WIZARD

### TOSJobType
- ATTACK
- ATTACK_INSTALL
- ATTACK_MANEUVERING
- ATTACK_SUMMON
- CRAFTING
- DEFENSE
- DEFENSE_PROVOKE
- SUPPORT
- SUPPORT_CONTROL
- SUPPORT_PARTY

## TOSSkillLink

#### Properties
- Skill `TOSEntityLink`
- Attributes `TOSEntityLink[]`
