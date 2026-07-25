import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldAlert, HeartPulse, UserCheck, Users, Flame, AlertCircle } from 'lucide-react';
import './EmergencyPage.css';

const CONTACTS = [
  { title: 'Campus Security', icon: ShieldAlert, phone: '1800-123-4567', desc: 'Available 24/7 for any security concerns or escorts on campus.' },
  { title: 'Medical Center', icon: HeartPulse, phone: '1800-123-4568', desc: 'Emergency medical assistance, ambulance service, and first aid.' },
  { title: "Women's Cell", icon: UserCheck, phone: '1800-123-4569', desc: 'Dedicated helpline for safety and grievance redressal for women.' },
  { title: 'Anti-Ragging Squad', icon: Users, phone: '1800-123-4570', desc: 'Strictly confidential line to report any ragging incidents.' },
  { title: 'Student Counselling', icon: Phone, phone: '1800-123-4571', desc: 'Mental health support and emergency crisis counselling.' },
  { title: 'Fire Station', icon: Flame, phone: '101', desc: 'Direct line to the nearest city fire department.' }
];

export default function EmergencyPage() {
  return (
    <div className="emergency-container">
      <motion.div 
        className="sos-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="sos-banner-left">
          <h2>Campus Emergency Dashboard</h2>
          <p>If you are in immediate danger, please press the SOS button to alert campus authorities instantly.</p>
        </div>
        <button className="sos-btn">
          <AlertCircle size={24} /> QUICK SOS
        </button>
      </motion.div>

      <div className="emergency-grid">
        {CONTACTS.map((contact, idx) => (
          <motion.div 
            key={idx}
            className="emergency-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="card-header">
              <div className="icon-wrapper">
                <contact.icon size={24} />
              </div>
              <h3>{contact.title}</h3>
            </div>
            <p className="card-desc">{contact.desc}</p>
            <div className="phone-number">{contact.phone}</div>
            <a href={`tel:${contact.phone}`} className="call-btn">
              <Phone size={18} /> Call Now
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
