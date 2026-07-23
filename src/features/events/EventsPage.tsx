import { useState } from 'react';
import { Search, CheckCircle, MapPin, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  college: string;
  type: 'Hackathon' | 'Symposium' | 'Placement Drive' | 'Workshop' | 'Seminar';
  date: string;
  time: string;
  venue: string;
  description: string;
  prize?: string;
  fee: string;
  registrationDeadline: string;
  targetBatch: string;
  registered: number;
  capacity: number;
  status: 'Upcoming' | 'Live' | 'Past';
}

const MOCK_EVENTS: Event[] = [
  {
    id: 'e1', title: 'Google DevFest Hackathon 2026', college: 'Saranathan College of Engineering',
    type: 'Hackathon', date: '2026-08-15', time: '9:00 AM – Aug 17, 6:00 PM',
    venue: 'Innovation Lab, Saranathan College', description: 'Build AI-powered solutions in 48 hours and compete for exciting prizes!',
    prize: '₹25,000', fee: 'Free', registrationDeadline: '2026-08-10',
    targetBatch: 'All UG/PG students', registered: 342, capacity: 500, status: 'Upcoming',
  },
  {
    id: 'e2', title: 'TRACKS 2026 — National Symposium', college: 'Saranathan College of Engineering',
    type: 'Symposium', date: '2026-09-15', time: '9:00 AM – 5:00 PM',
    venue: 'Main Auditorium, Saranathan College', description: 'National-level technical symposium with paper presentation, code hunt, and expert talks.',
    prize: '₹50,000', fee: '₹150/event', registrationDeadline: '2026-09-10',
    targetBatch: 'All UG/PG students', registered: 210, capacity: 1000, status: 'Upcoming',
  },
  {
    id: 'e3', title: 'TCS Campus Recruitment Drive', college: 'Saranathan College of Engineering',
    type: 'Placement Drive', date: '2026-08-22', time: '8:30 AM – 5:00 PM',
    venue: 'Placement Cell, Saranathan College', description: 'TCS is recruiting 2026 batch CSE/IT/ECE graduates. Written test, technical and HR rounds.',
    fee: 'Free', registrationDeadline: '2026-08-18',
    targetBatch: '2026 Batch — CSE, IT, ECE (CGPA 6.5+)', registered: 185, capacity: 300, status: 'Upcoming',
  },
  {
    id: 'e4', title: 'Machine Learning Workshop', college: 'NIT Tiruchirappalli',
    type: 'Workshop', date: '2026-08-05', time: '10:00 AM – 4:00 PM',
    venue: 'AI Lab, NIT Trichy', description: 'Hands-on workshop on building ML models using Python and TensorFlow. Certificate provided.',
    fee: '₹200', registrationDeadline: '2026-08-01',
    targetBatch: 'All students interested in AI/ML', registered: 97, capacity: 120, status: 'Upcoming',
  },
  {
    id: 'e5', title: 'Campus Placement Preparation Seminar', college: 'Multiple Colleges',
    type: 'Seminar', date: '2026-07-28', time: '2:00 PM – 5:00 PM',
    venue: 'Online (Zoom)', description: 'Expert panel discusses placement strategies, resume tips, coding interview prep, and company expectations.',
    fee: 'Free', registrationDeadline: '2026-07-26',
    targetBatch: 'Final year students', registered: 520, capacity: 1000, status: 'Live',
  },
];

const TYPE_FILTERS = ['All', 'Hackathons', 'Symposiums', 'Placement Drives', 'Workshops', 'Seminars'];
const STATUS_FILTERS = ['All', 'Upcoming', 'Live', 'Past'];

