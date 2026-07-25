import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ArrowLeft, Phone, Smartphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import './Auth.css';

const PROGRAMS_TRACKS = {
  'B.Tech Computer Science': ['Software Engineer', 'Full Stack Developer', 'Backend Developer', 'Data Scientist', 'AI/ML Engineer', 'Cloud Architect'],
  'B.Tech Information Technology': ['Software Engineer', 'Full Stack Developer', 'Cloud Engineer', 'Cybersecurity Analyst', 'DevOps Engineer'],
  'B.Tech Electronics': ['Embedded Systems Engineer', 'VLSI Design Engineer', 'IoT Developer', 'Hardware Engineer', 'Software Engineer'],
  'BCA / MCA': ['Software Developer', 'Web Developer', 'System Analyst', 'Database Administrator', 'UI/UX Designer'],
  'B.Sc Computer Science': ['Data Analyst', 'Software Tester', 'Web Developer', 'IT Consultant'],
  'Other': ['Software Developer', 'Product Manager', 'Data Analyst', 'Business Analyst']
};

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    year: '1st Year',
    program: 'B.Tech Computer Science',
    careerTrack: 'Software Engineer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, loginWithGoogle, loginWithGithub, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect when authentication is successful
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Update available career tracks when program changes
  useEffect(() => {
    const tracks = PROGRAMS_TRACKS[formData.program as keyof typeof PROGRAMS_TRACKS] || PROGRAMS_TRACKS['Other'];
    if (!tracks.includes(formData.careerTrack)) {
      setFormData(prev => ({ ...prev, careerTrack: tracks[0] }));
    }
  }, [formData.program]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step < 3) {
      handleNext();
      return;
    }
    
    setIsLoading(true);
    try {
      await register(formData.email, formData.password, formData);
      // Navigation is now handled by the useEffect watching isAuthenticated
    } catch (error: any) {
      console.error('Registration failed', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card slide-up" style={{ maxWidth: '500px' }}>
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            CampusMatrix <span>◆</span>
          </Link>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join thousands of students launching their careers</p>
        </div>

        <div className="auth-steps">
          <div className={`step-indicator ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
          <div className={`step-indicator ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
          <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {error && (
          <div className="auth-error" style={{ color: 'var(--accent-danger)', background: 'rgba(225, 112, 85, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--accent-danger)' }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content fade-in">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={20} />
                  <input
                    id="name"
                    type="text"
                    className="auth-input"
                    placeholder="Alex Chen"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">College Email</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={20} />
                  <input
                    id="email"
                    type="email"
                    className="auth-input"
                    placeholder="you@college.edu"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={20} />
                  <input
                    id="password"
                    type="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content fade-in">
              <div className="form-group">
                <label className="form-label" htmlFor="college">College/University</label>
                <input
                  id="college"
                  type="text"
                  className="auth-input"
                  placeholder="Stanford University"
                  style={{ paddingLeft: '1rem' }}
                  value={formData.college}
                  onChange={(e) => updateFormData('college', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Undergraduate Program</label>
                <select 
                  className="auth-input" 
                  style={{ paddingLeft: '1rem', appearance: 'auto' }}
                  value={formData.program}
                  onChange={(e) => updateFormData('program', e.target.value)}
                  required
                >
                  {Object.keys(PROGRAMS_TRACKS).map(prog => (
                    <option key={prog} value={prog} style={{ background: 'var(--bg-secondary)' }}>{prog}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Year of Study</label>
                <div className="auth-options-grid">
                  {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(year => (
                    <div 
                      key={year}
                      className={`auth-option ${formData.year === year ? 'selected' : ''}`}
                      onClick={() => updateFormData('year', year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content fade-in">
              <div className="form-group">
                <label className="form-label">Target Career Track (Based on your Program)</label>
                <div className="auth-options-grid" style={{ gridTemplateColumns: '1fr' }}>
                  {(PROGRAMS_TRACKS[formData.program as keyof typeof PROGRAMS_TRACKS] || PROGRAMS_TRACKS['Other']).map(track => (
                    <div 
                      key={track}
                      className={`auth-option ${formData.careerTrack === track ? 'selected' : ''}`}
                      onClick={() => updateFormData('careerTrack', track)}
                    >
                      {track}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="btn-group">
            {step > 1 && (
              <button type="button" className="auth-submit-btn" style={{ background: 'var(--bg-tertiary)' }} onClick={handleBack}>
                <ArrowLeft size={20} />
                Back
              </button>
            )}
            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {step < 3 ? 'Continue' : (isLoading ? 'Creating account...' : 'Create Account')}
              {step < 3 && <ArrowRight size={20} />}
            </button>
          </div>
        </form>

        {step === 1 && (
          <>
            <div className="auth-divider">
              <span>OR</span>
            </div>

            <div className="oauth-buttons">
              <button 
                className="oauth-btn" 
                onClick={() => loginWithGoogle().catch(console.error)}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Gmail
              </button>
              
              <button 
                className="oauth-btn" 
                onClick={() => loginWithGithub().catch(console.error)}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
              
              <Link to="/login?method=phone" className="oauth-btn" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                <Smartphone size={24} />
                Continue with Phone
              </Link>
            </div>

            <div className="auth-footer">
              Already have an account?
              <Link to="/login" className="auth-link">Sign in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
