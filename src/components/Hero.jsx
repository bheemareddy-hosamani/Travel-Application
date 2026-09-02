import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-video-wrapper">
        <video 
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">Discover Your Next Great Adventure</h1>
        <p className="hero-subtitle">
          Explore curated destinations, plan custom itineraries with our AI assistant, 
          and experience the world like never before.
        </p>
        <Link to="/explore" className="hero-btn">
          Start Exploring
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
