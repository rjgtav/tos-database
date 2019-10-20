(function () {
    'use strict';

    const CACHE_APP = 'tos-sw:app';
    const CACHE_ASSETS = 'tos-sw:assets';
    const CACHE_ASSETS_REGION = 'tos-sw:assets/{region}';
    const PARAM_BUST = 'tos-sw-cache-bust';
    const PARAM_HASH = 'tos-sw-hash';
    const REGEX_DATA_INCLUDE = [new RegExp('^\\/api\\/data\\/([a-z]+)\\/.*\.js$')];
    const REGEX_MANIFEST_INCLUDE = [new RegExp('^.*\\/tos-sw\\.manifest\\.js$')];
    const REGEX_REGION_INCLUDE = [new RegExp('^\\/assets\\/region\\/([a-z]+)\\/.*$')];
    const REGEX_NAVIGATION_INCLUDE = [new RegExp('^\\/.*$')];
    const REGEX_NAVIGATION_EXCLUDE = [
        new RegExp("^\\/(?:.+\\/)?[^/]*\\.[^/]*$"),
        new RegExp("^\\/(?:.+\\/)?[^/]*__[^/]*$"),
        new RegExp("^\\/(?:.+\\/)?[^/]*__[^/]*\\/.*$"),
    ];

    const URL_MANIFEST = '/tos-sw.manifest.js';
    const URL_MANIFEST_REGION = '/assets/region/{region}/tos-sw.manifest.js';
    const URL_STATE = '/sw/state';

    let cacheApp, cacheAssets, cacheAssetsRegion = {};
    let manifest, manifestApp, manifestAssets, manifestAssetsRegion = {};
    let logger = [];

    async function getCacheApp() { return cacheApp = cacheApp || await caches.open(CACHE_APP) }
    async function getCacheAssets() { return cacheAssets = cacheAssets || await caches.open(CACHE_ASSETS) }
    async function getCacheAssetsRegion(region) { return cacheAssetsRegion[region] = cacheAssetsRegion[region] || await caches.open(CACHE_ASSETS_REGION.replace('{region}', region)) }
    async function getManifest(force = false) { return manifest = !force && manifest || await fetchAndCache(new Request(URL_MANIFEST), force).then(response => response.json()) }
    async function getManifestApp(force = false) { return manifestApp = !force && manifestApp || await getManifest(force).then(manifest => manifest.assetGroups.find(value => value.name === 'app')) }
    async function getManifestAssets(force = false) { return manifestAssets = !force && manifestAssets || await getManifest(force).then(manifest => manifest.assetGroups.find(value => value.name === 'assets')) }
    async function getManifestAssetsRegion(region, force = false) { return manifestAssetsRegion[region] = !force && manifestAssetsRegion[region] || await fetchAndCache(new Request(URL_MANIFEST_REGION.replace('{region}', region)), force).then(response => response.json()).then(value => value.assetGroups[0]) }

    async function hasCacheAssetsRegion(region) { return cacheAssetsRegion[region] || await caches.has(CACHE_ASSETS_REGION.replace('{region}', region)) }

    async function onActivate(event) {
        let cleanCache = async (cache, manifest) => {
            return cache.keys().then(requests => Promise.all(requests.map((request) => {
                if (request.url.indexOf(PARAM_HASH) > -1) {
                    let url = requestUrl(request).split(`?${ PARAM_HASH }=`)[0];
                    let version = +requestUrl(request).split(`?${ PARAM_HASH }=`)[1];
                    let versionExpected = +manifest.versions[url];

                    // Note: this also deals with API data responses, as versionExpected will come as NaN
                    if (version !== versionExpected)
                        return cache.delete(request);
                }
            })));
        };

        log('DEBUG','onActivate');
        log('INFO', 'Clearing ngsw caches...');
        await Promise.all((await caches.keys())
            .filter(value => value.startsWith('ngsw:'))
            .map(value => caches.delete(value))
        );

        log('INFO', 'Cleaning obsolete cache entries...');
        await cleanCache(await getCacheApp(), await getManifestApp());
        await cleanCache(await getCacheAssets(), await getManifestAssets());

        for (let region of (await getManifest()).regions)
            if (await hasCacheAssetsRegion(region))
                await cleanCache(await getCacheAssetsRegion(region), await getManifestAssetsRegion(region, true));

        // As per Angular's ngsw-worker.js:
        // As above, it's safe to take over from existing clients immediately, since the new SW
        // version will continue to serve the old application.
        event && log('INFO', 'Claiming clients...');
        event && await self.clients.claim();

        log('DEBUG', 'onActivate COMPLETE');
        return  self.clients.claim()
        //await _installComplete();
    }
    async function onFetch(request) {
        log('DEBUG','onFetch', request.url);

        // In case it's a 3rd party URL, just fetch it
        if (new URL(request.url).origin !== location.origin)
            return await fetchFromNetwork(request);

        // In case it isn't a GET request, just fetch it
        if (request.method !== 'GET')
            return await fetchFromNetwork(request);

        // In case it's the debugger URL, just print the logs
        if (requestUrl(request) === URL_STATE)
            return new Response(logger.join('\n'), { headers: new Headers({ 'Content-Type': 'text/plain' }) });

        // In case it's a navigation request, redirect it to the index.html
        if (isRequestNavigation(request))
            return await fetchAndCache(new Request((await getManifest()).index), false);

        // Otherwise just fetch it normally
        return await fetchAndCache(request, false);
    }
    async function onInstall(event) {
        log('DEBUG', 'onInstall');
        log('INFO', 'Loading manifest...');
        let manifest = await getManifestApp(true);
        let url, urls = Object.keys(manifest.versions);
        let i, length = urls.length;

        log('INFO', 'Fetching app files...');
        for (i = 0; i < length; i ++) {
            url = urls[i];

            log('DEBUG', `Fetching (${ i + 1 }/${ length }) ${ url }`);
            await _installProgress(i, length, url);
            await fetchAndCache(new Request(urls[i]));
            await _installProgress(i + 1, length, url);
        }

        // As per Angular's ngsw-worker.js:
        // SW code updates are separate from application updates, so code updates are
        // almost as straightforward as restarting the SW. Because of this, it's always
        // safe to skip waiting until application tabs are closed, and activate the new
        // SW version immediately.
        event && log('INFO', 'Skipping waiting...');
        event && self.skipWaiting();

        log('DEBUG', 'onInstall COMPLETE!');
    }
    async function onMessage(message, source) {
        let cmd = message.cmd;
        let payload = message.payload;

        switch (cmd) {
            case 'UPDATE_CHECK':
                payload = await _installUpdate();
                source && source.postMessage(Object.assign(message, { payload }));
                break;
            case 'UPDATE_INSTALL':
                await self.clients.claim();
                await self.clients
                    .matchAll({ type: 'window' })
                    .then(clients => clients.forEach(client => client.postMessage(Object.assign(message, { payload }))));

                break;
        }
    }

    async function fetchFromCache(cache, request, version, ignoreCache = false) {
        let url = requestUrl(request);
        let urlHashed = queryParamHash(url, version);
        let urlCached = version ? urlHashed : url;

        // Try to fetch it from cache
        let response = cache && !ignoreCache
          ? await cache.match(new Request(urlCached), { ignoreVary: true })
          : null;

        // Fetch from the network
        if (response == null) {
            response = await fetchFromNetwork(new Request(urlHashed));

            // Only cache valid responses
            if (cache && response && response.status === 200 && response.type === 'basic')
                cache.put(new Request(urlCached), response.clone());

            if (response == null || response.status !== 200)
                throw new Error(`Failed to fetch ${ url }. Status: ${ response && response.status } ${ response && response.statusText }`);
        }

        return response;
    }
    async function fetchFromNetwork(request) {
        try {
            return await fetch(request);
        } catch (e) {
            log('ERROR', `Failed to fetch (${request.url})`, e);
            return new Response(null, {
              status: 504,
              statusText: 'Internal Service Worker Error',
            });
        }
    }
    async function fetchAndCache(request, ignoreCache = false) {
        let cache, url = requestUrl(request), version;

        if (isRequestManifest(request)) {
            cache = await getCacheApp();
            version = null;
        } else if (isRequestData(request)) {
            let manifest = await getManifest();
            let region = REGEX_DATA_INCLUDE[0].exec(url)[1];

            cache = await getCacheAssetsRegion(region);
            version = manifest.version;
        } else if (isRequestRegion(request)) {
            let region = REGEX_REGION_INCLUDE[0].exec(url)[1];
            let manifest = await getManifestAssetsRegion(region);

            cache = await getCacheAssetsRegion(region);
            version = manifest.versions[url];
        } else {
            let manifestApp = await getManifestApp();
            let manifestAssets = await getManifestAssets();

            cache =
                manifestApp.versions[url] != null ? await getCacheApp() :
                manifestAssets.versions[url] != null ? await getCacheAssets() :
                null;

            version = manifestApp.versions[url] || manifestAssets.versions[url];
        }

        return fetchFromCache(cache, request, version, ignoreCache);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function isRequest(request, accept, navigate, regexExclude, regexInclude) {
        if (request.mode !== 'navigate' && navigate) return false;
        if (request.headers.get('Accept') && !request.headers.get('Accept').split(',').some(value => value.trim().toLowerCase() === accept) && accept) return false;

        let urlPrefix = self.registration.scope.replace(/\/$/, '');
        let url = requestUrl(request);
            url = url.startsWith(urlPrefix) ? url.substr(urlPrefix.length) : url;
        let urlWithoutQueryOrHash = url.replace(/[?#].*$/, '');

        return (
            (regexExclude == null || regexExclude.some(regex => regex.test(urlWithoutQueryOrHash)) === false) &&
            (regexInclude == null || regexInclude.some(regex => regex.test(urlWithoutQueryOrHash)) === true)
        );
    }
    function isRequestData(request) { return isRequest(request, 'application/json', null, null, REGEX_DATA_INCLUDE) }
    function isRequestManifest(request) { return isRequest(request, 'application/json', null, null, REGEX_MANIFEST_INCLUDE) }
    function isRequestNavigation(request) { return isRequest(request, 'text/html', true, REGEX_NAVIGATION_EXCLUDE, REGEX_NAVIGATION_INCLUDE) }
    function isRequestRegion(request) { return isRequest(request, null, null, null, REGEX_REGION_INCLUDE) }

    function log(level, ...message) {
      let now = new Date();
          now = `${ now.toISOString().slice(0, 10) } ${ now.toISOString().slice(11, 19) }`;

      message = message.map(value => {
          if (value instanceof Error)     return `${ value.name }: ${ value.message }. StackTrace: ${ value.stack }`;
          if (typeof value === 'object')  return JSON.stringify(value);

          return value;
      });

      logger.push(`[${ now }] [${ level.toUpperCase() }]\t\t${ message.join(' ') }`);

      if (logger.length > 64)
          logger.shift();
    }

    function queryParamBust(url) { return url + (url.indexOf('?') > -1 ? '&' : '?') + PARAM_BUST + '=' + Math.random() }
    function queryParamHash(url, version) { return version ? (url + (url.indexOf('?') > -1 ? '&' : '?') + PARAM_HASH + '=' + version) : queryParamBust(url) }
    function requestUrl(request) { return request && request.url.slice(location.origin.length) }

    async function _installProgress(progress, total, url) {
        await self.clients
            .matchAll({ includeUncontrolled: true, type: 'window' })
            .then(clients => clients.forEach(client => client.postMessage({
                cmd: 'INSTALL_PROGRESS',
                payload: {
                    progress,
                    total,
                    url
                }
            })));
    }
    async function _installUpdate() {
        log('DEBUG', 'updateCheck');
        let manifest = await getManifest();
        let manifestNew = await getManifest(true);

        if (manifestNew.version > manifest.version) {
            // Install and Activate the new version
            await onInstall(null);
            await onActivate(null);

            return true;
        }

        return false;
    }

    // Add event listeners
    self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
    self.addEventListener('fetch', event => event.respondWith(onFetch(event.request)));
    self.addEventListener('install', event => event.waitUntil(onInstall(event)));
    self.addEventListener('message', event => event.waitUntil(onMessage(event.data, event.source)));

}());
