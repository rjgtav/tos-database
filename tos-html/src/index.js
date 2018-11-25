// TODO
// TODO: X revert angular app to the old <link ...> based theme
// TODO: import header from existing index.html (instead of having it hard-coded on the base.html)
// TODO: import scripts from generated dist index.html
// TODO: generate Books list page
// TODO: create templates for remaining entities
// TODO: use welcome.component.html to generate the home pages and the overall index
// TODO: don't generate a page for the simulator?

const
    fs = require('fs-extra'),
    papa = require('papaparse'),
    path = require('path')
;

function log(...msg) {
    console.log('[tos-html]', '[' + REGION + ']', ...msg);
}

const REGION_ITOS = 'iTOS';
const REGION_JTOS = 'jTOS';
const REGION_KTEST = 'kTEST';
const REGION_KTOS = 'kTOS';
const REGION = process.argv[2] || 'iTOS';

if ([REGION_ITOS, REGION_JTOS, REGION_KTEST, REGION_KTOS].indexOf(REGION) === -1)
    throw Error('Invalid region: ' + REGION);

let folder_database = path.join(__dirname, '..', '..', 'web', 'src', 'assets', 'data', REGION.toLowerCase());
let folder_dist = path.join(__dirname, '..', '..', 'web', 'dist', 'web', REGION.toLowerCase());
let folder_dist_database = path.join(folder_dist, 'database');
let folder_template = path.join(__dirname, 'templates');
let folder_template_database = path.join(folder_template, 'database');

// Generate template base
let templateBase = fs.readFileSync(path.join(folder_dist, 'index.html'), 'utf8');
    templateBase = templateBase.replace(/#{region}#/g, REGION.toLowerCase());

// Generate database pages
let files = fs.readdirSync(folder_database);
    files.forEach((fileName) => {
        if (fileName.indexOf('.csv') === -1)
            return;

        log('Processing ' + fileName + '...');
        let dataset = fileName.slice(0, fileName.indexOf('.'));
        let file = fs.readFileSync(path.join(folder_database, fileName), 'utf8');

        // TODO: remove in the end
        if (dataset !== 'books')
            return;

        let templateDetail = fs.readFileSync(path.join(folder_template_database, dataset, 'detail.html'), 'utf8');
            templateDetail = templateDetail.slice(templateDetail.indexOf('<body>') + 6, templateDetail.lastIndexOf('</body>'));
        let templateIndex = fs.readFileSync(path.join(folder_template_database, dataset, 'index.html'), 'utf8');
            templateIndex = templateIndex.slice(templateIndex.indexOf('<body>') + 6, templateIndex.lastIndexOf('</body>'));

        papa.parse(file, { dynamicTyping: true, header: true, skipEmptyLines: true })
            .data
            .forEach((row) => {
                // Generate detail page
                let outputDetail = templateDetail
                        .split('\n')
                        .map(line => {
                            let lineOriginal = line;
                            let match;
                            let regex = /#{(.+)}#/g;

                            while (match = regex.exec(lineOriginal))
                                line = line.replace(match[0], formatValue(match[1], row[match[1]]));

                            return line;
                        })
                        .join('\n');

                    outputDetail = templateBase
                        .split('\n')
                        .map(line => {
                            let lineOriginal = line;
                            let match;
                            let regex = /#{(.+)}#/g;

                            while (match = regex.exec(lineOriginal)) {
                                if (match[1] === 'body')        line = line.replace(match[0], outputDetail);
                                else if (match[1] === 'url')    line = line.replace(match[0], 'database/' + dataset + '/' + row.$ID);
                                else                            line = line.replace(match[0], row[match[1]]);
                            }

                            return line;
                        })
                        .join('\n');

                // Save detail page
                fs.ensureDirSync(path.join(folder_dist_database, dataset));
                fs.writeFileSync(path.join(folder_dist_database, dataset, row.$ID + '.html'), outputDetail);
            });
    });

// #####################################################################################################################
//  Value formatters
// #####################################################################################################################
function formatValue(key, value) {
    if (value == null)
        return '';

    if (key === 'Icon')             return formatValueIcon(value);
    if (key.indexOf('Time') === 0)  return formatValueTime(+value);
    if (key === 'Text')             return value.split('{nl}').join('<br/>');

    return value;
}
function formatValueIcon(value) {
    return '/assets/icons/' + value + '.png';
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
