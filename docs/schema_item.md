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
- Link_Drops `TOSItemDropLink[]`
- Link_Recipe `TOSEntityLink[]`

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

## TOSItemDropLink :: TOSEntityLink

#### Properties
- Chance `float`
- Monster `TOSEntityLink`
