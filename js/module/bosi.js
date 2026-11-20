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

  /* Grupa de vârstă pentru felul în care vorbește Faro. */
  function grupa() { var v = S.ia("varsta", ""); return v === "45+" ? "a45" : (v && v !== "sub18" ? "adult" : "elev"); }
  /* Un text al lui Faro: la 45+ varianta cu „dumneavoastră”, dacă există. */
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
  /* Sărbătorile de azi: momentele noi primesc data de azi și apar toată ziua; cele vechi nu mai apar. */
  function sarbatori() {
    var azi = C.azi(), out = "";
    atinse().forEach(function (id) { if (!S.ia("mom." + id, "")) S.pune("mom." + id, azi); });
    D.momente.forEach(function (m) {
      if (S.ia("mom." + m.id, "") === azi) out += '<div class="sarbatoare">' + C.bosi("★ " + textMoment(m), "bucurie") + "</div>";
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

  /* ---- „Faro își amintește” ---- */
  function curata(t) { return String(t || "").replace(/\*\*/g, "").trim(); }
  /* Săptămâna trecută a planului, dacă omul își alesese o temă și încă nu i-a spus lui Faro cum a mers. */
  function temaDeIntrebat() {
    if (!S.ia("plan.start", null) || !C.module.plan) return null;
    var k = C.saptamana() - 1; if (k < 0) return null;
    if (!S.ia("plan.sapt.s" + k + ".aleasa", "") || S.ia("mem.s" + k, "")) return null;
    var t = curata(C.module.plan.textTema(k)); return t ? { k: k, t: t } : null;
  }
  function memorie() {
    var M = D.memorie[grupa()], out = "", m = S.ia("mem.ultim", {}) || {};
    /* răspunsul dat azi rămâne pe ecran */
    if (m.data === C.azi() && m.r) {
      out += C.bosi(M[m.r], m.r === "reusit" ? "bucurie" : "zambet");
      if (m.r === "reusit") out += C.camp("mem.ajutat.s" + m.k, esc(M.ajutat), "", 2);
    } else {
      var q = temaDeIntrebat();
      if (q) out += C.bosi(inl(M.intrebare, { tema: q.t })) + '<div class="rand">' +
        M.optiuni.map(function (o) { return C.buton(esc(o[1]), "bosi.memorie", q.k + "|" + o[0]); }).join("") + "</div>";
    }
    /* rezumatul drumului, cel mult o dată la 7 zile */
    var rz = S.ia("mem.rezumat", ""), azi = C.azi();
    if (!rz || C.zile(rz, azi) >= 7 || rz === azi) {
      var sec = Object.keys((S.ia("rec", {}) || {})).filter(function (k) { return g.DATE.retine && g.DATE.retine.sectiuni[k]; }).length, zile = (S.ia("plan.zile", []) || []).length, teme = 0, sp = S.ia("plan.sapt", {}) || {};
      Object.keys(sp).forEach(function (k) { if (sp[k] && sp[k].bifat) teme++; });
      var l = [];
      if (sec) l.push(sec === 1 ? "o secțiune terminată" : sec + " secțiuni terminate");
      if (zile) l.push(zile === 1 ? "o zi de lucru" : zile + " zile de lucru");
      if (teme) l.push(teme === 1 ? "o temă reușită" : teme + " teme reușite");
      if (l.length) {
        if (rz !== azi) S.pune("mem.rezumat", azi);
        out += C.bosi(inl(M.rezumat, { lista: l.join(", ") }), "bucurie");
        var id = curata(S.ia("plan.identitate", "")), v = curata(S.ia("vp.top", ""));
        if (id) { id = id.replace(/^[„"]|[”"]$/g, "").replace(/[.!]$/, ""); out += C.bosi(inl(M.identitate, { i: id.charAt(0).toLowerCase() + id.slice(1) })); }
        else if (v) out += C.bosi(inl(M.valoare, { v: v }));
      }
    }
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

  /* Primul lucru de pe ecranul principal: ghidul (o singură dată), apoi butonul mare „Continuă de unde ai rămas”. */
  function inceput() {
    var out = "";
    /* Seria de zile la rând, ca o flacără mică pe ecranul principal. */
    var zile = (S.ia("plan.zile", []) || []).slice().sort(), n = C.module.plan && C.module.plan.serie ? C.module.plan.serie(zile, C.azi()) : 0;
    if (n) out += '<p class="seria"><span class="flacara" aria-hidden="true">♦</span> ' + esc("Seria ta: **" + n + (n === 1 ? " zi" : " zile") + " la rând.**") + "</p>";
    if (!S.ia("ghid.vazut", false)) {
      var G = D.ghid;
      out += '<div class="ghid">' + G[grupa()].map(function (t) { return C.bosi(t); }).join("") +
        '<div class="rand">' + C.buton(esc(G.buton), "bosi.ghid", null, "primar") + "</div></div>";
    }
    var pasi = C.eAdult() ? (C.module.adult ? C.module.adult.pasiCuStare() : []) : pasiElev();
    var urm = pasi.filter(function (p) { return !p.gata; })[0];
    out += '<div class="rand continua-mare">' + (urm
      ? C.buton("<strong>" + esc(D.continua) + '</strong><span class="stare">' + esc(urm.t) + "</span>", "nav", urm.ecran, "continua lista mare")
      : C.buton("<strong>" + esc(D.totGata) + "</strong>", "nav", "caiet/tot", "continua lista mare")) + "</div>";
    return out;
  }

  /* Salutul de pe ecranul principal: primul pas, pasul următor sau „ți-am păstrat locul” după câteva zile de pauză. */
  function salut() {
    var azi = C.azi(), ult = S.ia("bosi.ultima", "");
    if (ult && ult !== azi && C.zile(ult, azi) >= 2) S.pune("bosi.revenit", azi);
    S.pune("bosi.ultima", azi);
    var pasi = C.eAdult() ? (C.module.adult ? C.module.adult.pasiCuStare() : []) : pasiElev();
    var urm = pasi.filter(function (p) { return !p.gata; })[0];
    /* Întâi întrebarea „Cum te simți azi?”, o dată pe zi; apoi răspunsul potrivit. */
    var T = stareT(), z = S.ia("stare.zi", {}) || {}, r = z.data === azi ? z.r : "";
    if (!r) {
      return '<div class="stare-zi">' + C.bosi(S.ia("bosi.revenit", "") === azi ? T.revenit : T.intrebare) +
        '<div class="rand">' + T.optiuni.map(function (o) { return C.buton(esc(o[1]), "bosi.stare", o[0]); }).join("") + "</div></div>";
    }
    var schimb = '<div class="rand">' + C.buton(esc(T.schimb), "bosi.stare", "", "mic-btn") + "</div>";
    if (r === "nu") {
      return '<div class="stare-zi" id="stare-zi" role="status">' + C.bosi(T.nu) + C.bosi(T.maine) + schimb + "</div>";
    }
    if (r === "asa") {
      return '<div class="stare-zi" id="stare-zi" role="status">' + C.bosi(T.asa) + '<div class="rand">' +
        C.buton(esc(T.butonMini), "nav", "plan/saptamana", "continua") + C.buton(esc(T.butonCaiet), "nav", "caiet/tot") + "</div>" + schimb + "</div>" + sarbatori() + memorie();
    }
    if (!urm) return '<div class="stare-zi" id="stare-zi">' + C.bosi(T.bineTot, "bucurie") + schimb + "</div>" + sarbatori() + detectiv() + memorie();
    return '<div class="stare-zi" id="stare-zi" role="status">' + C.bosi(inl(T.bine, { pas: urm.t }), "bucurie") +
      (urm.ecran ? '<div class="rand">' + C.buton(esc(T.butonBine), "nav", urm.ecran, "continua") + "</div>" : "") + schimb + "</div>" + sarbatori() + detectiv() + memorie();
  }

  C.reg("bosi", {
    ecran: function () { return C.pagina(D.nume, salut(), C.acasa()); },
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
      ghid: function () { S.pune("ghid.vazut", true); },
      stare: function (r) { S.pune("stare.zi", r ? { data: C.azi(), r: r } : {}); C.deArata = r ? "stare-zi" : ""; }
    },
    salut: salut,
    inceput: inceput,
    grupa: grupa,
    atinse: atinse,
    momenteleMele: momenteleMele,
    desen: desen
  });
})(typeof window !== "undefined" ? window : globalThis);
