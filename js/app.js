/* Agentul principal: desenează ecranul curent, ascultă apăsările și trece conținutul spre module.
   Nu folosește nicio bibliotecă externă și nu face nicio cerere în rețea. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, V = g.Verificator, esc = C.esc;
  var doc = g.document;
  var radacina = doc.getElementById("app");
  var ultimulEcran = null;

  function ecranInitial() {
    var v = S.ia("varsta", "");
    if (!v) return "start";
    if (v === "sub18" && !S.ia("clasa", "")) return "elev/clasa";
    return C.module.sistem.traseu(v);
  }

  /* Progresul omului în tot drumul lui (câți pași din câți), ca să știe Faro cât de luminos să fie. */
  function progresFaro() {
    var varsta = S.ia("varsta", ""); if (!varsta) return null;
    var lista = varsta !== "sub18"
      ? (C.module.adult && C.module.adult.situatia() ? C.module.adult.pasiCuStare() : null)
      : (C.module.elev && C.module.elev.statiiElev ? C.module.elev.statiiElev() : null);
    if (!lista || !lista.length) return null;
    var facute = lista.filter(function (p) { return p.gata; }).length;
    return { facute: facute, total: lista.length };
  }

  function randeaza() {
    var parti = C.ecran.split("/"), nume = parti[0], sub = parti.slice(1).join("/");
    /* Elevii: accent puțin mai viu, litere de 18 px. Adulții și cei peste 45 de ani: mai liniștit, litere mai mari. */
    var varsta = S.ia("varsta", "");
    doc.body.setAttribute("data-traseu", varsta && varsta !== "sub18" ? "adult" : "elev");
    doc.documentElement.setAttribute("data-varsta", varsta || "sub18");
    var m = C.module[nume] || C.module.start;
    var p = m.ecran(sub);
    var schimbat = C.ecran !== ultimulEcran;
    var y = g.scrollY || 0;

    /* Faro semnalează (vizual și cu un ton) finalul unei etape, prima dată când ajungi pe ecranul ei de rezultat. */
    if (schimbat && /\/rezultat$/.test(C.ecran) && C.sunet) { C.sunet.gata(); C._faroPuls = true; }

    /* Faro arată, la atingere, cât de departe a ajuns omul; „lumina” lui crește cu progresul. */
    var prog = progresFaro();
    var glow = prog && prog.total ? (prog.facute / prog.total) : 0;
    var puls = C._faroPuls ? " puls" : ""; C._faroPuls = false;
    /* Notă: fără „style=" inline (CSP-ul aplicației nu-l permite) — strălucirea se pune cu JS, după desenare. */
    var faro = C.module.bosi ? '<button type="button" id="faro-cap" class="faro-cap' + puls + '" data-act="faro.tap" aria-label="Faro: ' +
      (prog ? esc("ai făcut " + prog.facute + " din " + prog.total + " pași") : "spune bună") + '" aria-expanded="' + (C._faroDeschis ? "true" : "false") + '">' +
      C.module.bosi.desen("zambet") + "</button>" : "";
    var callout = (C._faroDeschis && prog) ? '<div class="faro-prog" role="status">' +
      "<p>" + esc("Ai făcut " + prog.facute + " din " + prog.total + " pași.") + "</p>" +
      '<div class="rand"><button type="button" class="btn mic-btn" data-act="sunet.comuta">' + (C.sunet && C.sunet.oprit() ? "🔇 Pornesc sunetul" : "🔊 Opresc sunetul") + "</button></div></div>" : "";

    var bara = '<header class="bara">' +
      (p.inapoi ? '<button type="button" class="btn mic-btn semn-inapoi" data-act="nav" data-arg="' + esc(p.inapoi) + '" aria-label="Înapoi">← Înapoi</button>' : '<span class="spatiu"></span>') +
      '<span class="nume-app">' + faro + "Orientare în carieră</span>" +
      '<span class="spatiu"></span></header>' + callout;
    radacina.innerHTML = bara +
      '<main id="continut"><h1 id="titlu" tabindex="-1">' + esc(p.titlu) + "</h1>" +
      '<div id="eroare" class="eroare" role="alert" aria-live="assertive">' + esc(C.eroare) + "</div>" + p.corp + "</main>";
    var faroEl = doc.getElementById("faro-cap");
    if (faroEl) faroEl.style.setProperty("--glow", glow.toFixed(2));

    ultimulEcran = C.ecran;
    if (schimbat) {
      g.scrollTo(0, 0);
      var t = doc.getElementById("titlu");
      if (t) t.focus({ preventScroll: true });
    } else {
      g.scrollTo(0, y);
    }
    if (C.deArata) {
      /* Răspunsul la un buton trebuie să se vadă imediat, chiar dacă e mai jos pe pagină. */
      var tinta = doc.getElementById(C.deArata);
      C.deArata = "";
      if (tinta && tinta.firstChild && tinta.scrollIntoView) tinta.scrollIntoView({ block: "start" });
    }
    if (C.eroare) {
      var e = doc.getElementById("eroare");
      if (e && e.scrollIntoView) e.scrollIntoView({ block: "center" });
    }
  }
  C.reafiseaza = randeaza;

  function actiune(act, arg, el) {
    if (act === "nav") { C.mergi(arg); return true; }
    /* Faro, din antet: la atingere, arată (sau ascunde) cât de departe a ajuns omul, cu un ton scurt. */
    if (act === "faro.tap") {
      if (C.sunet) C.sunet.atingere();
      C._faroDeschis = !C._faroDeschis;
      return true;
    }
    if (act === "sunet.comuta") { if (C.sunet) C.sunet.comuta(); return true; }
    var parti = act.split("."), m = C.module[parti[0]];
    if (!m || !m.actiuni || typeof m.actiuni[parti[1]] !== "function") return true;
    return m.actiuni[parti[1]](arg, el) !== false;
  }

  doc.addEventListener("click", function (ev) {
    var el = ev.target.closest && ev.target.closest("[data-act]");
    if (!el) return;
    if (actiune(el.getAttribute("data-act"), el.getAttribute("data-arg"), el)) randeaza();
  });

  doc.addEventListener("change", function (ev) {
    var el = ev.target;
    if (!el || !el.getAttribute) return;
    var chg = el.getAttribute("data-chg");
    if (chg) {
      if (actiune(chg, el.value, el)) randeaza();
      return;
    }
    var cale = el.getAttribute("data-camp");
    if (!cale) return;
    var val = el.value;
    if (el.getAttribute("data-num")) { val = Number(val); C._faroPuls = true; } /* Faro „tresare” ușor la fiecare răspuns la un test — fără sunet */
    S.pune(cale, val);
    /* Mesajul de eroare dispare după ce omul răspunde. */
    C.eroare = "";
    var zonaEroare = doc.getElementById("eroare");
    if (zonaEroare) zonaEroare.textContent = "";
    /* Oprire blândă dacă textul scris arată un moment greu. */
    if (el.getAttribute("data-text") && V.areSemneCriza(val)) { C.mergi("sistem/criza"); randeaza(); return; }
    /* Unele alegeri schimbă ce se vede pe ecran (de exemplu apare butonul „Am făcut tema”). */
    if (el.getAttribute("data-rerand")) randeaza();
  });

  /* Salvăm și în timpul scrierii, ca să nu se piardă textul dacă se închide pagina. */
  doc.addEventListener("input", function (ev) {
    var el = ev.target;
    if (el && el.getAttribute && el.getAttribute("data-text")) {
      S.pune(el.getAttribute("data-camp"), el.value);
      /* Omul vede că ce a scris nu se pierde. */
      var st = el.parentNode && el.parentNode.querySelector && el.parentNode.querySelector(".salvat-camp");
      if (st) st.textContent = "✓ Salvat";
    }
  });

  C.mergi(ecranInitial());
  randeaza();
  if (C.module.reamintiri) C.module.reamintiri.laDeschidere();

  /* Funcționare fără internet. Merge doar pe https sau localhost. */
  if ("serviceWorker" in g.navigator && (g.location.protocol === "https:" || g.location.hostname === "localhost")) {
    g.addEventListener("load", function () { g.navigator.serviceWorker.register("sw.js").catch(function () { /* opțional */ }); });
  }
})(window);
