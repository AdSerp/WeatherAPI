// src/components/CurrentForecast.jsx
import React, { useState, useEffect } from 'react';

const API_KEY = '958c14fbfce97075b4c3cf3223739867';

const CurrentForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchForecast(latitude, longitude);
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
        setLoading(false);
      }
    );
  }, []);

  const fetchForecast = async (lat, lon) => {
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

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Previsión del tiempo a 5 días para tu ubicación actual</h2>
      {forecastData ? (
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
      ) : (
        <p>No se pudo cargar la previsión del tiempo.</p>
      )}
    </div>
  );
};

export default CurrentForecast;
