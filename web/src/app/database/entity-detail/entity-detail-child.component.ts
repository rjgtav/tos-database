import {TOSEquipment, TOSEquipmentSet} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {Component, Input, SimpleChanges} from "@angular/core";
import {TOSClassTree, TOSElement, TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSItem, TOSItemTradability} from "../../shared/domain/tos/item/tos-item.model";
import {TOSCollection} from "../../shared/domain/tos/item/collection/tos-collection.model";
import {TOSMonster, TOSMonsterRace} from "../../shared/domain/tos/monster/tos-monster.model";
import {TOSRecipe} from "../../shared/domain/tos/item/recipe/tos-recipe.model";
import {TOSCard} from "../../shared/domain/tos/item/card/tos-card.model";
import {TOSGem} from "../../shared/domain/tos/item/gem/tos-gem.model";
import {TOSBook} from "../../shared/domain/tos/item/book/tos-book.model";

@Component({ template: '' })
export class EntityDetailChildComponent {
  readonly Math = Math;
  readonly TOSClassTree = TOSClassTree;
  readonly TOSElement = TOSElement;
  readonly TOSItemTradability = TOSItemTradability;
  readonly TOSMonsterRace = TOSMonsterRace;

  @Input('entity')
  public entity: TOSEntity;

  public book: TOSBook;
  public card: TOSCard;
  public collection: TOSCollection;
  public equipment: TOSEquipment;
  public equipmentSet: TOSEquipmentSet;
  public gem: TOSGem;
  public item: TOSItem;
  public monster: TOSMonster;
  public recipe: TOSRecipe;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      this.book = this.entity instanceof TOSBook ? this.entity as TOSBook : null;
      this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
      this.collection = this.entity instanceof TOSCollection ? this.entity as TOSCollection : null;
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.equipmentSet = this.entity instanceof TOSEquipmentSet ? this.entity as TOSEquipmentSet : null;
      this.gem = this.entity instanceof TOSGem ? this.entity as TOSGem : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
      this.monster = this.entity instanceof TOSMonster ? this.entity as TOSMonster : null;
      this.recipe = this.entity instanceof TOSRecipe ? this.entity as TOSRecipe : null;
    }
  }

}
