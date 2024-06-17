self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('portfolio-cache-v1').then(cache => {
      return fetch('/asset-manifest.json')
        .then(response => response.json())
        .then(assets => {
          const urlsToCache = [
            '/',
            '/index.html',
            '/favicon.ico',
            '/manifest.json',
            ...Object.values(assets),
          ];
          return cache.addAll(urlsToCache);
        });
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
