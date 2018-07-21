import {Component, OnDestroy, OnInit} from '@angular/core';
import {TOSItemService} from "../../shared/domain/tos/item/tos-item.service";
import {TOSItem, TOSItemTypeUtil} from "../../shared/domain/tos/item/tos-item.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map, skip, switchMap, take} from "rxjs/operators";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnDestroy, OnInit {
  TOSItemTypeToString: Function = TOSItemTypeUtil.toString;

  data: TOSItem[];
  dataSize: number;
  page: number = 1;
  pageSize: number = 15;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private tosItemService: TOSItemService) { }

  ngOnDestroy() {
    this.sub ? this.sub.unsubscribe() : null;
  }

  ngOnInit() {
    this.sub = this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.tosItemService.findAll().subscribe((data: TOSItem[]) => {
        this.page = +params.get('page') || 1;
        this.dataSize = data.length;
        this.data = data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
      })
    });

    /*
    this.sub = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        this.page = +params.get('page') || 1;
        return this.tosItemService.findAll();
      }))
      .subscribe((data) => {
        this.dataSize = data.length;
        this.data = data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
      });
      */
  }

  loadPage(page: number) {
    let url: string = this.router.url.slice(0, this.router.url.lastIndexOf('/'));
    this.router.navigate([url], { queryParams: { page }})
  }

}
