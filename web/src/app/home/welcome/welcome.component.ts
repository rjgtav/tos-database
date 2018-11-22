import { Component } from '@angular/core';
import {TOSUrlService} from "../../shared/service/tos-url.service";
import {TOSRegionService} from "../../shared/service/tos-region.service";
import {TOSDataSet} from "../../shared/domain/tos/tos-domain";

@Component({
  selector: 'tos-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  TOSDataSet = TOSDataSet;

  constructor() { }

  routerLink(url: string): string {
    return TOSUrlService.Route(TOSRegionService.Region, url);
  }

}
