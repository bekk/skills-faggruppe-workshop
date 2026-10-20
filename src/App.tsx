import { cities } from "./data/cities";
import { WeatherCard } from "./components/WeatherCard";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Bekkværet ☔</h1>
        <p>Koselig oversikt over været der Bekk har folk.</p>
      </header>

      <main className="app__grid">
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </main>

      <footer className="app__footer">
        <p>Værdata fra met.no (Locationforecast 2.0).</p>
      </footer>
    </div>
  );
}

export default App;
