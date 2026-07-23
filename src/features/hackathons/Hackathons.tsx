import React, { useState } from 'react';
import { Trophy, Users, Calendar, Clock, ArrowRight, ExternalLink, Code, BrainCircuit, Globe, Server, Shield, Zap } from 'lucide-react';
import './Hackathons.css';

const HACKATHONS = [
  { id: 1, name: 'Google DevFest Hackathon', date: 'Aug 15-17', prize: '$10,000', tags: ['AI/ML'], participants: 342, status: 'Upcoming', teamSize: '2-4' },
  { id: 2, name: 'HackMIT', date: 'Sep 5-7', prize: '$15,000', tags: ['Open Innovation'], participants: 521, status: 'Upcoming', teamSize: '1-4' },
  { id: 3, name: 'CodeStorm 2026', date: 'Jul 20-21', prize: '$5,000', tags: ['Web Dev'], participants: 189, status: 'Live Now', teamSize: '2-3' },
  { id: 4, name: 'Meta Hacker Cup', date: 'Aug 1-3', prize: '$20,000', tags: ['Algorithms'], participants: 1204, status: 'Upcoming', teamSize: '1' },
  { id: 5, name: 'AWS BuilderCon', date: 'Oct 10-12', prize: '$8,000', tags: ['Cloud'], participants: 215, status: 'Upcoming', teamSize: '2-5' },
  { id: 6, name: 'Campus Innovate', date: 'Jun 15-16', prize: '$3,000', tags: ['Social Impact'], participants: 430, status: 'Completed', teamSize: '3-4' },
];

export default function Hackathons() {
  const [filter, setFilter] = useState('All');

  const filteredHackathons = HACKATHONS.filter(h => filter === 'All' || h.status === filter);

  return (
    <div className="hackathons-container">
      <header className="hackathons-header">
        <h1 className="gradient-text">Hackathons & Competitions</h1>
        <p className="subtitle">Compete, collaborate, and build amazing projects</p>
        
        <div className="filter-tabs">
          {['All', 'Upcoming', 'Live Now', 'Past'].map(tab => (
            <button 
              key={tab} 
              className={`filter-btn ${filter === (tab === 'Past' ? 'Completed' : tab) ? 'active' : ''}`}
              onClick={() => setFilter(tab === 'Past' ? 'Completed' : tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <section className="featured-hackathon">
        <div className="featured-content">
          <div className="featured-badge">Registration Open</div>
          <h2>Global AI Hackathon 2026</h2>
          <p className="featured-desc">Build the next generation of AI-powered applications. Join thousands of developers worldwide.</p>
          
          <div className="featured-stats">
            <div className="stat"><Calendar size={18} /> Nov 12-14</div>
            <div className="stat"><Trophy size={18} /> $50,000 Prize Pool</div>
            <div className="stat"><Users size={18} /> 1,240 Registered</div>
          </div>
          
          <div className="countdown">
            <div className="time-block"><span>12</span>Days</div>
            <div className="time-block"><span>04</span>Hours</div>
            <div className="time-block"><span>45</span>Mins</div>
          </div>
          
          <button className="primary-btn">Register Now <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="hackathons-grid">
        {filteredHackathons.map(hack => (
          <div key={hack.id} className="hackathon-card">
            <div className="card-header-strip" style={{ background: `var(--gradient-${hack.id % 3 + 1})` }}></div>
            <div className="card-content">
              <div className="status-badge" data-status={hack.status}>{hack.status}</div>
              <h3>{hack.name}</h3>
              
              <div className="tags">
                {hack.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              
              <div className="hack-details">
                <div className="detail-row"><Calendar size={16} /> {hack.date}</div>
                <div className="detail-row"><Trophy size={16} /> {hack.prize}</div>
                <div className="detail-row"><Users size={16} /> {hack.teamSize} members</div>
                <div className="detail-row"><Clock size={16} /> {hack.participants} registered</div>
              </div>
              
              <button className={`card-btn ${hack.status === 'Completed' ? 'secondary' : 'primary'}`}>
                {hack.status === 'Completed' ? 'View Winners' : 'View Details'} <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="past-winners">
        <h2>Past Winners Showcase</h2>
        <div className="winners-scroll">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="winner-card">
              <div className="winner-project">EcoTrack App</div>
              <div className="winner-team">Team Syntax Error</div>
              <div className="winner-hackathon">Campus Innovate 2026</div>
              <p>An AI-powered application that tracks and suggests ways to reduce personal carbon footprint.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
