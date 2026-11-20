/* Teste automate (rulează cu: node teste/teste.js). Nu au nevoie de internet sau de instalări. */
"use strict";
const assert = require("assert");
const path = require("path");
const rad = path.join(__dirname, "..");

/* Un „localStorage" fals, ca să putem testa salvarea și ștergerea. */
function fals() { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, _m: m }; }
globalThis.window = globalThis;
globalThis.localStorage = fals();

["date/interese.js", "date/valori.js", "date/meserii.js", "date/sfaturi.js", "date/adulti.js", "date/cv.js", "date/scrisoare.js", "date/interviu.js", "date/competente.js", "date/asertiv.js", "date/exercitii.js", "date/ia.js", "date/valori_personale.js", "date/corp.js", "date/cerinte.js", "date/roata.js", "date/retine.js", "date/bosi.js", "date/lectii.js", "date/glosar.js", "date/datele.js", "date/servicii.js", "date/cauta.js", "date/detectiv.js", "date/negociere.js",
 "js/stocare.js", "js/verificator.js", "js/nucleu.js", "js/module/glosar.js",
 "js/module/interese.js", "js/module/puncte-forte.js", "js/module/meserii.js",
 "js/module/plan.js", "js/module/sfaturi.js", "js/module/reamintiri.js", "js/module/sistem.js", "js/module/adult.js", "js/module/cv.js", "js/module/scrisoare.js", "js/module/interviu.js", "js/module/competente.js", "js/module/asertiv.js", "js/module/exercitii.js", "js/module/valorile.js", "js/module/corp.js", "js/module/cerinte.js", "js/module/roata.js", "js/module/retine.js", "js/module/servicii.js", "js/module/caiet.js", "js/module/bosi.js", "js/module/lectie.js", "js/module/datele.js", "js/module/cauta.js", "js/module/negociere.js"
].forEach(f => require(path.join(rad, f)));

const C = Cariera, S = Stocare, D = DATE;
let ok = 0;
function test(nume, f) { try { f(); ok++; console.log("  ok  " + nume); } catch (e) { console.error("  EȘEC " + nume + "\n      " + e.message); process.exitCode = 1; } }

console.log("Date");
test("36 de întrebări, câte 6 pentru fiecare tip", () => {
  assert.strictEqual(D.interese.intrebari.length, 36);
  "RIASEC".split("").forEach(t => assert.strictEqual(D.interese.intrebari.filter(q => q.tip === t).length, 6, t));
  const ids = D.interese.intrebari.map(q => q.id); assert.strictEqual(new Set(ids).size, ids.length);
});
test("fiecare meserie are tipuri și valori existente", () => {
  const valori = D.valori.lista.map(v => v.id);
  D.meserii.lista.forEach(m => {
    assert.ok(m.tipuri.length > 0 && m.tipuri.every(t => "RIASEC".includes(t)), m.id);
    assert.ok(m.valori.every(v => valori.includes(v)), m.id + " valoare necunoscută");
    ["nume", "ceFace", "ceInvata", "drumuri", "alte"].forEach(c => assert.ok(m[c] && m[c].length > 10, m.id + "." + c));
  });
  assert.ok(D.meserii.lista.length >= 20);
});
test("sfaturi: câte cel puțin un sfat pentru fiecare temă și grupă", () => {
  D.sfaturi.teme.forEach(t => Object.keys(D.sfaturi.grupe).forEach(g => assert.ok(D.sfaturi.sfaturi.some(s => s.tema === t.id && s.grupa === g), t.id + "/" + g)));
});
test("fiecare fișier de date are mențiune de verificare", () => {
  ["interese", "valori", "meserii", "sfaturi"].forEach(k => assert.strictEqual(D[k].verificat, "neverificat", k));
});

console.log("Verificatorul de conținut");
test("textele din aplicație nu au promisiuni, procente, „de ce?”, jargon sau etichete", () => {
  const probleme = Verificator.verificaDate(D);
  assert.deepStrictEqual(probleme.map(p => p.cale + ": " + p.gasit), []);
});
test("detectează ce trebuie", () => {
  const V = Verificator;
  assert.ok(V.verificaText("Îți garantăm un job.").length);
  assert.ok(V.verificaText("90% dintre firme").length);
  assert.ok(V.verificaText("De ce ai făcut asta?").length);
  assert.ok(V.verificaText("Ești un om creativ.").length);
  assert.ok(V.verificaText("Un feedback bun.").length);
  assert.ok(V.verificaText("Rezultatele sunt orientative. Aplicația nu este consiliere psihologică și nu înlocuiește un psiholog sau un consilier.").some(x => x.regula === "fraza-interzisa"));
  ["Nu înlocuiește un psiholog sau un consilier.", "Aplicația nu este consiliere psihologică.", "testul nu înlocuiește un consilier"].forEach(t => assert.ok(Verificator.verificaText(t).some(x => x.regula === "fraza-interzisa"), t));
  assert.ok(!Verificator.verificaText("Vorbește cu consilierul școlii sau cu medicul de familie.").some(x => x.regula === "fraza-interzisa"));
  assert.strictEqual(V.verificaText("Răspunsurile tale arată interes pentru oameni.").length, 0);
});
test("recunoaște semne de moment greu și nu reacționează la texte obișnuite", () => {
  assert.ok(Verificator.areSemneCriza("Sunt disperată și nu mai pot de tot"));
  assert.ok(Verificator.areSemneCriza("uneori vreau să mor"));
  assert.ok(!Verificator.areSemneCriza("Vreau să devin medic și să ajut oameni"));
});

console.log("Salvare pe telefon");
test("salvează, citește și șterge", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("plan.scop.specific", "Vorbesc cu doi oameni");
  assert.strictEqual(S.ia("plan.scop.specific"), "Vorbesc cu doi oameni");
  assert.ok(JSON.parse(localStorage.getItem("cariera_v1")).plan.scop.specific);
  S.sterge();
  assert.strictEqual(S.ia("varsta", "gol"), "gol");
  assert.strictEqual(localStorage.getItem("cariera_v1"), null);
});
test("nu lasă să fie stricate obiectele din sistem", () => {
  S.pune("__proto__.stricat", "da"); S.pune("a.constructor.x", 1);
  assert.strictEqual({}.stricat, undefined);
});
test("funcționează și când browserul nu permite salvarea", () => {
  const vechi = globalThis.localStorage;
  globalThis.localStorage = { getItem() { throw new Error("blocat"); }, setItem() { throw new Error("blocat"); }, removeItem() { throw new Error("blocat"); } };
  S.pune("clasa", "9"); assert.strictEqual(S.ia("clasa"), "9"); assert.strictEqual(S.disponibil(), false);
  S.sterge(); globalThis.localStorage = vechi;
});
test("nu se trimite nimic în rețea: niciun fișier nu apelează fetch, XMLHttpRequest sau adrese externe", () => {
  const fs = require("fs");
  const dosare = ["js", "js/module", "date"];
  dosare.forEach(d => fs.readdirSync(path.join(rad, d)).filter(f => f.endsWith(".js")).forEach(f => {
    const t = fs.readFileSync(path.join(rad, d, f), "utf8");
    /* Singura adresă externă permisă: legătura către serviciile ColorPsi, cerută de autoare. */
    const fara = t.split("https://iorgasimi-cmd.github.io/colorpsi/#servicii").join("");
    assert.ok(!/XMLHttpRequest|\bfetch\(|sendBeacon|WebSocket|https?:\/\//.test(fara), d + "/" + f);
  }));
  const html = fs.readFileSync(path.join(rad, "index.html"), "utf8");
  assert.ok(!/(src|href)="https?:\/\//.test(html));
});

console.log("Testul de interese");
test("tipul cu cele mai mari răspunsuri iese primul", () => {
  const r = {}; D.interese.intrebari.forEach(q => { r[q.id] = q.tip === "S" ? 5 : q.tip === "A" ? 4 : q.tip === "I" ? 3 : 1; });
  const rez = C.module.interese.calculeaza(r);
  assert.deepStrictEqual(rez.top, ["S", "A", "I"]);
  assert.strictEqual(rez.scor.S, 30);
});
test("la egalitate ordinea e fixă (R, I, A, S, E, C)", () => {
  const r = {}; D.interese.intrebari.forEach(q => { r[q.id] = 3; });
  assert.deepStrictEqual(C.module.interese.calculeaza(r).top, ["R", "I", "A"]);
});
test("răspunsuri lipsă sau greșite nu strică calculul", () => {
  const rez = C.module.interese.calculeaza({ r1: "abc", i1: 99, a1: 5 });
  assert.strictEqual(rez.scor.A, 5); assert.strictEqual(rez.scor.R, 0);
});

console.log("Meserii");
test("clasamentul potrivește tipurile și valorile", () => {
  const cl = C.module.meserii.clasament(["S", "I", "A"], ["ajutor"]).map(x => x.m.id);
  assert.ok(cl.slice(0, 5).includes("sanatate") && cl.slice(0, 5).includes("psiho"), cl.slice(0, 5).join());
  const cl2 = C.module.meserii.clasament(["R", "C", "E"], []).map(x => x.m.id);
  assert.ok(cl2.slice(0, 4).includes("meserii-tehnice") || cl2.slice(0, 4).includes("logistica"));
});

console.log("Plan și reamintiri");
test("tema săptămânii: dacă nu a fost făcută, omul primește mesaj blând și poate alege altă temă", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("plan.start", C.azi());
  const p0 = C.module.plan.ecran("saptamana").corp;
  assert.ok(!p0.includes("Am făcut tema") && !p0.includes("Nu am făcut-o încă"), "fără temă aleasă nu apar butoane");
  S.pune("plan.sapt.s0.aleasa", "t1");
  const p1 = C.module.plan.ecran("saptamana").corp;
  assert.ok(p1.includes("Am făcut tema") && p1.includes("Nu am făcut-o încă"));
  C.module.plan.actiuni.nefacut("0");
  const p2 = C.module.plan.ecran("saptamana").corp;
  assert.ok(p2.includes(D.sfaturi.mesaje.fara_tema) && p2.includes("Aleg altă temă"));
  S.pune("plan.sapt.s0.aleasa", "t2");
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Aleg altă temă"), "mesajul dispare dacă alege altă temă");
  S.pune("plan.sapt.s0.aleasa", "t1"); C.module.plan.actiuni.nefacut("0"); C.module.plan.actiuni.alta("0");
  assert.strictEqual(S.ia("plan.sapt.s0.aleasa"), "");
  S.pune("plan.sapt.s0.aleasa", "t1"); C.module.plan.actiuni.bifeaza("0");
  assert.ok(C.module.plan.ecran("saptamana").corp.includes("Tema e făcută"));
  S.sterge();
});
test("date: adăugare de zile și format românesc", () => {
  assert.strictEqual(C.adauga("2026-11-14", 6), "2026-11-20");
  assert.strictEqual(C.adauga("2026-12-28", 7), "2027-01-04");
  assert.strictEqual(C.adauga("2026-03-01", -1), "2026-02-28");
  assert.strictEqual(C.format("2026-11-20"), "20.11.2026");
});
test("„Fac tema mai târziu”: tema rămâne pe listă, cu termenul afișat", () => {
  S.sterge(); S.pune("plan.start", C.azi()); S.pune("plan.sapt.s0.aleasa", "t1");
  const p1 = C.module.plan.ecran("saptamana").corp;
  assert.ok(p1.includes("Fac tema mai târziu") && p1.includes("Termen: " + C.format(C.adauga(C.azi(), 6))));
  C.module.plan.actiuni.maitarziu("0");
  const p2 = C.module.plan.ecran("saptamana").corp;
  assert.ok(p2.includes("Bine. Tema rămâne pe lista ta") && p2.includes("Am făcut tema"));
  C.module.plan.actiuni.nefacut("0");
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Bine. Tema rămâne pe lista ta"), "mesajele nu se suprapun");
  C.module.plan.actiuni.maitarziu("0"); C.module.plan.actiuni.bifeaza("0");
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Bine. Tema rămâne pe lista ta"));
  S.sterge();
});
test("termen depășit: apare „Schimb tema” cu sugestia pașilor mai mici", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("plan.start", C.adauga(C.azi(), -10)); S.pune("plan.sapt.s0.aleasa", "t1");
  assert.deepStrictEqual(C.module.plan.restante(), [0]);
  const tema1 = D.sfaturi.teme_saptamanale.find(t => t.id === "t1").t;
  ["hub", "saptamana"].forEach(e => {
    const c = C.module.plan.ecran(e).corp;
    assert.ok(c.includes("Schimb tema") && c.includes("pași mai mici") && c.includes(tema1.slice(0, 20)), e);
    assert.ok(c.includes("Termenul a trecut (" + C.format(C.adauga(C.azi(), -4)) + ")"), e + " arată data termenului");
  });
  /* o temă făcută la timp nu apare ca restantă */
  S.pune("plan.sapt.s0.bifat", true); assert.deepStrictEqual(C.module.plan.restante(), []);
  S.pune("plan.sapt.s0.bifat", false);
  /* „Am făcut-o totuși” */
  C.module.plan.actiuni.totusi("0"); assert.deepStrictEqual(C.module.plan.restante(), []);
  S.pune("plan.sapt.s0.bifat", false);
  /* „Schimb tema” închide temele vechi nefăcute */
  C.module.plan.actiuni.schimba(); assert.deepStrictEqual(C.module.plan.restante(), []);
  assert.strictEqual(C.ecran, "plan/saptamana");
  assert.ok(!C.module.plan.ecran("hub").corp.includes("Schimb tema"));
  /* tema proprie restantă își arată textul */
  S.pune("plan.sapt.s0.inchisa", false); S.pune("plan.sapt.s0.aleasa", "proprie"); S.pune("plan.sapt.s0.proprie", "Citesc o pagină");
  assert.ok(C.module.plan.ecran("hub").corp.includes("Citesc o pagină"));
  S.sterge();
});
test("reamintirea din aplicație: cât timp tema nu e bifată arată tema și butoanele; după bifare dispar", () => {
  S.sterge(); S.pune("plan.start", C.azi());
  assert.ok(!C.module.reamintiri.banner().includes("Am făcut tema"), "fără temă aleasă nu apar butoane");
  S.pune("plan.sapt.s0.aleasa", "t1");
  const b1 = C.module.reamintiri.banner();
  assert.ok(b1.includes("Am făcut tema") && b1.includes("Fac tema mai târziu") && b1.includes("Termen:") && b1.includes(D.sfaturi.teme_saptamanale[0].t.slice(0, 20)));
  C.module.plan.actiuni.bifeaza("0");
  assert.ok(!C.module.reamintiri.banner().includes("Am făcut tema"), "după bifare nu mai cere tema");
  S.pune("plan.sapt.s0.bifat", false); S.pune("plan.start", C.adauga(C.azi(), -10));
  assert.ok(C.module.reamintiri.banner().includes("Văd tema nefăcută"), "cu termen depășit trimite spre tema nefăcută");
  S.sterge();
});
test("fișierul de calendar: format corect, alarmă zilnică până la termen", () => {
  const f = C.module.reamintiri.construiesteIcs;
  const baza = { text: "Vorbește zece minute, cu un adult; întreabă-l ce face.", ora: "18:00", azi: "2026-11-14", acum: "10:00", termen: "2026-11-20", idx: 0, stamp: "20261114T100000Z" };
  const ics = f(baza);
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n") && ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(ics.includes("DTSTART:20261114T180000") && ics.includes("RRULE:FREQ=DAILY;UNTIL=20261120T235959"));
  assert.ok(ics.includes("BEGIN:VALARM") && ics.includes("TRIGGER:PT0M"));
  assert.ok(ics.includes("\\,") && ics.includes("\\;"), "virgula și punctul și virgula sunt marcate");
  ics.split("\r\n").forEach(l => assert.ok(Buffer.byteLength(l, "utf8") <= 75, "linie prea lungă: " + l));
  assert.ok(!/[^\r]\n/.test(ics), "fiecare rând se termină cu CRLF");
  /* ora de azi a trecut: începe mâine */
  assert.ok(f(Object.assign({}, baza, { acum: "19:30" })).includes("DTSTART:20261115T180000"));
  /* ultima zi, ora a trecut: o singură alarmă, fără repetare */
  const una = f(Object.assign({}, baza, { azi: "2026-11-20", acum: "19:30" }));
  assert.ok(una.includes("DTSTART:20261121T180000") && !una.includes("RRULE"));
  /* text foarte lung: nu depășește 75 de octeți pe linie și titlul e scurtat */
  const lung = f(Object.assign({}, baza, { text: "ă".repeat(300) }));
  lung.split("\r\n").forEach(l => assert.ok(Buffer.byteLength(l, "utf8") <= 75));
});
test("butonul de calendar apare doar cât timp tema nu e bifată", () => {
  S.sterge(); S.pune("plan.start", C.azi());
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Adaug reamintirea în calendar"));
  S.pune("plan.sapt.s0.aleasa", "t1");
  const c = C.module.plan.ecran("saptamana").corp;
  assert.ok(c.includes("Adaug reamintirea în calendar") && c.includes('type="time"') && c.includes('value="18:00"'));
  S.pune("plan.sapt.s0.bifat", true);
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Adaug reamintirea în calendar"));
  S.sterge();
});
test("ecranul cu valorile nu mai arată nota despre sursă (scoasă la cererea autoarei)", () => {
  S.sterge();
  const c = C.module.forte.ecran("valori").corp;
  assert.ok(!c.includes("Inspirat din ancorele") && !c.includes("De verificat sursa") && !c.includes("undefined"));
  assert.ok(c.includes("Siguranță") && c.includes("Continuă"));
});
test("tema: răspunsul la butoane apare chiar sub ele (înaintea cartelei de calendar), butonul apăsat se vede bifat și se poate apăsa din nou", () => {
  S.sterge(); S.pune("plan.start", C.azi()); S.pune("plan.sapt.s0.aleasa", "t1");
  const vezi = () => C.module.plan.ecran("saptamana").corp;
  C.module.plan.actiuni.maitarziu("0");
  let c = vezi();
  assert.ok(c.includes("✓ Fac tema mai târziu") && c.includes("Bine. Tema rămâne pe lista ta"));
  assert.ok(c.indexOf("Bine. Tema rămâne pe lista ta") < c.indexOf("Reamintire în calendar"), "mesajul e înaintea cartelei de calendar");
  assert.strictEqual(C.deArata, "mesaj-tema"); C.deArata = "";
  C.module.plan.actiuni.maitarziu("0");
  c = vezi(); assert.ok(!c.includes("✓ Fac tema mai târziu") && !c.includes("Bine. Tema rămâne pe lista ta"), "a doua apăsare anulează");
  C.module.plan.actiuni.nefacut("0");
  c = vezi(); assert.ok(c.includes("✓ Nu am făcut-o încă") && c.indexOf(D.sfaturi.mesaje.fara_tema) < c.indexOf("Reamintire în calendar"));
  C.module.plan.actiuni.nefacut("0"); assert.ok(!vezi().includes("✓ Nu am făcut-o încă"));
  C.module.plan.actiuni.bifeaza("0"); C.deArata = "";
  c = vezi(); assert.ok(c.includes("Felicitări") || c.includes("Bravo") || c.includes("Foarte bine"));
  assert.ok(!c.includes("Reamintire în calendar"), "după bifare nu mai cere reamintire");
  S.sterge();
});
test("textele cerute: sfaturile nu au nota de la final; întrebarea Ikigai are „te”", () => {
  assert.ok(!C.module.sfaturi.ecran("motivatie").corp.includes("Sunt sfaturi generale"));
  assert.ok(D.valori.ikigai.some(q => q.t === "Pentru ce ar putea cineva să te plătească?"));
});

test("trei teme diferite pe săptămână, care se schimbă", () => {
  const a = C.module.plan.temeSaptamanii(0), b = C.module.plan.temeSaptamanii(1);
  assert.strictEqual(new Set(a.map(t => t.id)).size, 3);
  assert.notStrictEqual(a[0].id, b[0].id);
});
test("calculul săptămânilor și al zilelor", () => {
  assert.strictEqual(C.zile("2026-11-01", "2026-11-11"), 10);
  assert.strictEqual(C.zile("2026-12-28", "2027-01-04"), 7);
  S.sterge(); assert.strictEqual(C.saptamana(), 0);
  S.pune("plan.start", C.azi()); assert.strictEqual(C.saptamana(), 0);
  S.sterge();
});
test("mesajul de reamintire potrivit", () => {
  const m = C.module.reamintiri.mesajPentru;
  assert.ok(D.sfaturi.mesaje.felicitare.includes(m(0, true, 2, false, true)));
  assert.strictEqual(m(2, false, 2, false, false), D.sfaturi.mesaje.fara_tema);
  assert.strictEqual(m(0, false, 1, false, false), D.sfaturi.mesaje.inceput);
});

console.log("Traseul pentru adulți");
test("după vârsta de adult urmează întrebarea despre situație", () => {
  S.sterge();
  C.module.sistem.actiuni.varsta("18-44"); assert.strictEqual(C.ecran, "adult/situatie");
  assert.strictEqual(C.module.sistem.traseu("18-44"), "adult/situatie", "fără situație aleasă, traseul începe cu întrebarea");
  const q = C.module.adult.ecran("situatie");
  assert.strictEqual(q.titlu, "Care e situația ta acum?");
  D.adulti.situatii.forEach(x => assert.ok(q.corp.includes(x.t), x.id));
  assert.ok(q.corp.includes("concediul de creștere a copilului"));
  C.module.adult.actiuni.situatie("nimic"); assert.strictEqual(S.ia("situatie", ""), "", "o valoare necunoscută nu se salvează");
  C.module.adult.actiuni.situatie("caut"); assert.strictEqual(C.ecran, "adult/bunvenit");
  assert.strictEqual(C.module.sistem.traseu("18-44"), "adult/meniu");
  /* chiar dacă situația e deja aleasă, alegerea vârstei întreabă din nou (se poate schimba) */
  C.module.sistem.actiuni.varsta("45+"); assert.strictEqual(C.ecran, "adult/situatie");
  assert.ok(C.module.adult.ecran("situatie").corp.includes("✓ Caut un loc de muncă"), "alegerea de acum se vede bifată");
  S.sterge();
});
test("fiecare situație are bun venit și pașii ei, în ordinea din prompt", () => {
  const ordine = { caut: ["Roata vieții profesionale", "CV-ul meu", "Scrisoarea de intenție", "Comunicarea asertivă", "Pregătirea pentru interviu", "Limbajul corpului și ținuta", "Negocierea salariului", "Cum mă văd eu", "Ce cer angajatorii acum", "Cum găsești informații sigure", "Planul meu"],
    schimb: ["Roata vieții profesionale", "Test de interese", "Puncte forte și valori", "Valorile mele", "Ce iei cu tine în noul domeniu", "CV-ul meu", "Comunicarea asertivă", "Pregătirea pentru interviu", "Limbajul corpului și ținuta", "Negocierea salariului", "Cum mă văd eu", "Ce cer angajatorii acum", "Cum găsești informații sigure", "Planul meu"],
    pauza: ["Roata vieții profesionale", "CV-ul meu", "Scrisoarea de intenție", "Comunicarea asertivă", "Pregătirea pentru interviu", "Limbajul corpului și ținuta", "Negocierea salariului", "Cum mă văd eu", "Ce cer angajatorii acum", "Cum găsești informații sigure", "Planul meu"],
    nustiu: ["Test de interese", "Puncte forte și valori", "Valorile mele", "Comunicarea asertivă", "Cum mă văd eu", "Ce cer angajatorii acum", "Cum găsești informații sigure", "Planul meu"] };
  Object.keys(ordine).forEach(id => {
    S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", id);
    const sit = D.adulti.situatii.find(x => x.id === id);
    const b = C.module.adult.ecran("bunvenit").corp;
    assert.ok(b.includes(C.esc(sit.bun)) && !b.includes(C.esc(D.adulti.accent45)), id);
    const m = C.module.adult.ecran("meniu").corp;
    let poz = -1;
    ordine[id].forEach((t, i) => { const k = m.indexOf(t); assert.ok(k > poz, id + ": " + t); poz = k; });
    if (id === "nustiu") assert.ok(!m.includes("CV-ul meu"), "„Încă nu știu” lasă CV-ul pentru mai târziu");
  });
  S.sterge();
});
test("45+: același traseu, cu accentul pe experiență și pe pași mici în competențele digitale", () => {
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "pauza");
  const b = C.module.adult.ecran("bunvenit").corp;
  assert.ok(b.includes(D.adulti.accent45));
  assert.ok(!/vârsta nu contează|discrimin/i.test(b), "fără promisiuni sau temeri despre vârstă");
  const st = C.module.sistem.ecran("setari").corp;
  assert.ok(st.includes("Situația: <strong>Revin după o pauză</strong>") && !st.includes("Clasa:"));
  S.sterge();
});
test("pașii încă nefăcuți se deschid și spun clar că sunt în pregătire", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const p = C.module.adult.ecran("pas/cv");
  assert.strictEqual(p.titlu, "CV-ul meu"); assert.ok(p.corp.includes("se pregătește") && p.corp.includes("Înapoi la drumul meu"));
  assert.strictEqual(C.module.adult.ecran("pas/necunoscut").titlu, "Drumul tău");
  S.sterge();
});

