let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

// Load papaparse
self['importScripts'](origin + 'assets/js/papaparse.min.js');

//===========================================================================================================
//  Main
//===========================================================================================================
self.onmessage = async function(event) {
  let message = event.data;
  let cmd = message.cmd;
  let payload = message.payload;

  switch (cmd) {
    case 'load': // Load dataset into IndexedDB
      let dataset = message.dataset;
      let region = payload.region;
      let schema = payload.schema;
      let version = payload.version;
      let url = (origin + 'assets/data/' + region + '/' + dataset + '.' + version + '.csv').toLowerCase();

      let database = await databaseInitialize(dataset, region, schema);
      let transaction = databaseTransaction(database);
      let request = null;

      Papa.parse(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        step: (results, parser) => request = databaseInsert(transaction, results.data[0]),
        complete: () => {
          if (request)  request.onsuccess = () => transaction.oncomplete = () => postResponse(message, payload);
          else          postResponse(message, payload);
        }
      });
      break;
  }
};

//===========================================================================================================
//  Methods
//===========================================================================================================
async function databaseInitialize(dataset, region, schema) {
  let databaseCreate = (databaseName) => new Promise((resolve, reject) => {
    let request = indexedDB.open(databaseName, 1);
        request.onblocked = reject;
        request.onerror = reject;
        request.onsuccess = (event) => resolve(event.target.result);

        request.onupgradeneeded = (event) => {
          let database = event.target.result;
          let table = database.createObjectStore('data', { keyPath: '$ID' });

          for (let column of schema.indexes || [])
            table.createIndex(column, column, { multiEntry: true });
        };
  });
  let databaseDelete = (databaseName) => new Promise((resolve, reject) => {
    let request = indexedDB.deleteDatabase(databaseName);
        request.onerror = reject;
        request.onsuccess = (event) => resolve(event);
  });

  let databaseName = (region + '/' + dataset).toLowerCase();

         await databaseDelete(databaseName);
  return await databaseCreate(databaseName);
}
function databaseInsert(transaction, object) {
  // Initialize JSON and Number attributes
  for (let key in object)
    try {
      if (!key.startsWith('Description') && object.hasOwnProperty(key) && typeof object[key] === 'string') {
        if (object[key].startsWith('[') && object[key].endsWith(']'))       object[key] = JSON.parse(object[key]);
        else if (object[key].startsWith('{') && object[key].endsWith('}'))  object[key] = JSON.parse(object[key]);
        else if (object[key] && !isNaN(object[key]))                        object[key] = +object[key];
      }
    } catch (e) {}

  // Optimization: inspired by Dixie.js, we only listen to the onsuccess of the final request
  return transaction.objectStore('data').add(object);
}
function databaseTransaction(database) {
  return database.transaction(['data'], 'readwrite');
}

function postResponse(message, payload) {
  self.postMessage(Object.assign(message, { payload }));
}

