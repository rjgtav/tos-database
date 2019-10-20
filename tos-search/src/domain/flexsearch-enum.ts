
export abstract class FlexSearchEnum {

    protected static $enum: { [key in FlexSearchEnum$Id]?: FlexSearchEnum$Value[] } = {};

    public static add(id: FlexSearchEnum$Id, values: FlexSearchEnum$Value[]) { this.$enum[id] = values }
    public static clear() { this.$enum = {} as any }
    public static ordinal(id: FlexSearchEnum$Id, value: string) { return this.values(id).findIndex(v => v.value == value) }
    public static value(id: FlexSearchEnum$Id, value: string) { return this.values(id).find(v => v.value == value) }
    public static values(id: FlexSearchEnum$Id) { return this.$enum[id] }

    public static indexImport(json: { [key in FlexSearchEnum$Id]: string[][] }) {
        ((Object.keys(json) as unknown[]) as FlexSearchEnum$Id[])
            .forEach(id => FlexSearchEnum.add(id, json[id]
                .map(value => value.length == 1
                    ? { translation: value[0], value: value[0] }
                    : { translation: value[0], value: value[1] }
                )
            ))
    }
    public static indexExport() {
        return ((Object.keys(this.$enum) as unknown[]) as FlexSearchEnum$Id[])
            .reduce((acc, id) => { acc[id] = this.values(id).map(value => value.translation == value.value
                ? [value.translation]
                : [value.translation, value.value]
            ); return acc }, {})
    }

}

export enum FlexSearchEnum$Id {
    Attribute$AlwaysActive,
    Card$Group,
    Document$Created,
    Document$Key,
    Document$Table,
    Document$Updated,
    Equipment$Gender,
    Equipment$Sockets,
    Equipment$Material,
    Equipment$Stats,
    Item$Grade,
    Item$MarketCategory,
    Job,
    Job$Difficulty,
    Job$ControlType,
    Job$Hidden,
    Job$Tree,
    Map$ChallengeMode,
    Map$Rank,
    Map$Tendency,
    Map$Type,
    Monster$Armor,
    Monster$Attribute,
    Monster$Movement,
    Monster$Race,
    Monster$Rank,
    Monster$Size,
    Skill$AttackClass,
    Skill$AttackType,
    Skill$Attribute,
    Skill$EnableCastMove,
    Skill$EnableCompanion,
    Skill$EnableSkillCancel,
    Skill$Stance,
    Skill$Simony,
    Skill$Type,
}

export class FlexSearchEnum$Reference {

    constructor(
        public readonly id: FlexSearchEnum$Id,
        public readonly value: string | string[],
    ) {
        let add = v => FlexSearchEnum$Reference.$referenceAdd(id, v);

        Array.isArray(value)
            ? value.forEach(v => add(v))
            : add(value);
    }

    toJSON() {
        let toJSON = v => {
            let ordinal = FlexSearchEnum.ordinal(this.id, v);
            return ordinal >= 0 ? ordinal.toString(36) : undefined;
        };

        return Array.isArray(this.value)
            ? this.value.map(v => toJSON(v)).filter(v => v != undefined)
            : toJSON(this.value);
    }

    public static indexExport(translations: { [key in FlexSearchEnum$Id]?: ((value) => string) }) {
        ((Object.keys(this.$reference) as unknown[]) as FlexSearchEnum$Id[]).sort()
            .forEach(id => FlexSearchEnum.add(id, Object
                .keys(this.$reference[id]).filter(value => value && value !== '' && value !== 'undefined')
                .map(value => ({
                    translation: translations[id] && translations[id](value) || value,
                    value: value
                }))
                .sort((a, b) => a.translation > b.translation ? 1 : a.translation < b.translation ? -1 : 0)
            ));

        return FlexSearchEnum.indexExport();
    }

    protected static $reference: { [key in FlexSearchEnum$Id]?: { [key: string]: boolean } } = {};
    protected static $referenceAdd(id: FlexSearchEnum$Id, value: string) {
        this.$reference[id] = this.$reference[id] || {};
        this.$reference[id][value] = true;
    }

}

export interface FlexSearchEnum$Value {
    translation: string;
    value: string;
}
