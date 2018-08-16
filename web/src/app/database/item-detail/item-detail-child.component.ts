import {TOSEquipment, TOSEquipmentType} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {Component, Input, SimpleChanges} from "@angular/core";
import {TOSClassTree, TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSItem, TOSItemTradability} from "../../shared/domain/tos/item/tos-item.model";

@Component({ template: '' })
export class ItemDetailChildComponent {
  readonly Math = Math;
  readonly TOSClassTree = TOSClassTree;
  readonly TOSEquipmentType = TOSEquipmentType;
  readonly TOSItemTradability = TOSItemTradability;

  @Input('entity')
  public entity: TOSEntity;

  public equipment: TOSEquipment;
  public item: TOSItem;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
    }
  }

}
