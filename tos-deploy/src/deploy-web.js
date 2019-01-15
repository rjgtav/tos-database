const
    childProcess = require('child_process'),
    fs = require('fs'),
    fsExtra = require('fs-extra'),
    path = require('path'),
    shared = require("./shared"),
    sharedVariables = require("./shared-variables")
;

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

let cwd, js, result, zip;

// 5.1. Build angular application
console.log('5.1. Build Angular application');
cwd = path.join('..', 'web');

result = childProcess.spawnSync(`npm run build-prod`, { cwd, shell: true, stdio: 'inherit' });
result.status !== 0 && shared.slackError(new Error('Failed to build angular application //TODO: explode and tell slack'));

fs.copyFileSync(path.join(cwd, 'dist', 'web', 'index.html'), path.join(cwd, 'dist', 'web', '404.html'));
fs.copyFileSync(path.join(cwd, 'dist', '.htaccess'), path.join(cwd, 'dist', 'web', '.htaccess'));
fs.copyFileSync(path.join(cwd, 'dist', 'robots.txt'), path.join(cwd, 'dist', 'web', 'robots.txt'));

for (let region of shared.REGIONS) {
    // 5.2. Pre-render HTML for web crawlers
    console.log(`[${ region }] 5.2. Pre-render HTML for web crawlers`);
    cwd = path.join('..', 'tos-html');
    js = path.join(cwd, 'src', 'index.js');

    result = childProcess.spawnSync(`node ${ js } ${ region }`, {cwd, shell: true, stdio: 'inherit'});
    result.status !== 0 && shared.slackError(new Error('Failed to tos-html //TODO: explode and tell slack'));
}

// 5.3. Patch service worker
console.log('5.3. Patch service worker');
cwd = path.join('..', 'web');

result = childProcess.spawnSync(`npm run ngsw-config`, { cwd, shell: true, stdio: 'inherit' });
result.status !== 0 && shared.slackError(new Error('Failed to patch service worker //TODO: explode and tell slack'));

// Rename ngsw.json to ngsw.js otherwise CloudFlare doesn't consider it as 'static'
// https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-
fs.renameSync(path.join(cwd, 'dist', 'web', 'ngsw.json'), path.join(cwd, 'dist', 'web', 'ngsw.js'));

if (shared.IS_PROD) {
    // 5.4. Deploy on Apache
    console.log('5.4. Deploy on Apache');
    fsExtra.copySync(path.join(cwd, 'dist', 'web'), sharedVariables.APACHE_WWW);

    for (let region of shared.REGIONS) {
        // 5.5. Unzip tos-html ( ͡° ͜ʖ ͡°)
        console.log(`[ ${ region }] 5.5. Unzip tos-html`);
        cwd = sharedVariables.APACHE_WWW;
        zip = path.join(cwd, region.toLowerCase() + '.zip');

        result = childProcess.spawnSync(`unzip -o -q ${ zip }`, {cwd, shell: true, stdio: 'inherit'});
        result.status !== 0 && shared.slackError(new Error('Failed to unzip tos-html //TODO: explode and tell slack'));

        fs.unlinkSync(zip);
    }
}
