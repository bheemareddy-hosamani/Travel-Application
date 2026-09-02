import { useState, useEffect } from 'react';
import { fetchImages } from '../services/imageService';
import './FamousPlaceCard.css';

const FamousPlaceCard = ({ place }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadImage = async () => {
      try {
        const photos = await fetchImages(place.imageQuery || place.name);
        if (mounted && photos.length > 0) {
          setImage(photos[0].src.medium);
        }
      } catch (error) {
        console.error("Failed to load image for", place.name);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadImage();
    return () => { mounted = false; };
  }, [place]);

  return (
    <div className="place-card">
      <div className="place-image-wrapper">
        {loading ? (
          <div className="place-image skeleton" />
        ) : (
          <img 
            src={image || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600`} 
            alt={place.name} 
            className="place-image"
            loading="lazy"
          />
        )}
      </div>
      <div className="place-content">
        <h4 className="place-title">{place.name}</h4>
        <p className="place-description">{place.description}</p>
      </div>
    </div>
  );
};

export default FamousPlaceCard;
