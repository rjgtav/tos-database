import {Directive, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[cssMaxHeight]',
  host: {
    '[style.maxHeight]': 'maxHeight'
  }
})
export class CssMaxHeightDirective implements OnInit, OnDestroy, OnChanges {

                          public maxHeight: string;
  @Input('cssMaxHeight')  private maxHeight$: string;

  constructor(private zone: NgZone) {
    this.update = this.update.bind(this);
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => window.addEventListener('resize', this.update));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }
  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => window.removeEventListener('resize', this.update));
  }

  private update() {
    this.zone.run(() => this.maxHeight = this.maxHeight$ && this.maxHeight$.replace(
      /([0-9]+)%/g,
      (match, n) => (+n * window.innerHeight / 100) + 'px'
    ));
  }

}
