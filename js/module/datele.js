/* „Datele tale: ce spui și ce nu spui”: sfaturi simple despre datele personale (angajare, voluntariat, cursuri, păcăleli, drepturi).
   Elevii primesc varianta lor la partea despre primul loc de muncă și un rând despre vârstă la voluntariat. */
(function (g) {
  "use strict";
  var C = g.Cariera, esc = C.esc, D = g.DATE.datele;

  function ecran() {
    var adult = C.eAdult();
    var corp = "<p>" + esc(D.intro) + "</p>" + D.parti.filter(function (p) {
      return !(p.doarAdult && !adult) && !(p.doarElev && adult);
    }).map(function (p) {
      return '<section class="card"><h2>' + esc(p.t) + "</h2>" + p.r.map(function (r) {
        if (r && r.lista) return "<ul>" + r.lista.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
        if (typeof r === "object") return adult ? "" : "<p>" + esc(r.elev) + "</p>";
        return "<p>" + esc(r) + "</p>";
      }).join("") + "</section>";
    }).join("") +
      '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar") + "</div>";
    return C.pagina(D.titlu, corp, C.acasa());
  }

  /* Butonul care deschide ecranul, pus în CV, în Sfaturi și la „Despre date”. */
  C.butonDatele = function (cls) { return '<div class="rand">' + C.buton(esc(D.buton), "nav", "datele/tot", cls || "") + "</div>"; };

  C.reg("datele", { ecran: function () { return ecran(); }, actiuni: {} });
})(typeof window !== "undefined" ? window : globalThis);
