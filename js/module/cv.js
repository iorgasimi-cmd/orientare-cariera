/* Subagent 8: corectorul de CV (doar pentru adulți).
   Verifică local textul lipit de om, fără IA și fără să trimită ceva. Textul nu se salvează decât dacă omul bifează.
   Regulile și mesajele sunt în date/cv.js. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.cv, esc = C.esc;
  var textCV = ""; /* textul lipit, ținut doar în memorie cât e deschisă pagina */

  /* Fără diacritice și cu litere mici, ca regulile să găsească și textele scrise fără ă, â, î, ș, ț. */
  function norm(s) {
    return String(s || "").replace(/ţ/g, "ț").replace(/Ţ/g, "Ț").replace(/ş/g, "ș").replace(/Ş/g, "Ș")
      .normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function mesaj(m, valori) {
    var t = m.t !== undefined ? m.t : m;
    Object.keys(valori || {}).forEach(function (k) { t = t.split("{" + k + "}").join(valori[k]); });
    return t;
  }

  var TITLURI = [
    ["rezumat", /^(rezumat|profil( profesional)?|obiectiv( profesional)?|despre mine|prezentare)$/],
    ["experienta", /^(experienta( profesionala| de munca)?|istoric profesional|experienta profesionala relevanta)$/],
    ["educatie", /^(educatie( si formare)?|studii|formare( profesionala)?|educatie si formare profesionala)$/],
    ["competente", /^(competente( si abilitati| tehnice| digitale| personale)?|abilitati( personale)?|aptitudini)$/],
    ["limbi", /^limbi( straine)?$/],
    ["proiecte", /^(proiecte|voluntariat|proiecte ?\/ ?voluntariat|activitati de voluntariat)$/],
    ["personale", /^(date personale|informatii personale|date de contact|contact)$/],
    ["hobby", /^(hobby(-uri)?|pasiuni|interese)$/]
  ];
  var NUME_SECTIUNE = { rezumat: "Rezumat", experienta: "Experiență profesională", educatie: "Educație", competente: "Competențe" };
  var BULINA = /^\s*([•\-*–●▪◦·]|\d+[.)])\s+/;

  /* Împarte textul pe secțiuni, după titluri. Ce e înainte de primul titlu e partea de sus (numele și contactul). */
  function sectiuni(text) {
    var rez = { sus: [] }, curent = "sus";
    String(text).split(/\r?\n/).forEach(function (linie) {
      var curata = norm(linie).replace(BULINA, "").replace(/[:\s]+$/, "").trim();
      if (curata && curata.length <= 45) {
        for (var i = 0; i < TITLURI.length; i++) {
          if (TITLURI[i][1].test(curata)) { curent = TITLURI[i][0]; rez[curent] = rez[curent] || []; return; }
        }
      }
      rez[curent] = rez[curent] || [];
      rez[curent].push(linie);
    });
    return rez;
  }

  var VERBE = /\b(am (coordonat|condus|organizat|gestionat|crescut|redus|implementat|creat|dezvoltat|negociat|vandut|rezolvat|instruit|format|imbunatatit|lansat|realizat|obtinut|depasit|reactivat|monitorizat|planificat|analizat|construit|proiectat|predat|livrat|optimizat|automatizat|recrutat|consiliat|administrat|supervizat|elaborat|initiat|atras|castigat|ingrijit|scris)|coordonarea|gestionarea|negocierea|organizarea|depasirea|reducerea|cresterea|implementarea|dezvoltarea|monitorizarea|rezolvarea|reactivarea|intocmirea|preluarea|identificarea|planificarea|optimizarea|instruirea|crearea|lansarea|administrarea|elaborarea)\b/g;
  var REZULTAT = /(\d+\s*%|\d[\d.,]*\s*(de\s+)?(clien|lei|ron|euro|eur|oameni|persoane|proiect|produse|comenzi|ore|zile|luni|km|participan|angaja|membri|magazine|locatii|vanzari|elevi|copii|pacienti|cursanti|evenimente|contracte|apeluri)|\bcu \d+|\bde la \d+ la \d+)/;

  /* Calcul pur: primește textul, răspunsurile la întrebări și situația; întoarce ce e bine și ce se poate schimba. */
  function analizeaza(text, raspunsuri, context) {
    var M = D.mesaje, bine = [], schimba = [], n = norm(text);
    var adauga = function (m, valori) { schimba.push({ p: m.p, t: mesaj(m, valori) }); };
    var cuvinte = String(text).split(/\s+/).filter(Boolean).length;
    var sec = sectiuni(text);

    if (cuvinte < 80) adauga(M.scurt);

    /* Date de contact: nume, telefon, e-mail profesional, oraș */
    var email = String(text).match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    if (email) {
      bine.push(M.email_ok);
      var local = norm(email[0].split("@")[0]);
      if (D.cuvinte.porecle.some(function (w) { return local.indexOf(w) >= 0; })) adauga(M.email_neprof);
    } else adauga(M.email_lipsa);
    if (/(\+?40|\b0)\s?7\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b|(\+?40|\b0)\s?[23]\d{1,2}[\s.-]?\d{3}[\s.-]?\d{3,4}\b/.test(text)) bine.push(M.telefon_ok);
    else adauga(M.telefon_lipsa);

    /* Ce nu e necesar */
    if (/\b[1-8]\d{12}\b/.test(text)) adauga(M.cnp);
    var inutile = [];
    if (/data nasterii|\bnascut(a)?\b/.test(n)) inutile.push("data nașterii");
    if (/stare civila|\bcasatorit|\bnecasatorit|\bdivortat|\bvaduv/.test(n)) inutile.push("starea civilă");
    if (/\badresa\s*:|\b(str\.|strada|bd\.|bulevardul|bl\.|sc\.|ap\.)\s*\S/.test(n)) inutile.push("adresa completă");
    if (/nationalitate/.test(n)) inutile.push("naționalitatea");
    if (inutile.length) adauga(M.personale, { lista: inutile.join(", ") });
    if (/instagram|tiktok|facebook\.com/.test(n)) adauga(M.retele);

    /* Structura */
    var are = function (k) { return !!(sec[k] && sec[k].join("").trim()); };
    var prezente = ["rezumat", "experienta", "educatie", "competente"].filter(are);
    if (prezente.length >= 3) bine.push(mesaj(M.sectiuni_ok, { lista: prezente.map(function (k) { return NUME_SECTIUNE[k]; }).join(", ") }));
    if (!are("experienta")) adauga(M.lipsa_experienta);
    if (!are("educatie")) adauga(M.lipsa_educatie);
    if (!are("competente") && !are("limbi")) adauga(M.lipsa_competente);
    if (!are("rezumat")) adauga(M.lipsa_rezumat);
    else {
      var rez = sec.rezumat.join(" ").trim(), nr = norm(rez);
      var fraze = (rez.match(/[.!?]+(\s|$)/g) || []).length || 1;
      if (/sa imi gasesc un (job|loc de munca)|caut un (job|loc de munca)\.?$/.test(nr) && rez.length < 80) adauga(M.obiectiv_vag);
      else if (fraze > 3) adauga(M.rezumat_lung, { n: fraze });
    }

    /* Cum descrii experiența */
    if (are("experienta")) {
      var exp = sec.experienta.join("\n"), ne = norm(exp);
      var verbe = {}; (ne.match(VERBE) || []).forEach(function (v) { verbe[v] = 1; });
      if (Object.keys(verbe).length >= 2) bine.push(M.verbe_ok); else adauga(M.verbe_putine);
      if (REZULTAT.test(ne)) bine.push(M.rezultate_ok); else adauga(M.rezultate_lipsa);
    }
    var vagi = D.cuvinte.vagi.filter(function (v) { return n.indexOf(v[0]) >= 0; }).map(function (v) { return "„" + v[1] + "”"; });
    if (vagi.length) adauga(M.vag, { lista: vagi.join(", ") });

    var linii = [];
    ["sus", "rezumat", "experienta", "proiecte"].forEach(function (k) { linii = linii.concat(sec[k] || []); });
    if (linii.some(function (l) { return l.trim().length > 350; })) adauga(M.blocuri);
    var buline = String(text).split(/\r?\n/).filter(function (l) { return BULINA.test(l); }).length;
    if (buline >= 3) bine.push(M.puncte_ok);

    /* Ordinea: cel mai recent primul */
    ["experienta", "educatie"].forEach(function (k) {
      if (!sec[k]) return;
      var ani = sec[k].map(function (l) { var m = l.match(/\b(19|20)\d{2}\b/); return m ? Number(m[0]) : null; }).filter(Boolean);
      if (ani.length >= 2 && ani[0] < ani[ani.length - 1]) adauga(M.ordine, { sectiune: NUME_SECTIUNE[k] });
    });

    /* Limbi străine cu nivel */
    var liniiLimbi = String(text).split(/\r?\n/).filter(function (l) {
      var nl = norm(l); return D.cuvinte.limbi.some(function (x) { return new RegExp("\\b" + x + "\\b").test(nl); });
    });
    if (liniiLimbi.some(function (l) { return !/\b[abc][12]\b|incepator|mediu|avansat|nativ|matern|fluent|conversational|intermediar/.test(norm(l).replace(/nu fluent/, "")); }))
      adauga(M.limbi_nivel);

    /* Diacritice */
    if (String(text).length > 200 && !/[ăâîșțşţĂÂÎȘȚŞŢ]/.test(text) && ((" " + n + " ").match(/ (si|in|sa) /g) || []).length >= 2) adauga(M.diacritice);

    /* Prescurtări */
    var obisnuite = D.cuvinte.prescurtariObisnuite, gasite = {};
    String(text).split(/\r?\n/).forEach(function (l) {
      var litere = l.replace(/[^A-Za-zĂÂÎȘȚăâîșț]/g, ""), mari = l.replace(/[^A-ZĂÂÎȘȚ]/g, "");
      if (!litere.length || mari.length / litere.length > 0.6) return; /* sare peste titlurile scrise cu majuscule */
      (l.match(/\b[A-Z]{2,5}\b/g) || []).forEach(function (a) { if (obisnuite.indexOf(a) < 0) gasite[a] = 1; });
    });
    var acr = Object.keys(gasite).slice(0, 4);
    if (acr.length) adauga(M.acronime, { lista: acr.join(", ") });

    /* Răspunsurile la întrebări (ce nu se vede în text) */
    D.intrebari.forEach(function (q) {
      var r = raspunsuri && raspunsuri[q.id], ef = r && q[r];
      if (!ef) return;
      if (ef.bine) bine.push(ef.bine); else adauga(ef);
    });

    schimba.forEach(function (x, i) { x.i = i; });
    schimba.sort(function (a, b) { return a.p - b.p || a.i - b.i; });

    var ctx = context || {}, sfaturi = [];
    if (ctx.situatie && D.situatii[ctx.situatie]) sfaturi.push(D.situatii[ctx.situatie]);
    if (ctx.varsta === "45+") sfaturi.push(D.situatii.accent45);

    return { bine: bine, schimba: schimba.map(function (x) { return x.t; }), sfaturi: sfaturi, cuvinte: cuvinte };
  }

  /* Subagent 9: textul de copiat într-un chat cu IA. Nu conține textul CV-ului și nici vârsta omului. Calcul pur. */
  function promptIA(analiza, context) {
    var P = D.ia.prompt, ctx = context || {}, l = [P.inceput, ""];
    if (ctx.situatie && P.situatii[ctx.situatie]) l.push(P.situatii[ctx.situatie]);
    if (ctx.varsta === "45+") l.push(P.accent45);
    if (ctx.situatie || ctx.varsta === "45+") l.push("");
    l.push("Reguli:");
    P.reguli.forEach(function (r) { l.push("- " + r); });
    l.push("");
    /* „textul pare foarte scurt” e un sfat pentru om, nu pentru programul de IA */
    var pr = ((analiza && analiza.schimba) || []).filter(function (t) { return t !== D.mesaje.scurt.t; });
    if (pr.length) { l.push(P.probleme); pr.forEach(function (t, i) { l.push((i + 1) + ". " + t); }); }
    else l.push(P.fara_probleme);
    l.push("", P.final, P.loc);
    return l.join("\n");
  }
  function textulCV() { return textCV || (S.ia("cv.pastreaza", false) ? S.ia("cv.text", "") : ""); }
  function context() { return { situatie: S.ia("situatie", ""), varsta: S.ia("varsta", "") }; }

  /* ---- Ecrane ---- */
  function intro() {
    var pastreaza = S.ia("cv.pastreaza", false);
    var val = textCV || (pastreaza ? S.ia("cv.text", "") : "");
    var corp = (C.bosi ? C.bosi(g.DATE.sfaturi.idei.imperfectCV) : "") + D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="camp"><label for="c-cv-text">Textul CV-ului</label>' +
      '<textarea id="c-cv-text" rows="12" spellcheck="false">' + C.escSimplu(val) + "</textarea></div>" +
      '<label class="val"><input type="checkbox" data-chg="cv.pastreaza" value="1"' + (pastreaza ? " checked" : "") + "><span>" + esc(D.pastreaza) + "</span></label>" +
      (pastreaza ? "" : '<p class="mic">' + esc(D.nesalvat) + "</p>") +
      '<div class="rand">' + C.buton("Continuă", "cv.continua", null, "continua") + "</div>";
    return C.pagina("CV-ul meu", corp, "adult/meniu");
  }

  function intrebare(i) {
    var q = D.intrebari[i], cur = S.ia("cv.q." + q.id, "");
    var corp = '<p class="mic">Întrebarea ' + (i + 1) + " din " + D.intrebari.length + "</p>" +
      (i === 0 ? '<p class="termen">' + esc(D.ats) + "</p>" : "") +
      '<fieldset class="intrebare"><legend>' + esc(q.q) + "</legend>" +
      q.optiuni.map(function (o) {
        return '<label class="val"><input type="radio" name="cv-' + q.id + '" value="' + o[0] + '" data-camp="cv.q.' + q.id + '"' + (cur === o[0] ? " checked" : "") + "><span>" + esc(o[1]) + "</span></label>";
      }).join("") + "</fieldset>" +
      '<div class="rand">' + C.buton("Înapoi", "nav", i === 0 ? "cv/intro" : "cv/q" + (i - 1)) +
      (i < D.intrebari.length - 1 ? C.buton("Continuă", "nav", "cv/q" + (i + 1), "continua") : C.buton("Văd rezultatul", "cv.rezultat", null, "primar")) + "</div>";
    return C.pagina("Câteva întrebări despre CV", corp, "cv/intro");
  }

  function rezultat() {
    var text = textCV || (S.ia("cv.pastreaza", false) ? S.ia("cv.text", "") : "");
    if (!text.trim()) {
      return C.pagina("Rezultatul verificării", "<p>" + esc(D.pierdut) + '</p><div class="rand">' + C.buton("Lipesc din nou", "nav", "cv/intro", "primar") + "</div>", "cv/intro");
    }
    var r = analizeaza(text, S.ia("cv.q", {}), { situatie: S.ia("situatie", ""), varsta: S.ia("varsta", "") });
    var M = D.mesaje;
    var corp = '<section class="card"><h2>Ce e bine</h2><ul>' +
      (r.bine.length ? r.bine : [M.nimic_bine]).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>" +
      '<section class="card"><h2>Ce ai putea schimba</h2>' +
      (r.schimba.length ? '<p class="mic">În ordinea importanței.</p><ol>' + r.schimba.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>"
        : "<p>" + esc(M.nimic_de_schimbat) + "</p>") + "</section>" +
      (r.sfaturi.length ? '<section class="card"><h2>Pentru situația ta</h2>' + r.sfaturi.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</section>" : "") +
      '<section class="card"><h2>Vrei să-l corectezi cu ajutorul unei IA?</h2><p>' + esc(D.ia.cartela) + '</p><div class="rand">' +
        C.buton("Văd cum", "nav", "cv/ia", "primar") + "</div></section>" +
      '<p class="nota">' + esc(M.nu_pot) + "</p>" +
      '<p class="mic">' + esc(mesaj(M.cuvinte, { n: r.cuvinte })) + "</p>" +
      C.retine("cv") +
      '<div class="rand">' + C.buton("Verific din nou", "nav", "cv/intro") + C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar") + "</div>";
    return C.pagina("Rezultatul verificării", corp, "adult/meniu");
  }

  function ghidIA() {
    var I = D.ia, text = textulCV();
    if (!text.trim()) {
      return C.pagina(I.titlu, "<p>" + esc(D.pierdut) + '</p><div class="rand">' + C.buton("Lipesc din nou", "nav", "cv/intro", "primar") + "</div>", "cv/intro");
    }
    var pr = promptIA(analizeaza(text, S.ia("cv.q", {}), context()), context());
    var corp = C.ghidIA() +
      '<p class="alerta"><strong>Atenție:</strong> ' + esc(I.atentie) + "</p>" + C.folosireIA() +
      '<h2>Cum faci</h2><ol class="pasi">' + I.sfaturi.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>" +
      '<div class="camp"><label for="c-prompt-ia">Promptul de copiat</label>' +
      '<textarea id="c-prompt-ia" rows="14" readonly>' + C.escSimplu(pr) + "</textarea></div>" +
      '<div class="rand">' + C.buton("Copiază", "cv.copiaza", null, "continua") + "</div>" +
      '<p id="stare-copiere" class="mic" role="status"></p>' +
      '<div class="rand">' + C.buton("Înapoi la rezultat", "nav", "cv/rezultat") + C.buton("Înapoi la drumul meu", "nav", "adult/meniu", "primar") + "</div>";
    return C.pagina(I.titlu, corp, "cv/rezultat");
  }

  C.reg("cv", {
    ecran: function (sub) {
      var m = /^q(\d)$/.exec(sub || "");
      if (m && D.intrebari[Number(m[1])]) return intrebare(Number(m[1]));
      if (sub === "rezultat") return rezultat();
      if (sub === "ia") return ghidIA();
      return intro();
    },
    actiuni: {
      pastreaza: function (v, el) {
        var cutie = g.document && g.document.getElementById("c-cv-text");
        if (cutie) textCV = cutie.value;
        S.pune("cv.pastreaza", !!el.checked);
        if (!el.checked) S.pune("cv.text", "");
        else if (textCV) S.pune("cv.text", textCV);
      },
      continua: function () {
        var cutie = g.document && g.document.getElementById("c-cv-text");
        textCV = cutie ? cutie.value : textCV;
        if (!textCV.trim()) { C.eroare = D.gol; return; }
        S.pune("cv.text", S.ia("cv.pastreaza", false) ? textCV : "");
        C.mergi("cv/q0");
      },
      rezultat: function () { S.pune("cv.verificat", true); C.mergi("cv/rezultat"); },
      /* Copiază promptul; dacă telefonul nu lasă, selectează textul ca omul să-l copieze singur. */
      copiaza: function () {
        C.copiaza("c-prompt-ia", "stare-copiere", D.ia.copiat, D.ia.selectat);
        return false;
      }
    },
    analizeaza: analizeaza,
    promptIA: promptIA,
    sectiuni: sectiuni,
    /* doar pentru teste */
    _seteazaText: function (t) { textCV = t; }
  });
})(typeof window !== "undefined" ? window : globalThis);
