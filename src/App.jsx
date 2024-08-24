import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import CityWeather from './components/CityWeather';

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
        <Link to="/">Clima Actual</Link> | <Link to="/city-weather">Buscar por Ciudad</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/city-weather" element={<CityWeather cities={cities} />} />
      </Routes>
    </Router>
  );
}

export default App;
