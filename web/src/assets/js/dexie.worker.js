let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

// Load papaparse
self['importScripts'](origin + 'assets/js/dexie.min.js');

//===========================================================================================================
//  Main
//===========================================================================================================
let tables = {};

self.onmessage = async function(event) {
  let message = event.data;
  let cmd = message.cmd;
  let payload = message.payload;

  switch (cmd) {
    case 'find': {
      let dataset = payload.dataset;
      let region = payload.region;

      let table = tables[dataset] = tables[dataset] || databaseTable(await databaseInitialize(dataset, region));
      let page = payload.page;
      let pageNumber = page.pageNumber;
      let pageSize = page.pageSize;
      let filter = page.filter && pageFilter(page.filter);
      let sort = page.sort && pageSort(page.sort);

      let size = await table.count();
      let collection = table.toCollection();
          collection = filter ? collection.filter((item) => !filter.find(f => item[f.column] !== f.value)) : collection;
      let result = null;

      if (sort) {
        result = await collection.toArray();
        result = result.sort(pageSorter(result, sort));
        result = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      } else {
        collection = collection.offset((pageNumber - 1) * pageSize);
        collection = collection.limit(page.pageSize);
        result = await collection.toArray();
      }

      postResponse(message, {result, size});
      break;
    }
    case 'findByIndex': {
      let dataset = payload.dataset;
      let region = payload.region;

      let table = tables[dataset] = tables[dataset] || databaseTable(await databaseInitialize(dataset, region));

      let result = await table
        .where(payload.key)
        .equals(payload.value)
        .toArray();

      postResponse(message, {result});
      break;
    }
  }
};

//===========================================================================================================
//  Methods
//===========================================================================================================
function databaseInitialize(dataset, region) {
  let databaseName = (region + '/' + dataset).toLowerCase();
  let database = new Dexie(databaseName).open();

  return database;
}
function databaseTable(database) {
  return database.table('data');
}

function pageFilter(filter) {
  return filter.split(';')
    .filter(value => !!value)
    .map(filter => {
      let index = filter.indexOf(',');
      let column = filter.slice(0, index);
      let value = filter.slice(index + 1, filter.length);
          value = !isNaN(value) ? +value : value;
          value = value === -1 ? 'True' : value === -2 ? 'False' : value; // TODO: support booleans in a non-hacky way when we rework the filters

      return { column, value }
    });
}
function pageSort(sort) {
  let index = sort.indexOf(',');

  return {
    column: sort.slice(0, index),
    order: sort.slice(index + 1, sort.length)
  }
}
function pageSorter(data, sort) {
  return (data.length && !isNaN(data[0][sort.column]))
    ? (a, b) => ((+a[sort.column] < +b[sort.column]) ? -1 : (+a[sort.column] > +b[sort.column]) ? 1 : 0) * (sort.order === 'ASC' ? 1 : -1)
    : (a, b) => (( a[sort.column] <  b[sort.column]) ? -1 : ( a[sort.column] >  b[sort.column]) ? 1 : 0) * (sort.order === 'ASC' ? 1 : -1);
}

function postResponse(message, payload) {
  self.postMessage(Object.assign(message, { payload }));
}
