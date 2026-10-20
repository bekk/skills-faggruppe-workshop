import type { CurrentWeather } from "../types";

// Henter værdata fra met.no sitt Locationforecast-API (compact-format).
//
// Kalles via Vite sin dev-proxy ("/api/met", se vite.config.ts) i stedet for
// direkte mot api.met.no, fordi met.no:
//   1. Krever en identifiserende User-Agent-header (avvises uten)
//   2. Ikke setter CORS-headere som tillater kall direkte fra nettleseren
//
// Dokumentasjon: https://api.met.no/weatherapi/locationforecast/2.0/documentation

interface MetNoTimeseriesEntry {
  time: string;
  data: {
    instant: {
      details: {
        air_temperature: number;
      };
    };
    next_1_hours?: {
      summary: {
        symbol_code: string;
      };
      details?: {
        precipitation_amount?: number;
      };
    };
  };
}

interface MetNoResponse {
  properties: {
    timeseries: MetNoTimeseriesEntry[];
  };
}

export async function fetchCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeather> {
  const url = `/api/met/compact?lat=${latitude}&lon=${longitude}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`met.no svarte med status ${response.status}`);
  }

  const data: MetNoResponse = await response.json();
  const now = data.properties.timeseries[0];

  if (!now) {
    throw new Error("Fant ingen værdata i svaret fra met.no");
  }

  const symbolCode = now.data.next_1_hours?.summary.symbol_code ?? "cloudy";
  const precipitationNextHour =
    now.data.next_1_hours?.details?.precipitation_amount ?? null;

  return {
    temperature: now.data.instant.details.air_temperature,
    symbolCode,
    precipitationNextHour,
  };
}
