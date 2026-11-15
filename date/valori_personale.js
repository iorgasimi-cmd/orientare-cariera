/* Date: exercițiul „Valorile mele” și scala stimei de sine (Rosenberg).
   Valorile: alegi 10, apoi 5, apoi 3, apoi una; răspunzi la câteva întrebări și notezi cât trăiești după ele.
   Elevii au o listă scurtă, cu cuvinte simple; adulții, lista întreagă.
   Scala Rosenberg: 10 afirmații, 4 răspunsuri, scor 10–40; afirmațiile 3, 5, 8, 9, 10 se punctează invers.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.valoriPers = {
  verificat: "neverificat",
  scriere: "2026-11-15",

  titlu: "Valorile mele",
  intro: [
    "**Valorile sunt lucrurile care contează cel mai mult pentru tine.** Te ajută să alegi mai ușor ce faci și cu cine.",
    "Alegi în patru pași: 10 valori, apoi 5, apoi 3, apoi una singură. Durează câteva minute."
  ],
  introElev: "Exemple: prietenia, sinceritatea, distracția. Nu există răspunsuri greșite.",
  introAdult: "Te poți gândi și la viața personală, și la muncă. De obicei, valorile se amestecă.",

  pasi: [
    { n: 10, t: "Alege 10 valori", ajutor: "Bifează 10 cuvinte care contează pentru tine." },
    { n: 5, t: "Acum păstrează 5", ajutor: "Din cele 10, bifează cele 5 care te reprezintă cel mai mult." },
    { n: 3, t: "Acum păstrează 3", ajutor: "Din cele 5, bifează primele 3." },
    { n: 1, t: "Valoarea ta cea mai importantă", ajutor: "Din cele 3, alege una singură." }
  ],
  contor: "Ai ales {n} din {total}.",
  preaMulte: "Ai ales deja {total}. Scoate una ca să adaugi alta.",
  preaPutine: "Alege exact {total}, ca să mergi mai departe.",

  intrebari: {
    elev: [
      { id: "conteaza", t: "Ce anume face valoarea asta importantă pentru tine?" },
      { id: "aduce", t: "Ce lucruri bune îți aduce?" },
      { id: "cere", t: "Ce îți cere ea? De exemplu, la ce trebuie să fii atent(ă)?" },
      { id: "fara", t: "Cum ar fi viața ta fără ea?" }
    ],
    adult: [
      { id: "conteaza", t: "Ce anume face valoarea asta importantă pentru tine?" },
      { id: "aduce", t: "Ce beneficii îți aduce?" },
      { id: "cere", t: "Ce responsabilități îți aduce?" },
      { id: "fara", t: "Ce s-ar întâmpla dacă ai pierde-o?" }
    ]
  },

  nota: {
    titlu: "Cât trăiești după ele?",
    explica: "Pentru fiecare dintre cele 3 valori, alege o notă de la 1 la 10. **1 = deloc, 10 = în fiecare zi.**",
    elev: "Gândește-te la școală, acasă și la timpul tău liber.",
    adult: "Gândește-te și la viața personală, și la muncă."
  },

  rezultat: {
    titlu: "Valorile tale",
    cea: "Cea mai importantă",
    top: "Primele 3, cu nota ta",
    mic: "Valoarea „{v}” are nota {n}. **Poți alege o temă mică în plan, ca s-o trăiești mai des.**",
    bine: "Trăiești deja după valorile tale. **E un lucru de păstrat.**",
    planElev: "Gândește-te la ele când alegi un liceu, o facultate sau o activitate.",
    planAdult: "Gândește-te la ele când alegi un loc de muncă sau un domeniu.",
    refac: "Refac exercițiul"
  },

  /* Lista pentru elevi: cuvinte simple. */
  listaElev: ["prietenie", "familie", "sinceritate", "respect", "libertate", "curaj", "creativitate", "distracție",
    "aventură", "învățare", "curiozitate", "ajutor", "bunătate", "dreptate", "încredere", "siguranță", "sănătate",
    "natură", "frumusețe", "bani", "succes", "recunoaștere", "independență", "responsabilitate", "lucru în echipă",
    "loialitate", "umor", "calm", "ordine", "ambiție", "răbdare", "toleranță", "pace", "iubire", "generozitate", "provocare"],

  /* Lista întreagă pentru adulți. */
  listaAdult: ["acceptare", "aventură", "altruism", "ambiție", "apreciere", "autenticitate", "autoritate", "autonomie",
    "apartenență", "alegere", "angajament", "acțiune", "armonie", "ajutor", "acuratețe", "ascultare", "avansare",
    "atingerea potențialului", "bani", "bunătate", "bucurie", "blândețe", "câștig", "calm", "călătorii", "colaborare",
    "comunitate", "compasiune", "competiție", "conectare", "contribuție", "creativitate", "corectitudine", "cooperare",
    "credință", "curaj", "curiozitate", "cunoaștere", "determinare", "dezvoltare personală", "distracție", "dreptate",
    "dragoste", "echilibru", "egalitate", "entuziasm", "educație", "evoluție", "exprimare de sine", "excelență",
    "familie", "faimă", "focalizare", "flexibilitate", "frumusețe", "generozitate", "imaginație", "independență",
    "influență", "intuiție", "inovare", "intimitate", "iubire", "interes", "iertare", "idealism", "inteligență",
    "înțelepciune", "încredere", "învățare", "integritate", "împlinire", "leadership", "libertate", "loialitate",
    "munca în echipă", "natură", "onestitate", "optimism", "ordine", "pasiune", "pace", "parteneriat", "prietenie",
    "productivitate", "putere", "provocare", "recompense financiare", "răbdare", "recunoaștere", "respect", "resurse",
    "realizare", "responsabilitate", "rezultate", "risc", "rutină", "recunoștință", "stimă de sine", "simplitate",
    "spontaneitate", "sănătate", "sinceritate", "siguranță", "solitudine", "spiritualitate", "statut", "succes",
    "speranță", "tărie", "tact", "toleranță", "tradiție", "umor", "ușurință", "unitate", "vitalitate", "varietate"]
};

