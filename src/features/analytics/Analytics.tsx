import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Target, Code, Flame, UserCheck, Lightbulb } from 'lucide-react';
import './Analytics.css';

const codingProgressData = [
  { topic: 'Arrays', problems: 45 },
  { topic: 'Strings', problems: 32 },
  { topic: 'Linked Lists', problems: 20 },
  { topic: 'Trees', problems: 18 },
  { topic: 'DP', problems: 12 },
  { topic: 'Graphs', problems: 8 },
];

const timeSpentData = [
  { name: 'Coding Practice', value: 45, color: '#8b5cf6' },
  { name: 'Mock Interviews', value: 25, color: '#3b82f6' },
  { name: 'Tutorials', value: 15, color: '#10b981' },
  { name: 'Reading', value: 15, color: '#f59e0b' },
];

const interviewData = Array.from({ length: 10 }, (_, i) => ({
  interview: `Int ${i + 1}`,
  score: Math.floor(Math.random() * 40) + 60,
}));

const skillRadarData = [
  { subject: 'Algorithms', A: 85, fullMark: 100 },
  { subject: 'System Design', A: 65, fullMark: 100 },
  { subject: 'Communication', A: 90, fullMark: 100 },
  { subject: 'Problem Solving', A: 80, fullMark: 100 },
  { subject: 'Data Structures', A: 75, fullMark: 100 },
  { subject: 'Testing', A: 50, fullMark: 100 },
];

const generateHeatmapData = () => {
  const data = [];
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      data.push({
        week: w,
        day: d,
        count: Math.floor(Math.random() * 5),
      });
    }
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Analytics: React.FC = () => {
  const [_mounted, setMounted] = useState(false);
  const [heatmapData] = useState(generateHeatmapData());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <h1 className="gradient-text">Analytics Dashboard</h1>
          <p className="subtitle">Comprehensive overview of your learning and readiness</p>
        </div>
        <div className="date-selector">
          <select className="glass-select">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon problems"><Code size={24} /></div>
          <div className="stat-info">
            <p>Problems Solved</p>
            <h3>135</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon interview"><Target size={24} /></div>
          <div className="stat-info">
            <p>Interviews Completed</p>
            <h3>12</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon streak"><Flame size={24} /></div>
          <div className="stat-info">
            <p>Current Streak</p>
            <h3>14 Days</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon profile"><UserCheck size={24} /></div>
          <div className="stat-info">
            <p>Profile Completion</p>
            <h3>95%</h3>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Coding Progress</h3>
          <p className="chart-subtitle">Problems solved per topic</p>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={codingProgressData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <YAxis dataKey="topic" type="category" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} width={80} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="problems" name="Problems" fill="var(--accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Skill Radar</h3>
          <p className="chart-subtitle">Proficiency across categories</p>
          <div className="chart-wrapper radar-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="A" stroke="var(--info)" fill="var(--info)" fillOpacity={0.6} />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Interview Performance</h3>
          <p className="chart-subtitle">Score trends over last 10 mock interviews</p>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="interview" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" domain={[0, 100]} tick={{fill: 'var(--text-secondary)'}} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" name="Score (%)" stroke="var(--success)" strokeWidth={3} dot={{r: 4, fill: 'var(--success)', strokeWidth: 0}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Time Spent (Module)</h3>
          <p className="chart-subtitle">Distribution of learning hours</p>
          <div className="chart-wrapper pie-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeSpentData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeSpentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center-text">
              <span className="total">120h</span>
              <span className="label">Total</span>
            </div>
          </div>
          <div className="pie-legend">
            {timeSpentData.map(item => (
              <div key={item.name} className="legend-item">
                <span className="legend-dot" style={{backgroundColor: item.color}}></span>
                <span className="legend-name">{item.name}</span>
                <span className="legend-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="chart-card heatmap-card">
          <h3>Weekly Activity</h3>
          <p className="chart-subtitle">Contributions and activity over the last 3 months</p>
          <div className="heatmap-container">
            <div className="heatmap-grid">
              {heatmapData.map((cell, i) => (
                <div 
                  key={i} 
                  className={`heatmap-cell level-${cell.count}`}
                  title={`Activity level: ${cell.count}`}
                ></div>
              ))}
            </div>
            <div className="heatmap-legend">
              <span>Less</span>
              <div className="heatmap-cell level-0"></div>
              <div className="heatmap-cell level-1"></div>
              <div className="heatmap-cell level-2"></div>
              <div className="heatmap-cell level-3"></div>
              <div className="heatmap-cell level-4"></div>
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="chart-card readiness-card">
          <h3>Placement Readiness</h3>
          <div className="readiness-score-container">
            <div className="readiness-circle">
              <h2>78%</h2>
              <span>Ready</span>
            </div>
            <div className="readiness-details">
              <div className="detail-row">
                <span>Technical Skills</span>
                <div className="progress-bg"><div className="progress-fill" style={{width: '85%', background: 'var(--success)'}}></div></div>
              </div>
              <div className="detail-row">
                <span>Aptitude</span>
                <div className="progress-bg"><div className="progress-fill" style={{width: '70%', background: 'var(--warning)'}}></div></div>
              </div>
              <div className="detail-row">
                <span>Communication</span>
                <div className="progress-bg"><div className="progress-fill" style={{width: '90%', background: 'var(--info)'}}></div></div>
              </div>
              <div className="detail-row">
                <span>Resume Score</span>
                <div className="progress-bg"><div className="progress-fill" style={{width: '60%', background: 'var(--error)'}}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendations-section">
        <h3><Lightbulb size={20} className="inline-icon text-warning" /> AI Recommendations</h3>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <h4>Improve System Design</h4>
            <p>Your mock interview scores indicate a gap in System Design. Try completing the 'Grokking System Design' module.</p>
            <button className="secondary-btn btn-sm">Start Module</button>
          </div>
          <div className="recommendation-card">
            <h4>Update Your Resume</h4>
            <p>Your resume score is 60%. Add your recent React project to boost your profile visibility to recruiters.</p>
            <button className="secondary-btn btn-sm">Edit Profile</button>
          </div>
          <div className="recommendation-card">
            <h4>Practice DP Problems</h4>
            <p>You've solved 12 DP problems. Solve 5 more medium DP questions to solidify this topic before your Amazon interview.</p>
            <button className="secondary-btn btn-sm">Solve Problems</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
