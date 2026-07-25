import React, { useState } from 'react';
import { 
  Shield, Users, BookOpen, Briefcase, Award, Bell, Search, Edit, 
  CheckCircle, XCircle, LayoutDashboard, UserCheck, Calendar, Settings, Activity, GraduationCap, Building, Plus
} from 'lucide-react';
import Modal from '@/components/Modal';
import './AdminDashboard.css';

const MOCK_STUDENTS = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', dept: 'Computer Science', year: '4th Year', cgpa: 3.8, placement: 'Placed', active: true },
  { id: 2, name: 'Sarah Williams', email: 'swilliams@example.com', dept: 'Electronics', year: '3rd Year', cgpa: 3.6, placement: 'Not Placed', active: true },
  { id: 3, name: 'Michael Chen', email: 'mchen@example.com', dept: 'Mechanical', year: '4th Year', cgpa: 3.2, placement: 'Not Placed', active: true },
  { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', dept: 'Computer Science', year: '2nd Year', cgpa: 3.9, placement: 'N/A', active: true },
  { id: 5, name: 'Ryan Miller', email: 'ryan.m@example.com', dept: 'Information Tech', year: '4th Year', cgpa: 3.7, placement: 'Placed', active: true },
  { id: 6, name: 'Sophia Wilson', email: 'sophia.w@example.com', dept: 'Computer Science', year: '3rd Year', cgpa: 3.5, placement: 'Not Placed', active: false },
  { id: 7, name: 'David Taylor', email: 'dtaylor@example.com', dept: 'Civil Engineering', year: '4th Year', cgpa: 3.4, placement: 'Placed', active: true },
  { id: 8, name: 'Olivia Anderson', email: 'olivia.a@example.com', dept: 'Electronics', year: '4th Year', cgpa: 3.8, placement: 'Placed', active: true },
  { id: 9, name: 'James Thomas', email: 'jthomas@example.com', dept: 'Mechanical', year: '3rd Year', cgpa: 3.1, placement: 'Not Placed', active: true },
  { id: 10, name: 'Isabella White', email: 'iwhite@example.com', dept: 'Information Tech', year: '4th Year', cgpa: 3.9, placement: 'Placed', active: true },
  { id: 11, name: 'William Martin', email: 'wmartin@example.com', dept: 'Computer Science', year: '4th Year', cgpa: 3.3, placement: 'Not Placed', active: false },
  { id: 12, name: 'Mia Thompson', email: 'mthompson@example.com', dept: 'Electrical', year: '3rd Year', cgpa: 3.7, placement: 'Not Placed', active: true }
];

const MOCK_FACULTY = [
  { id: 1, name: 'Dr. Alan Turing', email: 'alan@college.edu', dept: 'Computer Science', role: 'HOD', courses: 4 },
  { id: 2, name: 'Dr. Grace Hopper', email: 'grace@college.edu', dept: 'Computer Science', role: 'Professor', courses: 3 },
  { id: 3, name: 'Prof. Nikola Tesla', email: 'nikola@college.edu', dept: 'Electrical', role: 'Professor', courses: 5 },
  { id: 4, name: 'Dr. Marie Curie', email: 'marie@college.edu', dept: 'Electronics', role: 'Associate Professor', courses: 2 },
  { id: 5, name: 'Prof. Albert Einstein', email: 'albert@college.edu', dept: 'Mechanical', role: 'Professor', courses: 4 }
];

const MOCK_EVENTS = [
  { id: 1, title: 'Tech Symposium 2026', date: '2026-08-15', type: 'Technical', attendees: 350, status: 'Upcoming' },
  { id: 2, title: 'Google Cloud Study Jam', date: '2026-09-02', type: 'Workshop', attendees: 120, status: 'Upcoming' },
  { id: 3, title: 'Campus Placement Drive - Microsoft', date: '2026-09-10', type: 'Placement', attendees: 450, status: 'Upcoming' },
  { id: 4, title: 'Annual Hackathon', date: '2026-07-20', type: 'Hackathon', attendees: 200, status: 'Completed' },
  { id: 5, title: 'Alumni Meetup', date: '2026-07-05', type: 'Networking', attendees: 150, status: 'Completed' }
];

