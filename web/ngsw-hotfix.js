const fs = require('fs-extra');
const path = require('path');
const HTMLMinifier = require('html-minifier');
const ReplaceInfile = require('replace-in-file');
const sha1 = require('sha1');
const UglifyES = require('uglify-es');

// We are now using a hash-based cache
// As a result, we need to create 'bundles' for the workers, as they aren't processed by Angular CLI
bundleWorker(['src/assets/js/dexie.min.js', 'src/assets/js/dexie.worker.js'], 'dist/web/assets/js/dexie.worker.js');
bundleWorker(['src/assets/js/lunr.min.js', 'src/assets/js/lunr.worker.js'], 'dist/web/assets/js/lunr.worker.js');
bundleWorker(['src/assets/js/papaparse.min.js', 'src/assets/js/papaparse.worker.js'], 'dist/web/assets/js/papaparse.worker.js');

// Minify HTML
// minifyHTML('dist/web/index.html');

// Patch Angular's default Service Worker implementation:
// - Abuse the hashes so CloudFlare is able to cache assets for much longer
// - Make sure the cache is being used
console.log('Patching ngsw-worker.js');
let ngswWorker = fs.readFileSync('dist/web/ngsw-worker.js');
let ngswWorkerBackup = fs.readFileSync('ngsw-worker.backup.js');

if (!ngswWorker.equals(ngswWorkerBackup))
  throw new Error('ngsw-worker has been updated! Please patch it before proceeding...');

fs.writeFileSync('dist/web/ngsw-worker.js', fs.readFileSync('ngsw-worker.js'));

//----------------------------------------------------------------------------------------------------------------------

function bundleWorker(sources, destination) {
  console.log('Bundling', destination);
  let data = UglifyES.minify(sources.reduce((accumulator, file) => {
    let data = fs.readFileSync(file, 'utf-8');
        data = data.replace(/self\['importScripts'\]\(.*\);/g, '');

    accumulator[file] = data;
    return accumulator;
  }, {})).code;

  fs.ensureFileSync(destination);
  fs.writeFileSync(destination, data);

  // 2019-01-10: We are now applying a hash on the Service Worker directly, so we no longer need to include in the file name
  // let hash = sha1(data);
  // let extension = destination.slice(destination.lastIndexOf('.'));
  // let destinationHashed = destination.replace(extension, '.' + hash + extension);

  // fs.ensureFileSync(destinationHashed);
  // fs.writeFileSync(destinationHashed, data);

  // Update URLs in main bundle with hashed versions
  // ReplaceInfile.sync({
  //    files: getBundle('main.js'),
  //    from: new RegExp(destination.slice(destination.lastIndexOf('/') + 1), 'g'),
  //    to: destinationHashed.slice(destinationHashed.lastIndexOf('/') + 1),
  // })
}

function getBundle(file) {
  let extension = file.slice(file.indexOf('.'));
  let name = file.slice(0, file.indexOf('.') + 1);

  let folder = 'dist/web';
  let found = fs
    .readdirSync(folder)
    .find(value => value.indexOf(name) === 0 && value.indexOf(extension) > -1);

  return found && path.join(folder, found);
}

function minifyHTML(file) {
  fs.writeFileSync(file, HTMLMinifier.minify(fs.readFileSync(file, 'utf-8'), { collapseWhitespace: true, minifyJS: true }));
}
