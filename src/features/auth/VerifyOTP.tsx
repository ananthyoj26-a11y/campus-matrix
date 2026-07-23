import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import '../auth/Auth.css';

interface OTPInputProps {
  value: string[];
  onChange: (val: string[]) => void;
}

const OTPInput = ({ value, onChange }: OTPInputProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const next = [...value];
    next[idx] = char;
    onChange(next);
    if (char && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      onChange(pasted.split(''));
      refs.current[5]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
      {value.map((digit, idx) => (
        <input
          key={idx}
          ref={el => { refs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(idx, e.target.value)}
          onKeyDown={e => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          style={{
            width: 52,
            height: 56,
            textAlign: 'center',
            fontSize: '1.4rem',
            fontWeight: 700,
            background: 'var(--bg-tertiary)',
            border: `2px solid ${digit ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'var(--font-heading)',
          }}
        />
      ))}
    </div>
  );
};

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (timeLeft <= 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter all 6 digits.'); return; }
    setVerifying(true);
    setError('');
    // Simulate OTP verification (accept any 6-digit code for demo)
    await new Promise(r => setTimeout(r, 1500));
    setVerified(true);
    await login('demo@email.com', 'password');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="auth-container">
      <div className="auth-card slide-up" style={{ maxWidth: 440 }}>
        {verified ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: 64, height: 64, background: 'rgba(0,184,148,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Check size={28} color="var(--accent-success)" />
            </div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Verified!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Redirecting you to your dashboard…</p>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <a href="/" className="auth-logo">CampusMatrix <span>◆</span></a>
              <h1 className="auth-title">Verify Your Email</h1>
              <p className="auth-subtitle">
                We sent a 6-digit verification code to your email address. Enter it below to activate your account.
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <OTPInput value={otp} onChange={setOtp} />

              {error && (
                <p style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
              )}

              <button type="submit" className="auth-submit-btn" disabled={verifying} style={{ marginBottom: '1rem' }}>
                {verifying ? 'Verifying…' : 'Verify & Continue'}
                {!verifying && <ArrowRight size={18} />}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {canResend ? (
                <button onClick={handleResend} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                  Resend Code
                </button>
              ) : (
                <>Resend code in <strong style={{ color: 'var(--text-primary)' }}>{timeLeft}s</strong></>
              )}
            </p>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <a href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Back to Registration
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
