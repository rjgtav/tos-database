import fs from 'fs';
import path from 'path';
import * as xml from 'fast-xml-parser';
import {TOSRegionService} from "../../tos-web/src/app/shared/domain/tos-region";
import {TOSLanguage, TOSLanguageService} from "../../tos-web/src/app/shared/domain/tos-language";
import {DatabaseService, TOSEntry} from "../../tos-web-server/src/service/database.service";
import {FlexSearchService} from "./service/flexsearch.service";
import {V2TOSDataSet} from "../../tos-web/src/app/shared/domain/tos-dataset";
import {FlexSearchEnum, FlexSearchEnum$Id, FlexSearchEnum$Reference} from './domain/flexsearch-enum';
import {FlexSearchDocument} from "./domain/flexsearch-document";
import {TranslateService} from "../../tos-web-server/src/service/translate.service";

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

const REGION = TOSRegionService.valueOf(process.argv[2]);

if (REGION == null)
    throw Error('Invalid region: ' + process.argv[2]);

const PATH_PARSER = path.join('..', 'tos-parser');
const PATH_PARSER_INPUT = path.join(PATH_PARSER, 'input', REGION);
const PATH_PARSER_INPUT_DATA = path.join(PATH_PARSER_INPUT, 'data');
const PATH_WEB_SERVER = path.join('..', 'tos-web-server');
const PATH_WEB_SERVER_WWW = path.join(PATH_WEB_SERVER, 'www');
const PATH_WEB_SERVER_WWW_SEARCH = path.join(PATH_WEB_SERVER_WWW, 'assets', 'region', TOSRegionService.toUrl(REGION), 'search');

const DATABASE_TABLES: { [key in V2TOSDataSet]: string[] } = {
    'achievements': [
        // TODO: implement
    ],
    'attributes': [
        'ability',
    ],
    'classes': [
        'job',
    ],
    'items': [
        'item',
        'item_colorspray',
        'item_equip',
        'item_gem',
        'item_premium',
        'item_petequip',
        'item_quest',
        'legend_recipe',
        'legend_setitem',
        'setitem',
        'recipe',
    ],
    'maps': [
        'map',
    ],
    'npcs': [
        'monster',
        'monster_event',
        'monster_npc',
        'monster_pet',
        'monster_solo_dungeon',
    ],
    'quests': [
        // TODO: implement
    ],
    'skills': [
        'skill',
    ],
    'status-effects': [
        // TODO: implement
    ]
};

