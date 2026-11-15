/* Date: traseul pentru adulți (18–44 de ani și 45+).
   A doua întrebare (situația), textul de bun venit pentru fiecare situație și pașii fiecărui traseu,
   după tabelul din promptul autoarei și capitolul despre grupuri vulnerabile din curs (cap. 8.4).
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-14). */
window.DATE = window.DATE || {};
window.DATE.adulti = {
  verificat: "neverificat",
  scriere: "2026-11-14",
  situatii: [
    {
      id: "caut", t: "Caut un loc de muncă",
      bun: "Ne concentrăm pe CV, pe scrisoarea de intenție și pe interviu. Îți arăt și cum îți potrivești CV-ul pentru fiecare anunț.",
      pasi: ["cv", "scrisoare", "asertiv", "interviu", "plan"]
    },
    {
      id: "schimb", t: "Vreau să-mi schimb domeniul",
      bun: "Mai întâi aflăm ce îți place și ce știi să faci cu adevărat. Apoi vedem ce iei cu tine în noul domeniu și cum scrii asta în CV.",
      pasi: ["interese", "forte", "competente", "cv", "asertiv", "interviu", "plan"]
    },
    {
      id: "pauza", t: "Revin după o pauză", d: "de exemplu, după concediul de creștere a copilului",
      bun: "**Ce știi să faci nu s-a pierdut.** Te ajut să vorbești simplu despre pauză, în CV și la interviu. Scrii și ce ai învățat în acest timp.",
      pasi: ["cv", "scrisoare", "asertiv", "interviu", "plan"]
    },
    {
      id: "nustiu", t: "Încă nu știu ce vreau",
      bun: "**E normal să nu știi încă și nu e nevoie să hotărăști azi.** Începem cu ce îți place, la ce ești bun(ă) și ce contează pentru tine. CV-ul îl lăsăm pentru mai târziu.",
      pasi: ["interese", "forte", "asertiv", "plan"]
    }
  ],
  /* Pentru 45 de ani sau mai mult: același traseu, cu acest accent în plus. Fără promisiuni despre vârstă. */
  accent45: "Punem accent pe experiența pe care o ai și pe pași mici în competențele digitale, în ritmul tău.",
  pasi: {
    interese: { t: "Test de interese", d: "Ce îți place să faci." },
    forte: { t: "Puncte forte și valori", d: "La ce ești bun(ă) și ce contează pentru tine într-un loc de muncă." },
    competente: { t: "Ce iei cu tine în noul domeniu", d: "**Ce știi să faci și se potrivește și în alt domeniu.**" },
    cv: { t: "CV-ul meu", d: "Îți verifici CV-ul după câteva reguli simple." },
    scrisoare: { t: "Scrisoarea de intenție", d: "O scrii pas cu pas, cu ajutorul unor întrebări." },
    asertiv: { t: "Comunicarea asertivă", d: "Cum spui clar ce gândești și de ce ai nevoie, cu respect pentru tine și pentru ceilalți." },
    interviu: { t: "Pregătirea pentru interviu", d: "Întrebări de exersat și povești din experiența ta." },
    plan: { t: "Planul meu", d: "Un scop și o temă mică pe săptămână." }
  }
};
