const
    fs = require('fs-extra'),
    papa = require('papaparse'),
    path = require('path')
;

function log(...msg) {
    console.log('[tos-html]', '[' + REGION + ']', ...msg);
}

const PATTERN_TEMPLATE_LIST_ROW = '<tr class="d-table-row">';
const PATTERN_TEMPLATE_LIST_ROW_CLOSE = '</tr>';

const REGION_ITOS = 'iTOS';
const REGION_JTOS = 'jTOS';
const REGION_KTEST = 'kTEST';
const REGION_KTOS = 'kTOS';
const REGION = process.argv[2] || 'iTOS';

if ([REGION_ITOS, REGION_JTOS, REGION_KTEST, REGION_KTOS].indexOf(REGION) === -1)
    throw Error('Invalid region: ' + REGION);

let folder_app = path.join(__dirname, '..', '..', 'web', 'src', 'app');
let folder_database = path.join(__dirname, '..', '..', 'web', 'src', 'assets', 'data', REGION.toLowerCase());
let folder_dist = path.join(__dirname, '..', '..', 'web', 'dist', 'web');
let folder_dist_database = path.join(folder_dist, REGION.toLowerCase(), 'database');
let folder_dist_home = path.join(folder_dist, REGION.toLowerCase(), 'home');
let folder_dist_region = path.join(folder_dist, REGION.toLowerCase());
let folder_template = path.join(__dirname, 'templates');
let folder_template_database = path.join(folder_template, 'database');

// Generate template base
let templateBase = fs.existsSync(path.join(folder_dist, 'index.backup.html'))
    ? fs.readFileSync(path.join(folder_dist, 'index.backup.html'), 'utf8')
    : fs.readFileSync(path.join(folder_dist, 'index.html'), 'utf8');

