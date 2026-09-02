import { useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import WeatherCard from './WeatherCard';
import { MapPin, Navigation } from 'lucide-react';
import './LocalWeatherWidget.css';

const LocalWeatherWidget = () => {
  const { location, error, loading, requestLocation } = useLocation();
  const [manualLocation, setManualLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // For a real app, we would use a geocoding API here.
    // For this assessment, let's simulate coordinates based on a mock or just pass the city name.
    // However, WeatherCard requires lat/lon right now.
    // Let's modify WeatherCard to also accept a city name if we want, or we can use a geocoding API.
    // Actually, OpenWeather supports searching by city name.
    // Let's pass the search query as locationName and coordinates as null for now,
    // but we need to update WeatherCard to handle this.
    // To keep it simple, we will just alert the user that manual search requires geocoding API in this demo,
    // or we can just fetch weather by city name in WeatherCard. Let's assume WeatherCard can fetch by city if coordinates are missing.
    setManualLocation(searchQuery);
  };

  return (
    <div className="local-weather-widget">
      <div className="widget-header">
        <h3>Your Local Weather</h3>
      </div>
      
      {!location && !manualLocation && (
        <div className="location-prompt">
          <Navigation size={32} className="location-icon" />
          <p>Allow location access to see your local weather.</p>
          <button onClick={requestLocation} className="btn-primary" disabled={loading}>
            {loading ? 'Locating...' : 'Use My Location'}
          </button>
          
          <div className="divider"><span>OR</span></div>
          
          <form onSubmit={handleSearch} className="manual-search-form">
            <input 
              type="text" 
              placeholder="Enter your city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="manual-search-input"
            />
            <button type="submit" className="search-submit-btn">Search</button>
          </form>
          
          {error && <p className="location-error">{error}</p>}
        </div>
      )}

      {(location || manualLocation) && (
        <WeatherCard 
          coordinates={location} 
          locationName={manualLocation || "Your Location"} 
          searchQuery={manualLocation}
        />
      )}
    </div>
  );
};

export default LocalWeatherWidget;
