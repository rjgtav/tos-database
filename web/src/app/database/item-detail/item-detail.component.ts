import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TOSItem} from "../../shared/domain/tos/item/tos-item.model";
import {TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSEquipment} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {DomSanitizer} from "@angular/platform-browser";
import {TOSBook} from "../../shared/domain/tos/item/book/tos-book.model";
import {ItemDetailClassIconGradeComponent} from "./item-detail-ClassIconGrade/item-detail-ClassIconGrade.component";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  readonly ICON_WIDTH = ItemDetailClassIconGradeComponent.ICON_LARGE_WIDTH;

  entity: TOSEntity;

  book: TOSBook;
  equipment: TOSEquipment;
  item: TOSItem;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.entity = this.route.snapshot.data.response as TOSEntity;

    this.book = this.entity instanceof TOSBook ? this.entity as TOSBook : null;
    this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
    this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
  }

}
