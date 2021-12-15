importScripts(
  "https://g.alicdn.com/mylib/lp-workbox-cdn/3.6.3-2/workbox/workbox-sw.js"
);
workbox.setConfig({ debug: false });
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.suppressWarnings(false);
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /sw.reg.mgr.js/gi,
  workbox.strategies.networkOnly(),
  "GET"
);

workbox.routing.registerRoute(
  ({ url }) => {
    return /.*.(js|css|ttf)/.test(url.href);
  },
  workbox.strategies.cacheFirst({
    cacheName: "bilibili-cover-editor-core",
    plugins: [
      {
        requestWillFetch: ({ event }) => {
          return new Request(event.request.url, { mode: "cors" });
        },
      },
      new workbox.expiration.Plugin({
        maxEntries: 100,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  "GET"
);

workbox.routing.registerRoute(
  ({ url }) => {
    return url.origin == location.origin;
  },
  workbox.strategies.staleWhileRevalidate({
    cacheName: "bilibili-cover-editor-res",
    plugins: [
      {
        requestWillFetch: ({ event }) => {
          return new Request(event.request.url, { mode: "cors" });
        },
      },
      new workbox.expiration.Plugin({
        maxEntries: 100,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  "GET"
);
