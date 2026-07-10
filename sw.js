// Minimal service worker for IMS L&D Rooms.
// Intentionally does NOT cache anything — bookings must always come from
// the network so the app never shows stale room availability.
// Its only job is to satisfy the browser's "installable PWA" requirement.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-only passthrough — no caching, no offline fallback.
  event.respondWith(fetch(event.request));
});
