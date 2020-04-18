import {Express, NextFunction, Request, Response} from "express";
import {TOSRegion, TOSRegionService} from "../../../tos-web/src/app/shared/domain/tos-region";
import {DatabaseService} from "../service/database.service";
import {TOSLanguage, TOSLanguageService} from "../../../tos-web/src/app/shared/domain/tos-language";
import {TranslateService} from "../service/translate.service";

// List of tables called by the LUA :: GetClassByNumProp() in which the column != 'ClassID'
const TABLE_ALL_WHITELIST = ['ancient_rarity', 'ancient_rank', 'item_grade', 'inven_baseid'];
const TABLE_BY_CLASS = {
    'item': ['item', 'item_colorspray', 'item_equip', 'item_gem', 'item_petequip', 'item_premium', 'item_quest'],
    'itemtranscend': ['item_transcend'],
};

// Unfortunately we can't blindly translate every property as it may corrupt the original item data
const TRANSLATE_WHITELIST = ['Desc', 'Name'];

export abstract class ApiDataService {

    public static handler(app: Express, endpoint: string) {
        app.get(`${ endpoint }/*`, (req, res, next) => this.get(req, res, next));
    }

    private static async get(request: Request, response: Response, next: NextFunction) {
        let language: TOSLanguage;
        let region: TOSRegion;
        let param: string;

        try {
            language = TOSLanguageService.valueOf(request.params.language);
            region = TOSRegionService.valueOf(request.params.region);
            param = request.params[0].split('.js')[0];

            let i = param.lastIndexOf('/');
            let id = DatabaseService.sanitize(param.slice(i + 1));
            let table = DatabaseService.tableName(param.slice(0, i));

            let json: object;
            let result: object[] = [];
            let schema = DatabaseService.schema(region);
            let schemaTables = TABLE_BY_CLASS[table] || [table];

            // Retrieve requested entry/ies
            for (let table of schemaTables) {
                if (id === '*' && TABLE_ALL_WHITELIST.indexOf(table) >= 0)
                    result = result.concat(await DatabaseService.entries(schema, table));
                else {
                    json = isNaN(+id)
                        ? await DatabaseService.entryByClassName(schema, table, id)
                        : await DatabaseService.entryByClassID(schema, table, +id);

                    if (json) {
                        result.push(json);
                        break;
                    }
                }
            }

            // Translate result
            result.forEach(json => TRANSLATE_WHITELIST
                .filter(key => json.hasOwnProperty(key))
                .forEach(key => json[key] = TranslateService.translate(language, region, json[key])));

            result.length > 1
                ? response.status(200).json(result)
                : response.status(200).json(result[0])
            ;
        } catch (error) {
            return response.sendStatus(500) && console.error(
                'An error has occurred while processing: ', request.url,
                '\n\tParams:', JSON.stringify({ language, region, param }),
                '\n\tError:', error
            );
        }
    }

}
