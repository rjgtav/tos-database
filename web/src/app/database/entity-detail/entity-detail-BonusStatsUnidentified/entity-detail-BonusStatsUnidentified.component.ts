import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entity-detail-BonusStatsUnidentified',
  templateUrl: './entity-detail-BonusStatsUnidentified.component.html',
  styleUrls: ['./entity-detail-BonusStatsUnidentified.component.scss']
})
export class EntityDetailBonusStatsUnidentifiedComponent extends EntityDetailChildComponent {

  @Input('divider')
  divider: boolean = true;

  @Input('header')
  header: boolean;

  constructor(public router: Router) { super() }

}
