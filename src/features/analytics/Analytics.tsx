import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { Calendar, Target, Code, Award } from 'lucide-react';
import './Analytics.css';

const xpData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  xp: Math.floor(Math.random() * 60) + 20,
}));

const difficultyData = [
  { name: 'Easy', value: 45, color: '#10b981' },
  { name: 'Medium', value: 32, color: '#f59e0b' },
  { name: 'Hard', value: 10, color: '#ef4444' },
];

const weeklyActivityData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 4.0 },
];

const interviewData = Array.from({ length: 10 }, (_, i) => ({
  interview: `Int ${i + 1}`,
  score: Math.floor(Math.random() * 40) + 60,
}));

const skillsData = [
  { name: 'React', progress: 85, color: '#61dafb' },
  { name: 'JavaScript', progress: 92, color: '#f7df1e' },
  { name: 'TypeScript', progress: 60, color: '#3178c6' },
  { name: 'Node.js', progress: 45, color: '#339933' },
  { name: 'Python', progress: 70, color: '#3776ab' },
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
  const [mounted, setMounted] = useState(false);
  const [heatmapData] = useState(generateHeatmapData());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <h1 className="gradient-text">Analytics Dashboard</h1>
          <p className="subtitle">Track your learning progress and performance</p>
        </div>
        <div className="date-selector">
          <select className="glass-select">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon xp"><Award size={24} /></div>
          <div className="stat-info">
            <p>Total XP</p>
            <h3>2,450</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon problems"><Code size={24} /></div>
          <div className="stat-info">
            <p>Problems Solved</p>
            <h3>87</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon interview"><Target size={24} /></div>
          <div className="stat-info">
            <p>Interview Score</p>
            <h3>82%</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon days"><Calendar size={24} /></div>
          <div className="stat-info">
            <p>Active Days</p>
            <h3>45</h3>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>XP Over Time</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpData}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="xp" name="XP Earned" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Problems by Difficulty</h3>
          <div className="chart-wrapper pie-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center-text">
              <span className="total">87</span>
              <span className="label">Total</span>
            </div>
          </div>
          <div className="pie-legend">
            {difficultyData.map(item => (
              <div key={item.name} className="legend-item">
                <span className="legend-dot" style={{backgroundColor: item.color}}></span>
                <span className="legend-name">{item.name}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Weekly Activity</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" name="Hours" fill="url(#colorHours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Interview Performance</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="interview" stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" domain={[0, 100]} tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" name="Score (%)" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 0}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="chart-card skills-card">
          <h3>Skill Progress</h3>
          <div className="skills-list">
            {skillsData.map(skill => (
              <div key={skill.name} className="skill-item">
                <div className="skill-info">
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div 
                    className="skill-bar-fill" 
                    style={{
                      width: mounted ? `${skill.progress}%` : '0%',
                      backgroundColor: skill.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card heatmap-card">
          <h3>Activity Heatmap</h3>
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
      </div>
    </div>
  );
};

export default Analytics;
