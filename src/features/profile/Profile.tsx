import React, { useState, useEffect } from 'react';
import { 
  Target, Zap, Shield, Star, Trophy, Code, MessageSquare, 
  Briefcase, Edit2, Globe, ExternalLink, 
  Award, GraduationCap, Calendar, CheckCircle, BarChart, Code2, MapPin
} from 'lucide-react';
import './Profile.css';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="profile-container">
      {/* Hero Section */}
      <div className="profile-header glass-card">
        <div className="profile-cover">
          <button className="edit-cover-btn"><Edit2 size={14} /> Edit Cover</button>
        </div>
        <div className="profile-info-section">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <span className="avatar-initials">AC</span>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="profile-name-row">
              <h1 className="profile-name">Alex Chen</h1>
              <button className="edit-profile-btn" onClick={toggleEdit}>
                <Edit2 size={16} />
                <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
              </button>
            </div>
            <p className="profile-title">B.Tech Computer Science Engineering</p>
            <p className="profile-college">Vellore Institute of Technology, Vellore • Class of 2025</p>
            <p className="profile-bio">
              Aspiring Software Development Engineer | Competitive Programmer (Codeforces Specialist) | Full Stack Web Developer (React/Node.js) | Passionate about System Design.
            </p>
            
            <div className="profile-stats-row">
              <div className="stat-badge xp-badge">
                <Star size={16} />
                <span>2,450 XP</span>
              </div>
              <div className="stat-badge level-badge">
                <Target size={16} />
                <span>CGPA: 8.94</span>
              </div>
              <div className="stat-badge rank-badge">
                <Trophy size={16} />
                <span>Batch Rank: 42</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-main-column">
          {/* About Me */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>About Me</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <div className="section-content">
              <p>
                I am a pre-final year Computer Science student with a strong foundation in Data Structures and Algorithms. I enjoy building scalable web applications and solving complex algorithmic challenges. Currently looking for 6-month internship opportunities starting Jan 2025.
              </p>
            </div>
          </section>

          {/* Education */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Education</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-dot"><GraduationCap size={16}/></div>
                <div className="timeline-content">
                  <h3>B.Tech in Computer Science Engineering</h3>
                  <h4>Vellore Institute of Technology, Vellore</h4>
                  <p className="timeline-date">2021 - 2025</p>
                  <p className="timeline-desc">CGPA: 8.94/10.0</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"><GraduationCap size={16}/></div>
                <div className="timeline-content">
                  <h3>Class 12th (CBSE)</h3>
                  <h4>Delhi Public School, R.K. Puram</h4>
                  <p className="timeline-date">2019 - 2021</p>
                  <p className="timeline-desc">Percentage: 94.6% (PCM + Computer Science)</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"><GraduationCap size={16}/></div>
                <div className="timeline-content">
                  <h3>Class 10th (CBSE)</h3>
                  <h4>Delhi Public School, R.K. Puram</h4>
                  <p className="timeline-date">2019</p>
                  <p className="timeline-desc">Percentage: 96.2%</p>
                </div>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Experience & Internships</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-dot"><Briefcase size={16}/></div>
                <div className="timeline-content">
                  <h3>Software Engineering Intern</h3>
                  <h4>TechNova Solutions, Bengaluru</h4>
                  <p className="timeline-date">May 2023 - July 2023</p>
                  <p className="timeline-desc">
                    • Developed a microservice in Go for real-time notification delivery.
                    <br/>• Reduced API latency by 20% by implementing Redis caching.
                    <br/>• Wrote unit tests achieving 85% code coverage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Projects</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Campus Event Manager</h3>
                <div className="project-tech">
                  <span>React</span><span>Node.js</span><span>MongoDB</span>
                </div>
                <p>A full-stack application for college clubs to manage event registrations, ticketing, and attendee tracking.</p>
                <div className="project-links">
                  <a href="#"><Code2 size={16}/> Source</a>
                  <a href="#"><ExternalLink size={16}/> Live</a>
                </div>
              </div>
              <div className="project-card">
                <h3>AlgoVisualizer</h3>
                <div className="project-tech">
                  <span>HTML/CSS</span><span>Vanilla JS</span>
                </div>
                <p>Interactive web tool to visualize popular sorting and pathfinding algorithms like Dijkstra and A* in real-time.</p>
                <div className="project-links">
                  <a href="#"><Code2 size={16}/> Source</a>
                  <a href="#"><ExternalLink size={16}/> Live</a>
                </div>
              </div>
              <div className="project-card">
                <h3>Smart Attendance Bot</h3>
                <div className="project-tech">
                  <span>Python</span><span>OpenCV</span><span>TensorFlow</span>
                </div>
                <p>Facial recognition based attendance system utilizing Siamese networks for 98% accuracy in diverse lighting.</p>
                <div className="project-links">
                  <a href="#"><Code2 size={16}/> Source</a>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Achievements & Awards</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <ul className="achievements-list">
              <li>
                <Award size={20} className="text-warning" />
                <div>
                  <strong>Global Rank 345</strong> in Google HashCode 2023
                </div>
              </li>
              <li>
                <Award size={20} className="text-warning" />
                <div>
                  <strong>Winner</strong> out of 120 teams in VIT Hackathon 2023
                </div>
              </li>
              <li>
                <Award size={20} className="text-warning" />
                <div>
                  <strong>5-Star Coder</strong> on HackerRank (Problem Solving & C++)
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="profile-sidebar-column">
          {/* Coding Profiles */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Coding Profiles</h2>
            </div>
            <div className="coding-profiles-list">
              <a href="#" className="profile-link">
                <Code size={18} />
                <span>LeetCode</span>
                <strong>450+ solved</strong>
              </a>
              <a href="#" className="profile-link">
                <Code size={18} />
                <span>Codeforces</span>
                <strong>Rating: 1450</strong>
              </a>
              <a href="#" className="profile-link">
                <Code2 size={18} />
                <span>GitHub</span>
                <strong>650 commits</strong>
              </a>
              <a href="#" className="profile-link">
                <Briefcase size={18} />
                <span>LinkedIn</span>
                <strong>500+ cons</strong>
              </a>
            </div>
          </section>

          {/* Analytics Overview */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Analytics Overview</h2>
            </div>
            <div className="analytics-grid">
              <div className="analytic-item">
                <div className="icon-wrapper"><Code size={20}/></div>
                <div className="analytic-info">
                  <h4>Problems</h4>
                  <p>87 this month</p>
                </div>
              </div>
              <div className="analytic-item">
                <div className="icon-wrapper"><MessageSquare size={20}/></div>
                <div className="analytic-info">
                  <h4>Mocks</h4>
                  <p>4 completed</p>
                </div>
              </div>
              <div className="analytic-item">
                <div className="icon-wrapper"><Target size={20}/></div>
                <div className="analytic-info">
                  <h4>Contests</h4>
                  <p>12 attended</p>
                </div>
              </div>
            </div>
          </section>

          {/* Placement Readiness */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Placement Readiness</h2>
            </div>
            <div className="readiness-meter">
              <div className="meter-circle">
                <svg viewBox="0 0 36 36" className="circular-chart green">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray="75, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">75%</text>
                </svg>
              </div>
              <div className="readiness-breakdown">
                <div className="breakdown-item"><span>DSA</span> <div className="bar"><div className="fill" style={{width:'80%'}}></div></div></div>
                <div className="breakdown-item"><span>CS Core</span> <div className="bar"><div className="fill" style={{width:'85%'}}></div></div></div>
                <div className="breakdown-item"><span>Aptitude</span> <div className="bar"><div className="fill" style={{width:'60%'}}></div></div></div>
                <div className="breakdown-item"><span>HR/Comm</span> <div className="bar"><div className="fill" style={{width:'70%'}}></div></div></div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Skills</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <div className="skills-container">
              <div className="skill-category">
                <h4>Languages</h4>
                <div className="skill-tags">
                  <span className="skill-tag high">C++</span>
                  <span className="skill-tag high">JavaScript</span>
                  <span className="skill-tag mid">Python</span>
                  <span className="skill-tag mid">Java</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Web Tech</h4>
                <div className="skill-tags">
                  <span className="skill-tag high">React.js</span>
                  <span className="skill-tag high">Node.js</span>
                  <span className="skill-tag mid">Express</span>
                  <span className="skill-tag low">Next.js</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Databases & Tools</h4>
                <div className="skill-tags">
                  <span className="skill-tag high">MongoDB</span>
                  <span className="skill-tag mid">MySQL</span>
                  <span className="skill-tag high">Git/GitHub</span>
                  <span className="skill-tag low">Docker</span>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="profile-section glass-card">
            <div className="section-header">
              <h2>Certifications</h2>
              {isEditing && <Edit2 size={16} className="edit-icon" />}
            </div>
            <div className="cert-list">
              <div className="cert-item">
                <Award size={24} className="cert-icon" />
                <div className="cert-details">
                  <h4>AWS Certified Cloud Practitioner</h4>
                  <p>Amazon Web Services • 2023</p>
                </div>
              </div>
              <div className="cert-item">
                <Award size={24} className="cert-icon" />
                <div className="cert-details">
                  <h4>Meta Front-End Developer</h4>
                  <p>Coursera • 2023</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
