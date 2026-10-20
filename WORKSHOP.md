# Workshop – Møte 2: Instruksjonsfiler og skills

Praktisk del av faggruppemøtet "Kom i gang med AI-assistert koding" – møte 2.
Samme prinsipp som sist: dere kjenner forskjellen selv, i stedet for bare å
høre om den.

Møtet dekker kun instruksjonsfiler og skills (90 min reelt er ikke nok til
agent-/subagent-filer også) – den delen tas i et senere møte, sammen med
agenttyper/orkestrering.

## Forberedelser

- Et agentisk kodeverktøy dere allerede har satt opp (OpenCode, Cursor,
  eller tilsvarende) – bruk det dere er vant med.
- Node + npm installert.
- Vi bruker filnavnet `AGENTS.md` i denne workshopen. Bruker dere Claude
  Code, kan dere kalle filen `CLAUDE.md` i stedet — den leses på nøyaktig
  samme måte.
- **Bekkværet-starteren**, delt som eget GitHub-repo før møtet. Dette er en
  fungerende værapp (Oslo/Trondheim, React + TypeScript + Vite, værdata fra
  met.no) – bevisst **uten** noen instruksjonsfil eller skills fra start.
  Dere bygger begge deler selv i løpet av workshopen.
- Klon repoet og bekreft at det kjører før dere starter:
  ```bash
  npm install
  npm run dev
  ```

---

## Del 1: Instruksjonsfiler – kjenn forskjellen selv

**Mål:** Se konkret hva en god `AGENTS.md` faktisk endrer på
agentens output – ikke bare høre om det.

**Oppgaveteksten (brukes ord for ord, begge ganger):**

> "Legg til vindstyrke og vindretning i værvisningen for hver by."

Teksten er bevisst kort og realistisk – den typen enkle beskjed en
kollega faktisk ville gitt. Den sier ingenting om hvor koden skal ligge,
hvordan vindretning skal vises, eller hvilken tone den skal ha. Det er
akkurat det gapet en instruksjonsfil er ment å tette.

**Steg 1 – uten fil:**
1. Sørg for at repoet er rent og ikke har noen `AGENTS.md`.
2. Gi agenten oppgaveteksten over. La den jobbe ferdig.
3. Noter: Hvor la den koden (inline i komponenten, eller i et eget lag)?
   Hvordan vises vindretning (forkortelse, gradtall, eller norsk ord)? Er
   tonen konsistent med resten av appen?
4. Rull tilbake endringen (`git restore .`, eller start fra en ny branch)
   slik at repoet er rent igjen.

**Steg 2 – med fil:**
5. Legg til AGENTS.md-eksempelet under i repoets rot.
6. **Viktig:** start en *frisk* agent-sesjon – ikke fortsett i samme samtale.
   Poenget er at filen alene skal gi konteksten, ikke noe agenten husker fra
   forsøk nummer én.
7. Gi nøyaktig samme oppgavetekst som i steg 1.
8. Sammenlign direkte med steg 1–3: Ble arkitektur-reglene fulgt (riktig fil
   for værdata-parsing, riktig fil for typer)? Ble vindretning vist på norsk,
   med ord? Er tonen koselig, slik resten av appen er?

**AGENTS.md-eksempel (lim inn i repoets rot før steg 2):**

```
# Bekkværet

## Hva er dette?
En koselig værapp for byene Bekk har folk i. Viser nåværende temperatur og værsymbol per by.

## Teknologi
- React 19 + TypeScript, bygget med Vite
- Værdata fra met.no sitt Locationforecast 2.0-API (compact-format), hentet via en dev-proxy
  i vite.config.ts — ikke kall api.met.no direkte fra komponenter, det krever en
  User-Agent-header og CORS tillater det ikke.

## Arkitektur / hvor ting hører hjemme
- src/types.ts — delte typer (City, CurrentWeather)
- src/data/cities.ts — listen over byer appen viser. Nye byer legges til her.
- src/api/metno.ts — all henting/parsing av værdata. Ikke fetch direkte fra komponenter.
- src/weatherSymbols.ts — oversettelse av met.no sine symbolkoder til emoji + norsk tekst
- src/components/ — én komponent per visningskonsept (f.eks. WeatherCard)

## Domenespråk
- Bruk norske værord i UI-tekst: nedbør (ikke "precipitation"), vindstyrke, vindretning
  (nord/sør/øst/vest i brukertekst, ikke forkortelser som N/S/Ø/V)
- Tonen er koselig og uformell, ikke teknisk ("Snørike Trondheim" fremfor "Nedbørsmengde: 4mm")

## Konvensjoner
- Komponenter i PascalCase, én fil per komponent i src/components/
- All kommunikasjon med met.no skjer i src/api/metno.ts, aldri inline i komponenter
- Følg feilhåndteringsmønsteret fra WeatherCard.tsx (loading/error/ready) for nye datahentinger
- Appen skal alltid vise mørk modus (dark mode) — ikke lys modus, og ikke noe valg mellom dem

## Dine egne regler
<!-- Legg til 1–2 regler du selv mener trengs. Forslag: testdekning,
commit-meldingsformat, eller hvordan nye værmetrikker bør presenteres -->
```

**Refleksjonsspørsmål:**
- Hvilken konkret forskjell overrasket deg mest?
- Var det noe agenten fortsatt gjorde "feil" selv med filen? Hva mangler i så fall i filen?

---

