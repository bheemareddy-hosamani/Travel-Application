import { useState, useEffect } from 'react';
import { fetchWeather, fetchWeatherByCity } from '../services/weatherService';
import { Cloud, Droplets, Wind, RefreshCw, AlertCircle } from 'lucide-react';
import './WeatherCard.css';

const WeatherCard = ({ coordinates, locationName, searchQuery }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async () => {
    if (!coordinates && !searchQuery) return;
    
    setLoading(true);
    setError(null);
    try {
      let data;
      if (coordinates) {
        data = await fetchWeather(coordinates.latitude, coordinates.longitude);
      } else if (searchQuery) {
        data = await fetchWeatherByCity(searchQuery);
      }
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [coordinates]);

  if (loading) {
    return (
      <div className="weather-card loading">
        <div className="skeleton-weather"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card error">
        <AlertCircle size={24} className="error-icon" />
        <p>Could not load weather for {locationName}.</p>
        <button onClick={loadWeather} className="retry-btn">
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h4>Current Weather</h4>
        <span className="weather-location">{locationName}</span>
      </div>
      
      <div className="weather-main">
        <div className="weather-temp">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather-icon-wrapper">
          <img 
            src={weather.weather[0].iconUrl || `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <span className="weather-condition">{weather.weather[0].main}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <Cloud size={16} />
          <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="weather-detail-item">
          <Droplets size={16} />
          <span>Humidity {weather.main.humidity}%</span>
        </div>
        <div className="weather-detail-item">
          <Wind size={16} />
          <span>Wind {weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
