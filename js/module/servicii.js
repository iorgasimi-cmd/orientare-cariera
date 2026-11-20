/* Cardul cu legătura către serviciile ColorPsi. Apare doar la secțiunile de comunicare și la CV-ul pentru adulți (vezi retine.js). */
(function (g) {
  "use strict";
  var C = g.Cariera, esc = C.esc, D = g.DATE.servicii;
  C.servicii = {
    card: function () {
      return '<section class="card servicii"><h2>' + esc(D.titlu) + "</h2><p>" + esc(C.eAdult() ? D.text : D.textElev) + "</p>" +
        '<div class="rand"><a class="btn primar" href="' + esc(D.url) + '" target="_blank" rel="noopener noreferrer">' + esc(D.buton) +
        ' <span class="sr">(se deschide un site separat)</span></a></div>' +
        '<p class="mic">' + esc(D.nota) + "</p></section>";
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