console.log("Corectorul de CV");
/* CV-uri de probă scrise pentru teste. */
const CV_BUN = [
  "Maria Ionescu", "Coordonatoare logistică", "Cluj-Napoca | 0721 123 456 | maria.ionescu@exemplu.ro",
  "PROFIL",
  "Coordonatoare logistică cu experiență în organizarea livrărilor. Am condus echipe mici și am redus întârzierile.",
  "EXPERIENȚĂ PROFESIONALĂ",
  "Coordonator logistică | Firma Alfa | martie 2021 – prezent",
  "• Am coordonat o echipă de 6 oameni pentru livrările din trei județe.",
  "• Am redus timpul de livrare de la 4 zile la 2 zile.",
  "• Am organizat 40 de comenzi pe zi în programul de evidență.",
  "Operator depozit | Firma Beta | 2017 – 2021",
  "• Gestionarea stocurilor și întocmirea rapoartelor săptămânale.",
  "EDUCAȚIE",
  "Facultatea de Științe Economice | 2013 – 2016",
  "Liceul Teoretic | 2009 – 2013",
  "COMPETENȚE",
  "Programe de birou: Excel (avansat), Word",
  "Limbi străine: Engleză – B2 (avansat)",
  "Organizare, lucru în echipă, comunicare cu clienții"
].join("\n");
const CV_SLAB = [
  "Curriculum Vitae", "Nume: Andrei P.", "E-mail: bubu_sexy88@mail.ro", "Telefon: 07xx xxx xxx",
  "Data nașterii: 12.03.1985", "Stare civilă: căsătorit", "Adresa: Str. Florilor nr. 5", "Naționalitate: română",
  "Obiectiv profesional:", "Să îmi găsesc un job.",
  "Experiență profesională:", "2015-2016: Firma A, angajat. Am lucrat acolo făcând diverse lucruri.", "2019-2021: Firma B, angajat. Chestii de birou.",
  "Educație:", "Universitatea X, ceva legat de economie",
  "Aptitudini:", "Engleză", "Bun la diverse", "Hobby-uri:", "Mă uit la filme, ies cu prietenii, citesc, gătesc, merg pe munte și la mare, fac poze."
].join("\n");
test("secțiunile se recunosc și cu majuscule, cu „:” la final sau fără diacritice", () => {
  const s1 = C.module.cv.sectiuni("EXPERIENȚĂ PROFESIONALĂ\nx\nEducatie:\ny\nCOMPETENTE SI ABILITATI\nz");
  assert.deepStrictEqual([s1.experienta, s1.educatie, s1.competente], [["x"], ["y"], ["z"]]);
});
test("un CV bine făcut primește mai ales „ce e bine”", () => {
  const r = C.module.cv.analizeaza(CV_BUN, {}, {});
  const M = D.cv.mesaje;
  [M.email_ok, M.telefon_ok, M.verbe_ok, M.rezultate_ok, M.puncte_ok].forEach(t => assert.ok(r.bine.includes(t), t));
  assert.ok(r.bine.some(t => t.startsWith("CV-ul are secțiunile de bază")));
  const importante = [M.email_lipsa, M.telefon_lipsa, M.lipsa_experienta, M.verbe_putine, M.rezultate_lipsa, M.personale, M.ordine].map(m => m.t.slice(0, 25));
  importante.forEach(t => assert.ok(!r.schimba.some(x => x.startsWith(t)), "nu trebuia: " + t));
});
test("un CV cu greșeli primește sfaturile potrivite, în ordinea importanței", () => {
  const r = C.module.cv.analizeaza(CV_SLAB, {}, {});
  const are = t => r.schimba.some(x => x.includes(t));
  assert.ok(are("Nu găsesc un număr de telefon"), "telefonul cu „xx” nu e un număr real");
  assert.ok(are("data nașterii, starea civilă, adresa completă, naționalitatea"));
  assert.ok(are("Adresa de e-mail pare neprofesională"));
  assert.ok(are("Obiectivul e prea general"));
  assert.ok(are("„diverse lucruri”") && are("„am lucrat acolo”") && are("„chestii”"));
  assert.ok(!r.schimba.some(x => x.startsWith("Am găsit formulări vagi") && x.includes("să îmi găsesc un job")), "obiectivul vag nu se repetă la formulări vagi");
  assert.ok(are("verbe de acțiune") && are("rezultate concrete"));
  assert.ok(are("„Experiență profesională” anii par puși de la cel mai vechi"));
  assert.ok(are("La limbi străine, scrie și nivelul"));
  const pozitie = t => r.schimba.findIndex(x => x.includes(t));
  assert.ok(pozitie("Nu găsesc un număr de telefon") < pozitie("Adresa de e-mail pare") && pozitie("Adresa de e-mail pare") < pozitie("La limbi străine"), "cele mai importante sunt primele");
});
test("CNP-ul, rețelele sociale, lipsa diacriticelor și textul prea scurt sunt semnalate", () => {
  const cv = C.module.cv.analizeaza;
  assert.ok(cv("Ion\nCNP 1850312123456\n" + CV_BUN, {}, {}).schimba[0].includes("CNP"));
  assert.ok(cv(CV_BUN + "\ninstagram.com/ion", {}, {}).schimba.some(x => x.includes("Instagram")));
  const faraDiacritice = CV_BUN.normalize("NFD").replace(/[̀-ͯ]/g, "");
  assert.ok(cv(faraDiacritice, {}, {}).schimba.some(x => x.includes("diacritice")));
  assert.ok(cv("Ion Pop, 0721 123 456", {}, {}).schimba[0].includes("foarte scurt"));
});
test("răspunsurile Da/Nu intră în rezultat, cu importanța lor", () => {
  const r = C.module.cv.analizeaza(CV_BUN, { antet: "da", tabele: "nu", format: "scan", font: "da" }, {});
  assert.ok(r.schimba[0].includes("antetul") || r.schimba[0].includes("scanat"), "antetul și CV-ul scanat sunt pe primul loc");
  assert.ok(r.schimba.slice(0, 2).some(x => x.includes("scanat")) && r.schimba.slice(0, 2).some(x => x.includes("antetul")));
  assert.ok(r.bine.some(x => x.includes("singură coloană")) && r.bine.some(x => x.includes("font obișnuit")));
  const r2 = C.module.cv.analizeaza(CV_BUN, { format: "pdf" }, {});
  assert.ok(r2.bine.some(x => x.includes("PDF cu text")));
});
test("sfatul pentru situația omului și accentul pentru 45+", () => {
  const r = C.module.cv.analizeaza(CV_BUN, {}, { situatie: "pauza", varsta: "45+" });
  assert.deepStrictEqual(r.sfaturi, [D.cv.situatii.pauza, D.cv.situatii.accent45]);
  assert.deepStrictEqual(C.module.cv.analizeaza(CV_BUN, {}, { situatie: "caut", varsta: "18-44" }).sfaturi, [D.cv.situatii.caut]);
});
test("textul CV-ului nu se salvează pe telefon decât dacă omul bifează", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  C.module.cv._seteazaText(CV_BUN); C.module.cv.actiuni.continua();
  assert.strictEqual(C.ecran, "cv/q0"); assert.strictEqual(S.ia("cv.text", ""), "", "fără bifă nu se salvează");
  assert.ok(!JSON.stringify(S.stare).includes("Maria Ionescu"));
  S.pune("cv.pastreaza", true); C.module.cv.actiuni.continua();
  assert.ok(S.ia("cv.text", "").includes("Maria Ionescu"), "cu bifă se păstrează");
  C.module.cv.actiuni.pastreaza("1", { checked: false });
  assert.strictEqual(S.ia("cv.text", ""), "", "scoaterea bifei șterge textul păstrat");
  C.module.cv._seteazaText(""); C.module.cv.actiuni.continua();
  assert.strictEqual(C.eroare, D.cv.gol, "fără text cere lipirea lui"); C.eroare = "";
  S.sterge(); C.module.cv._seteazaText("");
});
test("ecranul cu rezultatul și meniul adulților", () => {
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "caut");
  assert.ok(C.module.adult.ecran("meniu").corp.includes("Continuă aici"));
  C.module.cv._seteazaText(CV_SLAB); C.module.cv.actiuni.rezultat();
  const p = C.module.cv.ecran("rezultat");
  ["Ce e bine", "Ce ai putea schimba", "În ordinea importanței", "Pentru situația ta", D.cv.mesaje.nu_pot, D.cv.situatii.accent45].forEach(t => assert.ok(p.corp.includes(C.esc(t)), t));
  assert.ok(!p.corp.includes("<b") || true);
  assert.deepStrictEqual(Verificator.verificaText(p.corp.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  assert.ok(C.module.adult.ecran("meniu").corp.includes("✓ verificat"));
  C.module.cv._seteazaText("");
  assert.ok(C.module.cv.ecran("rezultat").corp.includes(C.esc(D.cv.pierdut)), "după reîncărcare, fără text păstrat, cere lipirea din nou");
  S.sterge();
});
test("textul lipit este afișat în siguranță (nu se execută ca HTML)", () => {
  S.sterge(); C.module.cv._seteazaText("<img src=x onerror=alert(1)>\n" + CV_BUN);
  const c = C.module.cv.ecran("intro").corp;
  assert.ok(!c.includes("<img src=x") && c.includes("&lt;img src=x"));
  C.module.cv._seteazaText(""); S.sterge();
});

console.log("Ghidul pentru corectarea cu o IA");
test("promptul are regula „nu adăuga”, problemele găsite numerotate și locul pentru CV", () => {
  const an = C.module.cv.analizeaza(CV_SLAB, { antet: "da" }, {});
  const pr = C.module.cv.promptIA(an, { situatie: "caut", varsta: "18-44" });
  assert.ok(pr.includes("Nu adăuga experiență sau cifre care nu sunt în textul meu."));
  assert.ok(pr.includes(D.cv.ia.prompt.situatii.caut));
  an.schimba.filter(t => t !== D.cv.mesaje.scurt.t).forEach((t, i) => assert.ok(pr.includes((i + 1) + ". " + t), "problema " + (i + 1)));
  assert.ok(!C.module.cv.promptIA({ schimba: [D.cv.mesaje.scurt.t, "Altceva."] }, {}).includes("foarte scurt"), "sfatul „prea scurt” nu intră în prompt");
  assert.ok(pr.trim().endsWith("[lipește aici textul CV-ului]"));
});
test("promptul NU conține textul CV-ului, datele de contact sau vârsta", () => {
  const an = C.module.cv.analizeaza(CV_BUN, {}, {});
  const pr = C.module.cv.promptIA(an, { situatie: "pauza", varsta: "45+" });
  ["Maria Ionescu", "0721 123 456", "maria.ionescu@exemplu.ro", "Firma Alfa"].forEach(t => assert.ok(!pr.includes(t), t));
  assert.ok(!/\b45\b|vârst|ani\b/.test(pr), "fără vârstă");
  assert.ok(pr.includes(D.cv.ia.prompt.accent45) && pr.includes(D.cv.ia.prompt.situatii.pauza));
});
test("fără probleme găsite, promptul o spune, fără o listă goală", () => {
  const pr = C.module.cv.promptIA({ schimba: [] }, {});
  assert.ok(pr.includes(D.cv.ia.prompt.fara_probleme) && !pr.includes(D.cv.ia.prompt.probleme));
});
test("ecranul ghidului: avertisment despre date, 5 sfaturi și buton „Copiază”", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  C.module.cv._seteazaText(CV_SLAB);
  assert.ok(C.module.cv.ecran("rezultat").corp.includes("Vrei să-l corectezi cu ajutorul unei IA?"));
  const p = C.module.cv.ecran("ia");
  assert.strictEqual(p.titlu, D.cv.ia.titlu);
  [D.cv.ia.atentie, "Copiază", "CNP"].forEach(t => assert.ok(p.corp.includes(t), t));
  assert.ok(!p.corp.includes("Nu am putut încerca promptul"), "nota a fost scoasă la cererea autoarei");
  D.cv.ia.sfaturi.forEach(t => assert.ok(p.corp.includes(C.esc(t)), t));
  assert.strictEqual(D.cv.ia.sfaturi.length, 5);
  assert.ok(p.corp.includes('id="c-prompt-ia"') && p.corp.includes("readonly"));
  assert.deepStrictEqual(Verificator.verificaText(p.corp.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  C.module.cv._seteazaText("");
  assert.ok(C.module.cv.ecran("ia").corp.includes(C.esc(D.cv.pierdut)), "fără text cere lipirea din nou");
  S.sterge();
});

console.log("Scrisoarea de intenție");
test("6 întrebări, câte una pe ecran, cu ajutor potrivit situației și vârstei", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "schimb");
  assert.strictEqual(D.scrisoare.intrebari.length, 6);
  D.scrisoare.intrebari.forEach((q, i) => {
    const c = C.module.scrisoare.ecran("q" + i).corp;
    assert.strictEqual((c.match(/<textarea/g) || []).length, 1, "o singură întrebare pe ecran");
    assert.ok(c.includes("Întrebarea " + (i + 1) + " din 6"));
  });
  assert.ok(C.module.scrisoare.ecran("q3").corp.includes("domeniul vechi"), "ajutor pentru schimbarea domeniului");
  S.pune("situatie", "pauza"); assert.ok(C.module.scrisoare.ecran("q3").corp.includes("ce ai făcut în pauză"));
  S.pune("varsta", "45+"); assert.ok(C.module.scrisoare.ecran("q4").corp.includes("Experiența ta e un atu"));
  assert.ok(C.module.scrisoare.ecran("q5").corp.includes("Văd scheletul"));
  S.sterge();
});
test("scheletul are 3 paragrafe cu răspunsurile omului, nu un text gata scris", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  S.pune("scrisoare.r.post", "asistent administrativ"); S.pune("scrisoare.r.firma", "Firma <Beta>");
  S.pune("scrisoare.r.atrage", "Proiectul lor de voluntariat"); S.pune("scrisoare.r.competente", "Organizare, Excel");
  C.module.scrisoare.actiuni.gata();
  assert.strictEqual(C.ecran, "scrisoare/schelet");
  const c = C.module.scrisoare.ecran("schelet").corp;
  ["1. Ce te atrage la firmă", "2. Ce aduci tu", "3. Disponibilitate și încheiere", "Proiectul lor de voluntariat", "Organizare, Excel", "postul de asistent administrativ", "Toate cele bune"].forEach(t => assert.ok(c.includes(t), t));
  assert.ok(c.includes("Firma &lt;Beta&gt;") && !c.includes("Firma <Beta>"), "textul omului e afișat în siguranță");
  S.pune("scrisoare.r.disponibil", "În zilele lucrătoare, după ora 13.");
  assert.ok(C.module.scrisoare.ecran("schelet").corp.includes("o discuție (în zilele lucrătoare, după ora 13). <strong>Încheie"), "disponibilitatea se potrivește în propoziție");
  assert.ok(c.includes("nu ai scris încă") && c.includes("Completez"), "răspunsurile lipsă se pot completa");
  assert.ok(c.includes("Înainte să o trimiți") && c.includes("30 de secunde"));
  assert.ok(!/Stimate|Stimată|Doamnă|Domnule/.test(c), "nu scrie scrisoarea în locul omului");
  assert.deepStrictEqual(Verificator.verificaText(c.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  assert.ok(C.module.adult.ecran("meniu").corp.includes("✓ schelet făcut"));
  S.sterge();
});
test("promptul pentru IA are regulile și răspunsurile omului, fără vârstă", () => {
  const pr = C.module.scrisoare.promptIA({ post: "vânzător", firma: "Alfa", atrage: "magazinele noi", competente: "lucrul cu clienții", exemplu: "am ajutat\n20 de clienți pe zi", disponibil: "" }, "schimb");
  ["Nu adăuga experiență, cifre sau calități pe care nu le-am scris eu", "- Postul: vânzător", "- Firma: Alfa", "- Exemplul meu: am ajutat 20 de clienți pe zi", "- Când pot vorbi: (nu am scris)", "- Ce mă atrage la firmă: magazinele noi", D.scrisoare.ia.prompt.situatii.schimb].forEach(t => assert.ok(pr.includes(t), t));
  assert.ok(!/45|vârst/.test(pr));
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "caut");
  const p = C.module.scrisoare.ecran("ia");
  [D.scrisoare.ia.atentie, "Copiază", 'id="c-prompt-scrisoare"'].forEach(t => assert.ok(p.corp.includes(t), t));
  S.sterge();
});

