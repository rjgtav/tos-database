const
    sharedVariables = require("./shared-variables"),
    cf = require('cloudflare')({ email: sharedVariables.CF_EMAIL, key: sharedVariables.CF_KEY}),
    fs = require('fs'),
    path = require('path'),
    shared = require("./shared"),
    xmlToJson = require('xml2json')
;

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

(async function() {
    shared.singletonLock(true);

    console.log('+========================================================================+');
    console.log('| Cleaning CloudFlare...                                                 |');
    console.log('+========================================================================+');

    let urls;

    // Clear "app" AssetGroup cache
    let ngsw = JSON.parse(fs.readFileSync(path.join('..', 'web', 'dist', 'web', 'ngsw.js')));
    let ngswAssetGroup = ngsw.assetGroups.find(value => value.name === 'app');

    urls = ngswAssetGroup.urls.map(value => 'https://tos.guru' + value);
    urls = urls.concat([
        'https://tos.guru',
        'https://tos.guru/manifest.json',
        'https://tos.guru/ngsw.js',
        'https://tos.guru/assets/images/logo_imc.png',
        'https://tos.guru/assets/images/logo_tos.png',
    ]);

    await purgeFilesByUrl(urls);

    // Clear sitemap
    for (let region of shared.REGIONS) {
        let sitemap = fs.readFileSync(path.join('..', 'web', 'dist', 'web', 'assets', 'sitemap', region.toLowerCase() + '.sitemap.xml'));
            sitemap = JSON.parse(xmlToJson.toJson(sitemap));

        urls = sitemap.urlset.url.map(value => value.loc);
        urls = urls.concat([
            'https://tos.guru/' + region.toLowerCase(),
            'https://tos.guru/' + region.toLowerCase() + '/home',
        ]);

        // CloudFlare has a limit of 1200 requests every 5 minutes
        console.log(`[${ region }] Purging files by URL...`);
        await purgeFilesByUrl(urls);
        await new Promise((resolve) => setTimeout(() => resolve(), 5 * 61 * 1000));
    }

    shared.singletonUnlock();
})();

//======================================================================================================================
// CloudFlare
//======================================================================================================================
async function purgeFilesByUrl(files) {
    for (let start = 0; start < files.length; start += 30) {
        let end = Math.min(start + 30, files.length);

        console.log('Purging URLs start:', start, 'end:', end);
        let response = await cf.zones.purgeCache(sharedVariables.CF_ZONE, { files: files.slice(start, end) });

        if (!response.success)
            shared.slackError(new Error('Failed to purge cache //TODO: explode and tell slack'));
    }
}

// TODO: singleton lock/unlock is using filename wrongly, as all point to shared.js
// TODO: clear main links first before the rest of the sitemap