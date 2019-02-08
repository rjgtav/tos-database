const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const uglifyES = require('uglify-es');
const sha1 = require('./sha1');

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

// Note: we shouldn't include the service worker in here
const HASHES = [
    '/assets/js/dexie.worker.js',
    '/assets/js/lunr.worker.js',
    '/assets/js/papaparse.worker.js',
    '/index.html',
];

// We are now using a hash-based cache
// As a result, we need to create 'bundles' for the workers, as they aren't processed by Angular CLI
bundleAssetsWorker(['dexie.min.js', 'dexie.worker.js'], 'dexie.worker.js');
bundleAssetsWorker(['lunr.min.js', 'lunr.worker.js'], 'lunr.worker.js');
bundleAssetsWorker(['papaparse.min.js', 'papaparse.worker.js'], 'papaparse.worker.js');

// Patch Angular's default Service Worker implementation:
// - Abuse the hashes so CloudFlare is able to cache assets for much longer
// - Make sure the cache is being used
// - Some other bug fixes
console.log('Patching ngsw-worker.js...');
let pathBackup = path.join('src', 'ngsw-worker.backup.js');
let pathFrom = path.join('src', 'ngsw-worker.js');
let pathTo = path.join('..', 'web', 'dist', 'web', 'ngsw-worker.js');

let ngswWorker = fs.readFileSync(pathTo, { encoding: 'utf8' }).trim();
let ngswWorkerBackup = fs.readFileSync(pathBackup, { encoding: 'utf8' }).trim();

if (ngswWorker !== ngswWorkerBackup)
  throw new Error('ngsw-worker has been updated! Please patch it before proceeding...');

fs.writeFileSync(pathTo, fs.readFileSync(pathFrom));

// Update ngsw.json hashes
console.log('Updating ngsw.json...');
let ngswPath = path.join('..', 'web', 'dist', 'web', 'ngsw.json');
let ngsw = JSON.parse(fs.readFileSync(ngswPath, { encoding: 'utf8' }));
let ngswAssetGroupPrefetch = ngsw.assetGroups.find(value => value.installMode === 'prefetch');

HASHES.forEach(value => {
    let buffer = fs.readFileSync(path.join('..', 'web', 'dist', 'web', value));
    let hash = sha1.sha1Binary(buffer);

    ngsw.hashTable[value] = hash;
    ngswAssetGroupPrefetch.urls.indexOf(value) === -1 && ngswAssetGroupPrefetch.urls.push(value);
});

ngswAssetGroupPrefetch.urls.sort();

fs.writeFileSync(ngswPath, JSON.stringify(ngsw, null, 2));

//----------------------------------------------------------------------------------------------------------------------

function bundleAssetsWorker(sources, destination) {
    destination = path.join('..', 'web', 'dist', 'web', 'assets', 'js', destination);
    sources = sources.map(value => path.join('..', 'web', 'src', 'assets', 'js', value));
    console.log(`Bundling ${ destination }...`);

    let data = uglifyES.minify(sources.reduce((accumulator, source) => {
        let data = fs.readFileSync(source, 'utf8').trim();
            data = data.replace(/self\['importScripts'\]\(.*\);/g, '');

        accumulator[source] = data;
        return accumulator;
    }, {})).code;

    fsExtra.ensureFileSync(destination);
    fs.writeFileSync(destination, data);
}