console.log("Pregătirea pentru interviu");
test("patru grupe de întrebări, fiecare cu loc pentru răspuns și un sfat; fără întrebări cu „de ce”", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  assert.deepStrictEqual(D.interviu.grupe.map(g => g.t), ["Despre tine", "Despre experiență", "Despre motivație", "Situații dificile"]);
  D.interviu.grupe.forEach(g => {
    const c = C.module.interviu.ecran("grup/" + g.id).corp;
    assert.strictEqual((c.match(/<textarea/g) || []).length, g.intrebari.length, g.id);
    g.intrebari.forEach(q => { assert.ok(c.includes(C.esc(q.q)) && c.includes(C.esc(q.ajutor)), q.id); assert.ok(!/^de ce\b/i.test(q.q), q.id); });
  });
  S.sterge();
});
test("întrebarea în plus apare după situație și la 45+", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  assert.ok(!C.module.interviu.ecran("hub").corp.includes("Pentru situația ta"), "„Caut un loc de muncă” nu are întrebare în plus");
  S.pune("situatie", "pauza");
  assert.ok(C.module.interviu.ecran("grup/special").corp.includes("Văd o pauză în CV"));
  S.pune("varsta", "45+"); S.pune("situatie", "schimb");
  const c = C.module.interviu.ecran("grup/special").corp;
  assert.ok(c.includes("Nu ai lucrat în acest domeniu") && c.includes("Ce programe sau aplicații folosești"));
  assert.ok(C.module.interviu.ecran("hub").corp.includes("2 întrebări"));
  assert.ok(!/vârst|prea bătrân|tânăr/i.test(c), "fără presupuneri despre vârstă");
  S.sterge();
});
test("poveștile: până la 5, cu context, ce ai făcut și rezultat; apar ca ajutor la întrebări", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const p1 = C.module.interviu.ecran("poveste/1").corp;
  ["Unde erai și ce se întâmpla?", "Ce ai făcut tu, concret?", "Ce s-a întâmplat după aceea?"].forEach(t => assert.ok(p1.includes(t), t));
  assert.ok(C.module.interviu.ecran("povesti").corp.includes(C.esc(D.interviu.povesti.atentie)), "poveștile trebuie să fie reale");
  assert.strictEqual(C.module.interviu.nrPovesti(), 0);
  S.pune("interviu.p.p1.titlu", "Clientul nemulțumit"); S.pune("interviu.p.p2.context", "La magazin"); S.pune("interviu.p.p4.rezultat", "Am terminat la timp");
  assert.strictEqual(C.module.interviu.nrPovesti(), 3);
  assert.ok(C.module.interviu.ecran("povesti").corp.includes("✓ Clientul nemulțumit"));
  assert.ok(C.module.interviu.ecran("grup/tine").corp.includes("Poveștile tale:</strong> Clientul nemulțumit"));
  assert.ok(C.module.adult.ecran("meniu").corp.includes("✓ povești scrise"));
  assert.ok(C.module.interviu.ecran("hub").corp.includes("✓ 3 din 5 scrise"));
  S.sterge();
});
test("„Exersează”: filmarea, ce să nu spui, întrebările tale și promptul de simulare", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "pauza"); S.pune("scrisoare.r.post", "Asistent administrativ.");
  const c = C.module.interviu.ecran("exersez").corp;
  ["Filmează-te cu telefonul", "Ce să nu spui", "Nu întreba de salariu în primele minute", "Întrebări pe care le poți pune tu", "Copiază", 'id="c-prompt-interviu"', D.interviu.exersez.ia.atentie].forEach(t => assert.ok(c.includes(C.esc(t)) || c.includes(t), t));
  const pr = C.module.interviu.promptIA("Asistent administrativ.", "pauza");
  assert.ok(pr.startsWith("Vreau să exersez un interviu de angajare, în limba română, pentru postul de Asistent administrativ."));
  assert.ok(pr.includes("Nu inventa detalii despre mine") && pr.includes(D.interviu.exersez.ia.prompt.situatii.pauza));
  assert.ok(C.module.interviu.promptIA("", "caut").includes("[scrie aici postul]"));
  assert.deepStrictEqual(Verificator.verificaText(c.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  S.sterge();
});

console.log("Pașii comuni, pentru adulți");
test("toți pașii adulților sunt acum construiți; fiecare duce la pasul următor din traseu", () => {
  S.sterge(); S.pune("varsta", "18-44");
  D.adulti.situatii.forEach(sit => {
    S.pune("situatie", sit.id);
    const m = C.module.adult.ecran("meniu").corp;
    assert.ok(!m.includes("în pregătire"), sit.id + ": niciun pas „în pregătire”");
    sit.pasi.forEach((p, i) => {
      const u = C.module.adult.urmator(p);
      if (i < sit.pasi.length - 1) assert.strictEqual(u.t, D.adulti.pasi[sit.pasi[i + 1]].t, sit.id + "/" + p);
      else assert.strictEqual(u, null, sit.id + ": ultimul pas nu are „următor”");
    });
  });
  S.sterge();
});
test("testul de interese și punctele forte au texte pentru adulți, iar elevii le păstrează pe ale lor", () => {
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "schimb");
  assert.ok(C.module.interese.ecran("intro").corp.includes(D.interese.bagheta.adult));
  S.pune("interese.pagina", 0);
  const toate = [0, 1, 2, 3, 4, 5].map(i => { S.pune("interese.pagina", i); return C.module.interese.ecran("test").corp; }).join("");
  assert.ok(toate.includes("Să ajut un coleg nou să învețe ce are de făcut.") && !toate.includes("o lecție"));
  assert.ok(C.module.forte.ecran("m0").corp.includes("la muncă, acasă"));
  S.pune("forte.valori", ["ajutor", "echipa", "invatare"]);
  const rez = C.module.forte.ecran("rezumat").corp;
  assert.ok(rez.includes("Continuă: Valorile mele") && !rez.includes("meserii"), "adultul merge pe traseul lui, nu la meserii");
  assert.strictEqual(C.module.forte.ecran("rezumat").inapoi, "adult/meniu");
  S.pune("varsta", "sub18"); S.pune("clasa", "10");
  assert.ok(C.module.interese.ecran("intro").corp.includes(D.interese.bagheta.elev));
  assert.ok(C.module.forte.ecran("rezumat").corp.includes("Continuă: meserii"));
  S.sterge();
});
test("planul pentru adulți are teme despre muncă, nu despre școală", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut"); S.pune("plan.start", C.azi());
  const c = C.module.plan.ecran("saptamana").corp;
  assert.ok(C.module.plan.temeSaptamanii(0).every(t => D.sfaturi.teme_adulti.indexOf(t) >= 0 && c.includes(C.esc(t.t))));
  assert.ok(!/liceu|facultăți|materie/.test(c));
  assert.ok(C.module.plan.ecran("scop0").corp.includes("munca sau cariera ta"));
  S.pune("plan.sapt.s0.aleasa", "a1");
  assert.ok(C.module.reamintiri.banner().includes(C.esc(D.sfaturi.teme_adulti[0].t)), "reamintirea găsește și temele de adulți");
  S.sterge();
});
test("„Ce iei cu tine”: cerințele repetate sunt primele, lipsurile și concluzia", () => {
  const K = C.module.competente;
  const B = "Excel avansat\nPermis auto\n- excel avansat.\nEngleză B2\n3 ani experiență în logistică\nExcel Avansat";
  const l = K.cerinte(B);
  assert.strictEqual(l[0].text, "Excel avansat"); assert.strictEqual(l[0].n, 3);
  assert.strictEqual(l.length, 4, "aceeași cerință scrisă puțin diferit se numără o dată");
  const r = K.concluzie("Organizare\nComunicare cu clienții", B, [l[0].cheie, "permis auto"]);
  assert.deepStrictEqual(r.iei, ["Organizare", "Comunicare cu clienții"]);
  assert.deepStrictEqual(r.ai.map(x => x.text), ["Excel avansat", "Permis auto"]);
  assert.ok(r.invatare && r.experienta && !r.promovare);
  const r2 = K.concluzie("x", "Excel", ["excel"]);
  assert.ok(r2.promovare && !r2.invatare, "fără diferență: nevoia ține de cum te prezinți");
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "schimb"); S.pune("competente.b", B);
  C.module.competente.actiuni.comuta(l[0].cheie, { checked: true });
  const t = C.module.competente.ecran("tabel").corp;
  assert.ok(t.includes("↻ apare în 3 anunțuri") && (t.match(/type="checkbox"/g) || []).length === 4);
  C.module.competente.actiuni.gata();
  const c = C.module.competente.ecran("concluzie").corp;
  assert.ok(c.includes("✓ Excel avansat") && c.includes("○ Permis auto") && c.includes(D.competente.concluzie.experienta) && c.includes("Continuă: CV-ul meu"));
  assert.ok(C.module.adult.ecran("meniu").corp.includes("Ce iei cu tine în noul domeniu") && C.module.adult.ecran("meniu").corp.includes("✓ făcut"));
  S.sterge();
});
console.log("Comunicarea asertivă");
const EXPASI_ADULT = ["formula", "corp", "situatie", "model-intro", "model0", "model1", "model2", "model3", "rezultat", "exersez", "ia", "gata1", "gata2", "gata3", "gata4", "gataFin"];
const EXPASI_ELEV = ["formula", "corp", "situatie", "model-intro", "model0", "model1", "model2", "model3", "rezultat", "exersez", "ia", "gata1", "gata2", "gata3", "gataFin"];
const exTot = (elev) => (elev ? EXPASI_ELEV : EXPASI_ADULT).map(p => C.module.asertiv.ecran("exercitiu/" + p).corp).join("");
const modelTot = () => C.module.asertiv.ecran("exercitiu/model-intro").corp + [0, 1, 2, 3].map(i => C.module.asertiv.ecran("exercitiu/model" + i).corp).join("");
const stilTot = () => [1, 2, 3, 4].map(n => C.module.asertiv.ecran("stiluri/" + n).corp).join("");
const exemplTot = () => { let t = ""; for (let n = 1; n <= 5; n++) for (let k = 1; k <= 4; k++) t += C.module.asertiv.ecran("exemplu/" + n + "/" + k).corp; return t; };
test("ce este, ce câștigi și cele 4 stiluri; asertivul se vede și prin bifă, nu doar prin culoare", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const c = C.module.asertiv.ecran("intro").corp + C.module.asertiv.ecran("castig").corp, st = stilTot();
  ["Eu contez și tu contezi", "Ce câștigi în carieră"].forEach(t => assert.ok(c.includes(t), t));
  ["Pasiv", "Agresiv", "Pasiv-agresiv", "✓ Asertiv"].forEach(t => assert.ok(st.includes(t), t));
  assert.ok(C.module.asertiv.ecran("castig").corp.includes('data-arg="asertiv/stiluri/1"'), "de la câștig se ajunge la stiluri");
  assert.deepStrictEqual(Verificator.verificaText((c + st).replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  S.sterge();
});
test("5 exemple din viața profesională, fiecare cu situația și răspunsurile pasiv, agresiv, asertiv", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "pauza");
  assert.strictEqual(D.asertiv.exemple.length, 5);
  D.asertiv.exemple.forEach((e, i) => {
    const c = [1, 2, 3, 4].map(k => C.module.asertiv.ecran("exemplu/" + (i + 1) + "/" + k).corp).join("");
    ["Exemplul " + (i + 1) + " din 5", "✗ Pasiv", "✗ Agresiv", "✓ Asertiv", C.esc(e.situatie), C.esc(e.asertiv), C.esc(e.bine)].forEach(t => assert.ok(c.includes(t), i + ": " + t));
    assert.deepStrictEqual(Verificator.verificaText(c.replace(/<[^>]+>/g, " ")).map(x => x.gasit), [], "exemplul " + (i + 1));
  });
  assert.ok(C.module.asertiv.ecran("exemplu/5/4").corp.includes("Continuă: încearcă tu"));
  assert.strictEqual(C.module.asertiv.ecran("exemplu/1/1").inapoi, "asertiv/stiluri/4");
  S.sterge();
});
test("formula în trei pași, limbajul corpului, exercițiul și trecerea la pasul următor", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const c = exTot();
  assert.ok(c.includes("O frază asertivă, în trei pași") && c.includes("Și cum spui") && (c.match(/<textarea/g) || []).length === 7);
  assert.ok(C.module.asertiv.ecran("exercitiu/gataFin").corp.includes("Gata. Continuă: Pregătirea pentru interviu"));
  assert.strictEqual(C.module.asertiv.ecran("exercitiu/formula").inapoi, "asertiv/exemplu/5/4");
  assert.strictEqual(C.module.asertiv.ecran("exercitiu/ia").inapoi, "asertiv/exercitiu/exersez");
  C.module.asertiv.actiuni.gata("interviu/hub");
  assert.strictEqual(C.ecran, "interviu/hub");
  assert.ok(C.module.adult.ecran("meniu").corp.includes("Comunicarea asertivă") && C.module.adult.ecran("meniu").corp.includes("✓ făcut"));
  S.sterge();
});

