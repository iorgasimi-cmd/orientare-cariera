/* Verificatorul de conținut („subagentul verificator").
   Citește textele din aplicație și caută: promisiuni, etichete puse oamenilor, cifre fără sursă,
   întrebări cu „de ce?", cuvinte grele. Returnează o listă de probleme; NU rescrie nimic.
   Rulează local (și în teste); nu trimite nimic nicăieri. */
(function (g) {
  "use strict";

  var REGULI = [
    { id: "promisiune", re: /\b(garantat|garantăm|garantez|sigur (vei|o să|ai|te)|vei găsi sigur|cu siguranță vei|100\s*%)/i,
      mesaj: "Promisiune sau garanție. Aplicația nu promite rezultate." },
    { id: "eticheta", re: /\b(ești un|ești o|ești de tip|tipul tău este|ești genul)\b/i,
      mesaj: "Etichetă pusă omului. Folosește „arată interes pentru…”." },
    { id: "procent", re: /\d+\s*%/,
      mesaj: "Procent fără sursă. Cifrele se pun doar cu sursă și dată, în fișierul de date." },
    { id: "dece", re: /(^|[.?!]\s+)De ce\s/,
      mesaj: "Întrebare cu „de ce?”: sună a reproș. Folosește „ce anume” sau „ce te-a făcut”." },
    { id: "jargon", re: /\b(assessment|soft[- ]?skills?|feedback|networking|skills|mindset)\b/i,
      mesaj: "Cuvânt englezesc. Folosește un cuvânt românesc sau explică-l într-o propoziție." },
    { id: "presiune", re: /\b(trebuie neapărat|ești obligat|nu ai de ales|ultima șansă|e prea târziu)\b/i,
      mesaj: "Ton de presiune. Aplicația propune, nu obligă." },
    /* Cerută de autoare: mesajele de tipul „aplicația nu înlocuiește un psiholog sau un consilier” nu mai au voie în aplicație. */
    { id: "fraza-interzisa", re: /nu\s+înlocuiește[^.<]{0,40}(psiholog|consilier)|nu\s+este\s+consiliere\s+psihologic/i,
      mesaj: "Mesajele de tipul „aplicația nu înlocuiește un psiholog sau un consilier” au fost scoase la cererea autoarei. Nu le reintroduce." },
    { id: "boala", re: /\b(depresiv|anxios|tulburare|diagnostic)\b/i,
      mesaj: "Limbaj de diagnostic. Aplicația nu pune diagnostice." }
  ];

  function verificaText(text) {
    var probleme = [];
    if (typeof text !== "string") return probleme;
    REGULI.forEach(function (r) {
      var m = text.match(r.re);
      if (m) probleme.push({ regula: r.id, mesaj: r.mesaj, gasit: m[0] });
    });
    return probleme;
  }

  /* Parcurge un obiect de date și verifică toate textele. */
  function verificaDate(obj, cale, rez) {
    rez = rez || [];
    cale = cale || "";
    if (typeof obj === "string") {
      /* câmpurile tehnice nu se verifică */
      verificaText(obj).forEach(function (p) { p.cale = cale; rez.push(p); });
    } else if (Array.isArray(obj)) {
      obj.forEach(function (x, i) { verificaDate(x, cale + "[" + i + "]", rez); });
    } else if (obj && typeof obj === "object") {
      Object.keys(obj).forEach(function (k) {
        if (k === "id" || k === "tip" || k === "tipuri" || k === "tema" || k === "grupa" || k === "scriere" || k === "verificat") return;
        verificaDate(obj[k], cale ? cale + "." + k : k, rez);
      });
    }
    return rez;
  }

  /* Cuvinte care arată că omul poate fi într-un moment greu. Lista e cu intenție scurtă și prudentă.
     Nu pune diagnostic: doar oprește fluxul și îndrumă blând către un adult de încredere. */
  var SEMNE_CRIZA = /(vreau să mor|nu mai vreau să trăiesc|mă omor|mă sinucid|sinucid|să-mi fac rău|mă tai|nu mai pot de tot|disperat|nu mai are rost|mă bate|mă lovește|abuz)/i;
  function areSemneCriza(text) {
    return typeof text === "string" && SEMNE_CRIZA.test(text);
  }

  g.Verificator = { verificaText: verificaText, verificaDate: verificaDate, areSemneCriza: areSemneCriza, REGULI: REGULI };
  if (typeof module !== "undefined" && module.exports) module.exports = g.Verificator;
})(typeof window !== "undefined" ? window : globalThis);
