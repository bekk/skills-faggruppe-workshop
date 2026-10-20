// Delt typer for Bekkværet.
//
// MERK: Dette er en bevisst enkel baseline for workshopen i "Kom i gang med
// AI-assistert koding" — møte 2. Den inneholder IKKE felter for kallenavn
// eller Bekk-kontor ennå. Den delen bygges av "legg til en ny by"-skillen
// dere lager selv i løpet av workshopen.

export interface City {
  /** Kort, url-vennlig id, f.eks. "oslo" */
  id: string;
  /** Visningsnavn, f.eks. "Oslo" */
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  /** Grader celsius */
  temperature: number;
  /** met.no sin symbolkode, f.eks. "partlycloudy_day" */
  symbolCode: string;
  /** Millimeter nedbør neste time, hvis tilgjengelig */
  precipitationNextHour: number | null;
}
