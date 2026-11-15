/* „Limbajul corpului și ținuta” (adulți): ce arată studiile, sfaturi practice, ținuta de bifat și un exercițiu cu telefonul.
   Bifele și răspunsul rămân doar pe telefon. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, B = g.DATE.corp, D = B;

  /* Elevii primesc textele din B.elev; ce lipsește acolo rămâne ca la adulți. */
  function alege() {
    if (C.eAdult()) return B;
    var E = B.elev, R = Object.assign({}, B, E);
    ["semne", "tinuta", "exercitiu"].forEach(function (k) { R[k] = Object.assign({}, B[k], E[k] || {}); });
    return R;
  }

  function lista(a) { return "<ul>" + a.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"; }
  function bife(L) {
    return L.map(function (x) {
      return '<label class="val"><input type="checkbox" data-chg="corp.bifa" value="' + x.id + '"' + (S.ia("corp.b." + x.id, false) ? " checked" : "") +
        "><span>" + esc(x.t) + (x.d ? "<small>" + esc(x.d) + "</small>" : "") + "</span></label>";
    }).join("");
  }
  function butonFinal() {
    var u = C.eAdult() && C.module.adult && C.module.adult.urmator("corp");
    return u ? C.buton("Continuă: " + esc(u.t), "nav", u.ecran, "continua") : C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar");
  }
  function inapoi() { return '<div class="rand">' + C.buton("Înapoi", "nav", "corp/intro") + "</div>"; }

  function intro() {
    var corp = D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + lista(D.trei) +
      "<p>" + esc(D.dupa) + '</p><p class="mic">' + esc(D.sursa) + "</p>" +
      '<div class="meniu-lista">' + D.meniu.map(function (m, i) {
        return C.buton("<strong>" + (i + 1) + ". " + esc(m.t) + '</strong><span class="stare">' + esc(m.d) + "</span>", "nav", "corp/" + m.id, "lista");
      }).join("") + "</div>" +
      (S.ia("corp.gata", false) ? '<div class="rand">' + butonFinal() + "</div>" : "");
    return C.pagina(D.titlu, corp, C.acasa());
  }

  function semne() {
    var M = D.semne;
    var corp = '<section class="card stil-asertiv"><h2>' + esc(M.studiiTitlu) + "</h2>" + lista(M.studii) + "</section>" +
      '<section class="card"><h2>' + esc(M.practicTitlu) + '</h2>' + lista(M.practic) + "</section>" +
      '<section class="card"><h2>' + esc(M.onlineTitlu) + "</h2>" + lista(M.online) + "</section>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", "corp/intro") + C.buton("Continuă: " + esc(D.tinuta.titlu), "nav", "corp/tinuta", "continua") + "</div>";
    return C.pagina(M.titlu, corp, "corp/intro");
  }

  function toateBifate() { return D.tinuta.lista.every(function (x) { return S.ia("corp.b." + x.id, false); }); }
  function tinuta() {
    var T = D.tinuta;
    var corp = (T.explica ? "<p>" + esc(T.explica) + "</p>" : "") + "<p><strong>" + esc(T.bifeaza) + "</strong></p>" + bife(T.lista) +
      '<div id="corp-toate" role="status">' + (toateBifate() ? '<p class="felicitare">' + esc(T.toate) + "</p>" : "") + "</div>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", "corp/intro") + C.buton("Continuă: Exersează", "nav", "corp/exercitiu", "continua") + "</div>";
    return C.pagina(T.titlu, corp, "corp/intro");
  }

  function exercitiu() {
    var E = D.exercitiu;
    var corp = '<ol class="pasi">' + E.pasi.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>" +
      bife(E.lista) + C.camp("corp.schimb", esc(E.schimb), esc(E.schimbAjutor), 3) +
      '<p class="mic">' + esc(E.sterge) + "</p>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", "corp/intro") + C.buton(esc(E.gata), "corp.gata", null, "primar") + "</div>";
    return C.pagina(E.titlu, corp, "corp/intro");
  }

  function final() {
    var F = D.final, sch = String(S.ia("corp.schimb", "") || "").trim();
    var corp = '<p class="felicitare">' + esc(F.felicitare) + "</p>" +
      (sch ? '<section class="card"><h2>' + esc(F.tau) + '</h2><p class="citat">' + C.escSimplu(sch) + "</p></section>" : "") +
      "<p>" + esc(F.repeta) + "</p>" +
      '<div class="rand">' + C.buton("Înapoi la secțiune", "nav", "corp/intro") + butonFinal() + "</div>";
    return C.pagina(F.titlu, corp, "corp/intro");
  }

  C.reg("corp", {
    ecran: function (sub) {
      D = alege();
      if (sub === "semne") return semne();
      if (sub === "tinuta") return tinuta();
      if (sub === "exercitiu") return exercitiu();
      if (sub === "gata") return final();
      return intro();
    },
    actiuni: {
      bifa: function (id, el) {
        D = alege();
        S.pune("corp.b." + id, !!(el && el.checked));
        var z = g.document && g.document.getElementById("corp-toate");
        if (z) z.innerHTML = toateBifate() ? '<p class="felicitare">' + esc(D.tinuta.toate) + "</p>" : "";
        return false;
      },
      gata: function () { S.pune("corp.gata", true); C.mergi("corp/gata"); }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
