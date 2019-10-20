export enum V2TOSDataSet {
  ACHIEVEMENTS = 'achievements',
  ATTRIBUTES = 'attributes',
  CLASSES = 'classes',
  ITEMS = 'items',
  MAPS = 'maps',
  NPCS = 'npcs',
  QUESTS = 'quests',
  SKILLS = 'skills',
  STATUS_EFFECTS = 'status-effects',
}

export namespace V2TOSDataSetService {
  export const VALUES: V2TOSDataSet[] = Object.values(V2TOSDataSet);

  export function toLabel(value: V2TOSDataSet): string {
    if (value == null || (value + '') == '') return null;

    return (value || '').toString() // Convert to Human Form
      .split('-')
      .map(value => value[0].toUpperCase() + value.slice(1))
      .join(' ');
  }

  export function toProperty(value: V2TOSDataSet): string {
    return (value || '').toString() // Convert to camelCase
      .split('-')
      .map((value, index) => index > 0 ? value[0].toUpperCase() + value.slice(1) : value)
      .join('');
  }

  export function toUrl(value: V2TOSDataSet) {
    return value.toString();
  }
}
