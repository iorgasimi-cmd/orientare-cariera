/* Subagent 3: plan și teme săptămânale.
   Scop în stil SMART, trei teme pe săptămână (ușoară, potrivită, mai grea) din care omul alege una,
   obiceiuri mici (când, unde, după ce, varianta de 2 minute, o mică bucurie), întrebarea „ce fel de om”,
   cele 5 obstacole (4.3), exercițiul „ce vreau, ce m-ar putea opri, ce fac atunci” (planul „Dacă…, atunci…”), convingeri limitative (5.1), recadrare (5.3), privire înapoi (7.1).
   Cele trei nevoi de motivație: autonomie, competență, relaționare. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.sfaturi, esc = C.esc;

  var SCOP = [
    { c: "intentie", lit: "Intenția", exp: "Începem cu ce ți-ai dori, în cuvinte simple.",
      q: "Ce ți-ai dori să se întâmple sau să începi, în următoarele luni, în legătură cu școala sau cariera?",
      qAdult: "Ce ți-ai dori să se întâmple sau să începi, în următoarele luni, în legătură cu munca sau cariera ta?" },
    { c: "specific", lit: "S – specific", exp: "Un scop clar spune exact ce faci. „Un job mai bun” e vag; „Vorbesc cu două persoane care lucrează ca…” e clar.",
      expElev: "Un scop clar spune exact ce faci. „Să aflu ce mi se potrivește” e vag; „Vorbesc cu două persoane care lucrează ca…” e clar.",
      q: "Spune într-o propoziție ce vrei să faci, cât mai clar." },
    { c: "masurabil", lit: "M – măsurabil", exp: "Ca să știi că ai reușit, ai nevoie de ceva ce poți număra sau bifa.",
      q: "Cum vei ști că ai reușit? Ce poți număra sau bifa?" },
    { c: "realizabil", lit: "A – realizabil", exp: "Scopul trebuie să fie ceva ce poți face cu ce ai acum.",
      q: "Ce ai deja sau ce poți face ca să ți se întâmple acest lucru? Ce ți se pare greu?" },
    { c: "relevant", lit: "R – relevant", exp: "Scopul trebuie să conteze pentru tine, nu doar pentru alții.",
      q: "Cum se leagă acest scop de ce ai aflat despre tine (test, puncte forte, valori)?" },
    { c: "termen", lit: "T – cu termen", exp: "O dată anume te ajută să începi.", q: "Până când vrei să ajungi aici?", data: true }
  ];

  /* Trei teme pe săptămână: una ușoară, una potrivită, una mai grea, alese rotativ din bancă. Calcul pur. */
  function temeSaptamanii(idx) {
    var b = C.eAdult() ? D.teme_adulti : D.teme_saptamanale;
    return [1, 2, 3].map(function (nv) {
      var l = b.filter(function (t) { return t.nivel === nv; });
      return l[idx % l.length];
    });
  }
  /* Fraza „Voi face tema marți, la ora 18, la birou, după ce beau cafeaua.” din ce a scris omul. */
  function frazaObicei(cale) {
    var O = D.obicei, p = [S.ia(cale + ".cand", ""), S.ia(cale + ".unde", "")].map(function (x) { return String(x || "").trim(); }).filter(Boolean);
    var dupa = String(S.ia(cale + ".dupa", "") || "").trim();
    if (!p.length && !dupa) return "";
    return O.fraza + (p.length ? " " + p.join(", ") : "") + (dupa ? (p.length ? ", " : " ") + "după ce " + dupa.replace(/^după ce\s+/i, "") : "") + ".";
  }

  /* ---- Progresul zilnic ---- */
  function zileLucru() { return (S.ia("plan.zile", []) || []).slice().sort(); }
  /* Calcul pur: câte zile la rând, până azi (sau până ieri, dacă azi încă nu a bifat). */
  function serie(zile, azi) {
    var set = {}; zile.forEach(function (z) { set[z] = true; });
    var d = set[azi] ? azi : C.adauga(azi, -1), n = 0;
    while (set[d]) { n++; d = C.adauga(d, -1); }
    return n;
  }
  /* Calcul pur: a lucrat înainte, dar nici ieri, nici azi. */
  function aSarit(zile, azi) {
    if (!zile.length || zile.indexOf(azi) >= 0) return false;
    return zile[zile.length - 1] < C.adauga(azi, -1);
  }
  function cardProgres(idx) {
    var P = D.progres, z = zileLucru(), azi = C.azi(), st = S.ia("plan.start", azi), facutAzi = z.indexOf(azi) >= 0;
    var zi0 = C.adauga(st, idx * 7), rand = "";
    for (var k = 0; k < 7; k++) {
      var d = C.adauga(zi0, k), zs = (new Date(d + "T12:00:00Z").getUTCDay() + 6) % 7, bif = z.indexOf(d) >= 0;
      rand += '<li class="' + (bif ? "zi bif" : "zi") + (d === azi ? " azi" : "") + '"><span class="sr">' + esc(P.numeZile[zs]) + (bif ? ", ai lucrat" : "") + '</span><span aria-hidden="true">' + esc(P.zile[zs]) + "<br>" + (bif ? "✓" : "○") + "</span></li>";
    }
    var n = serie(z, azi);
    var corp = '<section class="card" id="progres"><h2>' + esc(P.titlu) + "</h2><p>" + esc(P.explica) + "</p>" +
      '<ul class="zile">' + rand + "</ul>" +
      (n ? "<p>" + esc(n === 1 ? P.serieUna : P.serie.replace("{n}", n)) + "</p>" : "") +
      '<div class="rand">' + C.buton(facutAzi ? P.butonFacut : esc(P.buton), "plan.azi", null, facutAzi ? "salvat" : "continua") + "</div>" +
      (facutAzi ? '<p class="felicitare" role="status">' + esc(P.felicitari[z.length % P.felicitari.length]) + "</p>" : "");
    if (aSarit(z, azi)) {
      var mini = String(S.ia("plan.sapt.s" + idx + ".mini", "") || "").trim();
      corp += '<div class="termen" role="status"><p>' + esc(P.sarit) + "</p>" + (mini ? "<p><strong>" + C.escSimplu(mini) + "</strong></p>" : "") + "</div>" +
        C.camp("plan.ajuta", esc(P.ajuta), esc(P.ajutaEx), 2);
    }
    return corp + "</section>";
  }
  function cardPrieten(idx) {
    var P = D.progres, tema = String(textTema(idx) || "").replace(/\*\*/g, "").trim();
    if (!tema) return "";
    var fr = frazaObicei("plan.sapt.s" + idx);
    var txt = P.prietenText.replace("{tema}", tema).replace("{obicei}", fr ? fr + " " : "");
    return '<section class="card"><h2>' + esc(P.prietenTitlu) + "</h2><p>" + esc(P.prietenExplica) + "</p>" +
      '<div class="camp"><label for="c-prieten">Mesajul</label><textarea id="c-prieten" rows="4" readonly>' + C.escSimplu(txt) + "</textarea></div>" +
      '<div class="rand">' + C.buton(esc(P.copiaza), "plan.copiaza_prieten") + '</div><p id="stare-prieten" class="mic" role="status"></p>' +
      C.camp("plan.ajutor", esc(D.idei.ajutor), esc(D.idei.ajutorEx), 2) + "</section>";
  }
  /* Săptămânile terminate la rând, înainte de cea de acum. Calcul pur. */
  function saptLaRand(idx) { var n = 0; for (var k = idx - 1; k >= 0 && S.ia("plan.sapt.s" + k + ".bifat", false); k--) n++; return n; }

  /* „Dacă [obstacol], atunci [plan].” din răspunsurile omului. Calcul pur. */
  function frazaWoop() {
    var W = D.woop, o = String(S.ia("plan.woop.obstacol", "") || "").trim(), p = String(S.ia("plan.woop.plan", "") || "").trim();
    if (!o || !p) return "";
    o = o.replace(/^dac[ăa]\s+/i, "").replace(/[.!]+$/, ""); p = p.replace(/^atunci\s+/i, "").replace(/[.!]+$/, "");
    return W.daca + " " + o.charAt(0).toLowerCase() + o.slice(1) + ", " + W.atunci + " " + p.charAt(0).toLowerCase() + p.slice(1) + ".";
  }
  function woop() {
    var W = D.woop, fr = frazaWoop();
    var corp = "<p>" + esc(W.intro) + "</p>" +
      C.camp("plan.woop.dorinta", esc(W.dorinta), esc(C.eAdult() ? W.dorintaAdult : W.dorintaElev), 2) +
      C.camp("plan.woop.rezultat", esc(W.rezultat), esc(W.rezultatAjutor), 2) +
      C.camp("plan.woop.obstacol", esc(W.obstacol), esc(W.obstacolAjutor), 2) +
      C.camp("plan.woop.plan", esc(W.plan), esc(W.planAjutor), 2) +
      '<div class="rand">' + C.buton("Văd planul meu", "plan.woop_gata", null, "primar") + "</div>" +
      '<div id="woop-fraza" role="status">' + (fr ? '<section class="card stil-asertiv"><h2>' + esc(W.fraza) + '</h2><p class="citat">' + C.escSimplu(fr) + "</p></section>" : "") + "</div>" +
      '<div class="rand">' + C.buton("Înapoi la plan", "nav", "plan/hub") + "</div>";
    return C.pagina(W.titlu, corp, "plan/hub");
  }

  function hub() {
    var scop = S.ia("plan.scop.specific", "") || S.ia("plan.scop.intentie", "");
    var corp = "";
    var rem = C.module.reamintiri;
    if (rem) corp += rem.banner();
    if (C.butonLectie) corp += C.butonLectie("plan");
    corp += cardRestanta();
    corp += '<section class="card"><h2>Scopul meu</h2>' +
      (scop ? '<p class="citat">' + esc(scop) + "</p>" +
        (S.ia("plan.scop.termen", "") ? "<p class=\"mic\">Termen: " + esc(S.ia("plan.scop.termen", "")) + "</p>" : "") +
        '<div class="rand">' + C.buton("Văd tot scopul", "nav", "plan/scopRez") + C.buton("Îl schimb", "nav", "plan/scop0") + "</div>"
        : "<p>Încă nu ți-ai pus un scop. Te ajut eu, o întrebare pe rând.</p><div class=\"rand\">" + C.buton("Îmi pun un scop", "nav", "plan/scop0", "primar") + "</div>") +
      "</section>" +
      '<section class="card"><h2>Tema săptămânii</h2><p>Alegi tu una din trei teme mici: una ușoară, una potrivită și una mai grea. Sau îți scrii propria temă.</p><div class="rand">' + C.buton("Văd temele", "nav", "plan/saptamana", "primar") + "</div></section>" +
      '<section class="card"><h2>' + esc(D.woop.titlu) + "</h2><p>" + esc(D.woop.hub) + "</p>" + (frazaWoop() ? '<p class="citat">' + C.escSimplu(frazaWoop()) + "</p>" : "") +
        '<div class="rand">' + C.buton(frazaWoop() ? "Îl schimb" : "Încep", "nav", "plan/woop", frazaWoop() ? "" : "primar") + "</div></section>" +
      '<section class="card"><h2>Ce m-ar putea opri</h2><p>Cele mai frecvente obstacole, și o idee pentru fiecare.</p><div class="rand">' + C.buton("Văd obstacolele", "nav", "plan/obstacole") + C.buton("Un gând care mă oprește", "nav", "plan/convingere") + "</div></section>" +
      '<section class="card"><h2>Privire înapoi</h2><p>Ce a mers, ce a rămas, ce schimb.</p><div class="rand">' + C.buton("Mă uit înapoi", "nav", "plan/privire") + "</div></section>" +
      '<p class="nota"><strong>Tu alegi scopul, pașii și ritmul.</strong> Aici propun, nu hotărăsc eu.</p>';
    return C.pagina("Planul meu", corp);
  }

  function scopPas(i) {
    var s = SCOP[i];
    var corp = '<p class="mic">Pasul ' + (i + 1) + " din " + SCOP.length + "</p>" +
      '<p class="termen"><strong>' + esc(s.lit) + ".</strong> " + esc(!C.eAdult() && s.expElev ? s.expElev : s.exp) + "</p>";
    if (s.data) {
      var v = S.ia("plan.scop.termen", "");
      corp += '<div class="camp"><label for="c-termen">' + esc(s.q) + '</label><input id="c-termen" type="date" data-camp="plan.scop.termen" min="' + C.azi() + '" value="' + esc(v) + '"></div>';
    } else {
      corp += C.camp("plan.scop." + s.c, esc(C.eAdult() && s.qAdult ? s.qAdult : s.q), "", 4);
    }
    corp += '<div class="rand">' + C.buton("Înapoi", "nav", i > 0 ? "plan/scop" + (i - 1) : "plan/hub") +
      (i < SCOP.length - 1 ? C.buton("Continuă", "nav", "plan/scop" + (i + 1), "continua") : C.buton("Gata", "plan.scop_gata", null, "primar")) + "</div>";
    return C.pagina("Scopul meu", corp, "plan/hub");
  }

  function scopRez() {
    var corp = "<p><strong>Iată scopul tău, scris cu cuvintele tale.</strong> Citește-l și vezi dacă ți se pare potrivit.</p>";
    SCOP.forEach(function (s) {
      var v = S.ia("plan.scop." + s.c, "");
      if (v) corp += '<section class="card"><h2>' + esc(s.lit) + "</h2><p>" + esc(v) + "</p></section>";
    });
    var I = D.identitate;
    corp += C.camp("plan.identitate", esc(I.q), esc(C.eAdult() ? I.exAdult : I.exElev), 2);
    corp += C.camp("plan.planB", esc(D.idei.planB), esc(D.idei.planBEx), 2);
    corp += "<p>Dacă ți se pare prea mult, poți alege un scop mai mic. Un singur scop mare e de ajuns pentru început.</p>" +
      '<div class="rand">' + C.buton("Îl las așa", "nav", "plan/hub", "primar") + C.buton("Vreau să-l schimb", "nav", "plan/scop0") + "</div>";
    return C.pagina("Scopul tău", corp, "plan/hub");
  }

  /* Ultima zi a săptămânii cu numărul idx (0 = prima), ca AAAA-LL-ZZ. */
  function dataSf(idx) { var st = S.ia("plan.start", null); return st ? C.adauga(st, idx * 7 + 6) : ""; }
  function textTema(k) {
    var s = S.ia("plan.sapt.s" + k, {}) || {};
    if (s.aleasa === "proprie") return s.proprie || "Tema ta";
    var t = D.teme_saptamanale.concat(D.teme_adulti).filter(function (x) { return x.id === s.aleasa; })[0];
    return t ? t.t : "";
  }
  /* Săptămâni trecute în care omul a ales o temă și n-a făcut-o până la termen (și n-a închis-o). Calcul pur. */
  function restante() {
    var idx = C.saptamana(), rez = [];
    for (var k = 0; k < idx; k++) {
      var s = S.ia("plan.sapt.s" + k, null);
      if (s && s.aleasa && !s.bifat && !s.inchisa) rez.push(k);
    }
    return rez;
  }
  function cardRestanta() {
    var r = restante();
    if (!r.length) return "";
    var k = r[r.length - 1];
    return '<section class="card restanta" role="status"><h2>O temă din săptămâna ' + (k + 1) + " nu a fost făcută</h2>" +
      '<p class="citat">' + esc(textTema(k)) + "</p>" +
      "<p>Termenul a trecut (" + esc(C.format(dataSf(k))) + "). E în regulă, se întâmplă. Poți schimba tema sau poți alege pași mai mici, care se fac mai ușor. Un pas mic contează.</p>" +
      '<div class="rand">' + C.buton("Schimb tema", "plan.schimba", null, "primar") + C.buton("Am făcut-o totuși", "plan.totusi", String(k)) + "</div></section>";
  }

  function saptamana() {
    if (!S.ia("plan.start", null)) S.pune("plan.start", C.azi()); /* planul începe când omul își alege prima temă */
    var idx = C.saptamana(), teme = temeSaptamanii(idx), cale = "plan.sapt.s" + idx;
    var aleasa = S.ia(cale + ".aleasa", ""), bifat = S.ia(cale + ".bifat", false);
    var nefacut = !!aleasa && S.ia(cale + ".nefacut", "") === aleasa && !bifat;
    var maiTarziu = !!aleasa && S.ia(cale + ".mai_tarziu", "") === aleasa && !bifat;
    var sf = dataSf(idx);
    var corp = (C.bosi ? C.bosi(D.idei.imperfect) : "") + cardRestanta() + '<p class="mic">Săptămâna ' + (idx + 1) + " a planului tău." + (sf ? " Termen: " + esc(C.format(sf)) + "." : "") + "</p>" +
      (saptLaRand(idx) >= 2 && !aleasa ? '<p class="termen">' + esc(D.progres.provocare) + "</p>" : "") +
      '<fieldset class="intrebare"><legend>Alege o temă (sau scrie-ți propria temă mai jos)</legend>';
    teme.forEach(function (t) {
      corp += '<label class="val"><input type="radio" name="tema" value="' + esc(t.id) + '" data-camp="' + cale + '.aleasa" data-rerand="1"' + (aleasa === t.id ? " checked" : "") + "><span>" + esc(t.t) + "<small>" + esc(D.niveluri[t.nivel] || "") + "</small></span></label>";
    });
    corp += '<label class="val"><input type="radio" name="tema" value="proprie" data-camp="' + cale + '.aleasa" data-rerand="1"' + (aleasa === "proprie" ? " checked" : "") + "><span>Îmi scriu propria temă (poate un pas mai mic)</span></label></fieldset>";
    if (aleasa === "proprie") corp += C.camp(cale + ".proprie", "Tema mea", "", 3);
    var butoane = "";
    if (aleasa && !bifat) {
      butoane = C.buton("Am făcut tema", "plan.bifeaza", String(idx), "primar") +
        C.buton(maiTarziu ? "✓ Fac tema mai târziu" : "Fac tema mai târziu", "plan.maitarziu", String(idx), maiTarziu ? "salvat" : "") +
        C.buton(nefacut ? "✓ Nu am făcut-o încă" : "Nu am făcut-o încă", "plan.nefacut", String(idx), nefacut ? "salvat" : "");
    } else if (aleasa && bifat) {
      butoane = C.buton("✓ Tema e făcută (apasă ca să scoți)", "plan.bifeaza", String(idx), "salvat");
    }
    corp += '<div class="rand">' + butoane + "</div>";
    /* Răspunsul la butoane apare chiar sub ele, ca să se vadă imediat. */
    var raspuns = "";
    if (maiTarziu) {
      raspuns += '<section class="card" role="status"><p>Bine. Tema rămâne pe lista ta' + (sf ? " până la termen, " + esc(C.format(sf)) : "") +
        ". Revino când ești gata și apasă „Am făcut tema”.</p></section>";
    }
    if (nefacut) {
      var mini = String(S.ia(cale + ".mini", "") || "").trim();
      raspuns += '<section class="card" role="status"><p>' + esc(D.mesaje.fara_tema) + "</p>" +
        (mini ? "<p>" + esc(D.obicei.miniMesaj) + ' <strong>' + C.escSimplu(mini) + "</strong></p>" : "") + '<div class="rand">' +
        C.buton("Aleg altă temă", "plan.alta", String(idx)) + "</div></section>";
    }
    if (bifat) {
      var f = D.mesaje.felicitare;
      raspuns += '<p class="felicitare" role="status">' + esc(f[idx % f.length]) + "</p>";
    }
    corp += '<div id="mesaj-tema">' + raspuns + "</div>";
    if (aleasa) corp += cardProgres(idx);
    if (aleasa && !bifat) {
      var O = D.obicei, fr = frazaObicei(cale);
      corp += '<section class="card"><h2>' + esc(O.titlu) + "</h2><p>" + esc(O.explica) + "</p>" + '<p class="idee">' + esc(D.idei.unSingurLucru) + "</p>" +
        C.camp(cale + ".cand", esc(O.cand), esc(O.candEx), 1) +
        C.camp(cale + ".unde", esc(O.unde), esc(O.undeEx), 1) +
        C.camp(cale + ".dupa", esc(O.dupa), esc(C.eAdult() ? O.dupaAdult : O.dupaElev), 1) +
        (fr ? '<p class="citat">' + C.escSimplu(fr) + "</p>" : "") +
        C.camp(cale + ".mini", esc(O.mini), esc(O.miniEx), 2) +
        C.camp(cale + ".bucurie", esc(O.bucurie), esc(O.bucurieEx), 1) +
        (frazaWoop() ? '<p class="mic">' + esc(D.woop.fraza) + '</p><p class="citat">' + C.escSimplu(frazaWoop()) + "</p>" : "") + "</section>";
    }
    if (aleasa && !bifat) corp += cardPrieten(idx);
    if (aleasa && !bifat && sf) {
      var oraRem = S.ia("rem.ora", "18:00");
      corp += '<section class="card"><h2>Reamintire în calendarul telefonului</h2>' +
        "<p><strong>Telefonul îți poate aminti de temă în fiecare zi</strong>, până la termen. Merge chiar și când aplicația e închisă.</p>" +
        '<div class="camp"><label for="c-rem-ora">La ce oră să-ți amintească?</label><input id="c-rem-ora" type="time" data-camp="rem.ora" value="' + esc(oraRem) + '"></div>' +
        '<div class="rand">' + C.buton("Adaug reamintirea în calendar", "reamintiri.calendar", String(idx)) + "</div>" +
        (S.ia(cale + ".calendar", false) ? '<p role="status"><strong>Gata, am pregătit reamintirea.</strong> Acum deschide fișierul descărcat. Îl găsești sus, în bara telefonului, sau în „Descărcări”. Apoi apasă „<strong>Adaugă</strong>” sau „<strong>Salvează</strong>”.</p>' : "") +
        '<p class="mic">Când termini tema, <strong>șterge reamintirea din calendar</strong>. Aplicația nu o poate șterge singură.</p>' +
        "</section>";
    }
    corp += '<p class="nota">Poți schimba tema oricând. Dacă una ți se pare grea, alege alta sau un pas mai mic.</p>';
    return C.pagina("Tema săptămânii", corp, "plan/hub");
  }

  function obstacole() {
    var corp = "<p>Orice plan întâlnește obstacole. Dacă le cunoști dinainte, îți e mai ușor. Bifează cele care ți se potrivesc.</p>" + '<p class="termen">' + esc(D.idei.emotii) + "</p>";
    D.obstacole.forEach(function (o) {
      var bif = S.ia("plan.obst." + o.id + ".da", false);
      corp += '<section class="card"><h2>' + esc(o.nume) + "</h2><p>" + esc(o.explicatie) + "</p>" +
        '<label class="val"><input type="checkbox" data-chg="plan.obstacol" value="' + o.id + '"' + (bif ? " checked" : "") + "><span>Mi se potrivește uneori</span></label>" +
        '<p class="idee"><strong>O idee:</strong> ' + esc(o.idee) + "</p>" +
        C.camp("plan.obst." + o.id + ".raspuns", "Dacă se întâmplă asta, ce faci?", "Scrie așa: „Dacă…, atunci…”.", 2) + "</section>";
    });
    corp += '<div class="rand">' + C.buton("Înapoi la plan", "nav", "plan/hub") + C.buton("Un gând care mă oprește", "nav", "plan/convingere", "primar") + "</div>";
    return C.pagina("Ce m-ar putea opri", corp, "plan/hub");
  }

  function convingere() {
    var corp = "<p>Uneori ne oprește o poveste pe care ne-o spunem despre noi. De exemplu: „Nu sunt bun(ă) la așa ceva.” Putem s-o scriem altfel, apoi să alegem un pas.</p>" +
      C.camp("plan.conv.veche", "Gândul care mă oprește", "", 2) +
      C.camp("plan.conv.noua", "Cum aș putea să-l scriu astfel încât să mă ajute?", "De exemplu: „Încă învăț, iar fiecare încercare mă ajută.”", 3) +
      C.camp("plan.conv.actiune", "Ce pas mic pot face în săptămâna asta?", "", 2) +
      "<h2>" + esc(D.idei.controlTitlu) + "</h2><p>" + esc(D.idei.controlExplica) + "</p>" +
      C.camp("plan.control.da", esc(D.idei.depinde), esc(C.eAdult() ? D.idei.depindeEx : D.idei.depindeElev), 3) +
      C.camp("plan.control.nu", esc(D.idei.nuDepinde), esc(C.eAdult() ? D.idei.nuDepindeEx : D.idei.nuDepindeElev), 3) +
      "<h2>Aceeași întâmplare, privită altfel</h2>" +
      "<p>O situație se poate vedea în mai multe feluri. De exemplu, " +
        (C.eAdult() ? "„Am pierdut trei luni cu interviuri” poate deveni „Am avut trei luni de antrenament la interviuri”."
          : "„Am luat o notă mică la test” poate deveni „Acum știu exact ce mai am de învățat până la teză”.") + " Încearcă și tu.</p>" +
      C.camp("plan.recadrare.veche", "O situație care mă supără", "", 2) +
      C.camp("plan.recadrare.noua", "Ce am învățat din ea? Cum o pot privi altfel?", "", 3) +
      '<div class="rand">' + C.buton("Înapoi la plan", "nav", "plan/hub", "primar") + "</div>";
    return C.pagina("Un gând care mă oprește", corp, "plan/hub");
  }

  function privire() {
    var sapt = S.ia("plan.sapt", {}), nr = 0, total = Object.keys(sapt).length;
    Object.keys(sapt).forEach(function (k) { if (sapt[k] && sapt[k].bifat) nr++; });
    var corp = "<p>Din când în când e bine să te oprești și să te uiți înapoi. Nu e un test: e doar pentru tine.</p>" +
      (total ? '<p class="citat">Ai ales teme în ' + total + (total === 1 ? " săptămână" : " săptămâni") + " și ai terminat " + nr + ".</p>" : "") +
      '<section class="card stil-asertiv"><h2>' + esc(D.progres.linieTitlu) + "</h2><p>" + esc(D.progres.linie) + "</p>" +
        (nr || zileLucru().length ? "<p>" + esc(D.progres.facut.replace("{t}", nr === 1 ? "o temă terminată" : nr + " teme terminate").replace("{z}", zileLucru().length === 1 ? "o zi de lucru" : zileLucru().length + " zile de lucru")) + "</p>" : "") + "</section>" +
      C.camp("plan.privire.mers", "Ce a mers bine?", "", 3) +
      C.camp("plan.privire.ramas", "Ce a rămas nefăcut sau ți-a fost greu?", "", 3) +
      C.camp("plan.privire.schimb", "Ce schimbi începând de acum?", "", 3) +
      '<p class="nota">' + esc(D.mesaje.fara_tema) + "</p>" +
      '<div class="rand">' + C.buton("Înapoi la plan", "nav", "plan/hub", "primar") + "</div>";
    return C.pagina("Privire înapoi", corp, "plan/hub");
  }

  C.reg("plan", {
    ecran: function (sub) {
      var m = /^scop([0-5])$/.exec(sub || "");
      if (m) return scopPas(Number(m[1]));
      if (sub === "scopRez") return scopRez();
      if (sub === "saptamana") return saptamana();
      if (sub === "obstacole") return obstacole();
      if (sub === "woop") return woop();
      if (sub === "convingere") return convingere();
      if (sub === "privire") return privire();
      return hub();
    },
    actiuni: {
      woop_gata: function () { C.deArata = "woop-fraza"; },
      azi: function () {
        var z = zileLucru(), a = C.azi(), i = z.indexOf(a);
        if (i >= 0) z.splice(i, 1); else z.push(a);
        S.pune("plan.zile", z); C.deArata = "progres";
      },
      copiaza_prieten: function () { C.copiaza("c-prieten", "stare-prieten", D.progres.copiat, D.progres.selectat); return false; },
      scop_gata: function () {
        if (!S.ia("plan.start", null)) S.pune("plan.start", C.azi());
        C.mergi("plan/scopRez");
      },
      bifeaza: function (idx) {
        var cale = "plan.sapt.s" + idx + ".bifat";
        S.pune(cale, !S.ia(cale, false));
        S.pune("plan.sapt.s" + idx + ".nefacut", "");
        S.pune("plan.sapt.s" + idx + ".mai_tarziu", "");
        C.deArata = "mesaj-tema";
      },
      maitarziu: function (idx) {
        var c = "plan.sapt.s" + idx;
        var acum = S.ia(c + ".mai_tarziu", "") === S.ia(c + ".aleasa", "");
        S.pune(c + ".mai_tarziu", acum ? "" : S.ia(c + ".aleasa", ""));
        S.pune(c + ".nefacut", "");
        C.deArata = "mesaj-tema";
      },
      /* Termenul a trecut: omul alege o altă temă (sau un pas mai mic). Temele vechi nefăcute se închid. */
      schimba: function () {
        restante().forEach(function (k) { S.pune("plan.sapt.s" + k + ".inchisa", true); });
        C.mergi("plan/saptamana");
      },
      totusi: function (k) { S.pune("plan.sapt.s" + k + ".bifat", true); },
      /* Omul nu a făcut tema încă: nu e o greșeală. Primește un mesaj blând și poate alege altă temă. */
      nefacut: function (idx) {
        var c = "plan.sapt.s" + idx;
        var acum = S.ia(c + ".nefacut", "") === S.ia(c + ".aleasa", "");
        S.pune(c + ".nefacut", acum ? "" : S.ia(c + ".aleasa", ""));
        S.pune(c + ".mai_tarziu", "");
        C.deArata = "mesaj-tema";
      },
      alta: function (idx) {
        var c = "plan.sapt.s" + idx;
        S.pune(c + ".aleasa", ""); S.pune(c + ".nefacut", ""); S.pune(c + ".mai_tarziu", ""); S.pune(c + ".bifat", false);
      },
      obstacol: function (id, el) { S.pune("plan.obst." + id + ".da", !!el.checked); return false; }
    },
    temeSaptamanii: temeSaptamanii,
    frazaObicei: frazaObicei,
    frazaWoop: frazaWoop,
    serie: serie,
    aSarit: aSarit,
    restante: restante,
    textTema: textTema,
    dataSf: dataSf
  });
})(typeof window !== "undefined" ? window : globalThis);
