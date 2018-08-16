import {Component, Input} from '@angular/core';
import {ItemDetailChildComponent} from "../item-detail-child.component";

@Component({
  selector: 'app-item-detail-Information',
  templateUrl: './item-detail-Information.component.html',
  styleUrls: ['./item-detail-Information.component.scss']
})
export class ItemDetailInformationComponent extends ItemDetailChildComponent {

  @Input('header')
  header: boolean;

  constructor() { super() }

}
