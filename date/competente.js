/* Date: „Ce iei cu tine în noul domeniu” (pentru adulți care își schimbă domeniul).
   Matricea competențelor (ce ai acum, ce cer anunțurile, diferența), analiza anunțurilor și competențele care se transferă.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.competente = {
  verificat: "neverificat",
  scriere: "2026-11-15",

  titlu: "Ce iei cu tine în noul domeniu",
  intro: [
    "**Știi deja mai mult decât crezi.** Multe lucruri merg în aproape orice domeniu: să comunici, să te organizezi, să rezolvi probleme. Altele țin de o meserie anume.",
    "Aici pui alături ce ai acum și ce cer anunțurile pentru postul care te interesează. **Diferența îți arată ce ai de învățat și ce poți scoate în față.**"
  ],
  pasi: ["Scrii ce ai acum.", "Lipești cerințele din 3–5 anunțuri reale.", "Bifezi ce ai deja și vezi ce îți lipsește."],

  a: {
    eticheta: "Ce ai acum",
    intrebare: "Ce știi să faci și ce ai învățat până acum?",
    ajutor: "Scrie câte un lucru pe rând: ce știi să faci, programe, limbi străine, cursuri, diplome, atestate. Gândește-te și la ce ai învățat în afara serviciului (voluntariat, familie, hobby-uri)."
  },
  b: {
    eticheta: "Ce cer anunțurile",
    intrebare: "Lipește aici cerințele din 3–5 anunțuri reale pentru postul care te interesează.",
    ajutor: "Câte o cerință pe rând. Dacă o cerință apare în mai multe anunțuri, las-o de câte ori apare: așa vedem ce se repetă."
  },
  tabel: {
    titlu: "Ce ai din ce se cere",
    explica: "Bifează cerințele pe care le îndeplinești deja. Cele care apar în mai multe anunțuri sunt primele.",
    am: "Am asta",
    apare: "apare în {n} anunțuri",
    gol: "Încă n-am cerințe de comparat. **Întoarce-te la pasul 2** și lipește câteva."
  },
  concluzie: {
    titlu: "Ce reiese",
    iei: "Ce iei cu tine",
    ai: "Ce ai deja din ce se cere",
    lipsa: "Ce îți lipsește",
    nimic: "Nimic de aici.",
    repetat: "se cere des",
    invatare: "Diferența ține de cunoștințe: **e o nevoie de învățare**. Cele care se cer des sunt primele de învățat, de exemplu printr-un curs scurt.",
    promovare: "Ai ce cer anunțurile. Dacă totuși nu primești răspunsuri, ce poți schimba **ține mai ales de cum te prezinți**: CV-ul, scrisoarea și interviul.",
    experienta: "Unele cerințe țin de anii de experiență. Poți căuta și posturi de început sau un stagiu, ca să câștigi experiență în noul domeniu.",
    transfer: "**Asta contează mai mult decât titlul vechi.** În CV și la interviu, scrie ce știi să faci, fiecare cu un exemplu."
  }
};
