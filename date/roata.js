/* Date: „Roata vieții profesionale” (doar adulți care au sau au avut un loc de muncă: caut, schimb, pauză).
   8 zone, fiecare notată de la 1 la 10; aplicația desenează roata din note.
   Interpretare simplă, fără etichete: o roată „strâmbă” arată zonele cu probleme, o roată mică arată o nemulțumire generală.
   Pragurile (diferență de cel puțin 4 puncte; medie de cel mult 5) sunt alese de noi, ca reguli simple, nu vin dintr-un studiu.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-17). */
window.DATE = window.DATE || {};
window.DATE.roata = {
  verificat: "neverificat",
  scriere: "2026-11-17",
  titlu: "Roata vieții profesionale",
  intro: [
    "**Vezi dintr-o privire ce merge bine la muncă și ce nu.**",
    "Notezi de la 1 la 10 opt lucruri despre locul tău de muncă. Aplicația desenează din note o roată."
  ],
  introPauza: "Gândește-te la ultimul loc de muncă.",
  introAltii: "Gândește-te la locul de muncă de acum sau la ultimul.",
  zone: [
    { id: "bani", t: "Banii", d: "Salariul și beneficiile." },
    { id: "loc", t: "Locul de muncă", d: "Spațiul, programul și condițiile." },
    { id: "colegi", t: "Colegii", d: "Cum te înțelegi cu ei." },
    { id: "sef", t: "Șefii", d: "Cum te conduc și cum te sprijină." },
    { id: "dezvoltare", t: "Dezvoltarea", d: "Ce înveți și cum poți avansa." },
    { id: "sens", t: "Sensul", d: "Cât de important ți se pare ce faci." },
    { id: "siguranta", t: "Siguranța", d: "Cât de sigur e locul tău de muncă." },
    { id: "echilibru", t: "Echilibrul", d: "Între muncă și viața personală." }
  ],
  /* Pentru cei care se întorc la muncă după o pauză profesională: opt dimensiuni ale pregătirii pentru reîntoarcere,
     date de Simona direct (nu sunt din cursul ILBAH). */
  zonePauza: [
    { id: "claritate", t: "Claritatea direcției", d: "Cât de clar îți este tipul de rol, domeniul și forma de lucru spre care vrei să te îndrepți, după pauza profesională?" },
    { id: "competente", t: "Actualizarea competențelor", d: "Cât de la zi ești astăzi cu competențele tehnice, digitale și practicile actuale din domeniul în care vrei să revii?" },
    { id: "transferabile", t: "Abilitățile transferabile", d: "Cât de ușor îți este să recunoști și să formulezi competențele practicate acasă (organizare, buget, rezolvare de probleme, comunicare) ca atuuri reale?" },
    { id: "candidatura", t: "Instrumentele de candidatură", d: "Cât de pregătite sunt astăzi CV-ul, profilul LinkedIn/portofoliul și modul în care îți prezinți pauza pentru a aplica la un rol potrivit?" },
    { id: "retea", t: "Rețeaua de contacte", d: "Cât de activă este astăzi legătura ta cu foști colegi, cunoștințe profesionale sau grupuri relevante pentru reintrarea pe piața muncii?" },
    { id: "incredere", t: "Încrederea și reglarea emoțională", d: "Cât de stabil(ă) emoțional te simți astăzi în fața perspectivei de a da interviuri, a primi observații și a gestiona eventuale refuzuri?" },
    { id: "logistica", t: "Logistica și infrastructura de acasă", d: "Cât de clar și funcțional este organizat programul de acasă (îngrijire copii/familie, deplasări, sarcini zilnice, situații neprevăzute) pentru a susține un job?" },
    { id: "financiar", t: "Așteptările financiare și condițiile", d: "Cât de realist cunoști nivelul salarial din piață? Care e pragul minim de venit și de flexibilitate de care ai nevoie, ca întoarcerea să merite?" }
  ],
  note: {
    titlu: "Cât de mulțumit(ă) ești?",
    titluPauza: "Cât de pregătit(ă) te simți?",
    explica: "Dă o notă fiecărei zone. **1 = deloc mulțumit(ă), 10 = foarte mulțumit(ă).**",
    explicaPauza: "Scala de la 1 la 10 arată cât de pregătit(ă) și susținut(ă) te simți azi pe fiecare dimensiune. **Nota 1 înseamnă foarte puțin sau deloc conturat. Nota 10 înseamnă claritate și organizare solidă.**",
    lipsa: "Mai ai câteva zone fără notă. **Dă-le câte o notă** și desenăm roata.",
    lipsaPauza: "Mai ai câteva dimensiuni fără notă. **Dă-le câte o notă** și desenăm roata."
  },
  rezultat: {
    titlu: "Roata ta",
    descriere: "Roata ta, desenată din note. Cu cât o felie e mai lungă, cu atât ești mai mulțumit(ă) de zona aceea.",
    noteTitlu: "Notele tale",
    stramba: "**Roata ta nu e rotundă.** Unele zone merg bine, altele mai puțin. Zonele cu note mici arată unde e loc de schimbare.",
    mica: "**Roata ta e mică.** Multe zone au note mici. Poate acum nu ești mulțumit(ă) de muncă, în general.",
    buna: "**Roata ta e destul de mare și de rotundă.** Multe lucruri merg bine la muncă.",
    mici: "Zonele cu nota cea mai mică:",
    intrebari: [
      { id: "zona", t: "Ce zonă vrei să fie mai bună la următorul loc de muncă?", ajutor: "Alege una sau două." },
      { id: "caut", t: "Ce o să cauți la un loc de muncă nou, ca zona asta să fie mai bună?", ajutor: "De exemplu: program flexibil, un șef care te ajută să înveți." }
    ],
    folos: "**Folosește aceste răspunsuri când citești anunțuri și la interviu.** Poți întreba despre zonele care contează pentru tine.",
    refac: "Refac roata"
  }
};
