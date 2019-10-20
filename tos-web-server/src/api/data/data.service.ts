import {Express, NextFunction, Request, Response} from "express";
import {TOSRegion, TOSRegionService} from "../../../../tos-web/src/app/shared/domain/tos-region";
import {TOSDatabaseService} from "../../service/database.service";

export abstract class TOSDataService {

    public static handler(app: Express, endpoint: string) {
        app.get(`${ endpoint }/:region/*`, (req, res, next) => this.get(req, res, next));
    }

    private static async get(request: Request, response: Response, next: NextFunction) {
        let region: TOSRegion;
        let param: string;

        try {
            region = TOSRegionService.valueOf(request.params.region);
            param = request.params[0].split('.js')[0];

            let i = param.lastIndexOf('/');
            let id = TOSDatabaseService.sanitize(param.slice(i + 1));
            let table = TOSDatabaseService.tableName(param.slice(0, i));

            let schema = TOSDatabaseService.schema(region);
            let json = isNaN(+id)
                ? await TOSDatabaseService.entryByClassName(schema, table, id)
                : await TOSDatabaseService.entryByClassID(schema, table, +id)
            ;

            response
                .status(200)
                .json(json)
            ;
        } catch (error) {
            return response.sendStatus(500) && console.error(
                'An error has occurred while processing: ', request.url,
                '\n\tParams:', JSON.stringify({ region, param }),
                '\n\tError:', error
            );
        }
    }

}
