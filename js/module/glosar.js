/* „Cuvinte de știut”: la fiecare ecran, aplicația caută cuvintele tehnice din text și pune jos explicațiile lor.
   Se uită doar la textul care se vede (nu la casetele cu prompturi de copiat). */
(function (g) {
  "use strict";
  var C = g.Cariera, esc = C.esc, D = g.DATE.glosar;
  var LIT = "A-Za-zĂÂÎȘȚăâîșț";
  var RE = D.cuvinte.map(function (w) { return new RegExp("(^|[^" + LIT + "])" + w.p, w.s ? "" : "i"); });

  /* Calcul pur: cuvintele din glosar care apar în textul unei pagini. */
  function gasite(html) {
    var t = String(html || "").replace(/<textarea[\s\S]*?<\/textarea>/g, " ").replace(/<[^>]+>/g, " ");
    var explicatIA = t.indexOf("IA înseamnă inteligență artificială") >= 0;
    return D.cuvinte.filter(function (w, i) {
      if (explicatIA && (w.t === "IA" || w.t === "Prompt")) return false;
      return RE[i].test(t);
    });
  }
  function cartela(l) {
    if (!l.length) return "";
    return '<section class="card glosar"><h2>' + esc(D.titlu) + "</h2><ul>" +
      l.map(function (w) { return "<li><strong>" + esc(w.t) + "</strong> – " + esc(w.d) + "</li>"; }).join("") + "</ul>" +
      (C.module.cauta && C.ecran.indexOf("cauta/") !== 0 ? '<div class="rand">' + C.buton(esc(D.afla), "nav", "cauta/intro", "mic-btn") + "</div>" : "") + "</section>";
  }

  /* Fiecare pagină primește, la final, cartela cu cuvintele ei. */
  var pagina = C.pagina;
  C.pagina = function (titlu, corp, inapoi, faraGlosar) {
    /* Pe ecranul principal nu apare: acolo sunt doar cardurile și bara lui Faro.
       Pe pașii mici dintr-un traseu (faraGlosar) nu apare din nou: a apărut deja pe ecranul de intrare. */
    var adauga = titlu !== "Drumul tău" && !faraGlosar;
    return pagina(titlu, corp + (adauga ? cartela(gasite(titlu + " " + corp)) : ""), inapoi, faraGlosar);
  };

  C.reg("glosar", { ecran: function () { return C.pagina(D.titlu, "", C.acasa()); }, actiuni: {}, gasite: gasite });
})(typeof window !== "undefined" ? window : globalThis);
