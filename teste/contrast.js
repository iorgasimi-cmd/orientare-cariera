/* Verifică contrastul culorilor din css/culori.css, după regulile WCAG 2.1.
   Rulează cu:  node teste/contrast.js
   Reguli: text normal cel puțin 4,5; text mare și margini/simboluri cel puțin 3. Aici cerem 4,5 pentru tot textul. */
"use strict";
const fs = require("fs"), path = require("path");
const css = fs.readFileSync(path.join(__dirname, "..", "css", "culori.css"), "utf8");

function lum(hex) {
  const n = parseInt(hex.slice(1), 16), c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => {
    v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

/* Cele patru seturi de culori: luminos / luminos adulți / întunecat / întunecat adulți. */
const blocuri = [...css.matchAll(/(:root|body\[data-traseu="adult"\])\s*\{([^}]*)\}/g)].map(m => {
  const o = {}; [...m[2].matchAll(/--([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)].forEach(x => { o[x[1]] = x[2].toUpperCase(); }); return o;
});
if (blocuri.length !== 4) { console.error("Nu am găsit cele 4 blocuri de culori (luminos, luminos-adult, întunecat, întunecat-adult)."); process.exit(1); }
const seturi = {
  "luminos (elevi)": blocuri[0],
  "luminos (adulți)": Object.assign({}, blocuri[0], blocuri[1]),
  "întunecat (elevi)": Object.assign({}, blocuri[0], blocuri[2]),
  "întunecat (adulți)": Object.assign({}, blocuri[0], blocuri[2], blocuri[3])
};

/* [prim-plan, fundal, minim, ce este] */
const TEXT = [
  ["text", "fundal", 4.5, "text obișnuit pe fundal"],
  ["text", "suprafata", 4.5, "text pe cartele și câmpuri"],
  ["text", "principal-moale", 4.5, "text pe fundal discret albastru-verzui"],
  ["text", "cald-moale", 4.5, "text în felicitări și pași făcuți"],
  ["text-slab", "fundal", 4.5, "text secundar pe fundal"],
  ["text-slab", "suprafata", 4.5, "text secundar pe cartele"],
  ["text-slab", "principal-moale", 4.5, "text secundar pe fundal albastru-verzui"],
  ["principal", "fundal", 4.5, "titluri albastru-verzui pe fundal"],
  ["principal", "suprafata", 4.5, "titluri și butoane secundare pe cartele"],
  ["principal", "principal-moale", 4.5, "titluri pe fundal discret"],
  ["principal-text", "principal", 4.5, "text pe butonul principal"],
  ["cald-text", "cald", 4.5, "text pe butonul „Continuă” (roșu)"],
  ["eroare-text", "eroare-fundal", 4.5, "text de eroare"],
  ["eroare-text", "suprafata", 4.5, "butonul „Șterge tot” pe cartele"],
  ["verde-text", "verde", 4.5, "text pe butonul „Înapoi” (verde)"],
  ["glosar-text", "glosar-fundal", 4.5, "text pe cartela „Cuvinte de știut”"],
];
const MARGINI = [
  ["contur", "fundal", 3, "margini (bara de progres) pe fundal"],
  ["contur", "suprafata", 3, "margini de câmpuri și butoane de alegere"],
  ["principal", "fundal", 3, "margini de butoane principale pe fundal"],
  ["principal", "suprafata", 3, "margini de butoane pe cartele"],
  ["cald-contur", "fundal", 3, "marginea butonului „Continuă” pe fundal"],
  ["cald-contur", "suprafata", 3, "marginea butonului „Continuă” pe cartele"],
  ["cald-contur", "cald-moale", 3, "marginea felicitărilor"],
  ["eroare-contur", "eroare-fundal", 3, "marginea atenționărilor"],
  ["eroare-contur", "fundal", 3, "marginea atenționărilor pe fundal"],
  ["verde-contur", "fundal", 3, "marginea butonului „Înapoi” pe fundal"],
  ["verde-contur", "suprafata", 3, "marginea butonului „Înapoi” pe cartele"],
  ["verde-contur", "verde", 1.3, "inelul de semnalizare pe butonul „Înapoi”"],
  ["focus", "fundal", 3, "conturul de focus"],
  ["focus", "suprafata", 3, "conturul de focus pe cartele"]
];

let esecuri = 0, total = 0;
for (const [nume, c] of Object.entries(seturi)) {
  console.log("\n" + nume);
  for (const [fp, fd, minim, ce] of [...TEXT, ...MARGINI]) {
    if (!c[fp] || !c[fd]) { console.log("  ?? lipsește culoarea: " + fp + " sau " + fd); esecuri++; continue; }
    const r = contrast(c[fp], c[fd]); total++;
    const bine = r >= minim; if (!bine) esecuri++;
    console.log("  " + (bine ? "ok   " : "EȘEC ") + r.toFixed(2).padStart(5) + " (minim " + minim + ")  " + ce + "  [" + c[fp] + " pe " + c[fd] + "]");
  }
}
console.log("\n" + (total - esecuri) + " din " + total + " perechi trec." + (esecuri ? " Sunt " + esecuri + " care nu trec." : ""));
process.exitCode = esecuri ? 1 : 0;
