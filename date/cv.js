/* Date: corectorul de CV (subagentul 8). Toate textele pe care le vede omul sunt aici, ca să poată fi schimbate ușor.
   Regulile vin din curs: cap. 6.1 (structura unui CV, greșeli grave, sistemele automate de selecție) și anexele 4 și 5
   (modelele „Așa da” și „Așa nu”), plus cap. 8.4 pentru sfaturile pe situații.
   NU folosim cifra despre câte firme folosesc sisteme automate: nu are o sursă verificată.
   Cursul nu dă o limită de pagini, deci aplicația nu judecă lungimea totală, ci doar spune câte cuvinte are textul.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-14). */
window.DATE = window.DATE || {};
window.DATE.cv = {
  verificat: "neverificat",
  scriere: "2026-11-14",

  intro: [
    "Lipește aici textul CV-ului tău. Îl verific după câteva reguli simple: datele de contact, structura, cum descrii ce ai făcut și ce informații nu sunt necesare.",
    "Nu e nevoie să lipești CNP-ul sau adresa exactă. Dacă apar în CV, îți spun."
  ],
  pastreaza: "Păstrez textul pe acest telefon, ca să nu-l lipesc din nou",
  nesalvat: "Textul nu se salvează dacă nu bifezi mai sus.",
  gol: "Lipește mai întâi textul CV-ului în căsuța de mai sus.",
  pierdut: "Textul CV-ului nu mai este aici, pentru că nu l-ai păstrat pe telefon. Lipește-l din nou.",

  /* ATS explicat simplu (cap. 6.1). */
  ats: "Unele firme folosesc un program care citește CV-urile înainte să le vadă un om. Se numește ATS. Programul caută în CV cuvinte din anunț și poate citi greșit tabelele, coloanele, imaginile sau ce e scris în antet.",

  /* Întrebări cu răspuns, câte una pe ecran, despre ce nu se vede în textul lipit. */
  intrebari: [
    { id: "tabele", q: "Ai în CV tabele sau text așezat pe mai multe coloane?",
      optiuni: [["da", "Da"], ["nu", "Nu"], ["nustiu", "Nu știu"]],
      da: { p: 2, t: "Tabelele și coloanele pot fi citite greșit de programele ATS. Pune textul pe o singură coloană, de sus în jos." },
      nu: { bine: "Textul e pe o singură coloană, așa cum îl citesc cel mai ușor programele ATS." } },
    { id: "antet", q: "Ai pus datele de contact în antet sau în subsol (partea de sus sau de jos a paginii, care se repetă pe fiecare pagină)?",
      optiuni: [["da", "Da"], ["nu", "Nu"], ["nustiu", "Nu știu"]],
      da: { p: 1, t: "Multe programe ATS nu citesc antetul și subsolul. Mută numele, telefonul și e-mailul în corpul paginii." },
      nu: { bine: "Datele de contact sunt în corpul paginii, unde le găsesc și programele ATS." },
      nustiu: { p: 3, t: "Verifică unde sunt datele de contact: dacă stau în antet sau în subsol, mută-le în corpul paginii." } },
    { id: "grafice", q: "Ai în CV grafice, pictograme sau imagini (de exemplu bare care arată nivelul la o competență)?",
      optiuni: [["da", "Da"], ["nu", "Nu"], ["nustiu", "Nu știu"]],
      da: { p: 2, t: "Programele ATS nu pot citi ce e scris în grafice și imagini. Scrie aceeași informație ca text." } },
    { id: "font", q: "Folosești un font obișnuit, ca Arial, Calibri sau Roboto?",
      optiuni: [["da", "Da"], ["nu", "Nu"], ["nustiu", "Nu știu"]],
      da: { bine: "Folosești un font obișnuit, care se citește sigur." },
      nu: { p: 3, t: "Alege un font obișnuit (Arial, Calibri sau Roboto). Se citește mai sigur, și de oameni, și de programe." },
      nustiu: { p: 4, t: "Fontul îl vezi în programul în care ai scris CV-ul. Cele mai sigure sunt Arial, Calibri sau Roboto." } },
    { id: "format", q: "În ce format trimiți CV-ul?",
      optiuni: [["docx", "Word (.docx)"], ["pdf", "PDF în care pot selecta textul"], ["scan", "PDF scanat sau poză"], ["nustiu", "Nu știu"]],
      docx: { bine: "Trimiți CV-ul ca Word (.docx), un format pe care programele îl citesc bine." },
      pdf: { bine: "Trimiți CV-ul ca PDF cu text care se poate selecta. Se citește bine." },
      scan: { p: 1, t: "Un CV scanat sau pus ca poză nu poate fi citit de programele ATS. Salvează-l ca Word (.docx) sau ca PDF în care textul se poate selecta." },
      nustiu: { p: 3, t: "Deschide fișierul CV-ului și încearcă să selectezi un cuvânt. Dacă se poate, e bine. Dacă nu, salvează-l ca Word (.docx) sau ca PDF cu text." } }
  ],

  /* Mesajele verificării textului. p = importanța (1 = cel mai important). */
  mesaje: {
    email_ok: "Ai pus o adresă de e-mail.",
    email_lipsa: { p: 1, t: "Nu găsesc o adresă de e-mail. Pune una sus, lângă nume." },
    email_neprof: { p: 2, t: "Adresa de e-mail pare neprofesională (de exemplu are o poreclă). Folosește o adresă care conține numele tău." },
    telefon_ok: "Ai pus un număr de telefon.",
    telefon_lipsa: { p: 1, t: "Nu găsesc un număr de telefon. Pune-l sus, lângă e-mail." },
    cnp: { p: 1, t: "Am găsit un număr care pare a fi un CNP. Scoate-l din CV: nu e nevoie de el." },
    personale: { p: 2, t: "Am găsit informații care nu sunt necesare într-un CV: {lista}. Poți să le scoți." },
    retele: { p: 3, t: "Ai linkuri spre Instagram, TikTok sau Facebook. Lasă doar ce e profesional, de exemplu profilul de LinkedIn." },
    sectiuni_ok: "CV-ul are secțiunile de bază: {lista}.",
    lipsa_experienta: { p: 1, t: "Nu găsesc secțiunea „Experiență profesională”. Este cea mai importantă parte a CV-ului." },
    lipsa_educatie: { p: 2, t: "Nu găsesc secțiunea „Educație”. Scrie studiile, începând cu cele mai recente." },
    lipsa_competente: { p: 2, t: "Nu găsesc secțiunea „Competențe”. Scrie ce știi să faci: programe, limbi străine și calități, fiecare cu un exemplu." },
    lipsa_rezumat: { p: 3, t: "Poți pune sus un rezumat scurt, de 2–3 fraze: cine ești, ce experiență ai și ce aduci." },
    rezumat_lung: { p: 3, t: "Rezumatul are {n} fraze. E mai ușor de citit dacă are 2–3." },
    obiectiv_vag: { p: 2, t: "Obiectivul e prea general (de exemplu „să îmi găsesc un job”). Spune ce post cauți și ce aduci." },
    verbe_ok: "Descrii ce ai făcut cu verbe de acțiune.",
    verbe_putine: { p: 2, t: "Descrie ce ai făcut cu verbe de acțiune, de exemplu „am coordonat”, „am organizat”, „am redus”, nu doar „am lucrat”." },
    rezultate_ok: "Ai rezultate concrete, cu cifre.",
    rezultate_lipsa: { p: 2, t: "Nu găsesc rezultate concrete. Unde se poate, adaugă un număr: câți clienți, câte proiecte, cât timp ai economisit. Doar cifre adevărate." },
    vag: { p: 2, t: "Am găsit formulări vagi: {lista}. Spune concret ce ai făcut." },
    blocuri: { p: 2, t: "Ai paragrafe lungi, greu de citit. Împarte-le în puncte scurte, câte un lucru pe rând." },
    puncte_ok: "Folosești puncte scurte, care se citesc ușor.",
    ordine: { p: 3, t: "În secțiunea „{sectiune}” anii par puși de la cel mai vechi la cel mai nou. Pune mai întâi ce e mai recent." },
    limbi_nivel: { p: 3, t: "La limbi străine, scrie și nivelul, de exemplu „engleză – B2 (avansat)”." },
    diacritice: { p: 3, t: "Textul nu are diacritice (ă, â, î, ș, ț). Adaugă-le, ca CV-ul să arate îngrijit." },
    acronime: { p: 4, t: "Ai prescurtări ca {lista}. Dacă există o formă întreagă, scrie-o o dată și pe ea, de exemplu „SEO (Search Engine Optimization)”. Așa te găsesc și programele care caută după cuvinte." },
    scurt: { p: 1, t: "Textul pare foarte scurt. Verifică dacă ai lipit tot CV-ul." },
    nimic_bine: "Ai făcut primul pas: ți-ai verificat CV-ul.",
    nimic_de_schimbat: "Nu am găsit nimic important de schimbat după aceste reguli.",
    cuvinte: "CV-ul are aproximativ {n} cuvinte.",
    nu_pot: "Nu pot verifica gramatica și nici dacă tot ce scrie este adevărat. Roagă pe cineva de încredere să citească CV-ul: greșelile de scriere contează mult."
  },

  /* Sfaturi pe situații (cap. 6.1 și 8.4). */
  situatii: {
    caut: "Potrivește CV-ul pentru fiecare anunț: citește anunțul, alege 5–6 cuvinte importante din el și verifică dacă apar la fel și în CV-ul tău.",
    schimb: "Scrie ce știi să faci și se potrivește și în noul domeniu (de exemplu comunicare, organizare, lucrul cu oamenii sau cu cifrele), cu câte un exemplu. Ce știi să faci contează mai mult decât titlul vechi.",
    pauza: "Scrie pauza simplu și sincer, ca pe o etapă, de exemplu „Concediu de creștere a copilului” cu perioada. Adaugă ce ai învățat sau ai făcut în acest timp: cursuri, voluntariat, responsabilități.",
    nustiu: "CV-ul poate aștepta până știi ce vrei. Când îl scrii, pune accent pe ce ți-a ieșit bine și pe ce îți place să faci.",
    accent45: "Pune în față experiența și rezultatele concrete. Scrie și ce folosești din tehnologie: e-mail, programe de birou, întâlniri video."
  },

  /* Liste de cuvinte folosite la verificare (fără diacritice, cu litere mici). */
  cuvinte: {
    porecle: ["pisi", "frumus", "sexy", "baby", "iubi", "smecher", "kiss", "angel", "printes", "gamer", "cool", "boss", "dulce", "bomb"],
    vagi: [["diverse lucruri", "diverse lucruri"], ["chestii", "chestii"], ["am lucrat acolo", "am lucrat acolo"], ["bun la diverse", "bun la diverse"],
      ["diverse sarcini", "diverse sarcini"], ["diverse activitati", "diverse activități"]],
    limbi: ["engleza", "franceza", "germana", "italiana", "spaniola", "rusa", "maghiara", "portugheza", "chineza", "araba", "turca"],
    prescurtariObisnuite: ["CV", "RON", "EUR", "USD", "SRL", "SA", "IT", "PC", "HR", "UE", "EU", "ASE", "PFA", "ONG", "SUA", "UK", "TV", "OK", "II", "III", "IV", "VI", "VII", "VIII", "IX", "XI", "XII", "ANOFM", "CNP"]
  }
};
