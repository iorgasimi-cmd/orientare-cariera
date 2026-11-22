/* Subagent 1: testul de interese (după modelul Holland / RIASEC).
   Calculează primele trei tipuri din răspunsurile 1–5. Rezultatul e orientativ.
   Câte o afirmație pe ecran (36 în total), ca să încapă pe telefon fără derulare. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.interese, esc = C.esc;
  var ORDINE = ["R", "I", "A", "S", "E", "C"];

  function dupaTip(tip) { return D.intrebari.filter(function (q) { return q.tip === tip; }); }
  /* Întrebările, interleiate (câte una din fiecare tip, pe rând), ca să nu vină toate la rând de același fel. */
  function toateIntrebarile() {
    var liste = ORDINE.map(dupaTip), n = liste[0].length, rez = [];
    for (var p = 0; p < n; p++) liste.forEach(function (l) { rez.push(l[p]); });
    return rez;
  }

  /* Calcul pur (se poate testa fără ecran). Returnează scoruri și primele trei tipuri. */
  function calculeaza(raspunsuri) {
    var scor = {};
    ORDINE.forEach(function (t) { scor[t] = 0; });
    D.intrebari.forEach(function (q) {
      var v = Number(raspunsuri && raspunsuri[q.id]);
      if (v >= 1 && v <= 5) scor[q.tip] += v;
    });
    var top = ORDINE.slice().sort(function (a, b) {
      return scor[b] - scor[a] || ORDINE.indexOf(a) - ORDINE.indexOf(b);
    }).slice(0, 3);
    return { scor: scor, top: top };
  }

  function intro() {
    var corp =
      '<p>Mai întâi, un exercițiu scurt de imaginație. <strong>Nu există răspuns greșit.</strong></p>' +
      '<p class="citat">' + esc(C.eAdult() ? D.bagheta.adult : D.bagheta.elev) + "</p>" +
      C.camp("bagheta", "Scrie ce-ți vine în minte, cu cuvintele tale", "Poți scrie o meserie, o activitate sau doar o idee. Poți lăsa și gol.", 4) +
      '<p>Apoi urmează testul. Sunt 36 de afirmații, una pe ecran. Pentru fiecare, alegi cât de mult ți-ar plăcea să faci acel lucru.</p>' +
      '<div class="rand">' + C.buton("Începem testul", "interese.start", null, "primar") + "</div>";
    return C.pagina("Test de interese", corp);
  }

  /* O singură afirmație pe ecran. Butonul de continuare apare doar după ce ai răspuns. */
  function test(sub) {
    var tot = toateIntrebarile(), ultim = tot.length - 1;
    var n = Math.max(0, Math.min(Number(sub) || 0, ultim));
    var q = tot[n], cur = S.ia("interese.r." + q.id, null);
    var inapoi = n > 0 ? "interese/test/" + (n - 1) : "interese/intro";
    var corp = '<progress class="progres" max="' + tot.length + '" value="' + (n + 1) + '" aria-label="Progresul testului"></progress>' +
      '<p class="mic">Întrebarea ' + (n + 1) + " din " + tot.length + ". Cât de mult ți-ar plăcea să:</p>" +
      '<p class="legenda-scala"><strong>1</strong> = deloc · <strong>2</strong> = puțin · <strong>3</strong> = așa și așa · <strong>4</strong> = destul de mult · <strong>5</strong> = foarte mult</p>' +
      '<fieldset class="intrebare"><legend>' + esc(C.eAdult() && q.tAdult ? q.tAdult : q.t) + '</legend><div class="scala">' +
      D.scala.map(function (o) {
        return '<label class="opt"><input type="radio" name="q-' + q.id + '" value="' + o.v + '" data-camp="interese.r.' + q.id + '" data-num="1" data-rerand="1"' +
          (cur === o.v ? " checked" : "") + "><span>" + o.v + '<i class="sr"> ' + esc(o.t) + "</i></span></label>";
      }).join("") + "</div></fieldset>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", inapoi) +
      (cur ? C.buton(n < ultim ? "Continuă" : "Vezi rezultatul", "nav", n < ultim ? "interese/test/" + (n + 1) : "interese/rezultat", n < ultim ? "continua" : "primar") : "") +
      "</div>";
    return C.pagina("Test de interese", corp, inapoi, true);
  }

  function rezultat() {
    var r = S.ia("interese.top", null);
    if (!r) {
      var tot = toateIntrebarile();
      if (!tot.every(function (q) { return S.ia("interese.r." + q.id, null); })) return intro();
      var rez = calculeaza(S.ia("interese.r", {}));
      S.pune("interese.scor", rez.scor); S.pune("interese.top", rez.top); r = rez.top;
    }
    var corp = "<p>Răspunsurile tale arată <strong>cel mai mult interes</strong> pentru aceste trei zone:</p>";
    r.forEach(function (t, i) {
      var tip = D.tipuri[t];
      corp += '<section class="card"><h2>' + (i + 1) + ". " + esc(tip.nume) + "</h2><p>" + esc(tip.explicatie) +
        '</p><p class="mic"><strong>Exemple de activități:</strong> ' + esc(tip.exemple) + "</p></section>";
    });
    var b = S.ia("bagheta", "");
    if (b) corp += '<section class="card"><h2>Ce ai scris la început</h2><p class="citat">' + esc(b) + "</p></section>";
    corp += C.retine("interese");
    corp += '<div class="rand">' + C.buton("Refac testul", "interese.refa") + C.buton("Continuă: punctele mele forte", "nav", "forte/intro", "continua") + "</div>";
    return C.pagina("Rezultatul tău", corp, C.acasa());
  }

  var actiuni = {
    start: function () { C.mergi("interese/test/0"); },
    refa: function () {
      S.pune("interese.r", {}); S.pune("interese.top", null);
      C.mergi("interese/test/0");
    }
  };

  C.reg("interese", {
    ecran: function (sub) {
      var m = /^test(?:\/(\d+))?$/.exec(sub || "");
      if (m) return test(m[1]);
      return sub === "rezultat" ? rezultat() : intro();
    },
    actiuni: actiuni,
    calculeaza: calculeaza
  });
})(typeof window !== "undefined" ? window : globalThis);
