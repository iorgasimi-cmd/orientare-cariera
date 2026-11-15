/* „Ce iei cu tine în noul domeniu” (pentru adulți): matricea competențelor și analiza anunțurilor (curs, cap. 1.4),
   competențele care se transferă (cap. 3.2). Omul scrie ce are, lipește cerințele din anunțuri și bifează ce are deja. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.competente, esc = C.esc;

  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/^\s*([•\-*–●▪◦·]|\d+[.)])\s*/, "").replace(/[\s.;,:!]+$/, "").replace(/\s+/g, " ").trim();
  }
  function linii(t) {
    return String(t || "").split(/\r?\n/).map(function (l) { return l.replace(/^\s*([•\-*–●▪◦·]|\d+[.)])\s*/, "").trim(); }).filter(Boolean);
  }

  /* Calcul pur: cerințele unice, cu de câte ori apar, cele repetate primele. */
  function cerinte(textB) {
    var harta = {}, ordine = [];
    linii(textB).forEach(function (l) {
      var k = norm(l);
      if (!k) return;
      if (!harta[k]) { harta[k] = { cheie: k, text: l, n: 0 }; ordine.push(k); }
      harta[k].n++;
    });
    return ordine.map(function (k, i) { var x = harta[k]; x.i = i; return x; })
      .sort(function (a, b) { return b.n - a.n || a.i - b.i; });
  }

  /* Calcul pur: concluzia, după regulile din curs (cap. 1.4). */
  function concluzie(textA, textB, bifate) {
    var lista = cerinte(textB), am = bifate || [];
    var ai = lista.filter(function (c) { return am.indexOf(c.cheie) >= 0; });
    var lipsa = lista.filter(function (c) { return am.indexOf(c.cheie) < 0; });
    var experienta = lipsa.some(function (c) { return /experient|\bani\b|vechime/.test(c.cheie); });
    return { iei: linii(textA), ai: ai, lipsa: lipsa, experienta: experienta, invatare: lipsa.length > 0, promovare: lista.length > 0 && lipsa.length === 0 };
  }

  function bifate() { return S.ia("competente.am", []) || []; }

  function intro() {
    var corp = D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<ol class="pasi">' + D.pasi.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>" +
      '<div class="rand">' + C.buton("Începem", "nav", "competente/a", "primar") + "</div>";
    return C.pagina(D.titlu, corp, "adult/meniu");
  }

  function pasA() {
    var corp = '<p class="mic">Pasul 1 din 3 · ' + esc(D.a.eticheta) + "</p>" + C.camp("competente.a", esc(D.a.intrebare), esc(D.a.ajutor), 8) +
      '<div class="rand">' + C.buton("Înapoi", "nav", "competente/intro") + C.buton("Continuă", "nav", "competente/b", "continua") + "</div>";
    return C.pagina(D.titlu, corp, "competente/intro");
  }

  function pasB() {
    var corp = '<p class="mic">Pasul 2 din 3 · ' + esc(D.b.eticheta) + "</p>" + C.camp("competente.b", esc(D.b.intrebare), esc(D.b.ajutor), 10) +
      '<div class="rand">' + C.buton("Înapoi", "nav", "competente/a") + C.buton("Continuă", "nav", "competente/tabel", "continua") + "</div>";
    return C.pagina(D.titlu, corp, "competente/a");
  }

  function tabel() {
    var T = D.tabel, lista = cerinte(S.ia("competente.b", "")), am = bifate();
    var corp = '<p class="mic">Pasul 3 din 3</p><p>' + esc(T.explica) + "</p>";
    if (!lista.length) corp += "<p>" + esc(T.gol) + "</p>";
    lista.forEach(function (c) {
      corp += '<label class="val"><input type="checkbox" data-chg="competente.comuta" value="' + esc(c.cheie) + '"' + (am.indexOf(c.cheie) >= 0 ? " checked" : "") +
        "><span><strong>" + esc(c.text) + "</strong>" + (c.n > 1 ? "<small>↻ " + esc(T.apare.replace("{n}", c.n)) + "</small>" : "") + "</span></label>";
    });
    corp += '<div class="rand">' + C.buton("Înapoi", "nav", "competente/b") + C.buton("Văd ce reiese", "competente.gata", null, "primar") + "</div>";
    return C.pagina(T.titlu, corp, "competente/b");
  }

  function concluzieEcran() {
    var K = D.concluzie, r = concluzie(S.ia("competente.a", ""), S.ia("competente.b", ""), bifate());
    var lista = function (x, f) { return x.length ? "<ul>" + x.map(f).join("") + "</ul>" : "<p>" + esc(K.nimic) + "</p>"; };
    var corp = '<section class="card"><h2>' + esc(K.iei) + "</h2>" + lista(r.iei, function (t) { return "<li>" + esc(t) + "</li>"; }) + "</section>" +
      '<section class="card"><h2>' + esc(K.ai) + "</h2>" + lista(r.ai, function (c) { return "<li>✓ " + esc(c.text) + "</li>"; }) + "</section>" +
      '<section class="card"><h2>' + esc(K.lipsa) + "</h2>" + lista(r.lipsa, function (c) { return "<li>○ " + esc(c.text) + (c.n > 1 ? " <strong>(" + esc(K.repetat) + ")</strong>" : "") + "</li>"; }) + "</section>";
    if (r.invatare) corp += "<p>" + esc(K.invatare) + "</p>";
    if (r.experienta) corp += "<p>" + esc(K.experienta) + "</p>";
    if (r.promovare) corp += "<p>" + esc(K.promovare) + "</p>";
    corp += '<p class="termen">' + esc(K.transfer) + "</p>";
    var u = C.module.adult && C.module.adult.urmator("competente");
    corp += '<div class="rand">' + C.buton("Schimb listele", "nav", "competente/a") +
      (u ? C.buton("Continuă: " + esc(u.t), "nav", u.ecran, "continua") : C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar")) + "</div>";
    return C.pagina(K.titlu, corp, "adult/meniu");
  }

  C.reg("competente", {
    ecran: function (sub) {
      return ({ a: pasA, b: pasB, tabel: tabel, concluzie: concluzieEcran })[sub] ? ({ a: pasA, b: pasB, tabel: tabel, concluzie: concluzieEcran })[sub]() : intro();
    },
    actiuni: {
      comuta: function (cheie, el) {
        var l = bifate().slice(), i = l.indexOf(cheie);
        if (el.checked && i < 0) l.push(cheie);
        if (!el.checked && i >= 0) l.splice(i, 1);
        S.pune("competente.am", l);
        return false;
      },
      gata: function () { S.pune("competente.gata", true); C.mergi("competente/concluzie"); }
    },
    cerinte: cerinte,
    concluzie: concluzie
  });
})(typeof window !== "undefined" ? window : globalThis);
