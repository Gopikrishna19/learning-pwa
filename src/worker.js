const CAR_DEALS_CACHE = 'car.deals.1.0';
const files = [
  'index.css',
  'index.js',
  './',
  'index.html'
];

self.addEventListener('install', () => {

  caches.open(CAR_DEALS_CACHE)
    .then(cache => cache.addAll(files));

});

