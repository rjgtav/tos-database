import fs from 'fs';
import path from 'path';
import {TOSLanguage, TOSLanguageService} from "../../../tos-web/src/app/shared/domain/tos-language";
import {TOSRegion, TOSRegionService} from "../../../tos-web/src/app/shared/domain/tos-region";

const PATH_WEB_SERVER = path.join('..', 'tos-web-server');
const PATH_WEB_SERVER_WWW = path.join(PATH_WEB_SERVER, 'www');

export abstract class TranslationService {

    private static TRANSLATION: { [key: string]: string } = {};

    public static load(language: TOSLanguage, region: TOSRegion) {
        let translationPath = path.join(PATH_WEB_SERVER_WWW, 'assets', 'region', TOSRegionService.toUrl(region), 'translation');
        let translation = fs.readFileSync(path.join(translationPath, `${ TOSLanguageService.toUrl(language) }.json.js`), 'utf-8');

        TranslationService.TRANSLATION = JSON.parse(translation);
    }

    public static translate(original: string) {
        return TranslationService.TRANSLATION[original];
    }

}