importScripts('/cache-poly.js');

const version = "0.6.18";
const cacheName = `airhorner-${version}`;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('smartlink').then(function (cache) {
      return cache.addAll([
        '/',
        '/app.html',
      ]);
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
