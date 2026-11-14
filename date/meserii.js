/* Date: meserii și domenii.
   IMPORTANT: descrierile sunt generale, scrise ca ciornă. Nu conțin salarii, cifre sau date despre cererea de pe piața muncii.
   Ce licee, facultăți și cursuri există se schimbă de la an la an: elevul trebuie să verifice oferta actuală pe site-ul școlii sau al facultății.
   Ultima verificare de către Simona: NEVERIFICAT (ciornă scrisă la 2026-11-11). */
window.DATE = window.DATE || {};
window.DATE.meserii = {
  verificat: "neverificat",
  scriere: "2026-11-11",
  nota: "Descrieri generale. Oferta de licee, facultăți și cursuri se schimbă: verifică întotdeauna pe site-ul școlii sau al facultății.",
  lista: [
    {
      id: "sanatate", nume: "Profesii din sănătate (asistent medical, medic, farmacist)",
      tipuri: ["S", "I"], valori: ["ajutor", "siguranta", "expertiza"],
      ceFace: "Îi ajută pe oameni să se simtă mai bine: îi îngrijește, îi tratează sau îi sfătuiește.",
      ceInvata: "Biologie, chimie, cum funcționează corpul, comunicare cu pacienții.",
      drumuri: "Licee cu profil sanitar sau real; școli postliceale sanitare; facultăți din domeniul medical și farmaceutic.",
      alte: "Voluntariat în servicii de îngrijire, cursuri de prim ajutor."
    },
    {
      id: "educatie", nume: "Educație (învățător, profesor, educator)",
      tipuri: ["S", "E", "A"], valori: ["ajutor", "echipa", "respect"],
      ceFace: "Ajută copiii și tinerii să învețe și să crească, explicând și organizând activități.",
      ceInvata: "Materia pe care o predai, cum explici pe înțelesul fiecăruia, răbdare și organizare.",
      drumuri: "Licee pedagogice; facultăți și programe de pregătire pentru cariera didactică.",
      alte: "Meditații, voluntariat cu copii, ateliere pentru copii."
    },
    {
      id: "psiho", nume: "Psihologie și consiliere",
      tipuri: ["S", "I"], valori: ["ajutor", "invatare", "expertiza"],
      ceFace: "Ascultă oamenii și îi ajută să înțeleagă ce simt și ce pot face. Consilierii în carieră îi ajută să facă alegeri despre școală și muncă.",
      ceInvata: "Ascultare, comunicare, cum gândesc și cum se comportă oamenii.",
      drumuri: "Facultăți de psihologie sau științele educației, apoi cursuri de specializare.",
      alte: "Voluntariat în organizații care lucrează cu oameni, cursuri de comunicare."
    },
    {
      id: "software", nume: "Programare (dezvoltator de aplicații și site-uri)",
      tipuri: ["I", "C"], valori: ["provocare", "invatare", "libertate"],
      ceFace: "Scrie programele din telefoane, calculatoare și site-uri și rezolvă probleme cu ajutorul codului.",
      ceInvata: "Logică, limbaje de programare, lucru în echipă cu alți programatori.",
      drumuri: "Licee cu profil de informatică; facultăți de informatică sau automatică; cursuri online sau în centre de formare.",
      alte: "Proiecte personale, cluburi de programare, cursuri gratuite."
    },
    {
      id: "date", nume: "Analiza datelor",
      tipuri: ["I", "C"], valori: ["invatare", "provocare", "expertiza"],
      ceFace: "Strânge cifre și informații și le explică, astfel încât alții să poată lua decizii.",
      ceInvata: "Matematică, statistică, tabele, programe pentru analiză, explicarea clară a rezultatelor.",
      drumuri: "Licee cu profil real; facultăți de matematică, informatică sau economie.",
      alte: "Cursuri online, proiecte cu date deschise."
    },
    {
      id: "inginerie", nume: "Inginerie (mecanică, electrică, construcții și altele)",
      tipuri: ["R", "I"], valori: ["provocare", "expertiza", "siguranta"],
      ceFace: "Proiectează, construiește și îmbunătățește mașini, clădiri, instalații sau sisteme.",
      ceInvata: "Matematică, fizică, desen tehnic, cum se rezolvă probleme practice.",
      drumuri: "Licee cu profil real sau tehnologic; facultăți tehnice.",
      alte: "Cluburi de robotică sau tehnică, proiecte practice."
    },
    {
      id: "meserii-tehnice", nume: "Meserii tehnice calificate (electrician, instalator, mecanic)",
      tipuri: ["R"], valori: ["siguranta", "libertate", "expertiza"],
      ceFace: "Instalează, repară și întreține instalații, mașini și echipamente. Mulți lucrează și pe cont propriu.",
      ceInvata: "Lucrul cu unelte, reguli de siguranță, cum găsești defecțiunea și o repari.",
      drumuri: "Licee tehnologice și școli profesionale; cursuri de calificare; ucenicie la un meseriaș.",
      alte: "Practică în ateliere, ajutor pe lângă un meseriaș."
    },
    {
      id: "bucatarie", nume: "Gastronomie (bucătar, cofetar, brutar)",
      tipuri: ["R", "A"], valori: ["creatie", "echipa", "provocare"],
      ceFace: "Pregătește mâncare și deserturi, respectând rețete și reguli de igienă, adesea în echipă.",
      ceInvata: "Tehnici de gătit, igienă, organizare în bucătărie, creativitate.",
      drumuri: "Licee și școli profesionale cu profil de turism și alimentație; cursuri de calificare.",
      alte: "Gătit acasă, practică în vacanțe, cursuri scurte."
    },
    {
      id: "design", nume: "Design grafic și vizual",
      tipuri: ["A"], valori: ["creatie", "libertate", "invatare"],
      ceFace: "Creează imagini, afișe, logo-uri și aspectul site-urilor și aplicațiilor.",
      ceInvata: "Culoare, compoziție, programe de design, ascultarea a ceea ce are nevoie clientul.",
      drumuri: "Licee de artă; facultăți de arte, design sau comunicare; cursuri de specializare.",
      alte: "Portofoliu propriu, proiecte pentru școală sau voluntariat."
    },
    {
      id: "arhitectura", nume: "Arhitectură și urbanism",
      tipuri: ["A", "I"], valori: ["creatie", "provocare", "expertiza"],
      ceFace: "Proiectează clădiri și spații în care oamenii locuiesc și lucrează.",
      ceInvata: "Desen, matematică, cum se folosesc spațiul și materialele, programe de proiectare.",
      drumuri: "Facultăți de arhitectură; licee cu profil artistic sau real ajută la pregătire.",
      alte: "Desen, machete, vizite la clădiri și șantiere."
    },
    {
      id: "media", nume: "Comunicare și conținut (jurnalism, filmări, rețele sociale)",
      tipuri: ["A", "E", "S"], valori: ["creatie", "libertate", "respect"],
      ceFace: "Povestește lucruri oamenilor prin text, imagine sau video și îi ține la curent.",
      ceInvata: "Scris clar, verificarea informațiilor, filmare și montaj, ascultare.",
      drumuri: "Facultăți de jurnalism sau comunicare; cursuri de film și media.",
      alte: "Blog, canal video, revista școlii."
    },
    {
      id: "arte", nume: "Muzică, teatru și arte",
      tipuri: ["A"], valori: ["creatie", "libertate", "respect"],
      ceFace: "Creează și interpretează muzică, spectacole sau alte lucrări artistice.",
      ceInvata: "Exercițiu regulat, disciplină, curaj în fața publicului.",
      drumuri: "Licee de artă sau de muzică; facultăți de arte, muzică sau teatru.",
      alte: "Cercuri, ateliere, spectacole de amatori."
    },
    {
      id: "finante", nume: "Contabilitate și finanțe",
      tipuri: ["C", "E"], valori: ["siguranta", "echilibru", "expertiza"],
      ceFace: "Ține evidența banilor unei firme sau a unei persoane și îi ajută să ia decizii financiare.",
      ceInvata: "Calcule, reguli de contabilitate, atenție la detalii, programe de evidență.",
      drumuri: "Licee cu profil economic; facultăți de economie; cursuri de contabilitate.",
      alte: "Ținerea unui buget personal sau al unui club, cursuri online."
    },
    {
      id: "administrativ", nume: "Administrație și birou (asistent, secretar, coordonator de birou)",
      tipuri: ["C", "S"], valori: ["siguranta", "echipa", "echilibru"],
      ceFace: "Organizează programări, documente și comunicarea dintr-un birou sau dintr-o firmă.",
      ceInvata: "Organizare, programe de birou, comunicare politicoasă, atenție la detalii.",
      drumuri: "Licee cu profil economic sau de servicii; cursuri de calificare.",
      alte: "Organizarea unor evenimente școlare, cursuri pentru programe de birou."
    },
    {
      id: "drept", nume: "Drept (avocat, jurist, consilier juridic)",
      tipuri: ["E", "I"], valori: ["provocare", "respect", "expertiza"],
      ceFace: "Explică legile, apără drepturile oamenilor și ajută firmele să respecte regulile.",
      ceInvata: "Citire atentă, argumentare, exprimare clară, răbdare cu textele lungi.",
      drumuri: "Facultăți de drept; licee umaniste ajută la pregătire.",
      alte: "Dezbateri școlare, concursuri de oratorie."
    },
    {
      id: "antreprenoriat", nume: "Antreprenoriat și vânzări",
      tipuri: ["E"], valori: ["libertate", "bani", "provocare"],
      ceFace: "Pornește sau conduce o afacere ori vinde produse și servicii. Atenție: nu toate afacerile reușesc, iar începutul poate fi greu.",
      ceInvata: "Cum vorbești cu clienții, cum faci un plan simplu, cum ții evidența banilor.",
      drumuri: "Licee economice; facultăți de economie sau de management; cursuri pentru micii întreprinzători.",
      alte: "Mini-afaceri la școală, târguri, voluntariat în organizații care vând pentru o cauză."
    },
    {
      id: "marketing", nume: "Marketing și promovare",
      tipuri: ["E", "A"], valori: ["creatie", "echipa", "provocare"],
      ceFace: "Face ca oamenii să afle despre produse sau servicii, prin reclame, texte și evenimente.",
      ceInvata: "Cum gândesc clienții, scris, imagine, planificarea unei campanii.",
      drumuri: "Facultăți de marketing, comunicare sau economie; cursuri online.",
      alte: "Promovarea unui eveniment școlar sau a unui club."
    },
    {
      id: "resurse-umane", nume: "Resurse umane",
      tipuri: ["S", "E", "C"], valori: ["ajutor", "echipa", "echilibru"],
      ceFace: "Se ocupă de oamenii dintr-o firmă: angajări, formare, probleme de echipă și acte.",
      ceInvata: "Comunicare, discreție, organizare, cunoașterea regulilor de angajare.",
      drumuri: "Facultăți de psihologie, științe ale educației, economie sau drept; cursuri de specializare.",
      alte: "Voluntariat în organizații, cursuri de comunicare."
    },
    {
      id: "cercetare", nume: "Cercetare științifică (biologie, chimie, fizică, mediu)",
      tipuri: ["I"], valori: ["invatare", "provocare", "expertiza"],
      ceFace: "Face experimente și studii ca să afle lucruri noi și să rezolve probleme mari.",
      ceInvata: "Metoda științifică, răbdare, scris precis, lucru în laborator sau în teren.",
      drumuri: "Licee cu profil real; facultăți de științe; masterat și doctorat pentru cercetare.",
      alte: "Olimpiade și concursuri, cluburi de știință."
    },
    {
      id: "agricultura", nume: "Agricultură și mediu",
      tipuri: ["R", "I"], valori: ["libertate", "ajutor", "echilibru"],
      ceFace: "Lucrează cu pământul, plantele, animalele sau ocrotirea naturii.",
      ceInvata: "Cum cresc plantele și animalele, utilaje, reguli de mediu, planificare pe sezoane.",
      drumuri: "Licee agricole sau de mediu; facultăți de agronomie, horticultură sau științele mediului.",
      alte: "Voluntariat de mediu, grădinărit, practică la o fermă."
    },
    {
      id: "veterinar", nume: "Medicină veterinară și îngrijirea animalelor",
      tipuri: ["I", "S", "R"], valori: ["ajutor", "expertiza", "provocare"],
      ceFace: "Îngrijește și tratează animalele și îi sfătuiește pe stăpânii lor.",
      ceInvata: "Biologie, cum se comportă animalele, calm și grijă, comunicare cu oamenii.",
      drumuri: "Licee cu profil real; facultăți de medicină veterinară.",
      alte: "Voluntariat la un adăpost pentru animale."
    },
    {
      id: "logistica", nume: "Logistică și transport",
      tipuri: ["C", "R"], valori: ["siguranta", "calatorii", "echilibru"],
      ceFace: "Organizează cum ajung mărfurile și oamenii dintr-un loc în altul, la timp.",
      ceInvata: "Planificare, orare, reguli de transport, programe pentru evidență.",
      drumuri: "Licee și școli profesionale cu profil de transport sau economic; cursuri de calificare.",
      alte: "Organizarea unor excursii sau a unor transporturi pentru un eveniment."
    },
    {
      id: "ordine", nume: "Servicii de ordine și intervenție (poliție, pompieri, salvare)",
      tipuri: ["R", "E", "S"], valori: ["ajutor", "provocare", "siguranta"],
      ceFace: "Protejează oamenii și intervine în situații de urgență.",
      ceInvata: "Pregătire fizică, calm sub presiune, reguli și proceduri, lucru în echipă.",
      drumuri: "Licee și școli specializate; școli de formare ale instituțiilor respective. Condițiile de admitere sunt stricte: verifică-le din timp.",
      alte: "Cursuri de prim ajutor, voluntariat în situații de urgență."
    },
    {
      id: "turism", nume: "Turism și ospitalitate (hotel, restaurant, ghid)",
      tipuri: ["E", "S"], valori: ["calatorii", "echipa", "respect"],
      ceFace: "Primește oamenii, organizează călătorii și se asigură că cei veniți se simt bine.",
      ceInvata: "Limbi străine, politețe, organizare, rezolvarea rapidă a problemelor.",
      drumuri: "Licee și școli cu profil de turism; facultăți de turism sau de management; cursuri de calificare.",
      alte: "Voluntariat la evenimente, vacanțe de lucru, învățarea limbilor străine."
    },
    {
      id: "social", nume: "Asistență socială",
      tipuri: ["S"], valori: ["ajutor", "echipa", "respect"],
      ceFace: "Susține oameni și familii care au nevoie de ajutor și îi leagă de serviciile potrivite.",
      ceInvata: "Ascultare, discreție, cunoașterea serviciilor din comunitate, răbdare.",
      drumuri: "Facultăți de asistență socială, sociologie sau psihologie; cursuri de specializare.",
      alte: "Voluntariat în organizații non-guvernamentale (ONG)."
    },
    {
      id: "sport", nume: "Sport, antrenorat și recuperare fizică",
      tipuri: ["S", "R"], valori: ["ajutor", "echilibru", "echipa"],
      ceFace: "Antrenează oameni sau îi ajută să se recupereze după accidentări.",
      ceInvata: "Cum funcționează corpul, motivarea celor din jur, exercițiu regulat și răbdare.",
      drumuri: "Licee cu program sportiv; facultăți de educație fizică, sport sau de recuperare medicală.",
      alte: "Cluburi sportive, voluntariat la competiții, cursuri de antrenor."
    }
  ]
};
