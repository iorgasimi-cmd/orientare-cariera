/* Date: „Limbajul corpului și ținuta” (adulți, după pregătirea pentru interviu).
   Ce spun studiile: o meta-analiză (Martín-Raugh și colegii). Restul sunt sfaturi practice, spuse ca atare.
   Fără reguli exacte (de exemplu „privește 70% din timp”), fiindcă sursa nu le susține.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.corp = {
  verificat: "neverificat",
  scriere: "2026-11-15",
  titlu: "Limbajul corpului și ținuta",

  intro: [
    "**La interviu contează și ce spui fără cuvinte.** Adică felul în care privești, te miști și arăți.",
    "Studiile despre interviuri arată că **trei semnale au cea mai strânsă legătură cu nota primită de candidați:**"
  ],
  trei: [
    "**o ținută îngrijită**, potrivită pentru locul de muncă;",
    "**privirea îndreptată spre omul** cu care vorbești;",
    "**mișcările capului**, de exemplu când dai din cap ca să arăți că asculți."
  ],
  dupa: "Nu există reguli exacte. **Fii atent(ă) la aceste semnale și rămâi tu însuți / însăți.**",
  meniu: [
    { id: "semne", t: "Cum folosești semnalele", d: "Privirea, capul, mâinile. Și la interviul online." },
    { id: "tinuta", t: "Ținuta", d: "O listă scurtă de bifat înainte de interviu." },
    { id: "exercitiu", t: "Exersează cu telefonul", d: "Te filmezi un minut și vezi ce poți schimba." }
  ],

  semne: {
    titlu: "Cum folosești semnalele",
    studiiTitlu: "Din studii",
    studii: [
      "**Privește omul care îți vorbește.** Poți privi din când în când și în altă parte. Nu e nevoie să fixezi.",
      "**Dă din cap când asculți.** Așa arăți că urmărești ce ți se spune.",
      "**Îmbracă-te îngrijit.** Detaliile sunt pe ecranul „Ținuta”."
    ],
    practicTitlu: "Sfaturi practice",
    practic: [
      "**Stai drept, dar relaxat.** Ține mâinile la vedere, pe masă sau în poală.",
      "**Respiră încet înainte să răspunzi.** O pauză scurtă îți dă timp să te gândești.",
      "Dacă sunt mai mulți oameni la interviu, privește-l pe cel care întreabă. Apoi uită-te și la ceilalți."
    ],
    onlineTitlu: "La interviul online",
    online: [
      "**Pune camera la nivelul ochilor.** Poți așeza laptopul pe câteva cărți.",
      "**Când vorbești, privește camera.** Pentru omul de pe ecran, asta arată ca o privire în ochi.",
      "Așază-te cu fața spre lumină, de exemplu spre o fereastră.",
      "Fă o probă cu un prieten cu o zi înainte: sunet, imagine, lumină."
    ]
  },

  tinuta: {
    titlu: "Ținuta",
    bifeaza: "Bifează ce ai pregătit:",
    lista: [
      { id: "t1", t: "Hainele sunt curate și călcate." },
      { id: "t2", t: "Am văzut cum se îmbracă oamenii din firmă.", d: "De exemplu, în pozele de pe site sau de pe paginile firmei." },
      { id: "t3", t: "Hainele se potrivesc cu locul unde merg.", d: "Dacă nu știi, alege ceva puțin mai elegant decât porți de obicei." },
      { id: "t4", t: "Mă simt bine în ele. Le-am probat înainte." },
      { id: "t5", t: "Încălțămintea e curată și comodă." },
      { id: "t6", t: "Le-am pregătit cu o seară înainte." },
      { id: "t7", t: "La interviul online mă îmbrac la fel ca pentru o întâlnire față în față." }
    ],
    toate: "**Ai bifat tot.** Ținuta ta e pregătită."
  },

  exercitiu: {
    titlu: "Exersează cu telefonul",
    pasi: [
      "**Filmează-te 1–2 minute în timp ce răspunzi la o întrebare de interviu.** De exemplu: „Spune-mi câte ceva despre tine.”",
      "Uită-te la filmare. Apoi bifează ce ți-a ieșit bine."
    ],
    lista: [
      { id: "e1", t: "Am privit spre cameră, ca spre un om." },
      { id: "e2", t: "Am stat drept, dar relaxat." },
      { id: "e3", t: "Mâinile nu m-au încurcat." },
      { id: "e4", t: "Am vorbit destul de rar ca să fiu înțeles(ă)." }
    ],
    schimb: "Ce vrei să faci altfel data viitoare?",
    schimbAjutor: "Alege un singur lucru. E mai ușor de exersat.",
    sterge: "Poți șterge filmarea după ce te-ai uitat la ea.",
    gata: "Am terminat exercițiul"
  },

  /* Pentru elevi: aceleași idei, cu situații de la școală (fără „interviu”). Ce lipsește aici se ia din varianta de mai sus. */
  elev: {
    /* 3 sfaturi de liniștire pentru elevi, aprobate de Simona (2026-11-17). Pentru autoare, sursele (nu apar în aplicație):
       grijile scrise înainte de examen: Ramirez și Beilock, 2011 (elevi de liceu); respirația lentă: studii despre respirație și stres;
       „inima bate tare = pregătire”: studiile lui Jeremy Jamieson despre reinterpretarea emoțiilor. */
    calm: {
      titlu: "Înainte de o prezentare sau de un răspuns oral: 3 sfaturi care te liniștesc",
      explica: "**Emoțiile sunt normale.** Le au și actorii, și sportivii înainte de o competiție.",
      sfaturi: [
        { t: "1. Scrie-ți grijile pe o foaie.", d: "Cu câteva minute înainte, scrie tot ce te îngrijorează. **Așa le scoți din cap și te concentrezi mai ușor.**" },
        { t: "2. Respiră încet.", d: "Inspiră pe nas cât numeri până la 4. Expiră pe gură cât numeri până la 6. Fă asta de 5 ori, chiar în bancă." },
        { t: "3. Inima bate tare? E semn bun.", d: "Corpul tău se pregătește să dea tot ce e mai bun. **Spune-ți în gând: „Sunt pregătit(ă)!”**" }
      ]
    },
    titlu: "Limbajul corpului și cum mă îmbrac",
    intro: [
      "**Contează și ce spui fără cuvinte.** Adică felul în care privești, te miști și arăți.",
      "Studiile arată că **trei semnale au cea mai strânsă legătură cu nota primită:**"
    ],
    trei: [
      "**haine îngrijite**, potrivite pentru locul unde mergi;",
      "**privirea îndreptată spre omul** cu care vorbești;",
      "**mișcările capului**, de exemplu când dai din cap ca să arăți că asculți."
    ],
    dupa: "**Le poți exersa de pe acum, la școală.** De exemplu, la o prezentare în clasă sau la un răspuns oral.",
    meniu: [
      { id: "semne", t: "Cum folosești semnalele", d: "Privirea, capul, mâinile. Și la o oră online." },
      { id: "tinuta", t: "Cum mă îmbrac", d: "O listă scurtă de bifat înainte de o zi importantă." },
      { id: "exercitiu", t: "Exersează cu telefonul", d: "Te filmezi un minut și vezi ce poți schimba." }
    ],
    semne: {
      studii: [
        "**Privește omul care îți vorbește.** Poți privi din când în când și în altă parte. Nu e nevoie să fixezi.",
        "**Dă din cap când asculți.** Așa arăți că urmărești ce ți se spune.",
        "**Îmbracă-te îngrijit.** Detaliile sunt pe ecranul „Cum mă îmbrac”."
      ],
      practic: [
        "**Stai drept, dar relaxat.** Ține mâinile la vedere, nu în buzunare.",
        "**Respiră încet înainte să răspunzi.** O pauză scurtă îți dă timp să te gândești.",
        "La o prezentare în fața clasei, privește pe rând spre mai mulți colegi, nu doar spre foaie."
      ],
      onlineTitlu: "La o oră sau o discuție online",
      online: [
        "**Pune camera la nivelul ochilor.** Poți așeza laptopul pe câteva cărți.",
        "**Când vorbești, privește camera.** Pentru cel de pe ecran, asta arată ca o privire în ochi.",
        "Așază-te cu fața spre lumină, de exemplu spre o fereastră."
      ]
    },
    tinuta: {
      titlu: "Cum mă îmbrac",
      toate: "**Ai bifat tot.** Hainele tale sunt pregătite.",
      explica: "Pentru o zi importantă: o prezentare, un examen oral sau o întâlnire nouă.",
      lista: [
        { id: "t1", t: "Hainele sunt curate și călcate." },
        { id: "t3", t: "Hainele se potrivesc cu locul unde merg.", d: "Dacă școala are reguli despre haine, le respect." },
        { id: "t4", t: "Mă simt bine în ele. Le-am probat înainte." },
        { id: "t5", t: "Încălțămintea e curată și comodă." },
        { id: "t6", t: "Le-am pregătit cu o seară înainte." }
      ]
    },
    exercitiu: {
      pasi: [
        "**Filmează-te 1 minut în timp ce vorbești despre ceva care îți place.** De exemplu, un hobby sau o carte.",
        "Uită-te la filmare. Apoi bifează ce ți-a ieșit bine."
      ]
    }
  },

  final: {
    titlu: "Bravo!",
    felicitare: "Ai exersat limbajul corpului.",
    tau: "Ce vrei să schimbi data viitoare:",
    repeta: "**Repetă filmarea peste câteva zile.** Așa vezi ce s-a schimbat."
  }
};
