/* Date: negocierea salariului (subagentul 13, doar pentru adulți).
   Fără sume, fără procente, fără promisiuni. Aplicația nu spune ce sumă să ceară omul: omul decide.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.negociere = {
  verificat: "neverificat",
  scriere: "2026-11-15",
  titlu: "Negocierea salariului",
  intro: [
    "**Te pregătești acum, ca să vorbești liniștit(ă) când vine oferta.** Sunt 7 pași scurți.",
    "Aplicația nu îți spune ce sumă să ceri. **Tu decizi.**"
  ],
  situatii: {
    pauza: "**Ce știi să faci nu s-a pierdut.** Pauza nu e un motiv să accepți cel mai mic salariu. Poți negocia și programul: flexibil, hibrid sau part-time, cum permite legea.",
    schimb: "**Argumentează cu ce știi să faci**, nu cu titlul vechi. Folosește exemple din lista „Ce iei cu tine”.",
    caut: "Pregătește fișa acum. **Restul pașilor îți folosesc când apare o ofertă.**",
    accent45: "**Argumentează cu experiența și cu rezultate concrete.** Nu e nevoie să te scuzi pentru vârstă."
  },
  pasi: [
    {
      id: "piata", titlu: "1. Află ce spune piața",
      text: [
        "**Uită-te la mediană, nu la medie.** Media poate fi trasă în sus de câteva salarii foarte mari. Mediana e salariul „din mijloc”.",
        "**Brutul** e suma din contract. **Netul** e ce primești în mână, după taxe.",
        "Salariul minim se schimbă de obicei în fiecare an. **Verifică valoarea de acum** pe un site oficial.",
        "Datele diferă de la o sursă la alta. **De aceea lucrezi cu un interval, nu cu un singur număr.**"
      ],
      surseTitlu: "Unde poți căuta",
      /* Pentru autoare: INS, ANOFM, eJobs, BestJobs, Hays, ManpowerGroup. Pe ecran nu apar nume de surse. */
      surse: ["Statisticile oficiale despre salarii, de pe site-urile instituțiilor statului",
        "Rapoartele salariale ale site-urilor cu locuri de muncă",
        "Studiile salariale ale firmelor de recrutare",
        "Anunțurile pentru același post, care au salariul scris"],
      surseNota: "Notează data fiecărei surse. Datele vechi pot să nu mai fie valabile."
    },
    {
      id: "fisa", titlu: "2. Fișa ta de pregătire",
      text: ["Completează fișa. **Rămâne doar pe telefonul tău.** Scrie sume nete, în lei."]
    },
    {
      id: "moment", titlu: "3. Momentul potrivit",
      text: [
        "**Nu deschide tu discuția despre salariu în primele minute ale interviului.** Întâi arată ce poți face.",
        "Dacă recrutorul întreabă devreme ce salariu vrei, **spune intervalul din fișă**, nu o cifră aleasă la întâmplare."
      ],
      exemplu: "„Mă gândesc la un salariu net între {min} și {max} lei, în funcție de responsabilități și beneficii.”"
    },
    {
      id: "interval", titlu: "4. Cum spui un interval",
      text: [
        "Cercetările despre negociere arată că **primul număr spus influențează restul discuției.**",
        "Alege un interval în care **limita de jos e o sumă cu care ești împăcat(ă).**",
        "Ține intervalul aproape de ce ai aflat despre piață. **O sumă mult peste piață poate încurca discuția.**"
      ]
    },
    {
      id: "ton", titlu: "5. Un ton de colaborare",
      text: [
        "**Explică ce valoare aduci, cu exemple concrete.** Folosește argumentele din fișă.",
        "Poți întreba: „Ce spațiu de negociere există pentru acest post?”",
        "Evită două capcane: **să nu ceri nimic** și **să accepți imediat prima ofertă.**"
      ]
    },
    {
      id: "oferta", titlu: "6. Când vine oferta",
      lista: [
        "**Mulțumește** pentru ofertă.",
        "**Cere timp să te gândești**, de exemplu o zi sau două.",
        "**Cere oferta în scris**, cu salariul net și beneficiile.",
        "Dacă vrei mai mult, **fă o contraofertă politicoasă, cu motive.**",
        "Dacă bugetul nu se poate mări, **negociază alte lucruri din fișă**: program, zile libere, un curs plătit."
      ],
      frica: "Mulți oameni se tem că oferta va fi retrasă dacă cer mai mult. **Teama e obișnuită.** O contraofertă politicoasă, cu argumente, e o parte normală a discuției."
    },
    {
      id: "exercitiu", titlu: "7. Exersează discuția",
      text: ["Exersează cu un program de IA, ca la interviu. **După exercițiu, notează ce ai schimba.**"]
    }
  ],
  reguli: "**Spune doar lucruri adevărate.** Nu inventa alte oferte și nu pune presiune. Aplicația nu promite că negocierea reușește.",

  fisa: {
    campuri: [
      { id: "minim", t: "Minimul acceptabil (net, lei pe lună)", ajutor: "Suma sub care nu ai accepta postul.", tip: "numar" },
      { id: "dorit", t: "Ce ți-ai dori cu adevărat (net, lei pe lună)", ajutor: "Suma care te-ar bucura, realist.", tip: "numar" },
      { id: "intMin", t: "Intervalul tău: de la (net)", ajutor: "O sumă cu care ești împăcat(ă).", tip: "numar" },
      { id: "intMax", t: "Intervalul tău: până la (net)", ajutor: "Aproape de ce ai aflat despre piață.", tip: "numar" },
      { id: "arg1", t: "Argumentul 1, cu un exemplu concret", ajutor: "De exemplu: „Am coordonat o echipă de 5 oameni la…”" },
      { id: "arg2", t: "Argumentul 2, cu un exemplu concret", ajutor: "" },
      { id: "arg3", t: "Argumentul 3, cu un exemplu concret", ajutor: "" },
      { id: "altele", t: "Alte lucruri care contează pentru tine", ajutor: "De exemplu: program flexibil, muncă hibridă, zile libere, un curs plătit." }
    ],
    buton: "Verific fișa",
    bine: "✓ Fișa ta se potrivește. Iată fraza pe care o poți spune:",
    probleme: {
      lipsa: "Completează minimul, ce ți-ai dori și intervalul, ca să verific fișa.",
      dorit: "Ce ți-ai dori e mai mic decât minimul acceptabil. Verifică cele două sume.",
      interval: "Intervalul începe sub minimul tău acceptabil. **Limita de jos ar trebui să fie o sumă cu care ești împăcat(ă).**",
      ordine: "Limita de sus a intervalului e mai mică decât cea de jos. Verifică cele două sume.",
      argumente: "Ai mai puțin de 3 argumente. **Exemplele concrete te ajută cel mai mult.**"
    },
    fraza: "„Mă gândesc la un salariu net între {min} și {max} lei, în funcție de responsabilități și beneficii.”"
  },

  ia: {
    copiat: "Am copiat promptul. Acum lipește-l în chat.",
    selectat: "Promptul e selectat. Apasă lung pe el și alege „Copiază”.",
    prompt: {
      inceput: "Vreau să exersez o discuție despre salariu, în limba română, pentru postul de {post}.",
      postGol: "[scrie aici postul]",
      reguli: [
        "Fii angajatorul. Fă-mi o ofertă și răspunde la contraoferta mea, câte un mesaj pe rând.",
        "Nu-mi spune ce sumă să cer și nu inventa detalii despre mine.",
        "După fiecare răspuns al meu, spune-mi pe scurt ce a fost bine și ce pot îmbunătăți.",
        "La final, fă un rezumat cu 3 lucruri bune și 3 lucruri de exersat."
      ],
      interval: "Intervalul meu net este între {min} și {max} lei pe lună.",
      argumente: "Argumentele mele:"
    }
  }
};
