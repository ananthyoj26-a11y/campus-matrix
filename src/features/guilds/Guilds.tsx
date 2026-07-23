import React from 'react';
import { Users, Plus, MessageSquare, Calendar, ChevronRight, Activity } from 'lucide-react';
import './Guilds.css';

const GUILDS = [
  { id: 1, name: 'React Pioneers', emoji: '🚀', members: 128, tags: ['React', 'TypeScript', 'Next.js'], activity: 'High', desc: 'Exploring the boundaries of React ecosystem and modern web development.', joined: true, color: '#3b82f6' },
  { id: 2, name: 'AI/ML Explorers', emoji: '🤖', members: 95, tags: ['Python', 'TensorFlow', 'PyTorch'], activity: 'High', desc: 'Diving deep into artificial intelligence, machine learning and data science.', joined: false, color: '#10b981' },
  { id: 3, name: 'Cloud Architects', emoji: '☁️', members: 67, tags: ['AWS', 'GCP', 'Azure'], activity: 'Medium', desc: 'Building scalable and resilient cloud infrastructure and serverless apps.', joined: false, color: '#f59e0b' },
  { id: 4, name: 'Mobile Mavericks', emoji: '📱', members: 54, tags: ['Flutter', 'React Native', 'Swift'], activity: 'Medium', desc: 'Crafting beautiful and performant mobile experiences for iOS and Android.', joined: false, color: '#ec4899' },
  { id: 5, name: 'CyberSec Squad', emoji: '🔒', members: 43, tags: ['Security', 'Ethical Hacking', 'CTF'], activity: 'Low', desc: 'Learning about application security, pentesting, and participating in CTFs.', joined: true, color: '#ef4444' },
  { id: 6, name: 'Game Dev Guild', emoji: '🎮', members: 89, tags: ['Unity', 'Unreal', 'C#'], activity: 'High', desc: 'Designing and developing indie games, sharing assets and knowledge.', joined: false, color: '#8b5cf6' },
];

export default function Guilds() {
  const myGuilds = GUILDS.filter(g => g.joined);

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
          <h2>My Guilds</h2>
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

      <section className="explore-guilds">
        <h2>Explore Guilds</h2>
        <div className="guilds-grid">
          {GUILDS.map(guild => (
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
              <p className="guild-desc">{guild.desc}</p>
              
              <div className="guild-tags">
                {guild.tags.map(tag => <span key={tag} className="guild-tag">{tag}</span>)}
              </div>
              
              <div className="activity-level">
                <Activity size={14} /> Activity: 
                <span className={`activity-bar ${guild.activity.toLowerCase()}`}></span>
                {guild.activity}
              </div>
              
              <button className={`join-btn ${guild.joined ? 'joined' : ''}`}>
                {guild.joined ? 'Joined' : 'Join Guild'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
