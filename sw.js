var CACHE = "capfinder-v2";
var SHELL = ["/cap-finder.html", "/styles.css", "/manifest.webmanifest",
  "/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png", "/favicon.png"];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ return k !== CACHE ? caches.delete(k) : null; }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    // Network-first for pages: content updates always win, cache is the offline fallback.
    e.respondWith(fetch(req).then(function(r){
      var copy = r.clone();
      caches.open(CACHE).then(function(c){ c.put(req, copy); });
      return r;
    }).catch(function(){ return caches.match(req); }));
    return;
  }
  e.respondWith(caches.match(req).then(function(hit){
    return hit || fetch(req).then(function(r){
      var copy = r.clone();
      caches.open(CACHE).then(function(c){ c.put(req, copy); });
      return r;
    });
  }));
});
