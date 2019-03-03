const fs = require('fs');
const glob = require("glob");
const path = require('path');

const FILE_MANIFEST = 'manifest.json';
const FILE_WORKER = 'tos-sw.worker.js';
const FILE_WORKER_MANIFEST = 'tos-sw.manifest.js';
// Note: worker manifest needs to end in .js despite being a JSON file, because of CloudFlare's static content
// https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

console.log('Generating manifest...');
let manifest = JSON.parse(fs.readFileSync(path.join('..', 'web', 'ngsw-config.json'), 'utf-8'));
    manifest.assetGroups.forEach(assetGroup => {
        assetGroup.updateMode = assetGroup.updateMode || assetGroup.installMode;

        // Populate version table
        assetGroup.versions = {};
        assetGroup.resources.files.forEach((pattern) => {
            // Skip service worker files
            if (pattern.endsWith(FILE_MANIFEST) ||
                pattern.endsWith(FILE_WORKER) ||
                pattern.endsWith(FILE_WORKER_MANIFEST)
            ) return;

            let base = [
                path.join('..', 'web', 'dist'),
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

                        assetGroup.versions[file] = modifiedTime;
                    })
            })
        });

        // Clear unused properties
        delete assetGroup.resources;
    });

let manifestPath = path.join('..', 'tos-build', 'dist', FILE_WORKER_MANIFEST);
let manifestOld = fs.existsSync(manifestPath) && JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    manifestOld && delete manifestOld.version;

// In case there's an update, generate a new one and save it
if (manifestOld == null || JSON.stringify(manifest) !== JSON.stringify(manifestOld)) {
    manifest.version = new Date().getTime();

    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
}
