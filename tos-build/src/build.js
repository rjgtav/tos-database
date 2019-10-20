const childProcess = require('child_process');
const fs = require('fs');
const fsExtra = require('fs-extra');
const glob = require('glob');
const path = require('path');
const shared = require("./shared");
const uglifyES = require('uglify-es');

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

const PATH_WEB = path.join('..', 'tos-web');
const PATH_WEB_DIST = path.join(PATH_WEB, 'dist');
const PATH_WEB_SRC = path.join(PATH_WEB, 'src');
const PATH_WEB_SERVER = path.join('..', 'tos-web-server', 'www');

let result;

// 1. Build angular application
shared.log('1. Build Angular application');
cwd = path.join(PATH_WEB);

result = childProcess.spawnSync(`npm run ${ shared.IS_PROD ? 'build-prod' : 'build' }`, { cwd, shell: true, stdio: 'inherit' });
result.status !== 0 && shared.logError('Failed to build angular application', result);

// 2. Bundle workers with their corresponding libraries, to make them easier to cache
shared.log('2. Bundle workers');
bundleWorker('assets/worker/lua.worker.js');

// 3. Move to tos-web-server
shared.log('3. Move to tos-web-server');
fsExtra.copySync(PATH_WEB_DIST, PATH_WEB_SERVER);

// 4. Delete old versions in tos-web-server
shared.log('4. Delete old versions in tos-web-server');
[
    glob.sync(path.join(PATH_WEB_SERVER, 'main.*.js')),
    glob.sync(path.join(PATH_WEB_SERVER, 'polyfills.*.js')),
    glob.sync(path.join(PATH_WEB_SERVER, 'runtime.*.js')),
    glob.sync(path.join(PATH_WEB_SERVER, 'styles.*.css')),
].forEach(group => {
    group.sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);
    group.slice(3).forEach(value => fs.unlinkSync(value));
});

function bundleWorker(worker) {
    let sourcePath = source => fs.readFileSync(path.join(PATH_WEB_SRC, source), 'utf-8');

    let sources = [worker];
    let regex = /self\['importScripts'\]\(.*'(.*)'\);/g;
    let regexMatch;
    let workerSource = sourcePath(worker);

    // Parse importScripts
    while (regexMatch = regex.exec(workerSource))
        sources.push(regexMatch[1]);

    // Bundle
    let bundle = path.join(PATH_WEB_DIST, worker);

    fsExtra.ensureDirSync(path.dirname(bundle));
    fs.writeFileSync(bundle, uglifyES.minify(sources.reduce((accumulator, source) => {
        let sourceData = sourcePath(source);
            sourceData = sourceData.replace(regex, '');

        accumulator[source] = sourceData;

        return accumulator;
    }, {})).code);
}