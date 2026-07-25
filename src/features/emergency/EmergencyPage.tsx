import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldAlert, HeartPulse, UserCheck, Users, Flame, AlertCircle, CheckCircle2 } from 'lucide-react';
import Modal from '@/components/Modal';
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
  const [sosSent, setSosSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerSOS = () => {
    setSosSent(true);
    setIsModalOpen(true);
  };

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
        <button className="sos-btn" onClick={triggerSOS}>
          <AlertCircle size={24} /> {sosSent ? 'SOS ACTIVE' : 'QUICK SOS'}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="🚨 SOS Signal Dispatched" size="md">
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(0, 184, 148, 0.1)', color: 'var(--accent-success)', marginBottom: '1rem' }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Emergency Alert Received</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Your GPS location and emergency signal have been dispatched to Campus Security Control Room. An emergency response officer is responding to your request.
          </p>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hotline: <strong>1800-123-4567</strong></p>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status: <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>Active Dispatch</span></p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(false)} style={{ width: '100%' }}>
            Acknowledge & Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
