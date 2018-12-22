let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');
let versionIndex = location.href.indexOf('version=');
let version = location.href.slice(versionIndex + 8, versionIndex + 18);

// Load papaparse
self['importScripts'](origin + 'assets/js/papaparse.min.js?version=' + version);

//===========================================================================================================
//  Main
//===========================================================================================================
let database = {};

self.onmessage = function (event) {
  let message = event.data;
  let cmd = message.cmd;
  let payload = message.payload;

  switch (cmd) {
    // Load dataset
    case 'load':
      Papa.parse(payload.url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          database[''] = result.data;

          payload.groupBy && payload.groupBy
            .forEach(groupBy => database[groupBy.key] = arrayReduce(result.data, groupBy));

          postResponse(cmd, message.id, true);
        }
      });
      break;
    case 'find':
      let key = payload.key;
      let group = payload.group || '';

      let page = payload.page;
      let pageNumber = page && page.pageNumber;
      let pageSize = page && page.pageSize;
      let filter = page && page.filter && pageFilterValueOf(page.filter);
      let sort = page && page.sort && pageSortValueOf(page.sort);

      let data = database[group];
          data = key !== undefined ? data[key] : data;
          data = filter !== undefined ? data.filter((item) => !filter || !filter.find(f => item[f.column] !== f.value)) : data;
          data = sort !== undefined ? data.sort(pageSorter(data, sort)) : data;

      let dataSize = Array.isArray(data) && data.length;
          data = page && data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) || data;

      //console.log(group, 'key', key, 'database', database[group], 'response', data)
      postResponse(cmd, message.id, { result: data, size: dataSize });
      break;
  }
};

//===========================================================================================================
//  Methods
//===========================================================================================================
function arrayReduce(data, groupBy) {
  let keys = typeof groupBy.key == 'string' ? groupBy.key.split('.') : [groupBy.key];
  let keyParent = keys[0];
  let keyChild = keys[Math.min(1, keys.length - 1)];

  let populate = (accumulator, key, value) => {
    if (key == null || value == null)
      return;

    if (groupBy.forceBoolean)
      key = key.toLowerCase() === 'true';
    if (typeof key == 'object')
      key = key[keyChild];

    if (groupBy.forceArray) {
      accumulator[key] = accumulator[key] || [];
      accumulator[key].push(value);
    } else {
      accumulator[key] = value;
    }
  };

  return data.reduce((accumulator, entry) => {
    let key = entry[keyParent];
        key = typeof key === 'string' && key[0] === '[' ? JSON.parse(key) : key;

    if (Array.isArray(key)) key.map(key => populate(accumulator, key, entry));
    else                    populate(accumulator, key, entry);

    return accumulator;
  }, {})
}

function pageFilterValueOf(filter) {
  return filter.split(';')
    .filter(value => !!value)
    .map(filter => {
      let index = filter.indexOf(',');
      let column = filter.slice(0, index);
      let value = filter.slice(index + 1, filter.length);
          value = value === '-1' ? 'True' : value === '-2' ? 'False' : value; // TODO: support booleans in a non-hacky way when we rework the filters

      return { column, value }
    });
}
function pageSortValueOf(sort) {
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

function postResponse(cmd, id, payload) {
  self.postMessage({ cmd, id, payload });
}

