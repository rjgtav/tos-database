let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');
let versionIndex = location.href.indexOf('version=');
let version = location.href.slice(versionIndex + 8, versionIndex + 18);

// Load lunr.js
self['importScripts'](origin + 'assets/js/lunr.min.js?version=' + version);

let idx = null;

self.onmessage = function (event) {
  switch (event.data.cmd) {
    // Load region's index
    case 'load':
      let url = event.data.url;
      let xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'json';
          xhr.onload = () => {
            let json = xhr.response;
                json.pipeline = ['stopWordFilter']; // Hotfix: disable stemmer and enable stop word filtering

            idx = lunr.Index.load(json);
            self.postMessage({ cmd: 'load' });
          };
          xhr.send();
      break;
    // Search the index
    case 'query':
      let query = event.data.query;
      let result = idx.search(query);

      self.postMessage({ cmd: 'query', result });
      break;
  }
};
