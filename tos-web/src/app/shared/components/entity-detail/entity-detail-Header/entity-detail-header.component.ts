import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSEquipmentTypeService} from "../../../domain/tos/tos-domain";

@Component({
  selector: 'tos-entity-detail-Header',
  templateUrl: './entity-detail-header.component.html',
  styleUrls: ['./entity-detail-header.component.scss']
})
export class EntityDetailHeaderComponent extends EntityDetailChildComponent {

  @Input() idName: boolean;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

  get titleSmall(): string {
    if (this.equipment)
      return TOSEquipmentTypeService.toStringHuman(this.equipment.TypeEquipment) +
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
