import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, School, Users, Calendar, Code2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CommandMenu.css';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'College' | 'Faculty' | 'Event' | 'Tool' | 'Page';
  path: string;
  icon: React.ReactNode;
}

const ALL_RESULTS: SearchResult[] = [
  { id: '1', title: 'Saranathan College of Engineering', subtitle: 'Tiruchirappalli, Tamil Nadu · NAAC A+', category: 'College', path: '/colleges/saranathan-engineering', icon: <School size={16} /> },
  { id: '2', title: 'NIT Tiruchirappalli', subtitle: 'Tiruchirappalli, Tamil Nadu · NAAC A++', category: 'College', path: '/colleges/nit-trichy', icon: <School size={16} /> },
  { id: '3', title: 'IIT Madras', subtitle: 'Chennai, Tamil Nadu · NAAC A++', category: 'College', path: '/colleges/iit-madras', icon: <School size={16} /> },
  { id: '4', title: 'Dr. S. Ramakrishnan', subtitle: 'Professor & HOD, CSE · Machine Learning', category: 'Faculty', path: '/colleges/saranathan-engineering', icon: <Users size={16} /> },
  { id: '5', title: 'Dr. V. Meenakshi', subtitle: 'Professor & HOD, AI&DS · Generative AI', category: 'Faculty', path: '/colleges/saranathan-engineering', icon: <Users size={16} /> },
  { id: '6', title: 'TRACKS 2026 — CSE Symposium', subtitle: 'Sep 15, 2026 · Saranathan College', category: 'Event', path: '/events', icon: <Calendar size={16} /> },
  { id: '7', title: 'AI/ML Hackathon 2026', subtitle: 'Aug 20, 2026 · Innovation Lab', category: 'Event', path: '/events', icon: <Calendar size={16} /> },
  { id: '8', title: 'TCS Campus Placement Drive', subtitle: 'Aug 22, 2026 · Placement Cell', category: 'Event', path: '/events', icon: <Calendar size={16} /> },
  { id: '9', title: 'ATS Resume Checker', subtitle: 'Analyze your resume with AI', category: 'Tool', path: '/tools/ats-checker', icon: <FileText size={16} /> },
  { id: '10', title: 'Coding Practice Hub', subtitle: '500+ problems with built-in editor', category: 'Tool', path: '/coding-hub', icon: <Code2 size={16} /> },
  { id: '11', title: 'AI Mock Interview', subtitle: 'Practice interviews with Gemini AI', category: 'Tool', path: '/mock-interview', icon: <Users size={16} /> },
  { id: '12', title: 'Career Roadmap', subtitle: 'AI-powered learning paths', category: 'Page', path: '/career-roadmap', icon: <ArrowRight size={16} /> },
  { id: '13', title: 'Student Dashboard', subtitle: 'Your personalized hub', category: 'Page', path: '/dashboard', icon: <ArrowRight size={16} /> },
  { id: '14', title: 'Analytics Dashboard', subtitle: 'Track your progress and stats', category: 'Page', path: '/analytics', icon: <ArrowRight size={16} /> },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CommandMenu = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = query.trim()
    ? ALL_RESULTS.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_RESULTS.slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      navigate(filtered[selectedIdx].path);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  if (!isOpen) return null;

  const grouped: Record<string, SearchResult[]> = {};
  filtered.forEach(r => {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r);
  });

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-dialog" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="cmd-search-row">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Search colleges, faculty, events, tools…"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
          />
          <button className="cmd-close-btn" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="cmd-category-label">{category}</div>
                {items.map(item => {
                  const globalIdx = filtered.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      className={`cmd-result-item ${globalIdx === selectedIdx ? 'selected' : ''}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIdx(globalIdx)}
                    >
                      <span className="cmd-result-icon">{item.icon}</span>
                      <div className="cmd-result-text">
                        <span className="cmd-result-title">{item.title}</span>
                        <span className="cmd-result-subtitle">{item.subtitle}</span>
                      </div>
                      <ArrowRight size={14} className="cmd-result-arrow" />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;
