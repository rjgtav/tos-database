import {Component, Input} from '@angular/core';
import {ItemDetailChildComponent} from "../item-detail-child.component";

@Component({
  selector: 'app-item-detail-StatsUnidentified',
  templateUrl: './item-detail-StatsUnidentified.component.html',
  styleUrls: ['./item-detail-StatsUnidentified.component.scss']
})
export class ItemDetailStatsUnidentifiedComponent extends ItemDetailChildComponent {

  @Input('header')
  header: boolean;

  constructor() { super() }

}
