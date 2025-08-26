// A list of files to cache for offline use.
const CACHE_NAME = 'skincare-app';
const urlsToCache = [
  './',
  './data.js',
  './index.html',
  './icons/icon.png'
];

// 1. Install Event: Cache the essential app files (the "app shell").
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch Event: Intercept network requests.
// This allows the app to work offline by serving cached files.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the requested file is in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});