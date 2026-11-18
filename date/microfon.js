/* Date: „Cum pornești microfonul de pe tastatură” — pașii pentru iPhone, Android cu Gboard și Samsung.
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
      "Deschide **Setări**, apoi **Gestionare generală**.",
      "Apasă **Setări Tastatură Samsung**.",
      "Caută **„Tastare vocală”** sau **„Bara de instrumente”** și pornește microfonul.",
      "Nu-l găsești? Apasă pe **cele trei puncte** din bara de sus a tastaturii. Microfonul poate fi acolo."] },
    android: { t: "Android, cu tastatura Google", pasi: [
      "Deschide **Setări**.",
      "Caută **„Tastatură”** și deschide **Gboard**.",
      "Apasă **„Tastare vocală”** și pornește **„Folosește tastarea vocală”**.",
      "**Microfonul** apare sus, în dreapta tastaturii."] }
  }
};
