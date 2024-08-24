import React from 'react';

function WeatherDetails({ weatherData }) {
  const iconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>Temperatura: {weatherData.main.temp}°C</p>
      <p>Descripción: {weatherData.weather[0].description}</p>
      <img src={iconUrl} alt={weatherData.weather[0].description} />
      <p>Humedad: {weatherData.main.humidity}%</p>
      <p>Fecha: {new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
    </div>
  );
}

export default WeatherDetails;
