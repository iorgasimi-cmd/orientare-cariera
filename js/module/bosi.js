/* Simi, globul prietenos (în cod încă „bosi”, numele vechi; a fost întâi „Faro” și far): un desen mic (SVG, cu culorile din css/culori.css) și o bulă cu text, ca într-o conversație.
   Două fețe: „zambet” (de obicei) și „bucurie” (la felicitări). Fără animații. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.bosi;

  /* Simi: un glob pământesc mic, cu fața pe sferă. */
  function desen(fata) {
    var ochi = fata === "bucurie"
      ? '<path class="b-trasatura" d="M26 34 q2.5 -3.5 5 0 M33 34 q2.5 -3.5 5 0"/>'
      : '<circle class="b-ochi" cx="28.5" cy="33" r="2.3"/><circle class="b-ochi" cx="35.5" cy="33" r="2.3"/>';
    return '<svg class="bosi-desen" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<circle class="g-glob" cx="32" cy="34" r="23"/>' +
      '<ellipse class="g-continent" cx="24" cy="24" rx="7" ry="5" transform="rotate(-15 24 24)"/>' +
      '<ellipse class="g-continent" cx="40" cy="44" rx="7" ry="5" transform="rotate(20 40 44)"/>' +
      '<path class="g-linie" fill="none" d="M32 11 Q21 34 32 57 M32 11 Q43 34 32 57 M10.83 25 Q32 20 53.17 25 M10.83 43 Q32 48 53.17 43"/>' +
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
    /* Bara de progres, ca într-un joc: câți pași ai făcut din câți sunt. */
    var facute = statii.filter(function (s) { return s.gata; }).length, total = statii.length;
    var bara = '<div class="progres-drum"><p class="mic">Ai făcut <strong>' + facute + "</strong> din " + total + " pași.</p>" +
      '<progress class="progres" max="' + total + '" value="' + facute + '" aria-label="Pașii făcuți"></progress></div>';
    return bara + '<ol class="drum">' + statii.map(function (s, i) {
      var cls = s.gata ? "statie gata" : (i === aici ? "statie aici" : "statie");
      var punct = s.gata ? '<span class="punct" aria-hidden="true">✓</span>'
        : i === aici ? '<span class="punct" aria-hidden="true">' + desen("zambet") + "</span>"
        : '<span class="punct" aria-hidden="true">' + (i + 1) + "</span>";
      return '<li class="' + cls + '">' + punct + (i === aici ? '<span class="eticheta-aici">' + esc(D.aici) + "</span>" : "") +
        C.buton(s.eticheta, "nav", s.ecran, "lista") + "</li>";
    }).join("") + "</ol>";
  };

  /* Bara de progres: câți pași din câți. Separată de carduri, ca să poată apărea o singură dată pe ecran,
     chiar dacă doar o bucată din carduri e pe acel ecran. */
  C.progresDrum = function (facute, total) {
    return '<div class="progres-drum"><p class="mic">Ai făcut <strong>' + facute + "</strong> din " + total + " pași.</p>" +
      '<progress class="progres" max="' + total + '" value="' + facute + '" aria-label="Pașii făcuți"></progress></div>';
  };
  /* Cardurile (widget-uri): fiecare secție e un card. Cardul curent clipește ca semnalul, cardurile făcute au ✓.
     Fiecare element poate avea: nume, ecran, gata, detaliu, opt, și — dacă cel ce apelează vrea să arate asta —
     nr (numărul lui în tot drumul) și aici (e cardul la care omul ar trebui să continue). */
  C.carduri = function (statii) {
    return '<div class="carduri' + (statii.length === 1 ? " un-cadru" : "") + '">' + statii.map(function (s, i) {
      var cls = s.gata ? "gata" : (s.aici ? "aici semn-inainte" : "");
      /* Pe card scrie doar ce contează acum: cardul curent și cele făcute; restul e liniștit, fără text în plus. */
      var stareTxt = s.gata ? (s.detaliu || "✓ Făcut") : (s.aici ? "Continuă aici" : "");
      var nr = s.gata ? "✓" : String(s.nr != null ? s.nr : i + 1);
      return C.buton('<span class="nr" aria-hidden="true">' + nr + '</span><span class="nume">' + esc(s.nume || "") + '</span><span class="stare">' + stareTxt + "</span>",
        "nav", s.ecran, cls);
    }).join("") + "</div>";
  };
  /* Calcul pur: din lista întreagă de pași — numărul fiecăruia, care e „aici” (primul nefăcut, opțional exclus) și câți sunt făcuți. */
  function pregateste(statii) {
    var cuNr = statii.map(function (s, i) { return Object.assign({}, s, { nr: i + 1 }); });
    var aiciIdx = -1;
    cuNr.forEach(function (s, i) { if (aiciIdx < 0 && !s.gata && !s.opt) aiciIdx = i; });
    if (aiciIdx >= 0) cuNr[aiciIdx].aici = true;
    return { statii: cuNr, aiciIdx: aiciIdx, facute: cuNr.filter(function (s) { return s.gata; }).length, total: cuNr.length };
  }
  /* Cardul „Continuă aici”, singur, pentru ecranul principal (nu mai arată toate secțiunile deodată). */
  C.cardulDeAcum = function (statii) {
    var p = pregateste(statii);
    var card = p.aiciIdx >= 0 ? p.statii[p.aiciIdx] : null;
    if (!card) return "";
    return C.progresDrum(p.facute, p.total) + C.carduri([card]);
  };
  /* Pagina „Toate secțiunile”: drumul complet, câte un card pe ecran. */
  var PE_PAGINA = 1;
  C.paginaToate = function (statii, sub, acasa, baza) {
    var p = pregateste(statii), n = Math.max(0, Number(sub) || 0);
    var pagini = Math.max(1, Math.ceil(p.total / PE_PAGINA));
    n = Math.min(n, pagini - 1);
    var bucata = p.statii.slice(n * PE_PAGINA, n * PE_PAGINA + PE_PAGINA);
    var inapoi = n > 0 ? baza + "/" + (n - 1) : acasa;
    var urmator = n < pagini - 1 ? baza + "/" + (n + 1) : null;
    var corp = C.progresDrum(p.facute, p.total) +
      (pagini > 1 ? '<p class="mic">Pagina ' + (n + 1) + " din " + pagini + "</p>" : "") +
      C.carduri(bucata) +
      '<div class="rand">' + C.buton("Înapoi", "nav", inapoi) +
      (urmator ? C.buton("Mai departe", "nav", urmator, "continua") : C.buton("Înapoi la drumul meu", "nav", acasa, "primar")) + "</div>";
    return C.pagina("Toate secțiunile", corp, inapoi, true);
  };

  /* Grupa de vârstă pentru felul în care vorbește Simi. */
  function grupa() { var v = S.ia("varsta", ""); return v === "45+" ? "a45" : (v && v !== "sub18" ? "adult" : "elev"); }
  /* Un text al lui Simi: la 45+ varianta cu „dumneavoastră”, dacă există. */
  C.faro = function (k) { return grupa() === "a45" && D.dvs[k] ? D.dvs[k] : D[k]; };
  function stareT() { return grupa() === "a45" ? Object.assign({}, D.stare, D.dvs.stare) : D.stare; }

  /* ---- Momentele importante ---- */
  /* Calcul pur, din ce e salvat: momentele atinse până acum (id-uri). */
  function atinse() {
    var r = [], azi = C.azi(), Dt = g.DATE;
    var rec = S.ia("rec", {}) || {};
    if (Object.keys(rec).some(function (k) { return Dt.retine && Dt.retine.sectiuni[k]; })) r.push("sectiune1");
    var sp = S.ia("plan.sapt", {}) || {};
    if (Object.keys(sp).some(function (k) { return sp[k] && sp[k].bifat; })) r.push("tema1");
    var zile = (S.ia("plan.zile", []) || []).slice().sort();
    if (C.module.plan && C.module.plan.serie(zile, azi) >= 3) r.push("zile3");
    if (zile.length >= 7) r.push("zile7");
    var lc = S.ia("lectie", {}) || {};
    if (Object.keys(lc).some(function (k) { return lc[k] && lc[k].gata; })) r.push("lectie1");
    if (S.ia("cauta.gata", false)) r.push("cauta1");
    if ((Number(S.ia("det.corecte", 0)) || 0) >= 5) r.push("detectiv5");
    var pasi = C.eAdult() ? (C.module.adult ? C.module.adult.pasiCuStare() : []) : pasiElev();
    if (pasi.length && pasi.filter(function (p) { return p.gata; }).length >= Math.ceil(pasi.length / 2)) r.push("jumatate");
    return r;
  }
  function textMoment(m) { return m[grupa()] || m.adult; }
  /* Sărbătorile de azi, ca listă (una pe ecran, pe pagina „Noutăți”): momentele noi primesc data de azi
     și apar toată ziua; cele vechi nu mai apar. */
  function sarbatoriLista() {
    var azi = C.azi(), out = [];
    atinse().forEach(function (id) { if (!S.ia("mom." + id, "")) S.pune("mom." + id, azi); });
    D.momente.forEach(function (m) {
      if (S.ia("mom." + m.id, "") === azi) out.push('<div class="sarbatoare">' + C.bosi("★ " + textMoment(m), "bucurie") + "</div>");
    });
    return out;
  }
  /* Pentru „Caietul meu”: momentele atinse, cu data lor. */
  function momenteleMele() {
    return D.momente.filter(function (m) { return S.ia("mom." + m.id, ""); }).map(function (m) {
      return "★ " + textMoment(m).replace(/\*\*/g, "") + " (" + C.format(S.ia("mom." + m.id, "")) + ")";
    });
  }

  /* ---- „Detectivul de 5 secunde” ---- */
  function detText(x, k) { var a45 = grupa() === "a45", elev = grupa() === "elev";
    if (k === "q") return (a45 && x.q45) || (elev && x.qElev) || (!elev && x.qAdult) || x.q;
    if (k === "opt") return x.opt || (elev ? x.optElev : x.optAdult);
    return (a45 && x[k + "45"]) || x[k];
  }
  /* Întrebarea de azi: aceeași toată ziua; a doua zi, următoarea din listă. */
  function detAzi() {
    var Dt = g.DATE.detectiv, azi = C.azi(), z = S.ia("det.zi", {}) || {};
    if (z.data !== azi) { var n = Number(S.ia("det.n", 0)) || 0; z = { data: azi, id: Dt.intrebari[n % Dt.intrebari.length].id }; S.pune("det.zi", z); }
    return { z: z, x: Dt.intrebari.filter(function (q) { return q.id === z.id; })[0] };
  }
  function detectiv() {
    var Dt = g.DATE.detectiv; if (!Dt) return "";
    var a = detAzi(), z = a.z, x = a.x; if (!x || z.r === "sarit") return "";
    if (z.r === undefined || z.r === null || z.r === "") {
      return '<div class="detectiv">' + C.bosi("**" + Dt.titlu + "** " + detText(x, "q")) + '<div class="meniu-lista optiuni">' +
        detText(x, "opt").map(function (o, k) { return C.buton(esc(o.t), "bosi.detectiv", String(k), "lista"); }).join("") + "</div>" +
        '<div class="rand">' + C.buton(esc(Dt.sari), "bosi.detectiv", "sari", "mic-btn") + "</div></div>";
    }
    var o = detText(x, "opt")[Number(z.r)], ok = o && o.ok;
    return '<div class="detectiv" id="detectiv" role="status">' + C.bosi(ok ? detText(x, "bine") : Dt.aproape + " " + detText(x, "exp"), ok ? "bucurie" : "zambet") + "</div>";
  }

  /* ---- „Simi își amintește” ---- */
  function curata(t) { return String(t || "").replace(/\*\*/g, "").trim(); }
  /* Săptămâna trecută a planului, dacă omul își alesese o temă și încă nu i-a spus lui Simi cum a mers. */
  function temaDeIntrebat() {
    if (!S.ia("plan.start", null) || !C.module.plan) return null;
    var k = C.saptamana() - 1; if (k < 0) return null;
    if (!S.ia("plan.sapt.s" + k + ".aleasa", "") || S.ia("mem.s" + k, "")) return null;
    var t = curata(C.module.plan.textTema(k)); return t ? { k: k, t: t } : null;
  }
  /* „Cum a mers tema?” (sau răspunsul dat azi) — o idee, pe ecranul ei. */
  function memorieTema() {
    var M = D.memorie[grupa()], m = S.ia("mem.ultim", {}) || {};
    if (m.data === C.azi() && m.r) {
      var out = C.bosi(M[m.r], m.r === "reusit" ? "bucurie" : "zambet");
      if (m.r === "reusit") out += C.camp("mem.ajutat.s" + m.k, esc(M.ajutat), "", 2);
      return out;
    }
    var q = temaDeIntrebat();
    if (!q) return "";
    return C.bosi(inl(M.intrebare, { tema: q.t })) + '<div class="rand">' +
      M.optiuni.map(function (o) { return C.buton(esc(o[1]), "bosi.memorie", q.k + "|" + o[0]); }).join("") + "</div>";
  }
  /* Rezumatul drumului, cel mult o dată la 7 zile — altă idee, pe ecranul ei. */
  function memorieRezumat() {
    var M = D.memorie[grupa()], rz = S.ia("mem.rezumat", ""), azi = C.azi();
    if (rz && C.zile(rz, azi) < 7 && rz !== azi) return "";
    var sec = Object.keys((S.ia("rec", {}) || {})).filter(function (k) { return g.DATE.retine && g.DATE.retine.sectiuni[k]; }).length, zile = (S.ia("plan.zile", []) || []).length, teme = 0, sp = S.ia("plan.sapt", {}) || {};
    Object.keys(sp).forEach(function (k) { if (sp[k] && sp[k].bifat) teme++; });
    var l = [];
    if (sec) l.push(sec === 1 ? "o secțiune terminată" : sec + " secțiuni terminate");
    if (zile) l.push(zile === 1 ? "o zi de lucru" : zile + " zile de lucru");
    if (teme) l.push(teme === 1 ? "o temă reușită" : teme + " teme reușite");
    if (!l.length) return "";
    if (rz !== azi) S.pune("mem.rezumat", azi);
    var out = C.bosi(inl(M.rezumat, { lista: l.join(", ") }), "bucurie");
    var id = curata(S.ia("plan.identitate", "")), v = curata(S.ia("vp.top", ""));
    if (id) { id = id.replace(/^[„"]|[”"]$/g, "").replace(/[.!]$/, ""); out += C.bosi(inl(M.identitate, { i: id.charAt(0).toLowerCase() + id.slice(1) })); }
    else if (v) out += C.bosi(inl(M.valoare, { v: v }));
    return out;
  }

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
      { t: g.DATE.cerinte ? g.DATE.cerinte.titlu : "Ce cer angajatorii acum", gata: !!S.ia("cerinte.gata", false), ecran: "cerinte/lista" },
      { t: g.DATE.cauta ? g.DATE.cauta.titlu : "Cum găsești informații sigure", gata: !!S.ia("cauta.gata", false), ecran: "cauta/intro" }
    ];
  }

  /* Seria de zile la rând, ca o flacără mică pe ecranul principal. Ghidul de prima folosire are propriul ecran. */
  function inceput() {
    var zile = (S.ia("plan.zile", []) || []).slice().sort(), n = C.module.plan && C.module.plan.serie ? C.module.plan.serie(zile, C.azi()) : 0;
    return n ? '<p class="seria"><span class="flacara" aria-hidden="true">♦</span> ' + esc("Seria ta: **" + n + (n === 1 ? " zi" : " zile") + " la rând.**") + "</p>" : "";
  }
  /* Ghidul de prima folosire, câte o bulă pe ecran. La final, „Am înțeles” duce pe ecranul principal. */
  function paginaGhid(n) {
    var G = D.ghid, lista = G[grupa()] || G.adult;
    n = Math.max(0, Math.min(Number(n) || 0, lista.length - 1));
    var ultim = n === lista.length - 1;
    var corp = '<p class="mic">' + (n + 1) + " din " + lista.length + "</p>" + C.bosi(lista[n]) +
      '<div class="rand">' + (ultim ? C.buton(esc(G.buton), "bosi.ghid", null, "primar") : C.buton("Continuă", "nav", "bosi/ghid/" + (n + 1), "continua")) + "</div>";
    return C.pagina(D.nume, corp, null, true);
  }

  /* Sărbătorile, jocul și amintirile, ca o listă de bucăți separate (una pe ecran, pe pagina „Noutăți”). */
  function sectiuniSalut() {
    var z = S.ia("stare.zi", {}) || {}, azi = C.azi(), r = z.data === azi ? z.r : "";
    if (!r || r === "nu") return [];
    var parti = sarbatoriLista();
    if (r === "bine") { var d = detectiv(); if (d) parti.push(d); }
    var mt = memorieTema(); if (mt) parti.push(mt);
    var mr = memorieRezumat(); if (mr) parti.push(mr);
    return parti;
  }

  /* Conversația „Cum te simți azi?”, pe propriul ei ecran (nu mai e pe ecranul principal). */
  function stareConversatie() {
    var azi = C.azi(), ult = S.ia("bosi.ultima", "");
    if (ult && ult !== azi && C.zile(ult, azi) >= 2) S.pune("bosi.revenit", azi);
    S.pune("bosi.ultima", azi);
    var pasi = C.eAdult() ? (C.module.adult ? C.module.adult.pasiCuStare() : []) : pasiElev();
    var urm = pasi.filter(function (p) { return !p.gata; })[0];
    var T = stareT(), z = S.ia("stare.zi", {}) || {}, r = z.data === azi ? z.r : "";
    var corp;
    if (!r) {
      corp = C.bosi(S.ia("bosi.revenit", "") === azi ? T.revenit : T.intrebare) +
        '<div class="rand">' + T.optiuni.map(function (o) { return C.buton(esc(o[1]), "bosi.stare", o[0]); }).join("") + "</div>";
    } else {
      var txt = r === "bine" ? (urm ? inl(T.bine, { pas: urm.t }) : T.bineTot) : (r === "asa" ? T.asa : T.nu);
      var actiuni = r === "asa" ? C.buton(esc(T.butonMini), "nav", "plan/saptamana", "continua") + C.buton(esc(T.butonCaiet), "nav", "caiet/tot") : "";
      var maine = r === "nu" ? C.bosi(T.maine) : "";
      corp = C.bosi(txt, r === "bine" ? "bucurie" : "zambet") + maine +
        (actiuni ? '<div class="rand">' + actiuni + "</div>" : "") +
        '<div class="rand">' + C.buton(esc(T.schimb), "bosi.stare", "", "mic-btn") + "</div>";
    }
    return '<div id="stare-zi">' + corp + "</div>" + '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar") + "</div>";
  }
  /* Rândul mic de pe ecranul principal, care duce la ecranul „Cum te simți azi?”. */
  function teaser() {
    return '<div class="rand">' + C.buton(esc(D.stare.teaser), "nav", "bosi", "lista") + "</div>";
  }

  /* „Noutăți de la Simi”: sărbători, detectivul zilei, ce-și amintește Simi, recapitulări de făcut — câte o idee pe ecran.
     Nu mai apare direct pe ecranul principal — doar un rând mic duce aici, când e ceva de arătat. */
  function noutatiSectiuni() {
    var parti = sectiuniSalut();
    var rem = C.module.reamintiri ? C.module.reamintiri.banner() : ""; if (rem) parti.push(rem);
    var rb = C.module.retine ? C.module.retine.banner() : ""; if (rb) parti.push(rb);
    return parti;
  }
  function paginaNoutati(sub) {
    var parti = noutatiSectiuni();
    if (!parti.length) {
      var gol = "<p>" + esc(D.noutatiGol) + "</p>" + '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar") + "</div>";
      return C.pagina(D.noutati, gol, C.acasa());
    }
    var n = Math.max(0, Math.min(Number(sub) || 0, parti.length - 1)), ultim = n === parti.length - 1;
    var inapoi = n > 0 ? "bosi/noutati/" + (n - 1) : C.acasa();
    var corp = (parti.length > 1 ? '<p class="mic">' + (n + 1) + " din " + parti.length + "</p>" : "") + parti[n] +
      '<div class="rand">' + C.buton("Înapoi", "nav", inapoi) +
      (ultim ? C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar") : C.buton("Continuă", "nav", "bosi/noutati/" + (n + 1), "continua")) + "</div>";
    return C.pagina(D.noutati, corp, inapoi, true);
  }
  /* Rândul mic de pe ecranul principal, doar când Simi are ceva de arătat. */
  function teaserNoutati() {
    if (!noutatiSectiuni().length) return "";
    return '<div class="rand">' + C.buton(esc(D.noutatiTeaser), "nav", "bosi/noutati/0", "lista") + "</div>";
  }

  C.reg("bosi", {
    ecran: function (sub) {
      var no = /^noutati(?:\/(\d+))?$/.exec(sub || "");
      if (no) return paginaNoutati(no[1]);
      var g = /^ghid(?:\/(\d+))?$/.exec(sub || "");
      if (g) return paginaGhid(g[1]);
      return C.pagina(D.stare.teaser, stareConversatie(), C.acasa());
    },
    actiuni: {
      /* Răspunsul la „Cum te simți azi?”; gol = omul vrea să răspundă din nou. */
      /* Răspunsul la „Detectivul de 5 secunde”, sau „Altă dată”. */
      detectiv: function (arg) {
        var a = detAzi(), z = a.z; if (z.r !== undefined && z.r !== null && z.r !== "") return;
        if (arg === "sari") { z.r = "sarit"; S.pune("det.zi", z); return; }
        z.r = Number(arg); S.pune("det.zi", z); S.pune("det.n", (Number(S.ia("det.n", 0)) || 0) + 1);
        var o = detText(a.x, "opt")[z.r]; if (o && o.ok) S.pune("det.corecte", (Number(S.ia("det.corecte", 0)) || 0) + 1);
        C.deArata = "detectiv";
      },
      /* „Cum a mers?” pentru tema de săptămâna trecută. „Am reușit” bifează tema. */
      memorie: function (arg) {
        var p = String(arg).split("|"), k = Number(p[0]), r = p[1];
        S.pune("mem.s" + k, r); S.pune("mem.ultim", { data: C.azi(), r: r, k: k });
        if (r === "reusit") S.pune("plan.sapt.s" + k + ".bifat", true);
      },
      ghid: function () { S.pune("ghid.vazut", true); C.mergi(C.acasa()); },
      stare: function (r) { S.pune("stare.zi", r ? { data: C.azi(), r: r } : {}); C.deArata = r ? "stare-zi" : ""; }
    },
    teaser: teaser,
    teaserNoutati: teaserNoutati,
    paginaGhid: paginaGhid,
    carduri: function (x) { return C.carduri(x); },
    inceput: inceput,
    grupa: grupa,
    atinse: atinse,
    momenteleMele: momenteleMele,
    desen: desen
  });
})(typeof window !== "undefined" ? window : globalThis);
