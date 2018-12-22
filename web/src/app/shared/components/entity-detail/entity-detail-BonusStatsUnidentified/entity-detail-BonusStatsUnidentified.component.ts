import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-BonusStatsUnidentified',
  templateUrl: './entity-detail-BonusStatsUnidentified.component.html',
  styleUrls: ['./entity-detail-BonusStatsUnidentified.component.scss']
})
export class EntityDetailBonusStatsUnidentifiedComponent extends EntityDetailChildComponent {

  @Input('divider')
  divider: boolean = true;

  @Input('header')
  header: boolean;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

}
