import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITOSEntityV2} from "../../../../domain/tos/tos-domain";
import {EntityTableV2Cell} from "../entity-table-v2-cell.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2-cell-icon',
  templateUrl: './entity-table-v2-cell-icon.component.html',
  styleUrls: ['./entity-table-v2-cell-icon.component.scss']
})
export class EntityTableV2CellIconComponent<ENTITY extends ITOSEntityV2> implements OnChanges {

  @Input()    config: EntityTableV2CellIcon<ENTITY>;
  @Input()    entity: ENTITY;

  id: string;
  size: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config)
      this.size = this.config.size;
    if (changes.entity && this.entity)
      this.id = this.entity[this.config.key] as any;
  }

}

export class EntityTableV2CellIcon<ENTITY extends ITOSEntityV2> extends EntityTableV2Cell<ENTITY> {

  public constructor(
    public key: keyof ENTITY,
    public proxy: boolean,
    public size: number,
  ) { super(key, proxy) }

  get image(): boolean { return true }

}
