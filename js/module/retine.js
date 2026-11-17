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
    var stare = S.ia("caiet." + id + ".mesaj", "");
    var msg = stare === "pus" ? '<p class="felicitare">' + esc(D.pus) + "</p>" :
      stare === "ocupat" ? "<p>" + esc(D.ocupat) + "</p>" : "";
    if (msg) msg += '<div class="rand">' + C.buton("Planul meu", "nav", "plan/saptamana") + "</div>";
    return '<section class="card stil-asertiv"><h2>' + esc(D.titlu) + '</h2><p class="idee">' + esc(x.idee) + "</p>" +
      C.camp("caiet." + id + ".text", esc(D.scrie), esc(D.scrieAjutor), 2) +
      '<h2 class="intrebare-titlu">' + esc(D.pasTitlu) + "</h2><p>" + esc(x.pas) + "</p>" +
      '<div class="rand">' + C.buton(esc(D.buton), "retine.tema", id) + "</div>" +
      '<div id="retine-' + id + '" role="status">' + msg + "</div></section>";
  };

  C.reg("retine", {
    ecran: function () { return C.pagina(D.titlu, "", C.acasa()); },
    actiuni: {
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
    date: date
  });
})(typeof window !== "undefined" ? window : globalThis);
