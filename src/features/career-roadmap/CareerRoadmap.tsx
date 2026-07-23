import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, BookOpen, PlayCircle, Code, Star, Sparkles, Target, ChevronRight } from 'lucide-react';
import './CareerRoadmap.css';

type Track = 'Frontend' | 'Backend' | 'Full Stack' | 'Data Science' | 'ML/AI' | 'DevOps';
type NodeStatus = 'completed' | 'in-progress' | 'locked';
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface SkillNode {
  id: string;
  title: string;
  status: NodeStatus;
  time: string;
  difficulty: Difficulty;
  description: string;
  fullDescription: string;
  resources: { title: string; type: 'video' | 'article' | 'course'; url: string }[];
  problemsCount: number;
}

const TRACKS: Track[] = ['Frontend', 'Backend', 'Full Stack', 'Data Science', 'ML/AI', 'DevOps'];

const FRONTEND_ROADMAP: SkillNode[] = [
  {
    id: 'html-css',
    title: 'HTML & CSS Fundamentals',
    status: 'completed',
    time: '2 weeks',
    difficulty: 'Beginner',
    description: 'Learn the building blocks of the web. Semantic HTML, CSS layouts, Flexbox, and Grid.',
    fullDescription: 'Master the core technologies of the World Wide Web. Understanding semantic HTML is crucial for accessibility and SEO. Modern CSS features like Flexbox and Grid allow you to build complex, responsive layouts with ease.',
    resources: [
      { title: 'MDN Web Docs: HTML', type: 'article', url: '#' },
      { title: 'CSS Grid Crash Course', type: 'video', url: '#' },
    ],
    problemsCount: 15
  },
  {
    id: 'js-essentials',
    title: 'JavaScript Essentials',
    status: 'completed',
    time: '3 weeks',
    difficulty: 'Beginner',
    description: 'Variables, functions, DOM manipulation, events, and modern ES6+ syntax.',
    fullDescription: 'JavaScript brings your web pages to life. Dive into data types, control structures, functions, and the Document Object Model (DOM). Learn modern features like arrow functions, destructuring, and modules.',
    resources: [
      { title: 'JavaScript.info', type: 'course', url: '#' },
      { title: 'DOM Manipulation Guide', type: 'article', url: '#' },
    ],
    problemsCount: 42
  },
  {
    id: 'react-basics',
    title: 'React Basics',
    status: 'completed',
    time: '3 weeks',
    difficulty: 'Intermediate',
    description: 'Components, props, state, JSX, and the virtual DOM.',
    fullDescription: 'React is a library for building user interfaces. Learn how to think in React, break down UI into components, and manage local state. Understand the component lifecycle and how JSX translates to HTML.',
    resources: [
      { title: 'React Official Tutorial', type: 'course', url: '#' },
    ],
    problemsCount: 25
  },
  {
    id: 'advanced-react',
    title: 'Advanced React Patterns',
    status: 'in-progress',
    time: '2 weeks',
    difficulty: 'Advanced',
    description: 'Hooks in-depth, context API, performance optimization, and custom hooks.',
    fullDescription: 'Go beyond the basics. Master built-in hooks like useEffect and useMemo. Learn to create custom hooks to share logic between components. Understand the Context API for global state and techniques to prevent unnecessary re-renders.',
    resources: [
      { title: 'Epic React by Kent C. Dodds', type: 'course', url: '#' },
      { title: 'Understanding React Rendering', type: 'article', url: '#' },
    ],
    problemsCount: 18
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    status: 'locked',
    time: '2 weeks',
    difficulty: 'Intermediate',
    description: 'Static typing, interfaces, generics, and configuring TS with React.',
    fullDescription: 'TypeScript adds static typing to JavaScript, helping you catch errors early and improve developer experience. Learn about types, interfaces, generics, and how to effectively use TypeScript in a React project.',
    resources: [
      { title: 'TypeScript for React Developers', type: 'video', url: '#' },
    ],
    problemsCount: 20
  },
  {
    id: 'state-management',
    title: 'State Management',
    status: 'locked',
    time: '2 weeks',
    difficulty: 'Advanced',
    description: 'Redux Toolkit, Zustand, or Jotai for complex application state.',
    fullDescription: 'When the Context API isn\'t enough, you need robust state management. Learn modern tools like Redux Toolkit or Zustand to manage global state predictably and efficiently across large applications.',
    resources: [
      { title: 'Redux Toolkit Essentials', type: 'course', url: '#' },
    ],
    problemsCount: 12
  }
];

