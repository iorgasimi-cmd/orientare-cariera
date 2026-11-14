/* Subagent 7: sfaturi scurte pentru elevi, de citit în sub un minut, pe patru teme.
   Se potrivesc cu clasa: IX–X explorare, XI–XII alegerea unui prim pas. Nu spun elevului ce să aleagă. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.sfaturi, esc = C.esc;

  function sfaturiPentru(tema) {
    var grupe = C.grupa();
    return D.sfaturi.filter(function (s) { return s.tema === tema && grupe.indexOf(s.grupa) >= 0; });
  }

  function lista() {
    var clasa = S.ia("clasa", "");
    var corp = "<p>Sfaturi scurte, de citit în câteva secunde. Alege o temă.</p>" +
      (clasa === "9" || clasa === "10" ? '<p class="mic">' + esc(D.grupe.explorare) + "</p>" :
        clasa === "11" || clasa === "12" ? '<p class="mic">' + esc(D.grupe.alegere) + "</p>" : "");
    corp += '<div class="meniu-lista">';
    D.teme.forEach(function (t) {
      corp += C.buton("<strong>" + esc(t.titlu) + "</strong>", "nav", "sfaturi/" + t.id, "lista");
    });
    corp += "</div>";
    return C.pagina("Sfaturi", corp);
  }

  function tema(id) {
    var t = D.teme.filter(function (x) { return x.id === id; })[0];
    if (!t) return lista();
    var corp = sfaturiPentru(id).map(function (s) { return '<section class="card"><p>' + esc(s.t) + "</p></section>"; }).join("");
    corp += '<div class="rand">' + C.buton("Alte teme", "nav", "sfaturi/lista", "primar") + "</div>";
    return C.pagina(t.titlu, corp, "sfaturi/lista");
  }

  C.reg("sfaturi", {
    ecran: function (sub) { return !sub || sub === "lista" ? lista() : tema(sub); },
    actiuni: {},
    sfaturiPentru: sfaturiPentru
  });
})(typeof window !== "undefined" ? window : globalThis);
