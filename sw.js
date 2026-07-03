const CACHE_NAME = 'quran-cache-v3';
const ASSETS = [
  'index.html',
  'style.css',
  'quran.js',
  'translation_efficient.js',
  'quran-font.woff2',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Memasang Service Worker & Menyimpan Aset ke dalam Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Mengaktifkan Service Worker & Memadam Cache Lama jika ada kemas kini
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Membaca fail dari Cache terlebih dahulu untuk kelajuan maksima (Offline-first)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
