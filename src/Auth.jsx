import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // For hackathon MVP, we mock the authentication success
      // and pass the user object up to the main app
      onLogin({ email: formData.email });
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="glass-panel animate-in" style={{ padding: '2.5rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {isLogin ? 'Welcome Back' : 'Join AuraHealth'}
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {isLogin ? 'Sign in to access your smart nutrition assistant' : 'Register to start making better food choices'}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">✉️ Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="glass-input" 
            placeholder="your@email.com"
          />
        </div>

        <div className="input-group">
          <label className="input-label">🔒 Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="glass-input" 
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="primary-button" style={{ marginTop: '1rem' }}>
          {isLogin ? 'Sign In ✨' : 'Create Account 🚀'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'underline' }}>
          {isLogin ? 'Register' : 'Sign in'}
        </button>
      </p>
    </div>
  );
}