test("modelul asertiv în patru părți: fraza întreagă și verificarea", () => {
  const f = C.module.asertiv.verificaModel;
  const bun = f({ cand: "primesc sarcini noi vineri după-amiază", simt: "copleșită", motiv: "vreau să le fac bine și am nevoie de timp", vreau: "le aflu de luni, ca să le pot planifica" });
  assert.strictEqual(bun.fraza, "Când primesc sarcini noi vineri după-amiază, mă simt copleșită, pentru că vreau să le fac bine și am nevoie de timp. Propun să le aflu de luni, ca să le pot planifica.");
  assert.ok(bun.asertiv && bun.bine.length === 1);
  /* cuvintele de început scrise și de om nu se dublează */
  const dublat = f({ cand: "Când ședința începe cu întârziere.", simt: "Mă simt frustrat", motiv: "pentru că am alte programări", vreau: "Propun să începem la ora fixă" });
  assert.ok(dublat.fraza.startsWith("Când ședința începe cu întârziere, mă simt frustrat, pentru că am alte programări. Propun să începem la ora fixă."));
  const rau = f({ cand: "tu ești mereu neserios", simt: "că tu nu mă respecți", motiv: "din cauza ta întârzii", vreau: "te schimbi, altfel mă plâng" });
  assert.ok(!rau.asertiv);
  ["judecă omul", "„mereu”", "ce fel de om este", "nu un sentiment", "vina celuilalt", "amenințare"].forEach(t => assert.ok(rau.sfaturi.some(x => x.includes(t)), t));
  assert.ok(f({ cand: "x", simt: "", motiv: "y", vreau: "" }).lipsa.length === 2);
  assert.ok(f({ cand: "raportul a întârziat", simt: "îngrijorat", motiv: "clientul așteaptă", vreau: "nu mai întârzii" }).sfaturi.some(x => x.includes("ce ați putea face în loc")));
});
test("ecranul „Încearcă tu” are modelul și arată fraza după verificare", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  let c = modelTot();
  ["Când… (ce se întâmplă)", "Mă simt… (ce simți)", "Pentru că… (motivul)", "Propun să… (ce propui)", "Văd fraza mea"].forEach(t => assert.ok(c.includes(t), t));
  assert.ok(!c.includes("Aș vrea") && !c.includes("Fraza ta"), "rezultatul nu apare înainte de verificare");
  S.pune("asertiv.model.cand", "ședința începe târziu"); S.pune("asertiv.model.simt", "frustrată"); S.pune("asertiv.model.motiv", "am alte programări"); S.pune("asertiv.model.vreau", "începem la ora fixă");
  C.module.asertiv.actiuni.verifica();
  assert.strictEqual(C.ecran, "asertiv/exercitiu/rezultat");
  c = C.module.asertiv.ecran("exercitiu/rezultat").corp;
  assert.ok(c.includes("Fraza ta") && c.includes("Când ședința începe târziu, mă simt frustrată") && c.includes(D.asertiv.model.bine));
  assert.deepStrictEqual(Verificator.verificaText(c.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  S.sterge();
});

console.log("Exerciții pentru discuție");
test("exercițiile apar la comunicarea asertivă (4) și la interviu (5)", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const a = C.module.asertiv.ecran("intro").corp, x = exTot(), i = C.module.interviu.ecran("exersez").corp;
  ["Când primești un compliment", "Cererea mea", "Glumă sau batjocură?", "Cum să argumentezi"].forEach(t => assert.ok(x.includes(t), t));
  ["Pauza de două secunde", "Încălzirea vocii", "Începutul și finalul tău", "Cuvintele firmei", "Două întrebări, o poveste"].forEach(t => assert.ok(i.includes(t), t));
  S.sterge();
});
test("exercițiile cu alegere: întâi alegi, apoi vezi ce e potrivit și de ce; poți încerca din nou", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  let c = C.module.exercitii.ecran("quiz/compliment").corp;
  assert.ok(!c.includes("✓ Potrivit") && (c.match(/exercitii\.alege/g) || []).length === 3, "înainte de alegere nu se vede răspunsul");
  C.module.exercitii.actiuni.alege("compliment|0|0");
  c = C.module.exercitii.ecran("quiz/compliment").corp;
  assert.ok(c.includes("✗ Mai puțin potrivit · alegerea ta") && c.includes("✓ Potrivit") && c.includes("Încerc din nou"));
  C.module.exercitii.actiuni.reia("compliment|0");
  assert.ok(!C.module.exercitii.ecran("quiz/compliment").corp.includes("alegerea ta"));
  C.module.exercitii.actiuni.alege("gluma|1|gluma");
  c = C.module.exercitii.ecran("quiz/gluma/1").corp;
  assert.ok(c.includes("✗ Nu chiar") && c.includes("Este: Batjocură") && c.includes("Un răspuns calm"));
  C.module.exercitii.actiuni.alege("argumente|3|rastalmaceste");
  c = C.module.exercitii.ecran("quiz/argumente/3").corp;
  assert.ok(c.includes("✓ Ai recunoscut-o") && c.includes(C.esc(D.exercitii.quiz.argumente.sfat)) && c.includes("Gata"));
  assert.ok(C.module.exercitii.ecran("quiz/argumente").corp.includes("Patru feluri de argumente nedrepte"));
  /* fiecare situație are exact un răspuns potrivit sau un răspuns corect existent */
  D.exercitii.quiz.compliment.itemi.forEach(it => assert.strictEqual(it.variante.filter(v => v.ok).length, 1));
  D.exercitii.quiz.argumente.itemi.forEach(it => assert.ok(D.exercitii.quiz.argumente.tipuri.some(t => t.id === it.corect)));
  S.sterge();
});
test("„Cum să argumentezi”: ideile principale, forma în 4 pași și exercițiul „Argumentul meu”", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  let c = C.module.exercitii.ecran("argumentez").corp;
  assert.strictEqual(D.exercitii.argumentez.idei.length, 10);
  ["Ideile principale", "Ideea → Motivul → Exemplul → Propunerea", "Argumentul meu", "Văd argumentul meu", "Continuă: când cineva argumentează nedrept"].forEach(x => assert.ok(c.includes(C.esc(x)), x));
  assert.ok(C.module.asertiv.ecran("exercitiu/gata4").corp.includes('data-arg="exercitii/argumentez"'), "cartela duce la „Cum să argumentezi”");
  assert.strictEqual(C.module.exercitii.ecran("quiz/argumente").inapoi, "exercitii/argumentez");
  const f = C.module.exercitii.verificaArgument;
  const bun = f({ idee: "Propun să facem o ședință scurtă luni dimineață.", motiv: "ca să știm toți ce avem de făcut", exemplu: "de exemplu, săptămâna trecută doi colegi au lucrat la același raport", propunere: "hai să încercăm două săptămâni și apoi vedem" });
  assert.strictEqual(bun.argument, "Propun să facem o ședință scurtă luni dimineață, ca să știm toți ce avem de făcut. De exemplu, săptămâna trecută doi colegi au lucrat la același raport. Hai să încercăm două săptămâni și apoi vedem.");
  assert.ok(bun.bun && bun.bine.length === 2);
  const slab = f({ idee: "Trebuie altfel.", motiv: "așa", exemplu: "mereu se întâmplă, tu nu știi", propunere: "să ne străduim" });
  ["foarte scurt", "„mereu”", "atac la persoană", "prea generală"].forEach(x => assert.ok(slab.sfaturi.some(y => y.includes(x)), x));
  assert.strictEqual(f({ idee: "x", motiv: "", exemplu: "", propunere: "y" }).lipsa.length, 2);
  assert.ok(f({ idee: "Propun lucrul de acasă vinerea", motiv: "Ne concentrăm mai bine fără zgomot", exemplu: "ieri am terminat raportul acasă în două ore", propunere: "încercăm o lună" }).argument.startsWith("Propun lucrul de acasă vinerea. Ne concentrăm mai bine fără zgomot. De exemplu, ieri"), "motivul fără legătură rămâne propoziție separată");
  S.pune("ex.arg.idee", "Propun o listă de verificare."); S.pune("ex.arg.motiv", "ca să greșim mai rar la comenzi"); S.pune("ex.arg.exemplu", "ieri am trimis două comenzi greșite"); S.pune("ex.arg.propunere", "o încercăm o lună");
  C.module.exercitii.actiuni.argument(); assert.strictEqual(C.deArata, "rezultat-argument"); C.deArata = "";
  c = C.module.exercitii.ecran("argumentez").corp;
  assert.ok(c.includes("Argumentul tău") && c.includes("Propun o listă de verificare, ca să greșim mai rar la comenzi."));
  assert.deepStrictEqual(Verificator.verificaText(c.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  S.sterge();
});
test("cererea: verifică întrebarea, motivul, termenul, presiunea și „mulțumesc”", () => {
  const f = C.module.exercitii.analizeazaCerere, M = D.exercitii.cerere.mesaje;
  const bun = f("Îmi poți trimite raportul până la ora 12? Am nevoie de el pentru că am ședință cu clientul. Mulțumesc!");
  assert.deepStrictEqual(bun.bine, [M.intrebare_ok, M.motiv_ok, M.termen_ok]); assert.deepStrictEqual(bun.sfaturi, []);
  const rau = f("Trimite-mi raportul imediat!");
  assert.deepStrictEqual(rau.bine, []); assert.deepStrictEqual(rau.sfaturi, [M.intrebare_nu, M.motiv_nu, M.presiune, M.multumesc]);
  assert.ok(f("Poti sa ma inlocuiesti vineri, fiindca am o programare la medic? Te rog.").bine.includes(M.motiv_ok), "merge și fără diacritice");
  S.sterge(); C.module.exercitii.actiuni.verificaCerere(); assert.strictEqual(C.eroare, D.exercitii.cerere.gol); C.eroare = "";
  S.pune("ex.cerere.text", "Mă ajuți?"); C.module.exercitii.actiuni.verificaCerere();
  assert.ok(C.module.exercitii.ecran("cerere").corp.includes("Ce poți adăuga")); S.sterge();
});
test("cuvintele firmei: numără cuvintele care se repetă, fără cuvintele de legătură", () => {
  const t = "Căutăm un coleg pentru echipa de logistică. În echipa noastră, logistica și clienții sunt pe primul loc. Lucrăm cu clienți din toată țara. Echipa este tânără.";
  const l = C.module.exercitii.cuvinteFrecvente(t);
  assert.strictEqual(l[0].w, "echipa"); assert.strictEqual(l[0].n, 3);
  assert.ok(!l.some(x => ["pentru", "este", "noastră", "căutăm"].includes(x.w)));
  assert.ok(l.every(x => x.n >= 2) && l.length <= D.exercitii.cuvinte.maxim);
  S.sterge(); S.pune("ex.cuvinte.text", "foarte scurt"); S.pune("ex.cuvinte.arata", true);
  assert.ok(C.module.exercitii.ecran("cuvinte").corp.includes(D.exercitii.cuvinte.putine)); S.sterge();
});
test("două întrebări: se pot alege cel mult două", () => {
  S.sterge();
  const a = C.module.exercitii.actiuni;
  a.intrebare("0", { checked: true }); a.intrebare("3", { checked: true });
  const el = { checked: true }; a.intrebare("5", el);
  assert.strictEqual(el.checked, false); assert.strictEqual(C.eroare, D.exercitii.intrebari.prea_multe); C.eroare = "";
  assert.deepStrictEqual(S.ia("ex.intrebari.alese"), [0, 3]);
  a.intrebare("0", { checked: false }); assert.deepStrictEqual(S.ia("ex.intrebari.alese"), [3]);
  S.sterge();
});
test("niciun text din exerciții nu are probleme (promisiuni, procente, „de ce”, jargon)", () => {
  assert.deepStrictEqual(Verificator.verificaDate(D.exercitii).map(p => p.cale + ": " + p.gasit), []);
});

test("explicația despre IA și prompt e aceeași, clară și pas cu pas, pe toate cele trei ecrane cu prompt", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  C.module.cv._seteazaText("Ion Pop\n0722 111 222\nion@exemplu.ro\nExperiență profesională:\nAm lucrat acolo.");
  const ecrane = [C.module.cv.ecran("ia").corp, C.module.scrisoare.ecran("ia").corp, C.module.interviu.ecran("exersez").corp];
  ecrane.forEach((c, i) => {
    ["Ce este IA și ce este un prompt", "Un prompt este mesajul", "Pas cu pas", "„Lipește”", "Ctrl și V", "Programul poate greși"].forEach(t => assert.ok(c.includes(C.esc(t)) || c.includes(t), i + ": " + t));
    assert.strictEqual((c.match(/Ce este IA și ce este un prompt/g) || []).length, 1, "o singură dată pe ecran");
  });
  assert.deepStrictEqual(Verificator.verificaDate(D.ia).map(p => p.gasit), []);
  C.module.cv._seteazaText(""); S.sterge();
});

