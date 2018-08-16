import { Component } from '@angular/core';
import {ItemDetailChildComponent} from "../item-detail-child.component";

@Component({
  selector: 'app-item-detail-AttackDefense',
  templateUrl: './item-detail-AttackDefense.component.html',
  styleUrls: ['./item-detail-AttackDefense.component.scss']
})
export class ItemDetailAttackDefenseComponent extends ItemDetailChildComponent {

  constructor() { super() }

}
