let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

// Load lunr.js
self['importScripts'](origin + 'assets/js/lunr.min.js');

let idx = null;
let PAGE_SIZE = 16;

self.onmessage = function (event) {
  let message = event.data;
  let cmd = message.cmd;
  let payload = message.payload;

  switch (cmd) {
    // Load region's index
    case 'load':
      let region = payload.region;
      let version = payload.version;
      let url = (origin + 'assets/data/' + region + '/index.' + version + '.json').toLowerCase();

      let xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'json';
          xhr.onload = () => {
            let json = xhr.response;
                json.pipeline = ['stopWordFilter']; // Hotfix: disable stemmer and enable stop word filtering

            idx = lunr.Index.load(json);
            postResponse(cmd, message.id, true);
          };
          xhr.send();
      break;

    // Search the index
    case 'query':
      let result = [];
      let page = payload.page || 0;
      let dataset = payload.dataset;

      try {
        //console.log('query', payload.query, 'dataset', dataset)
        result = idx.search(payload.query);
        result = !!dataset ? result.filter(value => value['ref'].split('#')[0] === dataset) : result;
        result = result.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
      } catch (e) {}

      postResponse(cmd, message.id, result);
      break;
  }
};

//===========================================================================================================
//  Methods
//===========================================================================================================
function postResponse(cmd, id, payload) {
  self.postMessage({ cmd, id, payload });
}
