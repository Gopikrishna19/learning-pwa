const CAR_DEALS_CACHE = 'car.deals.1.0';
const DEALS_PATH = '/api/latest-deals.json';
const files = ['./', 'index.css', 'index.js', 'index.html'];

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(caches.open(CAR_DEALS_CACHE).then(cache => cache.addAll(files)));
});

self.addEventListener('activate', event => {

  self.clients.claim();

  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CAR_DEALS_CACHE ? caches.delete(key) : null).filter(promise => promise))));
});

self.addEventListener('fetch', event => {

  const url = new URL(event.request.url);
  const path = url.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1);

  if (path === DEALS_PATH || file === 'worker.js') {

    event.respondWith(fetch(event.request));
  }
});