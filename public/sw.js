const CACHE_NAME = 'sift-cache-v1';
const APP_SHELL = ['/', '/index.html', '/offline.html', '/src/main.jsx'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        if (request.url.startsWith(self.location.origin) || request.destination === 'document') {
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => {
        if (request.destination === 'document') {
          return caches.match('/offline.html');
        }
        return caches.match(request) || caches.match('/offline.html');
      })
  );
});
