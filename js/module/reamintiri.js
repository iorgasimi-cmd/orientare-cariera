/* Subagent 4: reamintiri și progres.
   Aplicația nu are server, deci nu poate trimite notificări când e închisă.
   Fiindcă notificările de pe web sunt nesigure (mai ales pe iPhone), la fiecare deschidere
   arătăm un mesaj cu ce a mai rămas din tema săptămânii. Notificările se pornesc doar dacă omul le cere. */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare, D = g.DATE.sfaturi, esc = C.esc;

  /* Mesajul potrivit pentru ziua de azi. Calcul pur: primește starea și ziua săptămânii (0 = duminică). */
  function mesajPentru(idx, bifatAzi, ziSapt, bifatPrecedenta, areAlesa) {
    if (bifatAzi) return D.mesaje.felicitare[idx % D.mesaje.felicitare.length];
    if (idx > 0 && !bifatPrecedenta && !areAlesa) return D.mesaje.fara_tema;
    if (ziSapt === 1) return D.mesaje.inceput;
    if (ziSapt >= 3 && ziSapt <= 4) return D.mesaje.mijloc;
    return areAlesa ? "Ai ales o temă pentru săptămâna asta. O poți face în ritmul tău." : "Poți alege o temă mică pentru săptămâna asta.";
  }

  function mesajAzi() {
    var idx = C.saptamana();
    var cur = S.ia("plan.sapt.s" + idx, {});
    var prec = idx > 0 ? S.ia("plan.sapt.s" + (idx - 1), {}) : {};
    return mesajPentru(idx, !!cur.bifat, new Date().getDay(), !!(prec && prec.bifat), !!cur.aleasa);
  }

  /* Reamintirea din aplicație: cât timp tema aleasă nu e bifată, apare tema și butoanele pentru ea. */
  function banner() {
    if (!S.ia("plan.start", null)) return "";
    var pl = C.module.plan, idx = C.saptamana(), cur = S.ia("plan.sapt.s" + idx, {}) || {};
    var asteapta = !!cur.aleasa && !cur.bifat;
    var corp = '<section class="card reamintire" role="status"><h2>Pe scurt, azi</h2><p>' + esc(mesajAzi()) + "</p>";
    if (asteapta && pl) {
      var sf = pl.dataSf(idx);
      corp += '<p class="citat">' + esc(pl.textTema(idx)) + "</p>" + (sf ? '<p class="mic">Termen: ' + esc(C.format(sf)) + "</p>" : "") +
        '<div class="rand">' + C.buton("Am făcut tema", "plan.bifeaza", String(idx), "primar") + C.buton("Fac tema mai târziu", "plan.maitarziu", String(idx)) + "</div>";
    } else if (pl && pl.restante().length) {
      corp += '<div class="rand">' + C.buton("Văd tema nefăcută", "nav", "plan/hub", "primar") + "</div>";
    }
    return corp + "</section>";
  }

  function laDeschidere() {
    /* Doar dacă omul a cerut notificări și browserul le permite. Nu garantăm livrarea. */
    try {
      var pl = C.module.plan, idx = C.saptamana(), cur = S.ia("plan.sapt.s" + idx, {}) || {};
      /* Notificăm doar cât timp o temă nu e bifată (a săptămânii sau una cu termen depășit). */
      var asteapta = (!!cur.aleasa && !cur.bifat) || !!(pl && pl.restante().length);
      if (asteapta && S.ia("rem.notif", false) && g.Notification && g.Notification.permission === "granted" && S.ia("plan.start", null)) {
        var azi = C.azi();
        if (S.ia("rem.ultima", "") !== azi) {
          new g.Notification("Orientare în carieră", { body: mesajAzi() });
          S.pune("rem.ultima", azi);
        }
      }
    } catch (e) { /* ignorăm: notificările sunt opționale */ }
  }

  /* ---- Reamintire în calendarul telefonului (fișier .ics) ----
     Telefonul trimite singur alarma, fără server. Nu știe când bifezi tema: omul șterge evenimentul când termină. */
  function escIcs(t) { return String(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
  function octeti(c) { var x = c.codePointAt(0); return x < 0x80 ? 1 : x < 0x800 ? 2 : x < 0x10000 ? 3 : 4; }
  /* Liniile dintr-un fișier de calendar au cel mult 75 de octeți; cele lungi se continuă pe rândul următor, cu un spațiu. */
  function pliaza(linie) {
    var out = [], cur = "", n = 0;
    Array.from(linie).forEach(function (ch) {
      var o = octeti(ch);
      if (n + o > 75) { out.push(cur); cur = " " + ch; n = 1 + o; } else { cur += ch; n += o; }
    });
    out.push(cur);
    return out.join("\r\n");
  }
  /* Calcul pur. opt: text, ora ("HH:MM"), azi (AAAA-LL-ZZ), acum ("HH:MM"), termen (AAAA-LL-ZZ), idx, stamp ("AAAALLZZTHHMMSSZ"). */
  function construiesteIcs(opt) {
    var h = String(opt.ora || "18:00").split(":"), hh = ("0" + (h[0] || "18")).slice(-2), mm = ("0" + (h[1] || "00")).slice(-2);
    var start = opt.azi;
    if (opt.acum >= hh + ":" + mm) start = C.adauga(opt.azi, 1); /* ora de azi a trecut: începem mâine */
    var repeta = start <= opt.termen;
    var fin = Math.min(Number(hh) * 60 + Number(mm) + 15, 23 * 60 + 59);
    var sfarsit = ("0" + Math.floor(fin / 60)).slice(-2) + ("0" + (fin % 60)).slice(-2);
    var data = start.replace(/-/g, "");
    var scurt = String(opt.text || "").length > 80 ? String(opt.text).slice(0, 77) + "…" : String(opt.text || "");
    var desc = "Tema mea: " + (opt.text || "") + " Când ai făcut-o, șterge acest eveniment din calendar.";
    var l = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Orientare in cariera//RO//", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      "UID:tema-" + opt.idx + "-" + opt.azi + "@orientare-cariera", "DTSTAMP:" + opt.stamp,
      "DTSTART:" + data + "T" + hh + mm + "00", "DTEND:" + data + "T" + sfarsit + "00"];
    if (repeta) l.push("RRULE:FREQ=DAILY;UNTIL=" + opt.termen.replace(/-/g, "") + "T235959");
    l.push("SUMMARY:" + escIcs("Tema mea: " + scurt), "DESCRIPTION:" + escIcs(desc),
      "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY", "DESCRIPTION:" + escIcs("Tema mea: " + scurt), "END:VALARM", "END:VEVENT", "END:VCALENDAR");
    return l.map(pliaza).join("\r\n") + "\r\n";
  }

  C.reg("reamintiri", {
    ecran: function () { return C.pagina("Reamintiri", "", "sistem/setari"); },
    actiuni: {
      /* Descarcă un fișier de calendar cu o alarmă zilnică până la termenul temei. */
      calendar: function (idx) {
        try {
          var pl = C.module.plan, i = Number(idx), sf = pl.dataSf(i);
          if (!sf) { C.eroare = "Alege întâi o temă. Reamintirea are nevoie de o temă și de un termen."; return; }
          var d = new Date(), p2 = function (n) { return ("0" + n).slice(-2); };
          var ics = construiesteIcs({
            text: pl.textTema(i), ora: S.ia("rem.ora", "18:00"), azi: C.azi(), acum: p2(d.getHours()) + ":" + p2(d.getMinutes()),
            termen: sf, idx: i, stamp: d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z"
          });
          var url = g.URL.createObjectURL(new g.Blob([ics], { type: "text/calendar;charset=utf-8" }));
          var a = g.document.createElement("a");
          a.href = url; a.download = "tema-saptamanii.ics"; g.document.body.appendChild(a); a.click(); a.remove();
          g.setTimeout(function () { g.URL.revokeObjectURL(url); }, 5000);
          S.pune("plan.sapt.s" + i + ".calendar", true);
          C.eroare = "";
        } catch (e) {
          C.eroare = "Nu am reușit să pregătesc reamintirea pe acest telefon. Poți încerca din nou. Sau scrie singur(ă) tema în calendarul telefonului.";
        }
      },
      notificari: function () {
        if (!g.Notification) { C.eroare = "Telefonul tău nu permite notificări de aici. Nu-i nimic: îți arăt tema când deschizi aplicația."; return; }
        if (S.ia("rem.notif", false)) { S.pune("rem.notif", false); return; }
        g.Notification.requestPermission().then(function (p) {
          S.pune("rem.notif", p === "granted");
          if (p !== "granted") C.eroare = "Nu ai permis notificările. E în regulă: vei vedea mesajul când deschizi aplicația.";
          if (g.Cariera.reafiseaza) g.Cariera.reafiseaza();
        });
        return false;
      }
    },
    banner: banner,
    laDeschidere: laDeschidere,
    mesajPentru: mesajPentru,
    construiesteIcs: construiesteIcs
  });
  C.module.rem = C.module.reamintiri;
})(typeof window !== "undefined" ? window : globalThis);
