/* Date: scrisoarea de intenție (subagentul 10). Toate textele pe care le vede omul sunt aici.
   Când ajută o scrisoare și cum arată una bună. Aplicația dă un schelet, nu un text gata scris.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-14). */
window.DATE = window.DATE || {};
window.DATE.scrisoare = {
  verificat: "neverificat",
  scriere: "2026-11-14",

  titlu: "Scrisoarea de intenție",
  intro: [
    "**O scrisoare bună te poate scoate în față**, mai ales când schimbi domeniul, ești la început sau sunt mulți candidați. Azi e adesea chiar textul e-mailului sau mesajul de pe LinkedIn.",
    "Îți pun 6 întrebări, câte una pe ecran. La final primești un schelet cu paragrafele scrisorii, făcut din răspunsurile tale. **Tu scrii scrisoarea, cu cuvintele tale.**"
  ],

  intrebari: [
    { id: "post", q: "Pentru ce post scrii scrisoarea?", ajutor: "De exemplu: asistent administrativ, vânzător, programator începător.", randuri: 2 },
    { id: "firma", q: "Cum se numește firma?", ajutor: "Dacă nu știi încă, poți lăsa gol.", randuri: 2 },
    { id: "atrage", q: "Ce te atrage la această firmă? Ce ai aflat despre ea?",
      ajutor: "Un proiect, un produs, felul în care lucrează sau ceva ce ai citit pe site-ul lor. Asta arată că te-ai interesat de ei.", randuri: 4 },
    { id: "competente", q: "Ce știi să faci și le-ar folosi lor? Alege 2–3 lucruri.",
      ajutor: "De exemplu: lucrul cu clienții, organizarea, un program pe care îl folosești bine.",
      ajutorSit: {
        schimb: "Gândește-te la ce iei cu tine din domeniul vechi: comunicarea, organizarea, lucrul cu oamenii sau cu cifrele.",
        pauza: "Poți folosi și ce ai făcut în pauză: un curs, voluntariat, organizarea casei și a familiei."
      }, randuri: 4 },
    { id: "exemplu", q: "Dă un exemplu concret: o situație în care ai folosit ce știi și ce s-a întâmplat.",
      ajutor: "Dacă ai un număr adevărat (clienți, termene, proiecte), scrie-l. Nu e nevoie de cifre dacă nu le ai.",
      ajutor45: "Experiența ta e un atu: alege un exemplu cu un rezultat clar.", randuri: 5 },
    { id: "disponibil", q: "Când ai putea vorbi cu ei, la telefon sau online?", ajutor: "De exemplu: în zilele lucrătoare, după ora 14. Poți lăsa gol.", randuri: 2 }
  ],

  /* Scheletul: trei paragrafe și formula de final. {firma}, {post}, {disp} se înlocuiesc cu răspunsurile. */
  schelet: {
    explica: "Iată scheletul scrisorii. Sub fiecare paragraf vezi ce ai scris tu. Scrie fiecare paragraf cu cuvintele tale, scurt.",
    paragrafe: [
      { titlu: "1. Ce te atrage la firmă", ghid: "**Începe cu ce ai aflat despre {firma}**, nu cu „Vă scriu pentru postul…”. Recrutorul știe deja de ce îi scrii.", din: ["atrage"] },
      { titlu: "2. Ce aduci tu", ghid: "Leagă 2–3 lucruri pe care știi să le faci de postul de {post}. Sprijină-le cu exemplul tău: **un exemplu concret convinge mai mult decât „sunt bun la…”**.", din: ["competente", "exemplu"] },
      { titlu: "3. Disponibilitate și încheiere", ghid: "Spune că ești disponibil(ă) pentru o discuție{disp}. **Încheie cu o propunere**, nu cu o rugăminte. De exemplu: „Sunt disponibil(ă) să vă povestesc cum pot ajuta echipa.”", din: ["disponibil"] }
    ],
    final: "La sfârșit: „Toate cele bune,” sau „Cu stimă,”, apoi numele tău.",
    firmaGol: "firmă",
    postGol: "postul ales",
    lipsa: "nu ai scris încă",
    etichete: { post: "Postul", firma: "Firma", atrage: "Ce te atrage", competente: "Ce știi să faci", exemplu: "Exemplul tău", disponibil: "Când poți vorbi" }
  },

  verificare: {
    titlu: "Înainte să o trimiți",
    lista: [
      "Se citește ușor, în aproximativ 30 de secunde, pe telefon.",
      "Are spații între paragrafe.",
      "Are un exemplu concret și adevărat.",
      "Nu începe cu „Vă scriu ca să aplic la jobul găsit pe…”.",
      "Nu se încheie cu o rugăminte.",
      "Nu are greșeli de scriere: roagă pe cineva de încredere să o citească."
    ]
  },

  ia: {
    titlu: "Scrisoarea cu ajutorul unei IA",
    cartela: "Îți dau un text gata pregătit, cu răspunsurile tale, pe care îl copiezi într-un chat cu inteligență artificială (IA).",
    atentie: "Nu scrie în chat CNP-ul, adresa exactă sau alte date pe care nu vrei să le dai. Tu rămâi răspunzător(oare) de tot ce scrie în scrisoare.",
    sfaturi: [
      "Copiază promptul și lipește-l în chat.",
      "Citește scrisoarea propusă și scoate tot ce nu e adevărat sau nu sună ca tine.",
      "Verifică-o cu lista „Înainte să o trimiți”."
    ],
    copiat: "Am copiat promptul. Acum lipește-l în chat.",
    selectat: "Promptul e selectat. Apasă lung pe el și alege „Copiază”.",
    prompt: {
      inceput: "Te rog să mă ajuți să scriu o scrisoare de intenție scurtă, în limba română.",
      reguli: [
        "Folosește doar ce am scris mai jos. Nu adăuga experiență, cifre sau calități pe care nu le-am scris eu.",
        "Scrie trei paragrafe scurte, care se citesc în aproximativ 30 de secunde pe telefon, cu spații între ele.",
        "Primul paragraf începe cu ce mă atrage la firmă, nu cu „Vă scriu pentru postul…”.",
        "Al doilea leagă ce știu să fac de post, cu exemplul meu.",
        "Al treilea spune că sunt disponibil(ă) pentru o discuție, fără rugăminți de tipul „Sper să mă sunați”.",
        "Scrie corect, cu diacritice, și lasă loc pentru numele meu la final."
      ],
      situatii: {
        schimb: "Îmi schimb domeniul: scoate în față ce știu să fac și se potrivește și în noul domeniu.",
        pauza: "Revin la muncă după o pauză: dacă o pomenești, fă-o simplu și sincer."
      },
      date: "Ce am scris eu:",
      etichete: { post: "Postul", firma: "Firma", atrage: "Ce mă atrage la firmă", competente: "Ce știu să fac", exemplu: "Exemplul meu", disponibil: "Când pot vorbi" },
      lipsa: "(nu am scris)"
    }
  }
};
