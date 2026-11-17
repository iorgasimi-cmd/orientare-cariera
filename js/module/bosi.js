/* Faro, farul prietenos (în cod încă „bosi”, numele vechi): un desen mic (SVG, cu culorile din css/culori.css) și o bulă cu text, ca într-o conversație.
   Două fețe: „zambet” (de obicei) și „bucurie” (la felicitări). Fără animații. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.bosi;

  /* Faro: un far mic, cu fața pe turn și lumina aprinsă. */
  function desen(fata) {
    var ochi = fata === "bucurie"
      ? '<path class="b-trasatura" d="M26 34 q2.5 -3.5 5 0 M33 34 q2.5 -3.5 5 0"/>'
      : '<circle class="b-ochi" cx="28.5" cy="33" r="2.3"/><circle class="b-ochi" cx="35.5" cy="33" r="2.3"/>';
    return '<svg class="bosi-desen" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<path class="f-raza" d="M25 15 L6 9 L6 23 L25 20 Z M39 15 L58 9 L58 23 L39 20 Z"/>' +
      '<path class="f-acoperis" d="M23 14 L32 5 L41 14 Z"/>' +
      '<rect class="f-lumina" x="25" y="14" width="14" height="8" rx="1.5"/>' +
      '<rect class="f-acoperis" x="21.5" y="22" width="21" height="3.2" rx="1"/>' +
      '<path class="f-turn" d="M24 25.2 L40 25.2 L44 57 L20 57 Z"/>' +
      '<path class="f-dunga" d="M21.9 45 L42.1 45 L42.9 51 L21.1 51 Z"/>' +
      '<rect class="f-acoperis" x="16" y="57" width="32" height="3.5" rx="1.5"/>' +
      ochi + '<path class="b-trasatura" d="' + (fata === "bucurie" ? "M27 38 q5 6 10 0" : "M28 38.5 q4 4 8 0") + '"/>' +
      '<circle class="b-obraz" cx="25.5" cy="37" r="1.8"/><circle class="b-obraz" cx="38.5" cy="37" r="1.8"/></svg>';
  }

  /* Bosi spune un text. Textul poate avea **îngroșat**. */
  C.bosi = function (text, fata) {
    return '<div class="bosi">' + desen(fata) + '<p class="bula"><span class="sr">' + esc(D.nume) + ": </span>" + esc(text) + "</p></div>";
  };

  /* Drumul cu stații: o listă de butoane legate printr-o linie. Stația făcută are ✓, stația de acum îl are pe Bosi și „Ești aici”.
     Fiecare stație: { eticheta (HTML), ecran, gata, opt (opțională: nu poate fi „aici”) }. */
  C.drum = function (statii) {
    var aici = -1;
    statii.forEach(function (s, i) { if (aici < 0 && !s.gata && !s.opt) aici = i; });
    return '<ol class="drum">' + statii.map(function (s, i) {
      var cls = s.gata ? "statie gata" : (i === aici ? "statie aici" : "statie");
      var punct = s.gata ? '<span class="punct" aria-hidden="true">✓</span>'
        : i === aici ? '<span class="punct" aria-hidden="true">' + desen("zambet") + "</span>"
        : '<span class="punct" aria-hidden="true">' + (i + 1) + "</span>";
      return '<li class="' + cls + '">' + punct + (i === aici ? '<span class="eticheta-aici">' + esc(D.aici) + "</span>" : "") +
        C.buton(s.eticheta, "nav", s.ecran, "lista") + "</li>";
    }).join("") + "</ol>";
  };

  function inl(t, v) { Object.keys(v).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }

  /* Pașii elevului, în ordine, cu „făcut” sau nu (meniul elevului). */
  function pasiElev() {
    return [
      { t: "Test de interese", gata: !!S.ia("interese.top", null), ecran: "interese/intro" },
      { t: "Puncte forte și valori", gata: (S.ia("forte.valori", []) || []).length >= 3, ecran: "forte/intro" },
      { t: "Meserii și domenii", gata: (S.ia("meserii.salvate", []) || []).length > 0, ecran: "meserii/lista" },
      { t: "Planul meu", gata: !!S.ia("plan.start", null), ecran: "plan/hub" },
      { t: "Comunicarea asertivă", gata: !!S.ia("asertiv.gata", false), ecran: "asertiv/intro" },
      { t: "Valorile mele", gata: !!S.ia("vp.gata", false), ecran: "valorile/intro" },
      { t: "Cum mă văd eu", gata: !!S.ia("stima.gata", false), ecran: "stima/intro" },
      { t: g.DATE.corp ? g.DATE.corp.elev.titlu : "Limbajul corpului", gata: !!S.ia("corp.gata", false), ecran: "corp/intro" },
      { t: g.DATE.cerinte ? g.DATE.cerinte.titlu : "Ce cer angajatorii acum", gata: !!S.ia("cerinte.gata", false), ecran: "cerinte/lista" }
    ];
  }

  /* Salutul de pe ecranul principal: primul pas, pasul următor sau „ți-am păstrat locul” după câteva zile de pauză. */
  function salut() {
    var azi = C.azi(), ult = S.ia("bosi.ultima", "");
    if (ult && ult !== azi && C.zile(ult, azi) >= 2) S.pune("bosi.revenit", azi);
    S.pune("bosi.ultima", azi);
    var pasi = C.eAdult() ? (C.module.adult ? C.module.adult.pasiCuStare() : []) : pasiElev();
    var urm = pasi.filter(function (p) { return !p.gata; })[0];
    /* Întâi întrebarea „Cum te simți azi?”, o dată pe zi; apoi răspunsul potrivit. */
    var T = D.stare, z = S.ia("stare.zi", {}) || {}, r = z.data === azi ? z.r : "";
    if (!r) {
      return '<div class="stare-zi">' + C.bosi(S.ia("bosi.revenit", "") === azi ? T.revenit : T.intrebare) +
        '<div class="rand">' + T.optiuni.map(function (o) { return C.buton(esc(o[1]), "bosi.stare", o[0]); }).join("") + "</div></div>";
    }
    var schimb = '<div class="rand">' + C.buton(esc(T.schimb), "bosi.stare", "", "mic-btn") + "</div>";
    if (r === "nu") {
      return '<div class="stare-zi" id="stare-zi" role="status">' + C.bosi(T.nu) + '<p class="termen">' + esc(T.ajutor) + "</p>" + C.bosi(T.maine) + schimb + "</div>";
    }
    if (r === "asa") {
      return '<div class="stare-zi" id="stare-zi" role="status">' + C.bosi(T.asa) + '<div class="rand">' +
        C.buton(esc(T.butonMini), "nav", "plan/saptamana", "continua") + C.buton(esc(T.butonCaiet), "nav", "caiet/tot") + "</div>" + schimb + "</div>";
    }
    if (!urm) return '<div class="stare-zi" id="stare-zi">' + C.bosi(T.bineTot, "bucurie") + schimb + "</div>";
    return '<div class="stare-zi" id="stare-zi" role="status">' + C.bosi(inl(T.bine, { pas: urm.t }), "bucurie") +
      (urm.ecran ? '<div class="rand">' + C.buton(esc(T.butonBine), "nav", urm.ecran, "continua") + "</div>" : "") + schimb + "</div>";
  }

  C.reg("bosi", {
    ecran: function () { return C.pagina(D.nume, salut(), C.acasa()); },
    actiuni: {
      /* Răspunsul la „Cum te simți azi?”; gol = omul vrea să răspundă din nou. */
      stare: function (r) { S.pune("stare.zi", r ? { data: C.azi(), r: r } : {}); C.deArata = r ? "stare-zi" : ""; }
    },
    salut: salut,
    desen: desen
  });
})(typeof window !== "undefined" ? window : globalThis);
