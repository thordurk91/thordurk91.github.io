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
    "url": "/_nuxt/a9069e418748274e13f1.js",
    "revision": "fc2a8caefa8d5ab5746954a531c943f8"
  },
  {
    "url": "/_nuxt/c78dc612f95769158acb.js",
    "revision": "b35e2a4f60960c957dd3da4b0d7d6f03"
  },
  {
    "url": "/_nuxt/cc96301f94d4ea55e822.js",
    "revision": "28fb06e6b140582ac582cccebbec9b2f"
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
  "cacheId": "hundaio",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
