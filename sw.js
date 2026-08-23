'use strict';
var CACHE_NAME='letters-camp-control-v2';
var APP_SHELL=['./','./index.html','./legacy-goods.html','./manifest.webmanifest','./assets/icon.svg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(APP_SHELL)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE_NAME}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(function(cached){return cached||fetch(e.request).then(function(r){if(r&&r.status===200&&r.type!=='opaque'){var copy=r.clone();caches.open(CACHE_NAME).then(function(c){c.put(e.request,copy)})}return r}).catch(function(){return caches.match('./index.html')})}))});
