import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, MapPin, ArrowLeft } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `navbar ${isHome && !isScrolled ? 'navbar-transparent' : 'navbar-solid'}`;

  return (
    <nav className={navClass}>
      <div className="container navbar-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isHome && (
            <button onClick={() => navigate(-1)} className="nav-back-btn" aria-label="Go back">
              <ArrowLeft size={24} />
            </button>
          )}
          <Link to="/" className="navbar-logo">
            <Compass className="logo-icon" size={28} />
            <span>Lumina Travel</span>
          </Link>
        </div>
        
        <div className="navbar-links desktop-only">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/explore" className={`nav-link ${location.pathname.startsWith('/explore') ? 'active' : ''}`}>Explore</Link>
        </div>
        
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Home</Link>
          <Link to="/explore" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Explore</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