(async function() {
    for (let language of TOSLanguageService.values()[REGION]) {
        console.log(`[${ REGION }] Building search index for ${ language }...`);

        // Initialize database
        const DATABASE_SCHEMA = DatabaseService.schema(REGION);

        // Initialize data
        const TOS_COMMON_PROP_LIST = await tosCommonPropertiesList();
        const TOS_CONTROL_SET = await tosControlSet();
        const TOS_SIMONY_LIST = await tosSimony(DATABASE_SCHEMA);

        const TOS_JOBS = await tosJobs(DATABASE_SCHEMA);
        const TOS_SKILLS = await tosSkills(DATABASE_SCHEMA);

        const TOS_JOBS_BY_ABILITY = await tosJobsByAbility(DATABASE_SCHEMA, TOS_JOBS);
        const TOS_JOBS_BY_SKILL = await tosJobsBySkill(DATABASE_SCHEMA, TOS_JOBS, TOS_SKILLS);

        // Initialize index
        const INDEX = FlexSearchService.index(language);

        // Initialize translations
        TranslateService.load(language, REGION);

        // Index database
        for (let dataset of Object.keys(DATABASE_TABLES) as V2TOSDataSet[]) {
            for (let table of DATABASE_TABLES[dataset]) {
                for (let entry of await DatabaseService.entries(DATABASE_SCHEMA, table)) {

                    let Name = entry['Name'] = TranslateService.translate(language, entry['Name']);
                    if (Name == null || Name.trim().length === 0)
                        continue;

                    // Note: from this point onwards, we can't skip any more entries, otherwise the $ generator will break
                    let doc = new FlexSearchDocument(dataset, Name);
                        doc.set(entry, 'ClassID');
                        doc.set(entry, 'Name');
                        doc.setEnum(entry, '$table', FlexSearchEnum$Id.Document$Table, table);
                        doc.setEnum(entry, '__Entry_Created', FlexSearchEnum$Id.Document$Created, tosDate(new Date(entry['__Entry_Created'])));
                        doc.setEnum(entry, '__Entry_Updated', FlexSearchEnum$Id.Document$Updated, tosDate(new Date(entry['__Entry_Updated'])));

                    switch (dataset) {
                        case V2TOSDataSet.ATTRIBUTES: {
                            let job = TOS_JOBS_BY_ABILITY[entry.ClassName];

                            doc.setEnum(entry, 'AlwaysActive', FlexSearchEnum$Id.Attribute$AlwaysActive);               // Active/Passive
                            doc.setEnumMulti(entry, '$Job', FlexSearchEnum$Id.Job, job);                                // Class
                            break;
                        }
                        case V2TOSDataSet.CLASSES: {
                            let role = entry['ControlType'].split(',');

                            doc.setEnum(entry, 'CtrlType', FlexSearchEnum$Id.Job$Tree);                                 // Class Tree
                            doc.setEnum(entry, 'ControlDifficulty', FlexSearchEnum$Id.Job$Difficulty);                  // Difficulty
                            doc.setEnum(entry, 'HiddenJob', FlexSearchEnum$Id.Job$Hidden);                              // Hidden
                            doc.setEnumMulti(entry, 'ControlType', FlexSearchEnum$Id.Job$ControlType, role);            // Role
                            break;
                        }
                        case V2TOSDataSet.ITEMS: {
                            let ItemGrade = +entry['ItemGrade'] > 0 ? entry['ItemGrade'] : null;
                            let Stats = TOS_COMMON_PROP_LIST.filter(p => entry[p] && +entry[p] != 0);

                            doc.setEnum(entry, 'CardGroupName', FlexSearchEnum$Id.Card$Group);                          // Card Group
                            doc.setEnum(entry, 'UseGender', FlexSearchEnum$Id.Equipment$Gender);                        // Gender
                            doc.setEnum(entry, 'ItemGrade', FlexSearchEnum$Id.Item$Grade, ItemGrade);                   // Grade
                            doc.setEnum(entry, 'MarketCategory', FlexSearchEnum$Id.Item$MarketCategory);                // Market category
                            doc.setEnum(entry, 'Material', FlexSearchEnum$Id.Equipment$Material);                       // Material
                            doc.set(entry, 'UseLv');                                                                    // Required Level
                            doc.setEnum(entry, 'MaxSocket_COUNT', FlexSearchEnum$Id.Equipment$Sockets);                 // Sockets
                            doc.setEnumMulti(entry, '$Stats', FlexSearchEnum$Id.Equipment$Stats, Stats);                // Stats
                            break;
                        }
                        case V2TOSDataSet.MAPS: {
                            doc.setEnum(entry, 'ChallengeMode', FlexSearchEnum$Id.Map$ChallengeMode);                   // Challenge Mode
                            doc.set(entry, 'QuestLevel');                                                               // Quest Level
                            doc.setEnum(entry, 'Rank', FlexSearchEnum$Id.Map$Rank);                                     // Rank
                            doc.setEnum(entry, 'Tendency', FlexSearchEnum$Id.Map$Tendency);                             // Monster Aggressiveness
                            doc.setEnum(entry, 'MapType', FlexSearchEnum$Id.Map$Type);                                  // Type
                            break;
                        }
                        case V2TOSDataSet.NPCS: {
                            doc.setEnum(entry, 'ArmorMaterial', FlexSearchEnum$Id.Monster$Armor);                       // Armor
                            doc.setEnum(entry, 'Attribute', FlexSearchEnum$Id.Monster$Attribute);                       // Attribute
                            doc.set(entry, 'Level');                                                                    // Level
                            doc.setEnum(entry, 'MoveType', FlexSearchEnum$Id.Monster$Movement);                         // Movement
                            doc.setEnum(entry, 'RaceType', FlexSearchEnum$Id.Monster$Race);                             // Race
                            doc.setEnum(entry, 'MonRank', FlexSearchEnum$Id.Monster$Rank);                              // Rank
                            doc.setEnum(entry, 'Size', FlexSearchEnum$Id.Monster$Size);                                 // Size
                            break;
                        }
                        case V2TOSDataSet.SKILLS: {
                            let job = TOS_JOBS_BY_SKILL[entry.ClassName];
                            let simony = TOS_SIMONY_LIST.indexOf(entry['ClassID']) >= 0 ? 'YES' : 'NO';
                            let stance = entry['ReqStance'].split(';');

                            doc.setEnum(entry, 'AttackType', FlexSearchEnum$Id.Skill$AttackType);                       // Attack Type
                            doc.setEnum(entry, 'Attribute', FlexSearchEnum$Id.Skill$Attribute);                         // Attribute
                            doc.setEnum(entry, 'EnableSkillCancel', FlexSearchEnum$Id.Skill$EnableSkillCancel);         // Cancel
                            doc.setEnumMulti(entry, '$Job', FlexSearchEnum$Id.Job, job);                                // Class
                            doc.setEnum(entry, 'ClassType', FlexSearchEnum$Id.Skill$AttackClass);                       // Attack Category
                            doc.setEnum(entry, 'EnableCastMove', FlexSearchEnum$Id.Skill$EnableCastMove);               // Cast while Moving
                            doc.setEnum(entry, 'EnableCompanion', FlexSearchEnum$Id.Skill$EnableCompanion);             // Cast while Riding
                            doc.setEnumMulti(entry, 'ReqStance', FlexSearchEnum$Id.Skill$Stance, stance);               // Required Stance
                            doc.setEnum(entry, '$Simony', FlexSearchEnum$Id.Skill$Simony, simony);                      // Simony
                            doc.setEnum(entry, 'ValueType', FlexSearchEnum$Id.Skill$Type);                              // Skill Type
                            break;
                        }
                    }

                    INDEX.add(doc);
                }
            }
        }

        // Translate enums
        const TRANSLATIONS_ITEM_GRADE = await translationsItemGrade(TOS_CONTROL_SET, language);

        FlexSearchEnum$Reference.indexExport({
            [FlexSearchEnum$Id.Equipment$Stats]: value => TranslateService.translate(language, value),
            [FlexSearchEnum$Id.Equipment$Material]: value => TranslateService.translate(language, value),
            [FlexSearchEnum$Id.Item$Grade]: value => TRANSLATIONS_ITEM_GRADE[value],
            [FlexSearchEnum$Id.Item$MarketCategory]: value => TranslateService.translate(language, value.split('_')[1]),
        });

        // Save index on disk
        fs.existsSync(PATH_WEB_SERVER_WWW_SEARCH) || fs.mkdirSync(PATH_WEB_SERVER_WWW_SEARCH);
        fs.writeFileSync(path.join(PATH_WEB_SERVER_WWW_SEARCH, `${ TOSLanguageService.toUrl(language) }.json.js`), FlexSearchService.indexExport(INDEX));

        /*
        // Test
        let exported = JSON.parse(FlexSearchService.indexExport(INDEX));

        FlexSearchService.indexImport(INDEX, exported);

        let results;
            results = FlexSearchService.indexSearch(INDEX, 'primus'); debugger;
            results = FlexSearchService.indexSearch(INDEX, 'onion'); debugger;
            results = FlexSearchService.indexSearch(INDEX, 'kep'); debugger;
         */

        // Clear before the next iteration
        FlexSearchDocument.clear();
        FlexSearchEnum.clear();
        FlexSearchEnum$Reference.clear();
        TranslateService.clear();
    }

    // Close Database
    await DatabaseService.end();
})();

