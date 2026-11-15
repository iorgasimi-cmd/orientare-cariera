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

  /* ---- Modelul în patru părți: Când… / Mă simt… / Pentru că… / Aș vrea… ---- */
  function norm(t) { return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
  /* Scoate cuvintele de început dacă omul le-a scris și el, și punctuația de la sfârșit. */
  function curata(t, inceput) {
    var x = String(t || "").trim().replace(/\s+/g, " ").replace(/[\s.,;:!]+$/, "");
    var n = norm(x), i = norm(inceput);
    if (i && n.indexOf(i + " ") === 0) x = x.slice(inceput.length).trim();
    else if (i === "ma simt" && n.indexOf("simt ") === 0) x = x.slice(5).trim();
    else if (i === "propun sa" && n.indexOf("propun ") === 0) x = x.slice(7).trim();
    if (i === "propun sa" && norm(x).indexOf("sa ") === 0) x = x.slice(3).trim();
    return x;
  }
  function primaMica(t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t; }

  /* Calcul pur: fraza întreagă și ce e de îmbunătățit. */
  function verificaModel(r) {
    var M = D.model, R = M.reguli, p = {}, lipsa = [], sfaturi = [], bine = [];
    M.parti.forEach(function (x) { p[x.id] = curata(r && r[x.id], x.inceput); if (!p[x.id]) lipsa.push(mesaj(M.lipsa, { parte: x.t.split("…")[0] + "…" })); });
    var fraza = lipsa.length ? "" : "Când " + primaMica(p.cand) + ", mă simt " + primaMica(p.simt) + ", pentru că " + primaMica(p.motiv) + ". Propun să " + primaMica(p.vreau) + ".";
    if (!lipsa.length) {
      var c = norm(p.cand), s = norm(p.simt), m = norm(p.motiv), v = norm(p.vreau), gasit;
      if ((gasit = c.match(/\b(lenes|lenesa|prost|proasta|incompetent|incompetenta|neserios|neserioasa|egoist|egoista|nesimtit|nesimtita|iresponsabil|iresponsabila|dezordonat|dezordonata)\b/))) sfaturi.push(mesaj(R.eticheta, { gasit: "„" + gasit[0] + "”" }));
      if ((gasit = c.match(/\b(mereu|niciodata|tot timpul|intotdeauna|de fiecare data)\b/))) sfaturi.push(mesaj(R.absolut, { gasit: gasit[0] }));
      if ((gasit = c.match(/\b(esti|sunteti)\b/))) sfaturi.push(mesaj(R.tuEsti, { gasit: gasit[0] }));
      if (/^ca\b|\bca tu\b|\bca voi\b|\bca dumneavoastra\b/.test(s)) sfaturi.push(R.simtCa);
      else if (/\b(tu|tine|voi|dumneavoastra|el|ea)\b/.test(s)) sfaturi.push(R.simtTu);
      else if (/\b(ingrijorat|frustrat|coplesit|nedreptatit|suparat|stresat|trist|nelinistit|nervos|dezamagit|nesigur|jenat|ranit|nemultumit|incurcat|obosit|neliniste|furios|ignorat|nepretuit|nevazut|presat|epuizat|neglijat|neinteles|confuz|tensionat)/.test(s)) bine.push(M.simtCunoscut);
      if ((gasit = m.match(/\b(tu esti|tu nu|din cauza ta|vina ta|ai gresit|nu iti pasa|nu va pasa|esti)\b/))) sfaturi.push(mesaj(R.motivVina, { gasit: "„" + gasit[0] + "”" }));
      if ((gasit = v.match(/\b(altfel|sau o sa|daca nu|o sa vezi|ma plang|plec)\b/))) sfaturi.push(mesaj(R.vreauAmenintare, { gasit: "„" + gasit[0] + "”" }));
      if ((gasit = v.match(/\b(te schimbi|fii altfel|fii mai bun|fii mai buna|te porti frumos|ma respecti|intelegi)\b/))) sfaturi.push(mesaj(R.vreauVag, { gasit: "„" + gasit[0] + "”" }));
      else if (/^nu mai\b/.test(v) && !/\b(ci|in schimb)\b/.test(v)) sfaturi.push(R.vreauNegativ);
    }
    return { fraza: fraza, lipsa: lipsa, sfaturi: sfaturi, bine: bine, asertiv: !lipsa.length && !sfaturi.length };
  }
  function mesaj(t, v) { Object.keys(v || {}).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }

  function modelHtml() {
    var M = D.model, r = S.ia("asertiv.model", {}) || {};
    var corp = '<section class="card stil-asertiv"><h2>' + esc(M.titlu) + "</h2><p>" + esc(M.explica) + '</p><p class="mic">' + esc(M.exemplu) + "</p></section>" +
      M.parti.map(function (x) { return C.camp("asertiv.model." + x.id, esc(x.t), esc(x.ajutor), 2); }).join("") +
      '<div class="rand">' + C.buton(esc(M.buton), "asertiv.verifica", null, "continua") + "</div>";
    if (S.ia("asertiv.modelVerificat", false)) {
      var v = verificaModel(r);
      corp += '<div id="rezultat-model">';
      if (v.lipsa.length) {
        corp += '<section class="card"><h2>' + esc(M.incomplet) + "</h2><ul>" + v.lipsa.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>";
      } else {
        corp += '<section class="card"><h2>' + esc(M.fraza) + '</h2><p class="citat">' + esc(v.fraza) + "</p></section>" +
          '<section class="card' + (v.asertiv ? " stil-asertiv" : "") + '"><h2>' + esc(v.asertiv ? M.bine : M.aproape) + "</h2>" +
          (v.bine.length ? "<p>" + v.bine.map(esc).join(" ") + "</p>" : "") +
          (v.sfaturi.length ? "<ul>" + v.sfaturi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
          '<p class="mic">' + esc(M.sfat) + "</p></section>";
      }
      corp += "</div>";
    }
    return corp;
  }

  function exercitiu() {
    var F = D.formula, X = D.exercitiu;
    var corp = '<section class="card"><h2>' + esc(F.titlu) + '</h2><ol class="pasi">' + F.pasi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol></section>" +
      '<section class="card"><h2>' + esc(D.corp.titlu) + "</h2>" + lista(D.corp.lista) + "</section>" +
      "<h2>" + esc(X.titlu) + "</h2>" +
      C.camp("asertiv." + X.campuri[0].id, esc(X.campuri[0].t), esc(X.campuri[0].ajutor), X.campuri[0].randuri) +
      modelHtml() +
      X.campuri.slice(1).map(function (c) { return C.camp("asertiv." + c.id, esc(c.t), esc(c.ajutor), c.randuri); }).join("") +
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
      gata: function (unde) { S.pune("asertiv.gata", true); C.mergi(unde || C.acasa()); },
      verifica: function () {
        /* textul e deja salvat la fiecare literă; ne asigurăm că și ultima literă a intrat */
        D.model.parti.forEach(function (x) {
          var el = g.document && g.document.getElementById("c-asertiv-model-" + x.id);
          if (el) S.pune("asertiv.model." + x.id, el.value);
        });
        S.pune("asertiv.modelVerificat", true);
        C.deArata = "rezultat-model";
      }
    },
    verificaModel: verificaModel
  });
})(typeof window !== "undefined" ? window : globalThis);
