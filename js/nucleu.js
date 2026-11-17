/* Nucleul aplicației: funcții comune folosite de toate modulele. */
(function (g) {
  "use strict";

  /* Fără marcaj: pentru căsuțele de scris și pentru valori. */
  function escSimplu(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }
  /* Pentru textele afișate: **ideea importantă** apare îngroșată, ca să se rețină ușor. */
  function esc(s) {
    return escSimplu(s).replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
  }

  var C = {
    module: {},
    esc: esc,
    escSimplu: escSimplu,
    ecran: "start",
    eroare: "",
    deArata: "", /* id-ul unui element care trebuie adus în ecran după următoarea desenare */
    reg: function (nume, m) { C.module[nume] = m; },
    mergi: function (nume) { C.ecran = nume; C.eroare = ""; },

    /* Buton: act = "modul.actiune" sau "nav" (schimbă ecranul). */
    buton: function (text, act, arg, clasa) {
      return '<button type="button" class="btn ' + (clasa || "") + '" data-act="' + esc(act) + '"' +
        (arg != null ? ' data-arg="' + esc(arg) + '"' : "") + ">" + text + "</button>";
    },

    /* Câmp de text legat de o cale din starea salvată. */
    camp: function (cale, eticheta, ajutor, rows) {
      var val = g.Stocare.ia(cale, "");
      var id = "c-" + cale.replace(/[^a-z0-9]/gi, "-");
      return '<div class="camp"><label for="' + id + '">' + eticheta + "</label>" +
        (ajutor ? '<p class="ajutor" id="' + id + '-a">' + ajutor + "</p>" : "") +
        '<textarea id="' + id + '" data-camp="' + esc(cale) + '" data-text="1" rows="' + (rows || 4) + '"' +
        (ajutor ? ' aria-describedby="' + id + '-a"' : "") + ">" + escSimplu(val) + "</textarea></div>";
    },

    /* Data de azi, în ora locală, ca AAAA-LL-ZZ. */
    azi: function () {
      var d = new Date();
      var m = String(d.getMonth() + 1).padStart(2, "0");
      var z = String(d.getDate()).padStart(2, "0");
      return d.getFullYear() + "-" + m + "-" + z;
    },
    /* Numărul de zile dintre două date AAAA-LL-ZZ. */
    zile: function (a, b) {
      var x = Date.UTC.apply(null, a.split("-").map(function (n, i) { return i === 1 ? n - 1 : +n; }));
      var y = Date.UTC.apply(null, b.split("-").map(function (n, i) { return i === 1 ? n - 1 : +n; }));
      return Math.round((y - x) / 86400000);
    },
    /* Adaugă zile la o dată AAAA-LL-ZZ și întoarce tot AAAA-LL-ZZ. */
    adauga: function (data, zile) {
      var p = data.split("-").map(Number), d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + zile));
      return d.getUTCFullYear() + "-" + String(d.getUTCMonth() + 1).padStart(2, "0") + "-" + String(d.getUTCDate()).padStart(2, "0");
    },
    /* AAAA-LL-ZZ devine ZZ.LL.AAAA (cum se scrie la noi). */
    format: function (data) { var p = String(data).split("-"); return p.length === 3 ? p[2] + "." + p[1] + "." + p[0] : ""; },
    /* Săptămâna curentă a planului (0 = prima), de la data la care a început planul. */
    saptamana: function () {
      var start = g.Stocare.ia("plan.start", null);
      if (!start) return 0;
      return Math.max(0, Math.floor(C.zile(start, C.azi()) / 7));
    },
    /* Gruparea pe clase pentru sfaturi. */
    grupa: function () {
      var c = g.Stocare.ia("clasa", "");
      if (c === "9" || c === "10") return ["explorare"];
      if (c === "11" || c === "12") return ["alegere"];
      return ["explorare", "alegere"];
    },
    /* Copiază textul dintr-o căsuță; dacă telefonul nu lasă, îl selectează ca omul să-l copieze singur. */
    copiaza: function (idText, idStare, mesajCopiat, mesajSelectat) {
      var doc = g.document, t = doc && doc.getElementById(idText), st = doc && doc.getElementById(idStare);
      if (!t) return;
      var spune = function (m) { if (st) st.textContent = m; };
      var selecteaza = function () { try { t.focus(); t.select(); t.setSelectionRange(0, t.value.length); } catch (e) { /* nimic */ } spune(mesajSelectat); };
      try {
        if (g.navigator && g.navigator.clipboard && g.navigator.clipboard.writeText) {
          g.navigator.clipboard.writeText(t.value).then(function () { spune(mesajCopiat); }, selecteaza);
        } else selecteaza();
      } catch (e) { selecteaza(); }
    },
    /* Adult = 18–44 sau 45+. Exercițiile comune își aleg textele și drumul după asta. */
    eAdult: function () { var v = g.Stocare.ia("varsta", ""); return !!v && v !== "sub18"; },
    acasa: function () { return C.eAdult() ? "adult/meniu" : "elev/meniu"; },
    /* Explicația despre IA și prompt, la fel pe toate ecranele cu prompt (date/ia.js). */
    ghidIA: function () {
      var A = g.DATE && g.DATE.ia; if (!A) return "";
      var li = function (x) { return x.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join(""); };
      return '<section class="card"><h2>' + esc(A.titlu) + "</h2>" + A.ce.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        "<h2>" + esc(A.pasiTitlu) + '</h2><ol class="pasi">' + li(A.pasi) + "</ol>" +
        '<p class="mic"><strong>Bine de știut:</strong></p><ul>' + li(A.binedestiut) + "</ul></section>";
    },
    /* Cum să folosești și cum să nu folosești un chat cu IA (date/ia.js), sub avertizarea despre date personale. */
    folosireIA: function () {
      var F = g.DATE && g.DATE.ia && g.DATE.ia.folosire; if (!F) return "";
      var li = function (x, s) { return x.map(function (t) { return "<li>" + s + " " + esc(t) + "</li>"; }).join(""); };
      return '<p><strong>' + esc(F.da) + '</strong></p><ul class="fara-buline">' + li(F.daLista, "✓") + "</ul>" +
        '<p><strong>' + esc(F.nu) + '</strong></p><ul class="fara-buline">' + li(F.nuLista, "✗") + "</ul>";
    },
    pagina: function (titlu, corp, inapoi) {
      return { titlu: titlu, corp: corp, inapoi: inapoi === undefined ? C.acasa() : inapoi };
    }
  };

  g.Cariera = C;
  if (typeof module !== "undefined" && module.exports) module.exports = C;
})(typeof window !== "undefined" ? window : globalThis);
