import React, { useState } from 'react';
import { Shield, Users, BookOpen, Briefcase, Award, Bell, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import './AdminDashboard.css';

const MOCK_USERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  college: i % 2 === 0 ? 'Stanford University' : 'MIT',
  level: Math.floor(Math.random() * 20) + 1,
  xp: Math.floor(Math.random() * 5000),
  active: i % 4 !== 0
}));

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="title-wrapper">
          <Shield className="header-icon" size={32} />
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage platform content and users</p>
          </div>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="icon-bg users-bg"><Users size={20} /></div>
          <div className="stat-info">
            <p>Total Students</p>
            <h3>1,247</h3>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="icon-bg active-bg"><CheckCircle size={20} /></div>
          <div className="stat-info">
            <p>Active Today</p>
            <h3>342</h3>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="icon-bg new-bg"><Award size={20} /></div>
          <div className="stat-info">
            <p>New This Week</p>
            <h3>28</h3>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="icon-bg placement-bg"><Briefcase size={20} /></div>
          <div className="stat-info">
            <p>Placement Rate</p>
            <h3>95%</h3>
          </div>
        </div>
      </div>

      <div className="admin-content-area">
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Users size={18} /> Users
          </button>
          <button className={`tab-btn ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => setActiveTab('problems')}>
            <BookOpen size={18} /> Problems
          </button>
          <button className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            <Briefcase size={18} /> Jobs
          </button>
          <button className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>
            <Bell size={18} /> Announcements
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'users' && (
            <div className="users-tab">
              <div className="tab-toolbar">
                <div className="search-box">
                  <Search size={18} className="search-icon" />
                  <input type="text" placeholder="Search users by name or email..." />
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>College</th>
                      <th>Level</th>
                      <th>XP</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.college}</td>
                        <td>{user.level}</td>
                        <td>{user.xp}</td>
                        <td>
                          <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                            {user.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn edit" title="Edit"><Edit size={16} /></button>
                            <button className="action-btn delete" title="Deactivate">
                              {user.active ? <XCircle size={16} /> : <CheckCircle size={16} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button disabled>Previous</button>
                <span className="page-info">Page 1 of 12</span>
                <button>Next</button>
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="problems-tab">
              <div className="form-container">
                <h3>Add New Problem</h3>
                <form className="admin-form">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="e.g. Two Sum" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Difficulty</label>
                      <select>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select>
                        <option>Arrays</option>
                        <option>Strings</option>
                        <option>Dynamic Programming</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows={4} placeholder="Problem description in markdown..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Test Cases (JSON)</label>
                    <textarea rows={4} placeholder="[{ 'input': '...', 'output': '...' }]"></textarea>
                  </div>
                  <button type="button" className="submit-btn">Add Problem</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="announcements-tab">
              <div className="form-container">
                <h3>Send Announcement</h3>
                <form className="admin-form">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Announcement Title" />
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select>
                      <option>Normal</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={6} placeholder="Type your message here..."></textarea>
                  </div>
                  <button type="button" className="submit-btn">Send Announcement</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="placeholder-tab">
              <Briefcase size={48} className="placeholder-icon" />
              <h2>Job Management</h2>
              <p>Job listing management interface goes here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
