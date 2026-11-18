/* Date: „Datele tale: ce spui și ce nu spui” — sfaturi simple despre datele personale, pentru angajare, voluntariat și cursuri.
   Texte aprobate de Simona (2026-11-18). Pentru autoare, de unde vin (nu apar în aplicație):
   Codul muncii: contract scris, în română, înainte de începerea lucrului, redactat de angajator (art. 16 alin. 1); informarea și
   elementele din contract (art. 17); perioada de probă de cel mult 30 / 90 de zile, cu toate drepturile (art. 31); interzicerea testelor
   de graviditate la angajare (art. 27); angajatorul cere doar ce îi trebuie ca să vadă dacă poți face munca (art. 29); capacitatea de muncă
   la 16 ani, la 15 ani cu acordul părinților (art. 13). Legea voluntariatului 78/2014: contract scris cu datele de identificare (art. 11),
   exemplar înainte de început (art. 11), dreptul la confidențialitate și protecția datelor (art. 12), certificat de voluntariat (art. 10).
   GDPR: dreptul de acces, dreptul la ștergere (cu excepții), dreptul de a face plângere la autoritatea pentru protecția datelor. */
window.DATE = window.DATE || {};
window.DATE.datele = {
  verificat: "aprobat de Simona",
  scriere: "2026-11-18",
  titlu: "Datele tale: ce spui și ce nu spui",
  buton: "Datele tale: ce spui și ce nu spui",
  intro: "Datele tale sunt lucruri despre tine: numele, telefonul, adresa, CNP-ul. **Ele sunt ale tale.** Le dai doar când e nevoie.",
  parti: [
    { id: "cv", t: "1. Când trimiți CV-ul", r: [
      "✓ Scrie doar: **numele, telefonul, e-mailul și orașul.** Atât.",
      "✗ Nu scrie: CNP-ul, adresa exactă, dacă ești căsătorit(ă), religia, copiii, bolile."] },
    { id: "angajare", doarAdult: true, t: "2. Când primești locul de muncă", r: [
      "Firma îți poate cere buletinul și CNP-ul, pentru contract. **E normal.**",
      "**Contractul se face în scris, în limba română, înainte să începi lucrul.** Firma e cea care trebuie să-l scrie.",
      "**Nu începe să lucrezi fără contract.** Dacă ți se spune să începi fără el, întreabă de contract.",
      "**Înainte să semnezi, firma trebuie să-ți spună ce e important:**",
      { lista: ["ce post ai;", "cât câștigi;", "unde lucrezi;", "câte zile de concediu ai;", "ce riscuri are munca."] },
      "Toate acestea trebuie să fie scrise și în contract.",
      "**Perioada de probă** e o perioadă la început, în care tu și firma vedeți dacă vă potriviți.",
      "Ține **cel mult 30 de zile**. Dacă vei conduce alți oameni, poate ține **cel mult 90 de zile**.",
      "**Și în perioada de probă ai aceleași drepturi** ca ceilalți angajați.",
      "**Nimeni nu are voie să-ți ceară un test de sarcină** ca să te angajeze."] },
    { id: "angajareElev", doarElev: true, t: "2. Primul tău loc de muncă", r: [
      "Poți lucra cu contract de la 16 ani. La 15 ani, ai nevoie de acordul părinților.",
      "**Cere contract scris înainte să începi.** Fără contract, nu ești protejat(ă)."] },
    { id: "voluntariat", t: "3. La voluntariat sau la un curs", r: [
      "La voluntariat semnezi un **contract scris**. În el se trec **datele tale din buletin**. E normal.",
      "Primești și tu un exemplar, **înainte să începi**.",
      "**Legea îți dă dreptul ca datele tale să fie păstrate în siguranță.**",
      "La final, cere **certificatul de voluntariat**. Îl poți pune în CV, ca dovadă de experiență.",
      { elev: "**Poți face voluntariat cu contract de la 15 ani.** La 15 ani ai nevoie de acordul părinților." },
      "**La un curs:** pentru o diplomă, ți se pot cere datele din buletin. Poți întreba: „**De ce aveți nevoie de ele și unde le țineți?**”"] },
    { id: "niciodata", t: "4. Ce nu dai niciodată", r: [
      "✗ Parola. ✗ Codul cardului. ✗ Bani ca să primești un loc de muncă.",
      "✗ Poza buletinului, trimisă unor oameni pe care nu-i cunoști."] },
    { id: "pacaleli", t: "5. Atenție la păcăleli", r: [
      "Cineva îți cere bani ca să te angajeze? **E o păcăleală.**",
      "Cineva îți promite bani mulți, ușor și repede? **E o păcăleală.**",
      "Cineva te grăbește să răspunzi? **Oprește-te și întreabă un om de încredere.**"] },
    { id: "drepturi", t: "6. Ai dreptul să întrebi", r: [
      "Poți întreba o firmă: „**Ce date ale mele aveți?**”",
      "Poți cere: „**Vă rog să ștergeți datele mele.**”",
      "Unele acte, de exemplu contractul, firma trebuie să le păstreze prin lege.",
      "Nu-ți răspund? Poți face o plângere la **instituția statului care apără datele oamenilor**."] }
  ]
};
