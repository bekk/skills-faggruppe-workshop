// Enkel oversettelse fra met.no sine symbolkoder til emoji + norsk tekst.
// Dekker ikke alle ~100 symbolkodene met.no har — bare et nyttig utvalg for
// workshopen. Ukjente koder faller tilbake til en nøytral sky.

const SYMBOL_MAP: Record<string, { emoji: string; label: string }> = {
  clearsky_day: { emoji: "☀️", label: "klarvær" },
  clearsky_night: { emoji: "🌙", label: "klarvær" },
  fair_day: { emoji: "🌤️", label: "lettskyet" },
  fair_night: { emoji: "🌤️", label: "lettskyet" },
  partlycloudy_day: { emoji: "⛅", label: "delvis skyet" },
  partlycloudy_night: { emoji: "☁️", label: "delvis skyet" },
  cloudy: { emoji: "☁️", label: "skyet" },
  rain: { emoji: "🌧️", label: "regn" },
  lightrain: { emoji: "🌦️", label: "lett regn" },
  heavyrain: { emoji: "🌧️", label: "kraftig regn" },
  rainshowers_day: { emoji: "🌦️", label: "regnbyger" },
  rainshowers_night: { emoji: "🌧️", label: "regnbyger" },
  snow: { emoji: "❄️", label: "snø" },
  lightsnow: { emoji: "🌨️", label: "lett snø" },
  sleet: { emoji: "🌨️", label: "sludd" },
  fog: { emoji: "🌫️", label: "tåke" },
  thunder: { emoji: "⛈️", label: "torden" },
};

export function describeSymbol(symbolCode: string): { emoji: string; label: string } {
  return SYMBOL_MAP[symbolCode] ?? { emoji: "☁️", label: "ukjent vær" };
}
