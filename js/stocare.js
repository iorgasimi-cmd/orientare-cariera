/* Salvare DOAR pe telefon (în browser). Nu există server, cont sau serviciu extern.
   Dacă browserul nu permite salvarea (de exemplu fereastră privată), aplicația funcționează în continuare,
   dar progresul se pierde la închidere. */
(function (g) {
  "use strict";
  var CHEIE = "cariera_v1";
  var disponibil = true;
  var memorie = null;

  function implicit() { return { v: 1 }; }

  function incarca() {
    try {
      var t = g.localStorage.getItem(CHEIE);
      var o = t ? JSON.parse(t) : implicit();
      return (o && typeof o === "object") ? o : implicit();
    } catch (e) {
      disponibil = false;
      return memorie || implicit();
    }
  }

  var Stocare = {
    stare: incarca(),
    salveaza: function () {
      memorie = Stocare.stare;
      try { g.localStorage.setItem(CHEIE, JSON.stringify(Stocare.stare)); }
      catch (e) { disponibil = false; }
    },
    sterge: function () {
      try { g.localStorage.removeItem(CHEIE); } catch (e) { disponibil = false; }
      memorie = null;
      Stocare.stare = implicit();
    },
    disponibil: function () { return disponibil; },
    /* Citește/scrie o valoare după o cale de forma "plan.scop.q1". */
    ia: function (cale, implicitVal) {
      var o = Stocare.stare, parti = cale.split(".");
      for (var i = 0; i < parti.length; i++) {
        if (o == null || typeof o !== "object") return implicitVal;
        o = o[parti[i]];
      }
      return o === undefined ? implicitVal : o;
    },
    pune: function (cale, val) {
      var o = Stocare.stare, parti = cale.split(".");
      for (var i = 0; i < parti.length - 1; i++) {
        var p = parti[i];
        if (p === "__proto__" || p === "constructor" || p === "prototype") return;
        if (o[p] == null || typeof o[p] !== "object") o[p] = {};
        o = o[p];
      }
      var u = parti[parti.length - 1];
      if (u === "__proto__" || u === "constructor" || u === "prototype") return;
      o[u] = val;
      Stocare.salveaza();
    }
  };

  g.Stocare = Stocare;
  if (typeof module !== "undefined" && module.exports) module.exports = Stocare;
})(typeof window !== "undefined" ? window : globalThis);
