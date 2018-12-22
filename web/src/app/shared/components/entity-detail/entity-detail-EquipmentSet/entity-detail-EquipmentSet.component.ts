import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {EquipmentSetListConfigurationResolver} from "../../../../database/resolvers/equipment-set-list-configuration.resolver";

@Component({
  selector: 'tos-entity-detail-EquipmentSet',
  templateUrl: './entity-detail-EquipmentSet.component.html',
  styleUrls: ['./entity-detail-EquipmentSet.component.scss']
})
export class EntityDetailEquipmentSetComponent extends EntityDetailChildComponent {

  readonly COLUMNS = EquipmentSetListConfigurationResolver.COLUMNS;

  @Input('divider')
  divider: boolean = true;

  @Input('header')
  header: boolean;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

}
