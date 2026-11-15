/* Date: testul de interese (după modelul Holland / RIASEC).
   Întrebările sunt scrise original pentru această aplicație (nu sunt copiate dintr-un alt test).
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-11). */
window.DATE = window.DATE || {};
window.DATE.interese = {
  verificat: "neverificat",
  scriere: "2026-11-11",
  /* Bagheta magică (curs, cap. 2.3): o întrebare care scoate din calcul fricile, ca să apară dorința reală. */
  bagheta: {
    elev: "Dacă nu ar conta notele, banii sau ce spun alții, ce ai vrea să faci?",
    adult: "Dacă banii sau lipsa de experiență nu ar fi o problemă, ce meserie ai alege mâine dimineață?"
  },
  scala: [
    { v: 1, t: "Deloc" },
    { v: 2, t: "Puțin" },
    { v: 3, t: "Așa și așa" },
    { v: 4, t: "Destul de mult" },
    { v: 5, t: "Foarte mult" }
  ],
  tipuri: {
    R: {
      nume: "Realist",
      explicatie: "Îți plac lucrurile concrete: să faci, să repari, să construiești, să lucrezi cu mâinile, cu unelte sau afară.",
      exemple: "reparații, construcții, gătit, grădinărit, lucrul cu mașini sau aparate"
    },
    I: {
      nume: "Investigativ",
      explicatie: "Îți place să afli cum funcționează lucrurile, să pui întrebări și să cauți răspunsuri.",
      exemple: "științe, matematică, experimente, programare, cercetare, analiza datelor"
    },
    A: {
      nume: "Artistic",
      explicatie: "Îți place să creezi și să te exprimi: prin desen, scris, muzică, film sau idei noi.",
      exemple: "desen, design, scris, muzică, teatru, fotografie, filmulețe"
    },
    S: {
      nume: "Social",
      explicatie: "Îți place să lucrezi cu oamenii: să ajuți, să explici, să asculți, să lucrezi în echipă.",
      exemple: "voluntariat, meditații, îngrijire, educație, sfaturi pentru colegi"
    },
    E: {
      nume: "Întreprinzător",
      explicatie: "Îți place să conduci, să convingi, să propui idei și să începi lucruri noi.",
      exemple: "proiecte de echipă, dezbateri, vânzări, organizarea de evenimente, mici afaceri"
    },
    C: {
      nume: "Organizat",
      explicatie: "Îți place ordinea: liste, reguli clare, cifre, planuri și lucruri făcute corect, pas cu pas.",
      exemple: "tabele, bugete, programări, acte, verificarea detaliilor"
    }
  },
  /* Câte 6 întrebări pentru fiecare tip. Aplicația le amestecă astfel încât pe fiecare ecran să fie câte una din fiecare tip. */
  intrebari: [
    { id: "r1", tip: "R", t: "Să repar un obiect stricat din casă (o bicicletă, o priză, o ușă)." },
    { id: "r2", tip: "R", t: "Să construiesc ceva din lemn, metal sau alte materiale." },
    { id: "r3", tip: "R", t: "Să lucrez afară: în grădină, pe un teren sau într-o fermă." },
    { id: "r4", tip: "R", t: "Să aflu cum funcționează un motor sau o mașină." },
    { id: "r5", tip: "R", t: "Să gătesc sau să coc, urmând o rețetă pas cu pas." },
    { id: "r6", tip: "R", t: "Să folosesc unelte sau aparate ca să termin o treabă concretă." },

    { id: "i1", tip: "I", t: "Să aflu cum funcționează corpul, natura sau tehnologia." },
    { id: "i2", tip: "I", t: "Să rezolv probleme grele de matematică sau de logică." },
    { id: "i3", tip: "I", t: "Să fac un experiment și să notez ce s-a întâmplat." },
    { id: "i4", tip: "I", t: "Să citesc despre descoperiri științifice." },
    { id: "i5", tip: "I", t: "Să caut singur(ă) răspunsul la o întrebare, chiar dacă durează." },
    { id: "i6", tip: "I", t: "Să strâng informații și să descopăr ce spun ele." },

    { id: "a1", tip: "A", t: "Să desenez, să pictez sau să fac design." },
    { id: "a2", tip: "A", t: "Să scriu povești, poezii sau alte texte creative." },
    { id: "a3", tip: "A", t: "Să cânt, să compun muzică sau să cânt la un instrument." },
    { id: "a4", tip: "A", t: "Să joc într-o piesă de teatru sau să fac filmulețe." },
    { id: "a5", tip: "A", t: "Să inventez idei noi, diferite de ce se face de obicei." },
    { id: "a6", tip: "A", t: "Să aleg culorile și aranjarea unei camere sau a unei pagini." },

    { id: "s1", tip: "S", t: "Să ajut un coleg să înțeleagă o lecție.", tAdult: "Să ajut un coleg nou să învețe ce are de făcut." },
    { id: "s2", tip: "S", t: "Să ascult pe cineva care are o problemă și să-l susțin." },
    { id: "s3", tip: "S", t: "Să fac voluntariat pentru oameni sau pentru animale." },
    { id: "s4", tip: "S", t: "Să explic lucruri unor copii mai mici.", tAdult: "Să explic lucruri unor oameni care le aud prima dată." },
    { id: "s5", tip: "S", t: "Să lucrez într-o echipă în care toți se ajută." },
    { id: "s6", tip: "S", t: "Să organizez o activitate care strânge oameni împreună." },

    { id: "e1", tip: "E", t: "Să conduc un grup la un proiect." },
    { id: "e2", tip: "E", t: "Să conving oameni să încerce o idee a mea." },
    { id: "e3", tip: "E", t: "Să vând ceva sau să fac reclamă unui eveniment." },
    { id: "e4", tip: "E", t: "Să iau decizii și să-mi asum riscuri mici." },
    { id: "e5", tip: "E", t: "Să particip la o dezbatere și să-mi susțin părerea.", tAdult: "Să-mi susțin părerea într-o ședință." },
    { id: "e6", tip: "E", t: "Să pornesc o mică inițiativă sau afacere a mea." },

    { id: "c1", tip: "C", t: "Să țin în ordine acte, liste sau tabele." },
    { id: "c2", tip: "C", t: "Să fac un program pe zile și pe ore și să-l respect." },
    { id: "c3", tip: "C", t: "Să lucrez cu numere: bugete, calcule, facturi." },
    { id: "c4", tip: "C", t: "Să verific dacă totul este corect, fără greșeli." },
    { id: "c5", tip: "C", t: "Să urmez reguli și pași clari ca să termin o sarcină." },
    { id: "c6", tip: "C", t: "Să aranjez fișiere, cărți sau obiecte după un sistem." }
  ]
};
