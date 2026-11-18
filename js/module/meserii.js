/* Subagent 6: meserii și domenii.
   Propune 5–8 domenii pe baza primelor trei tipuri din test și a valorilor alese.
   Nu spune „aceasta e meseria ta”, ci „poate te interesează”. Elevul salvează ce îi place. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.meserii, V = g.DATE.valori, esc = C.esc;
  var MAX_AFISATE = 8;

  /* Calcul pur: scor = potrivire cu tipurile (3, 2, 1 puncte) + 1 punct pentru fiecare valoare comună. */
  function clasament(top, valori) {
    return D.lista.map(function (m) {
      var scor = 0;
      (top || []).forEach(function (t, i) { if (m.tipuri.indexOf(t) >= 0) scor += 3 - i; });
      (valori || []).forEach(function (v) { if (m.valori.indexOf(v) >= 0) scor += 1; });
      return { m: m, scor: scor };
    }).filter(function (x) { return x.scor > 0; })
      .sort(function (a, b) { return b.scor - a.scor || a.m.nume.localeCompare(b.m.nume, "ro"); });
  }

  function cartela(m) {
    var salvata = S.ia("meserii.salvate", []).indexOf(m.id) >= 0;
    return '<section class="card meserie"><h2>' + esc(m.nume) + "</h2>" +
      "<p><strong>Ce face:</strong> " + esc(m.ceFace) + "</p>" +
      "<p><strong>Ce se învață:</strong> " + esc(m.ceInvata) + "</p>" +
      "<p><strong>Ce drumuri duc spre ea:</strong> " + esc(m.drumuri) + "</p>" +
      "<p><strong>Alte drumuri:</strong> " + esc(m.alte) + "</p>" +
      '<div class="rand">' + C.buton(salvata ? "✓ Salvată (apasă ca să scoți)" : "Mă interesează, o salvez", "meserii.salveaza", m.id, salvata ? "salvat" : "") + "</div></section>";
  }

  function lista() {
    var top = S.ia("interese.top", null);
    if (!top) {
      return C.pagina("Meserii și domenii",
        "<p>Ca să-ți arăt idei potrivite, mai întâi am nevoie de testul de interese.</p>" +
        '<div class="rand">' + C.buton("Fac testul", "nav", "interese/intro", "primar") + C.buton("Vreau să văd toate domeniile", "nav", "meserii/toate") + "</div>");
    }
    var cl = clasament(top, S.ia("forte.valori", [])).slice(0, MAX_AFISATE);
    var corp = "<p>Pe baza răspunsurilor tale, poate te interesează aceste domenii. Sunt doar idei: poți salva ce ți se pare interesant.</p>" +
      '<p class="nota">' + esc(D.nota) + "</p>";
    corp += cl.map(function (x) { return cartela(x.m); }).join("");
    corp += C.retine("meserii");
    corp += '<div class="rand">' + C.buton("Văd domeniile salvate", "nav", "meserii/salvate") + C.buton("Văd toate domeniile", "nav", "meserii/toate") +
      C.buton("Continuă: planul meu", "nav", "plan/hub", "continua") + "</div>";
    return C.pagina("Poate te interesează", corp);
  }

  function toate() {
    var corp = '<p class="nota">' + esc(D.nota) + "</p>" + D.lista.map(cartela).join("");
    return C.pagina("Toate domeniile", corp, "meserii/lista");
  }

  function salvate() {
    var ids = S.ia("meserii.salvate", []);
    var corp = ids.length ? D.lista.filter(function (m) { return ids.indexOf(m.id) >= 0; }).map(cartela).join("") :
      "<p>Nu ai salvat încă nimic. Când găsești un domeniu care ți se pare interesant, apasă „Mă interesează”.</p>";
    return C.pagina("Domeniile salvate", corp + '<p class="nota">' + esc(D.nota) + "</p>", "meserii/lista");
  }

  C.reg("meserii", {
    ecran: function (sub) { return sub === "toate" ? toate() : sub === "salvate" ? salvate() : lista(); },
    actiuni: {
      salveaza: function (id) {
        var l = S.ia("meserii.salvate", []).slice(), i = l.indexOf(id);
        if (i >= 0) l.splice(i, 1); else l.push(id);
        S.pune("meserii.salvate", l);
      }
    },
    clasament: clasament
  });
})(typeof window !== "undefined" ? window : globalThis);
