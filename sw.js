importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/4cef28eaeb1895264d83.js",
    "revision": "2d437c3e094e807044ac3325fbece9d9"
  },
  {
    "url": "/_nuxt/5f78f7ba8f4b645114d3.js",
    "revision": "2f89c1c2086d0ee21bfff3fb1b634f1b"
  },
  {
    "url": "/_nuxt/940bff78971b3a8457f1.js",
    "revision": "b391cc5c1507b4b97241ee1f02dff158"
  },
  {
    "url": "/_nuxt/aec48c8842d11c4b68c6.js",
    "revision": "82ef0d50b901aaf1bb758e6f48283e3e"
  },
  {
    "url": "/_nuxt/c78dc612f95769158acb.js",
    "revision": "b35e2a4f60960c957dd3da4b0d7d6f03"
  },
  {
    "url": "/_nuxt/cf53f0044f76166c3158.js",
    "revision": "c9d8231beb75f37b23d29babc29a92b5"
  },
  {
    "url": "/_nuxt/d91f85f9a90d8a72bf17.js",
    "revision": "366f0de62ab53efd6a1a5186d2cfcfa8"
  },
  {
    "url": "/_nuxt/f784feef630a8daac24a.js",
    "revision": "eedec4d6ed1cce1cfc3329b20ddd25c5"
  }
], {
  "cacheId": "thorduk91.github.io",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
