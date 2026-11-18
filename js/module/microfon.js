/* „Cum pornești microfonul”: aplicația ghicește telefonul (după numele trimis de browser) și arată întâi pașii lui. */
(function (g) {
  "use strict";
  var C = g.Cariera, esc = C.esc, D = g.DATE.microfon;
  var deUnde = ""; /* ecranul cu câmpul de scris, ca omul să se întoarcă exact acolo */

  /* Calcul pur: din textul care descrie browserul, ce fel de telefon pare să fie. */
  function platforma(ua) {
    ua = String(ua || "");
    if (/iPhone|iPad|iPod/.test(ua)) return "ios";
    if (/SamsungBrowser|SM-[A-Z0-9]/.test(ua)) return "samsung";
    if (/Android/.test(ua)) return "android";
    return "";
  }
  function pasi(k) {
    var T = D.telefoane[k];
    return '<section class="card"><h2>' + esc(T.t) + '</h2><ol class="pasi">' + T.pasi.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol></section>";
  }
  function ecran() {
    var p = platforma(g.navigator && g.navigator.userAgent), altele = ["ios", "samsung", "android"].filter(function (k) { return k !== p; });
    var corp = "<p>" + esc(D.intro) + "</p>" +
      (p ? '<p class="mic">' + esc(D.alTau) + " <strong>" + esc(D.telefoane[p].t) + "</strong></p>" + pasi(p) +
        "<details><summary>" + esc(D.altele) + "</summary>" + altele.map(pasi).join("") + "</details>"
        : altele.map(pasi).join("")) +
      '<p class="termen">' + esc(D.cauta) + "</p>" +
      '<p class="mic">' + esc(D.voce) + "</p>" +
      "<p>" + esc(D.incearca) + "</p>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", deUnde || C.acasa(), "primar") + "</div>";
    return C.pagina(D.titlu, corp, deUnde || C.acasa());
  }

  C.reg("microfon", {
    ecran: function () { return ecran(); },
    actiuni: { deschide: function () { deUnde = C.ecran && C.ecran.indexOf("microfon/") !== 0 ? C.ecran : deUnde; C.mergi("microfon/tot"); } },
    platforma: platforma
  });
})(typeof window !== "undefined" ? window : globalThis);
