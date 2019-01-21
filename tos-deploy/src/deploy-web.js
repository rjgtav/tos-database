const childProcess = require('child_process');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const shared = require("./shared");
const sharedVariables = require("./shared-variables");

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

(async function() {
    let cwd, js, result, zip;

    // 5.1. Build angular application
    console.log('5.1. Build Angular application');
    cwd = path.join('..', 'web');

    result = childProcess.spawnSync(`npm run build-prod`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.slackError('Failed to build angular application //TODO: explode and tell slack', result);

    fs.copyFileSync(path.join(cwd, 'dist', 'web', 'index.html'), path.join(cwd, 'dist', 'web', '404.html'));
    fs.copyFileSync(path.join(cwd, 'dist', '.htaccess'), path.join(cwd, 'dist', 'web', '.htaccess'));
    fs.copyFileSync(path.join(cwd, 'dist', 'robots.txt'), path.join(cwd, 'dist', 'web', 'robots.txt'));

    if (shared.IS_PROD) {
        for (let region of shared.REGIONS) {
            // 5.2. Pre-render HTML for web crawlers
            console.log(`[${region}] 5.2. Pre-render HTML for web crawlers`);
            cwd = path.join('..', 'tos-html');
            js = path.join(cwd, 'src', 'index.js');

            result = childProcess.spawnSync(`node ${js} ${region}`, {cwd, shell: true, stdio: 'inherit'});
            result.status !== 0 && shared.slackError('Failed to tos-html //TODO: explode and tell slack', result);
        }
    }

    // 5.3. Patch service worker
    console.log('5.3. Patch service worker');
    cwd = path.join('..', 'tos-ngsw');
    js = path.join(cwd, 'src', 'ngsw-hotfix.js');

    result = childProcess.spawnSync(`node ${ js }`, { cwd, shell: true, stdio: 'inherit' });
    result.status !== 0 && shared.slackError('Failed to patch service worker //TODO: explode and tell slack', result);

    // 'Rename' ngsw.json to ngsw.js otherwise CloudFlare doesn't consider it as 'static'. We need to keep the .json one as well for backwards compatibility
    // https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-
    fsExtra.copySync(path.join('..', 'web', 'dist', 'web', 'ngsw.json'), path.join('..', 'web', 'dist', 'web', 'ngsw.js'));


    if (shared.IS_PROD) {
        // 5.4. Deploy on Apache
        console.log('5.4. Deploy on Apache');
        cwd = path.join('..', 'web', 'dist', 'web');
        fsExtra.copySync(cwd, sharedVariables.APACHE_WWW);

        for (let region of shared.REGIONS) {
            // 5.5. Unzip tos-html ( ͡° ͜ʖ ͡°)
            console.log(`[${ region }] 5.5. Unzip tos-html`);
            cwd = sharedVariables.APACHE_WWW;
            zip = path.join(cwd, region.toLowerCase() + '.zip');

            result = childProcess.spawnSync(`unzip -o -q ${ zip }`, {cwd, shell: true, stdio: 'inherit'});
            result.status !== 0 && shared.slackError('Failed to unzip tos-html //TODO: explode and tell slack', result);

            fs.unlinkSync(zip);
        }

        // 5.6. Clear CloudFlare cache
        console.log('5.6. Clear CloudFlare cache');
        let cf = require('cloudflare')({ email: sharedVariables.CF_EMAIL, key: sharedVariables.CF_KEY});
        let ngsw = JSON.parse(fs.readFileSync(path.join('..', 'web', 'dist', 'web', 'ngsw.js'), { encoding: 'utf8' }));
        let ngswAssetGroup = ngsw.assetGroups.find(value => value.name === 'app');
        let urls = ngswAssetGroup.urls.concat([
            '/assets/images/logo_discord.png',
            '/assets/images/logo_github.png',
            '/assets/images/logo_github_white.png',
            '/assets/images/logo_imc.png',
            '/assets/images/logo_imc_white.png',
            '/assets/images/logo_patreon.png',
            '/assets/images/logo_tos.png',
            '/assets/images/logo_twitch.png',
            '/ngsw.js',
            '/ngsw.json',
            '/ngsw-worker.js',
            // Note: manifest.json and PWA related assets will then be manually cleared
        ]);

        // TODO: consider caching the HTML again (i.e. all URLs ending in a /) (although we'll suffer when clearing it from the cache...)

        urls = urls.map(value => 'https://tos.guru' + value);

        try {
            await cf.zones.purgeCache(sharedVariables.CF_ZONE, { files: urls });
        } catch (error) {
            shared.slackError('Failed to purge cache //TODO: explode and tell slack', error)
        }
    }
})();
