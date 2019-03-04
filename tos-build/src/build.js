const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const shared = require("./shared");
const uglifyES = require('uglify-es');

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

// 1. Build angular application
shared.log('1. Build Angular application');
cwd = path.join('..', 'tos-web');

result = childProcess.spawnSync(`npm run ${ shared.IS_PROD ? 'build-prod' : 'build' }`, { cwd, shell: true, stdio: 'inherit' });
result.status !== 0 && shared.logError('Failed to build angular application', result);

// 2. Bundle workers with their corresponding libraries to make them easier to cache
shared.log('2. Bundle workers');
bundleAssetsWorker(['dexie.min.js', 'dexie.worker.js'], 'dexie.worker.js');
bundleAssetsWorker(['lunr.min.js', 'lunr.worker.js'], 'lunr.worker.js');
bundleAssetsWorker(['papaparse.min.js', 'papaparse.worker.js'], 'papaparse.worker.js');

// TODO: update build-prod so it uses a small express server which servers static content from web/dist and tos-build/dist

function bundleAssetsWorker(sources, destination) {
    destination = path.join('..', 'tos-build', 'dist', 'assets', 'js', destination);
    sources = sources.map(value => path.join('..', 'tos-web', 'src', 'assets', 'js', value));
    console.log(`Bundling ${ destination }...`);

    let data = uglifyES.minify(sources.reduce((accumulator, source) => {
        let data = fs.readFileSync(source, 'utf8').trim();
        data = data.replace(/self\['importScripts'\]\(.*\);/g, '');

        accumulator[source] = data;
        return accumulator;
    }, {})).code;

    fs.writeFileSync(destination, data);
}