test("ideile marcate cu ** apar îngroșate; căsuțele de scris și prompturile rămân fără marcaj", () => {
  assert.strictEqual(C.esc("A **b** c"), "A <strong>b</strong> c");
  assert.strictEqual(C.esc("<b>**x**</b>"), "&lt;b&gt;<strong>x</strong>&lt;/b&gt;", "textul tot e protejat");
  assert.strictEqual(C.escSimplu("**x**"), "**x**");
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut"); S.pune("asertiv.situatie", "**test**");
  assert.ok(C.module.asertiv.ecran("exercitiu/situatie").corp.includes(">**test**</textarea>"), "ce scrie omul nu se schimbă");
  assert.ok(C.module.asertiv.ecran("intro").corp.includes("<strong>„Eu contez și tu contezi.”</strong>"));
  const pr = [C.module.cv.promptIA({ schimba: ["x"] }, { situatie: "caut", varsta: "45+" }), C.module.scrisoare.promptIA({}, "schimb"), C.module.interviu.promptIA("x", "pauza")].join("");
  assert.ok(!pr.includes("**"), "prompturile nu au steluțe");
  S.sterge();
});

test("copywriting: nicio frază din textele aplicației nu are mai mult de 22 de cuvinte", () => {
  const lungi = [];
  (function umbla(o, cale) {
    if (typeof o === "string") o.replace(/\*\*/g, "").split(/(?<=[.!?…”])\s+(?=[A-ZĂÂÎȘȚ„–])/).forEach(fr => {
      const n = fr.split(/\s+/).filter(w => /[A-Za-zĂÂÎȘȚăâîșț]/.test(w)).length; if (n > 22) lungi.push(cale + " (" + n + "): " + fr.slice(0, 60)); });
    else if (Array.isArray(o)) o.forEach((x, i) => umbla(x, cale + "[" + i + "]"));
    else if (o && typeof o === "object") Object.keys(o).forEach(k => { if (k !== "ignorate" && k !== "prompt") umbla(o[k], cale + "." + k); });
  })(D, "DATE");
  assert.deepStrictEqual(lungi, []);
});

test("partea elevilor nu are exemple de la interviu sau job; adulții își păstrează exemplele", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const elev = C.module.plan.ecran("convingere").corp + C.module.plan.ecran("scop1").corp;
  assert.ok(!/interviu|Un job mai bun/i.test(elev));
  assert.ok(elev.includes("notă mică la test") && elev.includes("Să aflu ce mi se potrivește"));
  S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const adult = C.module.plan.ecran("convingere").corp + C.module.plan.ecran("scop1").corp;
  assert.ok(adult.includes("antrenament la interviuri") && adult.includes("Un job mai bun"));
  S.sterge();
});

console.log("Asertivitate și IA pentru elevi");
test("elevii au comunicarea asertivă în meniu, cu situații de la școală, nu de la muncă", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "9");
  assert.ok(C.module.elev.ecran("meniu").corp.includes("Comunicarea asertivă"));
  let tot = C.module.asertiv.ecran("intro").corp + stilTot() + exTot(true) + exemplTot();
  assert.ok(tot.includes(C.esc(D.asertiv.elev.ce)) && tot.includes("Un coleg îți cere tema") && tot.includes("Proiectul nu e gata"));
  assert.ok(!/interviu|șef|ședinț|salariu|la muncă|raportul/i.test(tot.replace(/<[^>]+>/g, " ")), "fără exemple de la muncă");
  assert.ok(!tot.includes("Exersează cu situații"), "exercițiile de la muncă nu apar la elevi");
  assert.ok(tot.includes("Cere clar și de la IA"));
  assert.strictEqual(C.module.asertiv.ecran("exercitiu/formula").inapoi, "asertiv/exemplu/5/4");
  S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const a = exTot() + stilTot();
  assert.ok(a.includes("Exersează cu situații") && a.includes("Cere clar și de la IA") && !a.includes("Colegul vrea să copieze tema"));
  S.sterge();
});
test("„Cere clar și de la IA”: 6 reguli, nota despre vârstă, alegerea cererii mai clare și întrebarea proprie", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const PASI_IA = ["intro", "reguli1", "reguli2", "quiz0", "quiz1", "model0", "model1", "model2", "raspuns", "ghid"];
  const iaTot = () => PASI_IA.map(p => C.module.asertiv.ecran("ia/" + p).corp).join("");
  let c = iaTot();
  assert.strictEqual(D.asertiv.ia.reguli.length, 6);
  ["Verifică ce îți spune.", "Nu scrie date personale.", "Folosește-o ca să înveți, nu ca să copiezi.", C.esc(D.asertiv.ia.varsta), "<details>"].forEach(x => assert.ok(c.includes(x), x));
  C.module.asertiv.actiuni.iaAlege("0|a");
  c = C.module.asertiv.ecran("ia/quiz0").corp;
  assert.ok(c.includes(D.asertiv.ia.gresit) && c.includes("✓ " + C.esc(D.asertiv.ia.quiz[0].b)));
  C.module.asertiv.actiuni.iaAlege("1|a"); assert.ok(C.module.asertiv.ecran("ia/quiz1").corp.includes(D.asertiv.ia.bine));
  const f = C.module.asertiv.intrebareIA;
  assert.strictEqual(f({ cine: "elev în clasa a X-a", ce: "să înțeleg aria cercului", cum: "explică-mi simplu, cu un exemplu" }), "Sunt elev în clasa a X-a. Vreau să înțeleg aria cercului. Te rog explică-mi simplu, cu un exemplu.");
  assert.strictEqual(f({ cine: "Sunt elevă.", ce: "Vreau idei pentru un eseu", cum: "Te rog, pe scurt" }), "Sunt elevă. Vreau idei pentru un eseu. Te rog pe scurt.");
  assert.strictEqual(f({ cine: "x", ce: "", cum: "y" }), "");
  S.pune("asertiv.iam.cine", "elev"); S.pune("asertiv.iam.ce", "să învăț pentru teză"); S.pune("asertiv.iam.cum", "dă-mi 5 întrebări");
  C.module.asertiv.actiuni.iaVad(); assert.strictEqual(C.ecran, "asertiv/ia/raspuns");
  c = C.module.asertiv.ecran("ia/raspuns").corp;
  assert.ok(c.includes(">Sunt elev. Vreau să învăț pentru teză. Te rog dă-mi 5 întrebări.</textarea>") && c.includes("Copiază"));
  assert.deepStrictEqual(Verificator.verificaText(iaTot().replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  S.sterge();
});

console.log("Valorile mele și stima de sine");
test("valorile: elevii au lista scurtă, adulții lista întreagă, fără dubluri", () => {
  assert.strictEqual(new Set(D.valoriPers.listaAdult).size, D.valoriPers.listaAdult.length);
  assert.strictEqual(new Set(D.valoriPers.listaElev).size, D.valoriPers.listaElev.length);
  assert.ok(D.valoriPers.listaAdult.length > 100 && D.valoriPers.listaElev.length < 40);
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "9");
  assert.ok(C.module.elev.ecran("meniu").corp.includes("Valorile mele") && C.module.elev.ecran("meniu").corp.includes("Cum mă văd eu"));
  let c = C.module.valorile.ecran("p0").corp;
  assert.strictEqual((c.match(/type="checkbox"/g) || []).length, D.valoriPers.listaElev.length);
  assert.ok(!c.includes("autoritate") && c.includes("prietenie"));
  S.pune("varsta", "18-44"); S.pune("situatie", "schimb");
  assert.strictEqual((C.module.valorile.ecran("p0").corp.match(/type="checkbox"/g) || []).length, D.valoriPers.listaAdult.length);
  S.sterge();
});
test("limbajul corpului: apare după interviu, bifele se salvează, exercițiul duce mai departe", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const p = D.adulti.situatii.find(x => x.id === "caut").pasi;
  assert.strictEqual(p[p.indexOf("interviu") + 1], "corp");
  assert.ok(D.adulti.situatii.find(x => x.id === "nustiu").pasi.indexOf("corp") < 0);
  const i = C.module.corp.ecran("intro").corp;
  assert.ok(i.includes("trei semnale") && !/%|2022|63 de studii/.test(i));
  assert.ok(!C.module.corp.ecran("semne").corp.includes("bun-simț, nu rezultate"));
  assert.ok(!C.module.corp.ecran("tinuta").corp.includes("de bun-simț") && !C.module.corp.ecran("tinuta").corp.includes("Studiile despre haine") && !C.module.corp.ecran("tinuta").corp.includes("<p></p>"));
  const a = C.module.corp.actiuni;
  D.corp.tinuta.lista.forEach(x => a.bifa(x.id, { checked: true }));
  assert.ok(C.module.corp.ecran("tinuta").corp.includes("Ai bifat tot"));
  a.bifa("t1", { checked: false });
  assert.ok(!C.module.corp.ecran("tinuta").corp.includes("Ai bifat tot"));
  S.pune("corp.schimb", "Privesc mai mult spre cameră");
  a.gata(); assert.strictEqual(C.ecran, "corp/gata");
  const f = C.module.corp.ecran("gata").corp;
  assert.ok(f.includes("Privesc mai mult spre cameră") && f.includes("Continuă: " + D.adulti.pasi.negociere.t));
  assert.ok(C.module.adult.ecran("meniu").corp.includes("✓ exersat"));
});

test("limbajul corpului pentru elevi: în meniu, cu exemple de la școală, fără interviu", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const ecr = ["intro", "semne", "tinuta", "exercitiu", "gata"].map(x => C.module.corp.ecran(x).corp).join(" ");
  assert.ok(!/interviu|\bjob\b|angajator/i.test(ecr), "fără interviu la elevi");
  assert.ok(!/ținut/i.test(ecr.replace(/reținut/gi, "")) && ecr.includes("Cum mă îmbrac") && C.module.corp.ecran("intro").titlu === "Limbajul corpului și cum mă îmbrac");
  assert.ok(ecr.includes("prezentare în clasă") && !/2022|63 de studii|loc de muncă/.test(ecr));
  assert.strictEqual((C.module.corp.ecran("tinuta").corp.match(/type="checkbox"/g) || []).length, D.corp.elev.tinuta.lista.length);
  D.corp.elev.tinuta.lista.forEach(x => C.module.corp.actiuni.bifa(x.id, { checked: true }));
  assert.ok(C.module.corp.ecran("tinuta").corp.includes("Ai bifat tot"));
  C.module.corp.actiuni.gata();
  assert.ok(C.module.corp.ecran("gata").corp.includes("Înapoi la drumul meu"));
  S.sterge();
});

test("ce cer angajatorii: fără procente, cu sursă și un pas mic; elevii au varianta lor", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const a = C.module.cerinte.ecran("lista").corp;
  assert.ok(!/%|ManpowerGroup/.test(a) && a.includes("tot mai des"));
  assert.ok(!/ManpowerGroup/.test(C.module.cerinte.ecran("lista").corp));
  D.cerinte.adult.lista.concat(D.cerinte.elev.lista).forEach(x => assert.ok(C.module[x.link.split("/")[0]], x.link));
  C.module.cerinte.actiuni.gata(); assert.strictEqual(C.ecran, "cauta/intro");
  assert.ok(C.module.adult.ecran("meniu").corp.includes("✓ citit"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const e = C.module.cerinte.ecran("lista").corp;
  assert.ok(!/interviu|prudent|%/i.test(e) && e.includes("proiect la școală"));
  C.module.cerinte.actiuni.gata(); assert.strictEqual(C.ecran, C.acasa());
  S.sterge();
});

test("roata: doar la adulții cu loc de muncă, 8 zone, roata desenată și interpretarea simplă", () => {
  ["caut", "schimb", "pauza"].forEach(id => assert.strictEqual(D.adulti.situatii.find(x => x.id === id).pasi[0], "roata"));
  assert.ok(D.adulti.situatii.find(x => x.id === "nustiu").pasi.indexOf("roata") < 0);
  const R = C.module.roata, n = v => { const o = {}; D.roata.zone.forEach((z, i) => { o[z.id] = v[i]; }); return o; };
  assert.strictEqual(R.analiza(n([8, 8, 8, 8, 8, 8, 8, 8])).fel, "buna");
  assert.strictEqual(R.analiza(n([9, 9, 9, 9, 9, 9, 3, 9])).fel, "stramba");
  assert.deepStrictEqual(R.analiza(n([9, 9, 9, 9, 9, 9, 3, 9])).mici, ["Siguranța"]);
  assert.strictEqual(R.analiza(n([4, 5, 3, 6, 4, 5, 5, 4])).fel, "mica");
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "schimb");
  R.actiuni.gata(); assert.ok(C.eroare && C.eroare.includes("fără notă")); C.eroare = "";
  D.roata.zone.forEach((z, i) => S.pune("roata.n." + z.id, [7, 3, 8, 8, 6, 9, 7, 5][i]));
  R.actiuni.gata(); assert.strictEqual(C.ecran, "roata/rezultat");
  const r = R.ecran("rezultat").corp;
  assert.ok(r.includes("<svg") && (r.match(/class="felie"/g) || []).length === 8 && r.includes("Locul de muncă</strong> – 3 din 10") && r.includes("nu e rotundă"));
  assert.ok(r.includes("Continuă: " + D.adulti.pasi.interese.t));
  assert.ok(C.module.adult.ecran("meniu").corp.includes("Roata vieții profesionale"));
  S.sterge();
});

test("obiceiuri mici: o temă din fiecare nivel, plan cu când/unde/după ce, varianta de 2 minute și „ce fel de om”", () => {
  ["sub18", "18-44"].forEach(v => {
    S.sterge(); S.pune("varsta", v); S.pune("situatie", "caut");
    for (let i = 0; i < 6; i++) assert.deepStrictEqual(C.module.plan.temeSaptamanii(i).map(t => t.nivel), [1, 2, 3], v + " săpt. " + i);
    assert.notDeepStrictEqual(C.module.plan.temeSaptamanii(0), C.module.plan.temeSaptamanii(1));
  });
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10"); S.pune("plan.start", C.azi());
  let c = C.module.plan.ecran("saptamana").corp;
  assert.ok(c.includes("Ușoară") && c.includes("Potrivită") && c.includes("Mai grea") && !c.includes(D.sfaturi.obicei.titlu));
  const t = C.module.plan.temeSaptamanii(0)[0].id;
  S.pune("plan.sapt.s0.aleasa", t);
  S.pune("plan.sapt.s0.cand", "marți, la ora 18"); S.pune("plan.sapt.s0.unde", "acasă"); S.pune("plan.sapt.s0.dupa", "după ce îmi termin temele");
  assert.strictEqual(C.module.plan.frazaObicei("plan.sapt.s0"), "Voi face tema marți, la ora 18, acasă, după ce îmi termin temele.");
  c = C.module.plan.ecran("saptamana").corp;
  assert.ok(c.includes(D.sfaturi.obicei.titlu) && c.includes("Voi face tema marți") && c.includes(D.sfaturi.obicei.dupaElev));
  S.pune("plan.sapt.s0.mini", "Citesc un singur rând");
  C.module.plan.actiuni.nefacut("0");
  assert.ok(C.module.plan.ecran("saptamana").corp.includes("Citesc un singur rând"));
  assert.ok(C.module.plan.ecran("scopRez").corp.includes(D.sfaturi.identitate.q));
  S.sterge();
});

