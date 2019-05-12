## TOSItem :: TOSEntity

#### Properties
- Price `int` Sell price at NPC Shops
- TimeCoolDown `float` Cooldown time between uses
- TimeLifeTime `float` Expiration time, after which the item will be unavailable
- Tradabability `boolean[]` Whether this item can be traded:
    - [0] at the Market
    - [1] in NPC Shops
    - [2] between Players
    - [3] through Team Storage
- Type `TOSItemType`
- Weight `float`

#### Links
- Link_Collections `TOSEntityLink[]`
- Link_Maps `TOSMapDropLink[]`
- Link_Maps_Exploration `TOSMapDropLink[]`
- Link_Cubes `TOSEntityLink[]`
- Link_Monsters `TOSMonsterDropLink[]`
- Link_RecipeTarget `TOSEntityLink[]`
- Link_RecipeMaterial `TOSEntityLink[]`

### TOSItemType

- ARMBAND
- ARMOR
- BOOK
- CARD
- COLLECTION
- CUBE
- DRUG
- EQUIPMENT
- EVENT
- EXPORB
- FISHINGROD
- GEM
- HELMET
- ICOR
- MAGICAMULET
- MATERIAL
- PASTEBAIT
- PETARMOR
- PETWEAPON
- PREMIUM
- QUEST
- RECIPE
- SUBWEAPON
- UNUSED
- WEAPON
- $ANY$

## TOSMonsterDropLink

#### Properties
- Chance `float`
- Monster `TOSEntityLink`
- Quantity_MAX `int`
- Quantity_MIN `int`

## TOSMapDropLink

#### Properties
- Chance `float`
- Map `TOSEntityLink`
- Quantity_MAX `int`
- Quantity_MIN `int`