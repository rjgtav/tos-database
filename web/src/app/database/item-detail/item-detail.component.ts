import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription} from "rxjs";
import {TOSItem, TOSItemTradable} from "../../shared/domain/tos/item/tos-item.model";
import {TOSItemService} from "../../shared/domain/tos/item/tos-item.service";

const PARAM_ID: string = 'id';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnDestroy, OnInit {
  TOSItemTradable = TOSItemTradable;

  item: TOSItem;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private service: TOSItemService) { }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.service.findById(+params.get(PARAM_ID)).subscribe((item: TOSItem) => {
        this.item = item;
      })
    });
  }

}
