import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import './Auth.css';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    year: '1st Year',
    careerTrack: 'Frontend Developer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    
    setIsLoading(true);
    try {
      await register(formData.email, formData.password, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card slide-up">
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
                <label className="form-label">Target Career Track</label>
                <div className="auth-options-grid" style={{ gridTemplateColumns: '1fr' }}>
                  {['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'AI/ML Engineer'].map(track => (
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
          <div className="auth-footer">
            Already have an account?
            <Link to="/login" className="auth-link">Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
