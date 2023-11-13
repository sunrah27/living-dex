const cacheName = 'pokemon-images-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // Cache all images from 001.png to 151.png
      const urlsToCache = Array.from({ length: 905 }, (_, i) =>
        `https://www.serebii.net/pokemon/art/${String(i + 1).padStart(3, '0')}.png`
      );

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
