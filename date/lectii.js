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
