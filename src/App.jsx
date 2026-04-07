import React, { useState } from 'react';
import { generateNutritionSuggestion } from './api/mockBackend';

function App() {
  const [formData, setFormData] = useState({
    goal: '',
    mood: '',
    food: '',
    time: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
      
      <div className="glass-panel animate-in" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AuraHealth
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Your Smart Nutrition Assistant
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
    </>
  );
}

export default App;
