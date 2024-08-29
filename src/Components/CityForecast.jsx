// src/components/CityForecast.jsx
import React, { useState } from 'react';

const API_KEY = '958c14fbfce97075b4c3cf3223739867';

const CityForecast = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCityChange = (event) => {
    const city = cities.find(c => c.name === event.target.value);
    if (city) {
      fetchForecast(city.lat, city.lon);
    }
  };

  const fetchForecast = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
      const data = await response.json();
      setForecastData(data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Previsión del tiempo a 5 días para una ciudad</h2>
      <select onChange={handleCityChange} defaultValue="">
        <option value="" disabled>Selecciona una ciudad</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>

      {loading && <div>Cargando...</div>}

      {forecastData && (
        <ul>
          {forecastData.list.map((item) => (
            <li key={item.dt}>
              <p>{new Date(item.dt_txt).toLocaleString()}</p>
              <p>{item.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
              <p>Temperatura: {item.main.temp} °C</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityForecast;
