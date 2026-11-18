/* Date: Faro, farul prietenos (numit întâi „Bosi”, apoi „JobPsi”; ales „Faro” de Simona, 2026-11-17, pentru sentimentul de siguranță) care îl însoțește pe om prin aplicație.
   Bosi e un personaj scris dinainte, nu o inteligență artificială: spune doar textele de aici.
   Fără presiune și fără vinovăție: când omul lipsește, Bosi îi păstrează locul. Bosi nu știe numele omului.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-17). */
window.DATE = window.DATE || {};
window.DATE.bosi = {
  verificat: "neverificat",
  scriere: "2026-11-17",
  nume: "Faro",
  start: "Bună! Sunt Faro. **Îți luminez drumul, ca să nu fii singur(ă) pe el.**",
  bunVenit: "Mă bucur că ești aici! **Mergem împreună, în ritmul tău.**",
  final: "Bravo! **Ai ajuns la finalul secțiunii.**",
  aici: "Ești aici",
  /* „Cum te simți azi?” — o dată pe zi, pe ecranul principal. Texte aprobate de Simona (2026-11-17).
     Răspunsul rămâne doar pe telefon și nu apare în caiet. Aplicația nu trage concluzii din el. */
  stare: {
    intrebare: "Bună! **Cum te simți azi?**",
    revenit: "Mă bucur să te revăd! **Cum te simți azi?**",
    optiuni: [["bine", "Bine"], ["asa", "Așa și așa"], ["nu", "Nu prea bine"]],
    bine: "Mă bucur! **Hai să facem următorul pas: {pas}.**",
    bineTot: "Mă bucur! **Ai parcurs tot drumul.** Poți recapitula sau poți răsfoi caietul.",
    butonBine: "Merg la pasul următor",
    asa: "Te înțeleg. **Azi poate fi o zi de pași mici.** Fă doar varianta de 2 minute a temei tale. Sau recitește ce ai scris în caiet.",
    butonMini: "Varianta de 2 minute",
    butonCaiet: "Caietul meu",
    nu: "Îmi pare rău că azi nu te simți bine. **E în regulă să iei o pauză.** Respiră încet: inspiră cât numeri până la 4, expiră cât numeri până la 6.",
    ajutor: "Dacă te simți rău sau ești îngrijorat(ă), vorbește cu un adult de încredere, cu consilierul școlii sau cu medicul de familie. Dacă tu sau altcineva sunteți în pericol acum, sună la 112.",
    maine: "Mâine te întreb din nou.",
    schimb: "Schimb răspunsul"
  },

  /* „Faro își amintește ce i-ai spus”: reflectă cuvintele omului, apreciază efortul, întreabă deschis, lasă alegerea omului.
     Trei variante: elev (sub 18), adult (18–44), a45 (45+, cu „dumneavoastră”). Texte aprobate de Simona (2026-11-17). */
  memorie: {
    elev: {
      intrebare: "Hei! Mi-am amintit ce mi-ai zis data trecută: „{tema}”. **Cum a mers?**",
      optiuni: [["reusit", "Am reușit"], ["parte", "Am făcut o parte"], ["nu", "N-am apucat"]],
      reusit: "**Super, ai reușit!** Ce te-a ajutat?",
      parte: "**Ai început, și asta contează!** Ce parte vrei să termini?",
      nu: "**Nicio problemă! Mă bucur că ai revenit.** Vrei să alegi ceva mai mic? Tu decizi.",
      ajutat: "Ce te-a ajutat?",
      valoare: "Mi-ai zis că „{v}” contează mult pentru tine. Țin minte asta.",
      identitate: "Mi-ai scris că vrei să fii „{i}”. **Azi ai mai făcut un pas spre asta.**",
      rezumat: "Uite cât ai făcut deja: **{lista}.** **Sunt aici și pentru următorii pași!**"
    },
    adult: {
      intrebare: "Mi-am amintit ce mi-ai spus data trecută. Ți-ai propus: „{tema}”. **Cum a mers?**",
      optiuni: [["reusit", "Am reușit"], ["parte", "Am făcut o parte"], ["nu", "N-am apucat"]],
      reusit: "**Ce frumos! Ai făcut exact ce ți-ai propus.** Ce te-a ajutat cel mai mult?",
      parte: "**Ai început, și asta contează mult.** Fiecare bucată făcută rămâne a ta. Ce parte vrei să continui?",
      nu: "**Se întâmplă, și e în regulă. Mă bucur că ești aici.** Ce ar face pasul mai ușor săptămâna asta? Tu alegi.",
      ajutat: "Ce te-a ajutat cel mai mult?",
      valoare: "Mi-ai spus că pentru tine contează mult „{v}”. Mă gândesc la asta când îți propun pașii.",
      identitate: "Mi-ai scris că vrei să fii „{i}”. **Azi ai mai făcut un pas spre asta.**",
      rezumat: "Uite ce am parcurs împreună: **{lista}.** **Sunt aici și pentru pașii următori.**"
    },
    a45: {
      intrebare: "Mă bucur să vă reîntâlnesc pe drum. Data trecută v-ați propus: „{tema}”. **Cum a mers?**",
      optiuni: [["reusit", "Am reușit"], ["parte", "Am făcut o parte"], ["nu", "N-am apucat"]],
      reusit: "**Felicitări! Ați dus la capăt ce v-ați propus.** Ce v-a ajutat? Poate folosește și data viitoare.",
      parte: "**Ați făcut deja o parte, și asta contează.** Experiența dumneavoastră vă ajută să continuați. Ce parte vreți să duceți mai departe?",
      nu: "**Se întâmplă oricui, și e în regulă. Mă bucur că ați revenit.** Ce ar face pasul mai ușor? Alegeți în ritmul dumneavoastră.",
      ajutat: "Ce v-a ajutat?",
      valoare: "Mi-ați spus că pentru dumneavoastră contează „{v}”. O am în minte la fiecare pas.",
      identitate: "Mi-ați scris că vreți să fiți „{i}”. **Azi ați mai făcut un pas spre asta.**",
      rezumat: "Iată drumul parcurs până acum: **{lista}.** **Vă însoțesc și mai departe.**"
    }
  },

  /* Momentele importante: Faro le sărbătorește o singură dată; rămân în „Caietul meu”, la „Momentele mele”.
     Laudă efortul și felul în care omul a lucrat, nu „cât de deștept” e. Texte aprobate de Simona (2026-11-17). */
  momente: [
    { id: "sectiune1",
      elev: "**Prima secțiune e gata!** Ai început drumul. Primul pas e cel mai important.",
      adult: "**Ai terminat prima secțiune!** Primul pas e mereu cel mai important, și l-ai făcut.",
      a45: "**Ați terminat prima secțiune!** Ați făcut primul pas, iar el contează cel mai mult." },
    { id: "tema1",
      elev: "**Prima ta temă e făcută!** Ți-ai ținut promisiunea față de tine.",
      adult: "**Prima temă reușită!** Ai făcut ce ți-ai propus. Așa se construiește încrederea în tine.",
      a45: "**Prima temă dusă la capăt!** V-ați ținut de cuvânt față de dumneavoastră." },
    { id: "zile3",
      elev: "**3 zile la rând!** Asta înseamnă că nu renunți ușor.",
      adult: "**3 zile la rând!** Așa începe un obicei.",
      a45: "**3 zile la rând!** Constanța dumneavoastră face diferența." },
    { id: "zile7",
      elev: "**7 zile de lucru!** Pas cu pas, ai făcut deja o săptămână întreagă.",
      adult: "**7 zile de lucru!** Fiecare zi s-a adunat. Uite cât ai construit.",
      a45: "**7 zile de lucru!** Fiecare zi s-a adunat. Ați construit deja mult." },
    { id: "lectie1",
      elev: "**Prima lecție terminată!** Ai învățat ceva nou azi.",
      adult: "**Prima lecție terminată!** Ai învățat ceva util azi.",
      a45: "**Prima lecție terminată!** Ați învățat ceva util azi." },
    { id: "jumatate",
      elev: "**Ai ajuns la jumătatea drumului!** Uită-te în urmă: ai făcut deja multe.",
      adult: "**Ești la jumătatea drumului!** Uită-te cât ai parcurs deja.",
      a45: "**Sunteți la jumătatea drumului!** Priviți cât ați parcurs deja." }
  ],

  /* Pentru 45+: doar Faro vorbește cu „dumneavoastră”. Restul aplicației rămâne cu „tu” pentru toate vârstele (decizia Simonei, 2026-11-17). */
  dvs: {
    bunVenit: "Mă bucur că sunteți aici! **Mergem împreună, în ritmul dumneavoastră.**",
    final: "Bravo! **Ați ajuns la finalul secțiunii.**",
    stare: {
      intrebare: "Bună ziua! **Cum vă simțiți azi?**",
      revenit: "Mă bucur să vă revăd! **Cum vă simțiți azi?**",
      bine: "Mă bucur! **Să facem următorul pas: {pas}.**",
      bineTot: "Mă bucur! **Ați parcurs tot drumul.** Puteți recapitula sau puteți răsfoi caietul.",
      asa: "Vă înțeleg. **Azi poate fi o zi de pași mici.** Faceți doar varianta de 2 minute a temei. Sau recitiți ce ați scris în caiet.",
      nu: "Îmi pare rău că azi nu vă simțiți bine. **E în regulă să luați o pauză.** Respirați încet: inspirați cât numărați până la 4, expirați cât numărați până la 6.",
      ajutor: "Dacă vă simțiți rău sau sunteți îngrijorat(ă), vorbiți cu un adult de încredere, cu consilierul școlii sau cu medicul de familie. Dacă dumneavoastră sau altcineva sunteți în pericol acum, sunați la 112.",
      maine: "Mâine vă întreb din nou."
    }
  }
};
