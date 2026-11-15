/* Date: „Ce cer angajatorii acum”. Tendințe din sondaje și rapoarte din 2026, fără procente.
   Se actualizează doar când se publică o versiune nouă a aplicației (nu există server).
   Regula: „angajatorii caută tot mai des”, nu „e sigur că”. Fiecare tendință vine cu o acțiune mică.
   Surse (citite din articole de presă care le rezumă, nu din rapoartele complete):
   - eJobs, sondaj la angajatori, aprilie–mai 2026, 150 de companii (adevarul.ro, revistacariere.ro, news.ro);
   - ManpowerGroup, Talent Shortage Survey 2026, 39.000 de angajatori din 41 de țări, inclusiv România;
   - SD Worx, HR & Payroll Pulse, 27 ianuarie – 20 februarie 2026, 16 țări europene (economedia.ro, wall-street.ro);
   - PwC, AI Jobs Barometer 2026, publicat pe 15 iunie 2026 (economedia.ro).
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.cerinte = {
  verificat: "neverificat",
  scriere: "2026-11-15",
  titlu: "Ce cer angajatorii acum",
  cand: "Informații adunate în noiembrie 2026. Se schimbă des.",

  adult: {
    intro: "**Iată ce caută angajatorii tot mai des în 2026.** Pentru fiecare, ai un pas mic pe care îl poți face.",
    lista: [
      {
        t: "Să te adaptezi la schimbări",
        ce: "Angajatorii din România caută tot mai des oameni care se adaptează repede și lucrează bine sub presiune.",
        sursa: "Sondaj eJobs, aprilie–mai 2026",
        pas: "**Să te adaptezi se poate exersa.** Scrie o poveste despre o situație care nu a ieșit cum credeai și în care te-ai descurcat.",
        link: "interviu/povesti", buton: "Scriu povestea"
      },
      {
        t: "Comunicare și lucru în echipă",
        ce: "Comunicarea, colaborarea și lucrul în echipă sunt calitățile căutate cel mai des de angajatori.",
        sursa: "ManpowerGroup, sondaj despre lipsa de personal, 2026",
        pas: "**Ce ai făcut împreună cu alții contează.** Notează un exemplu și exersează cum spui clar ce gândești.",
        link: "asertiv/intro", buton: "Comunicarea asertivă"
      },
      {
        t: "Unelte digitale și inteligența artificială",
        ce: "Angajatorii caută tot mai des oameni care știu să folosească unelte digitale, inclusiv inteligența artificială.",
        sursa: "ManpowerGroup, 2026; sondaj eJobs, 2026",
        pas: "**Nu trebuie să știi totul dintr-o dată.** Alege o temă mică pe săptămână: un lucru digital nou.",
        link: "plan/hub", buton: "Planul meu"
      },
      {
        t: "Ce știi să faci, nu doar titlul jobului",
        ce: "Tot mai mulți angajatori se uită la competențe, adică la ce știi să faci, nu doar la titlul jobului.",
        sursa: "SD Worx, ianuarie–februarie 2026",
        pas: "**O pauză sau un alt domeniu nu șterg ce știi să faci.** Scrie în CV competențele tale, nu doar titlurile.",
        link: "cv/intro", buton: "CV-ul meu"
      },
      {
        t: "Angajări mai prudente",
        ce: "În 2026, multe companii angajează mai prudent. Des, angajează ca să înlocuiască oameni care pleacă.",
        sursa: "Sondaj eJobs, aprilie–mai 2026",
        pas: "**Dacă nu primești răspuns, asta nu spune nimic despre tine.** Poate piața e lentă. Schimbă ceva în CV sau trimite mai multe cereri.",
        link: "plan/hub", buton: "Planul meu"
      }
    ]
  },

  elev: {
    intro: "**Iată ce caută angajatorii tot mai des.** Le poți exersa de pe acum, la școală și în timpul liber.",
    lista: [
      {
        t: "Comunicare și lucru în echipă",
        ce: "Angajatorii caută cel mai des oameni care comunică bine și lucrează bine cu alții.",
        sursa: "ManpowerGroup, 2026",
        pas: "**Ce faci împreună cu alții contează.** Gândește-te la un proiect de la școală sau la un voluntariat.",
        link: "asertiv/intro", buton: "Comunicarea asertivă"
      },
      {
        t: "Să te adaptezi la schimbări",
        ce: "Angajatorii caută tot mai des oameni care se descurcă atunci când se schimbă ceva.",
        sursa: "Sondaj eJobs, 2026",
        pas: "**Să te adaptezi se poate exersa.** Amintește-ți o dată când ceva nu a ieșit cum credeai și te-ai descurcat.",
        link: "forte/intro", buton: "Punctele mele forte"
      },
      {
        t: "Unelte digitale și inteligența artificială",
        ce: "Angajatorii caută tot mai des oameni care folosesc bine unelte digitale, inclusiv inteligența artificială.",
        sursa: "ManpowerGroup, 2026",
        pas: "**Învață pas cu pas.** Exersează cum ceri clar ceva unei inteligențe artificiale.",
        link: "asertiv/ia", buton: "Cere clar și de la IA"
      },
      {
        t: "Experiența începe mic",
        ce: "Chiar și pentru primul loc de muncă, angajatorii cer tot mai des lucruri învățate prin practică.",
        sursa: "PwC, 2026",
        pas: "**Fiecare pas se numără.** Un voluntariat, un atelier sau un proiect la școală sunt deja experiență.",
        link: "plan/hub", buton: "Planul meu"
      }
    ]
  },

  gata: "Am citit. Mai departe"
};
