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
  /* Aprobate de Simona, 2026-11-18. */
  scrisoare: {
    titlu: "Lecția scurtă: scrisoarea de intenție",
    intrebari: [
      { q: "Cum începi scrisoarea?",
        opt: [{ t: "„Vă scriu pentru postul de…”" }, { t: "Cu ce te atrage la firmă: „Am aflat că firma voastră…”", ok: true }],
        bine: "**Exact!** Recrutorul știe deja de ce îi scrii. Începi cu ce ai aflat despre firmă.",
        gresit: "**Aproape!** Recrutorul știe deja de ce îi scrii. Începe cu ce te atrage la firmă." },
      { q: "Cine scrie scrisoarea?",
        opt: [{ t: "O scrie o IA și o trimit așa." }, { t: "O scriu eu, cu cuvintele mele.", ok: true }],
        bine: "**Bravo!** Scrisoarea trebuie să sune ca tine.",
        gresit: "**Aproape!** O IA te poate ajuta, dar scrisoarea trebuie să sune ca tine și să fie adevărată." },
      { q: "Ce pui în paragraful din mijloc?",
        opt: [{ t: "O listă cu toate locurile mele de muncă." }, { t: "Ce știu să fac, legat de post, cu un exemplu concret.", ok: true }],
        bine: "**Exact!** Un exemplu concret spune mai mult decât o listă.",
        gresit: "**Aproape!** Alege ce se potrivește cu postul și dă un exemplu concret." }
    ],
    final: "**Ai terminat lecția!** Acum răspunde la întrebările pentru scrisoarea ta.",
    dupa: { t: "Încep scrisoarea", ecran: "scrisoare/q0" }
  },
  negociere: {
    titlu: "Lecția scurtă: negocierea salariului",
    intrebari: [
      { q: "Ce salariu te ajută să înțelegi piața?",
        opt: [{ t: "Media." }, { t: "Mediana, adică salariul din mijloc.", ok: true }],
        bine: "**Exact!** Media poate fi trasă în sus de câteva salarii foarte mari.",
        gresit: "**Aproape!** Media poate fi trasă în sus de câteva salarii foarte mari. Uită-te la mediană." },
      { q: "Când vorbești despre salariu la interviu?",
        opt: [{ t: "În primele minute." }, { t: "După ce ai arătat ce poți face.", ok: true }],
        bine: "**Bravo!** Întâi arăți ce poți face.",
        gresit: "**Aproape!** Nu deschide tu discuția despre bani în primele minute. Întâi arată ce poți face." },
      { q: "Ai primit o ofertă. Ce faci întâi?",
        opt: [{ t: "O accept imediat." }, { t: "Mulțumesc, cer timp să mă gândesc și cer oferta în scris.", ok: true }],
        bine: "**Foarte bine!** Așa ai timp să te gândești liniștit(ă).",
        gresit: "**Aproape!** Să accepți imediat e una dintre capcane. Mulțumește, cere timp și cere oferta în scris." }
    ],
    final: "**Ai terminat lecția!** Acum pregătește-te pas cu pas.",
    dupa: { t: "Încep cu primul pas", ecran: "negociere/piata" }
  },
  corp: {
    titlu: "Lecția scurtă: limbajul corpului",
    intrebari: [
      { q: "Ce semnale contează cel mai mult, după studii?",
        opt: [{ t: "Să stai nemișcat(ă) și foarte serios(oasă)." }, { t: "Privirea, mișcările capului și hainele îngrijite.", ok: true }],
        bine: "**Exact!** Pe toate trei le poți exersa.",
        gresit: "**Aproape!** Cele trei semnale sunt privirea, mișcările capului și hainele îngrijite." },
      { q: "Cum privești omul care îți vorbește?",
        opt: [{ t: "Îl fixez cu privirea, fără pauză." }, { t: "Îl privesc, iar din când în când mă uit și în altă parte.", ok: true }],
        bine: "**Bravo!** Nu e nevoie să fixezi.",
        gresit: "**Aproape!** Nu e nevoie să fixezi. Poți privi din când în când și în altă parte." },
      { qElev: "La o prezentare în fața clasei, unde privești?", qAdult: "La un interviu online, unde privești când vorbești?",
        optElev: [{ t: "Doar în foaie." }, { t: "Pe rând, spre mai mulți colegi.", ok: true }],
        optAdult: [{ t: "La fața omului de pe ecran." }, { t: "În cameră.", ok: true }],
        bineElev: "**Bravo!** Așa vorbești cu toată clasa, nu cu foaia.",
        gresitElev: "**Aproape!** Privește pe rând spre mai mulți colegi, nu doar spre foaie.",
        bineAdult: "**Exact!** Pentru omul de pe ecran, asta arată ca o privire în ochi.",
        gresitAdult: "**Aproape!** Privește camera. Pentru omul de pe ecran, asta arată ca o privire în ochi." }
    ],
    final: "**Ai terminat lecția!** Acum vezi cum folosești semnalele.",
    dupa: { t: "Cum folosești semnalele", ecran: "corp/semne" }
  },
  /* Aprobate de Simona, 2026-11-18. */
  roata: {
    titlu: "Lecția scurtă: roata vieții profesionale",
    intrebari: [
      { q: "Ce îți arată o roată „strâmbă”?",
        opt: [{ t: "Că ai greșit exercițiul." }, { t: "Că unele zone merg bine, altele mai puțin.", ok: true }],
        bine: "**Exact!** Zonele cu note mici arată unde e loc de schimbare.",
        gresit: "**Aproape!** Aici nu există răspunsuri greșite. O roată strâmbă arată că unele zone merg bine, altele mai puțin." },
      { q: "O roată mică, cu multe note mici, poate însemna:",
        opt: [{ t: "Că o singură zonă merge prost." }, { t: "Că acum nu ești mulțumit(ă) de muncă, în general.", ok: true }],
        bine: "**Exact!** E un semn despre locul de muncă, nu despre tine.",
        gresit: "**Aproape!** Când multe zone au note mici, poate acum nu ești mulțumit(ă) de muncă, în general." },
      { q: "Cum folosești roata?",
        opt: [{ t: "O fac o dată și o uit." }, { t: "Mă uit la zonele cu note mici când citesc anunțuri și la interviu.", ok: true }],
        bine: "**Bravo!** La interviu poți întreba despre zonele care contează pentru tine.",
        gresit: "**Aproape!** Folosește-o când citești anunțuri și la interviu." }
    ],
    final: "**Ai terminat lecția!** Acum desenează-ți roata.",
    dupa: { t: "Încep roata", ecran: "roata/note" }
  },
  plan: {
    titlu: "Lecția scurtă: planul",
    intrebari: [
      { q: "Care scop e mai clar?",
        optElev: [{ t: "„Să aflu ce mi se potrivește.”" }, { t: "„Vorbesc cu două persoane care lucrează ca…”", ok: true }],
        optAdult: [{ t: "„Un loc de muncă mai bun.”" }, { t: "„Vorbesc cu două persoane care lucrează ca…”", ok: true }],
        bine: "**Exact!** Un scop clar spune exact ce faci.",
        gresit: "**Aproape!** E prea general. Un scop clar spune exact ce faci." },
      { q: "Ai o zi grea. Ce faci cu tema?",
        opt: [{ t: "O las toată săptămâna." }, { t: "Fac doar varianta de 2 minute.", ok: true }],
        bine: "**Foarte bine!** Un pas mic e tot un pas.",
        gresit: "**Aproape!** În zilele grele, varianta de 2 minute te ține pe drum." },
      { q: "La ce te ajută un plan „Dacă…, atunci…”?",
        opt: [{ t: "Îmi promite că reușesc sigur." }, { t: "Știu dinainte ce fac când apare un obstacol.", ok: true }],
        bine: "**Exact!** Așa obstacolul nu te mai prinde nepregătit(ă).",
        gresit: "**Aproape!** Nimic nu promite reușita. Planul te ajută să știi dinainte ce faci." }
    ],
    final: "**Ai terminat lecția!** Acum alege-ți tema săptămânii.",
    dupa: { t: "Văd temele", ecran: "plan/saptamana" }
  },
  cerinte: {
    titlu: "Lecția scurtă: ce cer angajatorii",
    intrebari: [
      { q: "Ce caută angajatorii cel mai des?",
        opt: [{ t: "Doar diplome." }, { t: "Comunicare și lucru în echipă.", ok: true }],
        bine: "**Exact!** Ce faci împreună cu alții contează.",
        gresit: "**Aproape!** Comunicarea și lucrul în echipă sunt căutate cel mai des." },
      { q: "Să te adaptezi la schimbări…",
        opt: [{ t: "e un talent: îl ai sau nu-l ai." }, { t: "se poate exersa.", ok: true }],
        bine: "**Bravo!** Se exersează pas cu pas.",
        gresit: "**Aproape!** Să te adaptezi se poate exersa, pas cu pas." },
      { qElev: "Cum începi să ai experiență?", qAdult: "Trimiți cereri, dar nu primești răspuns. Ce înseamnă?",
        optElev: [{ t: "Aștept să termin școala." }, { t: "Cu un voluntariat, un atelier sau un proiect la școală.", ok: true }],
        optAdult: [{ t: "Că n-am nicio șansă." }, { t: "Poate piața e lentă. Pot schimba ceva în CV sau pot trimite mai multe cereri.", ok: true }],
        bineElev: "**Exact!** Experiența începe mic.",
        gresitElev: "**Aproape!** Experiența începe mic: voluntariat, ateliere, proiecte la școală.",
        bineAdult: "**Exact!** Lipsa unui răspuns nu spune nimic despre tine.",
        gresitAdult: "**Aproape!** Lipsa unui răspuns nu spune nimic despre tine. Poate piața e lentă." }
    ],
    final: "**Ai terminat lecția!** Acum vezi ce poți exersa.",
    dupa: { t: "Ce cer angajatorii", ecran: "cerinte/lista" }
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
