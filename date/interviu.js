/* Date: pregătirea pentru interviu (subagentul 11). Toate textele pe care le vede omul sunt aici.
   Baza: curs, cap. 6.2 (tipuri de interviu, povești din experiență reale, simularea filmată cu telefonul,
   ce să nu spui, întrebările puse de candidat) și cap. 2.3 (fără întrebări cu „de ce?”).
   Întrebările de exersat sunt scrise original. Afirmațiile despre studii NU sunt folosite (sursă neverificată).
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.interviu = {
  verificat: "neverificat",
  scriere: "2026-11-15",

  titlu: "Pregătirea pentru interviu",
  intro: "Mergi la interviu mai liniștit(ă) când ai răspunsurile pregătite. „Sunt comunicativ și muncitor” spune oricine. **Te ajută exemplele concrete din experiența ta.** Aici le scrii și le exersezi.",

  povesti: {
    titlu: "Poveștile tale",
    explica: "Notează 3–5 situații reale din experiența ta: un succes, o problemă rezolvată, o perioadă grea, o lucrare în echipă. **Aceeași poveste te poate ajuta la mai multe întrebări.**",
    atentie: "**Alege doar situații adevărate.** La interviu, ce nu e adevărat iese la iveală, mai devreme sau mai târziu.",
    maxim: 5,
    campuri: [
      { id: "titlu", t: "Un titlu scurt, ca să o recunoști", ajutor: "De exemplu: „Clientul nemulțumit” sau „Târgul de la grădiniță”.", randuri: 2 },
      { id: "context", t: "Unde erai și ce se întâmpla?", ajutor: "", randuri: 3 },
      { id: "fapta", t: "Ce ai făcut tu, concret?", ajutor: "Spune „eu am…”, nu doar „noi am…”.", randuri: 3 },
      { id: "rezultat", t: "Ce s-a întâmplat după aceea?", ajutor: "Dacă ai un rezultat adevărat, cu un număr, scrie-l. Poți spune și ce ai învățat.", randuri: 3 }
    ],
    goala: "necompletată"
  },

  grupe: [
    { id: "tine", t: "Despre tine", intrebari: [
      { id: "t1", q: "Spune-mi câteva lucruri despre tine.", ajutor: "Un minut, două: cine ești profesional, ce experiență ai și ce cauți acum. Lasă deoparte viața personală." },
      { id: "t2", q: "Care sunt punctele tale forte? Dă un exemplu.", ajutor: "Alege 2–3 și sprijină-le cu una dintre poveștile tale." },
      { id: "t3", q: "La ce lucrezi acum ca să te îmbunătățești?", ajutor: "Spune sincer un lucru pe care îl înveți și ce faci concret pentru asta." },
      { id: "t4", q: "Cum te-ar descrie colegii tăi?", ajutor: "Poți folosi ce ți-au spus alții, cu un exemplu." }
    ] },
    { id: "experienta", t: "Despre experiență", intrebari: [
      { id: "e1", q: "Povestește despre o sarcină sau un proiect de care ești mândru(ă).", ajutor: "Context, ce ai făcut tu, ce s-a întâmplat." },
      { id: "e2", q: "Ce făceai concret în ultima ta activitate?", ajutor: "Spune ce ai realizat, nu doar ce aveai de făcut." },
      { id: "e3", q: "Povestește o situație în care ai lucrat în echipă.", ajutor: "Care a fost rolul tău și cum v-ați ajutat." },
      { id: "e4", q: "Ce ai învățat dintr-o greșeală?", ajutor: "Spune pe scurt greșeala și mai pe larg ce ai schimbat după aceea." }
    ] },
    { id: "motivatie", t: "Despre motivație", intrebari: [
      { id: "m1", q: "Ce te atrage la acest post?", ajutor: "Leagă ce îți place să faci de ce cere postul." },
      { id: "m2", q: "Ce știi despre firma noastră?", ajutor: "Uită-te înainte pe site-ul firmei: ce fac, ce proiecte au." },
      { id: "m3", q: "Ce ți-ai dori să faci în următorii ani?", ajutor: "Un răspuns sincer și legat de post e de ajuns." },
      { id: "m4", q: "Ce te-a făcut să pleci de la locul de muncă de dinainte?", ajutor: "Răspunde calm și scurt, fără să vorbești urât despre firma sau șeful de dinainte." }
    ] },
    { id: "dificile", t: "Situații dificile", intrebari: [
      { id: "d1", q: "Povestește o situație în care un client sau un coleg a fost nemulțumit. Ce ai făcut?", ajutor: "Arată cum ai ascultat și ce ai rezolvat." },
      { id: "d2", q: "Cum te descurci când ai mai multe lucruri de făcut în același timp?", ajutor: "Dă un exemplu: cum ai ales ce faci întâi." },
      { id: "d3", q: "Povestește o situație în care ceva nu a ieșit cum credeai și te-ai adaptat.", ajutor: "Angajatorii caută tot mai des oameni care se adaptează. O astfel de poveste e de folos." },
      { id: "d4", q: "Ce faci când nu știi răspunsul la o problemă?", ajutor: "Spune pe cine întrebi, unde cauți și cum verifici." }
    ] }
  ],

  /* O întrebare în plus, după situație sau vârstă (cap. 8.4). */
  speciale: {
    titlu: "Pentru situația ta",
    pauza: { id: "s_pauza", q: "Văd o pauză în CV. Ce ai făcut în această perioadă?",
      ajutor: "Spune simplu ce ai făcut, de exemplu concediul de creștere a copilului. Adaugă ce ai învățat și că ești pregătit(ă) să revii. **Nu e nevoie să te scuzi.**" },
    schimb: { id: "s_schimb", q: "Nu ai lucrat în acest domeniu. Ce aduci?",
      ajutor: "Spune ce știi să faci și se potrivește și aici (comunicare, organizare, lucrul cu oamenii sau cu cifrele), cu o poveste." },
    accent45: { id: "s_45", q: "Ce programe sau aplicații folosești în munca ta?",
      ajutor: "Spune ce folosești (e-mail, programe de birou, întâlniri video) și ce înveți acum. Pune în față experiența ta." }
  },
  povestileTale: "Poveștile tale:",
  raspuns: "Răspunsul meu",

  exersez: {
    titlu: "Exersează",
    filmare: {
      titlu: "Filmează-te cu telefonul",
      text: [
        "Pune telefonul în fața ta și filmează-te câteva minute, răspunzând la 2–3 întrebări de aici. Dacă poți, îmbracă-te ca pentru interviu.",
        "Apoi uită-te: vorbești prea repede? Te uiți spre cameră? Spui des „ăăă”? Mulți oameni nu observă aceste lucruri până nu se văd.",
        "**Filmarea rămâne în telefonul tău.** O poți șterge după aceea."
      ]
    },
    tipuri: {
      titlu: "Ce fel de interviuri există",
      lista: [
        "La telefon, scurt: se verifică dacă ești disponibil(ă) și câteva lucruri de bază.",
        "Cu cineva de la resurse umane: despre situații din trecut, despre cum lucrezi cu alții.",
        "Tehnic: o probă practică, de exemplu un test la un program.",
        "Cu viitorul șef: uneori, ca să vedeți dacă vă potriviți."
      ]
    },
    nu: {
      titlu: "Ce să nu spui",
      lista: [
        "Vorbe urâte despre firmele sau șefii de dinainte.",
        "Lucruri foarte personale.",
        "Cuvinte nepotrivite sau jignitoare.",
        "Nu întreba de salariu în primele minute ale discuției."
      ]
    },
    tu: {
      titlu: "Întrebări pe care le poți pune tu",
      explica: "La final, de obicei ești întrebat(ă) dacă ai întrebări. **Una sau două întrebări bune arată că te interesează postul.**",
      lista: [
        "Cum arată o zi obișnuită pe acest post?",
        "Ce așteptați de la cineva nou în primele luni?",
        "Cum lucrează echipa în care aș intra?",
        "Care sunt pașii următori după acest interviu?"
      ]
    },
    ia: {
      titlu: "Simulare cu o IA",
      explica: "Poți exersa un interviu în scris, cu un program de inteligență artificială (IA). Programul îți pune întrebări, ca un angajator, iar tu îi răspunzi. Mai jos vezi ce este IA și cum faci, pas cu pas.",
      atentie: "Nu scrie în chat CNP-ul, adresa exactă sau alte date pe care nu vrei să le dai.",
      copiat: "Am copiat promptul. Acum lipește-l în chat.",
      selectat: "Promptul e selectat. Apasă lung pe el și alege „Copiază”.",
      prompt: {
        inceput: "Vreau să exersez un interviu de angajare, în limba română, pentru postul de {post}.",
        postGol: "[scrie aici postul]",
        reguli: [
          "Fii intervievatorul. Pune-mi întrebările pe rând, câte una, și așteaptă răspunsul meu.",
          "Pune 6–8 întrebări: despre mine, despre experiență, despre motivație și despre situații dificile.",
          "După fiecare răspuns, spune-mi pe scurt ce a fost bine și ce pot îmbunătăți, cu blândețe.",
          "Nu inventa detalii despre mine și nu-mi da răspunsuri gata scrise, doar sfaturi.",
          "La final, fă-mi un rezumat cu 3 lucruri bune și 3 lucruri de exersat."
        ],
        situatii: {
          pauza: "Revin la muncă după o pauză și vreau să exersez și cum vorbesc despre ea.",
          schimb: "Îmi schimb domeniul și vreau să exersez cum vorbesc despre ce știu să fac și se potrivește și aici."
        }
      }
    }
  }
};
