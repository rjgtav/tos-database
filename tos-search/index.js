const fs = require('fs'),
      lunr = require('lunr'),
      openKoreanText = require('open-korean-text-node').default,
      papa = require('papaparse'),
      path = require('path')
;

require('./node_modules/lunr-languages/lunr.multi.js')(lunr);
require('./node_modules/lunr-languages/lunr.stemmer.support.js')(lunr);
require('./node_modules/lunr-languages/tinyseg.js')(lunr);
require('./node_modules/lunr-languages/lunr.jp.js')(lunr);
require('./lunr.kr.js')(lunr, openKoreanText);

const REGION_ITOS = 'iTOS';
const REGION_JTOS = 'jTOS';
const REGION_KTEST = 'kTEST';
const REGION_KTOS = 'kTOS';
const REGION = process.argv[2] || 'iTOS';

if ([REGION_ITOS, REGION_JTOS, REGION_KTEST, REGION_KTOS].indexOf(REGION) === -1)
    throw Error('Invalid region: ' + REGION);

let documents = {};
let folder = path.join(__dirname, '..', 'web', 'src', 'assets', 'data', REGION.toLowerCase());

// Load Documents
console.log('Loading documents...');
let files = fs.readdirSync(folder);
    files.forEach((fileName) => {
        documents[fileName] = [];
        file = fs.readFileSync(path.join(folder, fileName), 'utf8');
        papa.parse(file, { dynamicTyping: true, header: true, skipEmptyLines: true })
            .data
            .forEach((row) => documents[fileName].push(row));
    });

// Build index
console.log('Building index...');
var idx = lunr(function () {
    if (REGION === REGION_JTOS)
        this.use(lunr.multiLanguage('en', 'jp'));
    if (REGION === REGION_KTOS || REGION === REGION_KTEST)
        this.use(lunr.multiLanguage('en', 'kr'));

    // Disable stemmer
    this.pipeline.remove(lunr.stemmer);

    this.ref('$ID_lunr');
    this.field('$ID');
    this.field('$ID_NAME');
    this.field('Name');
    this.field('Description');

    // Books
    this.field('Text');

    Object.entries(documents)
        .forEach(value => {
            let documents = value[1];
            let fileName = value[0].split('.csv')[0];

            documents.forEach((doc) => {
                doc['$ID_lunr'] = fileName + '#' + doc['$ID'];
                this.add(doc)
            });
        })
});

// Save index
console.log('Saving Index...');
fs.writeFileSync(path.join(folder, 'index.json'), JSON.stringify(idx));
