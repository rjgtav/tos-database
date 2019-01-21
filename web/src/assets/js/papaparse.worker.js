let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

// Load papaparse
self['importScripts'](origin + 'assets/js/papaparse.min.js');

const TABLE_NAME = 'data';

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
      let url = (origin + 'assets/data/' + region + '/' + dataset + '.csv').toLowerCase();
      let i = 0;

      let database = new Database(dataset, region);
          database.initialize(schema).then(() => {
            Papa.parse(url, {
              download: true,
              header: true,
              skipEmptyLines: true,
              step: (results) => database.insert(results.data[0], i++),
              complete: () => database.transaction.oncomplete = () => postResponse(message, payload),
            });
          });

      break;
  }
};

//===========================================================================================================
//  Classes
//===========================================================================================================
class Database {

  constructor(dataset, region) {
      this.$database = null;
      this.$dataset = dataset;
      this.$region = region;
      this.$table = null;
      this.$transaction = null;
  }

  initialize(schema) {
    return new Promise((resolve, reject) => {
      let databaseName = (this.$region + '/' + this.$dataset).toLowerCase();
      let request = indexedDB.open(databaseName, new Date().getTime());
          request.onblocked = reject;
          request.onerror = reject;
          request.onsuccess = () => resolve();

          request.onupgradeneeded = (event) => {
            this.$database = event.target.result;
            this.$transaction = event.target.transaction;

            // Remove all existing indexes
            Array
              .from(this.table.indexNames)
              .forEach(index => this.table.deleteIndex(index));

            // Create new indexes
            schema.indexes && schema.indexes
              .forEach(index => this.table.createIndex(index, index, { multiEntry: true }));

            this.$transaction = null;
          };
    });
  }

  insert(row, i) {
    return new Promise((resolve, reject) => {
      // Initialize JSON and Number attributes
      for (let key in row)
        try {
          if (!key.startsWith('Description') && row.hasOwnProperty(key) && typeof row[key] === 'string') {
            if (row[key].startsWith('[') && row[key].endsWith(']'))       row[key] = JSON.parse(row[key]);
            else if (row[key].startsWith('{') && row[key].endsWith('}'))  row[key] = JSON.parse(row[key]);
            else if (row[key] && !isNaN(row[key]))                        row[key] = +row[key];
          }
        } catch (e) {}

      // Clear table before starting bulk insert
      i === 0 && this.table.clear();

      let request = this.table.add(row);
          request.onblocked = reject;
          request.onerror = reject;
          request.onsuccess = () => resolve();
    });
  }

  get table() {
    // Create table in case it doesn't exist yet
    return this.$table = this.$table || this.$database.objectStoreNames.contains(TABLE_NAME)
      ? this.transaction.objectStore(TABLE_NAME)
      : this.$database.createObjectStore(TABLE_NAME, { keyPath: '$ID' });
  }

  get transaction() {
    // Start readwrite transaction in case one isn't active yet
    return this.$transaction = this.$transaction || this.$database.transaction([TABLE_NAME], 'readwrite');
  }

}

//===========================================================================================================
//  Methods
//===========================================================================================================
function postResponse(message, payload) {
  self.postMessage(Object.assign(message, { payload }));
}

