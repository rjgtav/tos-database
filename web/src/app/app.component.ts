import { Component } from '@angular/core';
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private ngbTooltipConfig: NgbTooltipConfig) {
    this.ngbTooltipConfig.disableTooltip = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
  }

}
