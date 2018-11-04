import {Component, Input, SimpleChanges} from "@angular/core";
import {TOSEntity} from "../../domain/tos/tos-entity.model";
import {TOSItem} from "../../domain/tos/item/tos-item.model";
import {TOSMonster} from "../../domain/tos/monster/tos-monster.model";
import {TOSBook} from "../../domain/tos/item/book/tos-book.model";
import {TOSCard} from "../../domain/tos/item/card/tos-card.model";
import {TOSCollection} from "../../domain/tos/item/collection/tos-collection.model";
import {TOSGem} from "../../domain/tos/item/gem/tos-gem.model";
import {TOSEquipment, TOSEquipmentSet} from "../../domain/tos/item/equipment/tos-equipment.model";
import {TOSRecipe} from "../../domain/tos/item/recipe/tos-recipe.model";
import {TOSSkill} from "../../domain/tos/skill/tos-skill.model";
import {TOSMap} from "../../domain/tos/map/tos-map.model";
import {TOSJob} from "../../domain/tos/job/tos-job.model";
import {TOSAttribute} from "../../domain/tos/attribute/tos-attribute.model";
import {TOSClassTree, TOSElement, TOSItemTradability, TOSMonsterRace} from "../../domain/tos/tos-domain";

@Component({ template: '' })
export class EntityDetailChildComponent {
  readonly Math = Math;
  readonly TOSClassTree = TOSClassTree;
  readonly TOSElement = TOSElement;
  readonly TOSItemTradability = TOSItemTradability;
  readonly TOSMonsterRace = TOSMonsterRace;

  @Input('entity')
  entity: TOSEntity;

  attribute: TOSAttribute;
  book: TOSBook;
  card: TOSCard;
  collection: TOSCollection;
  equipment: TOSEquipment;
  equipmentSet: TOSEquipmentSet;
  gem: TOSGem;
  item: TOSItem;
  job: TOSJob;
  map: TOSMap;
  monster: TOSMonster;
  recipe: TOSRecipe;
  skill: TOSSkill;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      this.attribute = this.entity instanceof TOSAttribute ? this.entity as TOSAttribute : null;
      this.book = this.entity instanceof TOSBook ? this.entity as TOSBook : null;
      this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
      this.collection = this.entity instanceof TOSCollection ? this.entity as TOSCollection : null;
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.equipmentSet = this.entity instanceof TOSEquipmentSet ? this.entity as TOSEquipmentSet : null;
      this.gem = this.entity instanceof TOSGem ? this.entity as TOSGem : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
      this.job = this.entity instanceof TOSJob ? this.entity as TOSJob : null;
      this.map = this.entity instanceof TOSMap ? this.entity as TOSMap : null;
      this.monster = this.entity instanceof TOSMonster ? this.entity as TOSMonster : null;
      this.recipe = this.entity instanceof TOSRecipe ? this.entity as TOSRecipe : null;
      this.skill = this.entity instanceof TOSSkill ? this.entity as TOSSkill : null;
    }
  }

}