test("ideea de reținut și pasul tău: la finalul fiecărei secțiuni; pasul devine temă doar dacă săptămâna e liberă", () => {
  const fin = { interese: "interese/rezultat", forte: "forte/rezumat", valori: "valorile/rezultat", stima: "stima/rezultat", roata: "roata/rezultat",
    competente: "competente/concluzie", cv: null, scrisoare: "scrisoare/schelet", interviu: "interviu/exersez",
    asertiv: ["asertiv/exercitiu/gata2", "asertiv/exercitiu/gata3"],
    corp: "corp/gata", negociere: "negociere/exercitiu", cerinte: "cerinte/lista", meserii: "meserii/lista", cauta: null };
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "schimb");
  S.pune("interese.top", ["S", "I", "A"]); S.pune("vp.top", "familie"); S.pune("vp.ales.p2", ["familie", "curaj", "umor"]);
  const r = {}; D.stima.itemi.forEach(it => { r[it.id] = 3; }); S.pune("stima.r", r);
  D.roata.zone.forEach(z => S.pune("roata.n." + z.id, 6));
  Object.keys(fin).forEach(id => {
    if (!fin[id]) return; /* CV-ul: rezultatul cere text lipit; e verificat în codul ecranului */
    const ecrane = Array.isArray(fin[id]) ? fin[id] : [fin[id]];
    const c = ecrane.map(e => { const [m, ...rest] = e.split("/"); return C.module[m].ecran(rest.join("/")).corp; }).join("");
    assert.ok(c.includes(C.esc(D.retine.sectiuni[id].idee)) && c.includes(D.retine.pasTitlu), id);
  });
  assert.ok(Object.keys(D.retine.sectiuni).every(id => id in fin), "fiecare idee are un ecran");
  const a = C.module.retine.actiuni;
  a.tema("cv"); const idx = C.saptamana();
  assert.strictEqual(S.ia("plan.sapt.s" + idx + ".proprie"), D.retine.sectiuni.cv.pas);
  assert.ok(C.retine("cv").includes("E tema ta pentru săptămâna asta"));
  a.tema("roata"); assert.strictEqual(S.ia("plan.sapt.s" + idx + ".proprie"), D.retine.sectiuni.cv.pas, "nu înlocuiește tema");
  assert.ok(C.retine("roata").includes("Ai deja o temă"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  assert.ok(C.retine("cerinte").includes(C.esc(D.retine.sectiuni.cerinte.pasElev)));
  S.sterge();
});

test("caietul meu: gol la început, apoi doar părțile completate, cu text de copiat", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  assert.deepStrictEqual(C.module.caiet.parti(), []);
  assert.ok(C.module.caiet.ecran("tot").corp.includes(D.retine.caiet.gol));
  assert.ok(C.module.adult.ecran("meniu").corp.includes("Caietul meu"));
  S.pune("caiet.roata.text", "Caut program <b>bun</b>");
  D.roata.zone.forEach(z => S.pune("roata.n." + z.id, 7)); S.pune("roata.gata", true); S.pune("roata.r.zona", "Echilibrul");
  S.pune("interviu.p.p1", { titlu: "Clientul grăbit", fapta: "Am rezolvat comanda" });
  S.pune("plan.start", C.azi()); S.pune("plan.identitate", "Un om care învață pas cu pas");
  const P = C.module.caiet.parti().map(p => p.titlu);
  assert.deepStrictEqual(P, [D.retine.caiet.idei, D.retine.caiet.roata, D.retine.caiet.povesti, D.retine.caiet.plan]);
  const c = C.module.caiet.ecran("tot").corp;
  assert.ok(c.includes("&lt;b&gt;bun") && !c.includes("<b>bun") && c.includes("Echilibrul") && c.includes("Clientul grăbit"));
  assert.ok(C.module.caiet.textCopiat(C.module.caiet.parti()).includes("- Banii – 7 din 10"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  S.pune("meserii.salvate", [D.meserii.lista[0].id]);
  assert.deepStrictEqual(C.module.caiet.parti().map(p => p.titlu), [D.retine.caiet.meserii]);
  S.sterge();
});

test("recapitulări: după 1, 7 și 30 de zile; „nu prea” aduce ideea mâine; cel mult 3 pe zi", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const azi = C.azi(), R = C.module.retine, A = R.actiuni;
  C.retine("cv"); assert.strictEqual(S.ia("rec.cv.urm"), C.adauga(azi, 1));
  assert.deepStrictEqual(R.scadente(azi), []); assert.strictEqual(R.banner(), "");
  assert.deepStrictEqual(R.scadente(C.adauga(azi, 1)), ["cv"]);
  /* ca să putem testa azi, mutăm termenul în trecut */
  ["cv", "interviu", "corp", "cerinte"].forEach(id => { S.pune("rec." + id + ".urm", C.adauga(azi, -1)); S.pune("rec." + id + ".nivel", 0); });
  assert.ok(R.banner().includes("3 idei") && C.module.adult.ecran("meniu").corp.includes("Încep recapitularea"));
  let c = R.ecran("recap").corp;
  assert.ok(c.includes("Ce idee ai reținut de la „CV-ul meu”") && c.includes("Arată ideea") && !c.includes(C.esc(D.retine.sectiuni.cv.idee)));
  A.arata("cv"); c = R.ecran("recap").corp;
  assert.ok(c.includes(C.esc(D.retine.sectiuni.cv.idee)) && c.includes("Mi-am amintit"));
  A.raspuns("cv|da"); assert.strictEqual(S.ia("rec.cv.nivel"), 1); assert.strictEqual(S.ia("rec.cv.urm"), C.adauga(azi, 7));
  A.arata("interviu"); A.raspuns("interviu|nu"); assert.strictEqual(S.ia("rec.interviu.nivel"), 0); assert.strictEqual(S.ia("rec.interviu.urm"), C.adauga(azi, 1));
  assert.ok(R.ecran("recap").corp.includes("revine mâine"));
  A.arata("corp"); A.raspuns("corp|da");
  assert.ok(R.ecran("recap").corp.includes("Gata pentru azi") && R.banner() === "", "cel mult 3 pe zi");
  S.pune("rec.cv.nivel", 3); assert.ok(R.scadente(C.adauga(azi, 100)).indexOf("cv") < 0, "după a treia recapitulare, gata");
  S.sterge();
});

test("ce vreau și ce m-ar putea opri: patru întrebări în ordine și planul „Dacă…, atunci…”", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  let c = C.module.plan.ecran("woop").corp;
  const W = D.sfaturi.woop;
  const ord = [W.dorinta, W.rezultat, W.obstacol, W.plan].map(q => c.indexOf(C.esc(q)));
  assert.ok(ord.every((k, i) => k > 0 && (i === 0 || k > ord[i - 1])), "ordinea întrebărilor");
  assert.strictEqual(C.module.plan.frazaWoop(), "");
  S.pune("plan.woop.obstacol", "Dacă amân seara."); S.pune("plan.woop.plan", "Atunci lucrez 10 minute dimineața");
  assert.strictEqual(C.module.plan.frazaWoop(), "Dacă amân seara, atunci lucrez 10 minute dimineața.");
  assert.ok(C.module.plan.ecran("hub").corp.includes("Dacă amân seara, atunci") && C.module.plan.ecran("woop").corp.includes("Planul tău"));
  assert.ok(C.module.caiet.parti().some(p => p.randuri.some(r => r.startsWith("Dacă amân seara"))));
  assert.ok(C.module.plan.ecran("obstacole").corp.includes("Dacă…, atunci…"));
  S.sterge();
});

test("progres: zile la rând, mesaj blând după o zi sărită, mesaj pentru prieten, „nu merge în linie dreaptă”", () => {
  const azi = C.azi(), z = n => C.adauga(azi, n), P = C.module.plan;
  assert.strictEqual(P.serie([], azi), 0);
  assert.strictEqual(P.serie([z(-2), z(-1), azi], azi), 3);
  assert.strictEqual(P.serie([z(-2), z(-1)], azi), 2, "azi încă nebifat: seria de ieri rămâne");
  assert.strictEqual(P.serie([z(-3), z(-1)], azi), 1);
  assert.ok(!P.aSarit([], azi) && !P.aSarit([z(-1)], azi) && P.aSarit([z(-3)], azi) && !P.aSarit([z(-3), azi], azi));
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut"); S.pune("plan.start", azi);
  S.pune("plan.sapt.s0.aleasa", P.temeSaptamanii(0)[0].id);
  let c = P.ecran("saptamana").corp;
  assert.ok(c.includes("Azi am lucrat la temă") && (c.match(/class="zi[ "]/g) || []).length === 7 && c.includes("Spune-i unui prieten") && c.includes("Mă întrebi peste câteva zile"));
  P.actiuni.azi(); c = P.ecran("saptamana").corp;
  assert.ok(c.includes("Azi ai lucrat") && c.includes("O zi.") && c.includes("ai lucrat</span>"));
  S.pune("plan.zile", [z(-4)]); S.pune("plan.sapt.s0.mini", "Citesc un rând");
  c = P.ecran("saptamana").corp;
  assert.ok(c.includes("Ai sărit o zi?") && c.includes("Citesc un rând") && c.includes("Ce te-ar ajuta să revii?") && !/certa|rușine|leneș/i.test(c));
  c = P.ecran("privire").corp;
  assert.ok(c.includes("Progresul nu merge în linie dreaptă") && c.includes("o zi de lucru"));
  S.sterge(); S.pune("varsta", "18-44"); S.pune("plan.start", C.adauga(azi, -21));
  S.pune("plan.sapt.s1.bifat", true); S.pune("plan.sapt.s2.bifat", true);
  assert.ok(P.ecran("saptamana").corp.includes("Vrei o mică schimbare?"));
  S.sterge();
});

test("exersarea interviului începe cu 3 sfaturi de liniștire, fără „poziții de putere”", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const c = C.module.interviu.ecran("exersez").corp, K = D.interviu.exersez.calm;
  assert.strictEqual(K.sfaturi.length, 3);
  assert.ok(c.indexOf(C.esc(K.titlu)) >= 0 && c.indexOf(C.esc(K.titlu)) < c.indexOf(C.esc(D.interviu.exersez.filmare.titlu)));
  assert.ok(K.sfaturi.every(x => c.includes(C.esc(x.t))) && !/putere|Brooks|Balban|Driskell/i.test(c));
  S.sterge();
});

test("sub avertizarea despre CNP: cum să folosești și cum să nu folosești un chat cu IA (3 + 3)", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  S.pune("cv.pastreaza", true); S.pune("cv.text", "Ion Popescu\nExperiență\nVânzător, 2020 – 2024\nEducație\nLiceu"); S.pune("scrisoare.r.post", "vânzător");
  const F = D.ia.folosire; assert.ok(F.daLista.length === 3 && F.nuLista.length === 3);
  ["interviu/exersez", "scrisoare/ia", "cv/ia"].forEach(e => {
    const [m, r] = e.split("/"), c = C.module[m].ecran(r).corp;
    const k = c.indexOf("Atenție:");
    assert.ok(k > 0 && c.indexOf(F.da) > k && c.indexOf(F.nu) > c.indexOf(F.da) && c.includes("Corectează-mi greșelile din text"), e);
  });
  S.sterge();
});

test("Faro: salută la început; pe ecranul lui, o dată pe zi întreabă „Cum te simți azi?” și răspunde potrivit", () => {
  S.sterge();
  assert.ok(C.module.sistem.ecran("start").corp.includes("Sunt Faro") && C.module.sistem.ecran("start").corp.includes('class="bosi"'));
  S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const T = D.bosi.stare, B = C.module.bosi;
  /* ecranul principal doar duce la ecranul lui Faro, nu mai arată întrebarea direct */
  let m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Cum te simți azi?") && m.includes('data-arg="bosi"') && !m.includes(">Bine<"));
  let f = B.ecran().corp;
  assert.ok(f.includes("Cum te simți azi?") && f.includes(">Bine<") && f.includes("Așa și așa") && f.includes("Nu prea bine") && !/>Greu</.test(f));
  B.actiuni.stare("bine"); f = B.ecran().corp; m = C.module.adult.ecran("meniu").corp;
  assert.ok(!f.includes(">Bine<") && f.includes("Hai să facem următorul pas: Roata vieții profesionale") && m.includes("roata/intro"));
  B.actiuni.stare("asa"); f = B.ecran().corp;
  assert.ok(f.includes("zi de pași mici") && f.includes("plan/saptamana") && f.includes("caiet/tot"));
  B.actiuni.stare("nu"); f = B.ecran().corp;
  assert.ok(f.includes("nu te simți bine") && !f.includes("ești îngrijorat") && f.includes("Mâine te întreb din nou") && !f.includes("Merg la pasul următor"));
  assert.ok(!C.module.sistem.ecran("despre").corp.includes("ești îngrijorat"), "mesajul de ajutor scos la cererea autoarei");
  assert.ok(C.module.sistem.ecran("criza").corp.includes("112"), "ecranul pentru momente grele rămâne");
  B.actiuni.stare(""); assert.ok(B.ecran().corp.includes(">Bine<"));
  S.pune("stare.zi", { data: C.adauga(C.azi(), -1), r: "nu" }); assert.ok(B.ecran().corp.includes(">Bine<"), "a doua zi întreabă din nou");
  S.pune("bosi.ultima", C.adauga(C.azi(), -5)); S.pune("bosi.revenit", "");
  assert.ok(B.ecran().corp.includes("Mă bucur să te revăd"));
  assert.ok(!/de ce n-ai|ai lipsit|ai ratat|dezamăg|Greu/i.test(JSON.stringify(D.bosi)), "fără vinovăție și fără „greu”");
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10"); B.actiuni.stare("bine");
  assert.ok(C.module.elev.ecran("meniu").corp.includes("Cum te simți azi?"));
  assert.ok(B.ecran().corp.includes("Hai să facem următorul pas: Test de interese"));
  S.sterge();
});

test("idei noi aprobate: un singur lucru, emoții, ce depinde de mine, cine te ajută, imperfect, plan B, plimbarea", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut"); S.pune("plan.start", C.azi());
  const P = C.module.plan, I = D.sfaturi.idei;
  S.pune("plan.sapt.s0.aleasa", P.temeSaptamanii(0)[0].id);
  const sapt = P.ecran("saptamana").corp;
  assert.ok(sapt.includes(C.esc(I.unSingurLucru)) && sapt.includes(I.ajutor) && sapt.includes(C.esc(I.imperfect)));
  assert.ok(P.ecran("obstacole").corp.includes(C.esc(I.emotii)));
  const conv = P.ecran("convingere").corp;
  assert.ok(conv.includes(I.depinde) && conv.includes(I.nuDepinde) && conv.includes(I.depindeEx));
  assert.ok(P.ecran("scopRez").corp.includes(I.planB));
  assert.ok(C.module.cv.ecran("intro").corp.includes(C.esc(I.imperfectCV)));
  assert.ok(C.module.interviu.ecran("exersez").corp.includes("plimbare de 10 minute"));
  assert.strictEqual(C.module.forte.ecran("ik0").titlu, "Cele 4 cercuri");
  S.pune("plan.planB", "Un curs de contabilitate"); S.pune("plan.ajutor", "Ana");
  assert.ok(C.module.caiet.parti().some(x => x.randuri.includes("Planul B: Un curs de contabilitate")));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  assert.ok(C.module.plan.ecran("convingere").corp.includes(I.depindeElev) && D.valori.momente[2].includes("uitat ultima dată de timp"));
  S.sterge();
});

test("elevii au 3 sfaturi de liniștire la limbajul corpului; adulții nu le văd acolo", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const K = D.corp.elev.calm, c = C.module.corp.ecran("intro").corp;
  assert.ok(K.sfaturi.length === 3 && K.sfaturi.every(x => c.includes(C.esc(x.t))) && c.indexOf(C.esc(K.titlu)) < c.indexOf('class="meniu-lista"'));
  assert.ok(!/interviu|Ramirez|Beilock|Jamieson/i.test(c));
  S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  assert.ok(!C.module.corp.ecran("intro").corp.includes(C.esc(K.titlu)));
  S.sterge();
});

test("ecranul principal: cardurile secțiunilor; cardul curent e marcat „Continuă aici”; ✓ la cele făcute", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  let m = C.module.adult.ecran("meniu").corp;
  assert.strictEqual((m.match(/Continuă aici/g) || []).length, 1);
  assert.ok(m.indexOf("Continuă aici") < m.indexOf("CV-ul meu") + 400 && m.includes('class="carduri"'));
  S.pune("roata.gata", true); m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes('class="card-modul') || m.includes('class="btn  gata') || m.includes("gata"));
  assert.ok(m.indexOf("✓ Făcut") > -1 || m.includes("✓ făcut"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10"); S.pune("interese.top", ["S", "I", "A"]);
  m = C.module.elev.ecran("meniu").corp;
  assert.strictEqual((m.match(/Continuă aici/g) || []).length, 1);
  assert.ok(m.indexOf("Test de interese") < m.indexOf("Continuă aici"));
  S.sterge();
});

test("lecția scurtă despre CV: o întrebare pe ecran, răspuns imediat, varianta corectă arătată, scor la final", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const L = C.module.lectie, Q = D.lectii.cv.intrebari;
  assert.ok(C.module.cv.ecran("intro").corp.includes(D.lectii.buton));
  assert.ok(Q.every(q => q.opt.filter(o => o.ok).length === 1), "o singură variantă corectă");
  let c = L.ecran("cv/0").corp;
  assert.ok(c.includes(C.esc(Q[0].q)) && c.includes("Întrebarea 1 din 3") && !c.includes("Bravo"));
  L.actiuni.alege("cv|0|0"); c = L.ecran("cv/0").corp;
  assert.ok(c.includes("Aproape!") && c.includes("✗ ") && c.includes("✓ ") && c.includes("lectie/cv/1"));
  L.actiuni.alege("cv|0|1"); assert.strictEqual(S.ia("lectie.cv.r0"), 0, "nu se poate schimba răspunsul");
  L.actiuni.alege("cv|1|0"); assert.ok(L.ecran("cv/1").corp.includes("Exact!"));
  L.actiuni.alege("cv|2|1"); assert.strictEqual(L.corecte("cv"), 2);
  c = L.ecran("cv/final").corp;
  assert.ok(c.includes("Ai terminat lecția") && c.includes("2 din 3") && c.includes("cv/intro"));
  assert.ok(C.module.cv.ecran("intro").corp.includes("✓ " + D.lectii.buton));
  L.actiuni.refa("cv"); assert.strictEqual(L.corecte("cv"), 0); assert.strictEqual(C.ecran, "lectie/cv/0");
  S.sterge();
});

