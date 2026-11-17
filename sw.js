/* Service worker: păstrează fișierele aplicației pe telefon, ca să meargă fără internet.
   Nu face cereri către alte site-uri și nu salvează date personale. */
var VERSIUNE = "cariera-v23";
var FISIERE = [
  "./", "index.html", "manifest.webmanifest", "css/culori.css", "css/stil.css",
  "date/interese.js", "date/valori.js", "date/meserii.js", "date/sfaturi.js", "date/adulti.js", "date/cv.js", "date/scrisoare.js", "date/interviu.js", "date/competente.js", "date/asertiv.js", "date/exercitii.js", "date/ia.js", "date/valori_personale.js", "date/corp.js", "date/cerinte.js", "date/roata.js", "date/negociere.js",
  "js/stocare.js", "js/verificator.js", "js/nucleu.js", "js/app.js",
  "js/module/interese.js", "js/module/puncte-forte.js", "js/module/meserii.js",
  "js/module/plan.js", "js/module/sfaturi.js", "js/module/reamintiri.js", "js/module/sistem.js", "js/module/adult.js", "js/module/cv.js", "js/module/scrisoare.js", "js/module/interviu.js", "js/module/competente.js", "js/module/asertiv.js", "js/module/exercitii.js", "js/module/valorile.js", "js/module/corp.js", "js/module/cerinte.js", "js/module/roata.js", "js/module/negociere.js",
  "icons/icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSIUNE).then(function (c) { return c.addAll(FISIERE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (chei) {
    return Promise.all(chei.filter(function (k) { return k !== VERSIUNE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});
