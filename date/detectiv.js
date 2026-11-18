/* Date: „Detectivul de 5 secunde” — o întrebare pe zi, după „Cum te simți azi? → Bine”. Răspunsul apare imediat
   (ghicirea urmată imediat de răspuns ajută memoria: Kornell, Hays și Bjork, 2009; Richland, Kornell și Kao, 2009).
   Întrebările se amestecă: adrese, păcăleli, unde cauți. Texte aprobate de Simona (2026-11-18).
   q45 / bine45 / gresit45 = varianta cu „dumneavoastră” pentru 45+. */
window.DATE = window.DATE || {};
window.DATE.detectiv = {
  titlu: "Joc rapid!",
  sari: "Altă dată",
  aproape: "**Aproape!**",
  intrebari: [
    { id: "d1", q: "Care adresă e adevărată?",
      optAdult: [{ t: "anofm.ro", ok: true }, { t: "anofm-ro.com" }], optElev: [{ t: "admitere.edu.ro", ok: true }, { t: "admitere-edu.com" }],
      bine: "**Bravo, detectiv!** Site-ul fals are o mică diferență în adresă.", bine45: "**Bravo, detectiv!** Ați observat diferența.",
      exp: "Site-ul fals are o mică diferență în adresă." },
    { id: "d2", q: "Un mesaj spune: „Ai primit jobul! Plătește 100 de lei taxa de înscriere.” E sigur?",
      opt: [{ t: "Da" }, { t: "Nu, e o păcăleală", ok: true }],
      bine: "**Exact!** Nimeni serios nu-ți cere bani ca să te angajeze.", bine45: "**Exact!** Nimeni serios nu vă cere bani ca să vă angajeze.",
      exp: "Nimeni serios nu-ți cere bani ca să te angajeze.", exp45: "Nimeni serios nu vă cere bani ca să vă angajeze." },
    { id: "d3", q: "Site-ul are lacăt lângă adresă. Înseamnă că e sigur?",
      opt: [{ t: "Da" }, { t: "Nu neapărat", ok: true }],
      bine: "**Exact!** Și site-urile false pot avea lacăt.", exp: "Și site-urile false pot avea lacăt." },
    { id: "d4", q: "Unde cauți o lege?", q45: "Unde căutați o lege?",
      opt: [{ t: "legislatie.just.ro", ok: true }, { t: "Într-un grup de pe Facebook" }],
      bine: "**Bravo!** Legile, la zi, sunt pe site-ul oficial.", exp: "Legile, la zi, sunt pe site-ul oficial." },
    { id: "d5", q: "Primești un SMS de la „banca ta”, cu o adresă de internet. Ce faci?", q45: "Primiți un SMS de la „banca dumneavoastră”, cu o adresă de internet. Ce faceți?",
      opt: [{ t: "Apăs pe adresă" }, { t: "Sun la bancă sau scriu eu adresa", ok: true }],
      bine: "**Foarte bine!** Mesajul poate fi o capcană.", exp: "Mesajul poate fi o capcană." },
    { id: "d6", q: "Care adresă arată ca un site al statului?",
      opt: [{ t: "exemplu.gov.ro", ok: true }, { t: "exemplu-gov.com" }],
      bine: "**Exact!** Site-urile statului se termină în **.gov.ro**.", exp: "Site-urile statului se termină în **.gov.ro**." },
    { id: "d7", q: "O IA ți-a explicat o lege. Ce faci apoi?", q45: "O IA v-a explicat o lege. Ce faceți apoi?",
      opt: [{ t: "O cred pe cuvânt" }, { t: "Verific cu textul oficial", ok: true }],
      bine: "**Bravo!** IA poate greși. Textul oficial are ultimul cuvânt.", exp: "IA poate greși. Textul oficial are ultimul cuvânt." },
    { id: "d8", q: "„Doar azi! Ultimele 2 locuri!” Ce poate fi?",
      opt: [{ t: "O ofertă bună" }, { t: "Un semn de grabă, poate fi păcăleală", ok: true }],
      bine: "**Exact!** Cine te grăbește nu vrea să te lase să verifici.", bine45: "**Exact!** Cine vă grăbește nu vrea să vă lase să verificați.",
      exp: "Cine te grăbește nu vrea să te lase să verifici.", exp45: "Cine vă grăbește nu vrea să vă lase să verificați." },
    { id: "d9", q: "Un site îți cere parola de la e-mail ca să-ți trimită un curs. E normal?", q45: "Un site vă cere parola de la e-mail ca să vă trimită un curs. E normal?",
      opt: [{ t: "Da" }, { t: "Nu", ok: true }],
      bine: "**Foarte bine!** Parola nu o dai nimănui.", bine45: "**Foarte bine!** Parola nu o dați nimănui.",
      exp: "Parola nu o dai nimănui.", exp45: "Parola nu o dați nimănui." },
    { id: "d10", q: "Cum îți dai seama că o informație e adevărată?", q45: "Cum vă dați seama că o informație e adevărată?",
      opt: [{ t: "O cred dacă are multe aprecieri" }, { t: "Verific dacă și alte site-uri sigure spun la fel", ok: true }],
      bine: "**Exact!** Aprecierile nu arată că ceva e adevărat.", exp: "Aprecierile nu arată că ceva e adevărat." },
    { id: "d11", qAdult: "Unde cauți cursuri gratuite de la stat?", q45: "Unde căutați cursuri gratuite de la stat?", qElev: "Unde găsești datele bacalaureatului?",
      optAdult: [{ t: "anofm.ro", ok: true }, { t: "Un mesaj de la un necunoscut" }], optElev: [{ t: "bacalaureat.edu.ro", ok: true }, { t: "Un clip de pe internet" }],
      bine: "**Bravo!** Site-ul oficial are informația sigură.", exp: "Site-ul oficial are informația sigură." },
    { id: "d12", q: "Ce înseamnă „prea frumos ca să fie adevărat”?",
      opt: [{ t: "Că am noroc" }, { t: "Că probabil e o păcăleală", ok: true }],
      bine: "**Exact!** Asta e regula de aur.", exp: "Asta e regula de aur." }
  ]
};
