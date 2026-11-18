/* Subagent 2: puncte forte și valori.
   Momente de succes, cele 4 cercuri (pe ecran fără cuvinte japoneze, la cererea autoarei), valori de carieră (ancore Schein).
   Aplicația nu dă note: arată ce a scris omul și întreabă dacă se recunoaște. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.valori, esc = C.esc;
  var PASI = ["intro", "m0", "m1", "m2", "ik0", "ik1", "ik2", "ik3", "valori", "rezumat"];
  var MIN = 3, MAX = 5;

  function nav(sub, inapoi, inainte, etInainte) {
    return '<div class="rand">' + (inapoi ? C.buton("Înapoi", "nav", "forte/" + inapoi) : "") +
      (inainte ? C.buton(etInainte || "Continuă", "nav", "forte/" + inainte, etInainte ? "primar" : "continua") : "") + "</div>";
  }
  function pas(sub) {
    var i = PASI.indexOf(sub);
    return { inapoi: i > 0 ? PASI[i - 1] : null, inainte: i < PASI.length - 1 ? PASI[i + 1] : null };
  }
  function progres(sub) {
    var i = PASI.indexOf(sub);
    return '<p class="mic">Pasul ' + i + " din " + (PASI.length - 1) + "</p>";
  }

  /* Pentru adulți: butonul spre pasul următor din traseul lor (sau înapoi la meniu). */
  function butonUrmator(id) {
    var u = C.module.adult && C.module.adult.urmator(id);
    return u ? C.buton("Continuă: " + esc(u.t), "nav", u.ecran, "continua") : C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "continua");
  }

  function intro() {
    var corp = "<p><strong>Afli la ce ești bun(ă) din lucruri pe care chiar le-ai făcut.</strong> Nu te întreb „ce calități ai”: așa ies răspunsuri generale. Povestești câteva întâmplări, iar eu ți le arăt înapoi.</p>" +
      "<p>Sunt trei pași: momente în care ți-a ieșit bine, patru întrebări despre tine și 3–5 lucruri care contează pentru tine la muncă.</p>" +
      '<p class="nota">Nu există răspunsuri greșite și poți lăsa câmpuri goale.</p>' + nav("intro", null, "m0", "Începem");
    return C.pagina("Punctele mele forte și valorile", corp, C.acasa());
  }

  function moment(i, sub) {
    var p = pas(sub);
    var corp = progres(sub) + C.camp("forte.m" + i, esc((C.eAdult() ? D.momenteAdult : D.momente)[i]), "", 5) + nav(sub, p.inapoi, p.inainte);
    return C.pagina("Un moment în care ți-a ieșit bine", corp, "forte/intro");
  }

  function ikigai(i, sub) {
    var q = D.ikigai[i], p = pas(sub);
    var corp = progres(sub) + (i === 0 ? "<p>Sunt patru întrebări, ca patru cercuri. Mai departe vei vedea unde se întâlnesc răspunsurile tale.</p>" : "") +
      C.camp("forte.ik." + q.id, esc(q.t), esc(q.ajutor), 4) + nav(sub, p.inapoi, p.inainte);
    return C.pagina("Cele 4 cercuri", corp, "forte/intro");
  }

  function valori() {
    var alese = S.ia("forte.valori", []), p = pas("valori");
    var corp = progres("valori") + "<p>Alege între " + MIN + " și " + MAX + " lucruri care contează cel mai mult pentru tine într-o meserie. Poți schimba oricând.</p>" +
      '<p class="mic">Ai ales: <strong id="nr-valori">' + alese.length + "</strong> din " + MAX + "</p>" +
      '<div class="lista-valori" role="group" aria-label="Valori">';
    D.lista.forEach(function (v) {
      corp += '<label class="val"><input type="checkbox" data-chg="forte.valoare" value="' + esc(v.id) + '"' +
        (alese.indexOf(v.id) >= 0 ? " checked" : "") + "><span><strong>" + esc(v.t) + "</strong><small>" + esc(v.d) + "</small></span></label>";
    });
    corp += "</div>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", "forte/" + p.inapoi) + C.buton("Continuă", "forte.valori_gata", null, "continua") + "</div>";
    return C.pagina("Ce contează pentru tine", corp, "forte/intro");
  }

  function rezumat() {
    var corp = "<p>Iată ce ai spus. Citește-le și spune-mi dacă te recunoști.</p>";
    var mom = [0, 1, 2].map(function (i) { return S.ia("forte.m" + i, ""); }).filter(Boolean);
    if (mom.length) corp += '<section class="card"><h2>Momente în care ți-a ieșit bine</h2>' + mom.map(function (m) { return "<p>" + esc(m) + "</p>"; }).join("") + "</section>";
    var ik = D.ikigai.filter(function (q) { return S.ia("forte.ik." + q.id, ""); });
    if (ik.length) corp += '<section class="card"><h2>Cele 4 cercuri</h2>' + ik.map(function (q) {
      return "<p><strong>" + esc(q.t) + "</strong><br>" + esc(S.ia("forte.ik." + q.id, "")) + "</p>";
    }).join("") + "</section>";
    var vs = S.ia("forte.valori", []);
    if (vs.length) corp += '<section class="card"><h2>Ce contează pentru tine</h2><ul>' + vs.map(function (id) {
      var v = D.lista.filter(function (x) { return x.id === id; })[0];
      return v ? "<li>" + esc(v.t) + "</li>" : "";
    }).join("") + "</ul></section>";
    if (!mom.length && !ik.length && !vs.length) corp += "<p>Încă nu ai scris nimic aici. Te poți întoarce oricând.</p>";
    var rec = S.ia("forte.recunosc", "");
    corp += '<fieldset class="intrebare"><legend>Te recunoști în ce ai citit?</legend><div class="scala trei">' +
      [["da", "Da"], ["aproape", "În mare parte"], ["nu", "Nu prea"]].map(function (o) {
        return '<label class="opt"><input type="radio" name="recunosc" value="' + o[0] + '" data-camp="forte.recunosc"' + (rec === o[0] ? " checked" : "") + "><span>" + o[1] + "</span></label>";
      }).join("") + "</div></fieldset>" +
      C.camp("forte.schimb", "Ce ai schimba sau ai adăuga?", "", 3) +
      C.retine("forte") +
      '<div class="rand">' + C.buton("Înapoi", "nav", "forte/valori") + (C.eAdult() ? butonUrmator("forte") : C.buton("Continuă: meserii", "nav", "meserii/lista", "continua")) + "</div>";
    return C.pagina("Ce ai spus despre tine", corp, C.acasa());
  }

  C.reg("forte", {
    ecran: function (sub) {
      if (sub === "intro" || !sub) return intro();
      var m = /^m([0-2])$/.exec(sub); if (m) return moment(Number(m[1]), sub);
      var k = /^ik([0-3])$/.exec(sub); if (k) return ikigai(Number(k[1]), sub);
      if (sub === "valori") return valori();
      return rezumat();
    },
    actiuni: {
      valoare: function (val, el) {
        var alese = S.ia("forte.valori", []).slice(), i = alese.indexOf(val);
        if (el.checked) {
          if (alese.length >= MAX) { el.checked = false; C.eroare = "Ai ales deja " + MAX + ", cât e nevoie. Dacă vrei alta, scoate una."; return; }
          if (i < 0) alese.push(val);
        } else if (i >= 0) alese.splice(i, 1);
        S.pune("forte.valori", alese);
        C.eroare = "";
        var nr = g.document && g.document.getElementById("nr-valori");
        if (nr) nr.textContent = alese.length;
        var zona = g.document && g.document.getElementById("eroare");
        if (zona) zona.textContent = "";
        return false; /* nu redesenăm: păstrăm poziția pe ecran */
      },
      valori_gata: function () {
        if (S.ia("forte.valori", []).length < MIN) { C.eroare = "Mai alege câteva, cel puțin " + MIN + ". Așa te pot ajuta mai bine."; return; }
        C.mergi("forte/rezumat");
      }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
