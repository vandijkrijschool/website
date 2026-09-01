export const demoReviews = [
  {
    name: "Noor",
    initials: "NO",
    area: "Den Haag",
    route: "Voorbeeldtraject 30",
    rating: 5,
    quote:
      "Vanaf de eerste les voelde de uitleg rustig en overzichtelijk. We werkten steeds aan één duidelijk aandachtspunt, waardoor ik met meer vertrouwen ging rijden.",
  },
  {
    name: "Milan",
    initials: "MI",
    area: "Rijswijk",
    route: "Voorbeeldtraject 20",
    rating: 5,
    quote:
      "De feedback was eerlijk en opbouwend. Na iedere les wist ik precies wat al goed ging en waar we de volgende keer aan zouden werken.",
  },
  {
    name: "Sara",
    initials: "SA",
    area: "Scheveningen",
    route: "Voorbeeldtraject 40",
    rating: 5,
    quote:
      "Druk stadsverkeer vond ik eerst spannend. Door situaties stap voor stap te oefenen, kreeg ik steeds meer overzicht en rust achter het stuur.",
  },
  {
    name: "Yassin",
    initials: "YA",
    area: "Voorburg",
    route: "Voorbeeldtraject 30",
    rating: 5,
    quote:
      "Geen standaardles, maar aandacht voor wat ik nodig had. Het persoonlijke tempo en de duidelijke uitleg maakten voor mij het verschil.",
  },
  {
    name: "Lotte",
    initials: "LO",
    area: "Leidschendam",
    route: "Voorbeeldtraject 30",
    rating: 5,
    quote:
      "De lessen waren logisch opgebouwd en ik kon mijn voortgang goed volgen. Dat gaf rust en hielp me gericht voorbereiden.",
  },
  {
    name: "Daan",
    initials: "DA",
    area: "Den Haag",
    route: "Voorbeeldtraject 20",
    rating: 5,
    quote:
      "Ook als iets niet meteen lukte, bleef de sfeer prettig. Ik kreeg concrete aanwijzingen die ik tijdens dezelfde les kon toepassen.",
  },
] as const;

export const demoStudent = {
  name: "Noor",
  package: "Voorbeeldtraject · 30 rijlessen",
  progress: 68,
  completedLessons: 12,
  upcoming: [
    { day: "Dinsdag", time: "14:30", focus: "Invoegen & uitvoegen", status: "Demo" },
    { day: "Vrijdag", time: "16:00", focus: "Zelfstandig navigeren", status: "Demo" },
    { day: "Volgende week", time: "10:30", focus: "Bijzondere verrichtingen", status: "Demo" },
  ],
  skills: [
    { name: "Voertuigbediening", score: 86, status: "Zelfstandig" },
    { name: "Kijkgedrag", score: 74, status: "Goed op weg" },
    { name: "Voorrang & kruispunten", score: 69, status: "Oefenen" },
    { name: "Invoegen & uitvoegen", score: 48, status: "Volgend leerdoel" },
  ],
  reports: [
    { lesson: "Les 12", subject: "Rotondes & doorstroming", note: "Eerder snelheid aanpassen en de juiste rijstrook kiezen.", date: "Deze week" },
    { lesson: "Les 11", subject: "Stadsverkeer", note: "Meer rust bewaren bij fietsers, trams en onverwachte drukte.", date: "Vorige week" },
    { lesson: "Les 10", subject: "Kijkroutine", note: "Voor iedere handeling bewust spiegels en omgeving controleren.", date: "2 weken geleden" },
  ],
} as const;
