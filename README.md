# Bekkværet 🌦️

Koselig værapp for byene Bekk har folk i. Bygget i React + TypeScript + Vite,
med værdata fra [met.no sitt Locationforecast-API](https://api.met.no/weatherapi/locationforecast/2.0/documentation).

## Dette er en workshop-baseline

Dette repoet er startpunktet for workshopen i faggruppen **"Kom i gang med
AI-assistert koding"** (møte 2 — instruksjonsfiler og skills). Det er
bevisst en fungerende, men enkel app, uten noen instruksjonsfil
(`CLAUDE.md`/`AGENTS.md`) eller skills fra start — dere legger til begge
deler selv i løpet av workshopen.

Kom i gang:

```bash
npm install
npm run dev
```

Appen viser nåværende vær for Oslo og Trondheim. Dev-serveren proxyer kall
til met.no (se `vite.config.ts`) — det trengs for at kallene i det hele tatt
skal fungere fra nettleseren (met.no krever en identifiserende
User-Agent-header og setter ikke CORS-headere som tillater direktekall).

## Teknologi

- React 19 + TypeScript
- Vite (dev-server + build)
- met.no Locationforecast 2.0 (compact-format), hentet via en dev-proxy i `vite.config.ts`

## Struktur

```
src/
  types.ts               City- og værtyper
  data/cities.ts          Listen over byer appen viser vær for
  api/metno.ts             Henting og parsing av værdata fra met.no
  weatherSymbols.ts       Oversettelse av met.no sine symbolkoder til emoji/norsk tekst
  components/WeatherCard.tsx  Ett værkort per by
  App.tsx                  Rendrer kortene
```
