import {Component} from '@angular/core';
import {PatreonService} from "./patreon.service";

@Component({
  selector: 'tos-patreon',
  templateUrl: './patreon.component.html',
  styleUrls: ['./patreon.component.scss']
})
export class PatreonComponent {

  readonly PatreonService = PatreonService;

  constructor() { }

  emoticon(name: string, emoticons: string[]) {
    let hash = 0;

    for (let i = 0; i < name.length; i ++)
      hash += name.charCodeAt(i);

    return emoticons[hash % emoticons.length];
  }

}
