/* Subagent 13: negocierea salariului (doar pentru adulți). Șapte pași scurți, fișa de pregătire salvată doar pe telefon,
   sfaturi pe situație și un prompt pentru exersarea discuției cu o IA. Aplicația nu spune ce sumă să ceară omul. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.negociere, esc = C.esc;

  function inl(t, v) { Object.keys(v).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }
  function numar(v) { var x = String(v == null ? "" : v).replace(/[^\d]/g, ""); return x ? Number(x) : null; }
  function fisa() { return S.ia("neg.f", {}) || {}; }
  function formatLei(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

  /* Calcul pur: verifică fișa și pregătește fraza cu intervalul. */
  function verificaFisa(f) {
    var P = D.fisa.probleme, n = { minim: numar(f.minim), dorit: numar(f.dorit), intMin: numar(f.intMin), intMax: numar(f.intMax) }, pr = [];
    if (n.minim === null || n.dorit === null || n.intMin === null || n.intMax === null) return { probleme: [P.lipsa], fraza: "" };
    if (n.dorit < n.minim) pr.push(P.dorit);
    if (n.intMin < n.minim) pr.push(P.interval);
    if (n.intMax < n.intMin) pr.push(P.ordine);
    var arg = ["arg1", "arg2", "arg3"].filter(function (k) { return String(f[k] || "").trim(); }).length;
    if (arg < 3) pr.push(P.argumente);
    return { probleme: pr, fraza: inl(D.fisa.fraza, { min: formatLei(n.intMin), max: formatLei(n.intMax) }), ok: !pr.length };
  }

  /* Calcul pur: promptul pentru exersarea discuției. Conține doar postul, intervalul și argumentele scrise de om. */
  function promptIA(post, f) {
    var P = D.ia.prompt, p = String(post || "").trim().replace(/[\s.!;,]+$/, ""), l = [inl(P.inceput, { post: p || P.postGol }), "", "Reguli:"];
    P.reguli.forEach(function (x) { l.push("- " + x); });
    var a = numar(f.intMin), b = numar(f.intMax);
    if (a !== null && b !== null) l.push("", inl(P.interval, { min: formatLei(a), max: formatLei(b) }));
    var arg = ["arg1", "arg2", "arg3"].map(function (k) { return String(f[k] || "").trim().replace(/\s*\n\s*/g, " "); }).filter(Boolean);
    if (arg.length) { l.push("", P.argumente); arg.forEach(function (x) { l.push("- " + x); }); }
    return l.join("\n");
  }

  function situatie() {
    var sit = S.ia("situatie", ""), l = [];
    if (D.situatii[sit]) l.push(D.situatii[sit]);
    if (S.ia("varsta", "") === "45+") l.push(D.situatii.accent45);
    return l;
  }

  function hub() {
    var corp = D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      situatie().map(function (t) { return '<p class="termen">' + esc(t) + "</p>"; }).join("") +
      '<div class="meniu-lista">' + D.pasi.map(function (p) {
        var gata = p.id === "fisa" && S.ia("neg.gata", false);
        return C.buton("<strong>" + esc(p.titlu) + "</strong>" + (gata ? '<span class="stare gata">✓ completată</span>' : ""), "nav", "negociere/" + p.id, "lista");
      }).join("") + "</div>" +
      '<p class="nota">' + esc(D.reguli) + "</p>";
    return C.pagina(D.titlu, corp, "adult/meniu");
  }

  function navigare(i) {
    var u = D.pasi[i + 1];
    var urm = C.module.adult && C.module.adult.urmator("negociere");
    return (u ? "" : C.retine("negociere")) + '<div class="rand">' + C.buton("Înapoi", "nav", i === 0 ? "negociere/hub" : "negociere/" + D.pasi[i - 1].id) +
      (u ? C.buton("Continuă", "nav", "negociere/" + u.id, "continua")
        : (urm ? C.buton("Continuă: " + esc(urm.t), "nav", urm.ecran, "continua") : C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar"))) + "</div>";
  }

  function pas(id) {
    var i = D.pasi.map(function (p) { return p.id; }).indexOf(id), P = D.pasi[i];
    if (!P) return hub();
    var corp = '<p class="mic">Pasul ' + (i + 1) + " din " + D.pasi.length + "</p>" + (P.text || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    var f = fisa();
    if (id === "piata") {
      corp += '<section class="card"><h2>' + esc(P.surseTitlu) + "</h2><ul>" + P.surse.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
        '</ul><p class="mic">' + esc(P.surseNota) + "</p></section>";
    }
    if (id === "fisa") {
      corp += D.fisa.campuri.map(function (c) {
        if (c.tip === "numar") {
          var idc = "c-neg-f-" + c.id;
          return '<div class="camp"><label for="' + idc + '">' + esc(c.t) + '</label><p class="ajutor">' + esc(c.ajutor) + "</p>" +
            '<input id="' + idc + '" type="text" inputmode="numeric" autocomplete="off" data-camp="neg.f.' + c.id + '" value="' + C.escSimplu(f[c.id] || "") + '"></div>';
        }
        return C.camp("neg.f." + c.id, esc(c.t), esc(c.ajutor), 2);
      }).join("") + '<div class="rand">' + C.buton(esc(D.fisa.buton), "negociere.verifica", null, "continua") + "</div>";
      if (S.ia("neg.verificat", false)) {
        var v = verificaFisa(f);
        corp += '<div id="rezultat-fisa">' + (v.ok
          ? '<section class="card stil-asertiv"><h2>' + esc(D.fisa.bine) + '</h2><p class="citat">' + esc(v.fraza) + "</p></section>"
          : '<section class="card"><h2>Ce poți verifica</h2><ul>' + v.probleme.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>") + "</div>";
      }
    }
    if (id === "moment") {
      var a = numar(f.intMin), b = numar(f.intMax);
      corp += '<p class="citat">' + esc(inl(P.exemplu, { min: a !== null ? formatLei(a) : "…", max: b !== null ? formatLei(b) : "…" })) + "</p>";
    }
    if (id === "ton" && ["arg1", "arg2", "arg3"].some(function (k) { return String(f[k] || "").trim(); })) {
      corp += '<section class="card"><h2>Argumentele tale</h2><ul>' + ["arg1", "arg2", "arg3"].map(function (k) { return String(f[k] || "").trim(); }).filter(Boolean)
        .map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>";
    }
    if (id === "oferta") {
      corp += '<ol class="pasi">' + P.lista.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" + '<p class="termen">' + esc(P.frica) + "</p>";
      if (String(f.altele || "").trim()) corp += '<section class="card"><h2>Ce altceva contează pentru tine</h2><p>' + esc(f.altele) + "</p></section>";
    }
    if (id === "exercitiu") {
      corp += '<div class="camp"><label for="c-prompt-negociere">Promptul de copiat</label><textarea id="c-prompt-negociere" rows="12" readonly>' +
        C.escSimplu(promptIA(S.ia("scrisoare.r.post", ""), f)) + "</textarea></div>" +
        '<div class="rand">' + C.buton("Copiază", "negociere.copiaza", null, "continua") + '</div><p id="stare-copiere-negociere" class="mic" role="status"></p>' +
        "<details><summary>Prima dată folosești un program de IA? Vezi pașii</summary>" + C.ghidIA() + "</details>" +
        C.camp("neg.dupa", "Ce ai schimba după exercițiu?", "", 3);
    }
    corp += navigare(i);
    return C.pagina(P.titlu, corp, "negociere/hub");
  }

  C.reg("negociere", {
    ecran: function (sub) { return !sub || sub === "hub" ? hub() : pas(sub); },
    actiuni: {
      verifica: function () {
        D.fisa.campuri.forEach(function (c) {
          var el = g.document && g.document.getElementById("c-neg-f-" + c.id);
          if (el) S.pune("neg.f." + c.id, el.value);
        });
        S.pune("neg.verificat", true);
        if (verificaFisa(fisa()).ok) S.pune("neg.gata", true);
        C.deArata = "rezultat-fisa";
      },
      copiaza: function () { C.copiaza("c-prompt-negociere", "stare-copiere-negociere", D.ia.copiat, D.ia.selectat); return false; }
    },
    verificaFisa: verificaFisa,
    promptIA: promptIA
  });
})(typeof window !== "undefined" ? window : globalThis);
