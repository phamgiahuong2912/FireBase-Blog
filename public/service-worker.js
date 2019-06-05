/* eslint-disable no-restricted-globals */

// var CACHE_NAME = "pwgen-cache-v1";

// console.log("service worker");
// var urlsToCache = ["manifest.json?v3"];
// self.addEventListener("install", function(event) {
//   // Perform install steps
//   console.log("installing sw");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       console.log("Opened cache");
//       var x = cache.addAll(urlsToCache);
//       console.log("cache added");
//       return x;
//     }),
//   );
// });
// self.addEventListener("install", () => self.skipWaiting());
// self.addEventListener("activate", () => self.clients.claim());
// self.addEventListener("fetch", function(event) {
//   console.log("Fetch!", event.request);
// });
var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = ["/", "/js/bundle.js"];

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});
