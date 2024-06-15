self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('portfolio-cache-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/js/bundle.js',
          '/static/js/0.chunk.js',
          '/static/js/main.chunk.js',
          '/favicon.ico',
          '/manifest.json',
          
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
  