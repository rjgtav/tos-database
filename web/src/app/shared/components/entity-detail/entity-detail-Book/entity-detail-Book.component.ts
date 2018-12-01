import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-Book',
  templateUrl: './entity-detail-Book.component.html',
  styleUrls: ['./entity-detail-Book.component.scss']
})
export class EntityDetailBookComponent extends EntityDetailChildComponent implements OnChanges {

  page: number = 1;
  pages: string[];

  constructor() { super() }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (this.book)
      this.pages = this.book.Pages.split('{np}');
  }

  onSlide(event: any) {
    if (event.direction == 'left')   this.page ++;
    if (event.direction == 'right')  this.page --;
  }


}
