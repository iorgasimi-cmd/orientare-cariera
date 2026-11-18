/* „Cum găsești informații sigure”: metoda în 5 pași, site-uri oficiale, mesajul pentru IA și o misiune de căutare.
   Singura secțiune în care apar nume și adrese de site-uri (aprobat de Simona). */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.cauta;
  function e45() { return S.ia("varsta", "") === "45+"; }

  function intro() {
    var corp = (C.bosi ? C.bosi(e45() ? D.faro45 : D.faro) : "") + D.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="meniu-lista">' + D.meniu.map(function (m, i) {
        return C.buton("<strong>" + (i + 1) + ". " + esc(m.t) + '</strong><span class="stare">' + esc(m.d) + "</span>", "nav", "cauta/" + m.id, "lista");
      }).join("") + "</div>" + (S.ia("cauta.gata", false) ? C.retine("cauta") : "");
    return C.pagina(D.titlu, corp, C.acasa());
  }
  function inapoi(urm, t) {
    return '<div class="rand">' + C.buton("Înapoi", "nav", "cauta/intro") + (urm ? C.buton("Continuă: " + esc(t), "nav", "cauta/" + urm, "continua") : "") + "</div>";
  }
  function pasi() {
    var corp = '<ol class="pasi fara-numar">' + D.pasi.map(function (p) { return "<li><strong>" + esc(p.t) + "</strong><br>" + esc(p.d) + "</li>"; }).join("") + "</ol>" +
      inapoi("siteuri", D.meniu[1].t);
    return C.pagina(D.meniu[0].t, corp, "cauta/intro");
  }
  function siteuri() {
    var adult = C.eAdult();
    var l = D.siteuri.filter(function (s) { return !(s.adult && !adult) && !(s.elev && adult); });
    var corp = '<ul class="siteuri">' + l.map(function (s) { return "<li>" + esc(s.t) + ': <strong class="adresa">' + esc(s.a) + "</strong></li>"; }).join("") + "</ul>" +
      '<p class="mic">' + esc(D.siteuriNota) + "</p>" + inapoi("ia", D.meniu[2].t);
    return C.pagina(D.meniu[1].t, corp, "cauta/intro");
  }
  function ia() {
    var corp = "<p>" + esc(D.ia.explica) + "</p>" + C.ghidIA() + '<section class="card">' + C.folosireIA() +
      '<div class="camp"><label for="c-prompt-cauta">Mesajul de copiat</label><textarea id="c-prompt-cauta" rows="7" readonly>' + C.escSimplu(D.ia.prompt) + "</textarea></div>" +
      '<div class="rand">' + C.buton("Copiază", "cauta.copiaza", null, "continua") + '</div><p id="stare-cauta" class="mic" role="status"></p></section>' +
      inapoi("pacaleli", D.meniu[3].t);
    return C.pagina(D.meniu[2].t, corp, "cauta/intro");
  }
  function pacaleli() {
    var P = D.pacaleli, adult = C.eAdult();
    var corp = "<p>" + esc(P.intro) + "</p>" + P.parti.map(function (p) {
      return '<section class="card"><h2>' + esc(p.t) + "</h2>" + p.r.map(function (r) {
        return typeof r === "object" ? (adult ? "" : '<p class="termen">' + esc(r.elev) + "</p>") : "<p>" + esc(r) + "</p>";
      }).join("") + "</section>";
    }).join("") + inapoi("misiune", D.meniu[4].t);
    return C.pagina(D.meniu[3].t, corp, "cauta/intro");
  }
  function misiune() {
    var M = D.misiune, X = C.eAdult() ? M.adult : M.elev, gata = S.ia("cauta.gata", false);
    var corp = '<section class="card stil-asertiv"><h2>' + esc(X.q) + "</h2><p>" + esc(X.indiciu) + "</p></section>" +
      C.camp("cauta.gasit", esc(M.gasit), "", 2) + C.camp("cauta.unde", esc(M.unde), "", 1) +
      (gata ? '<div id="cauta-raspuns" role="status">' + C.bosi(e45() && X.raspuns45 ? X.raspuns45 : X.raspuns, "bucurie") + "</div>" + C.retine("cauta")
        : '<div class="rand">' + C.buton(esc(M.buton), "cauta.gata", null, "primar") + "</div>") +
      '<div class="rand">' + C.buton("Înapoi", "nav", "cauta/intro") + "</div>";
    return C.pagina(D.meniu[4].t, corp, "cauta/intro");
  }

  C.reg("cauta", {
    ecran: function (sub) {
      var E = { pasi: pasi, siteuri: siteuri, ia: ia, pacaleli: pacaleli, misiune: misiune };
      return E[sub] ? E[sub]() : intro();
    },
    actiuni: {
      copiaza: function () { C.copiaza("c-prompt-cauta", "stare-cauta", D.ia.copiat, D.ia.selectat); return false; },
      gata: function () { S.pune("cauta.gata", true); C.deArata = "cauta-raspuns"; }
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
