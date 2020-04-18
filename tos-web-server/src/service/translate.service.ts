import fs from 'fs';
import path from 'path';
import {TOSLanguage, TOSLanguageService} from "../../../tos-web/src/app/shared/domain/tos-language";
import {TOSRegion, TOSRegionService} from "../../../tos-web/src/app/shared/domain/tos-region";

const PATH_WEB_SERVER = path.join('..', 'tos-web-server');
const PATH_WEB_SERVER_WWW = path.join(PATH_WEB_SERVER, 'www');

export abstract class TranslateService {

    private static TRANSLATION: { [key in TOSRegion]: { [key in TOSLanguage]: { [key: string]: string } } } = {} as any;

    public static clear() {
        TranslateService.TRANSLATION = {} as any;
    }

    private static load(language: TOSLanguage, region: TOSRegion) {
        let translationPath = path.join(PATH_WEB_SERVER_WWW, 'assets', 'region', TOSRegionService.toUrl(region), 'translation', `${ TOSLanguageService.toUrl(language) }.json.js`);
        let translation = fs.existsSync(translationPath) && fs.readFileSync(translationPath, 'utf-8');

        TranslateService.TRANSLATION[region] = TranslateService.TRANSLATION[region] || {} as any;
        TranslateService.TRANSLATION[region][language] = translation && JSON.parse(translation);
    }

    public static loadAll() {
        for (let region of TOSRegionService.values())
            for (let language of TOSLanguageService.values()[region])
                TranslateService.load(language, region);
    }

    public static translate(language: TOSLanguage, region: TOSRegion, text: string) {
        return TranslateService.TRANSLATION[region][language][text] || text;
    }

}