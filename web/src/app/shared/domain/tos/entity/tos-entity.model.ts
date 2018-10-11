export abstract class Comparable {
  $comparators: { [key: string]: (a, b) => -1 | 0 | 1; } = {}
}

export abstract class TOSEntity extends Comparable {
  $ID: number;
  $ID_NAME: string;
  Description: string;
  Icon: string;
  Name: string;
  Url: string;

  protected constructor(json: TOSEntity, url: string) {
    super();

    this.$comparators['$ID'] = (a: number, b: number) => {
      let i = +a;
      let j = +b;

      return (i < j) ? -1 : (i > j) ? 1 : 0;
    };

    this.$ID = +json.$ID;
    this.$ID_NAME = json.$ID_NAME;
    this.Description = json.Description ? json.Description.replace(/{nl}/g, '\n') : null;
    this.Icon = json.Icon ? 'assets/icons/' + json.Icon.toLowerCase() + '.png' : null;
    this.Name = json.Name;

    if (url)
      this.Url = '/database/' + url + '/' + this.$ID;
  }

  static getIcon(entity: TOSEntity): string {
    return entity.Icon;
  }

}

export enum TOSAttackType {
  PIERCING = 'Piercing',
  BOW = 'Missile: Bow',
  CANNON = 'Missile: Cannon',
  GUN = 'Missile: Gun',
  MAGIC = 'Magic',
  MELEE = 'Melee',
  SLASH = 'Slash',
  STRIKE = 'Strike',
  THRUST = 'Thrust',
  UNKNOWN = '',
}

export enum TOSClassTree {
  ARCHER = 'Archer',
  CLERIC = 'Cleric',
  SWORDSMAN = 'Swordsman',
  WIZARD = 'Wizard',
}

export enum TOSElement {
  DARK = 'Dark',
  EARTH = 'Earth',
  FIRE = 'Fire',
  HOLY = 'Holy',
  ICE = 'Ice',
  LIGHTNING = 'Lightning',
  MELEE = 'None',
  POISON = 'Poison',
  PSYCHOKINESIS = 'Psychokinesis',
}

export namespace TOSElement {
  export function getIcon(value: TOSElement): string {
    return 'assets/images/element_' + value.toString().toLowerCase() + '.png';
  }
}

export enum TOSStat {
  CON = 'CON',
  DEX = 'DEX',
  INT = 'INT',
  SPR = 'SPR',
  STR = 'STR',
  HP = 'Maximum HP',
  HP_RECOVERY = 'HP Recovery',
  SP = 'Maximum SP',
  SP_RECOVERY = 'SP Recovery',
  SP_RECOVERY_TIME = 'SP Recovery Time',
  ATTACK_ELEMENT_DARK = 'Dark Property Attack',
  ATTACK_ELEMENT_EARTH = 'Earth Property Attack',
  ATTACK_ELEMENT_FIRE = 'Fire Property Attack',
  ATTACK_ELEMENT_HOLY = 'Holy Property Attack',
  ATTACK_ELEMENT_ICE = 'Ice Property Attack',
  ATTACK_ELEMENT_LIGHTNING = 'Lightning Property Attack',
  ATTACK_ELEMENT_POISON = 'Poison Property Attack',
  ATTACK_ELEMENT_PSYCHOKINESIS = 'Psychokinesis Property Attack',
  ATTACK_LIMIT_MAX = 'Maximum Attack',
  ATTACK_LIMIT_MIN = 'Minimum Attack',
  ATTACK_MATERIAL_CHAIN = 'Attack against Chain Armored Targets',
  ATTACK_MATERIAL_CLOTH = 'Attack against Cloth Armored Targets',
  ATTACK_MATERIAL_LEATHER = 'Attack against Leather-armor Targets',
  ATTACK_MATERIAL_GHOST = 'Attack against Ghost-armor Targets',
  ATTACK_MATERIAL_PLATE = 'Attack against Plate-armor Targets',
  ATTACK_RACE_BEAST = 'Attack against Beast-type Targets',
  ATTACK_RACE_DEVIL = 'Attack against Devil-type Targets',
  ATTACK_RACE_INSECT = 'Attack against Insect-type Targets',
  ATTACK_RACE_MUTANT = 'Attack against Mutant-type Targets',
  ATTACK_RACE_PLANT = 'Attack against Plant-type Targets',
  ATTACK_SIZE_SMALL = 'Attack against Small-size Targets',
  ATTACK_SIZE_MEDIUM = 'Attack against Medium-size Targets',
  ATTACK_SIZE_LARGE = 'Attack against Large-size Targets',
  ATTACK_TYPE_PIERCING = 'Piercing-type Attack',
  ATTACK_TYPE_SLASH = 'Slash-type Attack',
  ATTACK_TYPE_STRIKE = 'Strike-type Attack',
  ATTACK_MAGICAL = 'Magic Attack',
  ATTACK_MAGICAL_AMPLIFICATION = 'Magic Amplification',
  ATTACK_PHYSICAL = 'Physical Attack',
  ATTACK_ANGLE = 'Attack Angle',
  ATTACK_RANGE = 'Attack Range',
  DEFENSE_ELEMENT_DARK = 'Dark Property Resistance',
  DEFENSE_ELEMENT_EARTH = 'Earth Property Resistance',
  DEFENSE_ELEMENT_FIRE = 'Fire Property Resistance',
  DEFENSE_ELEMENT_HOLY = 'Holy Property Resistance',
  DEFENSE_ELEMENT_ICE = 'Ice Property Resistance',
  DEFENSE_ELEMENT_LIGHTNING = 'Lightning Property Resistance',
  DEFENSE_ELEMENT_POISON = 'Poison Property Resistance',
  DEFENSE_ELEMENT_PSYCHOKINESIS = 'Psychokinesis Property Resistance',
  DEFENSE_TYPE_PIERCING = 'Piercing Defense',
  DEFENSE_TYPE_SLASH = 'Slash Defense',
  DEFENSE_TYPE_STRIKE = 'Strike Defense',
  DEFENSE_MAGICAL = 'Magic Defense',
  DEFENSE_PHYSICAL = 'Physical Defense',
  ACCURACY = 'Accuracy',
  EVASION = 'Evasion',
  BLOCK = 'Block',
  BLOCK_PENETRATION = 'Block Penetration',
  BLOCK_RATE = 'Block Rate',
  BLOCK_RATE_FINAL = 'Final Block Rate',
  CRITICAL_ATTACK = 'Critical Attack',
  CRITICAL_DEFENSE = 'Critical Resistance',
  CRITICAL_RATE = 'Critical Rate',
  AOE_ATTACK_RATIO = 'AoE Attack Ratio',
  AOE_DEFENSE_RATIO = 'AoE Defense Ratio',
  MOVEMENT_SPEED = 'Movement Speed',
  LOOTING_CHANCE = 'Looting Chance',
  STAMINA = 'Stamina',
  STAMINA_RECOVERY = 'Stamina Recovery',
  UNKNOWN = ''
}

export namespace TOSStat {

  export function comparator(a: TOSStat, b: TOSStat): -1 | 0 | 1 {
    let i = Object.values(TOSStat).indexOf(a);
    let j = Object.values(TOSStat).indexOf(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

}
