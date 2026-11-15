/* Date: sfaturi scurte pentru elevi, mesaje de încurajare, teme săptămânale, obstacole.
   Bazate pe indicațiile din promptul Simonei.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-11).
   Regulă: fără cifre fără sursă, fără promisiuni, fără presiune. */
window.DATE = window.DATE || {};
window.DATE.sfaturi = {
  verificat: "neverificat",
  scriere: "2026-11-11",
  grupe: {
    explorare: "Clasele IX–X: acum e timpul să explorezi.",
    alegere: "Clasele XI–XII: acum e timpul să alegi un prim pas."
  },
  teme: [
    { id: "motivatie", titlu: "Motivație și obstacole" },
    { id: "piata", titlu: "Piața muncii și meserii" },
    { id: "primul-job", titlu: "Primul job și voluntariatul" },
    { id: "alegere", titlu: "Alegerea liceului sau a facultății" }
  ],
  sfaturi: [
    { tema: "motivatie", grupa: "explorare", t: "**Nu trebuie să știi acum ce vrei să faci toată viața.** Încearcă lucruri mici și observă ce te bucură." },
    { tema: "motivatie", grupa: "explorare", t: "Dacă te blochezi, **alege un pas foarte mic**: o întrebare de pus cuiva sau o pagină de citit. Un pas mic contează." },
    { tema: "motivatie", grupa: "alegere", t: "Când ai multe de făcut, **alege un singur lucru important pe săptămână**. Prea multe scopuri deodată obosesc." },
    { tema: "motivatie", grupa: "alegere", t: "**O alegere nu e pentru totdeauna.** Mulți oameni își schimbă drumul. Poți învăța din fiecare pas." },
    { tema: "piata", grupa: "explorare", t: "Meseriile se schimbă în timp. De aceea, ce înveți să faci cu ceilalți și cum înveți lucruri noi poate conta cât și o meserie anume." },
    { tema: "piata", grupa: "explorare", t: "Angajatorii caută tot mai des oameni care se adaptează, comunică bine și lucrează în echipă. Le poți exersa la școală, într-un proiect sau în voluntariat." },
    { tema: "piata", grupa: "alegere", t: "Citește descrierea a cinci posturi reale, de la angajatori diferiți. Vezi ce se repetă: acolo ai de învățat." },
    { tema: "piata", grupa: "alegere", t: "Angajările pot fi prudente în unele perioade. Dacă nu primești răspuns, **nu înseamnă ceva despre tine**. Poți încerca la mai multe locuri sau poți schimba strategia." },
    { tema: "primul-job", grupa: "explorare", t: "**Experiența se poate începe mic**: voluntariat, ateliere, un proiect la școală. Fiecare pas se numără." },
    { tema: "primul-job", grupa: "explorare", t: "Voluntariatul te lasă să încerci o meserie și să cunoști oameni, fără presiunea unui job. Întreabă la școală sau la un ONG ce există în orașul tău." },
    { tema: "primul-job", grupa: "alegere", t: "Pentru primul tău CV, **scrie ce ai făcut concret**: un proiect, o activitate, un voluntariat. Nu e nevoie de multă experiență, ci de exemple reale." },
    { tema: "primul-job", grupa: "alegere", t: "Ai grijă cui scrii. Ți se cer bani ca să primești un job? Ți se promit bani ușor? **Oprește-te și vorbește cu un adult de încredere.**" },
    { tema: "alegere", grupa: "explorare", t: "Pentru liceu, întreabă-te: ce materii îți plac? Ce te face curios? Vorbește cu elevi din clasele mai mari și vizitează zilele porților deschise." },
    { tema: "alegere", grupa: "explorare", t: "Un adult care lucrează într-o meserie poate povesti în zece minute ce e greu și ce e frumos în ea. Întreabă-l pe cineva din familie sau din cartier." },
    { tema: "alegere", grupa: "alegere", t: "Ca să alegi ușor, verifică **patru lucruri**: ce se învață, cum se intră, unde e facultatea, ce alte drumuri duc acolo. Le găsești pe site-ul facultății." },
    { tema: "alegere", grupa: "alegere", t: "Dacă familia ta are alte idei decât tine, scrie-ți motivele într-o foaie și vorbește calm cu ei. **Decizia finală e a ta.**" }
  ],
  /* Mesaje scurte de încurajare, legate de tendințe discutate în promptul Simonei.
     Cifrele și sursele pentru tendințe se vor adăuga în pasul de verificare. */
  mesaje: {
    felicitare: [
      "Felicitări! Ai terminat tema acestei săptămâni. Fiecare pas mic contează.",
      "Bravo! Ai făcut un pas. Poți să te oprești puțin și să te bucuri.",
      "Foarte bine. Ce ai făcut azi te ajută și mâine."
    ],
    inceput: "A început o săptămână nouă. Poți alege o temă mică și să o faci în ritmul tău.",
    mijloc: "Mai ai câteva zile. Dacă tema ți se pare grea, alege un pas mai mic.",
    fara_tema: "Săptămâna asta nu ai făcut tema? E în regulă. Ți-a arătat ce e greu. Poți alege un pas mai mic sau o altă temă.",
    adaptare: "Să te adaptezi se poate exersa. O situație în care ceva nu a ieșit cum credeai și te-ai descurcat poate fi o poveste bună mai târziu.",
    echipa: "Ce ai făcut împreună cu alții poate conta mai mult decât crezi. Notează un exemplu.",
    digital: "Poate ieși o temă mică pe săptămână: un lucru nou pe care îl înveți azi. Nu trebuie să știi totul dintr-o dată.",
    refuz: "Dacă ai primit un „nu”, asta înseamnă că mai ai de lucrat la ceva anume. Nu înseamnă că nu ești bun(ă)."
  },
  /* Teme săptămânale: fiecare săptămână primește trei, alese rotativ. Elevul alege una sau își scrie propria temă. */
  teme_saptamanale: [
    { id: "t1", t: "Vorbește zece minute cu un adult care lucrează într-o meserie care te interesează. Întreabă-l ce face într-o zi obișnuită." },
    { id: "t2", t: "Citește despre o meserie salvată la Meserii. Notează o întrebare pe care ai vrea s-o pui cuiva." },
    { id: "t3", t: "Scrie trei lucruri pe care le-ai făcut bine în ultimele luni, chiar dacă par mici." },
    { id: "t4", t: "Întreabă un coleg sau un prieten la ce te vede bun(ă). Notează ce a spus." },
    { id: "t5", t: "Caută o activitate de voluntariat sau un atelier în orașul tău. Notează unde se desfășoară și cum te poți înscrie." },
    { id: "t6", t: "Încearcă o activitate nouă, legată de unul dintre interesele tale din test: o oră sau mai puțin." },
    { id: "t7", t: "Alege o materie care îți place și o materie care îți e mai grea. Notează un lucru mic pe care îl poți face pentru fiecare." },
    { id: "t8", t: "Scrie un paragraf despre cum ți-ai dori să arate o zi de lucru bună pentru tine." },
    { id: "t9", t: "Caută pe site-ul unui liceu sau al unei facultăți care te interesează ce se învață acolo. Notează ce ți-a plăcut." },
    { id: "t10", t: "Învață un lucru nou, de pe un site sau dintr-un clip: zece minute, apoi povestește-l cuiva." },
    { id: "t11", t: "Pune-ți ordine în program: notează ce ai de făcut mâine și alege un singur lucru important." },
    { id: "t12", t: "Notează un gând care te oprește, de exemplu „Nu sunt bun la așa ceva”. Scrie-l în alt fel și alege un pas mic." }
  ],
  /* Teme săptămânale pentru adulți: pași mici, despre muncă. */
  teme_adulti: [
    { id: "a1", t: "Alege o secțiune din CV (de exemplu experiența) și adaugă un rezultat concret și adevărat." },
    { id: "a2", t: "Caută 3 anunțuri care îți plac și notează ce cerințe se repetă." },
    { id: "a3", t: "Scrie o poveste din experiența ta pentru interviu: context, ce ai făcut, ce s-a întâmplat." },
    { id: "a4", t: "Scrie un mesaj scurt unui fost coleg sau unei cunoștințe din domeniul care te interesează." },
    { id: "a5", t: "Învață un lucru nou pe calculator sau pe telefon, 15 minute, de exemplu o funcție dintr-un program de birou." },
    { id: "a6", t: "Filmează-te câteva minute răspunzând la o întrebare de interviu și uită-te la filmare." },
    { id: "a7", t: "Caută un curs gratuit sau ieftin care te-ar ajuta (de exemplu, prin agenția de ocupare a forței de muncă)." },
    { id: "a8", t: "Fă o listă cu 10 firme la care ți-ar plăcea să lucrezi și intră pe pagina lor de cariere." },
    { id: "a9", t: "Roagă pe cineva de încredere să-ți citească CV-ul și notează ce ți-a spus." },
    { id: "a10", t: "Trimite o aplicare la un anunț care ți se potrivește, cu CV-ul potrivit pentru el." },
    { id: "a11", t: "Află despre un târg de joburi, un atelier sau un eveniment din domeniul tău și notează data." },
    { id: "a12", t: "Notează un gând care te oprește și scrie-l altfel, apoi un pas mic pe care îl poți face." }
  ],
  /* Cele 5 obstacole psihologice, formulate pentru elevi. Fiecare are o idee de răspuns. */
  obstacole: [
    { id: "o1", nume: "Gândesc prea mult", explicatie: "Citesc și caut tot mai mult, dar nu fac niciun pas.", idee: "**Mai bine un pas imperfect astăzi decât un pas perfect peste o lună.** Alege ceva mic și fă-l azi." },
    { id: "o2", nume: "Vreau să iasă perfect", explicatie: "Aștept momentul sau varianta perfectă.", idee: "Poți pune un scop de cantitate, nu de rezultat. De exemplu: „încerc trei lucruri săptămâna asta”." },
    { id: "o3", nume: "Rezultatul vine târziu", explicatie: "Muncesc acum, dar efectul se vede abia mai târziu și îmi pierd curajul.", idee: "**Sărbătorește pașii mici**, nu doar rezultatul final. Dacă ai făcut tema, e un motiv de bucurie." },
    { id: "o4", nume: "Mă simt mai puțin bun(ă) decât alții", explicatie: "Mă gândesc: „Cine sunt eu să încerc? Sigur sunt alții mai buni.”", idee: "Amintește-ți punctele tale tari și lucrurile care ți-au ieșit bine. Nu trebuie să fii cel mai bun, ci să încerci." },
    { id: "o5", nume: "Vreau prea multe deodată", explicatie: "Planul meu e prea încărcat.", idee: "**Alege un singur scop mare** și lasă restul pentru mai târziu." }
  ]
};
