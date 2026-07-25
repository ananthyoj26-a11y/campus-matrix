import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Trophy, Zap } from 'lucide-react';
import './WeeklyDigestPage.css';

export default function WeeklyDigestPage() {
  return (
    <div className="digest-container">
      <div className="digest-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          Campus Weekly Digest
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Everything you need to know this week
        </motion.p>
      </div>

      <div className="digest-grid">
        <motion.div className="section-card wide" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="section-title"><Calendar className="icon" /> Latest Events</h2>
          
          <div className="event-item">
            <div className="event-date">
              <div className="day">12</div>
              <div className="month">Oct</div>
            </div>
            <div className="event-info">
              <h4>Annual Tech Symposium 2026</h4>
              <p>Main Auditorium • 10:00 AM - 5:00 PM</p>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <div className="day">14</div>
              <div className="month">Oct</div>
            </div>
            <div className="event-info">
              <h4>Guest Lecture: AI in Healthcare</h4>
              <p>Virtual (Zoom) • 2:00 PM</p>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <div className="day">16</div>
              <div className="month">Oct</div>
            </div>
            <div className="event-info">
              <h4>Inter-college Hackathon</h4>
              <p>CS Department Labs • 48 Hours</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="section-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="section-title"><Trophy className="icon" /> Spotlight</h2>
          <div className="achievement-card">
            <div className="achievement-avatar">AK</div>
            <h3>Arun Kumar</h3>
            <p>Selected for Google Summer of Code 2026! He will be contributing to the TensorFlow open-source project.</p>
          </div>
        </motion.div>

        <motion.div className="section-card wide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="section-title"><Briefcase className="icon" /> Placement Updates</h2>
          <div className="placement-item">
            <div>
              <h4>Microsoft Full Time SDE</h4>
              <p>Eligibility: CS/IT, 8.0+ CGPA</p>
            </div>
            <div className="badge">Apply by Oct 15</div>
          </div>
          <div className="placement-item">
            <div>
              <h4>Amazon Summer Internship</h4>
              <p>Eligibility: Pre-final year</p>
            </div>
            <div className="badge">Apply by Oct 18</div>
          </div>
        </motion.div>

        <motion.div className="section-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="section-title"><Zap className="icon" /> Trending Clubs</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Robotics Club</strong> <span style={{ color: 'var(--text-muted)' }}>+45 members</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Coding Ninjas</strong> <span style={{ color: 'var(--text-muted)' }}>+32 members</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Drama Society</strong> <span style={{ color: 'var(--text-muted)' }}>+28 members</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