export default function CareerRoadmap() {
  const [activeTrack, setActiveTrack] = useState<Track>('Frontend');
  const [activeNode, setActiveNode] = useState<SkillNode>(FRONTEND_ROADMAP[3]); // Default to in-progress

  const getStatusIcon = (status: NodeStatus) => {
    switch (status) {
      case 'completed': return <Check size={20} />;
      case 'in-progress': return <Target size={20} />;
      case 'locked': return <Lock size={20} />;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={18} />;
      case 'article': return <BookOpen size={18} />;
      case 'course': return <Code size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  return (
    <div className="career-roadmap-container">
      <header className="roadmap-header">
        <h1 className="roadmap-title">Smart Career Roadmap</h1>
        <p className="roadmap-subtitle">AI-powered learning paths tailored to your career goals</p>
        
        <div className="track-selector">
          {TRACKS.map(track => (
            <button
              key={track}
              className={`track-pill ${activeTrack === track ? 'active' : ''}`}
              onClick={() => setActiveTrack(track)}
            >
              {track}
            </button>
          ))}
        </div>
      </header>

      <div className="stats-and-ai">
        <div className="stats-bar">
          <div className="stats-header">
            <h3>{activeTrack} Progress</h3>
            <span>60% Complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <div className="stats-details">
            <span>3 / 5 Skills Mastered</span>
            <span>Est. 6 weeks remaining</span>
          </div>
        </div>

        <div className="ai-recommendation">
          <div className="ai-icon">
            <Sparkles size={24} />
          </div>
          <div className="ai-text">
            <h4>AI Suggests</h4>
            <p>Focus on <strong>Advanced React Patterns</strong> next. Based on your recent coding activity, you're ready to tackle Context API and custom hooks!</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="roadmap-timeline">
          <div className="timeline-line"></div>
          
          {FRONTEND_ROADMAP.map((node) => (
            <motion.div 
              key={node.id}
              className={`timeline-node node-status-${node.status} ${activeNode.id === node.id ? 'active' : ''}`}
              onClick={() => setActiveNode(node)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="node-icon-wrapper">
                {getStatusIcon(node.status)}
              </div>
              <div className="node-content">
                <div className="node-header">
                  <h3>{node.title}</h3>
                  <div className="node-badges">
                    <span className="badge badge-time">{node.time}</span>
                    <span className={`badge badge-difficulty-${node.difficulty.toLowerCase()}`}>
                      {node.difficulty}
                    </span>
                  </div>
                </div>
                <p>{node.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.aside 
            key={activeNode.id}
            className="side-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="panel-header">
              <h2>{activeNode.title}</h2>
              <p>{activeNode.fullDescription}</p>
            </div>

            <div className="panel-section">
              <h4><BookOpen size={20} /> Recommended Resources</h4>
              <div className="resources-list">
                {activeNode.resources.map((res, idx) => (
                  <a key={idx} href={res.url} className="resource-item" target="_blank" rel="noreferrer">
                    {getResourceIcon(res.type)}
                    <span>{res.title}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="panel-section">
              <h4><Code size={20} /> Practice</h4>
              <div className="practice-stats">
                <span>Related Problems</span>
                <strong>{activeNode.problemsCount}</strong>
              </div>
            </div>

            <button 
              className="btn-complete"
              disabled={activeNode.status === 'locked' || activeNode.status === 'completed'}
            >
              {activeNode.status === 'completed' ? (
                <><Check size={20} /> Completed</>
              ) : activeNode.status === 'locked' ? (
                <><Lock size={20} /> Locked</>
              ) : (
                <><Star size={20} /> Mark as Complete</>
              )}
            </button>
          </motion.aside>
        </AnimatePresence>
      </div>
    </div>
  );
}
