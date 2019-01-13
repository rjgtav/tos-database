import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TOSUrlService} from "../../shared/service/tos-url.service";
import {TOSDataSetService} from "../../shared/domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  TOSDataSetService = TOSDataSetService;

  constructor() { }

  routerLink(url: string): string {
    return TOSUrlService.Route(url);
  }

}