const MOCK_COMPANIES = [
  { id: 1, name: 'Microsoft', offers: 15, avgPkg: '45 LPA', status: 'Completed' },
  { id: 2, name: 'Google', offers: 8, avgPkg: '52 LPA', status: 'Completed' },
  { id: 3, name: 'Amazon', offers: 25, avgPkg: '32 LPA', status: 'Upcoming' },
  { id: 4, name: 'TCS', offers: 120, avgPkg: '7 LPA', status: 'Completed' },
  { id: 5, name: 'Infosys', offers: 85, avgPkg: '6.5 LPA', status: 'Upcoming' }
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (deptFilter === 'All' || s.dept === deptFilter)
  );

  const filteredFaculty = MOCK_FACULTY.filter(f => 
    deptFilter === 'All' || f.dept === deptFilter
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="title-wrapper">
          <Shield className="header-icon" size={32} />
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage platform content, users, and campus activities</p>
          </div>
        </div>
      </div>

      <div className="admin-content-area">
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
            <Users size={18} /> Students
          </button>
          <button className={`tab-btn ${activeTab === 'faculty' ? 'active' : ''}`} onClick={() => setActiveTab('faculty')}>
            <UserCheck size={18} /> Faculty
          </button>
          <button className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            <Calendar size={18} /> Events
          </button>
          <button className={`tab-btn ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>
            <Briefcase size={18} /> Placements
          </button>
          <button className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>
            <BookOpen size={18} /> Resources
          </button>
          <button className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} /> Notifications
          </button>
          <button className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={18} /> Settings
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <div className="icon-bg users-bg"><Users size={20} /></div>
                  <div className="stat-info">
                    <p>Total Students</p>
                    <h3>1,247</h3>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="icon-bg active-bg"><GraduationCap size={20} /></div>
                  <div className="stat-info">
                    <p>Total Faculty</p>
                    <h3>184</h3>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="icon-bg new-bg"><Calendar size={20} /></div>
                  <div className="stat-info">
                    <p>Upcoming Events</p>
                    <h3>12</h3>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="icon-bg placement-bg"><Briefcase size={20} /></div>
                  <div className="stat-info">
                    <p>Placement Rate</p>
                    <h3>92%</h3>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon success"><CheckCircle size={16} /></div>
                      <div className="activity-details">
                        <p><strong>Microsoft</strong> extended 15 offers.</p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon info"><Bell size={16} /></div>
                      <div className="activity-details">
                        <p>New announcement sent to <strong>4th Year CS</strong>.</p>
                        <span>5 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon warning"><Calendar size={16} /></div>
                      <div className="activity-details">
                        <p><strong>Tech Symposium 2026</strong> registration opened.</p>
                        <span>1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <h3>System Health</h3>
                  <div className="health-metrics">
                    <div className="health-item">
                      <span>Server Uptime</span>
                      <span className="text-success">99.9%</span>
                    </div>
                    <div className="health-item">
                      <span>Database Load</span>
                      <span className="text-warning">45%</span>
                    </div>
                    <div className="health-item">
                      <span>Active Sessions</span>
                      <span>342</span>
                    </div>
                    <div className="health-item">
                      <span>Storage Used</span>
                      <span>68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="students-tab">
              <div className="tab-toolbar">
                <div className="search-box">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="filter-select"
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Tech">Information Tech</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>
              
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Year</th>
                      <th>CGPA</th>
                      <th>Placement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.dept}</td>
                        <td>{student.year}</td>
                        <td>{student.cgpa}</td>
                        <td>
                          <span className={`status-badge ${student.placement === 'Placed' ? 'active' : student.placement === 'N/A' ? 'neutral' : 'inactive'}`}>
                            {student.placement}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn edit" title="Edit"><Edit size={16} /></button>
                            <button className="action-btn delete" title="Deactivate">
                              {student.active ? <XCircle size={16} /> : <CheckCircle size={16} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'faculty' && (
            <div className="faculty-tab">
              <div className="tab-toolbar">
                <select 
                  className="filter-select"
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Courses</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFaculty.map(faculty => (
                      <tr key={faculty.id}>
                        <td>{faculty.name}</td>
                        <td>{faculty.email}</td>
                        <td>{faculty.dept}</td>
                        <td>{faculty.role}</td>
                        <td>{faculty.courses}</td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn edit" title="Edit"><Edit size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="events-tab">
              <div className="tab-toolbar flex-end">
                <button className="primary-btn" onClick={() => setIsEventModalOpen(true)}>
                  <Plus size={18} /> Add Event
                </button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Attendees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_EVENTS.map(event => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.type}</td>
                        <td>{event.attendees}</td>
                        <td>
                          <span className={`status-badge ${event.status === 'Completed' ? 'neutral' : 'active'}`}>
                            {event.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="action-btn edit" title="Edit"><Edit size={16} /></button>
                            <button className="action-btn delete" title="Cancel"><XCircle size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="Add New Event" size="md">
                <form className="admin-form" onSubmit={(e) => { e.preventDefault(); setIsEventModalOpen(false); }}>
                  <div className="form-group">
                    <label>Event Title</label>
                    <input type="text" placeholder="e.g. Annual Hackathon" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" required />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select required>
                        <option value="">Select Type</option>
                        <option>Technical</option>
                        <option>Workshop</option>
                        <option>Hackathon</option>
                        <option>Networking</option>
                        <option>Placement</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows={4} placeholder="Event description..." required></textarea>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="secondary-btn" onClick={() => setIsEventModalOpen(false)}>Cancel</button>
                    <button type="submit" className="submit-btn">Save Event</button>
                  </div>
                </form>
              </Modal>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="placements-tab">
              <div className="dashboard-grid mb-4">
                <div className="dashboard-card text-center">
                  <h3>Total Offers</h3>
                  <h2 className="text-4xl font-bold text-accent mt-2">253</h2>
                </div>
                <div className="dashboard-card text-center">
                  <h3>Average Package</h3>
                  <h2 className="text-4xl font-bold text-success mt-2">8.5 LPA</h2>
                </div>
                <div className="dashboard-card text-center">
                  <h3>Highest Package</h3>
                  <h2 className="text-4xl font-bold text-warning mt-2">52 LPA</h2>
                </div>
              </div>
              <h3 className="section-title">Participating Companies</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Offers Made</th>
                      <th>Avg Package</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_COMPANIES.map(comp => (
                      <tr key={comp.id}>
                        <td><strong>{comp.name}</strong></td>
                        <td>{comp.offers}</td>
                        <td>{comp.avgPkg}</td>
                        <td>
                          <span className={`status-badge ${comp.status === 'Completed' ? 'neutral' : 'active'}`}>
                            {comp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-tab">
              <div className="placeholder-tab">
                <BookOpen size={48} className="placeholder-icon" />
                <h2>Resource Management</h2>
                <p>Upload and manage study materials, question banks, and guides.</p>
                <button className="primary-btn mt-4"><Plus size={18} /> Upload Material</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="announcements-tab">
              <div className="form-container">
                <h3>Send Notification</h3>
                <form className="admin-form">
                  <div className="form-group">
                    <label>Target Audience</label>
                    <select>
                      <option>All Students</option>
                      <option>All Faculty</option>
                      <option>4th Year Only</option>
                      <option>Computer Science Dept</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Notification Title" />
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
                  <button type="button" className="submit-btn">Send Notification</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="placeholder-tab">
                <Settings size={48} className="placeholder-icon" />
                <h2>Platform Settings</h2>
                <p>Configure general platform settings, branding, and integrations.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
