/* Subagent 11: pregătirea pentru interviu (doar pentru adulți).
   Poveștile din experiență, întrebări de exersat pe grupe, sfaturi practice și un prompt pentru o simulare cu IA. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.interviu, esc = C.esc;

  function poveste(n) { return S.ia("interviu.p.p" + n, {}) || {}; }
  function titluPoveste(n) { var p = poveste(n); return String(p.titlu || "").trim(); }
  function areContinut(n) { var p = poveste(n); return D.povesti.campuri.some(function (c) { return String(p[c.id] || "").trim(); }); }
  function nrPovesti() { var k = 0; for (var n = 1; n <= D.povesti.maxim; n++) if (areContinut(n)) k++; return k; }

  /* Întrebarea în plus pentru situația sau vârsta omului. */
  function speciale() {
    var sp = D.speciale, l = [], sit = S.ia("situatie", "");
    if (sp[sit]) l.push(sp[sit]);
    if (S.ia("varsta", "") === "45+") l.push(sp.accent45);
    return l;
  }

  function hub() {
    var n = nrPovesti(), sp = speciale();
    var corp = "<p>" + esc(D.intro) + "</p>" +
      '<div class="meniu-lista">' +
      C.buton("<strong>1. " + esc(D.povesti.titlu) + '</strong><span class="stare' + (n >= 3 ? ' gata">✓ ' : '">○ ') + n + " din " + D.povesti.maxim + " scrise</span>", "nav", "interviu/povesti", "lista") +
      D.grupe.map(function (gr, i) {
        var raspunse = gr.intrebari.filter(function (q) { return String(S.ia("interviu.r." + q.id, "")).trim(); }).length;
        return C.buton("<strong>" + (i + 2) + ". " + esc(gr.t) + '</strong><span class="stare">' + raspunse + " din " + gr.intrebari.length + " exersate</span>", "nav", "interviu/grup/" + gr.id, "lista");
      }).join("") +
      (sp.length ? C.buton("<strong>" + (D.grupe.length + 2) + ". " + esc(D.speciale.titlu) + '</strong><span class="stare">' + sp.length + (sp.length === 1 ? " întrebare" : " întrebări") + "</span>", "nav", "interviu/grup/special", "lista") : "") +
      C.buton("<strong>" + (D.grupe.length + 2 + (sp.length ? 1 : 0)) + ". " + esc(D.exersez.titlu) + '</strong><span class="stare">filmare, ce să nu spui, simulare cu IA</span>', "nav", "interviu/exersez", "lista") +
      "</div>";
    return C.pagina(D.titlu, corp, "adult/meniu");
  }

  function povesti() {
    var P = D.povesti, corp = "<p>" + esc(P.explica) + "</p>" + '<p class="termen">' + esc(P.atentie) + "</p>" + '<div class="meniu-lista">';
    for (var n = 1; n <= P.maxim; n++) {
      var t = titluPoveste(n), plin = areContinut(n);
      corp += C.buton("<strong>Povestea " + n + "</strong>" +
        '<span class="stare' + (plin ? ' gata">✓ ' + esc(t || "fără titlu") : '">○ ' + esc(P.goala)) + "</span>", "nav", "interviu/poveste/" + n, "lista");
    }
    corp += "</div>" + '<div class="rand">' + C.buton("Înapoi la interviu", "nav", "interviu/hub", "primar") + "</div>";
    return C.pagina(P.titlu, corp, "interviu/hub");
  }

  function povesteEcran(n) {
    var P = D.povesti;
    var corp = '<p class="mic">Povestea ' + n + " din " + P.maxim + "</p>" +
      P.campuri.map(function (c) { return C.camp("interviu.p.p" + n + "." + c.id, esc(c.t), esc(c.ajutor), c.randuri); }).join("") +
      '<div class="rand">' + C.buton("Înapoi la povești", "nav", "interviu/povesti") +
      (n < P.maxim ? C.buton("Povestea următoare", "nav", "interviu/poveste/" + (n + 1), "continua") : "") + "</div>";
    return C.pagina(P.titlu, corp, "interviu/povesti");
  }

  function grup(id) {
    var gr = id === "special" ? { t: D.speciale.titlu, intrebari: speciale() } : D.grupe.filter(function (x) { return x.id === id; })[0];
    if (!gr || !gr.intrebari.length) return hub();
    var titluri = []; for (var n = 1; n <= D.povesti.maxim; n++) if (titluPoveste(n)) titluri.push(titluPoveste(n));
    var corp = (titluri.length ? '<p class="mic"><strong>' + esc(D.povestileTale) + "</strong> " + titluri.map(esc).join(" · ") + "</p>" : "") +
      gr.intrebari.map(function (q) {
        return '<section class="card"><h2>' + esc(q.q) + "</h2>" + C.camp("interviu.r." + q.id, esc(D.raspuns), esc(q.ajutor), 4) + "</section>";
      }).join("") +
      '<div class="rand">' + C.buton("Înapoi la interviu", "nav", "interviu/hub", "primar") + "</div>";
    return C.pagina(gr.t, corp, "interviu/hub");
  }

  /* Calcul pur: promptul pentru o simulare de interviu cu IA. Nu conține date despre om, în afară de post și situație. */
  function promptIA(post, situatie) {
    var P = D.exersez.ia.prompt, p = String(post || "").trim().replace(/[\s.!;,]+$/, "");
    var l = [P.inceput.split("{post}").join(p || P.postGol)];
    if (situatie && P.situatii[situatie]) l.push(P.situatii[situatie]);
    l.push("", "Reguli:");
    P.reguli.forEach(function (x) { l.push("- " + x); });
    return l.join("\n");
  }

  function exersez() {
    var E = D.exersez, lista = function (x) { return "<ul>" + x.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"; };
    var K = E.calm;
    var corp = '<section class="card stil-asertiv"><h2>' + esc(K.titlu) + "</h2><p>" + esc(K.explica) + "</p>" +
      K.sfaturi.map(function (x) { return '<h2 class="intrebare-titlu">' + esc(x.t) + "</h2><p>" + esc(x.d) + "</p>"; }).join("") +
      "<p>" + esc(K.miscare) + '</p><p class="mic">' + esc(K.incearca) + "</p></section>" +
      (C.module.exercitii ? C.module.exercitii.cartela("interviu") : "") +
      '<section class="card"><h2>' + esc(E.filmare.titlu) + "</h2>" + E.filmare.text.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</section>" +
      '<section class="card"><h2>' + esc(E.tipuri.titlu) + "</h2>" + lista(E.tipuri.lista) + "</section>" +
      '<section class="card"><h2>' + esc(E.nu.titlu) + "</h2>" + lista(E.nu.lista) + "</section>" +
      '<section class="card"><h2>' + esc(E.tu.titlu) + "</h2><p>" + esc(E.tu.explica) + "</p>" + lista(E.tu.lista) + "</section>" +
      '<section class="card"><h2>' + esc(E.ia.titlu) + "</h2><p>" + esc(E.ia.explica) + "</p></section>" + C.ghidIA() + '<section class="card">' +
      '<p class="alerta"><strong>Atenție:</strong> ' + esc(E.ia.atentie) + "</p>" + C.folosireIA() +
      '<div class="camp"><label for="c-prompt-interviu">Promptul de copiat</label>' +
      '<textarea id="c-prompt-interviu" rows="10" readonly>' + C.escSimplu(promptIA(S.ia("scrisoare.r.post", ""), S.ia("situatie", ""))) + "</textarea></div>" +
      '<div class="rand">' + C.buton("Copiază", "interviu.copiaza", null, "continua") + "</div>" +
      '<p id="stare-copiere-interviu" class="mic" role="status"></p></section>' +
      C.retine("interviu") +
      '<div class="rand">' + C.buton("Înapoi la interviu", "nav", "interviu/hub", "primar") + "</div>";
    return C.pagina(E.titlu, corp, "interviu/hub");
  }

  C.reg("interviu", {
    ecran: function (sub) {
      if (sub === "povesti") return povesti();
      var m = /^poveste\/(\d)$/.exec(sub || "");
      if (m && Number(m[1]) >= 1 && Number(m[1]) <= D.povesti.maxim) return povesteEcran(Number(m[1]));
      var gm = /^grup\/([a-z]+)$/.exec(sub || "");
      if (gm) return grup(gm[1]);
      if (sub === "exersez") return exersez();
      return hub();
    },
    actiuni: {
      copiaza: function () { C.copiaza("c-prompt-interviu", "stare-copiere-interviu", D.exersez.ia.copiat, D.exersez.ia.selectat); return false; }
    },
    promptIA: promptIA,
    nrPovesti: nrPovesti
  });
})(typeof window !== "undefined" ? window : globalThis);
