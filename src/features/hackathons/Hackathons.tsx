import React, { useState } from 'react';
import { Trophy, Users, Calendar, Clock, ArrowRight, ExternalLink, Code, BrainCircuit, Globe, Server, Search, Timer } from 'lucide-react';
import './Hackathons.css';

const HACKATHONS = [
  { id: 1, name: 'Google DevFest Hackathon', organizer: 'Google', date: 'Aug 15-17', prize: '$10,000', tags: ['AI/ML', 'Cloud'], participants: 342, status: 'Upcoming', teamSize: '2-4', difficulty: 'Intermediate', deadline: 'Aug 10', timeRemaining: '20d 4h' },
  { id: 2, name: 'HackMIT', organizer: 'MIT', date: 'Sep 5-7', prize: '$15,000', tags: ['Open Innovation', 'Hardware'], participants: 521, status: 'Upcoming', teamSize: '1-4', difficulty: 'Advanced', deadline: 'Aug 25', timeRemaining: '41d 12h' },
  { id: 3, name: 'CodeStorm 2026', organizer: 'Campus Matrix', date: 'Jul 20-21', prize: '$5,000', tags: ['Web Dev', 'Mobile'], participants: 189, status: 'Ongoing', teamSize: '2-3', difficulty: 'Beginner', deadline: 'Jul 19', timeRemaining: 'Ends in 2d' },
  { id: 4, name: 'Meta Hacker Cup', organizer: 'Meta', date: 'Aug 1-3', prize: '$20,000', tags: ['Algorithms', 'Data Structures'], participants: 1204, status: 'Upcoming', teamSize: '1', difficulty: 'Advanced', deadline: 'Jul 28', timeRemaining: '6d 8h' },
  { id: 5, name: 'AWS BuilderCon', organizer: 'Amazon', date: 'Oct 10-12', prize: '$8,000', tags: ['Cloud', 'Serverless'], participants: 215, status: 'Upcoming', teamSize: '2-5', difficulty: 'Intermediate', deadline: 'Oct 1', timeRemaining: '76d 5h' },
  { id: 6, name: 'Campus Innovate', organizer: 'Innovation Cell', date: 'Jun 15-16', prize: '$3,000', tags: ['Social Impact', 'IoT'], participants: 430, status: 'Past', teamSize: '3-4', difficulty: 'Beginner', deadline: 'Jun 10', timeRemaining: 'Ended' },
];

export default function Hackathons() {
  const [filter, setFilter] = useState('Upcoming');
  const [search, setSearch] = useState('');

  const filteredHackathons = HACKATHONS.filter(h => {
    const matchesFilter = h.status === filter;
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="hackathons-container">
      <header className="hackathons-header">
        <h1 className="gradient-text">Hackathons & Competitions</h1>
        <p className="subtitle">Compete, collaborate, and build amazing projects</p>
        
        <div className="search-filter-row" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="search-box" style={{ position: 'relative', minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search hackathons, tags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
          </div>
          
          <div className="filter-tabs">
            {['Upcoming', 'Ongoing', 'Past'].map(tab => (
              <button 
                key={tab} 
                className={`filter-btn ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div className="status-badge" data-status={hack.status}>{hack.status}</div>
                <div className="time-remaining" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                  <Timer size={14} /> {hack.timeRemaining}
                </div>
              </div>
              <h3>{hack.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>By {hack.organizer}</p>
              
              <div className="tags">
                {hack.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              
              <div className="hack-details">
                <div className="detail-row"><Calendar size={16} /> {hack.date} (Reg: {hack.deadline})</div>
                <div className="detail-row"><Trophy size={16} /> {hack.prize}</div>
                <div className="detail-row"><Users size={16} /> {hack.teamSize} members</div>
                <div className="detail-row"><Clock size={16} /> {hack.participants} registered</div>
                <div className="detail-row"><Code size={16} /> {hack.difficulty}</div>
              </div>
              
              <button className={`card-btn ${hack.status === 'Past' ? 'secondary' : 'primary'}`} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: hack.status === 'Past' ? 'var(--bg-tertiary)' : 'var(--accent)', color: hack.status === 'Past' ? 'var(--text-primary)' : '#fff', border: 'none', cursor: 'pointer' }}>
                {hack.status === 'Past' ? 'View Winners' : 'Register / View Details'} <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
        {filteredHackathons.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
            No hackathons found.
          </div>
        )}
      </section>
    </div>
  );
}
