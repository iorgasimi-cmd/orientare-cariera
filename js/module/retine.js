/* „Ideea de reținut” și „Pasul tău”: același final pentru fiecare secțiune.
   C.retine(id) întoarce cartela; butonul pune pasul ca temă proprie a săptămânii, dacă omul nu are deja una. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.retine;

  function date(id) {
    var x = D.sectiuni[id]; if (!x) return null;
    var elev = !C.eAdult();
    return { idee: (elev && x.ideeElev) || x.idee, pas: (elev && x.pasElev) || x.pas };
  }

  C.retine = function (id) {
    var x = date(id); if (!x) return "";
    /* Omul a ajuns la finalul secțiunii: de aici pornesc recapitulările (prima, a doua zi). */
    if (!S.ia("rec." + id + ".urm", "")) { S.pune("rec." + id + ".urm", C.adauga(C.azi(), D.recap.zile[0])); S.pune("rec." + id + ".nivel", 0); }
    var stare = S.ia("caiet." + id + ".mesaj", "");
    var msg = stare === "pus" ? '<p class="felicitare">' + esc(D.pus) + "</p>" :
      stare === "ocupat" ? "<p>" + esc(D.ocupat) + "</p>" : "";
    if (msg) msg += '<div class="rand">' + C.buton("Planul meu", "nav", "plan/saptamana") + "</div>";
    return (C.bosi ? C.bosi(C.faro("final"), "bucurie") : "") + '<section class="card stil-asertiv"><h2>' + esc(D.titlu) + '</h2><p class="idee">' + esc(x.idee) + "</p>" +
      C.camp("caiet." + id + ".text", esc(D.scrie), esc(D.scrieAjutor), 2) +
      '<h2 class="intrebare-titlu">' + esc(D.pasTitlu) + "</h2><p>" + esc(x.pas) + "</p>" +
      '<div class="rand">' + C.buton(esc(D.buton), "retine.tema", id) + "</div>" +
      '<div id="retine-' + id + '" role="status">' + msg + "</div></section>";
  };

  /* ---- Recapitulări (repetare la distanță) ---- */
  var R = D.recap;
  function inl(t, v) { Object.keys(v).forEach(function (k) { t = t.split("{" + k + "}").join(v[k]); }); return t; }
  function facuteAzi() { var z = S.ia("rec.zi", {}) || {}; return z.data === C.azi() ? Number(z.n) || 0 : 0; }
  /* Calcul pur: secțiunile de recapitulat azi (data următoare a trecut și n-au trecut toate cele trei recapitulări). */
  function scadente(azi) {
    return Object.keys(D.sectiuni).filter(function (id) {
      var u = S.ia("rec." + id + ".urm", ""), n = Number(S.ia("rec." + id + ".nivel", 0));
      return !!u && u <= azi && n < R.zile.length;
    });
  }
  function deFacut() { return scadente(C.azi()).slice(0, Math.max(0, R.peZi - facuteAzi())); }
  /* Cartela de pe ecranul principal, doar când e ceva de recapitulat. */
  function banner() {
    var n = deFacut().length; if (!n) return "";
    return '<section class="card reamintire"><h2>' + esc(R.titlu) + "</h2><p>" + esc(inl(R.banner, { n: n === 1 ? R.unaIdee : inl(R.maiMulte, { n: n }) })) + "</p>" +
      '<div class="rand">' + C.buton(esc(R.buton), "nav", "retine/recap", "continua") + "</div></section>";
  }
  function recap() {
    var l = deFacut(), id = l[0];
    var corp = "<p>" + esc(R.intro) + "</p>";
    if (!id) {
      corp += '<p class="felicitare">' + esc(facuteAzi() ? R.gata : R.nimic) + "</p>";
    } else {
      var x = date(id), arata = S.ia("rec.arata", "") === id, tu = String(S.ia("caiet." + id + ".text", "") || "").trim();
      corp += '<section class="card"><h2>' + esc(inl(R.intrebare, { t: D.titluri[id] || id })) + "</h2>" +
        C.camp("rec." + id + ".incercare", esc(R.scrie), esc(R.scrieAjutor), 2) +
        (arata ? '<p class="idee"><strong>' + esc(R.ideea) + ":</strong> " + esc(x.idee) + "</p>" +
          (tu ? '<p class="mic">' + esc(R.tu) + "</p><p class=\"citat\">" + C.escSimplu(tu) + "</p>" : "") +
          '<div class="rand">' + C.buton("✓ " + esc(R.da), "retine.raspuns", id + "|da", "primar") + C.buton(esc(R.nu), "retine.raspuns", id + "|nu") + "</div>"
          : '<div class="rand">' + C.buton(esc(R.arata), "retine.arata", id, "continua") + "</div>") + "</section>" +
        '<p class="mic">' + (l.length) + (l.length === 1 ? " idee rămasă azi." : " idei rămase azi.") + "</p>";
    }
    if (S.ia("rec.ultim", "") === "nu") corp = '<p role="status">' + esc(R.nuMesaj) + "</p>" + corp;
    corp += '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", C.acasa()) + "</div>";
    return C.pagina(R.titlu, corp, C.acasa());
  }

  C.reg("retine", {
    ecran: function (sub) { return sub === "recap" ? recap() : C.pagina(D.titlu, "", C.acasa()); },
    actiuni: {
      arata: function (id) { S.pune("rec.arata", id); S.pune("rec.ultim", ""); },
      /* „Mi-am amintit”: trece la recapitularea următoare (7, apoi 30 de zile). „Nu prea”: ideea revine mâine. */
      raspuns: function (arg) {
        var p = String(arg).split("|"), id = p[0], da = p[1] === "da", n = Number(S.ia("rec." + id + ".nivel", 0));
        if (da) { n++; S.pune("rec." + id + ".nivel", n); if (n < R.zile.length) S.pune("rec." + id + ".urm", C.adauga(C.azi(), R.zile[n])); }
        else S.pune("rec." + id + ".urm", C.adauga(C.azi(), 1));
        S.pune("rec.zi", { data: C.azi(), n: facuteAzi() + 1 });
        S.pune("rec.arata", ""); S.pune("rec.ultim", da ? "" : "nu"); S.pune("rec." + id + ".incercare", "");
      },
      /* Pasul devine tema proprie a săptămânii de acum. Nu înlocuiește o temă aleasă deja în săptămâna asta. */
      tema: function (id) {
        var x = date(id); if (!x) return;
        if (!S.ia("plan.start", null)) S.pune("plan.start", C.azi());
        var cale = "plan.sapt.s" + C.saptamana(), al = S.ia(cale + ".aleasa", "");
        var acelasi = al === "proprie" && S.ia(cale + ".proprie", "") === x.pas;
        if (al && !acelasi) { S.pune("caiet." + id + ".mesaj", "ocupat"); C.deArata = "retine-" + id; return; }
        if (!acelasi) {
          S.pune(cale + ".aleasa", "proprie"); S.pune(cale + ".proprie", x.pas); S.pune(cale + ".bifat", false);
          S.pune(cale + ".nefacut", ""); S.pune(cale + ".mai_tarziu", "");
        }
        S.pune("caiet." + id + ".mesaj", "pus"); C.deArata = "retine-" + id;
      }
    },
    date: date,
    banner: banner,
    scadente: scadente
  });
})(typeof window !== "undefined" ? window : globalThis);
