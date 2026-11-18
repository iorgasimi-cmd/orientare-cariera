/* Exerciții interactive pentru discuții: patru la comunicarea asertivă (complimentul, cererea cu motiv,
   glumă sau batjocură, argumentele nedrepte) și cinci la pregătirea pentru interviu (pauza de două secunde,
   încălzirea vocii, începutul și finalul, cuvintele firmei, două întrebări și o poveste).
   Totul se face local, pe telefon. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.exercitii, esc = C.esc;
  var ceas = null; /* cronometrul care merge acum (doar unul odată) */

  function norm(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }

  /* Exercițiile și unde se întorc. */
  var ASERTIV = [
    { id: "quiz/compliment", t: D.quiz.compliment.titlu },
    { id: "cerere", t: D.cerere.titlu },
    { id: "quiz/gluma", t: D.quiz.gluma.titlu },
    { id: "argumentez", t: D.argumentez.titlu }
  ];
  var INTERVIU = [
    { id: "pauza", t: D.pauza.titlu },
    { id: "voce", t: D.voce.titlu },
    { id: "capete", t: D.capete.titlu },
    { id: "cuvinte", t: D.cuvinte.titlu },
    { id: "intrebari", t: D.intrebari.titlu }
  ];
  function inapoiPentru(id) {
    return id === "quiz/argumente" || ASERTIV.some(function (x) { return x.id === id || id.indexOf(x.id) === 0; }) ? "asertiv/intro" : "interviu/exersez";
  }

  /* Cartela cu butoanele exercițiilor, pusă în alte ecrane. */
  function cartela(grup) {
    var G = grup === "asertiv" ? D.grupAsertiv : D.grupInterviu, lista = grup === "asertiv" ? ASERTIV : INTERVIU;
    return '<section class="card"><h2>' + esc(G.titlu) + "</h2><p>" + esc(G.explica) + '</p><div class="meniu-lista">' +
      lista.map(function (x) { return C.buton("<strong>" + esc(x.t) + "</strong>", "nav", "exercitii/" + x.id, "lista"); }).join("") + "</div></section>";
  }

  /* ---- Cronometru: actualizează doar bara și textul, fără să redeseneze pagina ---- */
  function cronometruHtml(id, sec) {
    return '<progress class="progres" id="' + id + '" max="' + sec + '" value="0" aria-label="Cronometru"></progress>' +
      '<p class="mic" id="' + id + '-t" role="status">' + sec + " " + esc(D.cronometru.din) + "</p>" +
      '<div class="rand">' + C.buton(esc(D.cronometru.porneste), "exercitii.cronometru", id + "|" + sec) + "</div>";
  }
  function pornesteCeas(id, sec, laSfarsit, textMers) {
    var doc = g.document; if (!doc) return;
    if (ceas) g.clearInterval(ceas);
    var start = Date.now();
    ceas = g.setInterval(function () {
      var bara = doc.getElementById(id), txt = doc.getElementById(id + "-t");
      if (!bara) { g.clearInterval(ceas); ceas = null; return; } /* omul a plecat de pe ecran */
      var trecut = Math.min((Date.now() - start) / 1000, sec);
      bara.value = trecut;
      if (txt) txt.textContent = textMers ? textMers : Math.ceil(sec - trecut) + " " + D.cronometru.din;
      if (trecut >= sec) {
        g.clearInterval(ceas); ceas = null;
        if (txt) txt.textContent = laSfarsit || D.cronometru.gata;
      }
    }, 100);
  }

  /* ---- Exerciții cu alegere ---- */
  function quiz(id, i) {
    var Q = D.quiz[id], n = Q.itemi.length, it = Q.itemi[i], ales = S.ia("ex.q." + id + "." + i, null);
    var corp = (i === 0 ? "<p>" + esc(Q.intro) + "</p>" : "") +
      (id === "argumente" && i === 0 ? '<section class="card"><h2>Patru feluri de argumente nedrepte</h2><ul>' +
        Q.tipuri.map(function (t) { return "<li><strong>" + esc(t.t) + ":</strong> " + esc(t.d) + "</li>"; }).join("") + "</ul></section>" : "") +
      '<p class="mic">Situația ' + (i + 1) + " din " + n + "</p>" +
      '<section class="card"><p>' + esc(it.situatie) + "</p></section>";

    if (it.variante) { /* alegi răspunsul cel mai potrivit */
      corp += "<h2>Ce ai răspunde?</h2>";
      if (ales === null) {
        corp += '<div class="meniu-lista">' + it.variante.map(function (v, k) {
          return C.buton(esc(v.t), "exercitii.alege", id + "|" + i + "|" + k, "lista");
        }).join("") + "</div>";
      } else {
        it.variante.forEach(function (v, k) {
          var a = String(k) === String(ales);
          corp += '<section class="card' + (v.ok ? " stil-asertiv" : " varianta") + '"><h2>' + (v.ok ? "✓ Potrivit" : "✗ Mai puțin potrivit") + (a ? " · alegerea ta" : "") + "</h2>" +
            "<p>" + esc(v.t) + '</p><p class="mic">' + esc(v.expl) + "</p></section>";
        });
      }
    } else { /* recunoști felul situației */
      var opt = Q.optiuni || Q.tipuri.map(function (t) { return [t.id, t.t]; });
      corp += "<h2>" + esc(Q.intrebare) + "</h2>";
      if (ales === null) {
        corp += '<div class="meniu-lista">' + opt.map(function (o) {
          return C.buton(esc(o[1]), "exercitii.alege", id + "|" + i + "|" + o[0], "lista");
        }).join("") + "</div>";
      } else {
        var bine = ales === it.corect, numeCorect = opt.filter(function (o) { return o[0] === it.corect; })[0][1];
        corp += '<section class="card ' + (bine ? "stil-asertiv" : "varianta") + '"><h2>' + (bine ? "✓ Ai recunoscut-o" : "✗ Nu chiar") + "</h2>" +
          "<p><strong>Este: " + esc(numeCorect) + ".</strong>" + (it.expl ? " " + esc(it.expl) : "") + "</p></section>" +
          '<section class="card stil-asertiv"><h2>Un răspuns calm</h2><p class="citat">' + esc(it.raspuns) + "</p></section>";
        if (id === "argumente" && i === n - 1) corp += '<p class="termen">' + esc(Q.sfat) + "</p>";
      }
    }
    corp += '<div class="rand">' + (ales !== null ? C.buton("Încerc din nou", "exercitii.reia", id + "|" + i) : "") +
      (i < n - 1 ? C.buton("Situația următoare", "nav", "exercitii/quiz/" + id + "/" + (i + 1), "continua")
        : C.buton("Gata", "nav", inapoiPentru("quiz/" + id), "primar")) + "</div>";
    return C.pagina(Q.titlu, corp, i > 0 ? "exercitii/quiz/" + id + "/" + (i - 1) : (id === "argumente" ? "exercitii/argumentez" : inapoiPentru("quiz/" + id)));
  }

  /* ---- Cum să argumentezi: ideile principale și „Argumentul meu” ---- */
  function propozitie(t) {
    var x = String(t || "").trim().replace(/\s+/g, " ").replace(/[\s.,;:!]+$/, "");
    return x ? x.charAt(0).toUpperCase() + x.slice(1) + "." : "";
  }
  function inlocuieste(t, v) { Object.keys(v || {}).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }
  /* Calcul pur: argumentul întreg și ce l-ar face mai convingător. */
  function verificaArgument(r) {
    var M = D.argumentez.model, R = M.reguli, p = {}, lipsa = [], sfaturi = [], bine = [];
    M.parti.forEach(function (x) { p[x.id] = String((r && r[x.id]) || "").trim(); if (!p[x.id]) lipsa.push(inlocuieste(M.lipsa, { parte: x.t.split(" (")[0] })); });
    if (lipsa.length) return { argument: "", lipsa: lipsa, sfaturi: [], bine: [], bun: false };
    var ex = p.exemplu.replace(/^\s*(de exemplu|exemplu)\s*[,:]?\s*/i, "");
    /* Dacă motivul începe cu „ca să”, „pentru că”…, se leagă de idee cu virgulă, în aceeași propoziție. */
    var leaga = /^(ca sa|pentru ca|pentru a|fiindca|deoarece|intrucat|caci|ca)\b/.test(norm(p.motiv));
    var inceput = leaga ? propozitie(p.idee).replace(/\.$/, "") + ", " + propozitie(p.motiv).replace(/^./, function (c) { return c.toLowerCase(); }) : propozitie(p.idee) + " " + propozitie(p.motiv);
    var argument = [inceput, "De exemplu, " + propozitie(ex).replace(/^./, function (c) { return c.toLowerCase(); }), propozitie(p.propunere)].join(" ");
    var n = { idee: norm(p.idee), motiv: norm(p.motiv), exemplu: norm(ex), propunere: norm(p.propunere) }, tot = [n.idee, n.motiv, n.exemplu, n.propunere].join(" "), gasit;
    if ((p.idee.match(/[.!?](\s|$)/g) || []).length > 1 || p.idee.length > 160) sfaturi.push(R.ideeLunga);
    if (p.motiv.length < 12) sfaturi.push(R.motivScurt);
    if ((gasit = tot.match(/\b(mereu|niciodata|toata lumea|toti stiu|intotdeauna|tot timpul)\b/))) sfaturi.push(inlocuieste(R.absolut, { gasit: gasit[0] }));
    if ((gasit = tot.match(/\b(tu nu stii|nu ai inteles|nu va pricepeti|esti prea|sunteti prea|nu te pricepi|habar n-ai|habar nu ai)\b/))) sfaturi.push(inlocuieste(R.persoana, { gasit: gasit[0] }));
    if (/\d|\b(ieri|azi|saptamana trecuta|luna trecuta|anul trecut|de doua ori|de trei ori|luni|marti|miercuri|joi|vineri)\b/.test(n.exemplu)) bine.push(M.laude.exemplu);
    else if (/\b(de obicei|in general|uneori|cateodata|des)\b/.test(n.exemplu)) sfaturi.push(R.exempluVag);
    if ((gasit = n.propunere.match(/\b(sa fie mai bine|sa ne schimbam|sa ne straduim|sa ne descurcam mai bine|sa facem ceva)\b/))) sfaturi.push(inlocuieste(R.propunereVaga, { gasit: "„" + gasit[0] + "”" }));
    else if (/\b(incercam|incepem|proba|saptamani|saptamana|o luna|de luni|pana|zile|ora|minute)\b/.test(n.propunere)) bine.push(M.laude.propunere);
    return { argument: argument, lipsa: [], sfaturi: sfaturi, bine: bine, bun: !sfaturi.length };
  }
  function argumentez() {
    var A = D.argumentez, M = A.model;
    var corp = "<p>" + esc(A.intro) + "</p>" +
      '<section class="card"><h2>' + esc(A.ideiTitlu) + '</h2><ol class="pasi">' +
      A.idei.map(function (x) { return "<li><strong>" + esc(x.t) + "</strong> " + esc(x.ex) + "</li>"; }).join("") + "</ol></section>" +
      '<section class="card stil-asertiv"><h2>' + esc(A.formaTitlu) + '</h2><p><strong>' + esc(A.forma) + '</strong></p><p class="citat">' + esc(A.exemplu) + "</p></section>" +
      "<h2>" + esc(M.titlu) + "</h2><p>" + esc(M.explica) + "</p>" +
      M.parti.map(function (x) { return C.camp("ex.arg." + x.id, esc(x.t), esc(x.ajutor), x.randuri); }).join("") +
      '<div class="rand">' + C.buton(esc(M.buton), "exercitii.argument", null, "continua") + "</div>";
    if (S.ia("ex.arg.verificat", false)) {
      var v = verificaArgument(S.ia("ex.arg", {}));
      corp += '<div id="rezultat-argument">';
      if (v.lipsa.length) corp += '<section class="card"><h2>' + esc(M.gol) + "</h2><ul>" + v.lipsa.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>";
      else {
        corp += '<section class="card"><h2>' + esc(M.argument) + '</h2><p class="citat">' + esc(v.argument) + "</p></section>" +
          '<section class="card' + (v.bun ? " stil-asertiv" : "") + '"><h2>' + esc(v.bun ? M.bine : M.aproape) + "</h2>" +
          (v.bine.length ? "<p>" + v.bine.map(esc).join(" ") + "</p>" : "") +
          (v.sfaturi.length ? "<ul>" + v.sfaturi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
          '<p class="mic">' + esc(M.sfat) + "</p></section>";
      }
      corp += "</div>";
    }
    corp += '<div class="rand">' + C.buton("Înapoi", "nav", "asertiv/intro") + C.buton(esc(A.continua), "nav", "exercitii/quiz/argumente", "continua") + "</div>";
    return C.pagina(A.titlu, corp, "asertiv/intro");
  }

  /* ---- Cererea cu motiv (calcul pur) ---- */
  function analizeazaCerere(text) {
    var M = D.cerere.mesaje, n = norm(text), bine = [], sfaturi = [];
    if (/\?/.test(text)) bine.push(M.intrebare_ok); else sfaturi.push(M.intrebare_nu);
    if (/\b(pentru ca|fiindca|deoarece|ca sa|pentru a|din cauza|intrucat|caci)\b/.test(n)) bine.push(M.motiv_ok); else sfaturi.push(M.motiv_nu);
    if (/\b(pana (la|in|maine|vineri|luni|marti|miercuri|joi|sambata|duminica|diseara|poimaine)|la ora)\b/.test(n)) bine.push(M.termen_ok);
    if (/\b(imediat|trebuie sa)\b|\bacum\s*!|\burgent\s*!/.test(n)) sfaturi.push(M.presiune);
    if (!/multumesc|multumim|va rog|te rog/.test(n)) sfaturi.push(M.multumesc);
    return { bine: bine, sfaturi: sfaturi };
  }
  function cerere() {
    var K = D.cerere, text = S.ia("ex.cerere.text", ""), verificat = S.ia("ex.cerere.verificat", false);
    var corp = "<p>" + esc(K.intro) + "</p>" + C.camp("ex.cerere.text", esc(K.camp), esc(K.ajutor), 4) +
      '<div class="rand">' + C.buton(esc(K.buton), "exercitii.verificaCerere", null, "continua") + "</div>";
    if (verificat && String(text).trim()) {
      var r = analizeazaCerere(text);
      if (r.bine.length) corp += '<section class="card stil-asertiv"><h2>✓ Ce e bine</h2><ul>' + r.bine.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>";
      if (r.sfaturi.length) corp += '<section class="card"><h2>Ce poți adăuga</h2><ul>' + r.sfaturi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>";
    }
    corp += '<div class="rand">' + C.buton("Gata", "nav", "asertiv/intro", "primar") + "</div>";
    return C.pagina(K.titlu, corp, "asertiv/intro");
  }

  /* ---- Pauza de două secunde ---- */
  function toateIntrebarile() {
    var l = []; (g.DATE.interviu ? g.DATE.interviu.grupe : []).forEach(function (gr) { gr.intrebari.forEach(function (q) { l.push(q.q); }); });
    return l.length ? l : ["Spune-mi câteva lucruri despre tine."];
  }
  function pauza() {
    var P = D.pauza, l = toateIntrebarile(), i = Number(S.ia("ex.pauza.i", 0)) % l.length;
    var corp = P.intro.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + '<p class="termen">' + esc(P.cum) + "</p>" +
      '<section class="card stil-asertiv"><h2>Întrebarea</h2><p class="citat">' + esc(l[i]) + "</p>" +
      '<progress class="progres" id="pauza-bara" max="2" value="0" aria-label="Pauza de două secunde"></progress>' +
      '<p id="pauza-bara-t" role="status" class="mic">&nbsp;</p>' +
      '<div class="rand">' + C.buton(esc(P.buton), "exercitii.pauza", null, "continua") + C.buton(esc(P.alta), "exercitii.altaIntrebare") + "</div></section>" +
      '<div class="rand">' + C.buton("Gata", "nav", "interviu/exersez", "primar") + "</div>";
    return C.pagina(P.titlu, corp, "interviu/exersez");
  }

  function voce() {
    var V = D.voce;
    var corp = "<p>" + esc(V.intro) + '</p><ol class="pasi">' + V.pasi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" +
      '<section class="card"><h2>Textul de citit</h2>' + V.text.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</section>" +
      cronometruHtml("ceas-voce", V.cronometru) +
      '<div class="rand">' + C.buton("Gata", "nav", "interviu/exersez", "primar") + "</div>";
    return C.pagina(V.titlu, corp, "interviu/exersez");
  }

  function capete() {
    var K = D.capete;
    var corp = "<p>" + esc(K.intro) + "</p>" + K.campuri.map(function (c) { return C.camp("ex.capete." + c.id, esc(c.t), esc(c.ajutor), c.randuri); }).join("") +
      '<p class="termen">' + esc(K.cum) + "</p>" + cronometruHtml("ceas-capete", K.cronometru) +
      '<div class="rand">' + C.buton("Gata", "nav", "interviu/exersez", "primar") + "</div>";
    return C.pagina(K.titlu, corp, "interviu/exersez");
  }

  /* ---- Cuvintele firmei (calcul pur) ---- */
  function cuvinteFrecvente(text) {
    var K = D.cuvinte, nr = {}, forma = {}, ordine = [];
    (String(text || "").match(/[A-Za-zĂÂÎȘȚăâîșțŞŢşţ-]+/g) || []).forEach(function (w) {
      var k = norm(w).replace(/^-+|-+$/g, "");
      if (k.length < 4 || K.ignorate.indexOf(k) >= 0) return;
      if (!nr[k]) { nr[k] = 0; forma[k] = w.toLowerCase(); ordine.push(k); }
      nr[k]++;
    });
    return ordine.filter(function (k) { return nr[k] >= 2; })
      .sort(function (a, b) { return nr[b] - nr[a] || ordine.indexOf(a) - ordine.indexOf(b); })
      .slice(0, K.maxim).map(function (k) { return { w: forma[k], n: nr[k] }; });
  }
  function cuvinte() {
    var K = D.cuvinte, text = S.ia("ex.cuvinte.text", ""), arata = S.ia("ex.cuvinte.arata", false);
    var corp = "<p>" + esc(K.intro) + "</p>" + C.camp("ex.cuvinte.text", esc(K.camp), "", 8) +
      '<div class="rand">' + C.buton(esc(K.buton), "exercitii.arataCuvinte", null, "continua") + "</div>";
    if (arata && String(text).trim()) {
      var l = cuvinteFrecvente(text);
      corp += '<section class="card"><h2>' + esc(K.rezultat) + "</h2>" +
        (l.length ? "<ol>" + l.map(function (x) { return "<li><strong>" + esc(x.w) + "</strong> <span class=\"mic\">(de " + x.n + " ori)</span></li>"; }).join("") + "</ol>" : "<p>" + esc(K.putine) + "</p>") +
        "</section>" + '<p class="termen">' + esc(K.sfat) + "</p>";
    }
    corp += '<div class="rand">' + C.buton("Gata", "nav", "interviu/exersez", "primar") + "</div>";
    return C.pagina(K.titlu, corp, "interviu/exersez");
  }

  function intrebari() {
    var K = D.intrebari, alese = S.ia("ex.intrebari.alese", []) || [];
    var corp = "<p>" + esc(K.intro) + '</p><fieldset class="intrebare"><legend>' + esc(K.alege) + "</legend>" +
      K.lista.map(function (q, k) {
        return '<label class="val"><input type="checkbox" data-chg="exercitii.intrebare" value="' + k + '"' + (alese.indexOf(k) >= 0 ? " checked" : "") + "><span>" + esc(q) + "</span></label>";
      }).join("") + "</fieldset>" +
      C.camp("ex.intrebari.poveste", esc(K.poveste), esc(K.povesteAjutor), 3) +
      '<p class="termen">' + esc(K.sfat) + "</p>" +
      '<div class="rand">' + C.buton("Gata", "nav", "interviu/exersez", "primar") + "</div>";
    return C.pagina(K.titlu, corp, "interviu/exersez");
  }

  C.reg("exercitii", {
    ecran: function (sub) {
      var m = /^quiz\/([a-z]+)(?:\/(\d+))?$/.exec(sub || "");
      if (m && D.quiz[m[1]]) { var i = Number(m[2] || 0); return quiz(m[1], Math.min(i, D.quiz[m[1]].itemi.length - 1)); }
      var f = { argumentez: argumentez, cerere: cerere, pauza: pauza, voce: voce, capete: capete, cuvinte: cuvinte, intrebari: intrebari }[sub];
      return f ? f() : C.module.asertiv.ecran("intro");
    },
    actiuni: {
      alege: function (arg) { var p = String(arg).split("|"); S.pune("ex.q." + p[0] + "." + p[1], p[2]); },
      reia: function (arg) { var p = String(arg).split("|"); S.pune("ex.q." + p[0] + "." + p[1], null); },
      verificaCerere: function () {
        var t = g.document && g.document.getElementById("c-ex-cerere-text");
        if (t) S.pune("ex.cerere.text", t.value);
        if (!String(S.ia("ex.cerere.text", "")).trim()) { C.eroare = D.cerere.gol; return; }
        S.pune("ex.cerere.verificat", true);
      },
      arataCuvinte: function () {
        var t = g.document && g.document.getElementById("c-ex-cuvinte-text");
        if (t) S.pune("ex.cuvinte.text", t.value);
        if (!String(S.ia("ex.cuvinte.text", "")).trim()) { C.eroare = D.cuvinte.gol; return; }
        S.pune("ex.cuvinte.arata", true);
      },
      intrebare: function (v, el) {
        var l = (S.ia("ex.intrebari.alese", []) || []).slice(), k = Number(v), i = l.indexOf(k);
        var zona = g.document && g.document.getElementById("eroare");
        if (el.checked) {
          if (l.length >= D.intrebari.maxim) { el.checked = false; C.eroare = D.intrebari.prea_multe; if (zona) zona.innerHTML = esc(C.eroare); return false; }
          if (i < 0) l.push(k);
        } else if (i >= 0) l.splice(i, 1);
        S.pune("ex.intrebari.alese", l); C.eroare = ""; if (zona) zona.textContent = "";
        return false;
      },
      cronometru: function (arg) { var p = String(arg).split("|"); pornesteCeas(p[0], Number(p[1])); return false; },
      pauza: function () { pornesteCeas("pauza-bara", 2, D.pauza.acum, D.pauza.asteapta); return false; },
      altaIntrebare: function () { S.pune("ex.pauza.i", Number(S.ia("ex.pauza.i", 0)) + 1); },
      argument: function () {
        D.argumentez.model.parti.forEach(function (x) {
          var el = g.document && g.document.getElementById("c-ex-arg-" + x.id);
          if (el) S.pune("ex.arg." + x.id, el.value);
        });
        S.pune("ex.arg.verificat", true);
        C.deArata = "rezultat-argument";
      }
    },
    cartela: cartela,
    analizeazaCerere: analizeazaCerere,
    verificaArgument: verificaArgument,
    cuvinteFrecvente: cuvinteFrecvente
  });
})(typeof window !== "undefined" ? window : globalThis);
