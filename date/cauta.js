/* Date: „Cum găsești informații sigure” — omul învață să caute singur pe site-uri oficiale și să ceară unei IA o explicație simplă.
   Simona a aprobat (2026-11-18) ca DOAR în această secțiune să apară nume și adrese de site-uri oficiale.
   Pentru autoare: „citirea laterală” (Wineburg și McGrew, Stanford); mesajele „încă” (cercetările despre mentalitatea de creștere,
   de exemplu Yeager și colegii, 2019). Concediul minim: 20 de zile lucrătoare pe an (Codul muncii). Adresele se verifică pe telefon înainte de lansare. */
window.DATE = window.DATE || {};
window.DATE.cauta = {
  verificat: "aprobat de Simona",
  scriere: "2026-11-18",
  titlu: "Cum găsești informații sigure",
  faro: "**Nu știi încă? E în regulă.** Hai să aflăm împreună.",
  faro45: "**Nu știți încă? E în regulă.** Hai să aflăm împreună.",
  intro: [
    "**Să cauți informații e o abilitate.** Se învață, ca mersul pe bicicletă.",
    "Și oamenii care lucrează cu legi caută zilnic informații. **Să cauți e normal, nu e un semn că nu știi.**"
  ],
  meniu: [
    { id: "pasi", t: "Metoda în 5 pași", d: "Cum cauți, ca să găsești ceva sigur." },
    { id: "siteuri", t: "Site-uri oficiale utile", d: "Unde cauți legi, cursuri, locuri de muncă." },
    { id: "ia", t: "Nu înțelegi? Cere o explicație simplă", d: "Un mesaj gata scris pentru un program de IA." },
    { id: "misiune", t: "Misiunea ta", d: "Caută singur(ă) o informație adevărată." }
  ],
  pasi: [
    { t: "1. Spune clar ce cauți.", d: "De exemplu: „Câte zile de concediu am?”" },
    { t: "2. Caută pe un site oficial.", d: "Le recunoști după final: **.gov.ro** (instituții ale statului), **.edu.ro** (educație), **europa.eu** (Uniunea Europeană)." },
    { t: "3. Verifică cine a scris și când.", d: "Deschide și alte pagini despre același lucru. Vezi dacă spun la fel. **Așa verifică și oamenii care se pricep.**" },
    { t: "4. Nu înțelegi? Cere ajutor unei IA.", d: "Copiezi bucata grea și ceri o explicație simplă. Îți dăm mesajul gata scris." },
    { t: "5. Verifică ce ți-a spus IA.", d: "**IA poate greși.** Compar-o cu textul oficial. Apoi notează ce ai aflat în caiet." }
  ],
  siteuri: [
    { t: "Legi (orice lege, la zi)", a: "legislatie.just.ro" },
    { t: "Locuri de muncă și cursuri gratuite de la stat", a: "anofm.ro", adult: true },
    { t: "Drepturile tale la muncă, plângeri", a: "inspectiamuncii.ro", adult: true },
    { t: "Admiterea la liceu", a: "admitere.edu.ro", elev: true },
    { t: "Bacalaureat", a: "bacalaureat.edu.ro", elev: true },
    { t: "Educație, școli, programe", a: "edu.ro" },
    { t: "Calificări și cursuri recunoscute", a: "anc.edu.ro" },
    { t: "Datele tale personale, plângeri", a: "dataprotection.ro" },
    { t: "CV în format european", a: "europass.europa.eu" },
    { t: "Locuri de muncă în Uniunea Europeană", a: "eures.europa.eu", adult: true },
    { t: "Drepturile tale în orice țară din Uniunea Europeană", a: "europa.eu/youreurope" }
  ],
  siteuriNota: "Scrie adresa în browser, exact așa. Așa ești sigur(ă) că ajungi pe site-ul adevărat.",
  ia: {
    explica: "Ai găsit un text oficial, dar e greu? **Copiază bucata pe care nu o înțelegi.** Lipește-o într-un program de IA, după mesajul de mai jos.",
    prompt: "Explică-mi foarte simplu, ca pentru un copil de 12 ani, textul de mai jos. Spune-mi ce înseamnă pentru mine și ce trebuie să fac. Dacă nu ești sigur de ceva, spune-mi.\n\nTextul:\n[lipește aici textul]",
    copiat: "Am copiat mesajul. Acum lipește-l în chat, apoi adaugă textul.",
    selectat: "Am selectat mesajul. Ține apăsat pe el și alege „Copiază”."
  },
  misiune: {
    adult: {
      q: "Află câte zile de concediu pe an îți dă legea, cel puțin.",
      indiciu: "Indiciu: caută pe **legislatie.just.ro** „Codul muncii”. Sau pe **inspectiamuncii.ro**.",
      raspuns: "**Cel puțin 20 de zile lucrătoare pe an.** Scrie în Codul muncii. L-ai găsit?",
      raspuns45: "**Cel puțin 20 de zile lucrătoare pe an.** Scrie în Codul muncii. L-ați găsit?"
    },
    elev: {
      q: "Găsește calendarul admiterii la liceu de anul acesta.",
      indiciu: "Indiciu: caută pe **admitere.edu.ro**.",
      raspuns: "**Bravo!** Calendarul arată fiecare etapă, cu data ei. Notează în caiet o dată importantă pentru tine."
    },
    gasit: "Ce ai găsit?",
    unde: "Pe ce site?",
    buton: "Am găsit",
    verific: "Verific răspunsul"
  }
};
