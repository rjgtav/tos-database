import {Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {TOSItem, TOSItemTradable} from "../../shared/domain/tos/item/tos-item.model";

@Component({
  selector: 'app-item-tooltip',
  templateUrl: './item-tooltip.component.html',
  styleUrls: ['./item-tooltip.component.scss']
})
export class ItemTooltipComponent implements OnChanges, OnDestroy {
  TOSItemTradable = TOSItemTradable;

  @Input('TOSItem')
  item: TOSItem;

  constructor(private element: ElementRef) {
    this.onMouseLeave();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      if (this.item)  this.onMouseEnter();
      else            this.onMouseLeave();
    }
  }

  ngOnDestroy(): void {
    this.onMouseLeave();
  }

  private onMouseEnter() {
    document.body.addEventListener('mousemove', this.onMouseMove);
    this.element.nativeElement.style.visibility = 'visible';
  }

  private onMouseLeave() {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    this.element.nativeElement.style.visibility = 'hidden';
  }

  private onMouseMove = (e: MouseEvent) => {
    let top = 0, bottom = window.innerHeight - this.element.nativeElement.clientHeight - 16;
    let left = 0, right = window.innerWidth - this.element.nativeElement.clientWidth - 16;

    this.element.nativeElement.style.position = 'fixed';
    this.element.nativeElement.style.left = Math.max(left, Math.min(right, e.clientX)) + 'px';
    this.element.nativeElement.style.top = Math.max(top, Math.min(bottom, e.clientY)) + 'px';
  }

}
