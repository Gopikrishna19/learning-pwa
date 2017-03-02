const CAR_DEALS_CACHE = 'car.deals.1.0';
const CAR_IMAGES_CACHE = 'car.images.1.0';
const DEALS_PATH = '/api/latest-deals.json';
const files = [
  './',
  'index.css',
  'index.js',
  'index.html'
];

const getCache = request => {

  const url = new URL(request.url);
  const path = url.pathname;

  if (/\.jpg$/.test(path)) {

    return CAR_IMAGES_CACHE;

  }

  return CAR_DEALS_CACHE;

};

const fetchAndCache = request => fetch(request)
  .then(response => {

    caches.open(getCache(request)).then(cache => {

      cache.put(request, response).catch(() => {});

    });

    return response.clone();

  });

const cacheFirst = request => caches.match(request)
  .then(response => response || fetchAndCache(request));

const networkFirst = request => fetchAndCache(request)
  .catch(() => caches.match(request));

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
          .map(key => !(key === CAR_DEALS_CACHE || key === CAR_IMAGES_CACHE) ? caches.delete(key) : null)
          .filter(promise => promise)
      ))
  );

});

self.addEventListener('fetch', event => {

  const {request} = event;
  const url = new URL(request.url);
  const path = url.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1);

  if (path === DEALS_PATH || file === 'worker.js') {

    event.respondWith(fetch(request));

  } else if (/\.jpg$/.test(path)) {

    event.respondWith(networkFirst(request));

  } else {

    event.respondWith(cacheFirst(request));

  }

});
