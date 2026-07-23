import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Star, Target } from 'lucide-react';
import './Leaderboard.css';

const STUDENTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ['Alex Chen', 'Sarah Jenkins', 'Miguel Santos', 'Emma Watson', 'Rahul Sharma', 'Emily Davis', 'David Kim', 'Sophie Martin', 'Lucas Silva', 'Olivia Taylor'][i % 10] + (i > 9 ? ' II' : ''),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=transparent`,
  xp: 15000 - i * 450 + Math.floor(Math.random() * 200),
  level: 45 - Math.floor(i * 1.5),
  streak: Math.floor(Math.random() * 60) + 1,
  problemsSolved: 400 - i * 15 + Math.floor(Math.random() * 50),
  badges: Math.floor(Math.random() * 15) + 5,
  trend: Math.random() > 0.6 ? 'up' : (Math.random() > 0.5 ? 'down' : 'same'),
  isCurrentUser: i === 7
}));

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [catFilter, setCatFilter] = useState('Overall');

  const top3 = [STUDENTS[1], STUDENTS[0], STUDENTS[2]]; // 2nd, 1st, 3rd

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <div className="header-title">
          <Trophy size={40} className="header-icon" />
          <div>
            <h1 className="gradient-text">Global Leaderboard</h1>
            <p className="subtitle">Compete with peers and climb the ranks</p>
          </div>
        </div>

        <div className="stats-card user-stats">
          <div className="stat-header">
            <h3>Your Status</h3>
            <span className="rank-badge">Rank #8</span>
          </div>
          <div className="progress-container">
            <div className="progress-info">
              <span>Level 34</span>
              <span>11,450 / 12,000 XP</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </header>

      <div className="filters-container">
        <div className="filter-group">
          {['This Week', 'This Month', 'All Time'].map(f => (
            <button key={f} className={`filter-btn ${timeFilter === f ? 'active' : ''}`} onClick={() => setTimeFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="filter-group">
          {['Overall', 'Coding', 'Interviews', 'Streaks'].map(f => (
            <button key={f} className={`filter-btn ${catFilter === f ? 'active' : ''}`} onClick={() => setCatFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <section className="podium-section">
        {top3.map((student, idx) => (
          <div key={student.id} className={`podium-spot rank-${idx === 0 ? 2 : idx === 1 ? 1 : 3}`}>
            {idx === 1 && <Medal className="crown-icon" size={32} color="#fbbf24" />}
            <div className="podium-avatar-wrapper">
              <img src={student.avatar} alt={student.name} className="podium-avatar" />
              <div className="rank-circle">{idx === 0 ? 2 : idx === 1 ? 1 : 3}</div>
            </div>
            <h3 className="podium-name">{student.name}</h3>
            <div className="podium-xp">{student.xp.toLocaleString()} XP</div>
            <div className="podium-level">Lvl {student.level}</div>
            <div className="podium-base"></div>
          </div>
        ))}
      </section>

      <section className="table-section">
        <div className="table-responsive">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Level</th>
                <th>XP Points</th>
                <th>Streak</th>
                <th>Solved</th>
                <th>Badges</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((student, idx) => (
                <tr key={student.id} className={student.isCurrentUser ? 'current-user-row' : ''}>
                  <td>
                    <div className="rank-cell">
                      <span className="rank-number">{idx + 1}</span>
                      {student.trend === 'up' && <TrendingUp size={16} color="#10b981" />}
                      {student.trend === 'down' && <TrendingDown size={16} color="#ef4444" />}
                      {student.trend === 'same' && <Minus size={16} color="#94a3b8" />}
                    </div>
                  </td>
                  <td>
                    <div className="student-cell">
                      <img src={student.avatar} alt={student.name} className="table-avatar" />
                      <span className="student-name">{student.name}</span>
                      {student.isCurrentUser && <span className="you-badge">You</span>}
                    </div>
                  </td>
                  <td><div className="level-badge">Lvl {student.level}</div></td>
                  <td className="xp-cell">{student.xp.toLocaleString()} XP</td>
                  <td><div className="streak-cell"><Star size={14} color="#f59e0b" /> {student.streak}</div></td>
                  <td><div className="solved-cell"><Target size={14} color="#3b82f6" /> {student.problemsSolved}</div></td>
                  <td>{student.badges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
