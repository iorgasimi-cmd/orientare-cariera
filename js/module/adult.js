/* Traseul pentru adulți: a doua întrebare (situația), ecranul de bun venit și meniul cu pașii.
   Pașii (CV, scrisoare, interviu și ceilalți) se construiesc pe rând; până atunci apar ca „în pregătire". */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.adulti, esc = C.esc;

  function situatia() {
    var id = S.ia("situatie", "");
    return D.situatii.filter(function (s) { return s.id === id; })[0] || null;
  }
  function e45() { return S.ia("varsta", "") === "45+"; }
  /* Pașii deja construiți și ecranul lor; ceilalți apar „în pregătire”. */
  var ECRANE = {
    interese: function () { return S.ia("interese.top", null) ? "interese/rezultat" : "interese/intro"; },
    forte: function () { return (S.ia("forte.valori", []) || []).length >= 3 ? "forte/rezumat" : "forte/intro"; },
    competente: function () { return S.ia("competente.gata", false) ? "competente/concluzie" : "competente/intro"; },
    valori: function () { return S.ia("vp.gata", false) ? "valorile/rezultat" : "valorile/intro"; },
    stima: function () { return S.ia("stima.gata", false) ? "stima/rezultat" : "stima/intro"; },
    corp: "corp/intro",
    cerinte: "cerinte/lista",
    roata: function () { return S.ia("roata.gata", false) ? "roata/rezultat" : "roata/intro"; },
    cv: "cv/intro", scrisoare: "scrisoare/intro", asertiv: "asertiv/intro", interviu: "interviu/hub", negociere: "negociere/hub", plan: "plan/hub"
  };
  function ecranPas(p) { var e = ECRANE[p]; return typeof e === "function" ? e() : e; }
  /* Ce scrie în dreptul fiecărui pas: făcut (cu bifă) sau de făcut (cu cerc). */
  var GATA = {
    interese: function () { return S.ia("interese.top", null) ? "✓ făcut" : ""; },
    forte: function () { return (S.ia("forte.valori", []) || []).length >= 3 ? "✓ făcut" : ""; },
    competente: function () { return S.ia("competente.gata", false) ? "✓ făcut" : ""; },
    cv: function () { return S.ia("cv.verificat", false) ? "✓ verificat" : ""; },
    scrisoare: function () { return S.ia("scrisoare.gata", false) ? "✓ schelet făcut" : ""; },
    asertiv: function () { return S.ia("asertiv.gata", false) ? "✓ făcut" : ""; },
    valori: function () { return S.ia("vp.gata", false) ? "✓ făcut" : ""; },
    stima: function () { return S.ia("stima.gata", false) ? "✓ făcut" : ""; },
    corp: function () { return S.ia("corp.gata", false) ? "✓ exersat" : ""; },
    roata: function () { return S.ia("roata.gata", false) ? "✓ făcut" : ""; },
    cerinte: function () { return S.ia("cerinte.gata", false) ? "✓ citit" : ""; },
    negociere: function () { return S.ia("neg.gata", false) ? "✓ fișă făcută" : ""; },
    interviu: function () { return C.module.interviu && C.module.interviu.nrPovesti() >= 3 ? "✓ povești scrise" : ""; },
    plan: function () { return S.ia("plan.start", null) ? "✓ început" : ""; }
  };
  function stare(p) {
    if (!ECRANE[p]) return '<span class="stare">○ în pregătire</span>';
    var t = GATA[p] ? GATA[p]() : "";
    return t ? '<span class="stare gata">' + t + "</span>" : '<span class="stare">○ de făcut</span>';
  }
  /* Pasul de după `id` în traseul omului, ca exercițiile să ducă mai departe. */
  function urmator(id) {
    var s = situatia(); if (!s) return null;
    var i = s.pasi.indexOf(id), nx = i >= 0 ? s.pasi[i + 1] : null;
    return nx ? { id: nx, t: D.pasi[nx].t, ecran: ecranPas(nx) || "adult/pas/" + nx } : null;
  }

  function intrebare() {
    var ales = S.ia("situatie", "");
    var corp = "<p>Alege varianta care ți se potrivește cel mai bine acum. O poți schimba oricând din Setări.</p>" +
      '<div class="meniu-lista">' + D.situatii.map(function (s) {
        return C.buton("<strong>" + (ales === s.id ? "✓ " : "") + esc(s.t) + "</strong>" + (s.d ? '<span class="stare">' + esc(s.d) + "</span>" : ""),
          "adult.situatie", s.id, "lista mare" + (ales === s.id ? " salvat" : ""));
      }).join("") + "</div>";
    return C.pagina("Care e situația ta acum?", corp, "start");
  }

  function bunVenit() {
    var s = situatia();
    if (!s) return intrebare();
    var corp = "<p>" + esc(s.bun) + "</p>" + (e45() ? "<p>" + esc(D.accent45) + "</p>" : "") +
      "<p>Iată pașii tăi. Îi poți face în ordinea ta și te poți opri oricând.</p>" +
      '<ol class="pasi">' + s.pasi.map(function (p) { return "<li>" + esc(D.pasi[p].t) + "</li>"; }).join("") + "</ol>" +
      '<div class="rand">' + C.buton("Începem", "nav", "adult/meniu", "primar") + C.buton("Schimb răspunsurile", "nav", "start") + "</div>";
    return C.pagina("Bine ai venit!", corp, "adult/situatie");
  }

  function meniu() {
    var s = situatia();
    if (!s) return intrebare();
    var corp = '<div class="meniu-lista">' + s.pasi.map(function (p, i) {
      return C.buton("<strong>" + (i + 1) + ". " + esc(D.pasi[p].t) + "</strong>" + stare(p), "nav", ecranPas(p) || "adult/pas/" + p, "lista");
    }).join("") + "</div>" +
      '<p class="mic">Situația ta: <strong>' + esc(s.t) + "</strong></p>" +
      '<div class="rand">' + C.buton("Schimb situația", "nav", "adult/situatie") + "</div>";
    return C.pagina("Drumul tău", corp, null);
  }

  function pas(id) {
    var p = D.pasi[id];
    if (!p) return meniu();
    var corp = "<p>" + esc(p.d) + "</p>" +
      "<p>Acest pas se pregătește acum și va fi gata în curând.</p>" +
      '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar") + "</div>";
    return C.pagina(p.t, corp, "adult/meniu");
  }

  C.reg("adult", {
    ecran: function (sub) {
      if (sub === "situatie") return intrebare();
      if (sub === "bunvenit") return bunVenit();
      var m = /^pas\/([a-z]+)$/.exec(sub || "");
      if (m) return pas(m[1]);
      return meniu();
    },
    actiuni: {
      situatie: function (id) {
        if (!D.situatii.some(function (s) { return s.id === id; })) return;
        S.pune("situatie", id);
        C.mergi("adult/bunvenit");
      }
    },
    situatia: situatia,
    urmator: urmator
  });
})(typeof window !== "undefined" ? window : globalThis);
