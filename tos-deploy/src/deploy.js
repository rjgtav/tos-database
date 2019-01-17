const
    childProcess = require('child_process'),
    fs = require('fs'),
    path = require('path'),
    shared = require("./shared"),
    sharedVariables = require("./shared-variables")
;

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

(async function() {
    shared.singletonLock();

    // Update git repository
    console.log('Updating git repository...');
    //TODO: commit before uncommenting this or things will go very badly
    //childProcess.execSync('git reset --hard HEAD');
    //childProcess.execSync('git pull');

    // Get current revision
    console.log('Loading current revision...');
    let revision_path = path.join('revision.txt');
    let revision = fs.existsSync(path) && fs.readFileSync('revision.txt', { encoding: 'UTF-8'});
    let revision_new = childProcess.execSync('git rev-parse HEAD');

    console.log('+========================================================================+');
    console.log('| Patching...                                                            |');
    console.log('+========================================================================+');

    let is_new_patch = false, is_new_revision = revision !== revision_new;
    let argv, cwd, js, py, result;

    for (let region of shared.REGIONS) {

        // 1. Patcher & parser
        console.log(`[${ region }] 1. Patcher & parser`);
        cwd = path.join('..', 'tos-parser');
        py = path.join(cwd, 'src', 'main.py');

        result = childProcess.spawnSync(`python ${ py } ${ region } ${ is_new_revision }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError('Failed to patch //TODO: explode and tell slack', result);

        // 2. Search index
        console.log(`[${ region }] 2. Search index`);
        cwd = path.join('..', 'tos-search');
        js = path.join(cwd, 'src', 'index.js');

        result = childProcess.spawnSync(`node ${ js } ${ region }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError('Failed to search //TODO: explode and tell slack', result);

        // 3. Sitemap
        console.log(`[${ region }] 3. Sitemap`);
        cwd = path.join('..', 'tos-sitemap');
        js = path.join(cwd, 'src', 'index.js');

        result = childProcess.spawnSync(`node ${ js } ${ region }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError('Failed to sitemap //TODO: explode and tell slack', result);

        // 4. Commit changes
        let changes = childProcess.execSync('git status --porcelain', { encoding: 'utf8', shell: true }).toString();
        if (changes.split('\n').length > 1) {
            console.log(`[${ region }] 4. Commit changes`);
            cwd = path.join('..');

            result = childProcess.spawnSync(`git add .`, { cwd, shell: true, stdio: 'inherit' });
            result.status !== 0 && shared.slackError('Failed to add //TODO: explode and tell slack', result);

            result = childProcess.spawnSync(`git commit -m "Updated ${ region } as of ${ new Date().toISOString().slice(0, 10) }"`, { cwd, shell: true, stdio: 'inherit' });
            result.status !== 0 && shared.slackError('Failed to commit //TODO: explode and tell slack', result);

            result = childProcess.spawnSync(`git push`, { cwd, shell: true, stdio: 'inherit' });
            result.status !== 0 && shared.slackError('Failed to push //TODO: explode and tell slack', result);

            is_new_patch = true;
        }

    }

    console.log('+========================================================================+');
    console.log('| Deploying...                                                           |');
    console.log('+========================================================================+');

    if (is_new_patch || is_new_revision || shared.IS_FORCE_DEPLOY) {
        // 5. Build & Deploy
        console.log('5. Build & Deploy');
        argv = process.argv.slice(2).join(' ');
        cwd = path.join('.');
        js = path.join(cwd, 'src', 'deploy-web.js');

        result = childProcess.spawnSync(`node ${ js } ${ argv }`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError('Failed to build & deploy //TODO: explode and tell slack', result);

        // 6. Clear CloudFlare cache
        console.log('6. Clear CloudFlare cache');
        let cf = require('cloudflare')({ email: sharedVariables.CF_EMAIL, key: sharedVariables.CF_KEY});
        let ngsw = JSON.parse(fs.readFileSync(path.join('..', 'web', 'dist', 'web', 'ngsw.js')));
        let ngswAssetGroup = ngsw.assetGroups.find(value => value.name === 'app');
        let urls = ngswAssetGroup.urls.concat(['/assets/images/logo_imc.png', '/assets/images/logo_tos.png', '/manifest.json', '/ngsw.js', '/ngsw.json']);
        urls = urls.map(value => 'https://tos.guru' + value);

        try {
            await cf.zones.purgeCache(sharedVariables.CF_ZONE, { files: urls });
        } catch (error) {
            shared.slackError('Failed to purge cache //TODO: explode and tell slack', error)
        }
    }

    // Update revision
    fs.writeFileSync(revision_path, revision_new);

    shared.singletonUnlock();
})();