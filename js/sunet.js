/* Sunetul lui Simi: un ton cald și scurt, generat local cu Web Audio API — fără fișiere .mp3/.wav,
   fără bibliotecă externă, fără nicio cerere de rețea. Sunetul e doar pentru Simi: la atingere și
   când Simi arată că s-a terminat o etapă (un ecran de rezultat). Nu sună niciun alt buton din aplicație.
   Omul poate opri sunetul oricând; alegerea rămâne salvată pe telefon (js/stocare.js). */
(function (g) {
  "use strict";
  var C = g.Cariera, S = g.Stocare;
  var context = null;

  /* Contextul audio se creează doar la prima atingere (regula browserelor: fără sunet înainte de o acțiune a omului). */
  function contextAudio() {
    if (context) return context;
    var AC = g.AudioContext || g.webkitAudioContext;
    if (!AC) return null;
    try { context = new AC(); } catch (e) { context = null; }
    return context;
  }

  function oprit() { return !!S.ia("sunet.oprit", false); }

  /* Un ton cald: câteva note scurte, cu intrare și ieșire line, ca să nu sune brusc sau artificial. */
  function ton(note, durata) {
    if (oprit()) return;
    var a = contextAudio(); if (!a) return;
    try {
      if (a.state === "suspended" && a.resume) a.resume();
      var acum = a.currentTime;
      note.forEach(function (frecventa, i) {
        var osc = a.createOscillator(), castig = a.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frecventa, acum);
        var start = acum + i * 0.05;
        castig.gain.setValueAtTime(0.0001, start);
        castig.gain.linearRampToValueAtTime(0.07, start + 0.03);
        castig.gain.exponentialRampToValueAtTime(0.0001, start + durata);
        osc.connect(castig); castig.connect(a.destination);
        osc.start(start); osc.stop(start + durata + 0.05);
      });
    } catch (e) { /* un telefon care nu lasă să sune nu trebuie să oprească aplicația */ }
  }

  C.sunet = {
    /* La atingerea lui Simi: un ton scurt, de salut. */
    atingere: function () { ton([392, 523.25], 0.22); },
    /* Când Simi arată că s-a terminat o etapă: un mic acord, puțin mai lung. */
    gata: function () { ton([523.25, 659.25, 783.99], 0.5); },
    oprit: oprit,
    comuta: function () { S.pune("sunet.oprit", !oprit()); }
  };
})(typeof window !== "undefined" ? window : globalThis);
