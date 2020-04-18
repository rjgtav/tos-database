import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import {ApiDataService} from "./api/data.service";
import {ApiTinyUrlService} from "./api/tinyurl.service";
import {TranslateService} from "./service/translate.service";
import {ApiImageService, ImageService} from "./api/image.service";

// Frontend
// TODO: remove patreon from index.html and load it lazily
// TODO: rework search & filtering
// TODO: Remove userreport feedback and replace it with a commenting system?

// Backend
// TODO: tos-web| add language selector, only finish loading after loading the search index
// TODO: tos-worker| save all data json files locally, clear them on version update
// TODO: how to deal with WASM and cloudflare? WASM is a blob..
// TODO: watchout for cloudflare's weird compression mimetype limitation (https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-)
// TODO: watchout for cloudflare's static file cache limitation (https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-Cloudflare-cache-for-static-content-)
// XTODO: serve static assets
// XTODO: serve individual entities
// TODO: entity list/index (with search keys)
// XTODO: load game data on boot
// XTODO: reload when a new patch is available
// TODO: handle angular routes
// TODO: instead of using the tos-html project, simply generate the templates live
// TODO: update service worker as we'll now be versioning every item, need to delete the data from the previous patch, etc. what about images?

// Initialize services
ImageService.loadAll();
TranslateService.loadAll();

// Initialize server
const port = 3939;
const app = express();
      app.use(bodyParser.json()); // support json encoded bodies
      app.use(bodyParser.urlencoded({ extended: true })); // support url encoded bodies
      app.use(express.static('www', { etag: false, lastModified: false }));

// REST API
ApiDataService.handler(app, '/api/:region/data/:language');
ApiImageService.handler(app, '/api/:region/image');
ApiTinyUrlService.handler(app, '/api/tinyurl');

// Redirect all non-file unrecognized routes to index.html, in order to support Angular html5mode routes
app.get(/^[^.]*$/, (req, res) => res.sendFile(path.resolve('www/index.html')));

// Launch server on the specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
