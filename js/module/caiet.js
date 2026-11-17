/* „Caietul meu”: tot ce a scris omul, la un loc, ca să recitească ușor (recitirea și scrisul cu cuvintele tale ajută memoria).
   Apar doar părțile completate. Omul poate copia tot textul, de exemplu în notițele telefonului. Nimic nu pleacă de pe telefon. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, R = g.DATE.retine, K = R.caiet;

  function t(v) { return String(v == null ? "" : v).trim(); }

  /* Calcul pur, din ce e salvat: o listă de părți { titlu, randuri: [text] }, doar cele completate. */
  function parti() {
    var P = [], adult = C.eAdult(), D = g.DATE;
    var idei = Object.keys(R.sectiuni).filter(function (id) { return t(S.ia("caiet." + id + ".text", "")); }).map(function (id) {
      return C.module.retine.date(id).idee.replace(/\*\*/g, "") + " — " + t(S.ia("caiet." + id + ".text", ""));
    });
    if (idei.length) P.push({ titlu: K.idei, randuri: idei });
    var top = S.ia("interese.top", null);
    if (top && D.interese) P.push({ titlu: K.interese, randuri: top.map(function (x) { return D.interese.tipuri[x] ? D.interese.tipuri[x].nume : ""; }).filter(Boolean) });
    var mom = [0, 1, 2].map(function (i) { return t(S.ia("forte.m" + i, "")); }).filter(Boolean);
    if (mom.length) P.push({ titlu: K.forte, randuri: mom });
    var vtop = t(S.ia("vp.top", "")), trei = S.ia("vp.ales.p2", []) || [];
    if (vtop && S.ia("vp.gata", false)) P.push({ titlu: K.valori, randuri: trei.map(function (v, i) {
      var n = Number(S.ia("vp.nota.v" + i, 0));
      return v + (v === vtop ? " (cea mai importantă)" : "") + (n ? " – contează " + n + " din 10" : "");
    }) });
    if (adult && S.ia("roata.gata", false) && D.roata) {
      var rr = D.roata.zone.map(function (z) { return z.t + " – " + Number(S.ia("roata.n." + z.id, 0)) + " din 10"; });
      if (t(S.ia("roata.r.zona", ""))) rr.push(K.roataZona + " " + t(S.ia("roata.r.zona", "")));
      if (t(S.ia("roata.r.caut", ""))) rr.push(K.roataCaut + " " + t(S.ia("roata.r.caut", "")));
      P.push({ titlu: K.roata, randuri: rr });
    }
    var sal = S.ia("meserii.salvate", []) || [];
    if (!adult && sal.length && D.meserii) P.push({ titlu: K.meserii, randuri: sal.map(function (id) {
      var m = D.meserii.lista.filter(function (x) { return x.id === id; })[0]; return m ? m.nume : "";
    }).filter(Boolean) });
    if (adult && D.interviu) {
      var pov = [];
      for (var n = 1; n <= D.interviu.povesti.maxim; n++) {
        var p = S.ia("interviu.p.p" + n, {}) || {};
        var txt = ["titlu", "context", "fapta", "rezultat"].map(function (k) { return t(p[k]); }).filter(Boolean);
        if (txt.length) pov.push(txt.join(" "));
      }
      if (pov.length) P.push({ titlu: K.povesti, randuri: pov });
    }
    if (t(S.ia("corp.schimb", ""))) P.push({ titlu: K.corp, randuri: [t(S.ia("corp.schimb", ""))] });
    var pl = [], scop = t(S.ia("plan.scop.specific", "")) || t(S.ia("plan.scop.intentie", ""));
    if (scop) pl.push(K.scop + " " + scop);
    if (t(S.ia("plan.identitate", ""))) pl.push(K.identitate + " " + t(S.ia("plan.identitate", "")));
    if (C.module.plan && C.module.plan.frazaWoop()) pl.push(C.module.plan.frazaWoop());
    if (t(S.ia("plan.planB", ""))) pl.push(K.planB + " " + t(S.ia("plan.planB", "")));
    if (t(S.ia("plan.ajutor", ""))) pl.push(K.ajutor + " " + t(S.ia("plan.ajutor", "")));
    if (t(S.ia("plan.control.da", ""))) pl.push(K.control + " " + t(S.ia("plan.control.da", "")));
    if (S.ia("plan.start", null) && C.module.plan) {
      var tema = C.module.plan.textTema(C.saptamana());
      if (tema) pl.push(K.tema + " " + tema.replace(/\*\*/g, ""));
      var fr = C.module.plan.frazaObicei("plan.sapt.s" + C.saptamana());
      if (fr) pl.push(fr);
    }
    if (pl.length) P.push({ titlu: K.plan, randuri: pl });
    return P;
  }

  function textCopiat(P) {
    return K.titlu + "\n\n" + P.map(function (p) { return p.titlu + "\n" + p.randuri.map(function (r) { return "- " + r; }).join("\n"); }).join("\n\n");
  }

  function ecran() {
    var P = parti();
    var corp = "<p>" + esc(K.intro) + "</p>" +
      (P.length ? P.map(function (p) {
        return '<section class="card"><h2>' + esc(p.titlu) + "</h2><ul>" + p.randuri.map(function (r) { return "<li>" + C.escSimplu(r) + "</li>"; }).join("") + "</ul></section>";
      }).join("") +
        "<details><summary>" + esc(K.copiaza) + '</summary><p class="mic">' + esc(K.copiazaAjutor) + "</p>" +
        '<div class="camp"><label for="c-caiet">' + esc(K.titlu) + '</label><textarea id="c-caiet" rows="8" readonly>' + C.escSimplu(textCopiat(P)) + "</textarea></div>" +
        '<div class="rand">' + C.buton(esc(K.copiaza), "caiet.copiaza", null, "continua") + '</div><p id="stare-caiet" class="mic" role="status"></p></details>'
        : "<p>" + esc(K.gol) + "</p>") +
      '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar") + "</div>";
    return C.pagina(K.titlu, corp, C.acasa());
  }

  C.reg("caiet", {
    ecran: function () { return ecran(); },
    actiuni: { copiaza: function () { C.copiaza("c-caiet", "stare-caiet", K.copiat, K.selectat); return false; } },
    parti: parti, textCopiat: textCopiat
  });
})(typeof window !== "undefined" ? window : globalThis);
