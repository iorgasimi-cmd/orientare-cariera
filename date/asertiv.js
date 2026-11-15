/* Date: comunicarea asertivă (secțiune cerută de autoare).
   Baza: curs, cap. 2 (stilurile de comunicare: pasiv, agresiv, pasiv-agresiv, asertiv; comunicarea asertivă;
   coerența dintre cuvinte și limbajul corpului) și cap. 7.2 (păreri spuse concret, despre fapte, cu o soluție).
   Exemplele sunt scrise original, pentru situații de muncă. Fără cifre sau promisiuni despre rezultate.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-15). */
window.DATE = window.DATE || {};
window.DATE.asertiv = {
  verificat: "neverificat",
  scriere: "2026-11-15",

  titlu: "Comunicarea asertivă",
  ce: "Comunicarea asertivă te ajută să fii luat(ă) în serios fără să te cerți. Înseamnă **să spui clar și calm ce gândești și de ce ai nevoie**, cu respect pentru ceilalți. Pe scurt: **„Eu contez și tu contezi.”**",
  castig: {
    titlu: "Ce câștigi în carieră",
    lista: [
      "La interviu, vorbești despre tine fără să te micșorezi și fără să exagerezi.",
      "La locul de muncă, **poți spune „nu” sau „acum nu pot” fără să strici relațiile**.",
      "Când discuți despre program sau despre salariu, **îți aperi interesele cu respect**.",
      "Primești și spui păreri despre muncă fără certuri."
    ]
  },
  stiluri: {
    titlu: "Patru feluri de a comunica",
    lista: [
      { nume: "Pasiv", motto: "„Eu nu contez, tu contezi.”", text: "Spui „da” la orice, ca să eviți neînțelegerile. În timp, te simți nedreptățit(ă) și obosit(ă), iar ceilalți nu știu ce poți și ce nu poți.", ex: "„Îmi pare rău că vă deranjez… nu știu dacă e bine ce zic.”" },
      { nume: "Agresiv", motto: "„Doar eu contez.”", text: "Impui ce vrei, ridici tonul, întrerupi. Poți câștiga pe moment, dar pierzi încrederea celorlalți.", ex: "„Nu înțelegi nimic!”" },
      { nume: "Pasiv-agresiv", motto: "„Spun da, dar…”", text: "Pari de acord, dar îți arăți nemulțumirea pe ocolite: ironii, „uitări”, vorbe pe la spate. În echipă, asta aduce neîncredere.", ex: "„Sigur, fac cum zici tu…” (și apoi nu faci)." },
      { nume: "Asertiv", motto: "„Eu contez și tu contezi.”", text: "Spui clar ce gândești și de ce ai nevoie, cu un ton calm, și cauți o soluție bună pentru amândoi.", ex: "„Înțeleg ce spui. Eu văd lucrurile altfel și propun…”" }
    ]
  },

  /* Cinci exemple din viața profesională. */
  exemple: [
    {
      titlu: "La interviu: programul de lucru",
      situatie: "La interviu ți se spune că uneori se lucrează și sâmbăta. Tu nu poți, din cauza familiei.",
      pasiv: "„Da, sigur, nicio problemă…” Apoi te chinui sau renunți după o lună.",
      agresiv: "„Nu lucrez în weekend. Așa ceva nu accept.”",
      asertiv: "„Înțeleg că sunt perioade aglomerate. Sâmbăta am obligații de familie, dar pot rămâne mai mult în timpul săptămânii când e nevoie.”",
      bine: "**Spui sincer ce nu poți**, fără scuze lungi, și propui o soluție."
    },
    {
      titlu: "Prea multe sarcini deodată",
      situatie: "Șeful îți dă o sarcină nouă, urgentă, când ai deja de terminat un raport.",
      pasiv: "„Bine, le fac pe amândouă.” Apoi stai peste program, obosit(ă) și supărat(ă).",
      agresiv: "„Iar eu? Nu vedeți că nu mai pot?”",
      asertiv: "„Vreau să le fac bine pe amândouă. Raportul e gata joi. Pe care o fac mai întâi? Pe cea nouă o pot începe vineri.”",
      bine: "**Arăți faptele, ceri o alegere și spui ce poți face.**"
    },
    {
      titlu: "Un coleg își ia meritul",
      situatie: "Într-o ședință, un coleg prezintă munca voastră comună ca și cum ar fi numai a lui.",
      pasiv: "Taci și te superi în gând, zile întregi.",
      agresiv: "„Nu e adevărat, el nu a făcut nimic!”",
      asertiv: "„Mă bucur că proiectul a plăcut. Aș adăuga și partea mea: eu am făcut analiza datelor. Data viitoare aș vrea să-l prezentăm împreună.”",
      bine: "**Spui calm ce ai făcut tu**, fără să-l ataci pe celălalt, și propui ceva pentru data viitoare."
    },
    {
      titlu: "Primești o critică",
      situatie: "Șefa îți spune că raportul tău are greșeli.",
      pasiv: "„Îmi pare rău, nu sunt bun(ă) de nimic…”",
      agresiv: "„Nu e vina mea, nu mi-ați explicat bine!”",
      asertiv: "„Mulțumesc că mi-ați spus. Îmi puteți arăta un exemplu, ca să știu exact ce să schimb? Îl refac până mâine.”",
      bine: "**Primești critica fără să te aperi și fără să te micșorezi**, ceri detalii și propui un pas."
    },
    {
      titlu: "Ceri ajutor",
      situatie: "Ești nou(ă) și nu știi să folosești un program de care ai nevoie chiar azi.",
      pasiv: "Nu întrebi pe nimeni și pierzi o zi încercând singur(ă).",
      agresiv: "„Nimeni nu mi-a arătat nimic aici!”",
      asertiv: "„Am nevoie de ajutorul tău ca să termin la timp: îmi poți arăta în zece minute cum salvez raportul în program?”",
      bine: "**Spui clar de ce ai nevoie** și cât timp îi ceri celuilalt."
    }
  ],
  etichete: { situatie: "Situația", pasiv: "Pasiv", agresiv: "Agresiv", asertiv: "Asertiv", bine: "Ce face bine răspunsul asertiv" },

  formula: {
    titlu: "O frază asertivă, în trei pași",
    pasi: [
      "**Spune ce vezi: faptele, fără etichete.** „Raportul are trei greșeli.”, nu „Ești neatent.”",
      "**Spune ce simți sau de ce ai nevoie, începând cu „eu”.** „Am nevoie de…”, „Pentru mine e important…”",
      "**Propune o soluție sau o alternativă.** „Propun să…”, „Nu pot azi, dar pot mâine.”"
    ]
  },
  corp: {
    titlu: "Și cum spui",
    lista: [
      "Vorbește calm, nici prea încet, nici prea tare.",
      "Uită-te la omul cu care vorbești.",
      "Stai drept, cu brațele relaxate.",
      "**Cuvintele și felul în care le spui trebuie să se potrivească**: un „da” spus cu ochii în pământ nu convinge."
    ]
  },
  exercitiu: {
    titlu: "Încearcă tu",
    campuri: [
      { id: "situatie", t: "O situație în care ți-a fost greu să spui ce gândești", ajutor: "La muncă, la un interviu sau în altă parte.", randuri: 3 },
      { id: "exersez", t: "Ce frază vrei să exersezi săptămâna asta?", ajutor: "Poți să o spui cu voce tare, în fața oglinzii.", randuri: 2 }
    ]
  },

  /* Modelul de frază asertivă în patru părți, completat de om, apoi verificat local, după câteva reguli simple. */
  model: {
    titlu: "Cum ai putea spune asertiv?",
    explica: "Completează modelul de mai jos, pentru situația ta. Scrie doar ce urmează după cuvintele de început.",
    exemplu: "Exemplu: Când primesc sarcini noi vineri, mă simt copleșit(ă), pentru că vreau să le fac bine. Propun să le aflu de luni, ca să le pot planifica.",
    parti: [
      { id: "cand", inceput: "Când", t: "Când… (ce se întâmplă)", ajutor: "**Descrie faptul, ca o cameră de filmat**: ce s-a întâmplat, fără să judeci omul." },
      { id: "simt", inceput: "mă simt", t: "Mă simt… (ce simți)", ajutor: "Un cuvânt sau două despre ce simți, de exemplu: îngrijorat(ă), frustrat(ă), copleșit(ă), nedreptățit(ă)." },
      { id: "motiv", inceput: "pentru că", t: "Pentru că… (motivul)", ajutor: "Ce anume e important pentru tine: ce nevoie ai sau ce îți dorești să meargă bine." },
      { id: "vreau", inceput: "Propun să", t: "Propun să… (ce propui)", ajutor: "**Ceva concret, pe care îl puteți face.** De exemplu: „ne vedem luni dimineață și împărțim sarcinile”." }
    ],
    buton: "Văd fraza mea",
    fraza: "Fraza ta",
    gol: "Completează toate cele patru părți, ca să pot pune fraza laolaltă.",
    bine: "✓ Ai respectat modelul și mesajul sună asertiv.",
    aproape: "Ai respectat modelul. Câteva lucruri te-ar ajuta să sune și mai asertiv:",
    incomplet: "Încă nu ai completat toate părțile modelului:",
    lipsa: "Lipsește partea „{parte}”.",
    reguli: {
      eticheta: "La „Când…”, ai folosit un cuvânt care judecă omul ({gasit}). Spune doar ce s-a întâmplat, de exemplu „când raportul a ajuns joi”, nu „când ești neserios”.",
      absolut: "La „Când…”, ai scris „{gasit}”. Cuvintele ca „mereu” sau „niciodată” sună a acuzație. Spune o situație anume, de exemplu „când săptămâna trecută…”.",
      tuEsti: "La „Când…”, ai scris despre cum este celălalt („{gasit}”). Spune ce a făcut, nu ce fel de om este.",
      simtCa: "La „Mă simt…”, ai scris „că…”. Asta e o părere despre celălalt, nu un sentiment. Încearcă un cuvânt ca „îngrijorat(ă)”, „frustrat(ă)” sau „nedreptățit(ă)”.",
      simtTu: "La „Mă simt…”, vorbești despre celălalt. Aici spune doar ce simți tu.",
      motivVina: "La „Pentru că…”, motivul pare să fie vina celuilalt ({gasit}). Spune ce e important pentru tine, de exemplu „pentru că vreau să termin la timp”.",
      vreauVag: "La „Propun să…”, propunerea e prea generală ({gasit}). Spune ceva concret, de exemplu „ne spunem dinainte ce sarcini vin”.",
      vreauAmenintare: "La „Propun să…”, apare o amenințare ({gasit}). Asertiv înseamnă să propui, nu să ameninți.",
      vreauNegativ: "La „Propun să…”, spui doar ce să nu mai facă celălalt. Spune și ce ați putea face în loc, de exemplu „îmi spui cu o zi înainte”."
    },
    simtCunoscut: "Ai numit un sentiment. Celălalt înțelege ce simți.",
    sfat: "Citește fraza cu voce tare. Sună ca tine? Dacă da, e gata de folosit."
  },

  /* ---- Pentru elevi: aceleași idei, cu situații de la școală ---- */
  elev: {
    ce: "Să fii asertiv(ă) înseamnă **să spui clar ce gândești și ce vrei, fără să-i jignești pe ceilalți**. Pe scurt: **„Eu contez și tu contezi.”**",
    castig: { titlu: "Ce câștigi", lista: [
      "**Spui „nu”** fără să pierzi prietenii.",
      "**Ceri ajutor** la școală fără să-ți fie rușine.",
      "Vorbești calm cu profesorii și cu părinții, **chiar când nu ești de acord**.",
      "**Ești ascultat(ă)** în proiectele de grup."
    ] },
    exemple: [
      { titlu: "Colegul vrea să copieze tema", situatie: "Un coleg îți cere tema, ca s-o copieze. Tu nu vrei.",
        pasiv: "I-o dai, deși nu vrei, și te superi în gând.", agresiv: "„Fă-ți singur tema, leneșule!”",
        asertiv: "„Nu-ți dau tema s-o copiezi. Dacă vrei, îți explic exercițiul în pauză.”",
        bine: "**Spui „nu” clar** și oferi ajutor." },
      { titlu: "Prietenii vor să chiulești", situatie: "Prietenii insistă să chiulești cu ei de la o oră.",
        pasiv: "Mergi cu ei, deși nu vrei.", agresiv: "„Sunteți proști, eu nu fac așa ceva.”",
        asertiv: "„Nu vin. Am test la ora asta. Ne vedem după școală?”",
        bine: "**Spui „nu” fără să-i jignești** și propui altceva." },
      { titlu: "O notă care ți se pare nedreaptă", situatie: "Ai primit o notă care ți se pare prea mică.",
        pasiv: "Taci și te superi acasă.", agresiv: "„Nu e corect, mereu mă depunctați!”",
        asertiv: "„Îmi puteți arăta ce am greșit? Vreau să știu cum iau mai mult data viitoare.”",
        bine: "**Ceri lămuriri calm**, fără acuzații." },
      { titlu: "Colegii nu lucrează la proiect", situatie: "La un proiect de grup, doi colegi nu fac nimic.",
        pasiv: "Faci tu tot și te superi.", agresiv: "„Voi nu faceți nimic niciodată!”",
        asertiv: "„Predăm vineri. Propun așa: eu scriu textul, voi faceți prezentarea până joi. Ce ziceți?”",
        bine: "Spui faptele și **propui o împărțire clară**." },
      { titlu: "Părinții vor altă școală pentru tine", situatie: "Părinții vor să alegi alt liceu sau altă facultate decât îți dorești tu.",
        pasiv: "Accepți fără să spui ce vrei.", agresiv: "„Nu mă înțelegeți, fac ce vreau!”",
        asertiv: "„Știu că vreți binele meu. Eu mă gândesc la altceva. Putem vorbi diseară? Vă arăt ce am aflat.”",
        bine: "**Arăți respect** și spui calm ce îți dorești." }
    ],
    formulaPrimul: "Spune ce vezi: faptele, fără etichete. „Proiectul nu e gata.”, nu „Ești leneș.”",
    situatieAjutor: "La școală, acasă, cu prietenii sau în altă parte.",
    modelExemplu: "Exemplu: Când colegii nu își fac partea la proiect, mă simt stresat(ă), pentru că vreau o notă bună. Propun să ne împărțim sarcinile azi."
  },

  /* ---- Cere clar și de la IA: reguli simple, legate de comunicarea asertivă ---- */
  ia: {
    titlu: "Cere clar și de la IA",
    intro: "Un program de inteligență artificială (IA) îți răspunde mai bine **când îi ceri clar, ca într-o cerere asertivă**.",
    reguli: [
      { t: "Spune clar ce vrei.", ex: "„Explică-mi fotosinteza” e mai bun decât „ajută-mă la bio”." },
      { t: "Spune cine ești și cum vrei răspunsul.", ex: "„Sunt în clasa a X-a. Explică-mi în 5 propoziții simple.”" },
      { t: "Verifică ce îți spune.", ex: "IA poate greși sau poate inventa lucruri. Compară cu manualul sau întreabă un profesor." },
      { t: "Nu scrie date personale.", ex: "Fără nume complet, adresă, CNP, parole sau poze cu tine." },
      { t: "Folosește-o ca să înveți, nu ca să copiezi.", ex: "Cere explicații și exemple. Întreabă profesorul dacă ai voie s-o folosești la o temă." },
      { t: "Spune ce nu-ți place.", ex: "Poți cere: „Mai simplu, te rog.” sau „Dă-mi un exemplu.”" }
    ],
    varsta: "Unele programe de IA au o vârstă minimă sau cer acordul părinților. Citește regulile programului și vorbește cu părinții.",
    intrebare: "Care cerere e mai clară?",
    quiz: [
      { a: "„Ajută-mă la română.”", b: "„Sunt în clasa a IX-a. Dă-mi 3 idei pentru un eseu despre prietenie. Îl scriu eu.”", corect: "b",
        expl: "A doua spune cine ești, ce vrei și că scrii tu eseul. Primești idei, nu o temă copiată." },
      { a: "„Explică-mi pas cu pas cum rezolv o ecuație simplă, cu un exemplu.”", b: "„Scrie-mi tema la mate.”", corect: "a",
        expl: "Prima te ajută să înveți. A doua doar îți face tema, iar la test tot tu trebuie să știi." }
    ],
    bine: "✓ Corect.", gresit: "✗ Mai încearcă.",
    model: {
      titlu: "Întrebarea mea pentru IA",
      parti: [
        { id: "cine", inceput: "Sunt", t: "Sunt… (cine ești)", ajutor: "De exemplu: „elev în clasa a X-a”." },
        { id: "ce", inceput: "Vreau", t: "Vreau… (ce vrei să afli)", ajutor: "De exemplu: „să înțeleg cum se calculează aria cercului”." },
        { id: "cum", inceput: "Te rog", t: "Te rog… (cum vrei răspunsul)", ajutor: "De exemplu: „explică-mi simplu, cu un exemplu”." }
      ],
      buton: "Văd întrebarea mea",
      gol: "Completează toate cele trei părți.",
      gata: "Întrebarea ta",
      sfat: "Copiaz-o într-un program de IA. **Apoi verifică răspunsul** în manual sau cu un profesor.",
      copiat: "Am copiat întrebarea.",
      selectat: "Întrebarea e selectată. Apasă lung pe ea și alege „Copiază”."
    },
    primaData: "Prima dată folosești un program de IA? Vezi pașii"
  }
};
