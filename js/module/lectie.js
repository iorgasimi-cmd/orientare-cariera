/* Lecțiile scurte: o întrebare pe ecran, două variante mari, răspuns imediat de la Bosi (față veselă când e corect).
   Răspunsul greșit nu e pedepsit: Bosi explică, iar omul vede varianta corectă. Totul rămâne pe telefon. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.lectii;

  function inl(t, v) { Object.keys(v).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }
  function ales(id, i) { var v = S.ia("lectie." + id + ".r" + i, null); return v === null || v === "" ? -1 : Number(v); }
  function corecte(id) {
    var L = D[id]; return L.intrebari.filter(function (q, i) { var a = ales(id, i); return a >= 0 && q.opt[a] && q.opt[a].ok; }).length;
  }

  function intrebare(id, i) {
    var L = D[id], q = L.intrebari[i], n = L.intrebari.length, a = ales(id, i), raspuns = a >= 0;
    var corp = '<progress class="progres" max="' + n + '" value="' + (i + (raspuns ? 1 : 0)) + '" aria-label="Progres"></progress>' +
      '<p class="mic">' + esc(inl(D.progres, { i: i + 1, n: n })) + "</p>" +
      C.bosi(q.q) + '<div class="meniu-lista optiuni">' + q.opt.map(function (o, k) {
        var cls = "lista mare";
        var semn = "";
        if (raspuns) {
          if (o.ok) { cls += " salvat"; semn = "✓ "; } else if (k === a) { semn = "✗ "; }
        }
        return raspuns ? '<p class="optiune' + (o.ok ? " corect" : (k === a ? " gresit" : "")) + '">' + semn + esc(o.t) + "</p>"
          : C.buton(esc(o.t), "lectie.alege", id + "|" + i + "|" + k, cls);
      }).join("") + "</div>";
    if (raspuns) {
      var ok = q.opt[a] && q.opt[a].ok;
      corp += '<div id="lectie-raspuns" role="status">' + C.bosi(ok ? q.bine : q.gresit, ok ? "bucurie" : "zambet") + "</div>" +
        '<div class="rand">' + C.buton(esc(D.continua), "nav", "lectie/" + id + "/" + (i + 1 < n ? i + 1 : "final"), "continua") + "</div>";
    }
    return C.pagina(L.titlu, corp, C.acasa());
  }

  function final(id) {
    var L = D[id], n = L.intrebari.length;
    var corp = C.bosi(L.final, "bucurie") + '<p class="felicitare">' + esc(inl(D.scor, { k: corecte(id), n: n })) + "</p>" +
      '<div class="rand">' + C.buton(esc(D.refa), "lectie.refa", id) + C.buton(esc(L.dupa.t), "nav", L.dupa.ecran, "continua") + "</div>";
    return C.pagina(L.titlu, corp, C.acasa());
  }

  /* Butonul care deschide lecția, pus pe prima pagină a secțiunii. */
  C.butonLectie = function (id) {
    if (!D[id]) return "";
    var gata = S.ia("lectie." + id + ".gata", false);
    return '<div class="rand">' + C.buton((gata ? "✓ " : "") + esc(D.buton), "nav", gata ? "lectie/" + id + "/final" : "lectie/" + id + "/0", gata ? "salvat" : "primar") + "</div>";
  };

  C.reg("lectie", {
    ecran: function (sub) {
      var m = /^([a-z]+)\/(\d+|final)$/.exec(sub || "");
      if (!m || !D[m[1]]) return C.pagina("Lecție", "", C.acasa());
      if (m[2] === "final") return final(m[1]);
      var i = Number(m[2]);
      return i < D[m[1]].intrebari.length ? intrebare(m[1], i) : final(m[1]);
    },
    actiuni: {
      alege: function (arg) {
        var p = String(arg).split("|"), id = p[0], i = Number(p[1]), k = Number(p[2]);
        if (!D[id] || ales(id, i) >= 0) return;
        S.pune("lectie." + id + ".r" + i, k);
        if (i === D[id].intrebari.length - 1) S.pune("lectie." + id + ".gata", true);
        C.deArata = "lectie-raspuns";
      },
      refa: function (id) { S.pune("lectie." + id, {}); C.mergi("lectie/" + id + "/0"); }
    },
    corecte: corecte
  });
})(typeof window !== "undefined" ? window : globalThis);