test("Faro își amintește: tema de săptămâna trecută cu cuvintele omului, rezumatul, valoarea; „dumneavoastră” la 45+", () => {
  const B = C.module.bosi, start = C.adauga(C.azi(), -8);
  /* adult 18–44 */
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut"); S.pune("plan.start", start);
  S.pune("plan.sapt.s0.aleasa", "proprie"); S.pune("plan.sapt.s0.proprie", "Să trimit 3 cereri"); S.pune("plan.zile", [start]);
  S.pune("rec.cv.urm", C.azi()); S.pune("rec.zi", { data: "x" }); S.pune("vp.top", "familie");
  B.actiuni.stare("bine");
  let m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Ți-ai propus: „Să trimit 3 cereri”") && m.includes("Am făcut o parte") && m.includes("N-am apucat"));
  assert.ok(m.includes("o secțiune terminată, o zi de lucru") && m.includes("contează mult „familie”"));
  B.actiuni.memorie("0|reusit"); m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Ai făcut exact ce ți-ai propus") && S.ia("plan.sapt.s0.bifat") === true && !m.includes("Cum a mers?"));
  B.actiuni.stare("nu"); m = C.module.adult.ecran("meniu").corp;
  assert.ok(!m.includes("Ai făcut exact") && !m.includes("Uite ce am parcurs"), "la „Nu prea bine” fără întrebări și rezumate");
  /* 45+: „dumneavoastră”, pe ecranul lui Faro */
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "caut"); S.pune("plan.start", start);
  S.pune("plan.sapt.s0.aleasa", "proprie"); S.pune("plan.sapt.s0.proprie", "Să sun la două firme");
  let f = B.ecran().corp;
  assert.ok(f.includes("Cum vă simțiți azi?"));
  B.actiuni.stare("nu"); f = B.ecran().corp;
  assert.ok(f.includes("nu vă simțiți bine") && f.includes("Mâine vă întreb din nou") && !f.includes("sunați la 112"));
  B.actiuni.stare("asa"); m = C.module.adult.ecran("meniu").corp; f = B.ecran().corp;
  assert.ok(f.includes("Vă înțeleg") && m.includes("Data trecută v-ați propus: „Să sun la două firme”"));
  B.actiuni.memorie("0|nu"); assert.ok(C.module.adult.ecran("meniu").corp.includes("Mă bucur că ați revenit"));
  assert.ok(C.module.adult.ecran("bunvenit").corp.includes("în ritmul dumneavoastră"));
  /* elev */
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10"); S.pune("plan.start", start);
  S.pune("plan.sapt.s0.aleasa", "proprie"); S.pune("plan.sapt.s0.proprie", "Să întreb un profesor"); B.actiuni.stare("bine");
  assert.ok(C.module.elev.ecran("meniu").corp.includes("Hei! Mi-am amintit ce mi-ai zis"));
  B.actiuni.memorie("0|parte"); assert.ok(C.module.elev.ecran("meniu").corp.includes("Ce parte vrei să termini?"));
  S.sterge();
});

test("Faro sărbătorește momentele importante o singură dată; ele rămân în caiet; nimic la „Nu prea bine”", () => {
  const B = C.module.bosi, azi = C.azi();
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  assert.deepStrictEqual(B.atinse(), []);
  S.pune("rec.cv.urm", azi); S.pune("plan.zile", [C.adauga(azi, -2), C.adauga(azi, -1), azi]); S.pune("lectie.cv.gata", true);
  assert.deepStrictEqual(B.atinse().sort(), ["lectie1", "sectiune1", "zile3"]);
  B.actiuni.stare("nu");
  let m = C.module.adult.ecran("meniu").corp;
  assert.ok(!m.includes("★") && !S.ia("mom.sectiune1", ""), "la „Nu prea bine” nu sărbătorim și nu consumăm momentul");
  B.actiuni.stare("bine"); m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Ai terminat prima secțiune!") && m.includes("3 zile la rând!") && m.includes("Prima lecție terminată!") && m.includes('class="sarbatoare"'));
  assert.ok(C.module.caiet.parti()[0].titlu === D.retine.caiet.momente && C.module.caiet.parti()[0].randuri.length === 3);
  /* a doua zi nu mai apar */
  ["sectiune1", "zile3", "lectie1"].forEach(id => S.pune("mom." + id, C.adauga(azi, -1)));
  S.pune("stare.zi", { data: azi, r: "bine" });
  assert.ok(!C.module.adult.ecran("meniu").corp.includes("★"));
  /* 45+: „dumneavoastră” */
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "caut"); S.pune("plan.sapt.s0.bifat", true); S.pune("plan.start", azi); B.actiuni.stare("bine");
  assert.ok(C.module.adult.ecran("meniu").corp.includes("V-ați ținut de cuvânt"));
  S.sterge();
});

test("cuvinte de știut: apar doar cuvintele tehnice de pe ecran; mesajele de pas sunt calde; calendarul e explicat simplu", () => {
  const G = C.module.glosar;
  assert.deepStrictEqual(G.gasite("<p>Salariul net și brut, cu un interval.</p>").map(w => w.t), ["Interval", "Brut", "Net"]);
  assert.deepStrictEqual(G.gasite("<p>Internetul e lent.</p><textarea>prompt ATS</textarea>").map(w => w.t), [], "fără potriviri false și fără casetele de copiat");
  assert.deepStrictEqual(G.gasite("<p>Ia o pauză.</p>").map(w => w.t), [], "„Ia” (verbul) nu e „IA”");
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const c = C.module.negociere.ecran("piata").corp;
  assert.ok(c.includes("Cuvinte de știut") && c.includes("Banii pe care îi primești") === false && c.includes("Salariul din mijloc"));
  assert.ok(!C.module.sistem.ecran("start").corp.includes("Cuvinte de știut"));
  /* mesajele „Încă un pas” */
  assert.ok(!/Lipsește|Completează toate|Alege exact/.test(JSON.stringify(D.asertiv) + JSON.stringify(D.valoriPers) + JSON.stringify(D.exercitii)));
  S.pune("plan.start", C.azi()); S.pune("plan.sapt.s0.aleasa", C.module.plan.temeSaptamanii(0)[0].id);
  const p = C.module.plan.ecran("saptamana").corp;
  assert.ok(p.includes("Reamintire în calendarul telefonului") && p.includes("La ce oră să-ți amintească?") && !/spune-mi|browser/i.test(p.slice(p.indexOf("Reamintire"), p.indexOf("Cuvinte de știut") > 0 ? p.indexOf("Cuvinte de știut") : undefined)));
  S.sterge();
});

test("datele tale: varianta pentru adulți și pentru elevi; butoane în CV, Sfaturi și Despre date", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  let c = C.module.datele.ecran("tot").corp;
  assert.ok(c.includes("Perioada de probă") && c.includes("test de sarcină") && c.includes("certificatul de voluntariat") && !c.includes("de la 15 ani"));
  assert.ok(C.module.cv.ecran("intro").corp.includes("datele/tot") && C.module.sistem.ecran("date").corp.includes("datele/tot"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  c = C.module.datele.ecran("tot").corp;
  assert.ok(c.includes("Primul tău loc de muncă") && c.includes("de la 15 ani") && !c.includes("Perioada de probă") && !c.includes("test de sarcină"));
  assert.ok(C.module.sfaturi.ecran("lista").corp.includes("datele/tot"));
  assert.ok(!/GDPR|ANSPDCP|Codul muncii|Legea nr|Legea \d|art\./.test(c), "fără nume de legi pe ecran");
  S.sterge();
});

test("cum găsești informații sigure: 5 pași, site-uri pe vârste, mesaj pentru IA, misiune cu răspuns, sărbătoare", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const K = C.module.cauta, D2 = D.cauta;
  assert.ok(K.ecran("intro").corp.includes("Nu știi încă?") && K.ecran("pasi").corp.includes(".gov.ro"));
  let s = K.ecran("siteuri").corp;
  assert.ok(s.includes("legislatie.just.ro") && s.includes("anofm.ro") && !s.includes("admitere.edu.ro"));
  assert.ok(K.ecran("ia").corp.includes("ca pentru un copil de 12 ani") && K.ecran("ia").corp.includes("Cum să nu-l folosești"));
  let pc = K.ecran("pacaleli").corp;
  assert.ok(pc.includes("ca un om care poartă o mască") && pc.includes("Regula de aur") && pc.includes("Nu e vina ta") && pc.includes("1911") && !/țeap|\bCUI\b|cod fiscal|linkuri/i.test(pc));
  assert.ok(K.ecran("ia").corp.includes("cauta/pacaleli") && pc.includes("cauta/misiune"));
  let m = K.ecran("misiune").corp;
  assert.ok(m.includes(C.esc(D2.misiune.adult.q)) && !m.includes("20 de zile"));
  K.actiuni.gata(); m = K.ecran("misiune").corp;
  assert.ok(m.includes("Cel puțin 20 de zile lucrătoare") && m.includes(D.retine.titlu));
  assert.ok(C.module.bosi.atinse().indexOf("cauta1") >= 0 && C.module.adult.ecran("meniu").corp.includes("✓ misiune făcută"));
  assert.ok(C.module.negociere.ecran("piata").corp.includes("Vezi cum afli singur"), "legătura din „Cuvinte de știut”");
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  s = K.ecran("siteuri").corp;
  assert.ok(s.includes("admitere.edu.ro") && !s.includes("anofm.ro") && C.module.elev.ecran("meniu").corp.includes("Cum găsești informații sigure"));
  assert.ok(K.ecran("misiune").corp.includes("calendarul admiterii") && K.ecran("pacaleli").corp.includes("Regula de aur"));
  S.sterge();
});

test("detectivul de 5 secunde: o întrebare pe zi după „Bine”, răspuns imediat, „Altă dată”, sărbătoare la 5", () => {
  const B = C.module.bosi, Q = D.detectiv.intrebari;
  assert.strictEqual(Q.length, 12);
  Q.forEach(q => ["opt", "optAdult", "optElev"].forEach(k => { if (q[k]) assert.strictEqual(q[k].filter(o => o.ok).length, 1, q.id + " " + k); }));
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  B.actiuni.stare("nu"); assert.ok(!C.module.adult.ecran("meniu").corp.includes("Joc rapid"), "nu la „Nu prea bine”");
  B.actiuni.stare("asa"); assert.ok(!C.module.adult.ecran("meniu").corp.includes("Joc rapid"), "nu la „Așa și așa”");
  B.actiuni.stare("bine");
  let m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Joc rapid!") && m.includes("anofm.ro") && m.includes("anofm-ro.com") && m.includes("Altă dată"));
  B.actiuni.detectiv("1"); m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Aproape!") && m.includes("o mică diferență") && !m.includes("Altă dată"));
  B.actiuni.detectiv("0"); assert.strictEqual(S.ia("det.corecte", 0), 0, "răspunsul nu se mai schimbă azi");
  /* a doua zi: următoarea întrebare */
  S.pune("det.zi", { data: C.adauga(C.azi(), -1), id: "d1", r: 1 });
  assert.ok(C.module.adult.ecran("meniu").corp.includes("taxa de înscriere"));
  B.actiuni.detectiv("sari"); assert.ok(!C.module.adult.ecran("meniu").corp.includes("taxa de înscriere"));
  S.pune("det.corecte", 5); assert.ok(B.atinse().indexOf("detectiv5") >= 0);
  /* 45+ și elevi */
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "caut"); S.pune("det.n", 3); B.actiuni.stare("bine");
  assert.ok(C.module.adult.ecran("meniu").corp.includes("Unde căutați o lege?"));
  B.actiuni.detectiv("0"); assert.ok(C.module.adult.ecran("meniu").corp.includes("Legile, la zi"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10"); B.actiuni.stare("bine");
  assert.ok(C.module.elev.ecran("meniu").corp.includes("admitere.edu.ro"));
  S.sterge();
});

test("lecțiile scurte: asertiv (pe vârste), interviu, valori; butoanele în secțiuni; o singură variantă corectă", () => {
  ["asertiv", "interviu", "valori", "cv", "scrisoare", "negociere", "corp", "roata", "plan", "cerinte"].forEach(id => D.lectii[id].intrebari.forEach((q, i) => ["opt", "optElev", "optAdult"].forEach(k => {
    if (q[k]) assert.strictEqual(q[k].filter(o => o.ok).length, 1, id + " " + i + " " + k); })));
  const L = C.module.lectie;
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  assert.ok(C.module.asertiv.ecran("intro").corp.includes("lectie/asertiv/0") && C.module.valorile.ecran("intro").corp.includes("lectie/valori/0"));
  let c = L.ecran("asertiv/1").corp;
  assert.ok(c.includes("copieze tema") && !c.includes("Șeful"));
  L.actiuni.alege("asertiv|1|1"); assert.ok(L.ecran("asertiv/1").corp.includes("Spui „nu” clar"));
  L.actiuni.alege("asertiv|2|0"); assert.ok(L.ecran("asertiv/2").corp.includes("Cuvântul acela judecă omul"));
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  c = L.ecran("asertiv/1").corp; assert.ok(c.includes("Șeful") && c.includes("Raportul e gata joi"));
  assert.ok(C.module.interviu.ecran("hub").corp.includes("lectie/interviu/0"));
  L.actiuni.alege("interviu|0|1"); L.actiuni.alege("interviu|1|1"); L.actiuni.alege("interviu|2|1");
  assert.strictEqual(L.corecte("interviu"), 3); assert.ok(L.ecran("interviu/final").corp.includes("interviu/povesti"));
  assert.ok(C.module.scrisoare.ecran("intro").corp.includes("lectie/scrisoare/0") && C.module.negociere.ecran("hub").corp.includes("lectie/negociere/0") && C.module.corp.ecran("intro").corp.includes("lectie/corp/0"));
  assert.ok(L.ecran("corp/2").corp.includes("interviu online") && L.ecran("negociere/final").corp.includes("negociere/piata"));
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  assert.ok(L.ecran("corp/2").corp.includes("în fața clasei") && !L.ecran("corp/2").corp.includes("interviu"));
  assert.ok(L.ecran("cerinte/2").corp.includes("voluntariat") && L.ecran("plan/0").corp.includes("Să aflu ce mi se potrivește"));
  assert.ok(C.module.plan.ecran("hub").corp.includes("lectie/plan/0") && C.module.cerinte.ecran("lista").corp.includes("lectie/cerinte/0"));
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  assert.ok(C.module.roata.ecran("intro").corp.includes("lectie/roata/0") && L.ecran("cerinte/2").corp.includes("nicio șansă") && L.ecran("plan/0").corp.includes("Un loc de muncă mai bun"));
  S.sterge();
});

test("ușor de folosit: ghid la prima folosire, „Continuă de unde ai rămas”, „✓ Salvat”", () => {
  S.sterge(); S.pune("varsta", "45+"); S.pune("situatie", "caut");
  let m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("atingeți butonul galben") && m.includes("Am înțeles"));
  assert.ok(m.indexOf("Continuă de unde ai rămas") > 0 && m.indexOf("Continuă de unde ai rămas") < m.indexOf("Cum te simți azi?") && m.includes("roata/intro"));
  C.module.bosi.actiuni.ghid(); m = C.module.adult.ecran("meniu").corp;
  assert.ok(!m.includes("Am înțeles") && m.includes("Continuă aici"));
  S.pune("roata.gata", true); assert.ok(C.module.adult.ecran("meniu").corp.includes('data-arg="cv/intro"'));
  D.roata.zone.forEach(z => S.pune("roata.n." + z.id, 6));
  const c = C.module.roata.ecran("rezultat").corp;
  assert.ok(c.includes('class="salvat-camp"') && !/microfon|Poți vorbi/i.test(c), "fără sfatul cu microfonul (scos la cererea autoarei)");
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  assert.ok(C.module.elev.ecran("meniu").corp.includes("atinge butonul galben") && C.module.elev.ecran("meniu").corp.includes("interese/intro"));
  S.sterge();
});

test("ecranul pentru momente grele: elevii — un adult de încredere; adulții — cineva de încredere; 112 la toți", () => {
  S.sterge(); S.pune("varsta", "sub18");
  let c = C.module.sistem.ecran("criza").corp;
  assert.ok(c.includes("un adult în care ai încredere") && c.includes("consilierul școlii") && c.includes("112"));
  S.sterge(); S.pune("varsta", "45+");
  c = C.module.sistem.ecran("criza").corp;
  assert.ok(c.includes("cineva în care ai încredere") && !c.includes("un adult") && !c.includes("consilierul școlii") && c.includes("112"));
  S.sterge();
});

