import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to get location");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    // Optionally trigger on mount, but usually better to let user click a button.
    // For this assessment, we might want to ask immediately or on a specific interaction.
    // Let's not ask immediately to respect user consent fully.
    setLoading(false);
  }, []);

  return { location, error, loading, requestLocation };
};
