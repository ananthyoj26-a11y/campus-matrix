import React, { useState } from 'react';
import { Users, Plus, MessageSquare, Calendar, ChevronRight, Activity, Search } from 'lucide-react';
import './Guilds.css';

const GUILDS = [
  { id: 1, name: 'React Pioneers', category: 'Web Dev', emoji: '🚀', members: 128, tags: ['React', 'TypeScript', 'Next.js'], activity: 'High', desc: 'Exploring the boundaries of React ecosystem and modern web development.', joined: true, color: '#3b82f6' },
  { id: 2, name: 'AI/ML Explorers', category: 'AI/ML', emoji: '🤖', members: 95, tags: ['Python', 'TensorFlow', 'PyTorch'], activity: 'High', desc: 'Diving deep into artificial intelligence, machine learning and data science.', joined: false, color: '#10b981' },
  { id: 3, name: 'Cloud Architects', category: 'Web Dev', emoji: '☁️', members: 67, tags: ['AWS', 'GCP', 'Azure'], activity: 'Medium', desc: 'Building scalable and resilient cloud infrastructure and serverless apps.', joined: false, color: '#f59e0b' },
  { id: 4, name: 'Mobile Mavericks', category: 'Web Dev', emoji: '📱', members: 54, tags: ['Flutter', 'React Native', 'Swift'], activity: 'Medium', desc: 'Crafting beautiful and performant mobile experiences for iOS and Android.', joined: false, color: '#ec4899' },
  { id: 5, name: 'CyberSec Squad', category: 'Coding', emoji: '🔒', members: 43, tags: ['Security', 'Ethical Hacking', 'CTF'], activity: 'Low', desc: 'Learning about application security, pentesting, and participating in CTFs.', joined: true, color: '#ef4444' },
  { id: 6, name: 'Game Dev Guild', category: 'Design', emoji: '🎮', members: 89, tags: ['Unity', 'Unreal', 'C#'], activity: 'High', desc: 'Designing and developing indie games, sharing assets and knowledge.', joined: false, color: '#8b5cf6' },
  { id: 7, name: 'Open Source Ninjas', category: 'Open Source', emoji: '🌟', members: 150, tags: ['GitHub', 'OSS', 'Linux'], activity: 'High', desc: 'Contributing to open source and learning real-world collaboration.', joined: false, color: '#f97316' },
  { id: 8, name: 'Algo Masters', category: 'Competitive Programming', emoji: '🧠', members: 110, tags: ['C++', 'Algorithms', 'Codeforces'], activity: 'High', desc: 'Daily algorithmic challenges and competitive programming practice.', joined: false, color: '#06b6d4' }
];

const CATEGORIES = ['All', 'Coding', 'Design', 'AI/ML', 'Web Dev', 'Open Source', 'Competitive Programming'];

export default function Guilds() {
  const [guilds, setGuilds] = useState(GUILDS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const myGuilds = guilds.filter(g => g.joined);

  const toggleJoin = (id: number) => {
    setGuilds(guilds.map(g => g.id === id ? { ...g, joined: !g.joined } : g));
  };

  const filteredGuilds = guilds.filter(g => {
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="guilds-container">
      <header className="guilds-header">
        <div className="header-text">
          <h1 className="gradient-text">Student Guilds</h1>
          <p className="subtitle">Join communities, learn together, grow faster</p>
        </div>
        <button className="ghost-btn"><Plus size={18} /> Create Guild</button>
      </header>

      {myGuilds.length > 0 && (
        <section className="my-guilds">
          <h2>Your Guilds</h2>
          <div className="my-guilds-scroll">
            {myGuilds.map(guild => (
              <div key={guild.id} className="my-guild-card" style={{ '--guild-color': guild.color } as any}>
                <div className="my-guild-header">
                  <div className="guild-avatar" style={{ background: `${guild.color}20` }}>
                    {guild.emoji}
                  </div>
                  <h3>{guild.name}</h3>
                </div>
                <div className="my-guild-stats">
                  <div className="stat"><MessageSquare size={14} /> 24 new messages</div>
                  <div className="stat"><Calendar size={14} /> 2 events this week</div>
                </div>
                <button className="enter-btn">Enter <ChevronRight size={16} /></button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="featured-guild-spotlight" style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '4rem', padding: '1.5rem', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '50%' }}>🌟</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Guild Spotlight</div>
            <h2>Open Source Ninjas</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '600px' }}>Join the largest growing community this month! Contribute to amazing open source projects, build your portfolio, and participate in Hacktoberfest with us.</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}><Users size={16}/> 150 Active Members</span>
              <button className="primary-btn" onClick={() => toggleJoin(7)} style={{ padding: '0.5rem 1rem', background: 'var(--accent)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>{guilds.find(g => g.id === 7)?.joined ? 'Leave Guild' : 'Join Spotlight Guild'}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-guilds">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Explore Guilds</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
            <div className="search-box" style={{ position: 'relative', width: '250px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search guilds..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              />
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        
        <div className="guilds-grid">
          {filteredGuilds.map(guild => (
            <div key={guild.id} className="guild-card">
              <div className="guild-top">
                <div className="guild-avatar large" style={{ background: `${guild.color}20` }}>
                  {guild.emoji}
                </div>
                <div className="member-count">
                  <div className="active-dot"></div>
                  {guild.members} members
                </div>
              </div>
              
              <h3 className="guild-name">{guild.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>{guild.category}</p>
              <p className="guild-desc">{guild.desc}</p>
              
              <div className="guild-tags">
                {guild.tags.map(tag => <span key={tag} className="guild-tag">{tag}</span>)}
              </div>
              
              <div className="activity-level">
                <Activity size={14} /> Activity: 
                <span className={`activity-bar ${guild.activity.toLowerCase()}`}></span>
                {guild.activity}
              </div>
              
              <button 
                className={`join-btn ${guild.joined ? 'joined' : ''}`}
                onClick={() => toggleJoin(guild.id)}
              >
                {guild.joined ? 'Leave Guild' : 'Join Guild'}
              </button>
            </div>
          ))}
          {filteredGuilds.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
              No guilds found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
