/* Date: „Cuvinte de știut” — explicații pe înțelesul unui copil, pentru cuvintele tehnice din aplicație.
   Aplicația pune jos pe ecran doar cuvintele care apar pe ecranul respectiv. p = cum îl recunoaște (început de cuvânt); s = sensibil la litere mari.
   Texte aprobate de Simona (2026-11-18). */
window.DATE = window.DATE || {};
window.DATE.glosar = {
  titlu: "Cuvinte de știut",
  afla: "Nu înțelegi un cuvânt? Vezi cum afli singur(ă)",
  cuvinte: [
    { t: "IA", p: "IA\\b", s: true, d: "Inteligență artificială: un program cu care poți vorbi în scris, ca într-o conversație." },
    { t: "Prompt", p: "prompt", d: "Mesajul pe care i-l scrii programului de IA, ca să știe ce vrei." },
    { t: "Chat", p: "chat", d: "Conversația scrisă cu un program sau cu un om." },
    { t: "Asertiv", p: "asertiv", d: "Spui clar ce gândești și ce vrei, cu respect pentru tine și pentru ceilalți." },
    { t: "Domeniu", p: "domeni", d: "Un fel de muncă. De exemplu: sănătate, construcții, vânzări." },
    { t: "Post", p: "post(ul|uri|urile|ului)?\\b", d: "Un loc de muncă anume dintr-o firmă. De exemplu: vânzător." },
    { t: "Anunț", p: "anunț", d: "Mesajul prin care o firmă spune că angajează pe cineva." },
    { t: "Cerințe", p: "cerințe", d: "Ce cere firma de la cel pe care îl angajează." },
    { t: "Interval", p: "interval", d: "Două sume, „de la … până la …”, în loc de una singură." },
    { t: "Brut", p: "brut", d: "Salariul scris în contract, înainte să se oprească taxele." },
    { t: "Net", p: "net\\b", d: "Banii pe care îi primești de fapt în mână." },
    { t: "Salariul din mijloc (mediana)", p: "median", d: "Jumătate dintre oameni câștigă mai puțin, jumătate mai mult." },
    { t: "Contraofertă", p: "contraofert", d: "Propunerea ta, când răspunzi la oferta firmei." },
    { t: "ATS", p: "ATS\\b", s: true, d: "Un program care citește CV-urile înainte să le vadă un om." },
    { t: "Antet / subsol", p: "(antet|subsol)", d: "Partea de sus / partea de jos a paginii, care se repetă pe fiecare pagină." },
    { t: "Font", p: "font", d: "Felul în care arată literele." },
    { t: "PDF / Word", p: "(PDF|Word|\\.docx)\\b", s: true, d: "Două feluri de fișiere în care poți salva CV-ul." },
    { t: "Pictograme", p: "pictogram", d: "Desene mici, ca niște semne." },
    { t: "Link", p: "link", d: "Adresa unei pagini de pe internet, pe care apeși ca s-o deschizi." },
    { t: "Browser", p: "browser", d: "Programul cu care deschizi site-uri. De exemplu: Chrome sau Safari." },
    { t: "Notificări", p: "notificăr", d: "Mesajele mici care apar sus pe ecranul telefonului." },
    { t: "CNP", p: "CNP", s: true, d: "Numărul tău personal, din buletin. Nu-l dai oricui." },
    { t: "Date personale", p: "datel?e? personale", d: "Lucruri doar despre tine: numele, adresa, telefonul, CNP-ul." },
    { t: "Obstacol", p: "obstacol", d: "Ceva care te poate opri sau încurca." },
    { t: "Afirmații", p: "afirmați", d: "Propoziții despre care spui dacă sunt adevărate pentru tine." },
    { t: "Specific / măsurabil / realizabil / relevant", p: "(măsurabil|realizabil)", d: "Clar / poți număra / poți face / contează pentru tine." }
  ]
};
