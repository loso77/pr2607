const CACHE='pr2607-v3';
const FILES=['./index.html'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  // SheetJS CDN 走网络，其余走缓存优先
  if(e.request.url.includes('cdn.jsdelivr.net')){return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
