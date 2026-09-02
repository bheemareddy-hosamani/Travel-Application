import { useState } from 'react';
import { generateItinerary } from '../services/aiService';
import { Calendar, Clock, MapPin, Loader2, AlertCircle } from 'lucide-react';
import './ItineraryPlanner.css';

const ItineraryPlanner = ({ destination }) => {
  const [days, setDays] = useState(3);
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateItinerary(destination, days, preferences);
      setItinerary(data);
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="itinerary-planner">
      {!itinerary && !loading && (
        <div className="planner-setup">
          <h3 className="planner-title">Plan Your Trip</h3>
          <p className="planner-desc">Let our AI create a perfect day-by-day itinerary for {destination.name}.</p>
          
          <div className="form-group">
            <label>How many days?</label>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="form-select">
              {[1, 2, 3, 4, 5, 7].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Day' : 'Days'}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Any specific preferences? (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., foodie, museums, relaxing, family-friendly" 
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="form-input"
            />
          </div>

          <button onClick={handleGenerate} className="btn-primary w-full mt-4">
            Generate Itinerary
          </button>
          
          {error && (
            <div className="planner-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="planner-loading">
          <Loader2 size={32} className="spin-icon" />
          <p>Crafting your perfect {days}-day itinerary...</p>
        </div>
      )}

      {itinerary && !loading && (
        <div className="itinerary-result">
          <div className="itinerary-header">
            <h3>Your {destination.name} Adventure</h3>
            <span className="itinerary-meta">
              <Calendar size={16} /> {days} days &middot; {destination.country}
            </span>
          </div>

          <div className="itinerary-days">
            {itinerary.map((dayItem, index) => (
              <div key={index} className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">Day {dayItem.day || index + 1}</span>
                  <h4 className="day-title">{dayItem.title}</h4>
                </div>
                
                <div className="day-activities">
                  {dayItem.activities && dayItem.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="activity-item">
                      <div className="activity-time">
                        <Clock size={14} /> {activity.time}
                      </div>
                      <div className="activity-content">
                        <h5 className="activity-title">{activity.title}</h5>
                        <p className="activity-desc">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="itinerary-actions">
            <button onClick={() => setItinerary(null)} className="btn-outline">
              Plan Another Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryPlanner;
