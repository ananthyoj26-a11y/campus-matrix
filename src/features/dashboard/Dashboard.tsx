import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  LayoutDashboard, Flame, Star, Code2, Target, Map, 
  MessageSquare, Briefcase, Trophy, Bot, ArrowRight, 
  ArrowUpRight, Clock, Calendar, Medal, ChevronRight, Zap 
} from 'lucide-react';
import './Dashboard.css';

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your career is a marathon, not a sprint."
];

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Good day');
  const [quote, setQuote] = useState(QUOTES[0]);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const userName = "Alex"; // Mock user

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="welcome-title">
          {greeting}, {userName}! <span className="wave-emoji">👋</span>
        </h1>
        <p className="quote-text">"{quote}"</p>
      </header>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-header">
            <span className="stat-title">Current Streak</span>
            <div className="stat-icon fire streak-fire"><Flame size={20} /></div>
          </div>
          <p className="stat-value">15 Days</p>
          <div className="stat-footer">
            <span className="trend-up"><ArrowUpRight size={14} /> Keep it up!</span>
          </div>
        </div>
        
        <div className="stat-card glass-card">
          <div className="stat-header">
            <span className="stat-title">XP Points</span>
            <div className="stat-icon star"><Star size={20} /></div>
          </div>
          <p className="stat-value">2,450</p>
          <div className="stat-footer">
            <span className="trend-up"><ArrowUpRight size={14} /> +120 this week</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-header">
            <span className="stat-title">Problems Solved</span>
            <div className="stat-icon code"><Code2 size={20} /></div>
          </div>
          <p className="stat-value">87<span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>/500</span></p>
          <div className="stat-footer">
            <span className="stat-desc">Top 15% of students</span>
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-header">
            <span className="stat-title">Career Progress</span>
            <div className="stat-icon target"><Target size={20} /></div>
          </div>
          <p className="stat-value">42%</p>
          <div className="stat-footer">
            <span className="trend-up"><ArrowUpRight size={14} /> +5% this month</span>
          </div>
        </div>
      </section>

      {/* Progress Overview Section */}
      <section className="progress-section glass-card">
        <div className="progress-info">
          <h3>Frontend Developer Path</h3>
          <p>Next milestone: Master React Hooks (Estimated time: 2 hours)</p>
          <button className="btn-primary">Continue Learning <ArrowRight size={16} /></button>
        </div>
        <div className="progress-ring-container">
          <svg className="progress-ring" width="120" height="120">
            <circle className="progress-ring-circle-bg" cx="60" cy="60" r="50"></circle>
            <circle className="progress-ring-circle" cx="60" cy="60" r="50"></circle>
          </svg>
          <span className="progress-ring-text">42%</span>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/roadmap" className="action-card glass-card">
            <div className="action-icon bg-indigo"><Map /></div>
            <div className="action-content">
              <h3>Career Roadmap</h3>
              <p>Continue your path</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Link>
          <Link to="/coding" className="action-card glass-card">
            <div className="action-icon bg-emerald"><Code2 /></div>
            <div className="action-content">
              <h3>Coding Hub</h3>
              <p>Solve problems</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Link>
          <Link to="/interviews" className="action-card glass-card">
            <div className="action-icon bg-purple"><MessageSquare /></div>
            <div className="action-content">
              <h3>Mock Interview</h3>
              <p>Practice now</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Link>
          <Link to="/jobs" className="action-card glass-card">
            <div className="action-icon bg-amber"><Briefcase /></div>
            <div className="action-content">
              <h3>Campus Jobs</h3>
              <p>Browse openings</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Link>
          <Link to="/hackathons" className="action-card glass-card">
            <div className="action-icon bg-cyan"><Trophy /></div>
            <div className="action-content">
              <h3>Hackathons</h3>
              <p>Compete & win</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Link>
          <Link to="/mentor" className="action-card glass-card">
            <div className="action-icon bg-rose"><Bot /></div>
            <div className="action-content">
              <h3>AI Mentor</h3>
              <p>Get guidance</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Link>
        </div>
      </section>

      {/* Two Column Layout for Feed and Events */}
      <div className="two-col-layout">
        {/* Activity Feed */}
        <section className="activity-feed glass-card">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <Link to="/activity" className="view-all">View All</Link>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon-wrapper"><Code2 size={18} /></div>
              <div className="activity-content">
                <div className="activity-text">
                  <p>Solved <strong>'Two Sum'</strong> problem</p>
                  <span className="activity-time"><Clock size={12} /> 2 hours ago</span>
                </div>
                <span className="activity-xp">+15 XP</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon-wrapper"><Map size={18} /></div>
              <div className="activity-content">
                <div className="activity-text">
                  <p>Completed <strong>React basics</strong> module</p>
                  <span className="activity-time"><Clock size={12} /> 5 hours ago</span>
                </div>
                <span className="activity-xp">+50 XP</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon-wrapper"><Medal size={18} /></div>
              <div className="activity-content">
                <div className="activity-text">
                  <p>Earned <strong>'First Mock'</strong> badge</p>
                  <span className="activity-time"><Clock size={12} /> 1 day ago</span>
                </div>
                <span className="activity-xp">+100 XP</span>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="upcoming-events glass-card">
          <div className="section-header">
            <h2>Upcoming Events</h2>
          </div>
          <div className="events-list">
            <div className="event-item">
              <div className="event-date">
                <span className="event-month">Jul</span>
                <span className="event-day">25</span>
              </div>
              <div className="event-details">
                <h4>Mock Interview Session</h4>
                <span className="event-type">Interview Prep</span>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <span className="event-month">Jul</span>
                <span className="event-day">28</span>
              </div>
              <div className="event-details">
                <h4>Google Hackathon</h4>
                <span className="event-type">Competition</span>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <span className="event-month">Jul</span>
                <span className="event-day">30</span>
              </div>
              <div className="event-details">
                <h4>Resume Workshop</h4>
                <span className="event-type">Career</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Grid for Leaderboard and Daily Challenge */}
      <div className="bottom-grid">
        {/* Leaderboard Preview */}
        <section className="leaderboard-preview glass-card">
          <div className="section-header">
            <h2>Leaderboard</h2>
            <Link to="/leaderboard" className="view-all">Full Rankings</Link>
          </div>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>XP</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="rank-badge rank-1">1</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar" style={{background: '#ef4444'}}>S</div>
                    <span>Sarah Jenkins</span>
                  </div>
                </td>
                <td>3,240</td>
                <td><span className="level-badge">Lvl 12</span></td>
              </tr>
              <tr>
                <td><span className="rank-badge rank-2">2</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar" style={{background: '#3b82f6'}}>M</div>
                    <span>Michael Chang</span>
                  </div>
                </td>
                <td>3,150</td>
                <td><span className="level-badge">Lvl 11</span></td>
              </tr>
              <tr>
                <td><span className="rank-badge rank-3">3</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar" style={{background: '#10b981'}}>E</div>
                    <span>Emma Watson</span>
                  </div>
                </td>
                <td>2,980</td>
                <td><span className="level-badge">Lvl 10</span></td>
              </tr>
              <tr className="current-user">
                <td><span className="rank-badge">4</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar">A</div>
                    <span>Alex (You)</span>
                  </div>
                </td>
                <td>2,450</td>
                <td><span className="level-badge">Lvl 8</span></td>
              </tr>
              <tr>
                <td><span className="rank-badge">5</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar" style={{background: '#8b5cf6'}}>D</div>
                    <span>David Kim</span>
                  </div>
                </td>
                <td>2,100</td>
                <td><span className="level-badge">Lvl 7</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Daily Challenge */}
        <section className="daily-challenge glass-card challenge-card">
          <div className="challenge-icon"><Zap size={32} /></div>
          <h3 className="challenge-title">Daily Challenge</h3>
          <div className="challenge-meta">
            <span className="diff-badge">Medium</span>
            <span className="xp-reward">+50 XP</span>
          </div>
          <p style={{color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)'}}>
            Valid Anagram - String Manipulation
          </p>
          <div className="timer">
            <Clock size={16} /> 05h 23m remaining
          </div>
          <button className="btn-primary btn-full">Solve Now <ArrowRight size={16}/></button>
        </section>
      </div>
    </div>
  );
}
