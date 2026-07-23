import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Star, TrendingUp, Clock } from 'lucide-react';
import { collegeList } from '@/lib/data/saranathanCollege';
import './Colleges.css';

const FILTERS = ['All', 'Engineering', 'Medical', 'Arts & Science', 'Management'];
const LOCATIONS = ['All Locations', 'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi'];

const CollegeListPage = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = collegeList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="colleges-page">
      {/* Header */}
      <div className="colleges-header">
        <h1 className="colleges-title">🏛️ Explore Colleges</h1>
        <p className="colleges-subtitle">
          Discover detailed profiles for top colleges across India — faculty, placements, events, and more.
        </p>

        <div className="colleges-search-bar">
          <Search className="colleges-search-icon" size={18} />
          <input
            type="text"
            placeholder='Search colleges (e.g. "Saranathan Engineering")'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-pills">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
          {LOCATIONS.map(l => (
            <button
              key={l}
              className={`filter-pill ${activeFilter === l ? 'active' : ''}`}
              onClick={() => setActiveFilter(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Colleges */}
      <div className="section-header">
        <span className="section-title">
          <TrendingUp size={18} color="var(--accent-primary)" />
          Trending Colleges
        </span>
        <Link to="#" className="view-all-link">View all <ChevronRight size={14} /></Link>
      </div>

      {/* College Cards Grid */}
      <div className="colleges-grid">
        {filtered.map(college => (
          <div key={college.id} className="college-card">
            <div className="college-card-image">
              <img src={college.coverImage} alt={college.name} />
              {college.naacGrade && (
                <span className="naac-badge">NAAC {college.naacGrade}</span>
              )}
            </div>

            <div className="college-card-body">
              <h3 className="college-card-name">{college.name}</h3>
              <p className="college-card-location">
                <MapPin size={13} />
                {college.location}
              </p>

              <div className="college-card-stats">
                <div className="college-stat">
                  <div className="college-stat-value">{college.placementRate}%</div>
                  <div className="college-stat-label">Placement</div>
                </div>
                <div className="college-stat">
                  <div className="college-stat-value">{college.established}</div>
                  <div className="college-stat-label">Est.</div>
                </div>
                <div className="college-stat">
                  <div className="college-stat-value">
                    <Star size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    {college.naacGrade}
                  </div>
                  <div className="college-stat-label">NAAC</div>
                </div>
              </div>

              <div className="college-recruiters">
                {college.topRecruiters.map(r => (
                  <span key={r} className="recruiter-tag">{r}</span>
                ))}
              </div>

              <Link to={`/colleges/${college.id}`}>
                <button className="college-card-btn">View Profile →</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '2rem' }}>🔍</p>
          <p>No colleges found matching "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default CollegeListPage;
