self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('portfolio-cache-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/favicon.ico',
          '/manifest.json',
          '/assets/index-<hash>.js',
          '/assets/vendor-<hash>.js',
          '/assets/index-<hash>.css',
        ]);
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
  