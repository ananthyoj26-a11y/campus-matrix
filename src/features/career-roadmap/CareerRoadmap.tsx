import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, BookOpen, PlayCircle, Code, Star, Sparkles, Target, ChevronRight, Briefcase, Award, TrendingUp } from 'lucide-react';
import './CareerRoadmap.css';

type Track = 'Frontend' | 'Backend' | 'Full Stack' | 'Data Science' | 'ML/AI' | 'DevOps' | 'Mobile Dev';

interface SemesterInfo {
  semester: number;
  title: string;
  skills: string[];
  certifications: string[];
  internships: string;
  placements: string;
}

const TRACKS: Track[] = ['Frontend', 'Backend', 'Full Stack', 'Data Science', 'ML/AI', 'DevOps', 'Mobile Dev'];

const SEMESTERS: SemesterInfo[] = [
  { semester: 1, title: 'Foundations', skills: ['C/C++ Basics', 'HTML/CSS', 'Git Basics'], certifications: ['CS50 Introduction to Computer Science'], internships: 'Explore clubs & communities', placements: 'Focus on Aptitude & Communication' },
  { semester: 2, title: 'Core Programming', skills: ['Data Structures in C/C++', 'JavaScript Basics', 'Linux Commands'], certifications: ['Responsive Web Design (freeCodeCamp)'], internships: 'Apply for Open Source programs (GSoC prep)', placements: 'Start LeetCode (Easy)' },
  { semester: 3, title: 'Advanced Fundamentals', skills: ['OOP in Java/Python', 'React.js / Frontend Framework', 'Database (SQL)'], certifications: ['AWS Cloud Practitioner'], internships: 'Apply for winter internships at startups', placements: 'LeetCode (Medium) & System Design Intro' },
  { semester: 4, title: 'Building Projects', skills: ['Backend (Node.js/Django)', 'MongoDB/NoSQL', 'API Design'], certifications: ['Postman API Fundamentals'], internships: 'Summer Internship search (Product based)', placements: 'Core CS Subjects: OS, DBMS, Networks' },
  { semester: 5, title: 'Specialization', skills: ['Advanced React/Angular', 'System Design', 'Cloud Deployment'], certifications: ['Meta Frontend/Backend Developer'], internships: '6-month Internship applications', placements: 'Mock Interviews & Resume Building' },
  { semester: 6, title: 'Pre-Placement Preparation', skills: ['Advanced DSA', 'Microservices', 'CI/CD Basics'], certifications: ['AWS Certified Developer'], internships: 'Pre-Placement Offers (PPO) via internships', placements: 'Company specific prep (TCS Ninja, Infosys SP)' },
  { semester: 7, title: 'Placement Season', skills: ['Interview Preparation', 'Behavioral Skills'], certifications: ['Cloud Architecture'], internships: 'Focus on full-time offers', placements: 'On-campus / Off-campus drives' },
  { semester: 8, title: 'Industry Readiness', skills: ['Open Source Contributions', 'Industry Projects'], certifications: ['Professional level certs'], internships: 'Final semester internship', placements: 'Offer negotiation & joining prep' },
];

export default function CareerRoadmap() {
  const [activeTrack, setActiveTrack] = useState<Track>('Full Stack');
  const [activeSem, setActiveSem] = useState<number>(4); // Default to Sem 4

  const activeSemData = SEMESTERS.find(s => s.semester === activeSem) || SEMESTERS[0];

  return (
    <div className="career-roadmap-container">
      <header className="roadmap-header">
        <h1 className="roadmap-title">Semester-wise Career Roadmap</h1>
        <p className="roadmap-subtitle">Your guide to engineering placements in India</p>
        
        <div className="track-selector">
          {TRACKS.map(track => (
            <button key={track} className={`track-pill ${activeTrack === track ? 'active' : ''}`} onClick={() => setActiveTrack(track)}>
              {track}
            </button>
          ))}
        </div>
      </header>

      <div className="stats-and-ai">
        <div className="stats-bar">
          <div className="stats-header">
            <h3>B.Tech Progress</h3>
            <span>Semester {activeSem} / 8</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(activeSem / 8) * 100}%` }}></div>
          </div>
          <div className="skill-gap">
            <h4 className="flex items-center gap-2"><TrendingUp size={16}/> Skill Gap Analysis</h4>
            <p className="text-sm mt-1 text-secondary">To reach a Product-based company standard for {activeTrack}, you need to strengthen: <strong>Advanced DSA</strong> and <strong>System Design</strong>.</p>
          </div>
        </div>

        <div className="ai-recommendation">
          <div className="ai-icon"><Sparkles size={24} /></div>
          <div className="ai-text">
            <h4>AI Suggested Courses</h4>
            <ul className="text-sm mt-1 list-disc list-inside">
              <li>Grokking the System Design Interview</li>
              <li>Striver's SDE Sheet for DSA</li>
              <li>{activeTrack} Masterclass on Udemy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="roadmap-timeline">
          <div className="timeline-line"></div>
          {SEMESTERS.map((sem) => (
            <motion.div key={sem.semester} className={`timeline-node ${activeSem === sem.semester ? 'active' : ''} ${sem.semester < activeSem ? 'completed' : ''}`} onClick={() => setActiveSem(sem.semester)}>
              <div className="node-icon-wrapper">
                {sem.semester < activeSem ? <Check size={20} /> : sem.semester === activeSem ? <Target size={20} /> : <Lock size={20} />}
              </div>
              <div className="node-content">
                <div className="node-header">
                  <h3>Semester {sem.semester}: {sem.title}</h3>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {sem.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.aside key={activeSem} className="side-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="panel-header">
              <h2>Semester {activeSemData.semester} Details</h2>
              <p>{activeSemData.title}</p>
            </div>

            <div className="panel-section">
              <h4><Code size={20} /> Core Skills to Master</h4>
              <ul className="list-disc pl-5 mt-2 text-sm">
                {activeSemData.skills.map(skill => <li key={skill} className="mb-1">{skill}</li>)}
              </ul>
            </div>

            <div className="panel-section">
              <h4><Award size={20} /> Recommended Certifications</h4>
              <ul className="list-disc pl-5 mt-2 text-sm">
                {activeSemData.certifications.map(c => <li key={c} className="mb-1">{c}</li>)}
              </ul>
            </div>

            <div className="panel-section bg-tertiary p-3 rounded">
              <h4><Briefcase size={20} /> Internship Timeline</h4>
              <p className="text-sm mt-2">{activeSemData.internships}</p>
            </div>

            <div className="panel-section bg-tertiary p-3 rounded mt-3">
              <h4><Target size={20} /> Placement Preparation</h4>
              <p className="text-sm mt-2">{activeSemData.placements}</p>
            </div>
          </motion.aside>
        </AnimatePresence>
      </div>
    </div>
  );
}
