import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {ITOSEntityV2} from "../../../../domain/tos/tos-domain";
import {EntityTableV2Cell} from "../entity-table-v2-cell.model";
import {ObservableUtils} from "../../../../utils/observable-utils";
import {Subscription} from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2-cell-icon-grade',
  templateUrl: './entity-table-v2-cell-icon-grade.component.html',
  styleUrls: ['./entity-table-v2-cell-icon-grade.component.scss']
})
export class EntityTableV2CellIconGradeComponent<ENTITY extends ITOSEntityV2> implements OnChanges, OnDestroy {

  @Input()    cell: EntityTableV2CellIconGrade<ENTITY>;
  @Input()    content: ENTITY;

  idGrade: string;
  idIcon: string;

  private subscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cell && this.cell) {
      this.element.nativeElement.style.height = `${ this.cell.size }px`;
      this.element.nativeElement.style.width = `${ this.cell.size }px`;
    }

    if (changes.content && this.content) {
      this.subscription && this.subscription.unsubscribe();
      this.subscription = ObservableUtils
        .of(this.content[`${ this.cell.keyGrade }$Image`])
        .subscribe(value => {
          this.idGrade = value;
          this.idIcon = this.content[this.cell.keyIcon] as any;
          this.changeDetector.markForCheck();
        })
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}

export class EntityTableV2CellIconGrade<ENTITY extends ITOSEntityV2> extends EntityTableV2Cell<ENTITY> {

  public constructor(
    public keyIcon: keyof ENTITY,
    public keyGrade: keyof ENTITY,
    public proxy: boolean,
    public size: number,
  ) { super(keyGrade, proxy) }

  get image(): boolean { return true }

}
