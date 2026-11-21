/* „Ce cer angajatorii acum”: tendințe din 2026, fiecare cu un pas mic și un buton spre locul din aplicație unde îl faci.
   Elevii au varianta lor, cu exemple de la școală. Datele sunt în date/cerinte.js.
   Câte o idee pe ecran: introducerea, apoi fiecare tendință, apoi ideea de reținut. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.cerinte;

  function urmator() { return C.eAdult() && C.module.adult ? C.module.adult.urmator("cerinte") : null; }
  function varianta() { return C.eAdult() ? D.adult : D.elev; }
  function pasi(V) { return ["intro"].concat(V.lista.map(function (x, i) { return "item" + i; }), ["retine1", "retine2", "retine3"]); }

  function ecran(sub) {
    var V = varianta(), PASI = pasi(V);
    var i = PASI.indexOf(sub || "intro"); if (i < 0) i = 0;
    var pas = PASI[i];
    var inapoi = i === 0 ? C.acasa() : "cerinte/lista/" + PASI[i - 1];
    var urm = i < PASI.length - 1 ? "cerinte/lista/" + PASI[i + 1] : null;
    var corp, titlu = D.titlu;
    var mItem = /^item(\d+)$/.exec(pas);
    if (pas === "intro") {
      corp = (C.butonLectie ? C.butonLectie("cerinte") : "") + "<p>" + esc(V.intro) + "</p>";
    } else if (mItem) {
      var x = V.lista[Number(mItem[1])];
      titlu = x.t;
      corp = '<p class="mic">' + (Number(mItem[1]) + 1) + " din " + V.lista.length + "</p>" +
        "<p>" + esc(x.ce) + '</p><p class="idee">' + esc(x.pas) + "</p>" +
        '<div class="rand">' + C.buton(esc(x.buton), "nav", x.link) + "</div>";
    } else if (pas === "retine1") {
      /* Bula lui Faro și legătura ColorPsi, dacă e cazul. */
      corp = (C.retineBula ? C.retineBula() : "") + (C.retineColorpsi ? C.retineColorpsi("cerinte") : "");
    } else if (pas === "retine2") {
      /* Ideea de reținut, scrisă cu cuvintele tale. */
      corp = C.retineIdee ? C.retineIdee("cerinte") : "";
    } else {
      /* Ultimul pas: pasul tău și butonul „Mai departe”. */
      corp = C.retinePas ? C.retinePas("cerinte") : "";
      var un = urmator();
      corp += '<div class="rand">' + C.buton("Înapoi", "nav", inapoi) +
        C.buton(un ? "Mai departe: " + esc(un.t) : esc(D.gata), "cerinte.gata", un ? un.ecran : null, "primar") + "</div>";
      return C.pagina(titlu, corp, inapoi, true);
    }
    corp += '<div class="rand">' + C.buton("Înapoi", "nav", inapoi) + (urm ? C.buton("Continuă", "nav", urm, "continua") : "") + "</div>";
    return C.pagina(titlu, corp, inapoi, true);
  }

  C.reg("cerinte", {
    ecran: function (sub) {
      var m = /^lista(?:\/(.+))?$/.exec(sub || "lista");
      return ecran(m ? m[1] : "");
    },
    actiuni: {
      gata: function (unde) {
        S.pune("cerinte.gata", true);
        C.mergi(unde || C.acasa());
      }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
