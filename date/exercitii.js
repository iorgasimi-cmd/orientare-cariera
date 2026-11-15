/* Date: exerciții interactive pentru discuții la muncă și la interviu.
   Texte și exemple scrise original, pentru situații de muncă. Fără cifre sau promisiuni.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.exercitii = {
  verificat: "neverificat",
  scriere: "2026-11-15",

  grupAsertiv: {
    titlu: "Exersează cu situații",
    explica: "Patru exerciții scurte, cu situații de la muncă. Alegi un răspuns și vezi de ce e sau nu potrivit."
  },
  grupInterviu: {
    titlu: "Exerciții pentru discuție",
    explica: "Cinci exerciții scurte care te ajută să vorbești mai liniștit la interviu și la întâlniri."
  },

  /* ---- Exerciții cu alegere (răspunsul se vede după ce alegi) ---- */
  quiz: {
    compliment: {
      titlu: "Când primești un compliment",
      intro: "Mulți oameni se încurcă la complimente: le neagă, se micșorează sau tac jenați. Un compliment primit frumos face discuția mai caldă pentru amândoi. Cel mai simplu: mulțumești și întorci ceva bun.",
      itemi: [
        {
          situatie: "Șefa îți spune, după ședință: „Prezentarea ta de azi a fost foarte bună.”",
          variante: [
            { t: "„A, nu era mare lucru, am avut noroc.”", ok: false, expl: "Te micșorezi, iar celei care te-a lăudat îi spui, de fapt, că s-a înșelat." },
            { t: "„Ăăă… mersi… cred.” și te uiți în altă parte.", ok: false, expl: "Pare că te-a încurcat lauda. Discuția se oprește stânjenitor." },
            { t: "„Mulțumesc! Mă bucur că v-a fost de folos. M-au ajutat și întrebările dumneavoastră de săptămâna trecută.”", ok: true, expl: "Primești lauda cu bucurie și întorci ceva bun. Amândouă vă simțiți bine și discuția continuă." }
          ]
        },
        {
          situatie: "Un coleg îți spune: „Ai rezolvat foarte repede problema clientului.”",
          variante: [
            { t: "„Mulțumesc! Și tu m-ai ajutat când mi-ai explicat programul nou.”", ok: true, expl: "Mulțumești simplu și împarți meritul. Colegul se simte văzut." },
            { t: "„Da, eu rezolv mereu cel mai repede.”", ok: false, expl: "Primești lauda, dar sună a laudă de sine. Colegul se poate simți pus deoparte." },
            { t: "„Nu, nu, a fost ușor, oricine putea.”", ok: false, expl: "Negi lauda. Colegul nu mai știe ce să spună." }
          ]
        }
      ]
    },
    gluma: {
      titlu: "Glumă sau batjocură?",
      intro: "O glumă prietenoasă se primește ușor: zâmbești, poți chiar s-o continui. Batjocura e altceva: se repetă, te face să pari mai puțin capabil(ă), de obicei de față cu alții. Pe aceasta o oprești calm, pe loc.",
      intrebare: "Ce crezi că este?",
      optiuni: [["gluma", "O glumă prietenoasă"], ["batjocura", "Batjocură"]],
      itemi: [
        {
          situatie: "Un coleg, zâmbind, la cafea: „Iar ai uitat umbrela? Avem deja o colecție la recepție!”",
          corect: "gluma",
          expl: "E o glumă fără răutate, despre un lucru mic. Nu te atacă.",
          raspuns: "„Așa e, contribui cu drag la colecție!” Zâmbești și mergeți mai departe."
        },
        {
          situatie: "În fiecare ședință, când începi să vorbești, același coleg spune: „Hai, că acum ne explică iar cine le știe pe toate.”",
          corect: "batjocura",
          expl: "Se repetă, se întâmplă de față cu alții și te face să pari ridicol(ă). Nu e o glumă.",
          raspuns: "„Te rog să mă lași să termin. Apoi aștept și părerea ta.” Spus calm, fără ironie."
        },
        {
          situatie: "Când îți vede biroul ordonat, colega râde: „Tu îți aliniezi și pixurile cu rigla?”",
          corect: "gluma",
          expl: "E o observație amuzantă despre un obicei al tău, fără să te facă mai puțin capabil(ă).",
          raspuns: "„Doar luni. Marțea le las să se odihnească.” Sau doar zâmbești."
        },
        {
          situatie: "După ce faci o greșeală mică, șeful de tură îți spune de față cu toată echipa: „Normal, ce să aștepți de la cineva ca tine.”",
          corect: "batjocura",
          expl: "Nu mai e despre greșeală, ci despre tine ca om. E o umilire, nu o glumă.",
          raspuns: "„Am greșit și o repar acum. Despre mine aș vrea să vorbim între patru ochi.”"
        }
      ]
    },
    argumente: {
      titlu: "Când cineva argumentează nedrept",
      intro: "Uneori, într-o discuție, cineva nu răspunde la ce ai spus, ci încearcă doar să „câștige”. Dacă recunoști felul în care o face, poți răspunde calm, fără să te cerți.",
      tipuri: [
        { id: "persoana", t: "Atacă persoana", d: "Nu vorbește despre idee, ci despre tine: vârsta, vechimea, felul tău de a fi." },
        { id: "perfect", t: "„Dacă nu e perfect, nu e bun”", d: "Respinge o soluție doar pentru că nu rezolvă absolut tot." },
        { id: "detaliu", t: "Se agață de un detaliu mic", d: "Insistă pe un lucru mărunt, ca să pară că toată ideea e greșită." },
        { id: "rastalmaceste", t: "Îți răstălmăcește vorbele", d: "Spune că ai zis ceva mult mai mult sau mai rău decât ai spus." }
      ],
      sfat: "Ce te ajută de obicei: o întrebare calmă, care aduce discuția înapoi la idee. De exemplu: „Ce anume nu merge, concret?” sau „Cum se leagă asta de ce am propus?”",
      intrebare: "Ce face colegul?",
      itemi: [
        {
          situatie: "Propui un program nou pentru ture. Un coleg spune: „Tu ce știi? Ești aici de doar trei luni.”",
          corect: "persoana",
          raspuns: "„Sunt nou(ă), e adevărat. Ce anume din propunere crezi că nu ar merge?”"
        },
        {
          situatie: "Propui o listă de verificare înainte de trimiterea comenzilor. Cineva spune: „N-are rost, tot o să mai fie greșeli.”",
          corect: "perfect",
          raspuns: "„Nu le oprește pe toate, dar dacă vor fi mai puține, merită. Ce ai adăuga tu ca să meargă și mai bine?”"
        },
        {
          situatie: "Propui un raport săptămânal pentru echipă. Un coleg vorbește un sfert de oră doar despre culoarea tabelului.",
          corect: "detaliu",
          raspuns: "„Culoarea o schimbăm ușor. Ești de acord cu ideea raportului?”"
        },
        {
          situatie: "Spui: „Aș vrea să lucrez de acasă vinerea.” Colegul răspunde: „Deci nu-ți pasă de echipă și nu mai vrei să vii la birou deloc?”",
          corect: "rastalmaceste",
          raspuns: "„Nu asta am spus. Am propus doar vinerea, și rămân la birou în celelalte zile. Ce părere ai despre asta?”"
        }
      ]
    }
  },

  /* ---- Cererea cu motiv ---- */
  cerere: {
    titlu: "Cererea mea",
    intro: "O cerere sună mai respectuos când e o întrebare, nu un ordin, și când spui și motivul. „Trimite-mi raportul acum!” sună altfel decât „Îmi poți trimite raportul până la ora 12? Am nevoie de el pentru ședința cu clientul.”",
    camp: "Scrie o cerere către un coleg sau către șef",
    ajutor: "De exemplu: să te ajute cu o sarcină, să schimbi o tură, să primești o zi liberă.",
    buton: "Verific cererea",
    gol: "Scrie mai întâi cererea în căsuța de mai sus.",
    mesaje: {
      intrebare_ok: "E formulată ca o întrebare. Sună respectuos.",
      intrebare_nu: "Încearcă să o scrii ca o întrebare, de exemplu cu „Poți…?” sau „Ați putea…?”.",
      motiv_ok: "Spui și motivul. Celălalt înțelege de ce e important.",
      motiv_nu: "Adaugă motivul, cu „pentru că”, „fiindcă” sau „ca să”. Un motiv adevărat face cererea mai ușor de primit.",
      presiune: "Cuvinte ca „imediat”, „acum!” sau „trebuie să” pot suna a ordin. Poți spune până când ai nevoie, de exemplu „până la ora 12”.",
      termen_ok: "Spui până când ai nevoie. E clar pentru amândoi.",
      multumesc: "Poți încheia cu „mulțumesc”. E un gest mic, dar contează."
    }
  },

  /* ---- Pauza de două secunde ---- */
  pauza: {
    titlu: "Pauza de două secunde",
    intro: [
      "Când răspunzi imediat ce celălalt a terminat de vorbit, poate părea că nu l-ai ascultat, ci doar ai așteptat să-ți vină rândul.",
      "O pauză scurtă, de două secunde, arată că te-ai gândit la ce a spus. Te ajută și pe tine să-ți aduni gândurile."
    ],
    cum: "Citește întrebarea ca și cum ți-ar pune-o cineva. Apasă butonul, așteaptă până se umple bara, apoi răspunde cu voce tare.",
    buton: "Am auzit întrebarea",
    asteapta: "Gândește-te puțin…",
    acum: "Acum răspunde, cu voce tare.",
    alta: "Altă întrebare"
  },

  /* ---- Încălzirea vocii ---- */
  voce: {
    titlu: "Încălzirea vocii",
    intro: "Așa cum sportivii se încălzesc înainte de antrenament, și vocea se poate încălzi înainte de un interviu sau de o discuție importantă. Durează un minut.",
    pasi: [
      "Respiră adânc, din burtă. Pune mâna pe burtă și simte cum se ridică.",
      "Citește textul de mai jos cu voce tare. Exagerează: vorbește tare, apoi încet, schimbă vocea la fiecare personaj.",
      "Încetinește la frazele importante și grăbește-te puțin la cele mai puțin importante.",
      "La interviu nu exagerezi, dar vocea va fi mai vie și mai sigură."
    ],
    text: [
      "– Bună dimineața! a strigat vânzătorul de la colț. Ați venit după pâine caldă?",
      "– Nu chiar, a șoptit bătrâna, uitându-se în jur. Am venit să vă spun un secret.",
      "– Un secret? s-a mirat el, aproape scăpând tava din mână.",
      "– Da. Pisica mea a învățat să deschidă frigiderul. Și azi-noapte… a mâncat toată brânza!",
      "Vânzătorul a izbucnit în râs. Apoi s-a oprit, foarte serios: – Doamnă, cred că pisica dumneavoastră merită o slujbă la noi."
    ],
    cronometru: 60
  },

  /* ---- Începutul și finalul ---- */
  capete: {
    titlu: "Începutul și finalul tău",
    intro: "Oamenii își amintesc cel mai bine cum începe și cum se termină o discuție. Pe acestea le poți pregăti cuvânt cu cuvânt. Pentru mijloc, notează doar câteva idei: dacă înveți totul pe de rost, sună a text citit.",
    campuri: [
      { id: "inceput", t: "Cum te prezinți, în aproximativ 30 de secunde", ajutor: "Cine ești, ce experiență ai și ce cauți acum.", randuri: 4 },
      { id: "mijloc", t: "La mijloc: 2–3 idei pe care vrei să le spui", ajutor: "Doar câteva cuvinte pentru fiecare, de exemplu: „proiectul cu clienții noi”.", randuri: 3 },
      { id: "final", t: "Cum închei discuția", ajutor: "De exemplu: îi mulțumești pentru timp, spui ce te-a bucurat și întrebi care sunt pașii următori.", randuri: 3 }
    ],
    cum: "Citește începutul cu voce tare și cronometrează-te. Încearcă să rămâi în jur de 30 de secunde.",
    cronometru: 30
  },

  /* ---- Cuvintele firmei ---- */
  cuvinte: {
    titlu: "Cuvintele firmei",
    intro: "Oamenii se simt mai în largul lor cu cineva care le vorbește „pe limba lor”. Înainte de interviu, uită-te ce cuvinte folosește firma: în anunț, pe site, pe paginile ei.",
    camp: "Lipește aici textul anunțului sau câteva paragrafe de pe site-ul firmei",
    buton: "Văd cuvintele",
    rezultat: "Cuvintele care apar cel mai des",
    sfat: "Folosește-le firesc, unde se potrivesc, de exemplu când vorbești despre experiența ta. Nu le înșira pe toate: s-ar simți forțat.",
    gol: "Lipește mai întâi un text în căsuța de mai sus.",
    putine: "Textul e prea scurt ca să văd ce se repetă. Lipește mai mult.",
    /* Cuvinte de legătură care nu se numără (fără diacritice, cu litere mici). */
    ignorate: ["pentru", "care", "este", "sunt", "sau", "din", "prin", "unei", "unui", "acest", "aceasta", "aceste", "acestea", "fost", "fiind", "avea", "avem", "aveti", "vreti", "doriti", "dorim", "suntem", "noastra", "nostru", "noastre", "nostri", "voastra", "vostru", "dumneavoastra", "despre", "catre", "dupa", "inainte", "intre", "printre", "astfel", "foarte", "toate", "toti", "fiecare", "orice", "alte", "altor", "mult", "multe", "multi", "putin", "precum", "inclusiv", "precum", "acolo", "aici", "cand", "unde", "cum", "daca", "insa", "deci", "doar", "chiar", "cele", "celor", "cel", "cea", "lor", "sale", "sau", "lui", "mai", "ale", "ori", "nici", "spre", "fara", "peste", "sub", "asupra", "candidat", "candidatul", "candidata", "post", "postul", "jobul", "aplica", "aplicati", "cautam", "oferim", "beneficii", "cerinte", "responsabilitati"],
    maxim: 12
  },

  /* ---- 2 întrebări, 1 poveste ---- */
  intrebari: {
    titlu: "Două întrebări, o poveste",
    intro: "La un târg de joburi sau când cunoști pe cineva din domeniu, ajută să pui mai multe întrebări decât vorbești despre tine. Dar nu doar întrebări: spune și tu ceva, ca să fie o discuție, nu un interogatoriu.",
    alege: "Alege două întrebări pe care ți-ar plăcea să le pui",
    lista: [
      "Cum ați ajuns să lucrați în acest domeniu?",
      "Ce vă place cel mai mult la munca dumneavoastră?",
      "Cum arată o zi obișnuită la dumneavoastră?",
      "Ce ați sfătui pe cineva care abia începe în domeniu?",
      "Ce proiecte noi are firma în perioada următoare?",
      "Ce calități apreciați la colegii noi?"
    ],
    maxim: 2,
    prea_multe: "Alege doar două. Scoate una ca să adaugi alta.",
    poveste: "Și o poveste scurtă despre tine, de 2–3 propoziții",
    povesteAjutor: "Ceva ce ai făcut și ți-a plăcut, legat de domeniu. Poți folosi una dintre poveștile tale de la interviu.",
    sfat: "La discuție: pune o întrebare, ascultă, fă pauza de două secunde, pune a doua întrebare, apoi spune povestea ta când se potrivește."
  },

  /* ---- Cum să argumentezi: ideile principale și exercițiul „Argumentul meu” ---- */
  argumentez: {
    titlu: "Cum să argumentezi",
    intro: "Să argumentezi înseamnă să explici calm și clar ce propui, ca celălalt să te poată înțelege și, poate, să fie de acord. Nu e o ceartă și nu e despre cine câștigă.",
    ideiTitlu: "Ideile principale",
    idei: [
      { t: "Spune ideea clar, de la început.", ex: "O singură propoziție: ce propui." },
      { t: "Dă un motiv.", ex: "Ce rezolvă ideea ta." },
      { t: "Sprijină motivul cu un exemplu sau un fapt adevărat.", ex: "Un exemplu concret convinge mai mult decât „eu cred că”." },
      { t: "Arată ce câștigă și celălalt.", ex: "Nu doar ce câștigi tu." },
      { t: "Recunoaște ce e adevărat în părerea celuilalt.", ex: "„Ai dreptate că… De aceea propun…”" },
      { t: "Propune un pas mic sau o probă.", ex: "„Încercăm două săptămâni și vedem.”" },
      { t: "Ascultă și cere lămuriri.", ex: "„Ce anume nu ți se pare bine?”" },
      { t: "Rămâi la subiect.", ex: "Vorbește despre idee, nu despre persoană. Fără „mereu” și „niciodată”." },
      { t: "Vorbește calm și simplu.", ex: "Încetinește la ideea principală." },
      { t: "Fii sincer(ă) când nu știi.", ex: "„Nu știu sigur, verific și îți spun mâine.”" }
    ],
    formaTitlu: "O formă ușor de ținut minte: 4 pași",
    forma: "Ideea → Motivul → Exemplul → Propunerea",
    exemplu: "„Propun să facem o ședință de 15 minute luni dimineață, ca să știm toți ce avem de făcut. Săptămâna trecută, doi colegi au lucrat la același raport. Hai să încercăm două săptămâni și apoi vedem dacă ne ajută.”",
    model: {
      titlu: "Argumentul meu",
      explica: "Gândește-te la ceva ce vrei să propui la muncă sau la un interviu. Completează cei patru pași.",
      parti: [
        { id: "idee", t: "Ideea (ce propui)", ajutor: "O propoziție scurtă. De exemplu: „Propun să facem o ședință scurtă luni dimineață.”", randuri: 2 },
        { id: "motiv", t: "Motivul (ce rezolvă)", ajutor: "De exemplu: „ca să știm toți ce avem de făcut în săptămâna aceea”.", randuri: 2 },
        { id: "exemplu", t: "Exemplul (un fapt adevărat)", ajutor: "O situație care s-a întâmplat. De exemplu: „săptămâna trecută, doi colegi au lucrat la același raport”.", randuri: 3 },
        { id: "propunere", t: "Propunerea (un pas concret)", ajutor: "Ceva ce puteți face. De exemplu: „hai să încercăm două săptămâni și apoi vedem”.", randuri: 2 }
      ],
      buton: "Văd argumentul meu",
      argument: "Argumentul tău",
      gol: "Încă nu ai completat toți pașii:",
      lipsa: "Lipsește pasul „{parte}”.",
      bine: "✓ Argumentul tău are toți cei patru pași și sună clar și calm.",
      aproape: "Argumentul tău are toți cei patru pași. Câteva lucruri l-ar face mai convingător:",
      laude: {
        exemplu: "Exemplul tău e concret: spune când sau cât.",
        propunere: "Propui un pas concret, ușor de încercat."
      },
      reguli: {
        ideeLunga: "Ideea e cam lungă. Încearcă s-o spui într-o singură propoziție scurtă.",
        motivScurt: "Motivul e foarte scurt. Spune ce rezolvă ideea ta.",
        absolut: "Ai scris „{gasit}”. Cuvintele ca „mereu”, „niciodată” sau „toată lumea” sună a exagerare. Spune o situație anume.",
        persoana: "Ai scris „{gasit}”. Asta sună ca un atac la persoană. Vorbește despre idee, nu despre om.",
        exempluVag: "Exemplul e general. Spune o situație anume: când s-a întâmplat, cine, cât.",
        propunereVaga: "Propunerea e prea generală ({gasit}). Spune un pas concret, de exemplu „încercăm două săptămâni” sau „începem de luni”."
      },
      sfat: "Citește argumentul cu voce tare. Apoi gândește-te: ce ar putea spune celălalt împotrivă? Pregătește un răspuns calm."
    },
    continua: "Continuă: când cineva argumentează nedrept"
  },

  cronometru: { porneste: "Pornește cronometrul", din: "secunde", gata: "Gata timpul." }
};
