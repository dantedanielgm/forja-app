// Service worker de Forja — hace la app instalable y disponible offline.
// Estrategia pensada para una app que se actualiza seguido:
//  - El HTML (navegación): RED PRIMERO, con respaldo de caché → si hay internet
//    siempre ves la última versión; si no, abre con la última guardada.
//  - Íconos y manifest: CACHÉ PRIMERO → carga instantánea, no cambian casi nunca.
const CACHE = 'forja-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
               './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // recursos externos van directo a la red

  // El documento HTML: red primero (para recibir actualizaciones), caché si no hay red.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone();
                       caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => {});
                       return res; })
        .catch(() => caches.match('./index.html').then(hit => hit || caches.match('./')))
    );
    return;
  }

  // Resto del shell (íconos, manifest): caché primero.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }))
  );
});
