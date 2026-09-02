const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchImages = async (query, perPage = 1) => {
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'your_pexels_api_key_here') {
    console.warn("Pexels API key is missing. Using fallback images.");
    
    // Use the custom uploaded Paris image if the query contains Paris
    if (query.toLowerCase().includes('paris') && !query.toLowerCase().includes('eiffel') && !query.toLowerCase().includes('louvre')) {
      return [{
        id: 'paris-custom',
        src: {
          large: '/assets/paris.jpg',
          medium: '/assets/paris.jpg',
        },
        alt: "Paris Cityscape"
      }];
    }

    // Use the custom uploaded Eiffel Tower image if the query contains Eiffel
    if (query.toLowerCase().includes('eiffel')) {
      return [{
        id: 'eiffel-tower-custom',
        src: {
          large: '/assets/eiffel-tower.jpg',
          medium: '/assets/eiffel-tower.jpg',
        },
        alt: "Eiffel Tower"
      }];
    }

    // Use the custom uploaded Louvre image if the query contains Louvre
    if (query.toLowerCase().includes('louvre')) {
      return [{
        id: 'louvre-custom',
        src: {
          large: '/assets/louvre.jpg',
          medium: '/assets/louvre.jpg',
        },
        alt: "Louvre Museum"
      }];
    }

    // Use the custom uploaded Senso-ji image if the query contains Senso
    if (query.toLowerCase().includes('senso')) {
      return [{
        id: 'senso-ji-custom',
        src: {
          large: '/assets/senso-ji.jpg',
          medium: '/assets/senso-ji.jpg',
        },
        alt: "Senso-ji Temple"
      }];
    }
    
    // Use the custom uploaded Burj Khalifa image if the query contains Burj
    if (query.toLowerCase().includes('burj')) {
      return [{
        id: 'burj-custom',
        src: {
          large: '/assets/burj.jpg',
          medium: '/assets/burj.jpg',
        },
        alt: "Burj Khalifa"
      }];
    }

    // Use the custom uploaded New York image
    if (query.toLowerCase().includes('new york') && !query.toLowerCase().includes('liberty') && !query.toLowerCase().includes('park')) {
      return [{
        id: 'new-york-custom',
        src: { large: '/assets/new-york.jpg', medium: '/assets/new-york.jpg' },
        alt: "New York"
      }];
    }

    // Use the custom uploaded Central Park image
    if (query.toLowerCase().includes('central park')) {
      return [{
        id: 'central-park-custom',
        src: { large: '/assets/central-park.jpg', medium: '/assets/central-park.jpg' },
        alt: "Central Park"
      }];
    }

    // Use the custom downloaded Matterhorn image
    if (query.toLowerCase().includes('matterhorn')) {
      return [{
        id: 'matterhorn-custom',
        src: { large: '/assets/matterhorn.jpg', medium: '/assets/matterhorn.jpg' },
        alt: "Matterhorn"
      }];
    }

    // Use the custom downloaded Park Guell image
    if (query.toLowerCase().includes('park guell')) {
      return [{
        id: 'park-guell-custom',
        src: { large: '/assets/park-guell.jpg', medium: '/assets/park-guell.jpg' },
        alt: "Park Guell"
      }];
    }

    // Use the custom uploaded Singapore image
    if (query.toLowerCase().includes('singapore') && !query.toLowerCase().includes('gardens') && !query.toLowerCase().includes('marina')) {
      return [{
        id: 'singapore-custom',
        src: { large: '/assets/singapore.jpg', medium: '/assets/singapore.jpg' },
        alt: "Singapore"
      }];
    }

    // Use the custom uploaded Gardens by the Bay image
    if (query.toLowerCase().includes('gardens by the bay')) {
      return [{
        id: 'gardens-custom',
        src: { large: '/assets/gardens-by-the-bay.jpg', medium: '/assets/gardens-by-the-bay.jpg' },
        alt: "Gardens by the Bay"
      }];
    }

    // Use the custom uploaded Marina Bay Sands image
    if (query.toLowerCase().includes('marina bay')) {
      return [{
        id: 'marina-custom',
        src: { large: '/assets/marina-bay-sands.png', medium: '/assets/marina-bay-sands.png' },
        alt: "Marina Bay Sands"
      }];
    }

    // Use the custom uploaded Barcelona image
    if (query.toLowerCase().includes('barcelona') && !query.toLowerCase().includes('sagrada') && !query.toLowerCase().includes('guell')) {
      return [{
        id: 'barcelona-custom',
        src: { large: '/assets/barcelona.jpg', medium: '/assets/barcelona.jpg' },
        alt: "Barcelona"
      }];
    }

    // Use the custom uploaded Sagrada Familia image
    if (query.toLowerCase().includes('sagrada')) {
      return [{
        id: 'sagrada-custom',
        src: { large: '/assets/sagrada-familia.jpg', medium: '/assets/sagrada-familia.jpg' },
        alt: "Sagrada Familia"
      }];
    }

    // Use the custom uploaded Istanbul image
    if (query.toLowerCase().includes('istanbul') && !query.toLowerCase().includes('hagia') && !query.toLowerCase().includes('bazaar')) {
      return [{
        id: 'istanbul-custom',
        src: { large: '/assets/istanbul-hero.png', medium: '/assets/istanbul-hero.png' },
        alt: "Istanbul"
      }];
    }

    // Use the custom uploaded Hagia Sophia image
    if (query.toLowerCase().includes('hagia sophia')) {
      return [{
        id: 'hagia-sophia-custom',
        src: { large: '/assets/hagia-sophia.jpg', medium: '/assets/hagia-sophia.jpg' },
        alt: "Hagia Sophia"
      }];
    }

    // Use the custom uploaded Grand Bazaar image
    if (query.toLowerCase().includes('bazaar')) {
      return [{
        id: 'bazaar-custom',
        src: { large: '/assets/grand-bazaar.jpg', medium: '/assets/grand-bazaar.jpg' },
        alt: "Grand Bazaar"
      }];
    }

    // Use the custom uploaded Swiss Alps image
    if (query.toLowerCase().includes('swiss alps') && !query.toLowerCase().includes('matterhorn') && !query.toLowerCase().includes('jungfraujoch')) {
      return [{
        id: 'swiss-alps-custom',
        src: { large: '/assets/swiss-alps.jpg', medium: '/assets/swiss-alps.jpg' },
        alt: "Swiss Alps"
      }];
    }

    // Use the custom uploaded Jungfraujoch image
    if (query.toLowerCase().includes('jungfraujoch')) {
      return [{
        id: 'jungfraujoch-custom',
        src: { large: '/assets/jungfraujoch.png', medium: '/assets/jungfraujoch.png' },
        alt: "Jungfraujoch"
      }];
    }

    // Use the custom uploaded Statue of Liberty image
    if (query.toLowerCase().includes('statue of liberty')) {
      return [{
        id: 'statue-of-liberty-custom',
        src: { large: '/assets/statue-of-liberty.jpg', medium: '/assets/statue-of-liberty.jpg' },
        alt: "Statue of Liberty"
      }];
    }

    // Use the custom uploaded Sydney image
    if (query.toLowerCase().includes('sydney') && !query.toLowerCase().includes('opera') && !query.toLowerCase().includes('bondi')) {
      return [{
        id: 'sydney-custom',
        src: { large: '/assets/sydney-hero.png', medium: '/assets/sydney-hero.png' },
        alt: "Sydney"
      }];
    }

    // Use the custom uploaded Sydney Opera House image
    if (query.toLowerCase().includes('opera house')) {
      return [{
        id: 'opera-house-custom',
        src: { large: '/assets/sydney-opera-house.jpg', medium: '/assets/sydney-opera-house.jpg' },
        alt: "Sydney Opera House"
      }];
    }

    // Use the custom uploaded Bondi Beach image
    if (query.toLowerCase().includes('bondi')) {
      return [{
        id: 'bondi-custom',
        src: { large: '/assets/bondi-beach.jpg', medium: '/assets/bondi-beach.jpg' },
        alt: "Bondi Beach"
      }];
    }

    // Use the custom generated Colosseum image if the query contains Colosseum
    if (query.toLowerCase().includes('colosseum')) {
      return [{
        id: 'colosseum-custom',
        src: {
          large: '/assets/colosseum.png',
          medium: '/assets/colosseum.png',
        },
        alt: "Colosseum"
      }];
    }

    // Use the custom generated Trevi Fountain image if the query contains Trevi
    if (query.toLowerCase().includes('trevi')) {
      return [{
        id: 'trevi-custom',
        src: {
          large: '/assets/trevi.png',
          medium: '/assets/trevi.png',
        },
        alt: "Trevi Fountain"
      }];
    }

    // Use the custom generated Rome image if the query contains Rome
    if (query.toLowerCase().includes('rome')) {
      return [{
        id: 'rome-custom',
        src: {
          large: '/assets/rome.png',
          medium: '/assets/rome.png',
        },
        alt: "Rome"
      }];
    }

    // Use the custom uploaded Tower Bridge image if the query contains Bridge
    if (query.toLowerCase().includes('bridge')) {
      return [{
        id: 'bridge-custom',
        src: {
          large: '/assets/bridge.jpg',
          medium: '/assets/bridge.jpg',
        },
        alt: "Tower Bridge"
      }];
    }

    // Use the custom uploaded British Museum image if the query contains Museum
    if (query.toLowerCase().includes('museum')) {
      return [{
        id: 'museum-custom',
        src: {
          large: '/assets/museum.jpg',
          medium: '/assets/museum.jpg',
        },
        alt: "British Museum"
      }];
    }

    // Use the custom uploaded London image if the query contains London
    if (query.toLowerCase().includes('london')) {
      return [{
        id: 'london-custom',
        src: {
          large: '/assets/london.jpg',
          medium: '/assets/london.jpg',
        },
        alt: "London"
      }];
    }

    // Use the custom uploaded Palm Jumeirah image if the query contains Palm
    if (query.toLowerCase().includes('palm')) {
      return [{
        id: 'palm-custom',
        src: {
          large: '/assets/palm.png',
          medium: '/assets/palm.png',
        },
        alt: "Palm Jumeirah"
      }];
    }

    // Use the custom uploaded Dubai image if the query contains Dubai
    if (query.toLowerCase().includes('dubai')) {
      return [{
        id: 'dubai-custom',
        src: {
          large: '/assets/dubai.png',
          medium: '/assets/dubai.png',
        },
        alt: "Dubai"
      }];
    }

    // Use the custom uploaded Shibuya image if the query contains Shibuya
    if (query.toLowerCase().includes('shibuya')) {
      return [{
        id: 'shibuya-custom',
        src: {
          large: '/assets/shibuya.jpg',
          medium: '/assets/shibuya.jpg',
        },
        alt: "Shibuya Crossing"
      }];
    }

    // Use the custom uploaded Uluwatu image if the query contains Uluwatu
    if (query.toLowerCase().includes('uluwatu')) {
      return [{
        id: 'uluwatu-custom',
        src: {
          large: '/assets/uluwatu.jpg',
          medium: '/assets/uluwatu.jpg',
        },
        alt: "Uluwatu Temple"
      }];
    }

    // Use the custom uploaded Ubud image if the query contains Ubud
    if (query.toLowerCase().includes('ubud')) {
      return [{
        id: 'ubud-custom',
        src: {
          large: '/assets/ubud.png',
          medium: '/assets/ubud.png',
        },
        alt: "Ubud Monkey Forest"
      }];
    }

    // Use the custom uploaded Bali image if the query contains Bali
    if (query.toLowerCase().includes('bali')) {
      return [{
        id: 'bali-custom',
        src: {
          large: '/assets/bali.jpg',
          medium: '/assets/bali.jpg',
        },
        alt: "Bali"
      }];
    }

    // Use the custom uploaded Tokyo image if the query contains Tokyo
    if (query.toLowerCase().includes('tokyo')) {
      return [{
        id: 'tokyo-custom',
        src: {
          large: '/assets/senso-ji.jpg',
          medium: '/assets/senso-ji.jpg',
        },
        alt: "Tokyo"
      }];
    }

    // Generic fallback image
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
