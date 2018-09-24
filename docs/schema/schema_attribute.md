## TOSAttribute :: TOSEntity

#### Properties
- IsToggleable `boolean`
- LevelMax `int`
- UpgradePrice `int[]`
- UpgradeTime `int[]`

#### Links
- Link_Jobs `TOSEntityLink[]`
- Link_Skill `TOSEntityLink`
- Link_UnlockJob `TOSAttributeUnlockJobLink[]`
- Link_UnlockSkill `TOSAttributeUnlockSkillLink`

### TOSAttributeUnlockJobLink
#### Properties
- Job: `TOSEntityLink`
- Level: int

### TOSAttributeUnlockSkillLink
#### Properties
- Skill: `TOSEntityLink`
- Level: int
