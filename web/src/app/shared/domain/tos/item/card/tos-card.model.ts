import {TOSItem} from "../tos-item.model";
import {TOSElement} from "../../entity/tos-entity.model";
import {TOSMonsterRace} from "../../monster/tos-monster.model";

export class TOSCard extends TOSItem {
  DescriptionHTML: string;
  IconTooltip: string;

  MonsterElement: TOSElement;
  MonsterRace: TOSMonsterRace;
  Stat_Height: number;
  Stat_Legs: number;
  Stat_Weight: number;
  TypeCard: TOSCardType;

  constructor(json: TOSCard) {
    super(json);

    this.DescriptionHTML = this.Description.split('{img star_mark 20 20}').join('<span class="text-warning">★</span>');
    this.Description = null;

    this.IconTooltip = json.IconTooltip ? 'assets/icons/' + json.IconTooltip.toLowerCase() + '.png' : null;
    this.MonsterElement = Object.values(TOSElement)[+json.MonsterElement];
    this.MonsterRace = Object.values(TOSMonsterRace)[+json.MonsterRace];
    this.Stat_Height = +json.Stat_Height;
    this.Stat_Legs = +json.Stat_Legs;
    this.Stat_Weight = +json.Stat_Weight;
    this.TypeCard = Object.values(TOSCardType)[+json.TypeCard];
  }

}

export enum TOSCardType {
  ATTACK = 'Attack',
  DEFENSE = 'Defense',
  LEGENDARY = 'Legendary',
  REINFORCE = 'Reinforce Cards',
  STATS = 'Stats',
  UTILITY = 'Utility'
}
