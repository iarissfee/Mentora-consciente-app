const CACHE_NAME = 'mentora-consciente-v4-local';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './assets/hero-veronica.jpg',
  './assets/logo-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // No interceptamos audio, PDFs ni pedidos a otros orígenes (Firebase, YouTube, fuentes, etc.):
  // son pesados o dependen de la red, y no deben quedar pegados en el caché del celular.
  if (url.origin !== self.location.origin || url.pathname.startsWith('/audios/') || url.pathname.endsWith('.pdf')) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
