(function () {
    'use strict';

    const CACHE_APP = 'tos-sw:app';
    const CACHE_ASSETS = 'tos-sw:assets';
    const PARAM_BUST = 'tos-sw-cache-bust';
    const PARAM_HASH = 'tos-sw-hash';
    const REGEX_NAVIGATION_INCLUDE = [new RegExp("^\\/.*$")];
    const REGEX_NAVIGATION_EXCLUDE = [
        new RegExp("^\\/(?:.+\\/)?[^/]*\\.[^/]*$"),
        new RegExp("^\\/(?:.+\\/)?[^/]*__[^/]*$"),
        new RegExp("^\\/(?:.+\\/)?[^/]*__[^/]*\\/.*$"),
    ];

    const URL_MANIFEST = '/tos-sw.manifest.js';
    const URL_STATE = '/sw/state';

    let cacheApp;
    let cacheAssets;
    let manifest, manifestApp, manifestAssets;
    let logger = [];

    async function getCacheApp() { return cacheApp = cacheApp || await caches.open(CACHE_APP) }
    async function getCacheAssets() { return cacheAssets = cacheAssets || await caches.open(CACHE_ASSETS) }
    async function getManifest(force = false) { return manifest = !force && manifest || await fetchAndCache(new Request(URL_MANIFEST)).then(response => response.json()) }
    async function getManifestApp(force = false) { return manifestApp = !force && manifestApp || await getManifest(force).then(manifest => manifest.assetGroups.find(value => value.name === 'app')) }
    async function getManifestAssets(force = false) { return manifestAssets = !force && manifestAssets || await getManifest(force).then(manifest => manifest.assetGroups.find(value => value.name === 'assets')) }

    async function onActivate(event) {
        let cleanCache = async (cache, manifest) => {
            return cache.keys().then(requests => Promise.all(requests.map((request) => {
                if (request.url.indexOf(PARAM_HASH) > -1) {
                    let url = requestUrl(request).split(`?${ PARAM_HASH }=`)[0];
                    let version = requestUrl(request).split(`?${ PARAM_HASH }=`)[1];
                    let versionExpected = manifest.versions[url];

                    if (+version !== versionExpected)
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

        // As per Angular's ngsw-worker.js:
        // As above, it's safe to take over from existing clients immediately, since the new SW
        // version will continue to serve the old application.
        event && log('INFO', 'Claiming clients...');
        event && await self.clients.claim();

        log('DEBUG', 'onActivate COMPLETE');
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
        if (isNavigationRequest(request))
            return await fetchAndCache(new Request((await getManifest()).index), false);

        // Otherwise just fetch it normally
        return await fetchAndCache(request, false);
    }
    async function onInstall(event) {
        log('DEBUG', 'onInstall');
        log('INFO', 'Loading manifest...');
        let cache = await getCacheApp();
        let manifest = await getManifestApp(true);

        log('INFO', 'Initializing cache and preloading app assets...');
        for (let url of Object.keys(manifest.versions)) {
            let request = new Request(queryParamHash(url, manifest.versions[url]));
            
            if ((await cache.match(request, { ignoreVary: true })) == null)
                await cache.add(request);
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
        if (!(source instanceof Client))
            return;

        let cmd = message.cmd;
        let payload = message.payload;

        switch (cmd) {
            case 'UPDATE_CHECK':
                payload = await updateCheck();
                source.postMessage(Object.assign(message, { payload }));
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

        if (url === URL_MANIFEST) {
            cache = await getCacheApp();
            version = null;
        } else {
            let manifestApp = await getManifestApp();
            let manifestAssets = await getManifestAssets();

            cache = manifestApp.versions[url] != null
                ? await getCacheApp()
                : manifestAssets.versions[url] != null
                    ? await getCacheAssets()
                    : null;

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
    function isNavigationRequest(request) {
        if (request.mode !== 'navigate') return false;
        if (request.headers.get('Accept') && !request.headers.get('Accept').split(',').some(value => value.trim().toLowerCase() === 'text/html')) return false;

        let urlPrefix = self.registration.scope.replace(/\/$/, '');
        let url = requestUrl(request);
            url = url.startsWith(urlPrefix) ? url.substr(urlPrefix.length) : url;
        let urlWithoutQueryOrHash = url.replace(/[?#].*$/, '');

        return  REGEX_NAVIGATION_INCLUDE.some(regex => regex.test(urlWithoutQueryOrHash)) &&
                !REGEX_NAVIGATION_EXCLUDE.some(regex => regex.test(urlWithoutQueryOrHash));
    }

    function queryParamBust(url) { return url + (url.indexOf('?') > -1 ? '&' : '?') + PARAM_BUST + '=' + Math.random() }
    function queryParamHash(url, version) { return version ? (url + (url.indexOf('?') > -1 ? '&' : '?') + PARAM_HASH + '=' + version) : queryParamBust(url) }

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

    function requestUrl(request) { return request && request.url.slice(location.origin.length) }

    async function updateCheck() {
        log('DEBUG', 'updateCheck');
        let manifest = await getManifest();
        let manifestNew = await fetchAndCache(new Request(URL_MANIFEST), true).then(response => response.json());

        if (manifestNew.version > manifest.version) {
            // Update cache and clear obsolete entries
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

    // XTODO: how does the 'check for updates' work on angular's SW? do they also trigger the onActivated logic?
    // XTODO: Check for updates => update the app files before reloading => reload ALL clients (not just the current one)
    // XTODO: send event to main page when installed successfully (so users can reload to activate it), when new update is available, ...?
    // XTODO: review deployment and tos-sw index scripts
    // XTODO: test if service worker is working (need to build app in prod)
    // XTODO: implement a way of seeing the logs
    // XTODO: when updating, download only the files that changed
    // XTODO: communication between SW <> clients. Add a button to manually check for updates. Show 'Checking for updates' when clicked, don't show otherwise. Show 'Installing updates...' and show a refresh to update.
    // XTODO: it seems when it updates it stores the new manifest on a different cache entry.... with the tos-sw-hash..
    // XTODO: app updates aren't going through, it always reloads back to the old index.html it seems? and also doesn't download the new scripts
    // XTODO: offline mode not working very well. Seems like when the worker gets out of memory, it then tries to fetch the manifest from the network instead of using the one in cache
    // XTODO: test if SW worker is able to update the manifest
    // XTODO: use clients.claims() to claim all clients after installation
    // XTODO: use self.skipWaiting() to skip waiting for the current service worker to stop controlling any client and activate immediately
    // XTODO: Uninstall current angular service worker
    // XTODO: store 'versions' file with the modified time for every asset
    // XTODO: handle file requests and navigation requests
    // XTODO: use kTEST icons so we always have the latest versions
    // XTODO: load region versions from an external file so we no longer need to recompile the website? Same for patreons.. What else?
    // XTODO: update .gitignore so we can include the deployed website. Maybe remove the traditional src/assets/icons folder?
    // XTODO: deploy master on beta.tos.guru the old version, tell discord?
    // XTODO: commit & push to a separate branch
    // XTODO: updating the region.json is always generating a new commit cuz the keys aren't stored in an ordered way...
    // XTODO: remove /tos-web/dist/ from urls in tos-sw-manifest.js
    // XTODO: deploy new branch on beta.tos.guru and tell discord t test
    // XTODO: rename web to tos-web
    // XTODO: fix tinyurl which is breaking all the time.. considering implementing my own CORS or maybe do it via SW?
    // XTODO: fix deploy script always creating new commits every hour due to the manifest
    // XTODO: fix html2canvas broken submodule link
    // XTODO: test how the upgrade will work. In theory, when the client loads the new ngsw-worker, it will uninstall the existing installation and start the new process
    // XTODO: build script is always commiting at least the index.json? even when there's no new patch
    // XTODO: review cloudflare configuration so we don't cache the worker and the versions file
    // XTODO: update deploy.js so it clears cloudflare's cache for tos.guru instead of beta.tos.guru
    // XTODO: http://localhost:4200/itos/database/skills/50101 CaptionRatio3 is crashing
    // XTODO: kTEST have broken cooldown and SP again :/
    // XTODO: level cap has been updated to 420...

    // Deployment
    // Replace existing ngsw-worker with safety-worker (rename it to ngsw-worker.js), so the old SW unregisters itself
    // Remove ngsw.js and clear it from CloudFlare cache
}());
