/* Subagent 10: scrisoarea de intenție (doar pentru adulți).
   Pune întrebări una câte una, apoi arată un schelet cu trei paragrafe, făcut din răspunsurile omului.
   Nu scrie scrisoarea în locul omului. Pentru cine vrea, pregătește un prompt de copiat într-un chat cu IA. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.scrisoare, esc = C.esc;

  function r(id) { return String(S.ia("scrisoare.r." + id, "") || "").trim(); }
  function inlocuieste(t, valori) {
    Object.keys(valori).forEach(function (k) { t = t.split("{" + k + "}").join(valori[k]); });
    return t;
  }

  function intro() {
    var corp = D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="rand">' + C.buton("Începem", "nav", "scrisoare/q0", "primar") +
      (r("post") || r("atrage") ? C.buton("Văd scheletul", "nav", "scrisoare/schelet") : "") + "</div>";
    return C.pagina(D.titlu, corp, "adult/meniu");
  }

  function ajutor(q) {
    var sit = S.ia("situatie", "");
    var a = (q.ajutorSit && q.ajutorSit[sit]) || q.ajutor;
    if (q.ajutor45 && S.ia("varsta", "") === "45+") a += " " + q.ajutor45;
    return a;
  }

  function intrebare(i) {
    var q = D.intrebari[i], n = D.intrebari.length;
    var corp = '<p class="mic">Întrebarea ' + (i + 1) + " din " + n + "</p>" +
      C.camp("scrisoare.r." + q.id, esc(q.q), esc(ajutor(q)), q.randuri) +
      '<div class="rand">' + C.buton("Înapoi", "nav", i === 0 ? "scrisoare/intro" : "scrisoare/q" + (i - 1)) +
      (i < n - 1 ? C.buton("Continuă", "nav", "scrisoare/q" + (i + 1), "continua") : C.buton("Văd scheletul", "scrisoare.gata", null, "primar")) + "</div>";
    return C.pagina(D.titlu, corp, "scrisoare/intro");
  }

  function schelet() {
    var Sk = D.schelet;
    /* „În zilele lucrătoare.” devine „(în zilele lucrătoare)”, ca să se potrivească în mijlocul propoziției. */
    var disp = r("disponibil").replace(/[\s.!;,]+$/, "");
    if (disp) disp = disp.charAt(0).toLowerCase() + disp.slice(1);
    var val = { firma: esc(r("firma").replace(/[\s.!;,]+$/, "") || Sk.firmaGol), post: esc(r("post").replace(/[\s.!;,]+$/, "") || Sk.postGol), disp: disp ? " (" + esc(disp) + ")" : "" };
    var corp = "<p>" + esc(Sk.explica) + "</p>";
    Sk.paragrafe.forEach(function (p) {
      corp += '<section class="card"><h2>' + esc(p.titlu) + "</h2><p>" + inlocuieste(esc(p.ghid), val) + "</p>";
      p.din.forEach(function (id) {
        var i = D.intrebari.map(function (q) { return q.id; }).indexOf(id);
        corp += '<p class="mic"><strong>' + esc(Sk.etichete[id]) + ":</strong></p>" +
          (r(id) ? '<p class="citat">' + esc(r(id)) + "</p>"
            : '<p class="mic">— ' + esc(Sk.lipsa) + "</p>" + '<div class="rand">' + C.buton("Completez", "nav", "scrisoare/q" + i) + "</div>");
      });
      corp += "</section>";
    });
    corp += "<p>" + esc(Sk.final) + "</p>" +
      '<section class="card"><h2>' + esc(D.verificare.titlu) + '</h2><ul>' + D.verificare.lista.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>" +
      '<section class="card"><h2>Vrei ajutor de la o IA?</h2><p>' + esc(D.ia.cartela) + '</p><div class="rand">' + C.buton("Văd cum", "nav", "scrisoare/ia", "primar") + "</div></section>" +
      '<div class="rand">' + C.buton("Schimb răspunsurile", "nav", "scrisoare/q0") + C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar") + "</div>";
    return C.pagina("Scheletul scrisorii", corp, "adult/meniu");
  }

  /* Calcul pur: promptul pentru IA, cu răspunsurile omului. Nu conține vârsta. */
  function promptIA(raspunsuri, situatie) {
    var P = D.ia.prompt, l = [P.inceput, "", "Reguli:"];
    P.reguli.forEach(function (x) { l.push("- " + x); });
    if (situatie && P.situatii[situatie]) l.push("", P.situatii[situatie]);
    l.push("", P.date);
    D.intrebari.forEach(function (q) {
      var v = String((raspunsuri && raspunsuri[q.id]) || "").trim().replace(/\s*\n\s*/g, " ");
      l.push("- " + P.etichete[q.id] + ": " + (v || P.lipsa));
    });
    return l.join("\n");
  }

  function ghidIA() {
    var I = D.ia, raspunsuri = {};
    D.intrebari.forEach(function (q) { raspunsuri[q.id] = r(q.id); });
    var corp = C.ghidIA() +
      '<p class="alerta"><strong>Atenție:</strong> ' + esc(I.atentie) + "</p>" +
      '<h2>Cum faci</h2><ol class="pasi">' + I.sfaturi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" +
      '<div class="camp"><label for="c-prompt-scrisoare">Promptul de copiat</label>' +
      '<textarea id="c-prompt-scrisoare" rows="14" readonly>' + C.escSimplu(promptIA(raspunsuri, S.ia("situatie", ""))) + "</textarea></div>" +
      '<div class="rand">' + C.buton("Copiază", "scrisoare.copiaza", null, "continua") + "</div>" +
      '<p id="stare-copiere-scrisoare" class="mic" role="status"></p>' +
      '<div class="rand">' + C.buton("Înapoi la schelet", "nav", "scrisoare/schelet") + C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar") + "</div>";
    return C.pagina(I.titlu, corp, "scrisoare/schelet");
  }

  C.reg("scrisoare", {
    ecran: function (sub) {
      var m = /^q(\d)$/.exec(sub || "");
      if (m && D.intrebari[Number(m[1])]) return intrebare(Number(m[1]));
      if (sub === "schelet") return schelet();
      if (sub === "ia") return ghidIA();
      return intro();
    },
    actiuni: {
      gata: function () { S.pune("scrisoare.gata", true); C.mergi("scrisoare/schelet"); },
      copiaza: function () { C.copiaza("c-prompt-scrisoare", "stare-copiere-scrisoare", D.ia.copiat, D.ia.selectat); return false; }
    },
    promptIA: promptIA
  });
})(typeof window !== "undefined" ? window : globalThis);
