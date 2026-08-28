export const extraLessonPrice = 60;

export const packages = /** @type {const} */ ([
  {
    id: "instap",
    name: "Instappakket",
    lessons: 20,
    price: 1250,
    featured: false,
    description: "Een compacte route voor leerlingen met aanleg of eerdere rijervaring.",
    features: ["20 rijlessen", "Praktijkexamen", "Persoonlijk lesplan", "NXTDRIVE-inzicht"],
  },
  {
    id: "meest-gekozen",
    name: "Meest gekozen",
    lessons: 30,
    price: 1950,
    description: "De uitgebalanceerde opleiding met extra voorbereiding richting het examen.",
    featured: true,
    features: ["30 rijlessen", "Praktijkexamen", "Tussentijdse toets", "Persoonlijk lesplan", "NXTDRIVE-inzicht"],
  },
  {
    id: "zeker-slagen",
    name: "Zeker Slagen",
    lessons: 40,
    price: 2450,
    featured: false,
    description: "Maximale voorbereiding en extra zekerheid tijdens jouw rijopleiding.",
    features: ["40 rijlessen", "Praktijkexamen", "Tussentijdse toets", "Gratis herexamen*", "NXTDRIVE-inzicht"],
  },
]);
