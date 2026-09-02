const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchImages = async (query, perPage = 1) => {
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'your_pexels_api_key_here') {
    console.warn("Pexels API key is missing. Using fallback images.");
    // Return a dummy fallback image if key is not configured
    return [{
      id: Math.random(),
      src: {
        large: `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200`,
        medium: `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600`,
      },
      alt: "Fallback Travel Image"
    }];
  }

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
