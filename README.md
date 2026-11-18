# Orientare în carieră

Aplicație web de orientare în carieră pentru elevi (clasele IX–XII) și, în etapa următoare, pentru adulți.
Se deschide de pe telefon, printr-un link, și poate fi adăugată pe ecranul principal.

**Datele rămân doar pe telefonul utilizatorului.** Nu există conturi, server, analiză de trafic, reclame sau fișiere încărcate de pe alte site-uri. Utilizatorul poate șterge tot din Setări.

## Starea proiectului

| Etapa | Ce conține | Stare |
|---|---|---|
| 1 | Ecranul de început (vârsta) + traseul pentru elevi: test de interese, puncte forte și valori, meserii, plan cu temă săptămânală, sfaturi, reamintiri | Gata (ciornă, **neverificată de autoare**) |
| 2 | Traseul pentru adulți: CV, scrisoare, interviu | De făcut |
| 3 | Negocierea salariului, limbajul corpului, ce cer angajatorii | De făcut |

Cine alege „18–44 de ani” sau „45 de ani sau mai mult” vede deocamdată ecranul „În curând”.

## Cum se rulează

Nu are nevoie de instalare. Dintr-un dosar cu proiectul:

```bash
python3 -m http.server 8000
```

Apoi se deschide `http://localhost:8000` în browser. Testele automate:

```bash
node teste/teste.js
node teste/contrast.js
```

## Cum e organizat

- `index.html`, `css/stil.css` – pagina și stilul (mobil mai întâi, mod luminos și întunecat).
- `css/culori.css` – **toate culorile sunt aici**, ca variabile. După orice schimbare de culoare rulează `node teste/contrast.js`. Culorile scrise de mână și în `manifest.webmanifest`, `index.html` (theme-color) și `icons/icon.svg` trebuie schimbate și acolo.
- `js/module/` – câte un fișier pentru fiecare „subagent” cu o singură sarcină: `interese.js`, `puncte-forte.js`, `meserii.js`, `plan.js`, `sfaturi.js`, `reamintiri.js`; `sistem.js` este „găzda” (agentul principal): întrebările de început, meniul, setările, oprirea blândă.
- `js/verificator.js` – subagentul verificator: caută promisiuni, procente fără sursă, „de ce?”, cuvinte englezești, etichete. Rulează și în teste, pe toate textele.
- `js/stocare.js` – salvarea pe telefon.
- `date/` – textele și datele, separat de cod, fiecare cu mențiunea „neverificat” și data scrierii. Se pot actualiza fără să se schimbe aplicația.

## Reguli stabilite de autoare (de respectat la orice modificare)

- Mesajele de tipul „Aplicația nu este consiliere psihologică și nu înlocuiește un psiholog sau un consilier” (inclusiv fraza „Rezultatele sunt orientative. Aplicația nu este consiliere psihologică…” și notele de același fel de pe paginile testului) au fost scoase din aplicație și **nu se mai introduc**. Verificatorul (`js/verificator.js`) le semnalează, iar testele eșuează dacă apar.
- Au fost scoase și: „Rezultatele sunt doar idei de pornire. Alegerile rămân ale tale.” (ecranul „Bine ai venit!”) și „Ce nu face: nu promite un loc de muncă.” („Despre aplicație”). Mesajele de ajutor (adult de încredere și 112) rămân.
- Pe ecranul de început nu apar: paragraful despre datele care rămân pe telefon și nota despre vârstă și consiliere.

## De verificat înainte de lansare (de către autoare)

1. Gramatica și tonul tuturor textelor (inclusiv diacriticele).
2. Cele 36 de întrebări ale testului (scrise original, după modelul Holland/RIASEC).
3. Lista de meserii din `date/meserii.js`: descrieri generale, fără salarii sau cifre. Oferta de licee și facultăți trebuie verificată.
4. Sursa originală pentru ancorele de carieră (Schein), din care sunt inspirate valorile.
5. Liniile de ajutor pentru ecranul „Ești important(ă)”: acum apare doar 112. Numerele altor servicii se adaugă doar după verificare.
6. Verifică drepturile pentru orice material folosit ca inspirație.
7. Cifre fără sursă, care **nu** sunt folosite în aplicație: „90% ATS”, „70% verifică rețelele sociale”, „de 10 ori mai multe șanse prin recomandare”, „7% / 38% / 55%”.
8. Reguli legale despre minori și date: aplicația nu scrie nimic despre lege; subiectul se verifică cu un specialist.

## Ce nu s-a putut testa

- Pe telefoane reale (iPhone și Android). S-a testat într-un browser, la dimensiune de telefon, în mod luminos și întunecat.
- Notificările: aplicația nu are server, deci nu poate trimite notificări când e închisă. La fiecare deschidere arată un mesaj despre tema săptămânii. Pe iPhone, notificările funcționează doar după adăugarea pe ecranul principal (netestat).
- Adăugarea pe ecranul principal; funcționarea fără internet a fost verificată doar într-un browser pe computer.
