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
      '<div class="rand">' + C.buton("Începem", "nav", S.ia("ghid.vazut", false) ? "elev/meniu" : "bosi/ghid/0", "primar") + C.buton("Schimb răspunsurile", "nav", "start") + "</div>";
    return C.pagina("Bine ai venit!", corp, "elev/clasa");
  }

  function pasStatus(gata) { return gata ? '<span class="stare gata">✓ făcut</span>' : '<span class="stare">○ de făcut</span>'; }

  /* Toți pașii elevului, în formatul cerut de carduri/paginaToate. */
  function statiiElev() {
    var test = !!S.ia("interese.top", null);
    var forte = (S.ia("forte.valori", []) || []).length >= 3;
    var plan = !!S.ia("plan.start", null);
    var vp = !!S.ia("vp.gata", false), st = !!S.ia("stima.gata", false);
    return [
      { nume: "Test de interese", ecran: test ? "interese/rezultat" : "interese/intro", gata: test },
      { nume: "Puncte forte și valori", ecran: forte ? "forte/rezumat" : "forte/intro", gata: forte },
      { nume: "Meserii și domenii", ecran: "meserii/lista", gata: (S.ia("meserii.salvate", []) || []).length > 0, opt: !test },
      { nume: "Planul meu", ecran: "plan/hub", gata: plan },
      { nume: "Sfaturi", ecran: "sfaturi/lista", gata: false, opt: true },
      { nume: "Comunicarea asertivă", ecran: "asertiv/intro", gata: !!S.ia("asertiv.gata", false) },
      { nume: "Valorile mele", ecran: vp ? "valorile/rezultat" : "valorile/intro", gata: vp },
      { nume: "Cum mă văd eu", ecran: st ? "stima/rezultat" : "stima/intro", gata: st },
      { nume: g.DATE.corp.elev.titlu, ecran: "corp/intro", gata: !!S.ia("corp.gata", false) },
      { nume: g.DATE.cerinte.titlu, ecran: "cerinte/lista", gata: !!S.ia("cerinte.gata", false) },
      { nume: g.DATE.cauta.titlu, ecran: "cauta/intro", gata: !!S.ia("cauta.gata", false) }
    ];
  }

  function meniu() {
    var B = g.Cariera.module.bosi, statii = statiiElev();
    var corp = (B ? B.inceput() : "") + (B ? B.teaserNoutati() : "") +
      (B ? C.cardulDeAcum(statii) : "") +
      '<div class="rand">' + C.buton("Vezi toate secțiunile (" + statii.length + ")", "nav", "elev/toate/0") + "</div>" +
      '<div class="rand rand-mic">' + C.buton("Caietul meu", "nav", "caiet/tot", "mic-btn") + C.buton("Înapoi", "nav", "sistem/setari", "mic-btn") + "</div>";
    corp += B ? B.teaser() : "";
    return C.pagina("Drumul tău", corp, null);
  }

  /* „Toate secțiunile”: tot drumul, pe pagini mici (câte un rând de carduri). */
  function toateElev(sub) { return C.paginaToate(statiiElev(), sub, "elev/meniu", "elev/toate"); }


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
    var corp = "<p><strong>Aplicația te ajută să te gândești la drumul tău în carieră.</strong></p>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", "sistem/setari", "primar") + "</div>";
    return C.pagina("Despre aplicație", corp, "sistem/setari");
  }

  function criza() {
    var corp = "<p>Mulțumesc că ai scris asta. Se pare că poate treci printr-un moment greu. Nu ești singur(ă) și nu trebuie să rămâi singur(ă) cu asta.</p>" +
      (C.eAdult()
        ? "<p><strong>Te rog să vorbești cât mai curând cu cineva în care ai încredere.</strong> De exemplu: cineva din familie, un prieten apropiat, medicul de familie sau un specialist.</p>"
        : "<p><strong>Te rog să vorbești cât mai curând cu un adult în care ai încredere.</strong> De exemplu: un părinte sau o rudă, un profesor, consilierul școlii sau medicul de familie.</p>") +
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
    ecran: function (sub) {
      if (sub === "clasa") return clasa();
      if (sub === "bunvenit") return bunVenit();
      var t = /^toate(?:\/(\d+))?$/.exec(sub || "");
      if (t) return toateElev(t[1]);
      return meniu();
    },
    actiuni: {},
    /* Exportat ca Faro (din antet) să poată calcula progresul elevului, la fel ca pentru adulți. */
    statiiElev: statiiElev
  });
  C.reg("start", { ecran: start, actiuni: {} });
})(typeof window !== "undefined" ? window : globalThis);
