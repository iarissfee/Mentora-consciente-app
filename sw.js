// Service worker mínimo: solo lo necesario para que la app sea instalable.
// No cachea nada todavía, así que siempre carga la versión más nueva.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
