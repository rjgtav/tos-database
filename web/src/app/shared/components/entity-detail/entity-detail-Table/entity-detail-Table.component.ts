import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSEntity} from "../../../domain/tos/tos-entity.model";
import {TOSMonster} from "../../../domain/tos/monster/tos-monster.model";
import {TOSItem} from "../../../domain/tos/item/tos-item.model";
import {TOSMap} from "../../../domain/tos/map/tos-map.model";

@Component({
  selector: 'tos-entity-detail-Table',
  templateUrl: './entity-detail-Table.component.html',
  styleUrls: ['./entity-detail-Table.component.scss']
})
export class EntityDetailTableComponent extends EntityDetailChildComponent {

  TOSItem = TOSItem;
  TOSMap = TOSMap;
  TOSMonster = TOSMonster;

  @Input() data: any[];
  @Input() link: string;
  @Input() divider: boolean;
  @Input() header: string;

  @Output() tooltipChange: EventEmitter<TOSEntity> = new EventEmitter();

  constructor() { super() }

  instanceOf(entity: TOSEntity, classe: any) {
    return entity instanceof classe;
  }

  rowLink(row: any) {
    return this.link ? row[this.link] : row
  }

}
