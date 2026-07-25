import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Flame, Star, Code2, Target, Map, 
  MessageSquare, Bot, ArrowRight, 
  ArrowUpRight, Clock, Zap,
  Calendar, CheckCircle2, Bell, FileText, BarChart
} from 'lucide-react';
import './Dashboard.css';

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going.",
  "Consistency is what transforms average into excellence."
];

export default function Dashboard() {
  // Try both common auth context patterns
  const auth = useAuth() as any;
  const userName = auth?.currentUser?.displayName || auth?.user?.displayName || "Student";

  const [greeting, setGreeting] = useState('Good day');
  const [quote, setQuote] = useState(QUOTES[0]);
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete OS Assignment', done: false },
    { id: 2, text: 'Solve 5 LeetCode problems', done: true },
    { id: 3, text: 'Update Resume for Placements', done: false }
  ]);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="welcome-title">
          {greeting}, {userName}! <span className="wave-emoji">👋</span>
        </h1>
        <p className="quote-text">"{quote}"</p>
      </header>

      {/* Main Grid 1: Stats & Overview */}
      <section className="dashboard-grid-main">
        {/* Quick Stats */}
        <div className="stats-col">
          <div className="stats-grid">
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
                <span className="stat-title">Problems Solved</span>
                <div className="stat-icon code"><Code2 size={20} /></div>
              </div>
              <p className="stat-value">87</p>
              <div className="stat-footer">
                <span className="stat-desc">Top 15% in batch</span>
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
                <span className="stat-title">CGPA</span>
                <div className="stat-icon target"><Target size={20} /></div>
              </div>
              <p className="stat-value">8.94</p>
              <div className="stat-footer">
                <span className="trend-up"><ArrowUpRight size={14} /> +0.12 this sem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Cards */}
        <div className="readiness-col">
          <div className="readiness-card glass-card">
            <div className="readiness-info">
              <h3>Placement Readiness</h3>
              <p>Based on academics, skills & mock tests</p>
              <div className="readiness-bars">
                <div className="bar-group">
                  <span>Aptitude</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: '75%', background: 'var(--success)'}}></div></div>
                </div>
                <div className="bar-group">
                  <span>Coding</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: '60%', background: 'var(--warning)'}}></div></div>
                </div>
                <div className="bar-group">
                  <span>Interview</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: '40%', background: 'var(--error)'}}></div></div>
                </div>
              </div>
            </div>
            <div className="progress-ring-container">
              <svg className="progress-ring" width="120" height="120">
                <circle className="progress-ring-circle-bg" cx="60" cy="60" r="50"></circle>
                <circle className="progress-ring-circle" cx="60" cy="60" r="50" style={{strokeDashoffset: 314 - (314 * 65) / 100}}></circle>
              </svg>
              <span className="progress-ring-text">65%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid 2: Today's Schedule & Academic Overviews */}
      <section className="dashboard-grid-secondary">
        <div className="schedule-section glass-card">
          <div className="section-header">
            <h2><Calendar size={20} /> Today's Schedule</h2>
            <Link to="/schedule" className="view-all">Full Timetable</Link>
          </div>
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="time-col">09:00 AM</div>
              <div className="schedule-details">
                <h4>Computer Networks</h4>
                <p>Room 304, SJT Block</p>
              </div>
            </div>
            <div className="schedule-item current">
              <div className="time-col">11:30 AM</div>
              <div className="schedule-details">
                <h4>Database Management Systems</h4>
                <p>Lab 2, TT Block</p>
              </div>
              <div className="live-badge">Ongoing</div>
            </div>
            <div className="schedule-item">
              <div className="time-col">02:00 PM</div>
              <div className="schedule-details">
                <h4>Placement Training</h4>
                <p>Auditorium</p>
              </div>
            </div>
          </div>
        </div>

        <div className="attendance-resume-col">
          <div className="attendance-card glass-card">
            <div className="section-header">
              <h2>Attendance Overview</h2>
            </div>
            <div className="attendance-content">
              <div className="attendance-ring">
                <svg className="progress-ring" width="100" height="100">
                  <circle className="progress-ring-circle-bg" cx="50" cy="50" r="40"></circle>
                  <circle className="progress-ring-circle" cx="50" cy="50" r="40" style={{strokeDashoffset: 251 - (251 * 85) / 100, stroke: 'var(--success)'}}></circle>
                </svg>
                <span className="progress-ring-text small">85%</span>
              </div>
              <div className="attendance-stats">
                <p><strong>Safe!</strong> You are above the 75% criteria.</p>
                <div className="attendance-leaves">
                  <span>Leaves Remaining:</span>
                  <strong>12</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-score-card glass-card">
             <div className="section-header">
              <h2>Resume Score</h2>
              <FileText size={20} />
            </div>
            <div className="resume-score-content">
              <div className="score-display">
                <span className="score">78</span><span className="max">/100</span>
              </div>
              <p>Needs action words & better formatting.</p>
              <button className="btn-secondary btn-sm">Scan Resume</button>
            </div>
          </div>
        </div>

        <div className="goals-announcements-col">
          <div className="goals-card glass-card">
            <div className="section-header">
              <h2>Weekly Goals</h2>
            </div>
            <ul className="goals-list">
              {goals.map(goal => (
                <li key={goal.id} className={`goal-item ${goal.done ? 'done' : ''}`} onClick={() => toggleGoal(goal.id)}>
                  <CheckCircle2 className="goal-check" size={20} />
                  <span>{goal.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="announcements-card glass-card">
            <div className="section-header">
              <h2>Announcements</h2>
              <Bell size={20} className="bell-icon" />
            </div>
            <div className="announcement-list">
              <div className="announcement-item">
                <span className="ann-date">Today</span>
                <p>TCS Ninja Registration closes tomorrow at 11:59 PM.</p>
              </div>
              <div className="announcement-item">
                <span className="ann-date">Yesterday</span>
                <p>Internal Hackathon shortlists announced.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Progress & Quick Actions */}
      <section className="coding-actions-section">
        <div className="coding-progress-card glass-card">
           <div className="section-header">
            <h2><BarChart size={20}/> Coding Progress</h2>
          </div>
          <div className="coding-tags">
            <div className="coding-tag master">Arrays <span>95%</span></div>
            <div className="coding-tag master">Strings <span>90%</span></div>
            <div className="coding-tag inter">Linked Lists <span>65%</span></div>
            <div className="coding-tag inter">Trees <span>50%</span></div>
            <div className="coding-tag beginner">Dynamic Prog. <span>20%</span></div>
            <div className="coding-tag beginner">Graphs <span>15%</span></div>
          </div>
        </div>

        <div className="quick-actions glass-card">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-grid-small">
            <Link to="/career-roadmap" className="action-btn">
              <Map size={18} /> Roadmap
            </Link>
            <Link to="/coding-hub" className="action-btn">
              <Code2 size={18} /> Practice
            </Link>
            <Link to="/mock-interview" className="action-btn">
              <MessageSquare size={18} /> Mocks
            </Link>
            <Link to="/ai-mentor" className="action-btn">
              <Bot size={18} /> AI Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Grid for Leaderboard and Daily Challenge */}
      <div className="bottom-grid">
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
          </div>
        </section>

        <section className="leaderboard-preview glass-card">
          <div className="section-header">
            <h2>Batch Leaderboard</h2>
            <Link to="/leaderboard" className="view-all">Full</Link>
          </div>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>XP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="rank-badge rank-1">1</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar" style={{background: '#ef4444'}}>R</div>
                    <span>Rahul Sharma</span>
                  </div>
                </td>
                <td>3,240</td>
              </tr>
              <tr>
                <td><span className="rank-badge rank-2">2</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar" style={{background: '#3b82f6'}}>P</div>
                    <span>Priya Singh</span>
                  </div>
                </td>
                <td>3,150</td>
              </tr>
              <tr className="current-user">
                <td><span className="rank-badge">42</span></td>
                <td>
                  <div className="user-cell">
                    <div className="avatar">Y</div>
                    <span>{userName} (You)</span>
                  </div>
                </td>
                <td>2,450</td>
              </tr>
            </tbody>
          </table>
        </section>

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
