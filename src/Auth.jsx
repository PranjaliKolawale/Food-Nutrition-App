import React, { useState, useCallback } from 'react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Efficiency: useCallback for event handlers
  const handleChange = useCallback((e) => {
    // Security: Basic injection sanitization
    const sanitizedValue = e.target.value.replace(/[<>]/g, ''); 
    setFormData(prev => ({ ...prev, [e.target.name]: sanitizedValue }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Security: More robust validation before mocking auth
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.password) {
      alert("Validation Error: Please safely enter both email and password.");
      return;
    }
    
    if (!emailRegex.test(formData.email)) {
       alert("Security Check: Please enter a validly formatted email.");
       return;
    }

    onLogin({ email: formData.email });
  };

  return (
    <section 
      className="glass-panel animate-in" 
      style={{ padding: '2.5rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto' }}
      aria-labelledby="auth-heading"
    >
      <h2 id="auth-heading" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem', background: 'linear-gradient(to right, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {isLogin ? 'Welcome Back' : 'Join AuraHealth'}
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {isLogin ? 'Sign in to access your smart nutrition assistant' : 'Register to start making better food choices'}
      </p>

      <form onSubmit={handleSubmit} aria-label={isLogin ? 'Sign In Form' : 'Registration Form'}>
        <div className="input-group">
          <label htmlFor="email-input" className="input-label">✉️ Email</label>
          <input 
            id="email-input"
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="glass-input" 
            placeholder="your@email.com"
            aria-required="true"
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password-input" className="input-label">🔒 Password</label>
          <input 
            id="password-input"
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="glass-input" 
            placeholder="••••••••"
            aria-required="true"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>

        <button type="submit" className="primary-button" style={{ marginTop: '1rem' }} aria-label={isLogin ? 'Submit Sign In' : 'Submit Registration'}>
          {isLogin ? 'Sign In ✨' : 'Create Account 🚀'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          aria-label={isLogin ? 'Switch to Register' : 'Switch to Sign In'}
          style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'underline' }}>
          {isLogin ? 'Register' : 'Sign in'}
        </button>
      </p>
    </section>
  );
}
