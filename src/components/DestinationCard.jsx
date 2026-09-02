import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { fetchImages } from '../services/imageService';
import './DestinationCard.css';

const DestinationCard = ({ destination }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadImage = async () => {
      try {
        const photos = await fetchImages(destination.imageQuery || destination.name);
        if (mounted && photos.length > 0) {
          setImage(photos[0].src.medium);
        }
      } catch (error) {
        console.error("Failed to load image for", destination.name);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadImage();
    return () => { mounted = false; };
  }, [destination]);

  return (
    <Link to={`/destination/${destination.id}`} className="destination-card">
      <div className="card-image-wrapper">
        {loading ? (
          <div className="card-image skeleton" />
        ) : (
          <img 
            src={image || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600`} 
            alt={destination.name} 
            className="card-image"
            loading="lazy"
          />
        )}
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{destination.name}</h3>
          <span className="card-location">
            <MapPin size={16} />
            {destination.country}
          </span>
        </div>
        <p className="card-description">{destination.shortDescription}</p>
        <div className="card-tags">
          {destination.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
