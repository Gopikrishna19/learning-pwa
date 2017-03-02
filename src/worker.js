const CAR_DEALS_CACHE = 'car.deals.1.0';
const files = [
  'index.css',
  'index.js',
  './',
  'index.html'
];

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CAR_DEALS_CACHE)
      .then(cache => cache.addAll(files))
  );

});

self.addEventListener('activate', event => {

  self.clients.claim();

  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .map(key => key !== CAR_DEALS_CACHE ? caches.delete(key) : null)
          .filter(promise => promise)
      ))
  );

});
