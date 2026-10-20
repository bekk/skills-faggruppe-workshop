import { useEffect, useState } from "react";
import type { City, CurrentWeather } from "../types";
import { fetchCurrentWeather } from "../api/metno";
import { describeSymbol } from "../weatherSymbols";

interface WeatherCardProps {
  city: City;
}

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; weather: CurrentWeather };

export function WeatherCard({ city }: WeatherCardProps) {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetchCurrentWeather(city.latitude, city.longitude)
      .then((weather) => {
        if (!cancelled) setState({ status: "ready", weather });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [city.latitude, city.longitude]);

  return (
    <article className="weather-card">
      <h2>{city.name}</h2>

      {state.status === "loading" && <p className="weather-card__hint">Henter vær …</p>}

      {state.status === "error" && (
        <p className="weather-card__hint weather-card__hint--error">
          Klarte ikke å hente vær ({state.message})
        </p>
      )}

      {state.status === "ready" && (
        <>
          <div className="weather-card__main">
            <span className="weather-card__emoji" aria-hidden="true">
              {describeSymbol(state.weather.symbolCode).emoji}
            </span>
            <span className="weather-card__temperature">
              {Math.round(state.weather.temperature)}°
            </span>
          </div>
          <p className="weather-card__description">
            {describeSymbol(state.weather.symbolCode).label}
            {state.weather.precipitationNextHour !== null &&
              state.weather.precipitationNextHour > 0 &&
              ` · ${state.weather.precipitationNextHour} mm nedbør neste time`}
          </p>
        </>
      )}
    </article>
  );
}
