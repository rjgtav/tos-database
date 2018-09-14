## TOSJob :: TOSEntity

#### Properties
- CircleMax `int`
- ClassTree `TOSClassTree`
- ClassType `TOSClassControlType[]`
- Difficulty `TOSClassDifficulty`
- IsHidden `boolean`
- IsSecret `boolean`
- Rank `int`
- Stat_RateHP `number`
- Stat_RateSP `number`
- base stats?

#### Links
- Link_Attributes `TOSEntityLink[]`
- Link_Skills `TOSSkillLink[]`

### TOSClassTree
- ARCHER
- CLERIC
- WARRIOR
- WIZARD

### TOSClassDifficulty
- EASY
- NORMAL
- HARD

### TOSClassControlType
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
