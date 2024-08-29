import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrentWeather from './Components/CurrentWeather';
import CityWeather from './Components/CityWeather';
import CurrentForecast from './Components/CurrentForecast';
import CityForecast from './Components/CityForecast'; 

const cities = [
  { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Barcelona', lat: 41.3851, lon: 2.1734 },
  { name: 'Sevilla', lat: 37.3891, lon: -5.9845 },
  { name: 'Valencia', lat: 39.4699, lon: -0.3763 },
  { name: 'Bilbao', lat: 43.263, lon: -2.935 },
];

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Clima Actual</Link> | <Link to="/city-weather">Buscar por Ciudad</Link> |{' '}
        <Link to="/current-forecast">Previsión Actual</Link> | <Link to="/city-forecast">Previsión por Ciudad</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/city-weather" element={<CityWeather cities={cities} />} />
        <Route path="/current-forecast" element={<CurrentForecast />} /> {/* Nueva ruta */}
        <Route path="/city-forecast" element={<CityForecast cities={cities} />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
