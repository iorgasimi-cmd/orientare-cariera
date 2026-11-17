/* Date: „Ideea de reținut” și „Pasul tău”, la finalul fiecărei secțiuni.
   Tehnici de învățare cu dovezi: o singură idee clară, scrisă apoi cu cuvintele omului, și un pas mic de făcut.
   Pasul poate deveni tema săptămânii, cu un buton. ideeElev / pasElev = varianta pentru elevi (fără „interviu” sau „job”).
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-17). */
window.DATE = window.DATE || {};
window.DATE.retine = {
  verificat: "neverificat",
  scriere: "2026-11-17",
  titlu: "Ideea de reținut",
  scrie: "Cu cuvintele tale: ce iei cu tine de aici?",
  scrieAjutor: "O propoziție e de ajuns.",
  pasTitlu: "Pasul tău",
  buton: "O fac tema săptămânii",
  pus: "**Gata. E tema ta pentru săptămâna asta.** O găsești în „Planul meu”.",
  ocupat: "Ai deja o temă săptămâna asta. O poți schimba din „Planul meu”.",
  /* „Caietul meu”: tot ce a scris omul, la un loc. Apar doar părțile completate. */
  caiet: {
    titlu: "Caietul meu",
    intro: "**Aici găsești, la un loc, tot ce ai scris.** Recitește din când în când: așa ții minte mai ușor.",
    gol: "Caietul e încă gol. Ce scrii în secțiuni apare aici.",
    idei: "Ideile pe care le-ai reținut",
    interese: "Ce îți place să faci",
    forte: "Momente în care ți-a ieșit bine",
    valori: "Valorile mele",
    roata: "Roata vieții profesionale",
    roataZona: "Ce vreau să fie mai bun:",
    roataCaut: "Ce o să caut:",
    meserii: "Domeniile salvate",
    povesti: "Poveștile mele pentru interviu",
    corp: "Ce vreau să fac altfel când vorbesc",
    plan: "Planul meu",
    scop: "Scopul:",
    identitate: "Ce fel de om vreau să devin:",
    tema: "Tema săptămânii:",
    copiaza: "Copiază tot caietul",
    copiazaAjutor: "Îl poți lipi în notițele telefonului, ca să-l ai și în altă parte.",
    copiat: "Am copiat caietul. Îl poți lipi unde vrei.",
    selectat: "Am selectat textul. Ține apăsat pe el și alege „Copiază”."
  },
  /* Recapitulări: omul își amintește singur ideea, apoi o verifică. Revine la ea după 1 zi, 7 zile și 30 de zile.
     Dacă nu și-a amintit, ideea revine a doua zi. Cel mult 3 idei pe zi. */
  recap: {
    zile: [1, 7, 30],
    peZi: 3,
    titlu: "Recapitulare",
    banner: "**Ai {n} de reamintit.** Durează un minut.",
    unaIdee: "o idee",
    maiMulte: "{n} idei",
    buton: "Încep recapitularea",
    intro: "**Încearcă întâi să-ți amintești singur(ă).** Apoi verifică. Așa ții minte mai bine.",
    intrebare: "Ce idee ai reținut de la „{t}”?",
    scrie: "Scrie ce îți amintești",
    scrieAjutor: "Nu e obligatoriu. Poți doar să te gândești.",
    arata: "Arată ideea",
    ideea: "Ideea",
    tu: "Ce ai scris atunci:",
    da: "Mi-am amintit",
    nu: "Nu prea",
    nuMesaj: "E în regulă. Ideea revine mâine, ca s-o fixezi.",
    gata: "**Gata pentru azi.** Revino peste câteva zile pentru următoarea recapitulare.",
    nimic: "Azi nu ai nimic de recapitulat. Revino peste câteva zile."
  },
  /* Numele secțiunilor, pentru întrebarea de recapitulare. */
  titluri: {
    interese: "Test de interese", forte: "Puncte forte", meserii: "Meserii și domenii", valori: "Valorile mele",
    stima: "Cum mă văd eu", roata: "Roata vieții profesionale", competente: "Ce iei cu tine în noul domeniu",
    cv: "CV-ul meu", scrisoare: "Scrisoarea de intenție", interviu: "Pregătirea pentru interviu",
    asertiv: "Comunicarea asertivă", corp: "Limbajul corpului", negociere: "Negocierea salariului", cerinte: "Ce cer angajatorii acum"
  },
  sectiuni: {
    interese: {
      idee: "**Interesele arată ce îți place să faci, nu cine trebuie să devii.** Folosește-le ca să explorezi.",
      pasElev: "Încearcă o activitate legată de primul tău tip de interes, o oră sau mai puțin.",
      pas: "Citește un anunț dintr-un domeniu legat de primul tău tip de interes."
    },
    forte: {
      idee: "**Punctele tale forte se văd în ce ți-a ieșit bine și te-a bucurat.**",
      pas: "Notează încă un moment din ultima lună în care ți-a ieșit bine ceva."
    },
    meserii: {
      idee: "**Nu există o singură meserie potrivită.** Ai mai multe drumuri pe care le poți încerca.",
      pas: "Vorbește zece minute cu cineva care lucrează într-un domeniu salvat de tine."
    },
    valori: {
      idee: "**Valorile te ajută să alegi.** Întreabă-te: se potrivește asta cu ce contează pentru mine?",
      pasElev: "Săptămâna asta, observă o alegere pe care o faci. Ce valoare te-a ajutat?",
      pas: "Citește un anunț și caută ce spune despre valorile tale."
    },
    stima: {
      idee: "**Felul în care te vezi se poate schimba, prin pași mici.**",
      pas: "Seara, notează un lucru care ți-a ieșit bine azi. Fă asta o săptămână."
    },
    roata: {
      idee: "**Zonele cu note mici îți arată ce să cauți la următorul loc de muncă.**",
      pas: "La următorul anunț, caută ce spune despre zona ta cu nota cea mai mică."
    },
    competente: {
      idee: "**Ce știi să faci te însoțește și în alt domeniu.** Scrie competențele, nu doar titlurile.",
      pas: "Adaugă în CV o competență care se potrivește și în noul domeniu."
    },
    cv: {
      idee: "**Un CV bun arată, cu exemple, ce știi să faci.**",
      pas: "Adaugă în CV un rezultat concret și adevărat."
    },
    scrisoare: {
      idee: "**O scrisoare bună arată, cu un exemplu, cum te potrivești pentru acest post.**",
      pas: "Scrie primul paragraf al scrisorii pentru un anunț real."
    },
    interviu: {
      idee: "**Câteva povești reale din experiența ta te ajută la multe întrebări.**",
      pas: "Exersează cu voce tare un răspuns. Apoi alege un singur lucru de îmbunătățit."
    },
    asertiv: {
      idee: "**Spui clar ce gândești și ce îți dorești, cu respect pentru tine și pentru ceilalți.**",
      pas: "Săptămâna asta, spune o dată ce îți dorești, cu modelul: Când… Mă simt… Pentru că… Propun…"
    },
    corp: {
      idee: "**Privirea, mișcările capului și hainele îngrijite contează.** Le poți exersa.",
      pas: "Peste câteva zile, filmează-te din nou și vezi ce s-a schimbat."
    },
    negociere: {
      idee: "**Lucrezi cu un interval realist, nu cu un singur număr.**",
      pas: "Completează fișa: minimul tău, ce ți-ai dori și trei argumente."
    },
    cerinte: {
      idee: "**Ce caută angajatorii se poate exersa, pas cu pas.**",
      pasElev: "Alege o calitate din listă și exerseaz-o o dată, la școală sau acasă.",
      pas: "Alege o calitate din listă și exerseaz-o o dată săptămâna asta."
    }
  }
};
