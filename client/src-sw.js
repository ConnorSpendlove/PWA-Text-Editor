const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);
// Register a route to cache assets (stylesheets, scripts, and workers)
registerRoute(
  // Check if the request destination is style, script, or worker
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Use StaleWhileRevalidate strategy to cache assets
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Define the cache name
    plugins: [
      // Configure CacheableResponsePlugin to cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
