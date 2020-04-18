import {Express, NextFunction, Request, Response} from "express";
import {TOSRegion, TOSRegionService} from "../../../tos-web/src/app/shared/domain/tos-region";
import path from "path";
import fs from "fs";

const PATH_WEB_SERVER = path.join('..', 'tos-web-server');
const PATH_WEB_SERVER_WWW = path.join(PATH_WEB_SERVER, 'www');

export abstract class ApiImageService {

    public static handler(app: Express, endpoint: string) {
        app.get(`${ endpoint }/*`, (req, res, next) => this.get(req, res, next));
    }

    private static async get(request: Request, response: Response, next: NextFunction) {
        let region: TOSRegion;
        let image: string;

        try {
            region = TOSRegionService.valueOf(request.params.region);
            image = request.params[0].split('.js')[0];

            let text = ImageService.image(image, region);
                text
                    ? response.status(200).send(text)
                    : response.sendStatus(404);

        } catch (error) {
            return response.sendStatus(500) && console.error(
                'An error has occurred while processing: ', request.url,
                '\n\tParams:', JSON.stringify({ region, image }),
                '\n\tError:', error
            );
        }
    }

}

export abstract class ImageService {

    private static IMAGE: { [key in TOSRegion]: { [key: string]: string } } = {} as any;

    public static clear() {
        ImageService.IMAGE = {} as any;
    }

    private static load(region: TOSRegion) {
        let imagePath = path.join(PATH_WEB_SERVER_WWW, 'assets', 'region', TOSRegionService.toUrl(region), 'ui', 'ui.json');
        let image = fs.existsSync(imagePath) && fs.readFileSync(imagePath, 'utf-8');

        ImageService.IMAGE[region] = image && JSON.parse(image);
    }

    public static loadAll() {
        for (let region of TOSRegionService.values())
            ImageService.load(region);
    }

    public static image(name: string, region: TOSRegion) {
        return ImageService.IMAGE[region][name && name.toLowerCase()];
    }

}