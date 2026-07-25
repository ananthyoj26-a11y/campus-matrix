import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, UserCheck, Cpu, Key, FileCode, 
  Lock, Award, AlertTriangle, Scale, Ban, RefreshCw, 
  Globe, Mail, ArrowLeft 
} from 'lucide-react';
import './TermsPage.css';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-container">
      {/* Header */}
      <header className="terms-header">
        <div className="terms-header-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <div className="title-badge">
            <ShieldCheck size={20} className="badge-icon" /> Legal & Governance
          </div>
          <h1 className="gradient-text">Terms of Service</h1>
          <p className="effective-date">Last Updated: July 25, 2026 | Effective Date: July 25, 2026</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="terms-content">
        <div className="terms-card glass-card">
          <div className="intro-banner">
            <p>
              Welcome to <strong>CampusMatrix</strong> ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, web application, AI career mentoring tools, coding practice platform, mock interview simulators, and related services (collectively, the "Services").
            </p>
          </div>

          <nav className="table-of-contents">
            <h3>Table of Contents</h3>
            <ol>
              <li><a href="#acceptance">1. Acceptance of Terms</a></li>
              <li><a href="#accounts">2. User Accounts & Registration</a></li>
              <li><a href="#acceptable-use">3. Acceptable Use Policy</a></li>
              <li><a href="#ai-services">4. AI Services (Google Gemini Integration)</a></li>
              <li><a href="#google-signin">5. Google Sign-In & Authentication</a></li>
              <li><a href="#user-content">6. User Content & Submissions</a></li>
              <li><a href="#privacy">7. Privacy & Data Protection</a></li>
              <li><a href="#intellectual-property">8. Intellectual Property Rights</a></li>
              <li><a href="#disclaimer">9. Disclaimer of Warranties</a></li>
              <li><a href="#liability">10. Limitation of Liability</a></li>
              <li><a href="#termination">11. Account Termination & Suspension</a></li>
              <li><a href="#changes">12. Changes to Terms</a></li>
              <li><a href="#governing-law">13. Governing Law & Jurisdiction</a></li>
              <li><a href="#contact">14. Contact Information</a></li>
            </ol>
          </nav>

          <hr className="divider" />

          {/* Section 1 */}
          <section id="acceptance" className="terms-section">
            <h2><FileText className="section-icon" /> 1. Acceptance of Terms</h2>
            <p>
              By accessing, registering for, or using CampusMatrix, you confirm that you have read, understood, and agree to be bound by these Terms of Service, along with our <Link to="/privacy">Privacy Policy</Link>. If you do not agree to these Terms, you must not access or use our Services.
            </p>
            <p>
              You represent that you are at least 13 years of age (or the minimum legal age in your jurisdiction) and have the requisite capacity to enter into a binding agreement. If you are under 18, you represent that you have received parental or guardian permission to use the Services.
            </p>
          </section>

          {/* Section 2 */}
          <section id="accounts" className="terms-section">
            <h2><UserCheck className="section-icon" /> 2. User Accounts & Registration</h2>
            <p>
              To access certain features of CampusMatrix—including AI Mock Interviews, Smart Career Roadmaps, Coding Practice Hubs, and Student Guilds—you must create an account.
            </p>
            <ul>
              <li><strong>Account Accuracy:</strong> You agree to provide accurate, current, and complete information during registration and keep your account details updated.</li>
              <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
              <li><strong>Unauthorized Access:</strong> You must immediately notify us of any unauthorized use of your account or any security breach.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="acceptable-use" className="terms-section">
            <h2><Ban className="section-icon" /> 3. Acceptable Use Policy</h2>
            <p>
              You agree to use CampusMatrix strictly for personal educational and career development purposes. You agree NOT to:
            </p>
            <ul>
              <li>Use the Services for any unlawful purpose or in violation of any local, state, national, or international law.</li>
              <li>Attempt to reverse engineer, decompile, scrape, or extract source code from the CampusMatrix platform or AI engines.</li>
              <li>Submit malicious code, viruses, automated bots, or excessive requests intended to disrupt platform stability.</li>
              <li>Impersonate any person or entity, or falsely claim affiliation with any educational institution or company.</li>
              <li>Cheat, harvest, or automate code submission solutions to artificially manipulate global leaderboards.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="ai-services" className="terms-section">
            <h2><Cpu className="section-icon" /> 4. AI Services (Google Gemini Integration)</h2>
            <p>
              CampusMatrix incorporates artificial intelligence powered by the <strong>Google Gemini API</strong> to provide real-time career mentoring, mock interview feedback, resume ATS evaluation, and learning recommendations.
            </p>
            <ul>
              <li><strong>AI Output Nature:</strong> AI-generated outputs, suggestions, interview evaluation scores, and roadmap recommendations are for educational and advisory purposes only. They do not guarantee job placements, exam outcomes, or official certifications.</li>
              <li><strong>Third-Party Processing:</strong> Prompts submitted to AI Mentor or AI Mock Interview features may be processed via Google Cloud / Gemini API in accordance with Google's API Privacy Policies.</li>
              <li><strong>Prohibited AI Inputs:</strong> You agree not to input sensitive personal information (such as financial details, passwords, or government IDs) into AI chat prompts.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="google-signin" className="terms-section">
            <h2><Key className="section-icon" /> 5. Google Sign-In & Authentication</h2>
            <p>
              CampusMatrix provides single sign-on (SSO) integration via <strong>Google Sign-In</strong> and Supabase/Firebase Authentication.
            </p>
            <p>
              When you log in using Google OAuth, you authorize us to access basic profile details (such as your name, email address, and profile photo) as permitted by your Google account permissions. We use this data solely for account creation, identification, and authentication.
            </p>
          </section>

          {/* Section 6 */}
          <section id="user-content" className="terms-section">
            <h2><FileCode className="section-icon" /> 6. User Content & Submissions</h2>
            <p>
              You retain ownership of all code, notes, forum posts, and material ("User Content") that you submit to CampusMatrix.
            </p>
            <p>
              By uploading or submitting User Content, you grant CampusMatrix a worldwide, non-exclusive, royalty-free license to host, display, execute (e.g., in our coding sandbox), and process your content strictly as necessary to operate and improve our Services.
            </p>
          </section>

          {/* Section 7 */}
          <section id="privacy" className="terms-section">
            <h2><Lock className="section-icon" /> 7. Privacy & Data Protection</h2>
            <p>
              Your privacy is extremely important to us. Please review our <Link to="/privacy">Privacy Policy</Link>, which explains how we collect, store, and protect your personal information when you interact with CampusMatrix.
            </p>
          </section>

          {/* Section 8 */}
          <section id="intellectual-property" className="terms-section">
            <h2><Award className="section-icon" /> 8. Intellectual Property Rights</h2>
            <p>
              The CampusMatrix platform, including its software architecture, user interface design, logos, brand elements, problem statements, curriculum roadmaps, and content, is protected by copyright, trademark, and intellectual property laws.
            </p>
            <p>
              CampusMatrix and its licensors retain all right, title, and interest in and to the platform. You are granted a limited, revocable, non-exclusive license to use the platform solely for your individual student learning.
            </p>
          </section>

          {/* Section 9 */}
          <section id="disclaimer" className="terms-section">
            <h2><AlertTriangle className="section-icon" /> 9. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          {/* Section 10 */}
          <section id="liability" className="terms-section">
            <h2><Scale className="section-icon" /> 10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CAMPUSMATRIX, ITS DIRECTORS, EMPLOYEES, AFFILIATES, OR SUPPLIERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICES.
            </p>
          </section>

          {/* Section 11 */}
          <section id="termination" className="terms-section">
            <h2><Ban className="section-icon" /> 11. Account Termination & Suspension</h2>
            <p>
              We reserve the right to suspend or terminate your account and restrict access to the Services at our sole discretion, without prior notice, if you violate these Terms or engage in conduct harmful to the platform or other users.
            </p>
            <p>
              You may terminate your account at any time by contacting support or using the account deletion feature in your settings.
            </p>
          </section>

          {/* Section 12 */}
          <section id="changes" className="terms-section">
            <h2><RefreshCw className="section-icon" /> 12. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time to reflect platform improvements, legal compliance, or operational changes. Updated versions will be posted on this page with a revised "Last Updated" date. Continued use of CampusMatrix after updates constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Section 13 */}
          <section id="governing-law" className="terms-section">
            <h2><Globe className="section-icon" /> 13. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any dispute arising out of these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Section 14 */}
          <section id="contact" className="terms-section contact-section">
            <h2><Mail className="section-icon" /> 14. Contact Information</h2>
            <p>
              If you have any questions, legal inquiries, or concerns regarding these Terms of Service, please reach out to us:
            </p>
            <div className="contact-box">
              <p><strong>CampusMatrix Support & Legal Team</strong></p>
              <p>Email: <a href="mailto:ananthyoj26@gmail.com" className="email-link">ananthyoj26@gmail.com</a></p>
              <p>Platform: CampusMatrix Student Success Engine</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
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
