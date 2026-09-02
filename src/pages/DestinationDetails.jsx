import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchImages } from '../services/imageService';
import { destinations } from '../data/destinations';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';
import FamousPlaceCard from '../components/FamousPlaceCard';
import Chatbot from '../components/Chatbot';
import ItineraryPlanner from '../components/ItineraryPlanner';
import { ArrowLeft, MapPin } from 'lucide-react';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundDest = destinations.find(d => d.id === id);
    if (!foundDest) {
      // Handle not found
      setLoading(false);
      return;
    }
    setDestination(foundDest);

    const loadHeroImage = async () => {
      try {
        const photos = await fetchImages(foundDest.imageQuery || foundDest.name, 1);
        if (photos.length > 0) {
          setHeroImage(photos[0].src.large);
        }
      } catch (err) {
        console.error("Failed to load hero image");
      } finally {
        setLoading(false);
      }
    };

    loadHeroImage();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="not-found-screen">
        <Navbar />
        <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
          <h2>Destination Not Found</h2>
          <p>We couldn't find the destination you're looking for.</p>
          <button onClick={() => navigate('/explore')} className="btn-primary mt-4">
            Go to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destination-details">
      <Navbar />
      
      <div className="destination-hero">
        <div 
          className="destination-hero-bg" 
          style={{ backgroundImage: `url(${heroImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000'})` }}
        ></div>
        <div className="destination-hero-overlay"></div>
        
        <div className="container destination-hero-content">
          <h1 className="destination-title">{destination.name}</h1>
          <div className="destination-meta">
            <MapPin size={20} /> {destination.country}, {destination.region}
          </div>
        </div>
      </div>

      <div className="container destination-main">
        <div className="destination-content-left">
          <section className="detail-section">
            <h2 className="section-heading">About {destination.name}</h2>
            <p className="destination-description">{destination.description}</p>
            <div className="destination-tags">
              {destination.tags.map(tag => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2 className="section-heading">Famous Places</h2>
            <div className="places-list">
              {destination.famousPlaces.map(place => (
                <FamousPlaceCard key={place.id} place={place} />
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2 className="section-heading">Plan Your Trip</h2>
            <ItineraryPlanner destination={destination} />
          </section>
        </div>

        <div className="destination-content-right">
          <div className="sticky-sidebar">
            <WeatherCard 
              coordinates={destination.coordinates} 
              locationName={destination.name} 
            />
            
            <div className="chatbot-wrapper mt-4">
              <Chatbot destination={destination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
