//  const fs = require('fs');
//  const glob = require('glob');
//  const papaparse = require('papaparse');
//  const path = require('path');
//
//  const IES_ClassID = {};
//  const IES_ClassName = {};
//  const IES_Columns = {};
//
//  const INPUT = () => path.join('..', 'tos-parser', 'input');
//  const INPUT_REGION = (region) => path.join(INPUT(), region, 'data');
//
//  async function get(request, response, next) {
//      let region = request.params.region;
//      let param = request.params[0];
//
//      let i = param.lastIndexOf('/');
//      let key = '/' + param.slice(0, i);
//      let identifier = param.slice(i + 1);
//
//      let ies_ClassID = IES_ClassID[region][key];
//      let ies_ClassName = IES_ClassName[region][key];
//      let ies_Columns = IES_Columns[region][key];
//
//      let offset = ies_ClassID[identifier] || ies_ClassName[identifier];
//      if (offset == null)
//          return response.sendStatus(404);
//
//      let ies_path = path.join(INPUT_REGION(region), key);
//      let ies_stream = fs.createReadStream(ies_path, { encoding: 'utf8', start: offset[0], end: offset[1] - 1 });
//
//      return new Promise((resolve, reject) => {
//          let data = '';
//
//          ies_stream.on('data', (chunk) => data += chunk);
//          ies_stream.on('end', () => {
//              // Close stream
//              ies_stream.close();
//
//              // Send JSON response
//              response
//                  .status(200)
//                  .json(papaparse.parse(ies_Columns + '\n' + data, {
//                      dynamicTyping: true,
//                      header: true,
//                  }).data);
//          })
//      });
//  }
//
//  async function load(request, response, next, whitelist) {
//      if (request && !request.headers.host.startsWith('localhost'))
//          return;
//
//      for (let region of fs.readdirSync(INPUT())) {
//          if (whitelist && whitelist.indexOf(region) === -1)
//              continue;
//
//          let input_region = INPUT_REGION(region);
//          let region_ies_ClassID = {};
//          let region_ies_ClassName = {};
//          let region_ies_Columns = {};
//
//          console.time(`index-data:load ${ region }`);
//          for (let ies of glob.sync(path.join(input_region, '**/*.ies'))) {
//              let key = ies.slice(input_region.length);
//              let value_ClassID = region_ies_ClassID[key] = {};
//              let value_ClassName = region_ies_ClassName[key] = {};
//
//              let data = fs.readFileSync(ies, 'utf8');
//              let i = data.indexOf('\n');
//              let iUnicode = byteLength(data.slice(0, i + 1));
//              let columns = data.slice(0, i++).split(',');
//
//              let ClassID = null, ClassName = null;
//              let iClassID = columns.indexOf('ClassID');
//              let iClassName = columns.indexOf('ClassName');
//              let iColumn = 0;
//              let iComma = i;
//              let iCommaPrevious = iComma;
//              let iLine = iUnicode;
//              let iLinePrevious = iLine;
//              let bEscape = false;
//              let bQuote = false;
//
//              for (let c = data[i]; i < data.length; c = data[++i]) {
//                  /*
//                  if (c === '\\' && bEscape === false) {
//                      bEscape = true;
//                      continue;
//                  }
//                  */
//
//                  if (c === '\n' && bQuote === false) {
//                      iColumn = 0;
//                      iCommaPrevious = i + 1;
//                      iComma = iCommaPrevious;
//                      iLine = iUnicode;
//
//                      if (ClassID !== null)
//                          value_ClassID[ClassID] = [iLinePrevious, iLine];
//                      if (ClassName !== null)
//                          value_ClassName[ClassName] = [iLinePrevious, iLine];
//
//                      iLinePrevious = iUnicode + byteLength(c);
//                      iLine = iLinePrevious;
//                  }
//                  if (c === ',' && bEscape === false && bQuote === false) {
//                      iColumn ++;
//                      iCommaPrevious = iComma;
//                      iComma = i + 1;
//
//                      if (iColumn - 1 === iClassID && iClassID >= 0)
//                          ClassID = data.slice(iCommaPrevious, iComma - 1);
//                      if (iColumn - 1 === iClassName && iClassName >= 0)
//                          ClassName = data.slice(iCommaPrevious + 1, iComma - 1 - 1); // Also remove the quotes from the ClassName
//                  }
//                  if (c === '"' && bEscape === false) {
//                      bQuote = !bQuote;
//                  }
//
//                  bEscape = false;
//                  iUnicode += byteLength(c);
//              }
//
//              // Beware of Chrome's string slice memory leak.
//              // By doing a join, we force it to allocate a new string with just the columns instead of the entire file
//              region_ies_Columns[key] = columns.join(',');
//          }
//
//          console.timeEnd(`index-data:load ${ region }`);
//          IES_ClassID[region] = region_ies_ClassID;
//          IES_ClassName[region] = region_ies_ClassName;
//          IES_Columns[region] = region_ies_Columns;
//      }
//  }
//
//  exports.init = (app, arguments) => {
//      app.get('/data/:region/*', get);
//      app.post('/data/load', load);
//
//      load(undefined, undefined, undefined, arguments.profile === 'dev' ? ['iTOS'] : undefined);
//  };
//
//  // Returns the byte length of an UTF8 string
//  // Thanks https://gist.github.com/lovasoa/11357947
//  function byteLength(str) {
//      let s = str.length;
//      for (let i=str.length-1; i>=0; i--) {
//          let code = str.charCodeAt(i);
//          if (code > 0x7f && code <= 0x7ff) s++;
//          else if (code > 0x7ff && code <= 0xffff) s+=2;
//          if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
//      }
//      return s;
//  }
