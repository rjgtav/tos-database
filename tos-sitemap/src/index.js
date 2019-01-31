const builder = require('xmlbuilder'),
      fs = require('fs'),
      papa = require('papaparse'),
      path = require('path')
;

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

function log(...msg) {
    console.log('[' + REGION + ']', '[tos-sitemap]', ...msg);
}

const REGION_iTOS = 'iTOS';
const REGION_jTOS = 'jTOS';
const REGION_kTEST = 'kTEST';
const REGION_kTOS = 'kTOS';
const REGION_twTOS = 'twTOS';
const REGION = process.argv[2] || REGION_iTOS;

if ([REGION_iTOS, REGION_jTOS, REGION_kTOS, REGION_kTEST, REGION_twTOS].indexOf(REGION) === -1)
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
                    url.ele('loc', 'https://tos.guru/' + REGION.toLowerCase() + '/database/' + dataset + '/' + row.$ID + '/');
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
