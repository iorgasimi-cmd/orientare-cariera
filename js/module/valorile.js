/* „Valorile mele” (10 → 5 → 3 → 1, întrebări, note) și „Cum mă văd eu” (scala stimei de sine Rosenberg).
   Adaptate pe vârste: elevii au o listă scurtă și întrebări simple; adulții, lista întreagă. Totul rămâne pe telefon. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc;
  var V = g.DATE.valoriPers, T = g.DATE.stima;

  function inl(t, v) { Object.keys(v).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }
  function lista0() { return C.eAdult() ? V.listaAdult : V.listaElev; }
  function ales(k) { return (S.ia("vp.ales.p" + k, []) || []).slice(); }
  /* Lista din care alegi la pasul k: la primul, toată lista; apoi, ce ai ales la pasul de dinainte. */
  function sursa(k) { return k === 0 ? lista0() : ales(k - 1); }
  function urmator(id) { return C.eAdult() && C.module.adult ? C.module.adult.urmator(id) : null; }
  function butonFinal(id) {
    var u = urmator(id);
    return u ? C.buton("Continuă: " + esc(u.t), "nav", u.ecran, "continua") : C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar");
  }

  /* ---- Valorile mele ---- */
  function intro() {
    var corp = V.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<p class="mic">' + esc(C.eAdult() ? V.introAdult : V.introElev) + "</p>" +
      '<ol class="pasi">' + V.pasi.map(function (p) { return "<li>" + esc(p.t) + "</li>"; }).join("") + "</ol>" +
      '<div class="rand">' + C.buton("Începem", "nav", "valorile/p0", "primar") +
      (S.ia("vp.gata", false) ? C.buton("Văd valorile mele", "nav", "valorile/rezultat") : "") + "</div>";
    return C.pagina(V.titlu, corp, C.acasa());
  }

  function pas(k) {
    var P = V.pasi[k], l = sursa(k), a = ales(k);
    var corp = '<p class="mic">Pasul ' + (k + 1) + " din " + V.pasi.length + "</p><p>" + esc(P.ajutor) + "</p>";
    if (P.n === 1) {
      var top = S.ia("vp.top", "");
      corp += '<fieldset class="intrebare"><legend>' + esc(P.t) + "</legend>" + l.map(function (v) {
        return '<label class="val"><input type="radio" name="vp-top" value="' + esc(v) + '" data-camp="vp.top"' + (top === v ? " checked" : "") + "><span>" + esc(v) + "</span></label>";
      }).join("") + "</fieldset>";
    } else {
      corp += '<p class="mic" id="vp-contor" role="status">' + esc(inl(V.contor, { n: a.length, total: P.n })) + "</p>" +
        '<div class="lista-valori">' + l.map(function (v) {
          return '<label class="val"><input type="checkbox" data-chg="valorile.comuta" value="' + k + "|" + esc(v) + '"' + (a.indexOf(v) >= 0 ? " checked" : "") + "><span>" + esc(v) + "</span></label>";
        }).join("") + "</div>";
    }
    corp += '<div class="rand">' + C.buton("Înapoi", "nav", k === 0 ? "valorile/intro" : "valorile/p" + (k - 1)) +
      C.buton("Continuă", "valorile.continua", String(k), "continua") + "</div>";
    return C.pagina(P.t, corp, k === 0 ? "valorile/intro" : "valorile/p" + (k - 1));
  }

  function intrebari() {
    var top = S.ia("vp.top", ""), Q = C.eAdult() ? V.intrebari.adult : V.intrebari.elev;
    if (!top) return pas(3);
    var corp = '<p class="citat">' + esc(top) + "</p>" +
      Q.map(function (q) { return C.camp("vp.r." + q.id, esc(inl(q.t, { v: top })), esc(q.ajutor || ""), 3); }).join("") +
      '<div class="rand">' + C.buton("Înapoi", "nav", "valorile/p3") + C.buton("Continuă", "nav", "valorile/nota", "continua") + "</div>";
    return C.pagina(V.pasi[3].t, corp, "valorile/p3");
  }

  function nota() {
    var N = V.nota, trei = ales(2);
    var corp = "<p>" + esc(N.explica) + '</p><p class="mic">' + esc(C.eAdult() ? N.adult : N.elev) + "</p>" +
      trei.map(function (v, i) {
        var cur = Number(S.ia("vp.nota.v" + i, 0));
        var opt = ""; for (var n = 1; n <= 10; n++) {
          opt += '<label class="opt"><input type="radio" name="vp-n' + i + '" value="' + n + '" data-camp="vp.nota.v' + i + '" data-num="1"' + (cur === n ? " checked" : "") + "><span>" + n + "</span></label>";
        }
        return '<fieldset class="intrebare"><legend>' + esc(v) + '</legend><div class="scala">' + opt + "</div></fieldset>";
      }).join("") +
      '<div class="rand">' + C.buton("Înapoi", "nav", "valorile/intrebari") + C.buton("Văd rezultatul", "valorile.gata", null, "primar") + "</div>";
    return C.pagina(N.titlu, corp, "valorile/intrebari");
  }

  function rezultat() {
    var R = V.rezultat, top = S.ia("vp.top", ""), trei = ales(2);
    if (!top || trei.length < 3) return intro();
    var note = trei.map(function (v, i) { return { v: v, n: Number(S.ia("vp.nota.v" + i, 0)) }; });
    var corp = '<section class="card stil-asertiv"><h2>' + esc(R.cea) + '</h2><p class="citat">' + esc(top) + "</p></section>" +
      '<section class="card"><h2>' + esc(R.top) + "</h2><ul>" + note.map(function (x) {
        return "<li><strong>" + esc(x.v) + "</strong>" + (x.n ? " – contează " + x.n + " din 10" : "") + "</li>";
      }).join("") + "</ul></section>" +
      "<p>" + esc(R.fara) + "</p>" +
      '<p class="termen">' + esc(C.eAdult() ? R.planAdult : R.planElev) + "</p>" +
      C.retine("valori") +
      '<div class="rand">' + C.buton(esc(R.refac), "valorile.refa") + butonFinal("valori") + "</div>";
    return C.pagina(R.titlu, corp, C.acasa());
  }

  C.reg("valorile", {
    ecran: function (sub) {
      var m = /^p([0-3])$/.exec(sub || "");
      if (m) return pas(Number(m[1]));
      if (sub === "intrebari") return intrebari();
      if (sub === "nota") return nota();
      if (sub === "rezultat") return rezultat();
      return intro();
    },
    actiuni: {
      comuta: function (arg, el) {
        var i = String(arg).indexOf("|"), k = Number(String(arg).slice(0, i)), v = String(arg).slice(i + 1), P = V.pasi[k];
        var l = ales(k), j = l.indexOf(v), zona = g.document && g.document.getElementById("eroare");
        if (el.checked) {
          if (l.length >= P.n) { el.checked = false; C.eroare = inl(V.preaMulte, { total: P.n }); if (zona) zona.textContent = C.eroare; return false; }
          if (j < 0) l.push(v);
        } else if (j >= 0) l.splice(j, 1);
        S.pune("vp.ales.p" + k, l); C.eroare = ""; if (zona) zona.textContent = "";
        var c = g.document && g.document.getElementById("vp-contor");
        if (c) c.textContent = inl(V.contor, { n: l.length, total: P.n });
        return false;
      },
      continua: function (arg) {
        var k = Number(arg), P = V.pasi[k];
        if (P.n === 1) {
          if (!S.ia("vp.top", "")) { C.eroare = inl(V.preaPutine, { total: 1 }); return; }
          C.mergi("valorile/intrebari"); return;
        }
        if (ales(k).length !== P.n) { C.eroare = inl(V.preaPutine, { total: P.n }); return; }
        /* la pașii următori rămân doar valorile care sunt încă alese */
        for (var u = k + 1; u <= 2; u++) S.pune("vp.ales.p" + u, ales(u).filter(function (v) { return ales(u - 1).indexOf(v) >= 0; }));
        if (ales(2).indexOf(S.ia("vp.top", "")) < 0) S.pune("vp.top", "");
        C.mergi("valorile/p" + (k + 1));
      },
      gata: function () { S.pune("vp.gata", true); C.mergi("valorile/rezultat"); },
      refa: function () { S.pune("vp", {}); C.mergi("valorile/p0"); }
    }
  });

  /* ---- Cum mă văd eu (scala Rosenberg) ---- */
  /* Calcul pur: scorul 10–40; afirmațiile inverse se punctează 5 – răspuns. Întoarce null dacă lipsesc răspunsuri. */
  function scor(r) {
    var s = 0;
    for (var i = 0; i < T.itemi.length; i++) {
      var it = T.itemi[i], v = Number(r && r[it.id]);
      if (!(v >= 1 && v <= 4)) return null;
      s += it.inv ? 5 - v : v;
    }
    return s;
  }
  function stIntro() {
    var corp = T.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="rand">' + C.buton("Începem", "nav", "stima/p0", "primar") +
      (S.ia("stima.gata", false) ? C.buton("Văd rezultatul", "nav", "stima/rezultat") : "") + "</div>";
    return C.pagina(T.titlu, corp, C.acasa());
  }
  function stPagina(p) {
    var de = p * T.peEcran, items = T.itemi.slice(de, de + T.peEcran), pagini = Math.ceil(T.itemi.length / T.peEcran);
    var corp = '<progress class="progres" max="' + pagini + '" value="' + (p + 1) + '" aria-label="Progres"></progress>' +
      '<p class="mic">Pagina ' + (p + 1) + " din " + pagini + "</p>" +
      items.map(function (it) {
        var cur = String(S.ia("stima.r." + it.id, ""));
        return '<fieldset class="intrebare"><legend>' + esc(it.t) + "</legend>" + T.optiuni.map(function (o) {
          return '<label class="val"><input type="radio" name="st-' + it.id + '" value="' + o[0] + '" data-camp="stima.r.' + it.id + '" data-num="1"' + (cur === o[0] ? " checked" : "") + "><span>" + esc(o[1]) + "</span></label>";
        }).join("") + "</fieldset>";
      }).join("") +
      '<div class="rand">' + C.buton("Înapoi", "nav", p === 0 ? "stima/intro" : "stima/p" + (p - 1)) +
      (p < pagini - 1 ? C.buton("Continuă", "stima.pagina", String(p), "continua") : C.buton("Văd rezultatul", "stima.pagina", String(p), "primar")) + "</div>";
    return C.pagina(T.titlu, corp, p === 0 ? "stima/intro" : "stima/p" + (p - 1));
  }
  function stRezultat() {
    var R = T.rezultat, n = scor(S.ia("stima.r", {}));
    if (n === null) return stIntro();
    var adult = C.eAdult(), sus = n >= 25;
    var corp = '<section class="card"><p>' + esc(inl(R.scor, { n: n })) + "</p><p>" + esc(R.explica) + "</p></section>" +
      "<p>" + esc(sus ? R.sus : R.jos) + "</p><p>" + esc(R.schimba) + "</p>" +
      '<section class="card"><h2>' + esc(R.ideiTitlu) + "</h2><ul>" + (adult ? R.ideiAdult : R.ideiElev).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>" +
      (sus ? "" : '<p class="mic">' + esc(adult ? R.ajutorAdult : R.ajutorElev) + "</p>") +
      C.retine("stima") +
      '<div class="rand">' + C.buton(esc(R.refac), "stima.refa") + butonFinal("stima") + "</div>";
    return C.pagina(R.titlu, corp, C.acasa());
  }
  C.reg("stima", {
    ecran: function (sub) {
      var m = /^p(\d)$/.exec(sub || "");
      if (m && Number(m[1]) < Math.ceil(T.itemi.length / T.peEcran)) return stPagina(Number(m[1]));
      if (sub === "rezultat") return stRezultat();
      return stIntro();
    },
    actiuni: {
      pagina: function (arg) {
        var p = Number(arg), de = p * T.peEcran, pagini = Math.ceil(T.itemi.length / T.peEcran);
        var lipsa = T.itemi.slice(de, de + T.peEcran).some(function (it) { return !S.ia("stima.r." + it.id, null); });
        if (lipsa) { C.eroare = T.lipsa; return; }
        if (p < pagini - 1) { C.mergi("stima/p" + (p + 1)); return; }
        S.pune("stima.gata", true); C.mergi("stima/rezultat");
      },
      refa: function () { S.pune("stima.r", {}); S.pune("stima.gata", false); C.mergi("stima/p0"); }
    },
    scor: scor
  });
})(typeof window !== "undefined" ? window : globalThis);
