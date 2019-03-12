const fs = require('fs');
const glob = require("glob");
const path = require('path');

const FILE_BLACKLIST = [
    'manifest.json',
    'ngsw-worker.js',
    'tos-sw.manifest.js',
    'tos-sw.worker.js',
];

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

console.log('Generating manifest...');
let manifest = JSON.parse(fs.readFileSync(path.join('..', 'tos-web', 'ngsw-config.json'), 'utf-8'));
    manifest.assetGroups.forEach(assetGroup => {
        assetGroup.updateMode = assetGroup.updateMode || assetGroup.installMode;

        // Populate version table
        assetGroup.versions = {};
        assetGroup.resources.files.forEach((pattern) => {
            let base = [
                path.join('..', 'tos-web', 'dist'),
                path.join('..', 'tos-build', 'dist'),
            ];

            base.forEach(base => {
                glob
                    // Get files matching each pattern
                    .sync(base + pattern)
                    .filter(value => path.basename(value).indexOf('.') > 0)
                    // Retrieve their modified date and store it on the versions file
                    .forEach(value => {
                        let modifiedTime = fs.statSync(value).mtime.getTime();
                        let file = value.slice(base.length);

                        // Skip files in the blacklist (mostly service worker related files)
                        for (let blacklist of FILE_BLACKLIST)
                            if (file.endsWith(blacklist))
                                return;

                        assetGroup.versions[file] = modifiedTime;
                    })
            })
        });

        // Clear unused properties
        delete assetGroup.resources;
    });

// Note: worker manifest needs to end in .js despite being a JSON file, because of CloudFlare's static content
// https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-
let manifestPath = path.join('..', 'tos-build', 'dist', 'tos-sw.manifest.js');
let manifestOld = fs.existsSync(manifestPath) && JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    manifestOld && delete manifestOld.version;

// In case there's an update, generate a new one and save it
if (manifestOld == null || JSON.stringify(manifest) !== JSON.stringify(manifestOld)) {
    manifest.version = new Date().getTime();

    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
}
