import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import './Auth.css';

const ForgotPassword = () => {
  const [step, setStep] = useState<'email' | 'reset' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strengthLabel = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColor = ['', '#e17055', '#e17055', '#fdcb6e', '#00b894', '#6c5ce7'];
  const strength = getStrength(password);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('reset');
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep('done');
  };

  return (
    <div className="auth-container">
      <div className="auth-card slide-up" style={{ maxWidth: 440 }}>

        {step === 'done' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: 64, height: 64, background: 'rgba(0,184,148,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Check size={28} color="var(--accent-success)" />
            </div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Password Reset!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your password has been updated successfully.</p>
            <Link to="/login" className="auth-submit-btn" style={{ display: 'inline-flex', textDecoration: 'none', justifyContent: 'center' }}>
              Back to Login <ArrowRight size={18} />
            </Link>
          </div>
        ) : step === 'email' ? (
          <>
            <div className="auth-header">
              <a href="/" className="auth-logo">CampusMatrix <span>◆</span></a>
              <h1 className="auth-title">Forgot Password</h1>
              <p className="auth-subtitle">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="auth-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Sending Reset Link…' : 'Send Reset Link'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <a href="/" className="auth-logo">CampusMatrix <span>◆</span></a>
              <h1 className="auth-title">Reset Password</h1>
              <p className="auth-subtitle">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleResetSubmit}>
              <div className="auth-field">
                <label className="auth-label">New Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password (8+ characters)"
                    className="auth-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="auth-toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ height: 4, background: 'var(--bg-tertiary)', borderRadius: 999, overflow: 'hidden', marginBottom: '0.3rem' }}>
                      <div style={{ width: `${(strength / 5) * 100}%`, height: '100%', background: strengthColor[strength], transition: 'all 0.3s', borderRadius: 999 }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: strengthColor[strength], fontWeight: 600 }}>{strengthLabel[strength]}</p>
                  </div>
                )}
              </div>

              <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    className="auth-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Resetting…' : 'Reset Password'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button onClick={() => setStep('email')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                <ArrowLeft size={14} /> Use a different email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
