/* Date: lecțiile scurte (2–3 întrebări cu variante, răspuns imediat de la Bosi), ca într-un joc.
   Fiecare lecție folosește doar ideile care există deja în secțiunea ei. Textele sunt aprobate de Simona înainte să fie puse aici.
   ok: true = varianta corectă. */
window.DATE = window.DATE || {};
window.DATE.lectii = {
  buton: "Lecția scurtă (2 minute)",
  progres: "Întrebarea {i} din {n}",
  continua: "Continuă",
  scor: "Ai răspuns corect la {k} din {n}.",
  refa: "Refac lecția",
  /* Aprobată de Simona, 2026-11-18. Variante: qElev/qAdult, optElev/optAdult, bineElev/bineAdult, gresitElev/gresitAdult. */
  asertiv: {
    titlu: "Lecția scurtă: comunicarea asertivă",
    intrebari: [
      { q: "Ce înseamnă să fii asertiv(ă)?",
        opt: [{ t: "Spui „da” la orice, ca să nu se supere nimeni." }, { t: "Spui clar și calm ce gândești, cu respect pentru ceilalți.", ok: true }],
        bine: "**Exact!** „Eu contez și tu contezi.”",
        gresit: "**Aproape!** Asta e comunicarea pasivă: „eu nu contez”. Asertiv înseamnă să spui clar ce gândești, cu respect." },
      { qElev: "Un coleg vrea să-ți copieze tema. Ce răspuns e asertiv?",
        qAdult: "Șeful îți dă o sarcină urgentă, dar ai deja un raport de terminat. Ce răspuns e asertiv?",
        optElev: [{ t: "„Fă-ți singur tema, leneșule!”" }, { t: "„Nu-ți dau tema s-o copiezi. Dacă vrei, îți explic exercițiul în pauză.”", ok: true }],
        optAdult: [{ t: "„Bine, le fac pe amândouă.”" }, { t: "„Raportul e gata joi. Pe care o fac mai întâi?”", ok: true }],
        bineElev: "**Bravo!** Spui „nu” clar și oferi ajutor.",
        gresitElev: "**Aproape!** Prima variantă îl jignește. Poți spune „nu” fără să jignești.",
        bineAdult: "**Exact!** Arăți faptele și ceri o alegere.",
        gresitAdult: "**Aproape!** Dacă spui „da” la tot, ajungi obosit(ă). Arată faptele și cere o alegere." },
      { q: "Care început e mai bun, după modelul „Când…”?",
        optElev: [{ t: "„Când sunteți leneși…”" }, { t: "„Când colegii nu își fac partea la proiect…”", ok: true }],
        optAdult: [{ t: "„Când ești neserios…”" }, { t: "„Când raportul nu e gata la timp…”", ok: true }],
        bine: "**Foarte bine!** Spui ce s-a întâmplat, ca o cameră de filmat.",
        gresit: "**Aproape!** Cuvântul acela judecă omul. Spune doar ce s-a întâmplat." }
    ],
    final: "**Ai terminat lecția!** Acum vezi exemplele și exersează.",
    dupa: { t: "Văd exemplele", ecran: "asertiv/exemplu/1" }
  },
  interviu: {
    titlu: "Lecția scurtă: interviul",
    intrebari: [
      { q: "Ce te ajută cel mai mult înainte de interviu?",
        opt: [{ t: "Învăț pe de rost răspunsuri perfecte." }, { t: "Îmi pregătesc 3–5 povești reale din experiența mea.", ok: true }],
        bine: "**Exact!** O poveste bună te ajută la mai multe întrebări.",
        gresit: "**Aproape!** Poveștile reale te ajută la mai multe întrebări, nu doar la una." },
      { q: "Cum povestești ce ai făcut?",
        opt: [{ t: "„Noi am terminat proiectul.”" }, { t: "„Eu am organizat programul echipei.”", ok: true }],
        bine: "**Bravo!** Spui „eu am…”, ca să se vadă partea ta.",
        gresit: "**Aproape!** Spune „eu am…”, nu doar „noi am…”. Așa se vede ce ai făcut tu." },
      { q: "Ce spui despre locul de muncă de dinainte?",
        opt: [{ t: "Spun deschis tot ce n-a mers acolo." }, { t: "Spun calm ce am învățat și ce caut acum.", ok: true }],
        bine: "**Exact!** Vorbește despre ce ai învățat și despre ce cauți.",
        gresit: "**Aproape!** Evită vorbele urâte despre firmele de dinainte. Spune ce ai învățat." }
    ],
    final: "**Ai terminat lecția!** Acum scrie-ți poveștile.",
    dupa: { t: "Îmi scriu poveștile", ecran: "interviu/povesti" }
  },
  valori: {
    titlu: "Lecția scurtă: valorile",
    intrebari: [
      { q: "Ce sunt valorile?",
        opt: [{ t: "Lucrurile pe care le ai, de exemplu bani sau haine." }, { t: "Lucrurile care contează cel mai mult pentru tine.", ok: true }],
        bine: "**Exact!** Prietenia, familia, libertatea, de exemplu.",
        gresit: "**Aproape!** Valorile nu sunt lucruri pe care le ai, ci lucruri care contează pentru tine." },
      { q: "La ce te ajută să-ți știi valorile?",
        opt: [{ t: "Să ai note mai mari." }, { t: "Să alegi mai ușor ce faci și cu cine.", ok: true }],
        bine: "**Bravo!** Când ai de ales, te întrebi ce se potrivește cu ce contează pentru tine.",
        gresit: "**Aproape!** Valorile te ajută să alegi mai ușor ce faci și cu cine." },
      { q: "Există valori bune și valori greșite?",
        opt: [{ t: "Da, unele sunt greșite." }, { t: "Nu. Fiecare om are valorile lui.", ok: true }],
        bine: "**Exact!** Nu există răspunsuri greșite.",
        gresit: "**Nu-i nimic!** De fapt, fiecare om are valorile lui. Nu există răspunsuri greșite." }
    ],
    final: "**Ai terminat lecția!** Acum alege-ți valorile.",
    dupa: { t: "Încep exercițiul", ecran: "valorile/p0" }
  },
  cv: {
    /* Aprobată de Simona, 2026-11-17. */
    titlu: "Lecția scurtă: CV-ul",
    intrebari: [
      { q: "Care frază arată mai bine ce ai făcut?",
        opt: [{ t: "„Am lucrat la vânzări.”" }, { t: "„Am organizat stocul magazinului și am redus timpul de căutare a produselor.”", ok: true }],
        bine: "**Bravo!** A doua spune concret ce ai făcut, cu verbe de acțiune.",
        gresit: "**Aproape!** „Am lucrat” nu spune ce ai făcut. Folosește verbe ca „am organizat” sau „am redus”." },
      { q: "Unde pui telefonul și e-mailul?",
        opt: [{ t: "În corpul paginii, sus, lângă nume.", ok: true }, { t: "În antet, adică sus pe pagină, repetate pe fiecare pagină." }],
        bine: "**Exact!** Așa le găsesc și programele care citesc CV-urile.",
        gresit: "**Aproape!** Multe programe care citesc CV-urile nu citesc antetul. Pune datele în corpul paginii." },
      { q: "Ce faci cu CNP-ul?",
        opt: [{ t: "Îl pun în CV, ca să fie complet." }, { t: "Nu-l pun. Nu e nevoie de el.", ok: true }],
        bine: "**Foarte bine!** CNP-ul e o dată personală. Îl dai doar dacă te angajezi.",
        gresit: "**Nu-i nimic!** CNP-ul nu are ce căuta în CV. Îl dai doar dacă te angajezi." }
    ],
    final: "**Ai terminat lecția!** Acum verifică-ți propriul CV.",
    dupa: { t: "Verific CV-ul meu", ecran: "cv/intro" }
  }
};
