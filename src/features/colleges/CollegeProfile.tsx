import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Globe, MapPin, Phone, Mail, BookOpen, Users, Calendar,
  Search, ChevronLeft, Bookmark, ExternalLink, Award, Star
} from 'lucide-react';
import { saranathanCollege } from '@/lib/data/saranathanCollege';
import './Colleges.css';

const TABS = [
  'Overview', 'Faculty', 'Placements', 'Departments',
  'Facilities', 'Clubs', 'Events', 'Announcements', 'Admissions'
];

const CollegeProfile = () => {
  const { id } = useParams();
  const college = saranathanCollege; // In production, fetch by ID
  const [activeTab, setActiveTab] = useState('Overview');
  const [facultySearch, setFacultySearch] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [bookmarked, setBookmarked] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const depts = ['All', ...Array.from(new Set(college.faculty.map(f => f.department)))];

  const filteredFaculty = college.faculty.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
      f.researchInterests.some(r => r.toLowerCase().includes(facultySearch.toLowerCase()));
    const matchDept = activeDept === 'All' || f.department === activeDept;
    return matchSearch && matchDept;
  });

  const handleEventRegister = (eventId: string) => {
    setRegisteredEvents(prev =>
      prev.includes(eventId) ? prev : [...prev, eventId]
    );
  };

  const getEventMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  };

  const getEventDay = (dateStr: string) => {
    return new Date(dateStr).getDate();
  };

  return (
    <div className="college-profile">
      {/* Back Navigation */}
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/colleges" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <ChevronLeft size={16} /> Back to Colleges
        </Link>
      </div>

      {/* Hero Section */}
      <div className="college-hero">
        <img src={college.coverImage} alt={college.name} />
        <div className="college-hero-overlay" />
        <div className="college-hero-content">
          <div className="college-hero-info">
            <h1>{college.name}</h1>
            <div className="college-hero-badges">
              <span className="hero-badge naac">
                <Award size={12} /> NAAC {college.naacGrade}
              </span>
              <span className="hero-badge nba">
                <Star size={12} /> NBA Accredited
              </span>
              <span className="hero-badge est">
                📅 Est. {college.established}
              </span>
              <span className="hero-badge est">
                <MapPin size={12} /> {college.location}
              </span>
            </div>
          </div>
          <div className="college-hero-actions">
            <a href={college.website} target="_blank" rel="noopener noreferrer" className="hero-action-btn primary">
              <Globe size={14} /> Official Website
            </a>
            <button
              className="hero-action-btn ghost"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark size={14} fill={bookmarked ? 'white' : 'none'} />
              {bookmarked ? 'Saved' : 'Bookmark'}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-panel">

        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="overview-grid">
            <div>
              <div className="overview-card" style={{ marginBottom: '1rem' }}>
                <h3>About {college.shortName}</h3>
                <p className="overview-text">{college.overview}</p>
              </div>
              <div className="overview-card" style={{ marginBottom: '1rem' }}>
                <h3>Vision</h3>
                <p className="overview-text">{college.vision}</p>
              </div>
              <div className="overview-card">
                <h3>Mission</h3>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                  {college.mission.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>

            <div>
              <div className="overview-card" style={{ marginBottom: '1rem' }}>
                <h3>Quick Facts</h3>
                <div className="quick-facts">
                  {[
                    ['Established', college.established],
                    ['Founder', college.founder],
                    ['Affiliation', college.affiliation],
                    ['Approved By', college.approvedBy.join(', ')],
                    ['NAAC Grade', college.naacGrade],
                    ['Type', college.type],
                    ['Total Seats', college.admissions.totalSeats],
                    ['Placement Rate', `${college.placements.placementRate}%`],
                    ['Highest Package', college.placements.highestPackage],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="fact-row">
                      <span className="fact-label">{label}</span>
                      <span className="fact-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-card">
                <h3>Accreditations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {college.accreditations.map(a => (
                    <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.name}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--accent-success)' }}>{a.grade || `${(a as any).departments?.join(', ')}`} — {a.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FACULTY TAB */}
        {activeTab === 'Faculty' && (
          <div>
            <div className="faculty-search-bar">
              <Search className="faculty-search-icon" size={16} />
              <input
                type="text"
                placeholder="Search by name or research interest..."
                value={facultySearch}
                onChange={e => setFacultySearch(e.target.value)}
              />
            </div>

            <div className="dept-filters">
              {depts.map(d => (
                <button
                  key={d}
                  className={`dept-filter-btn ${activeDept === d ? 'active' : ''}`}
                  onClick={() => setActiveDept(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="faculty-grid">
              {filteredFaculty.map(faculty => (
                <div key={faculty.id} className="faculty-card">
                  <div className="faculty-card-header">
                    <img src={faculty.avatar} alt={faculty.name} className="faculty-avatar" />
                    <div className="faculty-info">
                      <h4>{faculty.name}</h4>
                      <p className="faculty-designation">{faculty.designation}</p>
                      <span className="faculty-dept-badge">{faculty.department}</span>
                    </div>
                  </div>

                  <p className="faculty-qual">{faculty.qualification} · {faculty.experience} exp · {faculty.publications} Publications</p>

                  <div className="faculty-research">
                    {faculty.researchInterests.map(r => (
                      <span key={r} className="research-tag">{r}</span>
                    ))}
                  </div>

                  <div className="faculty-contact">
                    <div>📧 {faculty.email}</div>
                    <div>📍 {faculty.office}</div>
                  </div>

                  <div className="faculty-actions">
                    <button className="faculty-btn primary">
                      <BookOpen size={12} style={{ marginRight: 4 }} />
                      Study Materials
                    </button>
                    <button className="faculty-btn ghost">
                      <Mail size={12} style={{ marginRight: 4 }} />
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No faculty found matching your search.
              </div>
            )}
          </div>
        )}

        {/* PLACEMENTS TAB */}
        {activeTab === 'Placements' && (
          <div>
            <div className="placement-stats-row">
              {[
                { label: 'Placement Rate', value: `${college.placements.placementRate}%` },
                { label: 'Highest Package', value: college.placements.highestPackage },
                { label: 'Average Package', value: college.placements.averagePackage },
                { label: 'Companies Visited', value: college.placements.companiesVisited },
              ].map(s => (
                <div key={s.label} className="placement-stat-card">
                  <div className="placement-stat-value">{s.value}</div>
                  <div className="placement-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Top Recruiting Companies</h3>
            <div className="recruiters-grid">
              {college.placements.topRecruiters.map(r => (
                <div key={r.name} className="recruiter-card">
                  <div className="recruiter-logo">{r.logo}</div>
                  <div className="recruiter-name">{r.name}</div>
                  <div className="recruiter-package">{r.package}</div>
                </div>
              ))}
            </div>

            <h3 style={{ margin: '1.5rem 0 1rem', color: 'var(--text-primary)' }}>Year-Wise Placement Statistics</h3>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)' }}>
                    {['Year', 'Students Placed', 'Companies', 'Highest Package', 'Average Package'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {college.placements.yearlyStats.map((row, i) => (
                    <tr key={row.year} style={{ borderTop: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-tertiary)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{row.year}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>{row.students}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>{row.companies}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--accent-success)', fontWeight: 600 }}>{row.highest}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>{row.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DEPARTMENTS TAB */}
        {activeTab === 'Departments' && (
          <div className="facilities-grid">
            {college.departments.map(dept => (
              <div key={dept.id} className="facility-card">
                <div className="facility-icon">🎓</div>
                <div className="facility-name">{dept.name} ({dept.code})</div>
                <p className="facility-desc" style={{ marginBottom: '0.5rem' }}>{dept.description}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <strong>Intake:</strong> {dept.intake} · <strong>Duration:</strong> {dept.duration}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <strong>HOD:</strong> {dept.hod}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {dept.labs.map(lab => (
                    <span key={lab} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', background: 'var(--bg-tertiary)', borderRadius: '999px', color: 'var(--text-muted)' }}>
                      {lab}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FACILITIES TAB */}
        {activeTab === 'Facilities' && (
          <div className="facilities-grid">
            {college.facilities.map(f => (
              <div key={f.name} className="facility-card">
                <div className="facility-icon">{f.icon}</div>
                <div className="facility-name">{f.name}</div>
                <p className="facility-desc">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* CLUBS TAB */}
        {activeTab === 'Clubs' && (
          <div className="facilities-grid">
            {college.clubs.map(c => (
              <div key={c.name} className="facility-card">
                <div className="facility-icon">{c.icon}</div>
                <div className="facility-name">{c.name}</div>
                <p className="facility-desc" style={{ marginBottom: '0.5rem' }}>{c.focus}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  <Users size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {c.members} members
                </p>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'Events' && (
          <div className="events-list">
            {college.events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-date-box">
                  <span className="event-month">{getEventMonth(event.date)}</span>
                  <span className="event-day">{getEventDay(event.date)}</span>
                </div>
                <div className="event-body">
                  <span className={`event-type-badge ${event.type.toLowerCase().replace(' ', '')}`}>
                    {event.type}
                  </span>
                  <div className="event-title">{event.title}</div>
                  <div className="event-subtitle">{event.subtitle}</div>
                  <div className="event-meta">
                    <span className="event-meta-item"><MapPin size={12} />{event.venue.split(',')[0]}</span>
                    <span className="event-meta-item">💰 {event.prizes}</span>
                    <span className="event-meta-item">📅 Register by {event.registrationDeadline}</span>
                  </div>
                </div>
                <button
                  className="event-register-btn"
                  onClick={() => handleEventRegister(event.id)}
                  style={registeredEvents.includes(event.id) ? { background: 'var(--accent-success)' } : {}}
                >
                  {registeredEvents.includes(event.id) ? '✓ Registered' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'Announcements' && (
          <div className="announcements-list">
            {college.announcements.map(ann => (
              <div key={ann.id} className="announcement-card">
                <div className={`priority-dot ${ann.priority}`} />
                <div className="announcement-body">
                  <div className="announcement-title">{ann.title}</div>
                  <div className="announcement-desc">{ann.description}</div>
                </div>
                <div className="announcement-date">{ann.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* ADMISSIONS TAB */}
        {activeTab === 'Admissions' && (
          <div className="admission-grid">
            <div>
              <div className="overview-card" style={{ marginBottom: '1rem' }}>
                <h3>Programs Offered</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {college.admissions.programs.map(p => (
                    <span key={p} style={{ padding: '0.3rem 0.8rem', background: 'rgba(108,92,231,0.1)', color: 'var(--accent-primary)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overview-card">
                <h3>Admission Details</h3>
                <div className="quick-facts">
                  <div className="fact-row"><span className="fact-label">Total Seats</span><span className="fact-value">{college.admissions.totalSeats}</span></div>
                  <div className="fact-row"><span className="fact-label">Admission Mode</span><span className="fact-value">{college.admissions.admissionMode}</span></div>
                  <div className="fact-row"><span className="fact-label">Eligibility</span><span className="fact-value">{college.admissions.eligibility}</span></div>
                  <div className="fact-row"><span className="fact-label">Counselling Code</span><span className="fact-value">{college.admissions.counsellingCode}</span></div>
                </div>
              </div>
            </div>

            <div className="admission-contact-card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Contact & Location</h3>
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <div>
                  <div className="contact-label">Address</div>
                  <div className="contact-value">{college.address}</div>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{college.phone}</div>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{college.email}</div>
                </div>
              </div>
              <div className="contact-item">
                <Globe size={18} className="contact-icon" />
                <div>
                  <div className="contact-label">Website</div>
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="contact-value" style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {college.website} <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={{
                marginTop: '1rem',
                height: '200px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                gap: '0.5rem',
              }}>
                <MapPin size={32} color="var(--accent-primary)" />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tiruchirappalli — 10.8401° N, 78.6867° E</p>
                <a
                  href={`https://maps.google.com/?q=${college.mapCoordinates.lat},${college.mapCoordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: '0.4rem 1rem', background: 'var(--accent-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 600 }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeProfile;
