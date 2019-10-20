import {V2TOSDataSet} from "../../../tos-web/src/app/shared/domain/tos-dataset";
import {FlexSearchEnum$Id, FlexSearchEnum$Reference} from "./flexsearch-enum";

export class FlexSearchDocument {

    readonly $: number;
    readonly $dataset: V2TOSDataSet;
    readonly Name: string;

    private readonly $keys: FlexSearchEnum$Reference[] = [];
    private readonly $values: any[] = [];

    constructor(dataset: V2TOSDataSet, Name: string) {
        this.$ = FlexSearchDocument.$id();
        this.$dataset = dataset;
        this.Name = Name;
    }

    set(entry: object, key: string) {
        this.$keys.push(new FlexSearchEnum$Reference(FlexSearchEnum$Id.Document$Key, key));
        this.$values.push(entry[key]);
    }
    setEnum(entry: object, key: string, enum$: FlexSearchEnum$Id, value?: string) {
        value = value !== undefined ? value : entry[key];

        if (value == null)
            return;

        this.$keys.push(new FlexSearchEnum$Reference(FlexSearchEnum$Id.Document$Key, `${ key }|${ enum$ }`));
        this.$values.push(new FlexSearchEnum$Reference(enum$, value));
    }
    setEnumMulti(entry: object, key: string, enum$: FlexSearchEnum$Id, value: string[]) {
        value = value && value.filter(value => value != null);

        if (value == null || value.length == 0)
            return;

        this.$keys.push(new FlexSearchEnum$Reference(FlexSearchEnum$Id.Document$Key, `${ key }|${ enum$ }`));
        this.$values.push(new FlexSearchEnum$Reference(enum$, value));
    }

    toJSON() {
        let json = {} as any;
            json.$dataset = this.$dataset;

        this.$keys.forEach((key, i) => {
            let value = this.$values[i];
                value = value && value.toJSON ? value.toJSON() : value;
                value = isNaN(value) || Array.isArray(value) ? value : +value;

            if (value == null || typeof value === 'number' && isNaN(value))
                return;

            json[key.toJSON() as string] = value;
        });

        return json;
    }

    // We use an incrementing integer as the identifier so we can then store the index as an array and save some space
    private static $idGenerator: number = -1;
    private static $id() { return this.$idGenerator = this.$idGenerator + 1 }

}
