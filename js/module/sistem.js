/* Agentul principal („găzda"): ecranul de început (vârsta), alegerea traseului, meniul elevului,
   setări, „Despre date", „Despre", „Șterge tot" și oprirea blândă când cineva pare într-un moment greu.
   Nu cere nume, e-mail, telefon sau alte date personale. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc;

  var VARSTE = [
    { id: "sub18", t: "Sub 18 ani" },
    { id: "18-44", t: "18–44 de ani" },
    { id: "45+", t: "45 de ani sau mai mult" }
  ];
  var CLASE = [
    { id: "9", t: "Clasa a IX-a" }, { id: "10", t: "Clasa a X-a" },
    { id: "11", t: "Clasa a XI-a" }, { id: "12", t: "Clasa a XII-a" },
    { id: "alta", t: "Nu sunt la liceu acum" }
  ];

  /* Alegerea traseului după vârstă. În etapa 1 funcționează traseul pentru elevi. */
  function traseu(varsta) {
    if (varsta === "sub18") return "elev/meniu";
    return S.ia("situatie", "") ? "adult/meniu" : "adult/situatie";
  }

  function start() {
    var corp = (C.bosi ? C.bosi(g.DATE.bosi.start) : "") + "<p>Afli ce îți place, la ce ești bun(ă) și ce poți face mai departe.</p>" +
      '<h2 class="intrebare-titlu">Câți ani ai?</h2><div class="meniu-lista">' +
      VARSTE.map(function (v) { return C.buton(esc(v.t), "sistem.varsta", v.id, "lista mare"); }).join("") + "</div>";
    return C.pagina("Orientare în carieră", corp, null);
  }

  function clasa() {
    var corp = "<p>Sfaturile se potrivesc diferit în funcție de clasă.</p>" +
      '<div class="meniu-lista">' + CLASE.map(function (c) { return C.buton(esc(c.t), "sistem.clasa", c.id, "lista mare"); }).join("") + "</div>";
    return C.pagina("În ce clasă ești?", corp, "start");
  }

  function bunVenit() {
    var corp = (C.bosi ? C.bosi(C.faro("bunVenit")) : "") + "<p>Iată ce urmează. Poți face pașii în ordinea ta și te poți opri oricând.</p>" +
      '<ol class="pasi"><li>Un test de interese: ce îți place să faci.</li><li>Punctele tale forte și ce contează pentru tine.</li><li>Idei de meserii și domenii.</li><li>Un plan mic, cu o temă pe săptămână.</li><li>Sfaturi scurte.</li><li>Cum spui clar ce vrei, inclusiv unui program de IA.</li><li>Ce valori contează pentru tine și cum te vezi.</li></ol>' +
      '<div class="rand">' + C.buton("Începem", "nav", "elev/meniu", "primar") + C.buton("Schimb răspunsurile", "nav", "start") + "</div>";
    return C.pagina("Bine ai venit!", corp, "elev/clasa");
  }

  function pasStatus(gata) { return gata ? '<span class="stare gata">✓ făcut</span>' : '<span class="stare">○ de făcut</span>'; }

  function meniu() {
    var test = !!S.ia("interese.top", null);
    var forte = (S.ia("forte.valori", []) || []).length >= 3;
    var plan = !!S.ia("plan.start", null);
    var corp = "";
    if (g.Cariera.module.bosi) corp += g.Cariera.module.bosi.salut();
    if (g.Cariera.module.reamintiri) corp += g.Cariera.module.reamintiri.banner();
    if (g.Cariera.module.retine) corp += g.Cariera.module.retine.banner();
    var vp = !!S.ia("vp.gata", false), st = !!S.ia("stima.gata", false);
    corp += C.drum([
      { eticheta: "<strong>1. Test de interese</strong>" + pasStatus(test), ecran: test ? "interese/rezultat" : "interese/intro", gata: test },
      { eticheta: "<strong>2. Puncte forte și valori</strong>" + pasStatus(forte), ecran: forte ? "forte/rezumat" : "forte/intro", gata: forte },
      { eticheta: "<strong>3. Meserii și domenii</strong><span class=\"stare\">" + (test ? "idei pentru tine" : "mai întâi testul") + "</span>", ecran: "meserii/lista", gata: (S.ia("meserii.salvate", []) || []).length > 0, opt: !test },
      { eticheta: "<strong>4. Planul meu</strong>" + pasStatus(plan), ecran: "plan/hub", gata: plan },
      { eticheta: "<strong>5. Sfaturi</strong><span class=\"stare\">citire scurtă</span>", ecran: "sfaturi/lista", gata: false, opt: true },
      { eticheta: "<strong>6. Comunicarea asertivă</strong>" + pasStatus(!!S.ia("asertiv.gata", false)), ecran: "asertiv/intro", gata: !!S.ia("asertiv.gata", false) },
      { eticheta: "<strong>7. Valorile mele</strong>" + pasStatus(vp), ecran: vp ? "valorile/rezultat" : "valorile/intro", gata: vp },
      { eticheta: "<strong>8. Cum mă văd eu</strong>" + pasStatus(st), ecran: st ? "stima/rezultat" : "stima/intro", gata: st },
      { eticheta: "<strong>9. " + C.esc(g.DATE.corp.elev.titlu) + "</strong>" + pasStatus(!!S.ia("corp.gata", false)), ecran: "corp/intro", gata: !!S.ia("corp.gata", false) },
      { eticheta: "<strong>10. " + C.esc(g.DATE.cerinte.titlu) + "</strong>" + pasStatus(!!S.ia("cerinte.gata", false)), ecran: "cerinte/lista", gata: !!S.ia("cerinte.gata", false) }
    ]) +
      '<div class="rand">' + C.buton("Caietul meu", "nav", "caiet/tot") + "</div>";
    return C.pagina("Drumul tău", corp, null);
  }


  function setari() {
    var notif = S.ia("rem.notif", false);
    var corp = '<section class="card"><h2>Răspunsurile mele</h2><p>Vârsta: <strong>' + esc((VARSTE.filter(function (v) { return v.id === S.ia("varsta", ""); })[0] || { t: "nealeasă" }).t) +
      "</strong>" + (S.ia("varsta", "") && S.ia("varsta", "") !== "sub18" && C.module.adult && C.module.adult.situatia() ? "<br>Situația: <strong>" + esc(C.module.adult.situatia().t) + "</strong>" : "") +
      (S.ia("varsta", "") === "sub18" && S.ia("clasa", "") ? "<br>Clasa: <strong>" + esc((CLASE.filter(function (c) { return c.id === S.ia("clasa", ""); })[0] || { t: "" }).t) + "</strong>" : "") +
      '</p><div class="rand">' + C.buton("Schimb răspunsurile", "nav", "start") + "</div></section>" +
      '<section class="card"><h2>Reamintiri</h2>' +
      '<div class="rand">' + C.buton(notif ? "Opresc notificările" : "Vreau notificări", "reamintiri.notificari") + "</div></section>" +
      '<section class="card"><h2>Date</h2><div class="rand">' + C.buton("Despre date", "nav", "sistem/date") + C.buton("Despre aplicație", "nav", "sistem/despre") + C.buton("Șterge tot", "nav", "sistem/sterge", "pericol") + "</div></section>";
    return C.pagina("Setări", corp, S.ia("varsta", "") ? traseu(S.ia("varsta", "")) : "start");
  }

  function sterge() {
    var corp = "<p>Se șterg toate răspunsurile, rezultatele și planul de pe acest telefon. Nu se poate anula.</p>" +
      '<div class="rand">' + C.buton("Da, șterge tot", "sistem.sterge_tot", null, "pericol") + C.buton("Nu, mă întorc", "nav", "sistem/setari", "primar") + "</div>";
    return C.pagina("Ștergi tot?", corp, "sistem/setari");
  }

  function date() {
    var corp = "<p><strong>Ce se salvează:</strong> răspunsurile tale la întrebări, rezultatul testului, domeniile salvate și planul tău.</p>" +
      "<p><strong>Unde:</strong> doar pe acest telefon, în browser. Nu există cont, server sau altă aplicație care să primească datele tale. Nu există analiză de trafic sau reclame.</p>" +
      "<p><strong>Cât timp:</strong> până le ștergi tu, din „Setări”, butonul „Șterge tot”, sau până ștergi datele browserului.</p>" +
      "<p><strong>Dacă schimbi telefonul</strong> sau ștergi datele browserului, progresul se pierde.</p>" +
      "<p>Nu îți cerem nume, e-mail, telefon sau adresă. Vârsta o alegi dintr-un interval.</p>" +
      (S.disponibil() ? "" : '<p class="nota"><strong>Atenție:</strong> acest browser nu lasă aplicația să salveze (poate e o fereastră privată). Progresul se pierde când închizi pagina.</p>') +
      (C.butonDatele ? C.butonDatele() : "") +
      '<div class="rand">' + C.buton("Înapoi", "nav", "sistem/setari", "primar") + "</div>";
    return C.pagina("Despre date", corp, "sistem/setari");
  }

  function despre() {
    var corp = "<p>Aplicația te ajută să te gândești la drumul tău în carieră.</p>" +
      "<p>Dacă te simți rău sau ești îngrijorat(ă), vorbește cu un adult de încredere, cu consilierul școlii sau cu medicul de familie. Dacă tu sau altcineva sunteți în pericol acum, sună la 112.</p>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", "sistem/setari", "primar") + "</div>";
    return C.pagina("Despre aplicație", corp, "sistem/setari");
  }

  function criza() {
    var corp = "<p>Mulțumesc că ai scris asta. Se pare că poate treci printr-un moment greu. Nu ești singur(ă) și nu trebuie să rămâi singur(ă) cu asta.</p>" +
      "<p>Te rog să vorbești cât mai curând cu un adult în care ai încredere: un părinte sau o rudă, un profesor, consilierul școlii sau medicul de familie.</p>" +
      '<p class="alerta"><strong>Dacă tu sau altcineva sunteți în pericol acum, sună la 112.</strong></p>' +
      '<div class="rand">' + C.buton("Mă întorc la aplicație", "sistem.inapoi", null, "primar") + "</div>";
    return C.pagina("Ești important(ă)", corp, null);
  }

  C.reg("sistem", {
    ecran: function (sub) {
      return ({ clasa: clasa, setari: setari, sterge: sterge, date: date, despre: despre, criza: criza })[sub] ? ({ clasa: clasa, setari: setari, sterge: sterge, date: date, despre: despre, criza: criza })[sub]() : start();
    },
    actiuni: {
      varsta: function (id) { S.pune("varsta", id); C.mergi(id === "sub18" ? "elev/clasa" : "adult/situatie"); },
      clasa: function (id) { S.pune("clasa", id); C.mergi("elev/bunvenit"); },
      sterge_tot: function () { S.sterge(); C.mergi("start"); },
      inapoi: function () { C.mergi(S.ia("varsta", "") ? traseu(S.ia("varsta", "")) : "start"); }
    },
    traseu: traseu
  });

  /* Ecrane ale traseului elevului, găzduite de agentul principal. */
  C.reg("elev", {
    ecran: function (sub) { return sub === "clasa" ? clasa() : sub === "bunvenit" ? bunVenit() : meniu(); },
    actiuni: {}
  });
  C.reg("start", { ecran: start, actiuni: {} });
})(typeof window !== "undefined" ? window : globalThis);