// Generate database pages
let files = fs.readdirSync(folder_database);
    files.forEach((fileName) => {
        if (fileName.indexOf('.csv') === -1)
            return;

        log('Processing ' + fileName + '...');
        let dataset = fileName.slice(0, fileName.indexOf('.'));
            dataset = dataset === 'jobs' ? 'classes' : dataset;
        let file = fs.readFileSync(path.join(folder_database, fileName), 'utf8');

        if (dataset === 'maps')
            return;

        let templateDetail = fs.readFileSync(path.join(folder_template_database, dataset, 'detail.html'), 'utf8');
            templateDetail = templateDetail.slice(templateDetail.indexOf('<body>') + 6, templateDetail.lastIndexOf('</body>'));
        let templateList = fs.readFileSync(path.join(folder_template_database, dataset, 'list.html'), 'utf8');
            templateList = templateList.slice(templateList.indexOf('<body>') + 6, templateList.lastIndexOf('</body>'));
        let templateListRow = templateList.slice(templateList.indexOf(PATTERN_TEMPLATE_LIST_ROW), templateList.indexOf(PATTERN_TEMPLATE_LIST_ROW_CLOSE, templateList.indexOf(PATTERN_TEMPLATE_LIST_ROW)) + PATTERN_TEMPLATE_LIST_ROW_CLOSE.length);
        let templateListSize = 0;

        papa.parse(file, { dynamicTyping: true, header: true, skipEmptyLines: true })
            .data
            .forEach((row) => {
                if (dataset === 'skills' && !row['Link_Job']) return;

                row['region'] = REGION.toLowerCase();
                row['seo-description'] = row.Description;
                row['seo-title'] = row.Name + ' - ' + formatValueDataset(dataset) + ' - Tree of Savior';
                row['url'] = 'database/' + dataset + '/' + row.$ID;

                // Generate detail page
                let outputDetail = templatePopulate(row, templateDetail);
                    outputDetail = templatePopulate(row, templateBase.replace(/#{content}#/g, outputDetail));

                fs.ensureDirSync(path.join(folder_dist_database, dataset, row.$ID + ''));
                fs.writeFileSync(path.join(folder_dist_database, dataset, row.$ID + '', 'index.html'), outputDetail);

                // Update list page
                if (templateListSize++ < 32)
                    templateList = templateList.replace(templateListRow, templatePopulate(row, templateListRow) + templateListRow);
            });

        // Generate list page
        let row = {};
            row['region'] = REGION.toLowerCase();
            row['seo-description'] = 'List of ' + formatValueDataset(dataset) + ', with advanced filtering and sorting';
            row['seo-title'] = formatValueDataset(dataset) + ' - Tree of Savior';

        let outputList = templatePopulate(row, templateList);
            outputList = templatePopulate(row, templateBase.replace(/#{content}#/g, outputList));

        fs.ensureDirSync(path.join(folder_dist_database, dataset));
        fs.writeFileSync(path.join(folder_dist_database, dataset, 'index.html'), outputList);
    });

// Generate home pages
let row = {};
    row['region'] = REGION.toLowerCase();
    row['seo-description'] = '';
    row['seo-title'] = '';

let outputHome = fs.readFileSync(path.join(folder_app, 'home', 'welcome', 'welcome.component.html'), 'utf8');
    outputHome = templatePopulate(row, templateBase.replace(/#{content}#/g, outputHome));

fs.ensureDirSync(path.join(folder_dist_home));
fs.writeFileSync(path.join(folder_dist_home, 'index.html'), outputHome);
fs.writeFileSync(path.join(folder_dist_region, 'index.html'), outputHome);
fs.writeFileSync(path.join(folder_dist, 'index.html'), outputHome);
fs.writeFileSync(path.join(folder_dist, 'index.backup.html'), templateBase); // Backup base html page for next use

// #####################################################################################################################
//  Value formatters
// #####################################################################################################################
function formatValue(key, value) {
    if (value == null)
        return '';

    if (key === 'Armor')            key = 'Material';
    if (key === 'Element')          key = 'MonsterElement';
    if (key === 'Race')             key = 'MonsterRace';
    if (key === 'Size')             key = 'MonsterSize';

    if (key === 'Grade')            return formatValueEnum(key, +value);
    if (key === 'Icon')             return formatValueIcon('.png', value);
    if (key === 'IconTooltip')      return formatValueIcon('.jpg', value);
    if (key === 'JobDifficulty')    return formatValueEnum(key, +value);
    if (key === 'JobTree')          return formatValueEnum(key, +value);
    if (key === 'Material')         return formatValueEnum(key, +value);
    if (key === 'MonsterElement')   return formatValueEnum(key, +value);
    if (key === 'MonsterRace')      return formatValueEnum(key, +value);
    if (key === 'MonsterSize')      return formatValueEnum(key, +value);
    if (key === 'Text')             return value.split('{nl}').join('<br/>');
    if (key.indexOf('Time') === 0)  return formatValueTime(+value);
    if (key === 'Type')             return formatValueEnum(key, +value);
    if (key === 'TypeCard')         return formatValueEnum(key, +value);
    if (key === 'TypeEquipment')    return formatValueEnum(key, +value);
    if (key === 'TypeGem')          return formatValueEnum(key, +value);

    return value;
}
function formatValueDataset(value) {
    if (value === 'jobs') return 'Classes';
    if (value == null || value === '') return null;

    return (value || '').toString() // Convert to Human Form
        .split('-')
        .map(value => value[0].toUpperCase() + value.slice(1))
        .join(' ');
}
function formatValueIcon(extension, value) {
    return '/assets/icons/' + value.toLowerCase() + extension;
}
function formatValueEnum(key, value) {
    // TODO: build a proper solution
    return {
        'Grade': [
            'Legendary',
            'Magic',
            'Normal',
            'Rare',
            'Unique',
        ],
        'JobDifficulty': [
            'Easy',
            'Hard',
            'Normal',
        ],
        'JobTree': [
            'Archer',
            'Cleric',
            'Scout',
            'Warrior',
            'Wizard',
        ],
        'Material': [
            'Cloth',
            'Ghost',
            'Leather',
            'Plate',
            '',
        ],
        'MonsterElement': [
            'Dark',
            'Earth',
            'Fire',
            'Holy',
            'Ice',
            'Lightning',
            'None',
            'Poison',
            'Psychokinesis',
        ],
        'MonsterRace': [
            'Beast',
            'Demon',
            'Insect',
            'Mutant',
            'Plant'
        ],
        'MonsterSize': [
            'S',
            'M',
            'L',
            'XL',
        ],
        'Type': [
            'Arm Band',
            'Armor',
            'Books',
            'Card',
            'Collection',
            'Cubes',
            'Consumables',
            'Equipment',
            'Event',
            'Experience Orb',
            'Fishing Rod',
            'Gem',
            'Helmet',
            'Icor',
            'Magic Amulet',
            'Material',
            'Paste Bait',
            'Companion Armor',
            'Companion Weapon',
            'Premium',
            'Quest',
            'Recipe',
            'Sub Weapon',
            'Unused',
            'Weapon',
        ],
        'TypeCard': [
            'Attack',
            'Defense',
            'Legendary',
            'Reinforce',
            'Stats',
            'Utility',
        ],
        'TypeEquipment': [
            'Pants',
            'Bracelets',
            'Cannons',
            'Charm',
            'Armband',
            'Effect Costumes',
            'Hair',
            'Hair Accessories',
            'Helmets',
            'Lens',
            'Costume',
            'Special Costume',
            'Toys',
            'Wings',
            'Daggers',
            'Gloves',
            'Necklaces',
            'Crossbows',
            'Pistols',
            'Maces',
            'Spears',
            'Rods',
            'Swords',
            'Rapiers',
            'Seals',
            'Shields',
            'Shoes',
            'Shirts',
            'Bows',
            'Muskets',
            '2H Maces',
            '2H Spears',
            'Staffs',
            '2H Swords',
        ],
        'TypeGem': [
            'Skill',
            'Stats',
        ]
    }[key][value]

}
function formatValueTime(value) {
    const TIME_MINUTE = 60;
    const TIME_HOUR = TIME_MINUTE * 60;
    const TIME_DAY = TIME_HOUR * 24;

    let days = Math.floor(value / TIME_DAY);
    let hours = Math.floor(value % TIME_DAY / TIME_HOUR);
    let minutes = Math.floor(value % TIME_HOUR / TIME_MINUTE);
    let seconds = value % TIME_MINUTE;

    let result = [];
    if (days > 0) result.push(days + ' day' + (days > 1 ? 's' : ''));
    if (hours > 0) result.push(hours + ' hour' + (hours > 1 ? 's' : ''));
    if (minutes > 0) result.push(minutes + ' minute' + (minutes > 1 ? 's' : ''));
    if (seconds > 0) result.push(seconds + ' second' + (seconds > 1 ? 's' : ''));

    return result.join(' ');
}

// #####################################################################################################################
//  Template processing
// #####################################################################################################################
function templatePopulate(row, template) {
    return template
        .split('\n')
        .map(line => {
            let lineOriginal = line;
            let match;
            let regex = /#{(.+?)}#/g;

            while (match = regex.exec(lineOriginal))
                line = line.replace(match[0], formatValue(match[1], row[match[1]]));

            return line;
        })
        .join('\n');
}