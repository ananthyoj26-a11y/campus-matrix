import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, Database, Eye, Server, UserCheck, Mail, ArrowLeft } from 'lucide-react';
import './TermsPage.css';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-container">
      <header className="terms-header">
        <div className="terms-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <div className="title-badge">
            <Lock size={20} className="badge-icon" /> Data Protection
          </div>
          <h1 className="gradient-text">Privacy Policy</h1>
          <p className="effective-date">Last Updated: July 25, 2026 | Effective Date: July 25, 2026</p>
        </div>
      </header>

      <main className="terms-content">
        <div className="terms-card glass-card">
          <div className="intro-banner">
            <p>
              At <strong>CampusMatrix</strong>, we respect your privacy and are committed to protecting the personal data of students, mentors, and partners. This Privacy Policy explains how we collect, use, process, and safeguard your information when you use our platform.
            </p>
          </div>

          <section className="terms-section">
            <h2><Database className="section-icon" /> 1. Information We Collect</h2>
            <p>We collect information to provide better services to all our student users:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, college email address, password, profile photo, department, and academic year.</li>
              <li><strong>Authentication Data:</strong> OAuth credentials when you log in via Google Sign-In or Supabase/Firebase Auth.</li>
              <li><strong>Learning Activity:</strong> Solved coding problems, streak data, mock interview audio/text responses, and roadmap progress.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage metrics via cookies and telemetry.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2><Eye className="section-icon" /> 2. How We Use Your Information</h2>
            <ul>
              <li>To provide, operate, and maintain the CampusMatrix platform and AI mentoring tools.</li>
              <li>To evaluate mock interview responses using the <strong>Google Gemini API</strong> and generate personalized feedback.</li>
              <li>To calculate global leaderboard rankings, streak counters, and skill proficiency radars.</li>
              <li>To match students with campus career openings, placement drives, and relevant hackathons.</li>
              <li>To ensure security, prevent fraud, and comply with legal requirements.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2><Server className="section-icon" /> 3. Data Sharing & Third-Party Processors</h2>
            <p>We do NOT sell your personal data. We only share information with trusted service providers strictly to operate our platform:</p>
            <ul>
              <li><strong>Google Cloud / Gemini API:</strong> Evaluates prompt text and interview answers. Google processes inputs under strict API privacy guidelines.</li>
              <li><strong>Supabase / Firebase:</strong> Secure database storage and user authentication infrastructure.</li>
              <li><strong>Campus Recruiters:</strong> Profile and resume details are shared with verified recruiters only when you explicitly apply for a job or placement drive.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2><UserCheck className="section-icon" /> 4. Your Rights & Choices</h2>
            <p>You have full control over your data on CampusMatrix:</p>
            <ul>
              <li><strong>Access & Export:</strong> You can request a copy of your personal data and practice history.</li>
              <li><strong>Correction:</strong> You can update your profile details anytime via your account settings.</li>
              <li><strong>Account Deletion:</strong> You can delete your account and associated data by contacting our team.</li>
            </ul>
          </section>

          <section className="terms-section contact-section">
            <h2><Mail className="section-icon" /> 5. Contact Us</h2>
            <p>If you have any questions or requests regarding your data privacy, contact our Privacy Officer:</p>
            <div className="contact-box">
              <p><strong>CampusMatrix Privacy Team</strong></p>
              <p>Email: <a href="mailto:ananthyoj26@gmail.com" className="email-link">ananthyoj26@gmail.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <footer className="terms-footer">
        <p>© 2026 CampusMatrix. All rights reserved.</p>
        <div className="terms-footer-links">
          <Link to="/">Home</Link>
          <span>•</span>
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
