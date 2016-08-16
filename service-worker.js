/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["index.html","f3264503c95c6a830d82626fc277d6f3"],["static/bootstrap337/css/bootstrap-theme.css","b9b46bcc4dad6cc90fc4f95073c50735"],["static/bootstrap337/css/bootstrap-theme.css.map","d6cc0a3c7532b74efe92da8992bd7542"],["static/bootstrap337/css/bootstrap-theme.min.css","ab6b02efeaf178e0247b9504051472fb"],["static/bootstrap337/css/bootstrap-theme.min.css.map","5f587b800215ee268efd2676ac010b25"],["static/bootstrap337/css/bootstrap.css","2a31dca112f26923b51676cb764c58d5"],["static/bootstrap337/css/bootstrap.css.map","c7ffd8c7a285780039b2366034f3bca2"],["static/bootstrap337/css/bootstrap.min.css","ec3bb52a00e176a7181d454dffaea219"],["static/bootstrap337/css/bootstrap.min.css.map","35b79ebe0b7805c1c84524ad920faa33"],["static/bootstrap337/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["static/bootstrap337/fonts/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["static/bootstrap337/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["static/bootstrap337/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["static/bootstrap337/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["static/bootstrap337/js/bootstrap.js","fb81549ee2896513a1ed5714b1b1a0f0"],["static/bootstrap337/js/bootstrap.min.js","5869c96cc8f19086aee625d670d741f9"],["static/bootstrap337/js/npm.js","ccb7f3909e30b1eb8f65a24393c6e12b"],["static/css/app.86c66b00b93500c5b661c9abae51b604.css","4e6b0e6f695d20c3d2cdcbc121779216"],["static/css/app.86c66b00b93500c5b661c9abae51b604.css.map","0a484982d254940ef9d35a9292a1f373"],["static/jquery222.min.js","1d35678c5edbb639ab7aa5cce0856f57"],["static/js/app.0939f6fe2be3206362c3.js","a46977fb02324152058163c8f23f561e"],["static/js/app.0939f6fe2be3206362c3.js.map","0817753cfe540146ee4b5a4b8ff6cddc"],["static/js/manifest.5515ac09b0fa6dff2224.js","aecfe297ed79238440b94a57deb05907"],["static/js/manifest.5515ac09b0fa6dff2224.js.map","0481208c7cdfc43fdf0f13c0dc0509d3"],["static/js/vendor.0f8b3cb597b0b55e6cb4.js","70fec75a1994c691b8bfcf255d616536"],["static/js/vendor.0f8b3cb597b0b55e6cb4.js.map","f3a69ffd332a8242db33de13dc84f981"],["static/service-worker.js","0b33ea85a664bbc160463b9042d71fa9"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-sw-precache-' + (self.registration ? self.registration.scope : '') + '-';




var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


