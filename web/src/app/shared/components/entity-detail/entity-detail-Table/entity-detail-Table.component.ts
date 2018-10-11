import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSEntity} from "../../../domain/tos/entity/tos-entity.model";
import {TOSMonster} from "../../../domain/tos/monster/tos-monster.model";
import {TOSRecipe} from "../../../domain/tos/item/recipe/tos-recipe.model";
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
  TOSRecipe = TOSRecipe;

  @Input() column: string;
  @Input() link: string;
  @Input() divider: boolean;
  @Input() header: string;

  @Output() tooltipChange: EventEmitter<TOSEntity> = new EventEmitter();

  data: any[];

  constructor() { super() }

  instanceOf(entity: TOSEntity, classe: any) {
    return entity instanceof classe;
  }

  rowLink(row: any) {
    return this.link ? row[this.link] : row
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (this.entity)
      this.data = this.entity[this.column];
  }


}
