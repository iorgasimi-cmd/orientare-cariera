/* Recomandarea ColorPsi: o pagină separată, cu un singur lucru pe ecran. La finalul secțiunilor apare doar un buton care duce aici. */
(function (g) {
  "use strict";
  var C = g.Cariera, esc = C.esc, D = g.DATE.servicii;

  /* Butonul de la finalul secțiunii. */
  C.servicii = {
    card: function () {
      return '<div class="rand">' + C.buton(esc(D.buton), "nav", "servicii/tot", "lista") + "</div>";
    }
  };

  /* Pagina în sine: titlu, o propoziție, un buton spre site și „Înapoi”. Nimic altceva pe ecran. */
  C.reg("servicii", {
    ecran: function () {
      var corp = '<section class="card servicii"><h2>' + esc(D.titlu) + "</h2><p>" + esc(C.eAdult() ? D.text : D.textElev) + "</p>" +
        '<div class="rand"><a class="btn primar" href="' + esc(D.url) + '" target="_blank" rel="noopener noreferrer">' + esc(D.buton) +
        ' <span class="sr">(se deschide un site separat)</span></a></div></section>' +
        '<div class="rand">' + C.buton("Înapoi la drumul meu", "nav", C.acasa(), "primar") + "</div>";
      return C.pagina("Mai mult sprijin", corp, C.acasa());
    },
    actiuni: {}
  });
})(typeof window !== "undefined" ? window : globalThis);