function tosDate(value: Date) {
    return `${ value.getFullYear() }-${ (value.getMonth() + 1).toString().padStart(2, '0') }-${ value.getDate().toString().padStart(2, '0') }`;
}

async function tosCommonPropertiesList() {
    let item_calculate: any = path.join(PATH_PARSER_INPUT_DATA, 'shared.ipf', 'script', 'item_calculate.lua');
        item_calculate = fs.readFileSync(item_calculate, 'utf8');

    let props: any = /function GET_COMMON_PROP_LIST.+?{(.+?)};/gs.exec(item_calculate)[1];
        props = props.split(',');
        props = props.map(value => /'(.+)'/g.exec(value)[1]);
        props.sort();

    return props as string[];
}

async function tosControlSet() {
    let controlset = xml.parse(fs.readFileSync(path.join(PATH_PARSER_INPUT_DATA, 'ui.ipf', 'uixml', 'controlset.xml'), 'utf8'), { attributeNamePrefix: '', ignoreAttributes: false });
    let userconfig: object[] = controlset.controlsetlist.controlset.map(value => value.userconfig).filter(a => a);

    return userconfig.reduce((acc, value) => Object.assign(acc, value), {});
}

async function tosJobs(schema: string) { return DatabaseService.entries(schema, 'job') }
async function tosJobsByAbility(schema: string, jobs: TOSEntry[]) {
    // addon.ipf/skillability/lib_skillability.lua :: SKILLABILITY_GET_ABILITY_NAME_LIST
    let result: { [key: string]: string[] } = {};
    let resultAdd = (ability: string, job: string) => {
        result[ability] = result[ability] || [];

        if (result[ability].indexOf(job) == -1)
            result[ability].push(job);
    };

    for (let job of jobs) {
        if (job['DefHaveAbil'])
            job['DefHaveAbil'].split('#').forEach(ability => resultAdd(ability, job.ClassName));

        try {
            let abilities = await DatabaseService.entries(schema, 'ability_' + job['EngName']);
                abilities.forEach(ability => resultAdd(ability.ClassName, job.ClassName));
        } catch (e) {}
    }

    return result;
}
async function tosJobsBySkill(schema: string, jobs: TOSEntry[], skills: TOSEntry[]) {
    let result: { [key: string]: string[] } = {};
    let resultAdd = (skill: string, job: string) => {
        result[skill] = result[skill] || [];

        if (result[skill].indexOf(job) == -1)
            result[skill].push(job);
    };

    let jobsByClassName = jobs.reduce((acc, job) => { acc[job.ClassName] = job; return acc }, {});
    let jobsByEngName = jobs.reduce((acc, job) => { acc[job['EngName']] = job; return acc }, {});
    let skillsByClassName = skills.reduce((acc, skill) => { acc[skill.ClassName] = skill; return acc }, {});

    for (let job of jobs) {
        if (job['DefHaveSkill'])
            job['DefHaveSkill'].split('#').forEach(skill => resultAdd(skill, job.ClassName));

        for (let skilltree of await DatabaseService.entries(schema, 'skilltree')) {
            let job = jobsByClassName[skilltree.ClassName.split('_').slice(0, 2).join('_')];
            let skill = skillsByClassName[skilltree['SkillName']];

            resultAdd(skill.ClassName, job.ClassName);
        }
    }

    for (let skill of skills) {
        if (skill['Job'] && jobsByEngName[skill['Job']]) {
            let job = jobsByEngName[skill['Job']];

            resultAdd(skill.ClassName, job.ClassName);
        }
    }

    return result;
}

async function tosSimony(schema: string): Promise<number[]> {
    return DatabaseService
        .entries(schema, 'skill_simony')
        .then(value => value.map(value => value.ClassID));
}

async function tosSkills(schema: string) { return DatabaseService.entries(schema, 'skill') }

async function translationsItemGrade(controlset: object, language: TOSLanguage) {
    return Object
        .keys(controlset)
        .filter(value => value.endsWith('GRADE_TEXT'))
        .reduce((acc, value, i) => { acc[i + 1] = TranslateService.translate(language, controlset[value]).replace(/\{.*\}/g, ''); return acc }, {});
}