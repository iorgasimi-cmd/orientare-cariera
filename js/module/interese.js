/* Subagent 1: testul de interese (după modelul Holland / RIASEC).
   Calculează primele trei tipuri din răspunsurile 1–5. Rezultatul e orientativ. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.interese, esc = C.esc;
  var ORDINE = ["R", "I", "A", "S", "E", "C"];
  var PE_PAGINA = ORDINE.length; /* câte o întrebare din fiecare tip pe ecran */

  function dupaTip(tip) { return D.intrebari.filter(function (q) { return q.tip === tip; }); }
  function pagini() {
    var liste = ORDINE.map(dupaTip), n = liste[0].length, rez = [];
    for (var p = 0; p < n; p++) rez.push(liste.map(function (l) { return l[p]; }));
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
      '<p>Apoi urmează testul. Sunt 36 de afirmații. Pentru fiecare, alegi cât de mult ți-ar plăcea să faci acel lucru.</p>' +
      '<div class="rand">' + C.buton("Începem testul", "interese.start", null, "primar") + "</div>";
    return C.pagina("Test de interese", corp);
  }

  function test() {
    var pg = pagini(), p = Math.min(Math.max(S.ia("interese.pagina", 0), 0), pg.length - 1);
    var corp = '<progress class="progres" max="' + pg.length + '" value="' + (p + 1) + '" aria-label="Progresul testului"></progress>' +
      '<p class="mic">Pagina ' + (p + 1) + " din " + pg.length + ". Cât de mult ți-ar plăcea să:</p>" +
      '<p class="legenda-scala"><strong>1</strong> = deloc · <strong>2</strong> = puțin · <strong>3</strong> = așa și așa · <strong>4</strong> = destul de mult · <strong>5</strong> = foarte mult</p>';
    pg[p].forEach(function (q) {
      var cur = S.ia("interese.r." + q.id, null);
      corp += '<fieldset class="intrebare"><legend>' + esc(C.eAdult() && q.tAdult ? q.tAdult : q.t) + "</legend><div class=\"scala\">";
      D.scala.forEach(function (o) {
        corp += '<label class="opt"><input type="radio" name="q-' + q.id + '" value="' + o.v + '" data-camp="interese.r.' + q.id + '" data-num="1"' +
          (cur === o.v ? " checked" : "") + "><span>" + o.v + '<i class="sr"> ' + esc(o.t) + "</i></span></label>";
      });
      corp += "</div></fieldset>";
    });
    corp += '<div class="rand">' +
      (p > 0 ? C.buton("Înapoi", "interese.pagina", String(p - 1)) : "") +
      C.buton(p < pg.length - 1 ? "Continuă" : "Vezi rezultatul", "interese.pagina", String(p + 1), p < pg.length - 1 ? "continua" : "primar") + "</div>";
    return C.pagina("Test de interese", corp, "interese/intro");
  }

  function rezultat() {
    var r = S.ia("interese.top", null);
    if (!r) return intro();
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
    start: function () { C.mergi("interese/test"); },
    pagina: function (arg) {
      var pg = pagini(), p = Number(S.ia("interese.pagina", 0)), nou = Number(arg);
      if (nou > p) {
        var lipsa = pg[p].some(function (q) { return !S.ia("interese.r." + q.id, null); });
        if (lipsa) { C.eroare = "Mai ai afirmații fără răspuns. Alege câte o variantă pentru fiecare."; return; }
      }
      if (nou >= pg.length) {
        var rez = calculeaza(S.ia("interese.r", {}));
        S.pune("interese.scor", rez.scor);
        S.pune("interese.top", rez.top);
        C.mergi("interese/rezultat");
        return;
      }
      S.pune("interese.pagina", Math.max(0, nou));
      C.eroare = "";
    },
    refa: function () {
      S.pune("interese.r", {}); S.pune("interese.pagina", 0); S.pune("interese.top", null);
      C.mergi("interese/test");
    }
  };

  C.reg("interese", {
    ecran: function (sub) { return sub === "test" ? test() : sub === "rezultat" ? rezultat() : intro(); },
    actiuni: actiuni,
    calculeaza: calculeaza
  });
})(typeof window !== "undefined" ? window : globalThis);
