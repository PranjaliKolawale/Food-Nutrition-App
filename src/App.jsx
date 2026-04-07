import React, { useState, useEffect } from 'react';
import { generateNutritionSuggestion } from './api/mockBackend';
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    goal: '',
    mood: '',
    food: '',
    time: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auraUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('auraUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setResult(null); // Clear previous results on logout
    localStorage.removeItem('auraUser');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.goal || !formData.mood || !formData.food || !formData.time) {
      alert("Please fill in all fields so the Smart Assistant can help!");
      return;
    }
    setLoading(true);
    setResult(null);

    const res = await generateNutritionSuggestion(formData);
    
    setResult(res.parsed);
    setLoading(false);
  };

  return (
    <>
      <div className="ambient-bg"></div>
      
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <div style={{ width: '100%' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AuraHealth
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Signed in as {user.email}</p>
            </div>
            <button onClick={handleLogout} className="primary-button" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f8fafc', border: '1px solid rgba(239, 68, 68, 0.5)', boxShadow: 'none' }}>
              Sign Out
            </button>
          </div>

          <div className="glass-panel animate-in" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
              Dashboard
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Consult your Smart Nutrition Assistant
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">🎯 Goal</label>
                <input 
                  type="text" 
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Weight loss, Muscle gain, Healthy living"
                />
              </div>

              <div className="input-group">
                <label className="input-label">🎭 Mood</label>
                <input 
                  type="text" 
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Comfort food, Energy boosting, Stressed"
                />
              </div>

              <div className="input-group">
                <label className="input-label">🥦 Available Food</label>
                <input 
                  type="text" 
                  name="food"
                  value={formData.food}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Eggs, Spinach, Chicken, Rice"
                />
              </div>

              <div className="input-group">
                <label className="input-label">⏱️ Time of Day</label>
                <input 
                  type="text" 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Breakfast, Lunch, Late-night snack"
                />
              </div>

              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? "Analyzing..." : "Get Recommendation ✨"}
              </button>
            </form>
          </div>

          {loading && (
            <div className="glass-panel animate-in" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>AI is calculating your perfect meal...</h3>
              <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '1rem' }}></div>
              <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '1rem' }}></div>
              <div className="skeleton" style={{ height: '20px', width: '90%', marginBottom: '2rem' }}></div>
              <div className="skeleton" style={{ height: '40px', width: '100%' }}></div>
            </div>
          )}

          {result && !loading && (
            <div className="glass-panel animate-in" style={{ padding: '2rem', borderTop: '4px solid var(--accent-color)' }}>
              <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🍽️</span> {result.meal}
              </h2>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#fb923c', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🔥</span> Calories
                  </h4>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.calories}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#c084fc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🧠</span> Reasoning Setup
                  </h4>
                  <p style={{ color: 'var(--text-muted)' }}>{result.reason}</p>
                </div>

                <div style={{ background: 'rgba(34, 197, 94, 0.1)', borderLeft: '4px solid var(--success)', padding: '1rem', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>⚡</span> Health Tip
                  </h4>
                  <p style={{ fontStyle: 'italic' }}>{result.tip}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
