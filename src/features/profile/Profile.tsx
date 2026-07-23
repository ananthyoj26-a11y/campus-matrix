import React, { useEffect, useState } from 'react';
import { Award, Target, Zap, Clock, Shield, Star, Trophy, Target as TargetIcon, Code, MessageSquare, Briefcase, Map, Users, Monitor, Edit2 } from 'lucide-react';
import './Profile.css';

const badges = [
  { id: '1', name: 'Week Warrior', description: '7-day streak', icon: '🔥', earned: true, date: '2023-10-15' },
  { id: '2', name: 'Month Master', description: '30-day streak', icon: '💪', earned: true, date: '2023-11-05' },
  { id: '3', name: 'Century Streak', description: '100-day streak', icon: '💎', earned: false },
  { id: '4', name: 'First Code', description: 'First problem solved', icon: '💻', earned: true, date: '2023-09-01' },
  { id: '5', name: 'Problem Pro', description: '50 problems solved', icon: '⭐', earned: true, date: '2023-12-20' },
  { id: '6', name: 'Code Champion', description: '100 problems', icon: '🏆', earned: false },
  { id: '7', name: 'Sharpshooter', description: '10 easy problems', icon: '🎯', earned: true, date: '2023-09-10' },
  { id: '8', name: 'Brain Teaser', description: '10 medium problems', icon: '🧠', earned: true, date: '2023-10-01' },
  { id: '9', name: 'Hard Core', description: '10 hard problems', icon: '🔥', earned: false },
  { id: '10', name: 'First Mock', description: 'First mock interview', icon: '🎙️', earned: true, date: '2023-11-15' },
  { id: '11', name: 'Interview Ace', description: '10 mock interviews', icon: '💬', earned: true, date: '2024-01-10' },
  { id: '12', name: 'Perfect Score', description: '100% interview score', icon: '💯', earned: false },
  { id: '13', name: 'Career Starter', description: 'Started career roadmap', icon: '🚀', earned: true, date: '2023-09-05' },
  { id: '14', name: 'Pathfinder', description: '50% roadmap complete', icon: '🗺️', earned: true, date: '2024-02-01' },
  { id: '15', name: 'Track Master', description: 'Complete a roadmap', icon: '🎓', earned: false },
  { id: '16', name: 'Team Player', description: 'Joined a guild', icon: '🤝', earned: true, date: '2023-09-20' },
  { id: '17', name: 'Hackathon Hero', description: 'Participated in hackathon', icon: '🏅', earned: true, date: '2024-03-15' },
];

const timeline = [
  { id: 1, title: 'Earned Hackathon Hero Badge', date: '2 days ago', xp: 500, icon: <Trophy size={16} /> },
  { id: 2, title: 'Completed React Roadmap', date: '1 week ago', xp: 1000, icon: <Map size={16} /> },
  { id: 3, title: 'Solved 5 Medium Problems', date: '2 weeks ago', xp: 250, icon: <Code size={16} /> },
  { id: 4, title: 'Aced Mock Interview', date: '1 month ago', xp: 400, icon: <MessageSquare size={16} /> },
];

const Profile: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info-section">
          <div className="profile-avatar">
            <span className="avatar-initials">AC</span>
          </div>
          <div className="profile-details">
            <div className="profile-name-row">
              <h1 className="profile-name">Alex Chen</h1>
              <button className="edit-profile-btn">
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
            <p className="profile-title">Full Stack Developer</p>
            <p className="profile-college">Stanford University • 3rd Year</p>
            <p className="profile-bio">
              Passionate about building web applications and exploring AI. Currently diving deep into React and TypeScript.
            </p>
            <div className="profile-stats-row">
              <div className="stat-badge xp-badge">
                <Star size={16} />
                <span>2,450 XP</span>
              </div>
              <div className="stat-badge level-badge">
                <Target size={16} />
                <span>Level 12</span>
              </div>
              <div className="stat-badge streak-badge">
                <Zap size={16} />
                <span>15 Days</span>
              </div>
              <div className="stat-badge rank-badge">
                <Trophy size={16} />
                <span>#42</span>
              </div>
            </div>
            <div className="career-track">
              <Briefcase size={16} />
              <span>Career Track: Frontend Development</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="main-content">
          {/* Badges Section */}
          <section className="badges-section">
            <div className="section-header">
              <h2>Achievement Badges</h2>
              <span className="badge-count">
                {badges.filter(b => b.earned).length} / {badges.length}
              </span>
            </div>
            <div className="badges-grid">
              {badges.map((badge) => (
                <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`} title={badge.description}>
                  <div className="badge-icon-wrapper">
                    <span className="badge-emoji">{badge.icon}</span>
                    {!badge.earned && (
                      <div className="lock-overlay">
                        <Shield size={16} />
                      </div>
                    )}
                  </div>
                  <h3 className="badge-name">{badge.name}</h3>
                  {badge.earned ? (
                    <span className="badge-date">{badge.date}</span>
                  ) : (
                    <span className="badge-locked-text">Locked</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="timeline-section">
            <h2>Recent Activity</h2>
            <div className="timeline-container">
              {timeline.map((item, index) => (
                <div key={item.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot">
                    {item.icon}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{item.title}</h3>
                      <span className="timeline-xp">+{item.xp} XP</span>
                    </div>
                    <span className="timeline-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sidebar-content">
          {/* Skills Radar */}
          <section className="skills-radar-section">
            <h2>Skills Proficiency</h2>
            <div className={`radar-container ${mounted ? 'animate' : ''}`}>
               {/* A simplified SVG radar chart placeholder */}
               <svg width="250" height="250" viewBox="0 0 100 100" className="radar-svg">
                  <polygon points="50,5 95,27 95,73 50,95 5,73 5,27" className="radar-grid" />
                  <polygon points="50,25 75,37 75,63 50,75 25,63 25,37" className="radar-grid" />
                  
                  {/* Skill points (Frontend 85%, Backend 60%, Algo 70%, Sys 45%, DB 55%, DevOps 30%) */}
                  <polygon 
                    points="50,12.5 77,36 83,63 50,75 22,60 36,36" 
                    className="radar-area" 
                  />
                  
                  <text x="50" y="3" className="radar-label" textAnchor="middle">Frontend</text>
                  <text x="98" y="27" className="radar-label" textAnchor="start">Backend</text>
                  <text x="98" y="75" className="radar-label" textAnchor="start">Algorithms</text>
                  <text x="50" y="99" className="radar-label" textAnchor="middle">System Design</text>
                  <text x="2" y="75" className="radar-label" textAnchor="end">Databases</text>
                  <text x="2" y="27" className="radar-label" textAnchor="end">DevOps</text>
               </svg>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
