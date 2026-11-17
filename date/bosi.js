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
  }
};
