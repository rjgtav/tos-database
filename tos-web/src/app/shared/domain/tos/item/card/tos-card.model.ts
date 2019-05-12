import {TOSItem} from "../tos-item.model";
import {ITOSCard, TOSCardType, TOSDataSet, TOSElement, TOSMonsterRace} from "../../tos-domain";

export class TOSCard extends TOSItem implements ITOSCard {

  constructor(json: TOSCard) {
    super(TOSDataSet.CARDS, json);
  }

  get Description() { return this.$lazyPropertyStringMultiline('Description')
    .split('{img star_mark 20 20}')
    .join('<span class="text-warning">★</span>')
  }
  get IconTooltip() {
    let icon = this.$lazyPropertyString('IconTooltip');

    return icon
      ? 'assets/icons/' + icon.toLowerCase() + '.jpg'
      : null;
  }
  get MonsterElement() { return this.$lazyPropertyEnum('MonsterElement', TOSElement) }
  get MonsterRace() { return this.$lazyPropertyEnum('MonsterRace', TOSMonsterRace) }
  get Stat_Height() { return this.$lazyPropertyNumber('Stat_Height') }
  get Stat_Legs() { return this.$lazyPropertyNumber('Stat_Legs') }
  get Stat_Weight() { return this.$lazyPropertyNumber('Stat_Weight') }
  get TypeCard() { return this.$lazyPropertyEnum('TypeCard', TOSCardType) }

}
