const builder = require('xmlbuilder'),
      fs = require('fs'),
      papa = require('papaparse'),
      path = require('path')
;

function log(...msg) {
    console.log('[tos-sitemap]', '[' + REGION + ']', ...msg);
}

const REGION_ITOS = 'iTOS';
const REGION_JTOS = 'jTOS';
const REGION_KTEST = 'kTEST';
const REGION_KTOS = 'kTOS';
const REGION = process.argv[2] || 'iTOS';

if ([REGION_ITOS, REGION_JTOS, REGION_KTEST, REGION_KTOS].indexOf(REGION) === -1)
    throw Error('Invalid region: ' + REGION);

let folder_assets = path.join(__dirname, '..', '..', 'web', 'src', 'assets');
let folder_data = path.join(folder_assets, 'data', REGION.toLowerCase());
let folder_sitemap = path.join(folder_assets, 'sitemap');

let xml = builder.create('urlset');
    xml.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

// Add database URLs
let files = fs.readdirSync(folder_data);
    files.forEach((fileName) => {
        if (fileName.indexOf('.csv') === -1)
            return;

        log('Processing ' + fileName + '...');
        let dataset = fileName.slice(0, fileName.indexOf('.'));
        let file = fs.readFileSync(path.join(folder_data, fileName), 'utf8');

        papa.parse(file, { dynamicTyping: true, header: true, skipEmptyLines: true })
            .data
            .forEach((row) => {
                let url = xml.ele('url');
                    url.ele('loc', 'https://tos.guru/' + REGION.toLowerCase() + '/database/' + dataset + '/' + row.$ID)
                    url.ele('lastmod', new Date().toISOString().slice(0, 10));
                    url.ele('changefreq', 'weekly');
            });
    });

// Add additional URLs
let url = xml.ele('url');
        url.ele('loc', 'https://tos.guru/' + REGION.toLowerCase() + '/simulator');
        url.ele('lastmod', new Date().toISOString().slice(0, 10));
        url.ele('changefreq', 'weekly');

log("Saving...");
fs.writeFileSync(path.join(folder_sitemap, REGION.toLowerCase() + '.sitemap.xml'), xml.end());