## Del 2: Skills – kjenn forskjellen selv, igjen

**Mål:** Samme prinsipp som Del 1 – gjør oppgaven *uten* en skill først, se
hva som mangler, bygg så en skill for den, og sammenlign. Denne gangen for
en oppgave dere *ikke* gjør hele tiden (å legge til en ny by), som trenger
et par oppfølgingsspørsmål for å gjøre jobben ordentlig.

**Oppgaveteksten for selve by-oppgaven (brukes ord for ord, begge ganger):**

> "Legg til Bergen som en ny by i Bekkværet."

Bevisst like underspesifisert som Del 1 sin oppgavetekst – den sier
ingenting om kallenavn eller kontor. Uten noe som ber agenten spørre om
det, er det ingen grunn til at den skal gjøre det av seg selv.

**Steg 1 – uten skill:**
1. Sørg for at repoet ikke har noen skill for dette ennå.
2. Gi agenten oppgaveteksten over. La den jobbe ferdig.
3. Legg merke til: Spurte den om noe underveis (kallenavn, kontor), eller
   gjettet/utelot den det? Hvilke filer endret den (`cities.ts`? `types.ts`?
   noe i komponentene?)? Hva ser dere visuelt på Bergen-kortet sammenlignet
   med Oslo/Trondheim?
4. Rull tilbake endringen (`git restore .`) slik at repoet er rent igjen.

**Steg 2 – bygg skillen:**

Oppgavetekst (gis til agenten for å *bygge* skillen – ikke selve
by-oppgaven):

> "Lag en skill som legger til en ny by i Bekkværet. Skillen skal:
> 1. Spørre brukeren om bynavnet, og om et norsk kallenavn for byen
> 2. Spørre om Bekk har kontor i byen eller ikke
> 3. Finne eller spørre om koordinater (breddegrad/lengdegrad)
> 4. Legge byen til i `src/data/cities.ts`, med kallenavn og kontor-flagg
> 5. Oppdatere typen i `src/types.ts` og værkortet slik at kallenavnet og en
>    liten kontor-markør vises på kortet
> 6. Verifisere at appen fortsatt kjører og at den nye byen vises riktig"

5. Skriv en presis `name` og `description` for skillen før dere starter –
   dette er den eneste informasjonen agenten har for å vite *når* den skal
   brukes. En vag beskrivelse ("Hjelper med byer") gjør at skillen aldri
   trigges av seg selv – det er den samme fellen som gotchaen fra
   presentasjonen.
6. Be agenten bygge `SKILL.md` ut fra oppgaveteksten over.

**Steg 3 – med skill:**
7. Gi agenten *nøyaktig samme* oppgavetekst som i steg 1: "Legg til Bergen
   som en ny by i Bekkværet." Bekreft at skillen faktisk trigges (eller kall
   den eksplisitt hvis dere har satt den opp som kun manuelt kallbar).
8. Sjekk at den denne gangen faktisk *spør* om kallenavn og kontor, i stedet
   for å gjette eller hoppe over det.
9. Sammenlign direkte med steg 1–3: ligger byen i `cities.ts`/`types.ts` med
   kallenavn og kontor-felt denne gangen? Vises kallenavnet og en
   kontor-markør på Bergen-kortet nå, visuelt, som ikke var der i steg 1?

> **Du styrer fortsatt:** en skill som gjør flere steg selv (spør, skriv
> fil, oppdater komponent) er ikke en grunn til å slutte å se på diffen. Kjør
> `git diff` før dere commiter, akkurat som dere ville gjort med vanlig
> agent-output.

**Refleksjonsspørsmål:**
- Hva var den konkrete forskjellen mellom steg 1 og steg 3 – i koden og visuelt?
- Hvorfor passer akkurat denne oppgaven bedre som skill (den trengs ikke
  hele tiden) enn som noe i instruksjonsfilen (som alltid er i kontekst)?
- Hadde dere valgt model-invoked eller user-invoked for denne skillen? Hvorfor?

---

## Bonusoppgaver

*For de som rekker det i møtet, eller vil fortsette hjemme.*

- **Prøv en automatisk generert instruksjonsfil** (sjekk om verktøyet deres
  har en innebygd kommando for å generere en instruksjonsfil fra
  kodebasen). Sammenlign det genererte resultatet med AGENTS.md-filen dere
  skrev for hånd i Del 1.
- **Be agenten forbedre egne filer:** be den kritisere og foreslå
  forbedringer til både AGENTS.md-en og skillen dere skrev.
- **Last ned en skrive-skill:** hent Matt Pocock sin `/writing-for-agents`
  ([github.com/mattpocock/skills](https://github.com/mattpocock/skills)) og
  bruk den til å forbedre AGENTS.md-en eller skillen deres. Les gjennom
  skillen *før* dere tar den i bruk – samme prinsipp som gotchaen om tillit
  ved nedlasting fra presentasjonen.
- **Tenk over kundeprosjektet deres:** hvor i prosjektet ville en
  instruksjonsfil eller en skill gitt mest verdi akkurat nå?
- **Bonus, kundeprosjekt:** prøv de samme avanserte øvelsene (init,
  AI-forbedring, nedlastede skills) på et faktisk kundeprosjekt – *hvis* dere
  har avklart med prosjektet/kunden at det er greit å installere eksterne
  verktøy/skript der. Å skrive en egen instruksjonsfil for hånd er alltid
  trygt, siden det ikke introduserer noen ekstern kode.
