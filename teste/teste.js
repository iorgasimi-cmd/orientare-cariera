/* Teste automate (rulează cu: node teste/teste.js). Nu au nevoie de internet sau de instalări. */
"use strict";
const assert = require("assert");
const path = require("path");
const rad = path.join(__dirname, "..");

/* Un „localStorage" fals, ca să putem testa salvarea și ștergerea. */
function fals() { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, _m: m }; }
globalThis.window = globalThis;
globalThis.localStorage = fals();

["date/interese.js", "date/valori.js", "date/meserii.js", "date/sfaturi.js", "date/adulti.js",
 "js/stocare.js", "js/verificator.js", "js/nucleu.js",
 "js/module/interese.js", "js/module/puncte-forte.js", "js/module/meserii.js",
 "js/module/plan.js", "js/module/sfaturi.js", "js/module/reamintiri.js", "js/module/sistem.js", "js/module/adult.js"
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
    assert.ok(!/XMLHttpRequest|\bfetch\(|sendBeacon|WebSocket|https?:\/\//.test(t), d + "/" + f);
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
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Pune reamintirea în calendar"));
  S.pune("plan.sapt.s0.aleasa", "t1");
  const c = C.module.plan.ecran("saptamana").corp;
  assert.ok(c.includes("Pune reamintirea în calendar") && c.includes('type="time"') && c.includes('value="18:00"'));
  S.pune("plan.sapt.s0.bifat", true);
  assert.ok(!C.module.plan.ecran("saptamana").corp.includes("Pune reamintirea în calendar"));
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
  const ordine = { caut: ["CV-ul meu", "Scrisoarea de intenție", "Pregătirea pentru interviu", "Planul meu"],
    schimb: ["Test de interese", "Puncte forte și valori", "Ce iei cu tine în noul domeniu", "CV-ul meu", "Pregătirea pentru interviu", "Planul meu"],
    pauza: ["CV-ul meu", "Scrisoarea de intenție", "Pregătirea pentru interviu", "Planul meu"],
    nustiu: ["Test de interese", "Puncte forte și valori", "Planul meu"] };
  Object.keys(ordine).forEach(id => {
    S.sterge(); S.pune("varsta", "18-44"); S.pune("situatie", id);
    const sit = D.adulti.situatii.find(x => x.id === id);
    const b = C.module.adult.ecran("bunvenit").corp;
    assert.ok(b.includes(sit.bun.slice(0, 30)) && !b.includes(D.adulti.accent45), id);
    const m = C.module.adult.ecran("meniu").corp;
    let poz = -1;
    ordine[id].forEach((t, i) => { const k = m.indexOf((i + 1) + ". " + t); assert.ok(k > poz, id + ": " + t); poz = k; });
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

console.log("Ecranele se desenează");
test("fiecare ecran se desenează fără erori și fără „undefined”", () => {
  S.sterge(); S.pune("varsta", "sub18"); S.pune("clasa", "10");
  const ecrane = ["start", "elev/clasa", "elev/bunvenit", "elev/meniu", "adult/situatie", "adult/bunvenit", "adult/meniu", "adult/pas/cv",
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
    });
  }
  treci("gol");
  /* și cu un traseu completat */
  const r = {}; D.interese.intrebari.forEach(q => { r[q.id] = 4; });
  S.pune("interese.r", r); S.pune("interese.top", ["S", "I", "A"]); S.pune("forte.valori", ["ajutor", "invatare", "echipa"]);
  S.pune("plan.start", C.azi()); S.pune("plan.scop.specific", "Vorbesc cu <b>doi</b> oameni"); S.pune("plan.sapt.s0.aleasa", "t1"); S.pune("plan.sapt.s0.bifat", true);
  S.pune("meserii.salvate", ["sanatate"]);
  treci("complet");
  /* textul scris de utilizator este protejat (nu se execută ca HTML) */
  const hub = C.module.plan.ecran("hub").corp;
  assert.ok(!hub.includes("<b>doi</b>") && hub.includes("&lt;b&gt;doi"));
  S.sterge();
});

console.log("\n" + ok + " teste trecute" + (process.exitCode ? ", dar sunt și eșecuri." : "."));
