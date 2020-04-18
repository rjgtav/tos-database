import * as glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import sax from 'sax';
import * as xml2js from 'xml2js';
import {TOSRegion, TOSRegionService} from "../../tos-web/src/app/shared/domain/tos-region";
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

const BLACKLIST_TSV = ['BADWORDS.tsv'];
const BLACKLIST_UI = ['(', ')', "'", '?', '!', '--'];

(async function() {
    let dictionary = await loadDictionary(REGION);
    let translationOriginal = await loadTranslationOriginal();

    for (let language of TOSLanguageService.values()[REGION]) {
        let [translationById, translationByOriginal] = await loadTranslation(language, translationOriginal);
        let translation = translate(dictionary, translationById, translationByOriginal);

        // TODO: find a decent algorithm for selecting just the necessary translations
        // TODO: for the UI, will probably have to store the translations by ID plus the clientmessage.xml keys
        let translationUI = translation
            .filter(entry => entry.value.split(' ').length < 10)
            .filter(entry => !BLACKLIST_UI.find(c => entry.key.indexOf(c) != -1))
            .filter(entry => !BLACKLIST_UI.find(c => entry.value.indexOf(c) != -1))
        ;

        let reduce = (value: { key: string, value: string }[]) => value.reduce((acc, entry) => { acc[entry.key] = entry.value; return acc }, {});

        // Save translation on disk
        fs.existsSync(PATH_WEB_SERVER_WWW_TRANSLATION) || fs.mkdirSync(PATH_WEB_SERVER_WWW_TRANSLATION);
        fs.writeFileSync(path.join(PATH_WEB_SERVER_WWW_TRANSLATION, `${ TOSLanguageService.toUrl(language) }.json.js`), JSON.stringify(reduce(translation)));
        fs.writeFileSync(path.join(PATH_WEB_SERVER_WWW_TRANSLATION, `${ TOSLanguageService.toUrl(language) }-ui.json.js`), JSON.stringify(reduce(translationUI)));
    }
})();

async function loadDictionary(region: TOSRegion) {
    console.log(`Loading dictionary for ${ region }...`);
    let result: Dictionary[] = [];

    // Include dictionary from ClientMessage.xml
    let clientMessage = await xml2js.parseStringPromise(fs.readFileSync(path.join(PATH_PARSER_INPUT, 'data', 'xml_lang.ipf', 'clientmessage.xml'), 'utf-8'), { attrkey: '', explicitArray: true, mergeAttrs: true });
        clientMessage.idspace.Category
            .forEach(category => category.Class
                .filter(classe => classe.ClassName && classe.Data)
                .forEach(classe => result.push({ key: classe.ClassName[0], original: classe.Data[0] }))
        );
        clientMessage = null;

    // Include dictionary from WholeDicID.xml
    let wholeDicID = await xml2js.parseStringPromise(fs.readFileSync(path.join(PATH_PARSER_INPUT, 'data', 'language.ipf', 'wholedicid.xml'), 'utf8'), { attrkey: '', explicitArray: true, mergeAttrs: true });
        wholeDicID.filelist.file
            .forEach(file => Array.isArray(file.data) && file.data
                .forEach(data => result.push({ key: data.original[0], original: data.dicid[0] })));

    return result;
}
async function loadTranslation(language: TOSLanguage, translationOriginal: { [key: string]: Translation }) {
    console.log('Loading translation for', language);
    let languageData = path.join(PATH_PARSER_INPUT, 'release', 'languageData', language, '**', '*.tsv');
    let translationById: { [key: string]: Translation } = {};
    let translationByOriginal: { [key: string]: Translation } = {};

    if (language == TOSLanguage.Korean) {
        for (let translation of Object.values(translationOriginal)) {
            translation = {
                id: translation.id,
                original: translation.original,
                translation: translation.original,
            };

            translationById[translation.id] = translation;
            translationByOriginal[translation.original] = translation;
        }
    } else {
        for (let tsv of glob.sync(languageData.replace(/\\/g, '/'))) {
            let name = path.basename(tsv).split('.')[0];

            if (BLACKLIST_TSV.indexOf(path.basename(tsv)) >= 0)
                continue;
            if (!fs.existsSync(tsv))
                continue;

            // Parse the tsv manually, as sometimes it comes with \n inside unquoted fields
            console.log(`\tReading ${ tsv }...`);
            let data = fs.readFileSync(tsv, 'utf8');
            let iStart = 0;
            let iEnd = 0;

            do {
                iStart = data.indexOf(`${ name }_`, iEnd);
                iEnd = data.indexOf(`${ name }_`, iStart + 1);
                iEnd = iEnd >= 0 ? iEnd : data.length;

                let row = data.slice(iStart, iEnd).split(/\t+/g);

                let id = row[0] && row[0].trim();
                let original = translationOriginal[id] && translationOriginal[id].original || row[2] && row[2].trim();
                let translated = row[1] && row[1].trim();

                if (id == undefined || original == undefined || translated == undefined)
                    continue;

                let translation: Translation = {
                    id: id,
                    original: original,
                    translation: translated,
                };

                translationById[translation.id] = translation;
                translationByOriginal[translation.original] = translation;
            } while (iEnd < data.length);
        }
    }

    return [translationById, translationByOriginal];
}
async function loadTranslationOriginal() {
    console.log('Loading translation original...');
    let result: { [key: string]: Translation } = {};

    let parser = sax.createStream(true, { trim: true, normalize: true, lowercase: true, position: false });
        parser.on('opentag', value => {
            if (value.name == 'dic_data') {
                let id = value.attributes.ID as string;
                let original = value.attributes.kr as string;

                result[id] = { id, original };
            }
        });

    await new Promise(resolve => fs
        .createReadStream(path.join(PATH_PARSER_INPUT, 'data', 'language.ipf', 'dicidtable.xml'))
        .pipe(parser)
        .on('end', () => resolve())
    );

    return result
}

function translate(dictionary: Dictionary[], translationById: { [key: string]: Translation }, translationByOriginal: { [key: string]: Translation }) {
    console.log('Translating dictionary...');
    return dictionary.map(dictionary => {
        let key = dictionary.key;
        let original = dictionary.original;
        let value = translationByOriginal[original] && translationByOriginal[original].translation || original;

        if (key == 'OPTMisc')
            debugger;

        let match;
        let regex = /@dicID_\^\*\$(.*?)\$\*\^/g;

        while (match = regex.exec(value)) {
            let dicid = match[1];
            let replace = match[0];

            if (translationById[dicid] == undefined)
                continue;

            value = value.replace(replace, translationById[dicid].translation);
        }

        return { key, value }
    })
}

interface Dictionary {
    key: string;
    original: string;
}

interface Translation {
    id: string;
    original: string;
    translation?: string;
}
