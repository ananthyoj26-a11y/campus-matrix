import React, { useState } from 'react';
import { 
  Search, MapPin, DollarSign, Briefcase, 
  Bookmark, CheckCircle, ChevronDown 
} from 'lucide-react';
import './Careers.css';

interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  posted: string;
  logoColor: string;
}

const JOBS_DATA: Job[] = [
  { id: '1', company: 'Google', role: 'Software Engineering Intern', location: 'Remote', type: 'Internship', salary: '$8,000/mo', tags: ['React', 'Python', 'GCP'], posted: '2 days ago', logoColor: '#ea4335' },
  { id: '2', company: 'Microsoft', role: 'Frontend Developer', location: 'Hybrid', type: 'Full-time', salary: '$120K-150K', tags: ['TypeScript', 'React', 'Azure'], posted: '1 day ago', logoColor: '#00a4ef' },
  { id: '3', company: 'Amazon', role: 'SDE Intern', location: 'On-site', type: 'Internship', salary: '$9,500/mo', tags: ['Java', 'AWS', 'C++'], posted: '3 days ago', logoColor: '#ff9900' },
  { id: '4', company: 'Meta', role: 'ML Engineer Intern', location: 'Remote', type: 'Internship', salary: '$10,000/mo', tags: ['Python', 'PyTorch', 'C++'], posted: '4 days ago', logoColor: '#1877f2' },
  { id: '5', company: 'Apple', role: 'iOS Developer', location: 'On-site', type: 'Full-time', salary: '$130K-160K', tags: ['Swift', 'Objective-C', 'iOS'], posted: '1 week ago', logoColor: '#555555' },
  { id: '6', company: 'Netflix', role: 'Backend Engineer', location: 'Remote', type: 'Full-time', salary: '$150K-180K', tags: ['Java', 'Spring', 'Microservices'], posted: '2 weeks ago', logoColor: '#e50914' },
  { id: '7', company: 'Stripe', role: 'Full Stack Developer', location: 'Hybrid', type: 'Full-time', salary: '$140K-170K', tags: ['Ruby', 'React', 'TypeScript'], posted: '2 days ago', logoColor: '#008cdd' },
  { id: '8', company: 'Spotify', role: 'Data Scientist', location: 'Remote', type: 'Full-time', salary: '$125K-155K', tags: ['Python', 'SQL', 'Machine Learning'], posted: '5 days ago', logoColor: '#1ed760' },
];

export default function Careers() {
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
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
                          job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    const matchesTab = activeTab === 'all' || savedJobs.has(job.id);
    
    return matchesSearch && matchesType && matchesTab;
  });

  return (
    <div className="careers-container">
      <div className="careers-content">
        
        <div className="careers-header">
          <h1 className="gradient-title">Campus Careers</h1>
          <p className="subtitle">Find your next internship, co-op, or full-time role</p>
          <div className="stats-row">
            <span>150+ Active Openings</span>
            <span>45 Companies</span>
            <span>12 New This Week</span>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by company or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              {['All', 'Internship', 'Co-op', 'Full-time', 'Part-time'].map(type => (
                <button 
                  key={type}
                  className={`filter-pill ${typeFilter === type ? 'active' : ''}`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </button>
              ))}
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

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
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
                <div className="company-logo" style={{ background: job.logoColor }}>
                  {job.company.charAt(0)}
                </div>
                <div className="job-info">
                  <h3>{job.role}</h3>
                  <div className="company-name">
                    {job.company} <CheckCircle size={14} color="#10b981" />
                  </div>
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

              <div className="job-tags">
                {job.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="job-footer">
                <span className="post-date">{job.posted}</span>
                <button className="apply-btn">Apply Now</button>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              No jobs found matching your criteria.
            </div>
          )}
        </div>

        <div className="tracker-section">
          <div className="tracker-header">
            <h2>Application Tracker</h2>
            <ChevronDown size={24} color="#94a3b8" cursor="pointer"/>
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
                <span>Offer</span>
                <span className="kanban-count">1</span>
              </div>
              <div className="mini-card" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.05)' }}>
                <h4>SDE Intern</h4>
                <p>Amazon • Deadline: Fri</p>
              </div>
            </div>

            <div className="kanban-column">
              <div className="kanban-col-header">
                <span>Rejected</span>
                <span className="kanban-count">1</span>
              </div>
              <div className="mini-card" style={{ opacity: 0.7 }}>
                <h4>Data Intern</h4>
                <p>Palantir • Closed</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
