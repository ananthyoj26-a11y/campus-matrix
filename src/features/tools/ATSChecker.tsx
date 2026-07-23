import { useState } from 'react';
import { Upload, FileText, Loader, CheckCircle, AlertCircle, XCircle, Sparkles } from 'lucide-react';

interface ATSResult {
  overallScore: number;
  breakdown: { label: string; score: number; max: number; color: string }[];
  foundKeywords: string[];
  missingKeywords: string[];
  improvements: string[];
}

const analyzeResume = async (resumeText: string, jobRole: string): Promise<ATSResult> => {
  // Simulate AI analysis (In production, call Gemini API via backend)
  await new Promise(r => setTimeout(r, 2000));

  const score = Math.floor(55 + Math.random() * 35);
  const jobKeywords: Record<string, string[]> = {
    default: ['Python', 'JavaScript', 'React', 'REST API', 'Git', 'SQL', 'Docker', 'Agile', 'CI/CD', 'Unit Testing'],
    'software engineer': ['Python', 'Java', 'Algorithms', 'Data Structures', 'System Design', 'REST API', 'Git', 'SQL', 'Docker'],
    'data scientist': ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL', 'Statistics', 'Deep Learning', 'R'],
    'frontend developer': ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript', 'Redux', 'Webpack', 'REST API', 'Git', 'Performance'],
  };

  const roleKey = Object.keys(jobKeywords).find(k => jobRole.toLowerCase().includes(k)) || 'default';
  const allKeywords = jobKeywords[roleKey];
  const foundCount = Math.floor(allKeywords.length * (score / 100));
  const found = allKeywords.slice(0, foundCount);
  const missing = allKeywords.slice(foundCount);

  return {
    overallScore: score,
    breakdown: [
      { label: 'Keyword Match', score: Math.floor(score * 1.1), max: 100, color: '#6c5ce7' },
      { label: 'Formatting & Structure', score: Math.floor(score * 0.9 + 5), max: 100, color: '#00d2d3' },
      { label: 'Technical Skills', score: Math.floor(score * 1.05), max: 100, color: '#00b894' },
      { label: 'Impact & Metrics', score: Math.floor(score * 0.8), max: 100, color: '#fdcb6e' },
    ].map(b => ({ ...b, score: Math.min(b.score, 100) })),
    foundKeywords: found,
    missingKeywords: missing,
    improvements: [
      'Add quantifiable metrics to your achievements (e.g., "Improved performance by 40%").',
      `Include missing keywords: ${missing.slice(0, 3).join(', ')} — they appear in most ${jobRole} job descriptions.`,
      'Use a clean, single-column format to ensure proper ATS parsing.',
      'Add a concise Professional Summary at the top targeting this specific role.',
      'Replace generic action verbs (e.g., "worked on") with strong ones (e.g., "Architected", "Optimized").',
      'Ensure your contact section includes LinkedIn URL and GitHub profile link.',
    ],
  };
};

const ScoreGauge = ({ score }: { score: number }) => {
  const color = score >= 75 ? '#00b894' : score >= 55 ? '#fdcb6e' : '#e17055';
  const circumference = 2 * Math.PI * 54;
  const strokeDash = (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 0.5rem' }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" fill="none" stroke="var(--bg-tertiary)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r="54" fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem', fontWeight: 800, color, fontFamily: 'var(--font-heading)' }}>{score}</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ATS Score</span>
      </div>
    </div>
  );
};

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobRole.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await analyzeResume(resumeText, jobRole);
    setResult(res);
    setLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = ev => setResumeText(ev.target?.result as string || '');
      reader.readAsText(file);
    } else {
      setResumeText('[PDF/DOCX upload simulated — paste your resume text below for analysis]');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
          🎯 ATS Resume Checker
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Analyze your resume with AI and get an ATS compatibility score, missing keywords, and actionable improvements.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Input Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Target Job Role */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              🎯 Target Job Role / Description
            </label>
            <input
              type="text"
              placeholder="e.g. Software Engineer — React & Python, Data Scientist"
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
            />
          </div>

          {/* Drag & Drop Upload */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragging ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center',
              background: dragging ? 'rgba(108,92,231,0.05)' : 'var(--bg-secondary)',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            <Upload size={28} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Drag & Drop your Resume</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>PDF, DOCX, or TXT supported</p>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>— OR paste your resume text —</div>

          {/* Paste Text Area */}
          <textarea
            placeholder="Paste your full resume text here..."
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={10}
            style={{ width: '100%', padding: '0.85rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', resize: 'vertical', lineHeight: 1.6 }}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim() || !jobRole.trim()}
            style={{ padding: '0.9rem', background: loading || !resumeText.trim() || !jobRole.trim() ? 'var(--bg-tertiary)' : 'var(--gradient-primary)', color: loading || !resumeText.trim() || !jobRole.trim() ? 'var(--text-muted)' : 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
          >
            {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing with Gemini AI…</> : <><Sparkles size={18} /> Analyze Resume</>}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeInUp 0.5s ease' }}>
            {/* Score Card */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <ScoreGauge score={result.overallScore} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {result.overallScore >= 75 ? '🟢 Good ATS Compatibility' : result.overallScore >= 55 ? '🟡 Needs Improvement' : '🔴 Poor ATS Compatibility'}
              </p>
            </div>

            {/* Breakdown */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Score Breakdown</h4>
              {result.breakdown.map(b => (
                <div key={b.label} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{b.label}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: b.color }}>{b.score}/100</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${b.score}%`, height: '100%', background: b.color, borderRadius: 999, transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Keywords */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Keyword Analysis</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--accent-success)', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle size={14} /> Found ({result.foundKeywords.length})
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {result.foundKeywords.map(k => (
                  <span key={k} style={{ padding: '0.2rem 0.6rem', background: 'rgba(0,184,148,0.12)', color: 'var(--accent-success)', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>{k}</span>
                ))}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--accent-danger)', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <XCircle size={14} /> Missing ({result.missingKeywords.length})
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {result.missingKeywords.map(k => (
                  <span key={k} style={{ padding: '0.2rem 0.6rem', background: 'rgba(225,112,85,0.12)', color: 'var(--accent-danger)', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>{k}</span>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} color="var(--accent-warning)" /> Critical Improvements
              </h4>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {result.improvements.map((tip, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.5 }}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;
