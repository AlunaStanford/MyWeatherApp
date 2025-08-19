import React from 'react';

const Weather = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
    return <p>No weather data available</p>;
  }

  const { main, description, icon } = weatherData.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log (icon)
  return (
    <div className="weather">
      <h2>{main}</h2>
      <p>{description}</p>
      <img src={iconUrl} alt={description} />
    </div>
  );
};

export default Weather;






