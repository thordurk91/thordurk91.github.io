importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/46199d31a6b8e5177478.js",
    "revision": "ed7e51da9d41bcbfc44761e376297a7a"
  },
  {
    "url": "/_nuxt/5f78f7ba8f4b645114d3.js",
    "revision": "2f89c1c2086d0ee21bfff3fb1b634f1b"
  },
  {
    "url": "/_nuxt/a32f9d7adeca7f749134.js",
    "revision": "4f2d7aa8b3609ec543ed136d392ca165"
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
    "url": "/_nuxt/e6ba520dd460f5974744.js",
    "revision": "447e33e43de23d6329f13b047adeade3"
  },
  {
    "url": "/_nuxt/f784feef630a8daac24a.js",
    "revision": "eedec4d6ed1cce1cfc3329b20ddd25c5"
  }
], {
  "cacheId": "hundaio",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
