const childProcess = require('child_process');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const shared = require("./shared");
const sharedVariables = require("../../variables");

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

(async function() {
    shared.singletonLock();

    if (shared.IS_PROD) {
        // Update git repository
        shared.log('Updating git repository...');
        childProcess.execSync('git reset --hard HEAD');
        childProcess.execSync('git pull');

        // Update node projects
        shared.log('Updating node projects...');
        // childProcess.execSync('npm install', { cwd: path.join('..', 'tos-build')}); // We need to run this one before we even start the script
        childProcess.execSync('npm install', { cwd: path.join('..', 'tos-html')});
        childProcess.execSync('npm install', { cwd: path.join('..', 'tos-patreon')});
        childProcess.execSync('npm install', { cwd: path.join('..', 'tos-search')});
        childProcess.execSync('npm install', { cwd: path.join('..', 'tos-sitemap')});
        childProcess.execSync('npm install', { cwd: path.join('..', 'tos-sw')});
        childProcess.execSync('npm install', { cwd: path.join('..', 'tos-web')});
    }

    // Get current revision
    shared.log('Loading current revision...');
    let revision_path = path.join('revision.txt');
    let revision = fs.existsSync(revision_path) ? fs.readFileSync('revision.txt', { encoding: 'utf8' }) : null;
    let revision_new = childProcess.execSync('git rev-parse HEAD').toString();

    shared.log(`
        +============================================================+
        | Patching...                                                |
        +============================================================+
    `);

    let is_new_patch = false;
    let is_new_revision = revision !== revision_new;
    let cwd, py, result;

    for (let region of shared.REGIONS) {

        // 1. Patcher & parser
        shared.log(`[${ region }] 1. Patcher & parser`);
        cwd = path.join('..', 'tos-parser');
        py = path.join(cwd, 'src', 'main.py');

        result = childProcess.spawnSync(`python ${ py } ${ region } ${ is_new_revision }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.logError('Failed to patch', result);

        // 2. Search index
        shared.log(`[${ region }] 2. Search index`);
        cwd = path.join('..', 'tos-search');

        result = childProcess.spawnSync(`npm run main ${ region }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.logError('Failed to search', result);

        // 3. Sitemap
        shared.log(`[${ region }] 3. Sitemap`);
        cwd = path.join('..', 'tos-sitemap');

        result = childProcess.spawnSync(`npm run main ${ region }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.logError('Failed to sitemap', result);

        // 4. Commit changes
        is_new_patch = commitChanges(region, 4) || is_new_patch;
    }

    // 5. Patreon
    shared.log(`5. Patreon`);
    cwd = path.join('..', 'tos-patreon');

    result = childProcess.spawnSync(`npm run main`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.logError('Failed to patreon', result);

    // 6. Commit changes
    is_new_patch = commitChanges('Patreon', 6) || is_new_patch;

    if (shared.IS_PROD && (is_new_patch || is_new_revision || shared.IS_FORCE_DEPLOY)) {
        // 7. Service Worker
        shared.log('7. Service Worker');
        cwd = path.join('..', 'tos-sw');

        result = childProcess.spawnSync(`npm run main`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.logError('Failed to service worker', result);

        shared.log(`
            +============================================================+
            | Deploying...                                               |
            +============================================================+
        `);

        // 8. Deploy on Apache
        shared.log('8. Deploy on Apache');
        fsExtra.copySync(path.join('..', 'tos-build', 'dist'), sharedVariables.APACHE_WWW);
        fsExtra.copySync(path.join('..', 'tos-web', 'dist'), sharedVariables.APACHE_WWW);

        for (let region of shared.REGIONS) {
            // 9.1. Pre-render HTML for web crawlers
            shared.log(`[${ region }] 9.1. Pre-render HTML for web crawlers`);
            cwd = path.join('..', 'tos-html');

            result = childProcess.spawnSync(`npm run main ${ region }`, { cwd, shell: true, stdio: 'inherit' });
            result.status !== 0 && shared.logError('Failed to tos-html', result);

            // 9.2. Unzip pre-rendered HTML ( ͡° ͜ʖ ͡°)
            shared.log(`[${ region }] 9.2. Unzip pre-rendered HTML ( ͡° ͜ʖ ͡°)`);
            cwd = sharedVariables.APACHE_WWW;

            let zip_from = path.join('..', 'tos-build', 'dist', region.toLowerCase() + '.zip');
            let zip_to = path.join(cwd, region.toLowerCase() + '.zip');

            fs.renameSync(zip_from,  zip_to);

            result = childProcess.spawnSync(`unzip -o -q ${ zip_to }`, { cwd, shell: true, stdio: 'inherit' });
            result.status !== 0 && shared.logError('Failed to unzip pre-rendered HTML', result);

            fs.unlinkSync(zip_to);
        }

        // 10. Clear CloudFlare cache
        shared.log('10. Clear CloudFlare cache');
        let cf = require('cloudflare')({ email: sharedVariables.CF_EMAIL, key: sharedVariables.CF_KEY});
        let manifest = JSON.parse(fs.readFileSync(path.join('..', 'tos-build', 'dist', 'tos-sw.manifest.js'), { encoding: 'utf8' }));
        let assetGroup = manifest.assetGroups.find(value => value.name === 'app');
        let urls = Object
            .keys(assetGroup.versions)
            .concat([
                '/manifest.json',
                '/ngsw.js',
                '/ngsw-worker.js',
                '/robots.txt',
                '/tos-sw.manifest.js',
                '/tos-sw.worker.js',
                // Note: PWA icons will be manually cleared when necessary
            ]);

        urls = urls.map(value => 'https://tos.guru' + value);

        try {
            await cf.zones.purgeCache(sharedVariables.CF_ZONE, { files: urls });
        } catch (error) {
            shared.logError('Failed to purge cache', error)
        }

    } else {
        shared.log('No new patch nor revision available. No deployment is needed.');
    }

    // Update revision
    fs.writeFileSync(revision_path, childProcess.execSync('git rev-parse HEAD').toString());

    shared.singletonUnlock();
})();

//----------------------------------------------------------------------------------------------------------------------

function commitChanges(region, step) {
    let cwd, result;
    let changes = childProcess.execSync('git status --porcelain', { encoding: 'utf8', shell: true }).toString();
    if (changes.split('\n').length <= 1 || !shared.IS_PROD)
        return false;

    shared.log(`[${ region }] ${ step }. Commit changes`);
    cwd = path.join('..');

    result = childProcess.spawnSync(`git add .`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.logError('Failed to add', result);

    result = childProcess.spawnSync(`git commit -m "Updated ${ region } as of ${ new Date().toISOString().slice(0, 10) }"`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.logError('Failed to commit', result);

    result = childProcess.spawnSync(`git push`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.logError('Failed to push', result);

    return true;
}