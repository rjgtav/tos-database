import * as glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import * as xml2js from 'xml2js';
import {TOSRegionService} from "../../tos-web/src/app/shared/domain/tos-region";
import {TOSLanguage, TOSLanguageService} from "../../tos-web/src/app/shared/domain/tos-language";

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

const REGION = TOSRegionService.valueOf(process.argv[2]);

if (REGION == null)
    throw Error('Invalid region: ' + process.argv[2]);

const PATH_PARSER = path.join('..', 'tos-parser');
const PATH_PARSER_INPUT = path.join(PATH_PARSER, 'input', REGION);

const PATH_WEB_SERVER = path.join('..', 'tos-web-server');
const PATH_WEB_SERVER_WWW = path.join(PATH_WEB_SERVER, 'www');
const PATH_WEB_SERVER_WWW_TRANSLATION = path.join(PATH_WEB_SERVER_WWW, 'assets', 'region', TOSRegionService.toUrl(REGION), 'translation');

(async function() {
    for (let language of TOSLanguageService.byRegion(REGION)) {
        console.log('Loading translation for', language);
        let translation = await load(language);

        // Save translation on disk
        fs.existsSync(PATH_WEB_SERVER_WWW_TRANSLATION) || fs.mkdirSync(PATH_WEB_SERVER_WWW_TRANSLATION);
        fs.writeFileSync(path.join(PATH_WEB_SERVER_WWW_TRANSLATION, `${ TOSLanguageService.toUrl(language) }.json.js`), JSON.stringify(translation));
    }
})();

async function load(language: TOSLanguage) {
    let translation = {};
    let [translationById, translationByOriginal] = loadTranslation(language);

    // Include translations from ClientMessage.xml
    let clientMessage = await xml2js.parseStringPromise(fs.readFileSync(path.join(PATH_PARSER_INPUT, 'data', 'xml_lang.ipf', 'clientmessage.xml'), 'utf-8'), { attrkey: '', explicitArray: true, mergeAttrs: true });
    clientMessage.idspace.Category.forEach(category => category.Class
        .filter(classe => classe.ClassName && classe.Data)
        .forEach(classe => translation[classe.ClassName[0]] = translationByOriginal[classe.Data[0]])
    );
    clientMessage = null;

    // Include translations from WholeDicID.xml
    let wholeDicID = await xml2js.parseStringPromise(fs.readFileSync(path.join(PATH_PARSER_INPUT, 'data', 'language.ipf', 'wholedicid.xml'), 'utf8'), { attrkey: '', explicitArray: true, mergeAttrs: true });
        wholeDicID.filelist.file.forEach(file => Array.isArray(file.data) && file.data.forEach(data => {
            let key = data.original[0];
            let value = data.dicid[0];
            let valueTranslated = data.dicid[0];

            let match = null;
            let regex = /@dicID_\^\*\$(.*?)\$\*\^/g;

            while (match = regex.exec(value)) {
                let dicid = match[1];
                let replace = match[0];

                valueTranslated = valueTranslated.replace(replace, translationById[dicid] || '');
            }

            translation[key] = valueTranslated;
        }));

    // Include original translations
    Object.assign(translation, translationByOriginal);

    return translation;
}
function loadTranslation(language: TOSLanguage) {
    let languageData = path.join(PATH_PARSER_INPUT, 'release', 'languageData', TOSLanguageService.toHuman(language), '**', '*.tsv');
    let translationById = {};
    let translationByOriginal = {};

    for (let tsv of glob.sync(languageData.replace(/\\/g, '/'))) {
        let tsvName = path.basename(tsv).split('.')[0];

        for (let row of fs.readFileSync(tsv, 'utf8').split('\n')) {
            let cells = row.split('\t');

            // Parse the tsv manually, as sometimes it comes with \n inside unquoted fields
            for (let i = 0; i < cells.length - 1; i ++) {
                let cellId = cells[i];
                let cellTranslation = cells[i + 1];
                let cellOriginal = cells[i + 2];

                // Thanks https://stackoverflow.com/a/14313213 for the isASCII regex
                if (cellId && cellTranslation && cellOriginal && cellId.startsWith(tsvName)) {
                    translationById[cellId.trim()] = cellTranslation.trim();
                    translationByOriginal[cellOriginal.trim()] = cellTranslation.trim();
                    i += 2;
                }
            }
        }
    }

    return [translationById, translationByOriginal];
}