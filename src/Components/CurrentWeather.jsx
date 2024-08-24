import React, { useState, useEffect } from 'react';
import WeatherDetails from './WeatherDetails';

const OPEN_WEATHER_API_KEY = '958c14fbfce97075b4c3cf3223739867';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

function CurrentWeather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error obteniendo la geolocalización:', error);
        }
      );
    } else {
      console.error('La geolocalización no es soportada por este navegador.');
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `${OPEN_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          );
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Error obteniendo los datos del clima:', error);
        }
      };
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <h1>Clima Actual</h1>
      {weatherData ? (
        <WeatherDetails weatherData={weatherData} />
      ) : (
        <p>Obteniendo datos del clima...</p>
      )}
    </div>
  );
}

export default CurrentWeather;
