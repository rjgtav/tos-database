import {Injectable} from '@angular/core';

const KEY_PATREON = 'patreon';

@Injectable({
  providedIn: 'root'
})
export class PatreonService {

  static readonly EMOTICONS_KEPA = ['emoticon_0002.png', 'emoticon_0003.png', 'emoticon_0028.png', 'emoticon_0029.png'];
  static readonly EMOTICONS_TINI = ['emoticon_0004.png', 'emoticon_0005.png', 'emoticon_0030.png', 'emoticon_0031.png', 'emoticon_0032.png', 'emoticon_0033.png', 'emoticon_0034.png', 'emoticon_0035.png', 'emoticon_0036.png']
  static readonly EMOTICONS_POPOLION = ['emoticon_0006.png', 'emoticon_0008.png', 'emoticon_0009.png', 'emoticon_0010.png', 'emoticon_0011.png', 'emoticon_0012.png', 'emoticon_0013.png', 'emoticon_0014.png', 'emoticon_0015.png', 'emoticon_0016.png', 'emoticon_0017.png', 'emoticon_0018.png', 'emoticon_0019.png', 'emoticon_0020.png', 'emoticon_0021.png', 'emoticon_0022.png', 'emoticon_0023.png', 'emoticon_0037.png', 'emoticon_0038.png', 'emoticon_0039.png', 'emoticon_0040.png', 'emoticon_0041.png', 'emoticon_0042.png', 'emoticon_0043.png', 'emoticon_0044.png', 'emoticon_0045.png', 'emoticon_0046.png'];
  static readonly EMOTICONS_KUPOLE = ['kupole_emotion01.png', 'kupole_emotion02.png', 'kupole_emotion03.png', 'kupole_emotion04.png', 'kupole_emotion05.png', 'kupole_emotion06.png'];

  static readonly PATRONS_KEPA = ['Ersakoz','IlIlIlIlIlIlIlI','Isa Lim','Julio Fernández','Nhr','Onesan','Orleen Sedoj','Palemoon','Thossapon Suekittisak','Yuuki']; /* 100-needle */
  static readonly PATRONS_POPOLION = []; /* 1000-needle */
  static readonly PATRONS_TINI = ['Edmund Tang','Kenneth Cheong','Kevin Robillard','Lymsleia','Tunico Schmidt','xZeroGodx']; /* 500-needle */
  static readonly PATRONS_KUPOLE = ['Privaron','Shinobi Runez','士允 林']; /* 2000-needle */

  constructor() { }

  static get all() { return this.PATRONS_KEPA.concat(this.PATRONS_POPOLION).concat(this.PATRONS_TINI).concat(this.PATRONS_KUPOLE) }
  static get count() { return this.PATRONS_KEPA.length + this.PATRONS_POPOLION.length + this.PATRONS_TINI.length + this.PATRONS_KUPOLE.length }
  static get show() { return localStorage.getItem(KEY_PATREON) == null || new Date(localStorage.getItem(KEY_PATREON)) < new Date() }

  static dismiss() {
    // Dismiss for 5-10 days
    let dismiss = new Date();
        dismiss.setDate(dismiss.getDate() + (5 + Math.round(Math.random() * 5)));

    localStorage.setItem(KEY_PATREON, dismiss.toISOString());
  }

  static random(count) {
    if (this.count <= count)
      return this.all;

    let result = [];
    let all = this.PATRONS_KEPA
      .concat(this.PATRONS_POPOLION)
      .concat(this.PATRONS_TINI)
      .concat(this.PATRONS_TINI)
      .concat(this.PATRONS_KUPOLE)
      .concat(this.PATRONS_KUPOLE)
      .concat(this.PATRONS_KUPOLE)
    ;

    while (count > 0) {
      let random = all[Math.floor(Math.random() * all.length)];

      if (result.indexOf(random) == -1) {
        result.push(random);
        count --;
      }
    }

    return result;
  }

}
