import React, { useState, useEffect, useCallback } from 'react';
import { generateNutritionSuggestion } from './services/geminiService';
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
      try {
        const parsedUser = JSON.parse(savedUser);
        if(parsedUser && parsedUser.email) setUser(parsedUser);
      } catch(e) {
        // Security: Clear invalid corrupted local storage
        localStorage.removeItem('auraUser');
      }
    }
  }, []);

  // Efficiency: useCallback to prevent unnecessary re-renders
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('auraUser', JSON.stringify(userData));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setResult(null); 
    localStorage.removeItem('auraUser');
  }, []);

  const handleChange = useCallback((e) => {
    // Security: Basic injection sanitization
    const sanitizedValue = e.target.value.replace(/[<>]/g, ''); 
    setFormData(prev => ({ ...prev, [e.target.name]: sanitizedValue }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Security: Strict validation rules
    if (!formData.goal.trim() || !formData.mood.trim() || !formData.food.trim() || !formData.time.trim()) {
      alert("Validation Error: Please safely fill out all fields.");
      return;
    }
    
    setLoading(true);
    setResult(null);

    const res = await generateNutritionSuggestion(formData);
    
    setResult(res.parsed);
    setLoading(false);
  };

  return (
    <main role="main" aria-label="AuraHealth Main Application">
      <div className="ambient-bg" aria-hidden="true"></div>
      
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <div style={{ width: '100%' }}>
          {/* Header */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AuraHealth
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Signed in as {user.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="primary-button" 
              aria-label="Sign out of AuraHealth"
              style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f8fafc', border: '1px solid rgba(239, 68, 68, 0.5)', boxShadow: 'none' }}>
              Sign Out
            </button>
          </header>

          <section className="glass-panel animate-in" style={{ padding: '2.5rem', marginBottom: '2rem' }} aria-labelledby="form-heading">
            <h1 id="form-heading" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
              Dashboard
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Consult your Smart Nutrition Assistant
            </p>

            <form onSubmit={handleSubmit} aria-label="Nutrition Input Form">
              <div className="input-group">
                <label htmlFor="goal-input" className="input-label">🎯 Goal</label>
                <input 
                  id="goal-input"
                  type="text" 
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Weight loss, Muscle gain, Healthy living"
                  aria-required="true"
                />
              </div>

              <div className="input-group">
                <label htmlFor="mood-input" className="input-label">🎭 Mood</label>
                <input 
                  id="mood-input"
                  type="text" 
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Comfort food, Energy boosting, Stressed"
                  aria-required="true"
                />
              </div>

              <div className="input-group">
                <label htmlFor="food-input" className="input-label">🥦 Available Food</label>
                <input 
                  id="food-input"
                  type="text" 
                  name="food"
                  value={formData.food}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Eggs, Spinach, Chicken, Rice"
                  aria-required="true"
                />
              </div>

              <div className="input-group">
                <label htmlFor="time-input" className="input-label">⏱️ Time of Day</label>
                <input 
                  id="time-input"
                  type="text" 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="glass-input" 
                  placeholder="e.g., Breakfast, Lunch, Late-night snack"
                  aria-required="true"
                />
              </div>

              <button type="submit" className="primary-button" disabled={loading} aria-busy={loading}>
                {loading ? "Analyzing..." : "Get Recommendation ✨"}
              </button>
            </form>
          </section>

          {loading && (
            <div className="glass-panel animate-in" style={{ padding: '2rem' }} aria-live="polite">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>AI is calculating your perfect meal...</h3>
              <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '1rem' }} aria-hidden="true"></div>
              <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '1rem' }} aria-hidden="true"></div>
              <div className="skeleton" style={{ height: '20px', width: '90%', marginBottom: '2rem' }} aria-hidden="true"></div>
              <div className="skeleton" style={{ height: '40px', width: '100%' }} aria-hidden="true"></div>
            </div>
          )}

          {result && !loading && (
            <section className="glass-panel animate-in" style={{ padding: '2rem', borderTop: '4px solid var(--accent-color)' }} aria-live="polite">
              <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span aria-hidden="true">🍽️</span> {result.meal}
              </h2>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#fb923c', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span aria-hidden="true">🔥</span> Calories
                  </h4>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{result.calories}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#c084fc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span aria-hidden="true">🧠</span> Reasoning Setup
                  </h4>
                  <p style={{ color: 'var(--text-muted)' }}>{result.reason}</p>
                </div>

                <div style={{ background: 'rgba(34, 197, 94, 0.1)', borderLeft: '4px solid var(--success)', padding: '1rem', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span aria-hidden="true">⚡</span> Health Tip
                  </h4>
                  <p style={{ fontStyle: 'italic' }}>{result.tip}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
