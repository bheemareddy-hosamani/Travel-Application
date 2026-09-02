import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { Search, Map } from 'lucide-react';
import './Explore.css';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', ...new Set(destinations.map(d => d.region))];

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            dest.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  return (
    <div className="explore-page">
      <Navbar />
      
      <main className="explore-main">
        <div className="explore-header">
          <div className="container">
            <h1 className="explore-title">Explore the World</h1>
            <p className="explore-subtitle">Find your next perfect destination.</p>
            
            <div className="explore-controls">
              <div className="search-bar">
                <Search size={20} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search destinations or countries..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-bar">
                {regions.map(region => (
                  <button 
                    key={region}
                    className={`filter-btn ${selectedRegion === region ? 'active' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container explore-results">
          {filteredDestinations.length > 0 ? (
            <div className="destinations-grid">
              {filteredDestinations.map(dest => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Map size={48} className="empty-icon" />
              <h3>No destinations found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                className="btn-primary mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;
