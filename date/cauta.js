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
    { id: "pacaleli", t: "Cum verifici dacă un site e o păcăleală", d: "Semnele unui site fals și ce faci dacă ai dat date." },
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
  /* Site-uri false. Pentru autoare: lacătul (HTTPS) nu garantează că un site e sigur; sfatul „scrie singur adresa”
     vine de la bănci și de la Directoratul Național de Securitate Cibernetică (DNSC). 1911 și mfinante.gov.ro: de verificat pe telefon. */
  pacaleli: {
    intro: "**Unele site-uri arată ca cele adevărate, dar sunt false.** Vor bani sau datele tale. Cu câțiva pași le recunoști.",
    parti: [
      { t: "1. Uită-te atent la adresă.", r: [
        "Păcălelile schimbă o literă sau adaugă cuvinte. De exemplu: **anofm-ro.com** în loc de **anofm.ro**.",
        "**Cel mai sigur:** scrie tu adresa, nu apăsa pe linkuri primite prin SMS, e-mail sau WhatsApp."] },
      { t: "2. Lacătul nu înseamnă „sigur”.", r: [
        "Lacătul de lângă adresă arată doar că legătura e protejată. **Și site-urile false pot avea lacăt.**"] },
      { t: "3. Semne de păcăleală", r: [
        "✗ îți cere bani ca să te angajeze sau ca să te înscrie;",
        "✗ îți cere parola, codul cardului sau CNP-ul de la început;",
        "✗ te grăbește: „doar azi”, „ultimele locuri”;",
        "✗ îți promite bani mulți, ușor și repede;",
        "✗ are multe greșeli de scriere;",
        "✗ nu are o adresă reală sau un telefon de contact."] },
      { t: "4. Verifică firma.", r: [
        "Orice firmă din România are un **cod fiscal (CUI)**. Caută-l pe **mfinante.gov.ro**, ca să vezi dacă firma există.",
        "Caută pe internet numele site-ului și cuvântul „**păreri**”. Vezi ce spun alții."] },
      { t: "5. Ai dat deja date sau bani?", r: [
        "**Sună imediat la bancă**, la numărul de pe spatele cardului.",
        "Poți raporta păcăleala la **1911**, numărul de telefon pentru probleme de securitate pe internet.",
        { elev: "**Nu ești sigur(ă)? Întreabă un adult de încredere, înainte să scrii ceva.**" }] }
    ]
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
