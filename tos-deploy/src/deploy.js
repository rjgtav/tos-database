const
    childProcess = require('child_process'),
    path = require('path'),
    shared = require("./shared")
;

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

shared.singletonLock();

// TODO: git pull

console.log('+========================================================================+');
console.log('| Patching...                                                            |');
console.log('+========================================================================+');

let deploy = false;

for (let region of shared.REGIONS) {
    let arg, cwd, js, py, result;

    // 1. Patcher & parser
    console.log(`[${ region }] 1. Patcher & parser`);
    cwd = path.join('..', 'tos-parser');
    py = path.join(cwd, 'src', 'main.py');

    result = childProcess.spawnSync(`python ${ py } ${ region }`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.slackError(new Error('Failed to patch //TODO: explode and tell slack'));

    // 2. Search index
    console.log(`[${ region }] 2. Search index`);
    cwd = path.join('..', 'tos-search');
    js = path.join(cwd, 'src', 'index.js');

    result = childProcess.spawnSync(`node ${ js } ${ region }`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.slackError(new Error('Failed to search //TODO: explode and tell slack'));

    // 3. Sitemap
    console.log(`[${ region }] 3. Sitemap`);
    cwd = path.join('..', 'tos-sitemap');
    js = path.join(cwd, 'src', 'index.js');

    result = childProcess.spawnSync(`node ${ js } ${ region }`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.slackError(new Error('Failed to sitemap //TODO: explode and tell slack'));

    // 4. Commit changes
    let changes = childProcess.execSync('git status --porcelain', { encoding: 'utf8', shell: true }).toString();
    if (changes.split('\n').length > 1) {
        console.log(`[${ region }] 4. Commit changes`);
        cwd = path.join('..');

        result = childProcess.spawnSync(`git add .`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError(new Error('Failed to add //TODO: explode and tell slack'));

        result = childProcess.spawnSync(`git commit -m "Updated ${ region } as of ${ new Date().toISOString().slice(0, 10) }"`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError(new Error('Failed to commit //TODO: explode and tell slack'));

        result = childProcess.spawnSync(`git push`, { cwd, shell: true, stdio: 'inherit' });
        result.status !== 0 && shared.slackError(new Error('Failed to push //TODO: explode and tell slack'));

        deploy = true;
    }

}

console.log('+========================================================================+');
console.log('| Deploying...                                                           |');
console.log('+========================================================================+');

if (deploy || shared.IS_DEPLOY) {
    // 5. Build & Deploy
    console.log('5. Build & Deploy');
    arg = process.argv.length === 3 ? process.argv[2] : '';
    cwd = path.join('.');
    js = path.join(cwd, 'src', 'deploy-web.js');

    result = childProcess.spawnSync(`node ${ js } ${ arg }`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.slackError(new Error('Failed to build & deploy //TODO: explode and tell slack'));

    // 6. Clear CloudFlare cache
    console.log('6. Clear CloudFlare cache');
    cwd = path.join('.');
    js = path.join(cwd, 'src', 'deploy-cloudflare.js');

    childProcess.spawn(`node ${ js } > logs/cloudflare.log`, { cwd, detached: true, shell: true });
}

shared.singletonUnlock();
