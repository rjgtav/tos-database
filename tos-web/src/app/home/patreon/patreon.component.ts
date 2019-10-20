import {ChangeDetectorRef, Component} from '@angular/core';
import {PatreonService, PatreonTier, PatronsByTier} from "./patreon.service";

@Component({
  selector: 'tos-patreon',
  templateUrl: './patreon.component.html',
  styleUrls: ['./patreon.component.scss']
})
export class PatreonComponent {

  readonly EMOTICONS_KEPA = ['emoticon_0002.png', 'emoticon_0003.png', 'emoticon_0028.png', 'emoticon_0029.png'];
  readonly EMOTICONS_TINI = ['emoticon_0004.png', 'emoticon_0005.png', 'emoticon_0030.png', 'emoticon_0031.png', 'emoticon_0032.png', 'emoticon_0033.png', 'emoticon_0034.png', 'emoticon_0035.png', 'emoticon_0036.png']
  readonly EMOTICONS_POPOLION = ['emoticon_0006.png', 'emoticon_0008.png', 'emoticon_0009.png', 'emoticon_0010.png', 'emoticon_0011.png', 'emoticon_0012.png', 'emoticon_0013.png', 'emoticon_0014.png', 'emoticon_0015.png', 'emoticon_0016.png', 'emoticon_0017.png', 'emoticon_0018.png', 'emoticon_0019.png', 'emoticon_0020.png', 'emoticon_0021.png', 'emoticon_0022.png', 'emoticon_0023.png', 'emoticon_0037.png', 'emoticon_0038.png', 'emoticon_0039.png', 'emoticon_0040.png', 'emoticon_0041.png', 'emoticon_0042.png', 'emoticon_0043.png', 'emoticon_0044.png', 'emoticon_0045.png', 'emoticon_0046.png'];
  readonly EMOTICONS_KUPOLE = ['kupole_emotion01.png', 'kupole_emotion02.png', 'kupole_emotion03.png', 'kupole_emotion04.png', 'kupole_emotion05.png', 'kupole_emotion06.png'];

  readonly PatreonTier = PatreonTier;
  readonly PatreonService = PatreonService;

  patrons: PatronsByTier;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private patreon: PatreonService,
  ) {
    this.patreon.patrons$ByTier.subscribe(value => {
      this.patrons = value;
      this.changeDetector.markForCheck();
    })
  }

  emoticon(name: string, emoticons: string[]) {
    let hash = 0;

    for (let i = 0; i < name.length; i ++)
      hash += name.charCodeAt(i);

    return emoticons[hash % emoticons.length];
  }

}
