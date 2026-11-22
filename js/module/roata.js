/* „Roata vieții profesionale” (adulți): 8 zone notate de la 1 la 10, o roată desenată din note și o interpretare simplă.
   Roata e desenată de aplicație (SVG), cu culorile din css/culori.css; notele apar și ca listă, ca să nu depindă totul de imagine. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, esc = C.esc, D = g.DATE.roata;

  function nota(id) { var n = Number(S.ia("roata.n." + id, 0)); return n >= 1 && n <= 10 ? n : 0; }
  /* Cei care se întorc după o pauză profesională au alte opt dimensiuni (vezi date/roata.js, zonePauza). */
  function zoneActive() { return S.ia("situatie", "") === "pauza" && D.zonePauza ? D.zonePauza : D.zone; }
  function toate() { return zoneActive().every(function (z) { return nota(z.id); }); }

  /* Calcul pur: din note ({id: n}) aflăm media, diferența dintre cea mai mare și cea mai mică notă și felul roții. */
  function analiza(n, zone) {
    zone = zone || zoneActive();
    var v = zone.map(function (z) { return Number(n[z.id]) || 0; });
    var med = v.reduce(function (a, b) { return a + b; }, 0) / v.length;
    var min = Math.min.apply(null, v), max = Math.max.apply(null, v);
    var fel = med <= 5 ? "mica" : (max - min >= 4 ? "stramba" : "buna");
    var mici = zone.filter(function (z, i) { return v[i] === min; }).map(function (z) { return z.t; });
    return { medie: med, min: min, max: max, fel: fel, mici: mici };
  }

  /* Desenul: 8 felii, fiecare cu lungimea după notă; cercuri subțiri la 2, 4, 6, 8, 10 și numărul zonei la margine. */
  function desen(n, zone) {
    zone = zone || zoneActive();
    var cx = 160, cy = 160, R = 120, out = "", i;
    function pct(r, a) { return (cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1); }
    for (i = 2; i <= 10; i += 2) out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R * i / 10) + '" class="cerc"/>';
    zone.forEach(function (z, k) {
      var a0 = -Math.PI / 2 + k * Math.PI / 4, a1 = a0 + Math.PI / 4, r = R * (Number(n[z.id]) || 0) / 10;
      out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + pct(R, a0).split(" ")[0] + '" y2="' + pct(R, a0).split(" ")[1] + '" class="ax"/>';
      if (r > 0) out += '<path d="M' + cx + " " + cy + " L" + pct(r, a0) + " A" + r.toFixed(1) + " " + r.toFixed(1) + " 0 0 1 " + pct(r, a1) + ' Z" class="felie"/>';
      var am = (a0 + a1) / 2, p = pct(R + 22, am).split(" ");
      out += '<text x="' + p[0] + '" y="' + p[1] + '" text-anchor="middle" dominant-baseline="central" class="nr">' + (k + 1) + "</text>";
    });
    return '<svg class="roata" viewBox="0 0 320 320" role="img" aria-label="Roata ta, desenată din note">' + out + "</svg>";
  }

  function butonFinal() {
    var u = C.eAdult() && C.module.adult ? C.module.adult.urmator("roata") : null;
    return u ? C.buton("Continuă: " + esc(u.t), "nav", u.ecran, "continua") : C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar");
  }

  function intro() {
    var pauza = S.ia("situatie", "") === "pauza";
    var corp = (C.butonLectie ? C.butonLectie("roata") : "") + "<p>" + esc(D.intro[D.intro.length - 1]) + "</p>" +
      '<p class="mic">' + esc(pauza ? D.introPauza : D.introAltii) + "</p>" +
      '<div class="rand">' + C.buton("Începem", "nav", "roata/note", "primar") +
      (S.ia("roata.gata", false) ? C.buton("Văd roata mea", "nav", "roata/rezultat") : "") + "</div>";
    return C.pagina(D.titlu, corp, C.acasa());
  }

  /* Notarea, o idee pe ecran: întâi propoziția care explică scala, apoi câte o dimensiune. */
  function pasiNote(zone) { return ["scala"].concat(zone.map(function (z, i) { return "q" + i; })); }
  function note(sub) {
    var pauza = S.ia("situatie", "") === "pauza", zone = zoneActive(), N = D.note;
    var PASI = pasiNote(zone), i = PASI.indexOf(sub || "scala"); if (i < 0) i = 0;
    var pas = PASI[i];
    var inapoi = i === 0 ? "roata/intro" : "roata/note/" + PASI[i - 1];
    var urm = i < PASI.length - 1 ? "roata/note/" + PASI[i + 1] : null;
    var titlu = pauza && N.titluPauza ? N.titluPauza : N.titlu, corp;
    if (pas === "scala") {
      corp = "<p>" + esc(pauza && N.explicaPauza ? N.explicaPauza : N.explica) + "</p>";
    } else {
      var z = zone[Number(pas.slice(1))], cur = nota(z.id), opt = "";
      for (var n = 1; n <= 10; n++) {
        opt += '<label class="opt"><input type="radio" name="roata-' + z.id + '" value="' + n + '" data-camp="roata.n.' + z.id + '" data-num="1"' + (cur === n ? " checked" : "") + "><span>" + n + "</span></label>";
      }
      corp = '<p class="mic">' + (Number(pas.slice(1)) + 1) + " din " + zone.length + "</p>" +
        '<fieldset class="intrebare"><legend>' + esc(z.t) + ' <span class="stare">' + esc(z.d) + '</span></legend><div class="scala">' + opt + "</div></fieldset>";
    }
    var ultim = i === PASI.length - 1;
    corp += '<div class="rand">' + C.buton("Înapoi", "nav", inapoi) +
      (ultim ? C.buton("Desenez roata", "roata.gata", null, "primar") : C.buton("Continuă", "nav", urm, "continua")) + "</div>";
    return C.pagina(titlu, corp, inapoi, true);
  }

  function rezultat() {
    if (!toate()) return intro();
    var R = D.rezultat, zone = zoneActive(), n = {};
    zone.forEach(function (z) { n[z.id] = nota(z.id); });
    var a = analiza(n, zone);
    var corp = '<section class="card">' + desen(n, zone) + '<p class="mic">' + esc(R.descriere) + "</p></section>" +
      '<section class="card"><h2>' + esc(R.noteTitlu) + '</h2><ol class="pasi">' + zone.map(function (z) {
        return "<li><strong>" + esc(z.t) + "</strong> – " + n[z.id] + " din 10</li>";
      }).join("") + "</ol></section>" +
      '<p class="termen">' + esc(R[a.fel]) + "</p>" +
      (a.fel !== "buna" ? "<p>" + esc(R.mici) + " <strong>" + a.mici.map(esc).join(", ") + "</strong>.</p>" : "") +
      R.intrebari.map(function (q) { return C.camp("roata.r." + q.id, esc(q.t), esc(q.ajutor), 3); }).join("") +
      "<p>" + esc(R.folos) + "</p>" +
      C.retine("roata") +
      '<div class="rand">' + C.buton(esc(R.refac), "roata.refa") + butonFinal() + "</div>";
    return C.pagina(R.titlu, corp, C.acasa());
  }

  C.reg("roata", {
    ecran: function (sub) {
      var m = /^note(?:\/(.+))?$/.exec(sub || "");
      if (m) return note(m[1]);
      if (sub === "rezultat") return rezultat();
      return intro();
    },
    actiuni: {
      gata: function () {
        if (!toate()) { C.eroare = (S.ia("situatie", "") === "pauza" && D.note.lipsaPauza) || D.note.lipsa; return; }
        S.pune("roata.gata", true); C.mergi("roata/rezultat");
      },
      refa: function () { S.pune("roata", {}); C.mergi("roata/note"); }
    },
    analiza: analiza
  });
})(typeof window !== "undefined" ? window : globalThis);
