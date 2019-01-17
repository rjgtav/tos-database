const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const uglifyES = require('uglify-es');

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

const HASHES = [
    '/assets/js/dexie.worker.js',
    '/assets/js/lunr.worker.js',
    '/assets/js/papaparse.worker.js',
    '/ngsw-worker.js',
];

// We are now using a hash-based cache
// As a result, we need to create 'bundles' for the workers, as they aren't processed by Angular CLI
bundleAssetsWorker(['dexie.min.js', 'dexie.worker.js'], 'dexie.worker.js');
bundleAssetsWorker(['lunr.min.js', 'lunr.worker.js'], 'lunr.worker.js');
bundleAssetsWorker(['papaparse.min.js', 'papaparse.worker.js'], 'papaparse.worker.js');

// Patch Angular's default Service Worker implementation:
// - Abuse the hashes so CloudFlare is able to cache assets for much longer
// - Make sure the cache is being used
// - Some other bug fixes
console.log('Patching ngsw-worker.js...');
let pathBackup = path.join('src', 'ngsw-worker.backup.js');
let pathFrom = path.join('src', 'ngsw-worker.js');
let pathTo = path.join('..', 'web', 'dist', 'web', 'ngsw-worker.js');

let ngswWorker = fs.readFileSync(pathTo);
let ngswWorkerBackup = fs.readFileSync(pathBackup);

if (!ngswWorker.equals(ngswWorkerBackup))
  throw new Error('ngsw-worker has been updated! Please patch it before proceeding...');

fs.writeFileSync(pathFrom, fs.readFileSync(pathTo));

// Update ngsw.json hashes
console.log('Updating ngsw.json...');
let ngswPath = path.join('..', 'web', 'dist', 'web', 'ngsw.json');
let ngsw = JSON.parse(fs.readFileSync(ngswPath, { encoding: 'UTF-8' }));

HASHES.forEach(value => {
    let buffer = fs.readFileSync(path.join('..', 'web', 'dist', 'web', value));
    let sha1 = sha1Binary(buffer);

    ngsw.hashTable[value] = sha1;
});

fs.writeFileSync(ngswPath, JSON.stringify(ngsw, null, 2));

//----------------------------------------------------------------------------------------------------------------------

function bundleAssetsWorker(sources, destination) {
    destination = path.join('..', 'web', 'dist', 'web', 'assets', 'js', destination);
    sources = sources.map(value => path.join('..', 'web', 'src', 'assets', 'js', value));
    console.log(`Bundling ${ destination }...`);

    let data = uglifyES.minify(sources.reduce((accumulator, source) => {
        let data = fs.readFileSync(source, 'UTF-8').trim();
            data = data.replace(/self\['importScripts'\]\(.*\);/g, '');

        accumulator[source] = data;
        return accumulator;
    }, {})).code;

    fsExtra.ensureFileSync(destination);
    fs.writeFileSync(destination, data);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Compute the SHA1 of the given string
 *
 * see http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
 *
 * WARNING: this function has not been designed not tested with security in mind.
 *          DO NOT USE IT IN A SECURITY SENSITIVE CONTEXT.
 *
 * Borrowed from @angular/compiler/src/i18n/digest.ts
 */
function sha1(str) {
    const utf8 = str;
    const words32 = stringToWords32(utf8, Endian.Big);
    return _sha1(words32, utf8.length * 8);
}
function sha1Binary(buffer) {
    const words32 = arrayBufferToWords32(buffer, Endian.Big);
    return _sha1(words32, buffer.byteLength * 8);
}
function _sha1(words32, len) {
    const w = new Array(80);
    let [a, b, c, d, e] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
    words32[len >> 5] |= 0x80 << (24 - len % 32);
    words32[((len + 64 >> 9) << 4) + 15] = len;
    for (let i = 0; i < words32.length; i += 16) {
        const [h0, h1, h2, h3, h4] = [a, b, c, d, e];
        for (let j = 0; j < 80; j++) {
            if (j < 16) {
                w[j] = words32[i + j];
            }
            else {
                w[j] = rol32(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            const [f, k] = fk(j, b, c, d);
            const temp = [rol32(a, 5), f, e, k, w[j]].reduce(add32);
            [e, d, c, b, a] = [d, c, rol32(b, 30), a, temp];
        }
        [a, b, c, d, e] = [add32(a, h0), add32(b, h1), add32(c, h2), add32(d, h3), add32(e, h4)];
    }
    return byteStringToHexString(words32ToByteString([a, b, c, d, e]));
}
function add32(a, b) {
    return add32to64(a, b)[1];
}
function add32to64(a, b) {
    const low = (a & 0xffff) + (b & 0xffff);
    const high = (a >>> 16) + (b >>> 16) + (low >>> 16);
    return [high >>> 16, (high << 16) | (low & 0xffff)];
}
// Rotate a 32b number left `count` position
function rol32(a, count) {
    return (a << count) | (a >>> (32 - count));
}
var Endian;
(function (Endian) {
    Endian[Endian["Little"] = 0] = "Little";
    Endian[Endian["Big"] = 1] = "Big";
})(Endian || (Endian = {}));
function fk(index, b, c, d) {
    if (index < 20) {
        return [(b & c) | (~b & d), 0x5a827999];
    }
    if (index < 40) {
        return [b ^ c ^ d, 0x6ed9eba1];
    }
    if (index < 60) {
        return [(b & c) | (b & d) | (c & d), 0x8f1bbcdc];
    }
    return [b ^ c ^ d, 0xca62c1d6];
}
function stringToWords32(str, endian) {
    const words32 = Array((str.length + 3) >>> 2);
    for (let i = 0; i < words32.length; i++) {
        words32[i] = wordAt(str, i * 4, endian);
    }
    return words32;
}
function arrayBufferToWords32(buffer, endian) {
    const words32 = Array((buffer.byteLength + 3) >>> 2);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < words32.length; i++) {
        words32[i] = wordAt(view, i * 4, endian);
    }
    return words32;
}
function byteAt(str, index) {
    if (typeof str === 'string') {
        return index >= str.length ? 0 : str.charCodeAt(index) & 0xff;
    }
    else {
        return index >= str.byteLength ? 0 : str[index] & 0xff;
    }
}
function wordAt(str, index, endian) {
    let word = 0;
    if (endian === Endian.Big) {
        for (let i = 0; i < 4; i++) {
            word += byteAt(str, index + i) << (24 - 8 * i);
        }
    }
    else {
        for (let i = 0; i < 4; i++) {
            word += byteAt(str, index + i) << 8 * i;
        }
    }
    return word;
}
function words32ToByteString(words32) {
    return words32.reduce((str, word) => str + word32ToByteString(word), '');
}
function word32ToByteString(word) {
    let str = '';
    for (let i = 0; i < 4; i++) {
        str += String.fromCharCode((word >>> 8 * (3 - i)) & 0xff);
    }
    return str;
}
function byteStringToHexString(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        const b = byteAt(str, i);
        hex += (b >>> 4).toString(16) + (b & 0x0f).toString(16);
    }
    return hex.toLowerCase();
}
