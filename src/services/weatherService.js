const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Fallback mock data for demo purposes if API key is missing
const mockWeatherData = {
  main: { temp: 24, feels_like: 26, humidity: 65 },
  weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 3.5 }
};

export const fetchWeather = async (lat, lon) => {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
    console.warn('Weather API key is not configured. Using mock data.');
    return new Promise(resolve => setTimeout(() => resolve(mockWeatherData), 800));
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${OPENWEATHER_API_KEY}&q=${lat},${lon}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Map WeatherAPI response to match our component's expected structure
    return {
      main: {
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity
      },
      weather: [{
        main: data.current.condition.text,
        description: data.current.condition.text,
        iconUrl: "https:" + data.current.condition.icon
      }],
      wind: {
        speed: (data.current.wind_kph / 3.6).toFixed(1)
      }
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const fetchWeatherByCity = async (city) => {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
    console.warn('Weather API key is not configured. Using mock data.');
    return new Promise(resolve => setTimeout(() => resolve(mockWeatherData), 800));
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${OPENWEATHER_API_KEY}&q=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      main: {
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity
      },
      weather: [{
        main: data.current.condition.text,
        description: data.current.condition.text,
        iconUrl: "https:" + data.current.condition.icon
      }],
      wind: {
        speed: (data.current.wind_kph / 3.6).toFixed(1)
      }
    };
  } catch (error) {
    console.error("Error fetching weather by city:", error);
    throw error;
  }
};
