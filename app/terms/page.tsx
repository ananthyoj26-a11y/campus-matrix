import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | CampusMatrix',
  description: 'Terms of Service for CampusMatrix — AI-Powered Student Success & Career Engine. Governs platform use, Google Gemini AI services, Google Sign-In, and user accounts.',
  keywords: ['CampusMatrix', 'Terms of Service', 'AI Mentorship', 'Google Gemini', 'Student Terms'],
  openGraph: {
    title: 'Terms of Service | CampusMatrix',
    description: 'Terms of Service for CampusMatrix — AI-Powered Student Success Engine.',
    type: 'website',
  },
};

export default function NextTermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f5', fontFamily: 'Inter, sans-serif', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#12121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2.5rem' }}>
        <header style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem', background: 'linear-gradient(135deg, #6c5ce7, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Terms of Service
          </h1>
          <p style={{ color: '#5a5a7a', margin: 0, fontSize: '0.9rem' }}>Last Updated: July 25, 2026 | Effective Date: July 25, 2026</p>
        </header>

        <section style={{ lineHeight: '1.7', color: '#9898b0' }}>
          <p>Welcome to <strong>CampusMatrix</strong> ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, web application, AI career mentoring tools, coding practice platform, mock interview simulators, and related services.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
          <p>By accessing or registering for CampusMatrix, you confirm that you have read, understood, and agree to be bound by these Terms of Service.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>2. User Accounts & Registration</h2>
          <p>You must provide accurate and complete registration details and maintain the security of your login credentials.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>3. Acceptable Use Policy</h2>
          <p>CampusMatrix is provided strictly for educational and career development purposes. Automated cheating or malicious actions are prohibited.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>4. AI Services (Google Gemini Integration)</h2>
          <p>AI-generated interview feedback, career recommendations, and evaluation outputs powered by the <strong>Google Gemini API</strong> are for guidance and educational purposes only.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>5. Google Sign-In & Authentication</h2>
          <p>Authentication via Google Sign-In and Supabase/Firebase authorizes basic profile access (name, email, avatar) to manage your user account.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>6. User Content</h2>
          <p>You retain ownership of submitted code and content, granting CampusMatrix a non-exclusive license to execute and host it to deliver our Services.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>7. Privacy Policy</h2>
          <p>Your privacy is important to us. Please refer to our Privacy Policy to understand how your data is handled.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>8. Intellectual Property</h2>
          <p>All software, brand logos, UI elements, and problem curricula remain the property of CampusMatrix and its licensors.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>9. Disclaimer of Warranties</h2>
          <p>Services are provided "AS IS" without warranties of any kind.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>10. Limitation of Liability</h2>
          <p>CampusMatrix shall not be liable for any indirect or consequential damages arising from your use of the platform.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>11. Account Termination</h2>
          <p>We reserve the right to suspend accounts that breach these terms.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>12. Changes to Terms</h2>
          <p>Terms may be updated periodically. Continued use constitutes acceptance of updated terms.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>13. Governing Law</h2>
          <p>These terms are governed by the laws of India.</p>

          <h2 style={{ color: '#f0f0f5', marginTop: '2rem' }}>14. Contact Information</h2>
          <p>For questions or support, contact us at: <a href="mailto:ananthyoj26@gmail.com" style={{ color: '#00d2d3', fontWeight: 600 }}>ananthyoj26@gmail.com</a></p>
        </section>
      </div>
    </div>
  );
}