const EventsPage = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', rollNo: '', dept: '', email: '', phone: '' });
  const [formSuccess, setFormSuccess] = useState(false);

  const filtered = MOCK_EVENTS.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.college.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || e.type.toLowerCase().includes(typeFilter.slice(0, -1).toLowerCase());
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      setRegisteredEvents(prev => [...prev, selectedEvent.id]);
    }
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowForm(false);
      setSelectedEvent(null);
    }, 2000);
  };

  const typeColor: Record<string, string> = {
    'Hackathon': '#6c5ce7',
    'Symposium': '#00d2d3',
    'Placement Drive': '#00b894',
    'Workshop': '#fdcb6e',
    'Seminar': '#e17055',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
          📅 Events & Opportunities
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Register for hackathons, symposiums, placement drives, workshops, and more.
        </p>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{ padding: '0.4rem 0.9rem', borderRadius: '999px', border: `1px solid ${statusFilter === s ? 'var(--accent-primary)' : 'var(--border-color)'}`, background: statusFilter === s ? 'var(--accent-primary)' : 'transparent', color: statusFilter === s ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TYPE_FILTERS.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            style={{ padding: '0.35rem 0.85rem', borderRadius: '999px', border: `1px solid ${typeFilter === t ? 'var(--accent-secondary)' : 'var(--border-color)'}`, background: typeFilter === t ? 'rgba(0,210,211,0.15)' : 'transparent', color: typeFilter === t ? 'var(--accent-secondary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(event => {
          const isRegistered = registeredEvents.includes(event.id);
          const pct = Math.round((event.registered / event.capacity) * 100);

          return (
            <div
              key={event.id}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', transition: 'all 0.2s', borderLeft: `4px solid ${typeColor[event.type] || 'var(--accent-primary)'}' ` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, background: `${typeColor[event.type]}22`, color: typeColor[event.type] }}>
                      {event.type}
                    </span>
                    <span style={{ padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, background: event.status === 'Live' ? 'rgba(0,184,148,0.15)' : event.status === 'Past' ? 'rgba(90,90,122,0.2)' : 'rgba(108,92,231,0.12)', color: event.status === 'Live' ? 'var(--accent-success)' : event.status === 'Past' ? 'var(--text-muted)' : 'var(--accent-primary)' }}>
                      {event.status === 'Live' ? '🔴 LIVE' : event.status}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{event.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>🏛️ {event.college}</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>{event.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={13} />{event.date} · {event.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={13} />{event.venue}</span>
                    {event.prize && <span>🏆 {event.prize}</span>}
                    <span>💰 {event.fee}</span>
                    <span>👥 {event.registered}/{event.capacity} registered</span>
                  </div>

                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: pct > 80 ? 'var(--accent-danger)' : 'var(--gradient-primary)', borderRadius: 999, transition: 'width 1s ease' }} />
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{pct}% full · Register by {event.registrationDeadline}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 140 }}>
                  <button
                    onClick={() => { setSelectedEvent(event); setShowForm(true); }}
                    disabled={isRegistered || event.status === 'Past'}
                    style={{
                      padding: '0.65rem 1.25rem',
                      background: isRegistered ? 'var(--accent-success)' : event.status === 'Past' ? 'var(--bg-tertiary)' : 'var(--gradient-primary)',
                      color: event.status === 'Past' ? 'var(--text-muted)' : 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      cursor: isRegistered || event.status === 'Past' ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    {isRegistered ? <><CheckCircle size={15} /> Registered</> : event.status === 'Past' ? 'Ended' : 'Register Now'}
                  </button>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    style={{ padding: '0.55rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'var(--font-body)' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '2rem' }}>📭</p>
          <p>No events found matching your filters.</p>
        </div>
      )}

      {/* Registration Form Modal */}
      {showForm && selectedEvent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowForm(false)}>
          <div
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ color: 'var(--accent-success)', marginBottom: '0.5rem' }}>Registration Successful!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>A confirmation email has been sent to {formData.email}.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Register for Event</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{selectedEvent.title}</p>

                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                    { label: 'Roll Number', key: 'rollNo', type: 'text', placeholder: 'e.g. 21CS001' },
                    { label: 'Department', key: 'dept', type: 'text', placeholder: 'e.g. CSE' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'your.email@college.edu' },
                    { label: 'Phone', key: 'phone', type: 'tel', placeholder: '9876543210' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={(formData as any)[field.key]}
                        onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        style={{ width: '100%', padding: '0.7rem 1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                      />
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="submit" style={{ flex: 1, padding: '0.8rem', background: 'var(--gradient-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                      Confirm Registration
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '0.8rem 1.25rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
