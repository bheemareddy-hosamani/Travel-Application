import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import LocalWeatherWidget from '../components/LocalWeatherWidget';
import { destinations } from '../data/destinations';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        <section className="section featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Destinations</h2>
              <p className="section-subtitle">Discover our handpicked selection of top travel spots around the world.</p>
            </div>
            
            <div className="destinations-grid">
              {featuredDestinations.map(dest => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>

            <div className="section-action">
              <Link to="/explore" className="btn-outline">
                View All Destinations
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section location-section">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <LocalWeatherWidget />
          </div>
        </section>

        <section className="section ai-teaser-section">
          <div className="container ai-teaser-container">
            <div className="ai-teaser-content">
              <h2 className="section-title">Plan With AI</h2>
              <p className="section-subtitle">
                Meet your personal travel assistant. Ask questions, get recommendations, 
                and generate custom day-by-day itineraries instantly.
              </p>
              <Link to="/explore" className="btn-primary">
                Try It Now
              </Link>
            </div>
            <div className="ai-teaser-image">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" alt="Travel Planning" />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Lumina Travel. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
