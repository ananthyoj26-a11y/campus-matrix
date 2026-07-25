import React, { useState } from 'react';
import { 
  Search, MapPin, DollarSign, Briefcase, 
  Bookmark, CheckCircle, ChevronDown, Building, Target
} from 'lucide-react';
import './Careers.css';

interface Job {
  id: string;
  company: string;
  desc: string;
  role: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  posted: string;
  deadline: string;
  logoColor: string;
}

const JOBS_DATA: Job[] = [
  { id: '1', company: 'Google', desc: 'Organize the world\'s information.', role: 'Software Engineering Intern', department: 'Engineering', location: 'Remote', type: 'Internship', salary: '$8,000/mo', tags: ['React', 'Python', 'GCP'], posted: '2 days ago', deadline: '2026-09-01', logoColor: '#ea4335' },
  { id: '2', company: 'Microsoft', desc: 'Empower every person and every organization.', role: 'Frontend Developer', department: 'Engineering', location: 'Hybrid', type: 'Full-time', salary: '$120K-150K', tags: ['TypeScript', 'React', 'Azure'], posted: '1 day ago', deadline: '2026-08-15', logoColor: '#00a4ef' },
  { id: '3', company: 'Amazon', desc: 'Earth\'s most customer-centric company.', role: 'SDE Intern', department: 'Engineering', location: 'On-site', type: 'Internship', salary: '$9,500/mo', tags: ['Java', 'AWS', 'C++'], posted: '3 days ago', deadline: '2026-08-30', logoColor: '#ff9900' },
  { id: '4', company: 'Meta', desc: 'Give people the power to build community.', role: 'ML Engineer Intern', department: 'Data Science', location: 'Remote', type: 'Internship', salary: '$10,000/mo', tags: ['Python', 'PyTorch', 'C++'], posted: '4 days ago', deadline: '2026-09-10', logoColor: '#1877f2' },
  { id: '5', company: 'Apple', desc: 'Think different.', role: 'iOS Developer', department: 'Engineering', location: 'On-site', type: 'Full-time', salary: '$130K-160K', tags: ['Swift', 'Objective-C', 'iOS'], posted: '1 week ago', deadline: '2026-08-20', logoColor: '#555555' },
  { id: '6', company: 'Netflix', desc: 'Entertainment for the world.', role: 'Backend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '$150K-180K', tags: ['Java', 'Spring', 'Microservices'], posted: '2 weeks ago', deadline: '2026-08-01', logoColor: '#e50914' },
  { id: '7', company: 'Stripe', desc: 'Financial infrastructure for the internet.', role: 'Full Stack Developer', department: 'Engineering', location: 'Hybrid', type: 'PPO', salary: '$140K-170K', tags: ['Ruby', 'React', 'TypeScript'], posted: '2 days ago', deadline: '2026-08-25', logoColor: '#008cdd' },
  { id: '8', company: 'Spotify', desc: 'Unlock the potential of human creativity.', role: 'Data Scientist', department: 'Data Science', location: 'Remote', type: 'Full-time', salary: '$125K-155K', tags: ['Python', 'SQL', 'Machine Learning'], posted: '5 days ago', deadline: '2026-09-05', logoColor: '#1ed760' },
  { id: '9', company: 'Adobe', desc: 'Creativity for all.', role: 'UI/UX Design Intern', department: 'Design', location: 'Hybrid', type: 'Internship', salary: '$7,500/mo', tags: ['Figma', 'Prototyping', 'User Research'], posted: '3 days ago', deadline: '2026-08-15', logoColor: '#ff0000' }
];

export default function Careers() {
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');
  const [showSalary, setShowSalary] = useState(true);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set(['1', '4']));

  const toggleSave = (id: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedJobs(newSaved);
  };

  const filteredJobs = JOBS_DATA.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    const matchesDept = deptFilter === 'All' || job.department === deptFilter;
    const matchesLoc = locFilter === 'All' || job.location === locFilter;
    const matchesTab = activeTab === 'all' || savedJobs.has(job.id);
    
    return matchesSearch && matchesType && matchesDept && matchesLoc && matchesTab;
  });

  return (
    <div className="careers-container">
      <div className="careers-content">
        
        <div className="careers-header">
          <h1 className="gradient-title">Campus Careers</h1>
          <p className="subtitle">Find your next internship, PPO, or full-time role</p>
          <div className="stats-row" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>150+</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Companies Visiting</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>320</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Offers Made</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>$125K</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg. Package</div>
            </div>
          </div>
        </div>
        
        <div className="upcoming-drives" style={{ marginBottom: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-hover)' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18}/> Upcoming Placement Drives</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {['Google', 'Microsoft', 'Amazon'].map(company => (
              <div key={company} style={{ minWidth: '200px', background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{company}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Aug 25 - Sept 5 • On-Campus</div>
              </div>
            ))}
          </div>
        </div>

        <div className="filters-bar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by company, role, or skill..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', width: '100%' }}>
            <div className="filter-group" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                {['All Types', 'Internship', 'Full-time', 'PPO'].map(t => <option key={t} value={t === 'All Types' ? 'All' : t}>{t}</option>)}
              </select>
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                {['All Depts', 'Engineering', 'Data Science', 'Design'].map(t => <option key={t} value={t === 'All Depts' ? 'All' : t}>{t}</option>)}
              </select>
              <select value={locFilter} onChange={e => setLocFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                {['All Locations', 'Remote', 'On-site', 'Hybrid'].map(t => <option key={t} value={t === 'All Locations' ? 'All' : t}>{t}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="salary-toggle">
                <input 
                  type="checkbox" 
                  checked={showSalary} 
                  onChange={(e) => setShowSalary(e.target.checked)}
                />
                Show salary ranges
              </label>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            className={`filter-pill ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Jobs
          </button>
          <button 
            className={`filter-pill ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved ({savedJobs.size})
          </button>
        </div>

        <div className="jobs-grid">
          {filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <button 
                className={`bookmark-btn ${savedJobs.has(job.id) ? 'saved' : ''}`}
                onClick={() => toggleSave(job.id)}
              >
                <Bookmark size={20} fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} />
              </button>
              
              <div className="job-header">
                <div className="company-logo" style={{ background: job.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', width: '48px', height: '48px', borderRadius: 'var(--radius-md)' }}>
                  {job.company.substring(0, 2).toUpperCase()}
                </div>
                <div className="job-info">
                  <h3>{job.role}</h3>
                  <div className="company-name">
                    {job.company} <CheckCircle size={14} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{job.desc}</div>
                </div>
              </div>

              <div className="job-details">
                <div className="detail-item">
                  <MapPin size={16} /> {job.location}
                </div>
                <div className="detail-item">
                  <Briefcase size={16} /> {job.type}
                </div>
                {showSalary && (
                  <div className="detail-item">
                    <DollarSign size={16} /> {job.salary}
                  </div>
                )}
              </div>

              <div className="job-tags" style={{ marginBottom: '1rem' }}>
                {job.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="job-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="post-date" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Posted {job.posted}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}><Target size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> Deadline: {job.deadline}</span>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
              No jobs found matching your criteria.
            </div>
          )}
        </div>

        <div className="tracker-section">
          <div className="tracker-header">
            <h2>Application Tracker</h2>
            <ChevronDown size={24} color="var(--text-tertiary)" cursor="pointer"/>
          </div>
          
          <div className="kanban-board">
            <div className="kanban-column">
              <div className="kanban-col-header">
                <span>Applied</span>
                <span className="kanban-count">3</span>
              </div>
              <div className="mini-card">
                <h4>Software Intern</h4>
                <p>Tesla • 2 days ago</p>
              </div>
              <div className="mini-card">
                <h4>Frontend Dev</h4>
                <p>Vercel • 1 week ago</p>
              </div>
              <div className="mini-card">
                <h4>UI Engineer</h4>
                <p>Figma • 1 week ago</p>
              </div>
            </div>

            <div className="kanban-column">
              <div className="kanban-col-header">
                <span>Shortlisted</span>
                <span className="kanban-count">1</span>
              </div>
              <div className="mini-card">
                <h4>ML Intern</h4>
                <p>OpenAI • OA Cleared</p>
              </div>
            </div>

            <div className="kanban-column">
              <div className="kanban-col-header">
                <span>Interview</span>
                <span className="kanban-count">2</span>
              </div>
              <div className="mini-card">
                <h4>Full Stack Intern</h4>
                <p>Airbnb • Round 1</p>
              </div>
              <div className="mini-card">
                <h4>Backend Intern</h4>
                <p>Uber • Technical</p>
              </div>
            </div>

            <div className="kanban-column">
              <div className="kanban-col-header">
                <span>Offered</span>
                <span className="kanban-count">1</span>
              </div>
              <div className="mini-card" style={{ borderColor: 'var(--success)', background: 'rgba(16, 185, 129, 0.05)' }}>
                <h4>SDE Intern</h4>
                <p>Amazon • Deadline: Fri</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
