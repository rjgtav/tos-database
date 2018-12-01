import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSEquipmentType, TOSEquipmentTypeService} from "../../../domain/tos/tos-domain";

@Component({
  selector: 'tos-entity-detail-MaterialNameType',
  templateUrl: './entity-detail-MaterialNameType.component.html',
  styleUrls: ['./entity-detail-MaterialNameType.component.scss']
})
export class EntityDetailMaterialNameTypeComponent extends EntityDetailChildComponent {

  @Input() idName: boolean;

  constructor() { super() }

  get titleSmall(): string {
    if (this.equipment)
      return TOSEquipmentTypeService.toStringFull(this.equipment.TypeEquipment) +
        (this.equipment.Material ? ' [' + this.equipment.Material + ']' : '') +
        (this.equipment.TypeAttack ? ' [' + this.equipment.TypeAttack + ']' : '');
    else if (this.monster)
      return this.monster.Rank + ' [' + this.monster.Armor + ']';
    else if (this.gem)
      return this.item.Type + ' [' + this.gem.TypeGem + ']';
    else if (this.item)
      return this.item.Type;
  }

}
