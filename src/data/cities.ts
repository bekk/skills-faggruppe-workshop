import type { City } from "../types";

// Byene Bekkværet viser vær for.
//
// Bevisst holdt minimal (kun id/navn/koordinater) — dette er baseline-formen
// som workshop-deltakerne skal bygge videre på med en skill for å legge til
// nye byer (med kallenavn og Bekk-kontor-flagg).
export const cities: City[] = [
  { id: "oslo", name: "Oslo", latitude: 59.9139, longitude: 10.7522 },
  { id: "trondheim", name: "Trondheim", latitude: 63.4305, longitude: 10.3951 },
];
