import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Observable, Subscription} from "rxjs";
import {EntityTableColumn} from "../../entity-table/entity-table.component";

@Component({
  selector: 'tos-entity-detail-Table',
  templateUrl: './entity-detail-Table.component.html',
  styleUrls: ['./entity-detail-Table.component.scss']
})
export class EntityDetailTableComponent extends EntityDetailChildComponent implements OnChanges {

  @Input() columns: EntityTableColumn[];
  @Input() data$: Observable<any[]>;
  @Input() divider: boolean;
  @Input() header: string;
  @Input() selected: boolean;
  @Input() themeInvert: boolean;

  public data: any[];
  private subscriptionData: Subscription;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.data$ && this.data$) {
      this.subscriptionData && this.subscriptionData.unsubscribe();
      this.subscriptionData = this.data$.subscribe(value => {
        this.data = Array.isArray(value) ? value : [value];
        this.changeDetector.markForCheck();
      });
    }
  }

}