window.DATE.stima = {
  verificat: "neverificat",
  scriere: "2026-11-15",
  titlu: "Cum mă văd eu",
  intro: [
    "**Află cum te vezi pe tine însuți / însăți.** Sunt 10 afirmații scurte, pe două ecrane.",
    "Alege răspunsul care ți se potrivește acum. Nu există răspunsuri bune sau greșite."
  ],
  sursa: "Scala stimei de sine (Rosenberg).",
  optiuni: [["4", "Acord puternic"], ["3", "De acord"], ["2", "Dezacord"], ["1", "Dezacord puternic"]],
  /* inv: true = se punctează invers (afirmațiile 3, 5, 8, 9, 10). */
  itemi: [
    { id: "s1", t: "Simt că sunt o persoană demnă de apreciere, cel puțin la fel de mult ca alții." },
    { id: "s2", t: "Simt că am calități pozitive." },
    { id: "s3", t: "În general, tind să cred că sunt un eșec.", inv: true },
    { id: "s4", t: "Sunt în stare să fac lucruri la fel de bine ca majoritatea oamenilor." },
    { id: "s5", t: "Simt că nu am de ce să mă mândresc.", inv: true },
    { id: "s6", t: "Am o atitudine pozitivă față de mine." },
    { id: "s7", t: "În general, sunt mulțumit(ă) de mine." },
    { id: "s8", t: "Mi-aș dori să am mai mult respect față de mine.", inv: true },
    { id: "s9", t: "Uneori mă simt inutil(ă).", inv: true },
    { id: "s10", t: "Uneori cred că nu sunt bun(ă) de nimic.", inv: true }
  ],
  peEcran: 5,
  lipsa: "Mai ai afirmații fără răspuns. Alege câte o variantă pentru fiecare.",
  rezultat: {
    titlu: "Rezultatul tău",
    scor: "Scorul tău: **{n} din 40**.",
    explica: "Scorul poate fi între 10 și 40. **Cu cât e mai mare, cu atât te apreciezi mai mult.**",
    sus: "Scorul tău e în jumătatea de sus a scalei. **Te apreciezi, iar asta te ajută** să încerci lucruri noi.",
    jos: "Scorul tău e în jumătatea de jos a scalei. **Felul în care te vezi se poate schimba.** Pașii mici ajută.",
    schimba: "Felul în care te vezi se schimbă în timp. Poți reface testul peste câteva săptămâni.",
    ideiTitlu: "Câteva idei care te pot ajuta",
    ideiElev: [
      "**Notează seara un lucru care ți-a ieșit bine azi**, chiar dacă e mic.",
      "Recitește ce ai scris la „Puncte forte”: momentele în care ți-a ieșit bine.",
      "Petrece timp cu oameni lângă care te simți bine."
    ],
    ideiAdult: [
      "**Notează seara un lucru care ți-a ieșit bine azi**, chiar dacă e mic.",
      "Recitește poveștile tale de la interviu: sunt dovezi a ceea ce știi să faci.",
      "Alege o temă mică în plan și bifeaz-o. Fiecare pas făcut contează."
    ],
    ajutorElev: "Dacă te simți des așa, vorbește cu un adult de încredere sau cu consilierul școlii.",
    ajutorAdult: "Dacă te simți des așa, vorbește cu cineva de încredere sau cu un specialist.",
    refac: "Refac testul"
  }
};
