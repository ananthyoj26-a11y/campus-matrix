import React, { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, Flame, CheckCircle, Clock } from 'lucide-react';
import './CodingHub.css';

interface Problem {
  id: string;
  num: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: string;
  status: 'solved' | 'attempted' | 'unsolved';
}

const PROBLEMS: Problem[] = [
  { id: '1', num: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Array, Hash Table', acceptance: '49.2%', status: 'solved' },
  { id: '20', num: 20, title: 'Valid Parentheses', difficulty: 'Easy', category: 'String, Stack', acceptance: '40.2%', status: 'solved' },
  { id: '56', num: 56, title: 'Merge Intervals', difficulty: 'Medium', category: 'Array, Sorting', acceptance: '46.0%', status: 'attempted' },
  { id: '146', num: 146, title: 'LRU Cache', difficulty: 'Medium', category: 'Hash Table, Linked List', acceptance: '40.6%', status: 'unsolved' },
  { id: '42', num: 42, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Array, Two Pointers', acceptance: '58.5%', status: 'unsolved' },
  { id: '200', num: 200, title: 'Number of Islands', difficulty: 'Medium', category: 'Array, DFS, BFS', acceptance: '56.8%', status: 'unsolved' },
  { id: '3', num: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Hash Table, String', acceptance: '33.8%', status: 'solved' },
  { id: '121', num: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Array, DP', acceptance: '54.4%', status: 'solved' },
];

export default function CodingHub() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy heatmap data (28 days)
  const heatmapData = Array.from({ length: 28 }, () => Math.floor(Math.random() * 5));

  return (
    <div className="coding-hub-container">
      <header className="hub-header">
        <h1 className="hub-title">Coding Practice Hub</h1>
        
        <div className="global-stats">
          <div className="stat-item">
            <span className="stat-val">87</span>
            <span className="stat-label">Solved</span>
          </div>
          <div className="stat-item">
            <span className="stat-val stat-easy">45</span>
            <span className="stat-label">Easy</span>
          </div>
          <div className="stat-item">
            <span className="stat-val stat-medium">32</span>
            <span className="stat-label">Medium</span>
          </div>
          <div className="stat-item">
            <span className="stat-val stat-hard">10</span>
            <span className="stat-label">Hard</span>
          </div>
        </div>
      </header>

      <div className="daily-challenge-banner">
        <div className="daily-info">
          <h3><Flame size={20} /> Daily Coding Challenge</h3>
          <p>Solve today's problem to maintain your 5-day streak!</p>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>Problem: </strong> <Link to="/coding-hub/200" style={{ color: 'var(--primary-light)' }}>Number of Islands</Link>
          </div>
        </div>
        <div className="daily-timer">
          14:22:05
        </div>
      </div>

      <div className="hub-content">
        <div className="main-panel">
          <div className="filters-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search problems..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select className="filter-select">
              <option value="all">Difficulty: All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select className="filter-select">
              <option value="all">Status: All</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <select className="filter-select">
              <option value="all">Category: All</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="dp">Dynamic Programming</option>
            </select>
          </div>

          <div className="problems-table-container">
            <table className="problems-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>#</th>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Acceptance</th>
                </tr>
              </thead>
              <tbody>
                {PROBLEMS.map(prob => (
                  <tr key={prob.id}>
                    <td className="status-cell">
                      {prob.status === 'solved' && <CheckCircle size={18} />}
                      {prob.status === 'attempted' && <Clock size={18} color="var(--accent-amber)" />}
                    </td>
                    <td>{prob.num}</td>
                    <td>
                      <Link to={`/coding-hub/${prob.id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
                        {prob.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}>
                        {prob.difficulty}
                      </span>
                    </td>
                    <td>
                      {prob.category.split(', ').map(cat => (
                        <span key={cat} className="tag-badge">{cat}</span>
                      ))}
                    </td>
                    <td>{prob.acceptance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="sidebar">
          <div className="sidebar-widget">
            <h3>Difficulty Breakdown</h3>
            <div className="donut-chart-container">
              <svg viewBox="0 0 36 36" className="chart-svg" width="120" height="120">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bg-deep)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeDasharray="50, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-amber)" strokeWidth="3" strokeDasharray="35, 100" strokeDashoffset="-50" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--status-error)" strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-85" />
              </svg>
              <div className="chart-center">
                <span className="num">87</span>
                <span className="lbl">Solved</span>
              </div>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3>Activity (Last 28 Days)</h3>
            <div className="heatmap-grid">
              {heatmapData.map((val, idx) => (
                <div key={idx} className={`heat-cell heat-${val}`} title={`${val} submissions`}></div>
              ))}
            </div>
          </div>

          <div className="sidebar-widget">
            <h3>Recent Submissions</h3>
            <div className="recent-list">
              <div className="recent-item">
                <span className="recent-item-title">Two Sum</span>
                <span className="recent-item-time" style={{ color: 'var(--accent-emerald)' }}>Accepted</span>
              </div>
              <div className="recent-item">
                <span className="recent-item-title">Merge Intervals</span>
                <span className="recent-item-time" style={{ color: 'var(--status-error)' }}>Wrong Answer</span>
              </div>
              <div className="recent-item">
                <span className="recent-item-title">Valid Parentheses</span>
                <span className="recent-item-time" style={{ color: 'var(--accent-emerald)' }}>Accepted</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
