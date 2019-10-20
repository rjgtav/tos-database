import fs from 'fs';
import glob from 'glob';
import path from 'path';
import {TOSRegionService} from "../../tos-web/src/app/shared/domain/tos-region";

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

const BLACKLIST = [];
const MANIFEST = 'tos-sw.manifest.js';
const REGION = TOSRegionService.valueOf(process.argv[2]);

if (REGION == null)
    throw Error('Invalid region: ' + process.argv[2]);

console.log('Generating manifest...');
let manifest = JSON.parse(fs.readFileSync(path.join('..', 'tos-web', 'ngsw-config.json'), 'utf8')) as NGSWConfig;
    manifest.assetGroups.forEach(assetGroup => {
        assetGroup.updateMode = assetGroup.updateMode || assetGroup.installMode;

        // Populate version table
        assetGroup.versions = {};
        assetGroup.resources.files.forEach((pattern) => {
            glob
                // Get files matching each pattern
                .sync(path.join('..', pattern.replace('{region}', TOSRegionService.toUrl(REGION))), { follow: true })
                .filter(value => BLACKLIST.find(black => value.endsWidth(black)) == null)
                // Retrieve their modified date and store it on the versions file
                .forEach(value => {
                    let modifiedTime = fs.statSync(value).mtime.getTime();
                    let file = value;
                        file = value.split('tos-web/dist')[1] || file;
                        file = value.split('tos-web-server/www')[1] || file;

                    assetGroup.versions[file] = modifiedTime;
                })
        });

        // HotFix: whenever the deploy script runs this tos-sw, it means there's a new patch
        // Unfortunately the new region.json is only injected in the tos-html (which runs after this one), so we have to force here the index.html to update
        assetGroup.versions['/index.html'] = new Date().getTime();

        // Clear unused properties
        delete assetGroup.resources;
    });

// Note: worker manifest needs to end in .js despite being a JSON file, because of CloudFlare's static content
// https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-
manifestUpdate(['app', 'assets'], manifest, path.join('..', 'tos-web-server', 'www', MANIFEST));
manifestUpdate(['assets/region'], manifest, path.join('..', 'tos-web-server', 'www', 'assets', 'region', TOSRegionService.toUrl(REGION), MANIFEST));

type NGSWConfig = {
    index: string,
    assetGroups: {
        name: string;
        installMode: 'lazy' | 'prefetch';
        updateMode?: 'lazy' | 'prefetch';
        resources: {
            files: string[];
        };
        versions: { [key: string]: number };
    }[];
    regions?: string[];
    version?: number;
}

function manifestUpdate(groups: string[], manifest: NGSWConfig, path: string) {
    let manifestNew: NGSWConfig = {
        index: manifest.index,
        assetGroups: manifest.assetGroups.filter(value => groups.indexOf(value.name) >= 0)
    };

    let manifestOld = fs.existsSync(path) && JSON.parse(fs.readFileSync(path, 'utf8'));
        manifestOld && delete manifestOld.regions;
        manifestOld && delete manifestOld.version;

    // In case there's an update, generate a new one and save it
    if (manifestOld == null || JSON.stringify(manifestNew) !== JSON.stringify(manifestOld)) {
        manifestNew.regions = TOSRegionService.values().map(value => TOSRegionService.toUrl(value));
        manifestNew.version = new Date().getTime();

        fs.writeFileSync(path, JSON.stringify(manifestNew));
    }
}