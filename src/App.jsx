import React, { useState } from 'react';
import Weather from './components/Weather.jsx'; 


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [units, setUnits] = useState('metric'); // Optional: for unit choice

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${import.meta.env.VITE_API_KEY}&units=${units}`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Error fetching weather');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    getWeather();
  };

  return (
    <div className="app">
      <h1>Your Favorite Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select value={units} onChange={(e) => setUnits(e.target.value)}>
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
          <option value="standard">K</option>
        </select>
        <button type="submit">Get Weather</button>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {weather && (
        <>
          <Weather weatherData={weather} />
          <div className="weather">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F' : 'K'}</p>
            <p>Feels like: {weather.main.feels_like}°</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
