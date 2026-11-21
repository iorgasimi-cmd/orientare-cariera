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

    var bara = '<header class="bara">' +
      (p.inapoi ? '<button type="button" class="btn mic-btn" data-act="nav" data-arg="' + esc(p.inapoi) + '" aria-label="Înapoi">← Înapoi</button>' : '<span class="spatiu"></span>') +
      '<span class="nume-app">' + (C.module.bosi ? '<span class="faro-cap" aria-hidden="true">' + C.module.bosi.desen("zambet") + "</span>" : "") + "Orientare în carieră</span>" +
      '<button type="button" class="btn mic-btn" data-act="nav" data-arg="sistem/setari">Setări</button></header>';
    radacina.innerHTML = bara +
      '<main id="continut"><h1 id="titlu" tabindex="-1">' + esc(p.titlu) + "</h1>" +
      '<div id="eroare" class="eroare" role="alert" aria-live="assertive">' + esc(C.eroare) + "</div>" + p.corp + "</main>";

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
    if (el.getAttribute("data-num")) val = Number(val);
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
