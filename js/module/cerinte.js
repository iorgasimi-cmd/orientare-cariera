/* „Ce cer angajatorii acum”: tendințe din 2026, fiecare cu un pas mic și un buton spre locul din aplicație unde îl faci.
   Elevii au varianta lor, cu exemple de la școală. Datele sunt în date/cerinte.js. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.cerinte;

  function urmator() { return C.eAdult() && C.module.adult ? C.module.adult.urmator("cerinte") : null; }

  function ecran() {
    var V = C.eAdult() ? D.adult : D.elev;
    var corp = (C.butonLectie ? C.butonLectie("cerinte") : "") + "<p>" + esc(V.intro) + "</p>" +
      V.lista.map(function (x) {
        return '<section class="card"><h2>' + esc(x.t) + "</h2><p>" + esc(x.ce) + '</p>' +
          '<p class="idee">' + esc(x.pas) + "</p>" +
          '<div class="rand">' + C.buton(esc(x.buton), "nav", x.link) + "</div></section>";
      }).join("") +
      C.retine("cerinte") +
      '<div class="rand">' + C.buton(esc(D.gata), "cerinte.gata", null, "continua") + "</div>";
    return C.pagina(D.titlu, corp, C.acasa());
  }

  C.reg("cerinte", {
    ecran: function () { return ecran(); },
    actiuni: {
      gata: function () {
        S.pune("cerinte.gata", true);
        var u = urmator();
        C.mergi(u ? u.ecran : C.acasa());
      }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