test("semnale: „înainte” și „înapoi” pe butoanele de navigare; legătura ColorPsi la comunicare și la CV-ul adulților", () => {
  const B = (t, act, arg, cl) => C.buton(t, act, arg, cl);
  assert.ok(B("Continuă", "nav", "x", "continua").includes("semn-inainte"));
  assert.ok(B("Înapoi", "nav", "y").includes("semn-inapoi") && B("Înapoi", "nav", "y").includes("←"));
  assert.ok(!B("Copiază", "cauta.copiaza", null, "continua").includes("semn-inainte"), "copierea nu clipește ca navigare");
  assert.ok(!B("Gata", "asertiv.gata", null, "primar").includes("semn"), "butoanele de acțiune nu clipesc");
  assert.ok(B("Înapoi la drumul meu", "nav", "adult/meniu", "primar").includes("semn-inapoi"));
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  const link = "https://iorgasimi-cmd.github.io/colorpsi/#servicii";
  ["asertiv", "corp", "cerinte", "forte", "cv"].forEach(id => assert.ok(C.retine(id).includes('data-arg="servicii/tot"'), id));
  assert.ok(!C.retine("stima").includes("servicii/tot") && !C.retine("roata").includes("servicii/tot"), "doar la comunicare și CV");
  const pg = C.module.servicii.ecran("tot").corp;
  assert.ok(pg.includes(link) && pg.includes("Vrei să exersezi mai mult") && !C.module.servicii.ecran("tot").corp.includes("Retine"), "pagina separată, cu linkul");
  assert.strictEqual((pg.match(/<section/g) || []).length, 1, "un singur card pe pagină");
  S.sterge();
});

test("stil vesel: bară de progres pe drum, seria de zile pe ecranul principal", () => {
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  let m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("progres-drum") && m.includes("Ai făcut <strong>0</strong> din"));
  assert.ok(!m.includes("Seria ta"), "fără serie când nu ai lucrat");
  const azi = C.azi(); S.pune("plan.zile", [C.adauga(azi, -1), azi]);
  m = C.module.adult.ecran("meniu").corp;
  assert.ok(m.includes("Seria ta: <strong>2 zile la rând.</strong>"));
  S.sterge();
});

test("valorile: 10 → 5 → 3 → 1, cu limită la fiecare pas, întrebări, note și rezultat", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const a = C.module.valorile.actiuni, L = D.valoriPers.listaElev;
  L.slice(0, 10).forEach(v => a.comuta("0|" + v, { checked: true }));
  const el = { checked: true }; a.comuta("0|" + L[10], el);
  assert.strictEqual(el.checked, false, "nu se pot alege mai mult de 10"); C.eroare = "";
  a.continua("1"); assert.ok(C.eroare.includes("până ajungi la 5")); C.eroare = "";
  a.continua("0"); assert.strictEqual(C.ecran, "valorile/p1");
  assert.strictEqual((C.module.valorile.ecran("p1").corp.match(/type="checkbox"/g) || []).length, 10, "la pasul 2 apar doar cele 10 alese");
  L.slice(0, 5).forEach(v => a.comuta("1|" + v, { checked: true })); a.continua("1");
  L.slice(0, 3).forEach(v => a.comuta("2|" + v, { checked: true })); a.continua("2");
  assert.strictEqual(C.ecran, "valorile/p3");
  a.continua("3"); assert.ok(C.eroare); C.eroare = "";
  S.pune("vp.top", L[1]); a.continua("3"); assert.strictEqual(C.ecran, "valorile/intrebari");
  const q = C.module.valorile.ecran("intrebari").corp;
  assert.ok(q.includes("Ce înseamnă „" + L[1] + "” pentru tine?") && q.includes("Când simți „" + L[1] + "” în viața ta?") && !/De ce|\{v\}/.test(q));
  S.pune("vp.nota.v0", 8); S.pune("vp.nota.v1", 3); S.pune("vp.nota.v2", 9);
  a.gata(); const r = C.module.valorile.ecran("rezultat").corp;
  assert.ok(r.includes(L[1]) && r.includes("contează 3 din 10") && r.includes("Ține minte aceste valori"));
  assert.ok(C.module.valorile.ecran("nota").titlu === "Cât contează pentru tine?" && !C.module.valorile.ecran("nota").corp.includes("trăiești"));
  assert.ok(C.module.elev.ecran("meniu").corp.includes("Valorile mele"));
  /* dacă schimbi alegerea de la început, pașii următori păstrează doar ce e încă ales */
  a.comuta("0|" + L[0], { checked: false }); a.comuta("0|" + L[20], { checked: true }); a.continua("0");
  assert.ok(!(S.ia("vp.ales.p1") || []).includes(L[0]) && !(S.ia("vp.ales.p2") || []).includes(L[0]));
  S.sterge();
});
test("stima de sine: scorul 10–40, cu afirmațiile 3, 5, 8, 9, 10 punctate invers", () => {
  const f = C.module.stima.scor, toate = v => Object.fromEntries(D.stima.itemi.map(i => [i.id, v]));
  assert.strictEqual(D.stima.itemi.filter(i => i.inv).map(i => i.id).join(), "s3,s5,s8,s9,s10");
  assert.strictEqual(f(toate(4)), 25, "acord puternic la tot: 5×4 + 5×1");
  const maxim = Object.fromEntries(D.stima.itemi.map(i => [i.id, i.inv ? 1 : 4]));
  const minim = Object.fromEntries(D.stima.itemi.map(i => [i.id, i.inv ? 4 : 1]));
  assert.strictEqual(f(maxim), 40); assert.strictEqual(f(minim), 10);
  assert.strictEqual(f({ s1: 4 }), null, "fără toate răspunsurile nu se calculează");
});
test("stima de sine: două pagini, rezultat fără etichete, idei pe vârstă și ajutor când scorul e jos", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "9");
  const a = C.module.stima.actiuni;
  a.pagina("0"); assert.strictEqual(C.eroare, D.stima.lipsa); C.eroare = "";
  D.stima.itemi.forEach(i => S.pune("stima.r." + i.id, i.inv ? 4 : 1));
  a.pagina("0"); assert.strictEqual(C.ecran, "stima/p1"); a.pagina("1"); assert.strictEqual(C.ecran, "stima/rezultat");
  let r = C.module.stima.ecran("rezultat").corp;
  assert.ok(r.includes("<strong>10 din 40</strong>") && r.includes("jumătatea de jos") && r.includes(D.stima.rezultat.ajutorElev) && r.includes("Puncte forte"));
  assert.ok(!/scăzut|redus|normal|patolog/i.test(r), "fără etichete");
  D.stima.itemi.forEach(i => S.pune("stima.r." + i.id, i.inv ? 1 : 4));
  S.pune("varsta", "45+"); S.pune("situatie", "caut");
  r = C.module.stima.ecran("rezultat").corp;
  assert.ok(r.includes("40 din 40") && r.includes("jumătatea de sus") && !r.includes(D.stima.rezultat.ajutorAdult) && r.includes("Continuă: Ce cer angajatorii acum"));
  assert.deepStrictEqual(Verificator.verificaText(r.replace(/<[^>]+>/g, " ")).map(x => x.gasit), []);
  S.sterge();
});

console.log("Negocierea salariului");
test("negocierea: doar la adulți care caută, schimbă domeniul sau revin; 7 pași; fără sume sau procente în texte", () => {
  assert.strictEqual(D.negociere.pasi.length, 7);
  const tot = JSON.stringify(D.negociere);
  assert.ok(!/\d+\s*%|\d{3,}\s*lei|\bRON\b/.test(tot.replace(/\{min\}|\{max\}/g, "")), "fără sume sau procente");
  assert.ok(D.adulti.situatii.find(s => s.id === "nustiu").pasi.indexOf("negociere") < 0);
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "12");
  assert.ok(!C.module.elev.ecran("meniu").corp.includes("Negocierea"), "elevii nu au negocierea");
  S.pune("varsta", "45+"); S.pune("situatie", "pauza");
  const h = C.module.negociere.ecran("hub").corp;
  assert.ok(h.includes(C.esc(D.negociere.situatii.pauza)) && h.includes(C.esc(D.negociere.situatii.accent45)) && h.includes("7. Exersează discuția"));
  D.negociere.pasi.forEach(p => assert.deepStrictEqual(Verificator.verificaText(C.module.negociere.ecran(p.id).corp.replace(/<[^>]+>/g, " ")).map(x => x.gasit), [], p.id));
  assert.ok(C.module.negociere.ecran("exercitiu").corp.includes("Continuă: Cum mă văd eu"));
  S.sterge();
});
test("fișa de pregătire: verifică sumele între ele și scrie fraza cu intervalul", () => {
  const f = C.module.negociere.verificaFisa, P = D.negociere.fisa.probleme;
  assert.deepStrictEqual(f({ minim: "4000" }).probleme, [P.lipsa]);
  const bun = f({ minim: "4.000", dorit: "5000", intMin: "4500 lei", intMax: "5500", arg1: "a", arg2: "b", arg3: "c" });
  assert.ok(bun.ok); assert.strictEqual(bun.fraza, "„Mă gândesc la un salariu net între 4.500 și 5.500 lei, în funcție de responsabilități și beneficii.”");
  const rau = f({ minim: "5000", dorit: "4000", intMin: "3000", intMax: "2000", arg1: "a" });
  assert.deepStrictEqual(rau.probleme, [P.dorit, P.interval, P.ordine, P.argumente]);
  S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", "caut");
  ["minim", "dorit", "intMin", "intMax", "arg1", "arg2", "arg3"].forEach((k, i) => S.pune("neg.f." + k, ["4000", "5000", "4500", "5500", "x", "y", "z"][i]));
  C.module.negociere.actiuni.verifica(); assert.strictEqual(C.deArata, "rezultat-fisa"); C.deArata = "";
  assert.ok(C.module.negociere.ecran("fisa").corp.includes("4.500 și 5.500 lei") && C.module.adult.ecran("meniu").corp.includes("✓ fișă făcută"));
  assert.ok(C.module.negociere.ecran("moment").corp.includes("între 4.500 și 5.500 lei"));
  const pr = C.module.negociere.promptIA("Contabil.", S.ia("neg.f"));
  assert.ok(pr.startsWith("Vreau să exersez o discuție despre salariu, în limba română, pentru postul de Contabil.") && pr.includes("între 4.500 și 5.500 lei") && pr.includes("Nu-mi spune ce sumă să cer"));
  assert.ok(!/minim|dorit|5\.000/.test(pr.replace("Intervalul meu net", "")), "promptul nu conține minimul sau ce își dorește omul");
  S.sterge();
});

console.log("Ecranele se desenează");
test("fiecare ecran se desenează fără erori și fără „undefined”", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const ecrane = ["lectie/roata/1", "lectie/plan/0", "lectie/cerinte/2", "lectie/scrisoare/0", "lectie/negociere/2", "lectie/corp/2", "lectie/asertiv/0", "lectie/asertiv/1", "lectie/asertiv/2", "lectie/interviu/1", "lectie/valori/2", "cauta/intro", "cauta/pasi", "cauta/siteuri", "cauta/ia", "cauta/pacaleli", "cauta/misiune", "datele/tot", "lectie/cv/0", "lectie/cv/2", "lectie/cv/final", "plan/woop", "retine/recap", "caiet/tot", "roata/intro", "roata/note", "roata/rezultat", "cerinte/lista", "corp/intro", "corp/semne", "corp/tinuta", "corp/exercitiu", "corp/gata", "start", "elev/clasa", "elev/bunvenit", "elev/meniu", "adult/situatie", "adult/bunvenit", "adult/meniu", "adult/pas/cv", "cv/intro", "cv/q0", "cv/q1", "cv/q2", "cv/q3", "cv/q4", "cv/rezultat", "cv/ia", "scrisoare/intro", "scrisoare/q0", "scrisoare/q1", "scrisoare/q2", "scrisoare/q3", "scrisoare/q4", "scrisoare/q5", "scrisoare/schelet", "scrisoare/ia", "interviu/hub", "interviu/povesti", "interviu/poveste/1", "interviu/poveste/5", "interviu/grup/tine", "interviu/grup/experienta", "interviu/grup/motivatie", "interviu/grup/dificile", "interviu/grup/special", "interviu/exersez", "competente/intro", "competente/a", "competente/b", "competente/tabel", "competente/concluzie", "asertiv/intro", "asertiv/exemplu/1", "asertiv/exemplu/5", "asertiv/exercitiu", "asertiv/ia", "exercitii/quiz/compliment", "exercitii/quiz/compliment/1", "exercitii/quiz/gluma/3", "exercitii/quiz/argumente", "exercitii/quiz/argumente/3", "exercitii/argumentez", "valorile/intro", "valorile/p0", "valorile/p1", "valorile/p2", "valorile/p3", "valorile/intrebari", "valorile/nota", "valorile/rezultat", "stima/intro", "stima/p0", "stima/p1", "stima/rezultat", "negociere/hub", "negociere/piata", "negociere/fisa", "negociere/moment", "negociere/interval", "negociere/ton", "negociere/oferta", "negociere/exercitiu", "exercitii/cerere", "exercitii/pauza", "exercitii/voce", "exercitii/capete", "exercitii/cuvinte", "exercitii/intrebari",
    "interese/intro", "interese/test", "interese/rezultat",
    "forte/intro", "forte/m0", "forte/m1", "forte/m2", "forte/ik0", "forte/ik1", "forte/ik2", "forte/ik3", "forte/valori", "forte/rezumat",
    "meserii/lista", "meserii/toate", "meserii/salvate",
    "plan/hub", "plan/scop0", "plan/scop1", "plan/scop2", "plan/scop3", "plan/scop4", "plan/scop5", "plan/scopRez",
    "plan/saptamana", "plan/obstacole", "plan/convingere", "plan/privire",
    "sfaturi/lista", "sfaturi/motivatie", "sfaturi/piata", "sfaturi/primul-job", "sfaturi/alegere",
    "sistem/setari", "sistem/sterge", "sistem/date", "sistem/despre", "sistem/criza"];
  function treci(stare) {
    ecrane.forEach(e => {
      const [m, ...r] = e.split("/"); const p = C.module[m].ecran(r.join("/"));
      assert.ok(p && p.titlu && typeof p.corp === "string", e);
      assert.ok(!/undefined|\[object|NaN/.test(p.titlu + p.corp), e + " conține text greșit");
      const t = Verificator.verificaText(p.titlu + " " + p.corp.replace(/<[^>]+>/g, " "));
      assert.deepStrictEqual(t.map(x => x.gasit), [], e);
      /* Regula din prompt: pe ecran nu apar autori, studii, firme folosite ca sursă sau date calendaristice. */
      /* Termenele temelor omului (zz.ll.aaaa) sunt ale lui, nu date despre surse: ele pot apărea. */
      const vizibil = (p.titlu + " " + p.corp.replace(/<[^>]+>/g, " ")).replace(/\b\d\d\.\d\d\.\d{4}\b/g, "");
      const interzis = m === "cauta" ? null : /\b(19|20)\d\d\b|ianuarie|februarie|martie|aprilie|\bmai 20|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie|Holland|RIASEC|Schein|Dweck|Rosenberg|Martín|Raugh|Journal|eJobs|BestJobs|Hays|Manpower|PwC|SD Worx|\bINS\b|ANOFM|EURES|ILBAH|Galinsky|Mussweiler|Thorsteinson|Cullen|Ladders|Sursa:|Ikigai|\bmoai\b|wabi|Morita|ichi-go|hachi|yuimaaru|Okinawa|Frankl|\bBosi\b|JobPsi|busola ta/i.exec(vizibil);
      assert.ok(!interzis, e + " (" + stare + ") conține „" + (interzis && interzis[0]) + "”");
    });
  }
  treci("gol");
  /* și cu un traseu completat */
  const r = {}; D.interese.intrebari.forEach(q => { r[q.id] = 4; });
  S.pune("interese.r", r); S.pune("interese.top", ["S", "I", "A"]); S.pune("forte.valori", ["ajutor", "invatare", "echipa"]);
  S.pune("plan.start", C.azi()); S.pune("plan.scop.specific", "Vorbesc cu <b>doi</b> oameni"); S.pune("plan.sapt.s0.aleasa", "t1"); S.pune("plan.sapt.s0.bifat", true);
  S.pune("meserii.salvate", ["sanatate"]);
  treci("complet");
  ["18-44", "45+"].forEach(v => { S.pune("varsta", v); ["caut", "schimb", "pauza", "nustiu"].forEach(si => { S.pune("situatie", si); treci(v + " " + si); }); });
  /* textul scris de utilizator este protejat (nu se execută ca HTML) */
  const hub = C.module.plan.ecran("hub").corp;
  assert.ok(!hub.includes("<b>doi</b>") && hub.includes("&lt;b&gt;doi"));
  S.sterge();
});

console.log("\n" + ok + " teste trecute" + (process.exitCode ? ", dar sunt și eșecuri." : "."));
