import {TOSItem} from "../tos-item.model";
import {ITOSCard, TOSCardType, TOSElement, TOSMonsterRace} from "../../tos-domain";

export class TOSCard extends TOSItem implements ITOSCard {
  private description: string;

  readonly IconTooltip: string;
  readonly MonsterElement: TOSElement;
  readonly MonsterRace: TOSMonsterRace;
  readonly Stat_Height: number;
  readonly Stat_Legs: number;
  readonly Stat_Weight: number;
  readonly TypeCard: TOSCardType;

  constructor(json: TOSCard) {
    super(json, 'cards');

    this.IconTooltip = json.IconTooltip ? 'assets/icons/' + json.IconTooltip.toLowerCase() + '.jpg' : null;
    this.MonsterElement = Object.values(TOSElement)[+json.MonsterElement];
    this.MonsterRace = Object.values(TOSMonsterRace)[+json.MonsterRace];
    this.Stat_Height = +json.Stat_Height;
    this.Stat_Legs = +json.Stat_Legs;
    this.Stat_Weight = +json.Stat_Weight;
    this.TypeCard = Object.values(TOSCardType)[+json.TypeCard];
  }

  get Description(): string {
    return this.description = this.description
      ? this.description
      : this.json.Description.split('{img star_mark 20 20}').join('<span class="text-warning">★</span>');
  }

}
