/* Comunicarea asertivă: ce este, ce câștigi, cele patru stiluri, cinci exemple din viața profesională
   (pasiv, agresiv, asertiv), o formulă în trei pași și un exercițiu (curs, cap. 2 și 7.2). */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.asertiv, esc = C.esc;
  var N = D.exemple.length;

  function lista(x) { return "<ul>" + x.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"; }

  function intro() {
    var corp = '<p class="citat">' + esc(D.ce) + "</p>" +
      '<section class="card"><h2>' + esc(D.castig.titlu) + "</h2>" + lista(D.castig.lista) + "</section>" +
      "<h2>" + esc(D.stiluri.titlu) + "</h2>" +
      D.stiluri.lista.map(function (s) {
        var bun = s.nume === "Asertiv";
        return '<section class="card' + (bun ? " stil-asertiv" : "") + '"><h2>' + (bun ? "✓ " : "") + esc(s.nume) + "</h2>" +
          '<p class="mic">' + esc(s.motto) + "</p><p>" + esc(s.text) + '</p><p class="citat">' + esc(s.ex) + "</p></section>";
      }).join("") +
      '<div class="rand">' + C.buton("Văd 5 exemple", "nav", "asertiv/exemplu/1", "continua") + "</div>" +
      (C.module.exercitii ? C.module.exercitii.cartela("asertiv") : "");
    return C.pagina(D.titlu, corp, C.acasa());
  }

  function exemplu(n) {
    var e = D.exemple[n - 1], E = D.etichete;
    var corp = '<p class="mic">Exemplul ' + n + " din " + N + "</p>" +
      '<section class="card"><h2>' + esc(E.situatie) + "</h2><p>" + esc(e.situatie) + "</p></section>" +
      '<section class="card varianta"><h2>✗ ' + esc(E.pasiv) + "</h2><p>" + esc(e.pasiv) + "</p></section>" +
      '<section class="card varianta"><h2>✗ ' + esc(E.agresiv) + "</h2><p>" + esc(e.agresiv) + "</p></section>" +
      '<section class="card stil-asertiv"><h2>✓ ' + esc(E.asertiv) + '</h2><p class="citat">' + esc(e.asertiv) + "</p>" +
      '<p class="mic"><strong>' + esc(E.bine) + ":</strong> " + esc(e.bine) + "</p></section>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", n === 1 ? "asertiv/intro" : "asertiv/exemplu/" + (n - 1)) +
      C.buton(n < N ? "Continuă" : "Continuă: încearcă tu", "nav", n < N ? "asertiv/exemplu/" + (n + 1) : "asertiv/exercitiu", "continua") + "</div>";
    return C.pagina(e.titlu, corp, "asertiv/intro");
  }

  function exercitiu() {
    var F = D.formula, X = D.exercitiu;
    var corp = '<section class="card"><h2>' + esc(F.titlu) + '</h2><ol class="pasi">' + F.pasi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol></section>" +
      '<section class="card"><h2>' + esc(D.corp.titlu) + "</h2>" + lista(D.corp.lista) + "</section>" +
      "<h2>" + esc(X.titlu) + "</h2>" +
      X.campuri.map(function (c) { return C.camp("asertiv." + c.id, esc(c.t), esc(c.ajutor), c.randuri); }).join("") +
      (C.module.exercitii ? C.module.exercitii.cartela("asertiv") : "");
    var u = C.eAdult() && C.module.adult ? C.module.adult.urmator("asertiv") : null;
    corp += '<div class="rand">' + C.buton("Înapoi la exemple", "nav", "asertiv/exemplu/" + N) +
      C.buton(u ? "Gata. Continuă: " + esc(u.t) : "Gata", "asertiv.gata", u ? u.ecran : C.acasa(), "primar") + "</div>";
    return C.pagina(X.titlu, corp, "asertiv/intro");
  }

  C.reg("asertiv", {
    ecran: function (sub) {
      var m = /^exemplu\/(\d)$/.exec(sub || "");
      if (m && Number(m[1]) >= 1 && Number(m[1]) <= N) return exemplu(Number(m[1]));
      if (sub === "exercitiu") return exercitiu();
      return intro();
    },
    actiuni: {
      gata: function (unde) { S.pune("asertiv.gata", true); C.mergi(unde || C.acasa()); }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
