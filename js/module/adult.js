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
  var ECRANE = { cv: "cv/intro", scrisoare: "scrisoare/intro", interviu: "interviu/hub" };
  function stare(p) {
    if (!ECRANE[p]) return '<span class="stare">○ în pregătire</span>';
    if (p === "cv" && S.ia("cv.verificat", false)) return '<span class="stare gata">✓ verificat</span>';
    if (p === "scrisoare" && S.ia("scrisoare.gata", false)) return '<span class="stare gata">✓ schelet făcut</span>';
    if (p === "interviu" && C.module.interviu && C.module.interviu.nrPovesti() >= 3) return '<span class="stare gata">✓ povești scrise</span>';
    return '<span class="stare">○ de făcut</span>';
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
      return C.buton("<strong>" + (i + 1) + ". " + esc(D.pasi[p].t) + "</strong>" + stare(p), "nav", ECRANE[p] || "adult/pas/" + p, "lista");
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
    situatia: situatia
  });
})(typeof window !== "undefined" ? window : globalThis);
