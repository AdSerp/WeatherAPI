import React, { useState, useEffect } from 'react';
import WeatherDetails from './WeatherDetails';

const OPEN_WEATHER_API_KEY = '958c14fbfce97075b4c3cf3223739867';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

function CityWeather({ cities }) {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    const city = cities.find((c) => c.name === event.target.value);
    setSelectedCity(city);
  };

  useEffect(() => {
    if (selectedCity) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `${OPEN_WEATHER_URL}?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          );
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Error obteniendo los datos del clima:', error);
        }
      };
      fetchWeatherData();
    }
  }, [selectedCity]);

  return (
    <div>
      <h1>Buscar Clima por Ciudad</h1>
      <select onChange={handleCityChange} value={selectedCity.name}>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      {weatherData && <WeatherDetails weatherData={weatherData} />}
    </div>
  );
}

export default CityWeather;
