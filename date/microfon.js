/* Date: „Cum pornești microfonul de pe tastatură” (pașii Samsung verificați pe telefonul Simonei: microfonul e sub „…”, 2026-11-18) — pașii pentru iPhone, Android cu Gboard și Samsung.
   Numele din meniuri pot fi puțin diferite de la un telefon la altul. Scris la cererea Simonei (2026-11-18). */
window.DATE = window.DATE || {};
window.DATE.microfon = {
  titlu: "Cum pornești microfonul",
  link: "Nu vezi microfonul? Vezi cum îl pornești",
  intro: "**Microfonul te lasă să vorbești în loc să scrii.** Pe unele telefoane trebuie pornit o singură dată.",
  alTau: "Telefonul tău pare să fie:",
  altele: "Alt telefon? Vezi și ceilalți pași",
  cauta: "**Sfat:** în Setări, la căutare, scrie „**dictare**” sau „**tastare vocală**”. Te duce direct la locul potrivit.",
  voce: "Vocea ta e transformată în text de tastatura telefonului, de obicei prin internet.",
  incearca: "Gata? Întoarce-te și spune o frază scurtă. Verifică dacă textul a ieșit corect.",
  telefoane: {
    ios: { t: "iPhone", pasi: [
      "Deschide **Setări**.",
      "Apasă **General**, apoi **Tastatură**.",
      "Pornește **„Activează dictarea”**.",
      "Deschide un câmp de scris. **Microfonul** apare pe tastatură, jos, lângă bara de spațiu."] },
    samsung: { t: "Samsung", pasi: [
      "Atinge un câmp de scris, ca să apară tastatura. **Deasupra literelor e o bară cu iconițe.**",
      "Apasă pe **cele trei puncte „…”**, în dreapta barei.",
      "Apasă pe **microfon** („Tastare vocală”). Vorbește, iar textul apare singur.",
      "**Ca să-l ai mereu la îndemână:** ține degetul pe microfon și trage-l în bara de deasupra literelor.",
      "Nu e acolo? Apasă pe **rotița** din aceeași bară, caută **„Tastare vocală”** și pornește-o."] },
    android: { t: "Android, cu tastatura Google", pasi: [
      "Deschide **Setări**.",
      "Caută **„Tastatură”** și deschide **Gboard**.",
      "Apasă **„Tastare vocală”** și pornește **„Folosește tastarea vocală”**.",
      "**Microfonul** apare sus, în dreapta tastaturii."] }
  }
};
