import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Flame, CheckCircle, Clock, Calendar, BookOpen, Trophy } from 'lucide-react';
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
  { id: '2', num: 2, title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List, Math', acceptance: '40.0%', status: 'unsolved' },
  { id: '3', num: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Hash Table, String', acceptance: '33.8%', status: 'solved' },
  { id: '4', num: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Array, Binary Search', acceptance: '35.6%', status: 'unsolved' },
  { id: '5', num: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'String, DP', acceptance: '32.4%', status: 'attempted' },
  { id: '15', num: 15, title: '3Sum', difficulty: 'Medium', category: 'Array, Two Pointers', acceptance: '32.1%', status: 'unsolved' },
  { id: '20', num: 20, title: 'Valid Parentheses', difficulty: 'Easy', category: 'String, Stack', acceptance: '40.2%', status: 'solved' },
  { id: '21', num: 21, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', acceptance: '61.0%', status: 'solved' },
  { id: '33', num: 33, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'Array, Binary Search', acceptance: '38.7%', status: 'unsolved' },
  { id: '42', num: 42, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Array, Two Pointers', acceptance: '58.5%', status: 'unsolved' },
  { id: '53', num: 53, title: 'Maximum Subarray', difficulty: 'Medium', category: 'Array, DP', acceptance: '49.8%', status: 'solved' },
  { id: '56', num: 56, title: 'Merge Intervals', difficulty: 'Medium', category: 'Array, Sorting', acceptance: '46.0%', status: 'attempted' },
  { id: '70', num: 70, title: 'Climbing Stairs', difficulty: 'Easy', category: 'Math, DP', acceptance: '51.4%', status: 'solved' },
  { id: '94', num: 94, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', category: 'Tree, DFS', acceptance: '72.9%', status: 'solved' },
  { id: '102', num: 102, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Tree, BFS', acceptance: '62.4%', status: 'unsolved' },
  { id: '121', num: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Array, DP', acceptance: '54.4%', status: 'solved' },
  { id: '146', num: 146, title: 'LRU Cache', difficulty: 'Medium', category: 'Hash Table, Linked List', acceptance: '40.6%', status: 'unsolved' },
  { id: '200', num: 200, title: 'Number of Islands', difficulty: 'Medium', category: 'Array, DFS, BFS', acceptance: '56.8%', status: 'unsolved' },
  { id: '206', num: 206, title: 'Reverse Linked List', difficulty: 'Easy', category: 'Linked List', acceptance: '72.3%', status: 'solved' },
  { id: '236', num: 236, title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', category: 'Tree, DFS', acceptance: '57.8%', status: 'unsolved' },
  { id: '300', num: 300, title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'Array, Binary Search, DP', acceptance: '51.8%', status: 'unsolved' },
  { id: '704', num: 704, title: 'Binary Search', difficulty: 'Easy', category: 'Array, Binary Search', acceptance: '55.4%', status: 'solved' }
];

export default function CodingHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [diffFilter, setDiffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  
  // Stable heatmap data (28 days) using useMemo to prevent re-render regeneration
  const heatmapData = useMemo(() => Array.from({ length: 28 }, () => Math.floor(Math.random() * 5)), []);

  const filteredProblems = PROBLEMS.filter(p => {
    if (diffFilter !== 'all' && p.difficulty.toLowerCase() !== diffFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (catFilter !== 'all' && !p.category.toLowerCase().includes(catFilter)) return false;
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

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
          <p>Solve today's problem to earn <span className="xp-reward">+50 XP</span> and maintain your 5-day streak!</p>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <strong>Problem: </strong> 
            <Link to="/coding-hub/200" style={{ color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 600 }}>Number of Islands</Link>
            <span className="diff-badge diff-medium">Medium</span>
          </div>
        </div>
        <div className="daily-timer">
          <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
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
            <select className="filter-select" value={diffFilter} onChange={e => setDiffFilter(e.target.value)}>
              <option value="all">Difficulty: All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">Status: All</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="all">Category: All</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="linked list">Linked List</option>
              <option value="tree">Tree</option>
              <option value="dp">Dynamic Programming</option>
              <option value="math">Math</option>
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
                {filteredProblems.map(prob => (
                  <tr key={prob.id}>
                    <td className="status-cell">
                      {prob.status === 'solved' && <CheckCircle size={18} />}
                      {prob.status === 'attempted' && <Clock size={18} color="var(--accent-amber)" />}
                      {prob.status === 'unsolved' && <span className="dash-icon">-</span>}
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
          <div className="sidebar-widget user-stats-widget">
            <h3>Your Stats</h3>
            <div className="stats-row">
              <div className="stat-box">
                <Flame size={24} color="var(--accent-amber)" />
                <span className="stat-num">5 Day</span>
                <span className="stat-desc">Streak</span>
              </div>
              <div className="stat-box">
                <Trophy size={24} color="var(--primary-light)" />
                <span className="stat-num">#42</span>
                <span className="stat-desc">Global Rank</span>
              </div>
            </div>
            <div className="donut-chart-container" style={{ marginTop: '1.5rem' }}>
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
            <h3><BookOpen size={18} style={{ display: 'inline', marginRight: '8px' }} /> Topic Roadmap</h3>
            <div className="roadmap-list">
              <div className="roadmap-item">
                <div className="roadmap-header">
                  <span>Arrays & Hashing</span>
                  <span>12 / 15</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '80%' }}></div></div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-header">
                  <span>Two Pointers</span>
                  <span>5 / 10</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '50%' }}></div></div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-header">
                  <span>Linked List</span>
                  <span>7 / 12</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '58%' }}></div></div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-header">
                  <span>Dynamic Programming</span>
                  <span>4 / 20</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '20%' }}></div></div>
              </div>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3><Calendar size={18} style={{ display: 'inline', marginRight: '8px' }} /> Upcoming Contests</h3>
            <div className="contest-list">
              <div className="contest-item">
                <div className="contest-date">Oct 15, 8:00 PM</div>
                <div className="contest-title">Weekly Challenge 365</div>
              </div>
              <div className="contest-item">
                <div className="contest-date">Oct 28, 9:30 AM</div>
                <div className="contest-title">Biweekly Challenge 112</div>
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

        </aside>
      </div>
    </div>
  );
}
