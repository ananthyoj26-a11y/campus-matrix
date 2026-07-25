import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Plus, Search, Users, BookOpen, Briefcase, Cpu, Coffee } from 'lucide-react';
import './ForumPage.css';

const MOCK_THREADS = [
  { id: 1, title: 'How to prepare for upcoming placements?', author: 'John Doe', category: 'Placements', date: '2h ago', likes: 45, replies: 23 },
  { id: 2, title: 'Study group for OS finals', author: 'Jane Smith', category: 'Academics', date: '5h ago', likes: 12, replies: 8 },
  { id: 3, title: 'Anyone interested in building a React Native app?', author: 'Dev Ninja', category: 'Tech', date: '1d ago', likes: 89, replies: 41 },
  { id: 4, title: 'Review of the new cafeteria menu', author: 'Foodie Life', category: 'Campus Life', date: '2d ago', likes: 156, replies: 67 },
  { id: 5, title: 'Tips for Google Summer of Code', author: 'Open Source Fan', category: 'Tech', date: '3d ago', likes: 210, replies: 55 },
];

const CATEGORIES = [
  { name: 'General', icon: MessageSquare },
  { name: 'Academics', icon: BookOpen },
  { name: 'Placements', icon: Briefcase },
  { name: 'Tech', icon: Cpu },
  { name: 'Campus Life', icon: Coffee }
];

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [activeFilter, setActiveFilter] = useState('Latest');

  return (
    <div className="forum-container">
      <div className="forum-sidebar">
        <h3 style={{ margin: '0 0 16px 8px' }}>Categories</h3>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.name} 
            className={`category-btn ${activeCategory === cat.name ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.name)}
          >
            <cat.icon size={20} />
            {cat.name}
          </button>
        ))}
      </div>
      
      <div className="forum-main">
        <div className="forum-header">
          <div className="search-bar">
            <Search size={20} color="var(--text-muted, #6b7280)" />
            <input type="text" placeholder="Search discussions..." />
          </div>
          <button className="new-thread-btn">
            <Plus size={20} /> New Discussion
          </button>
        </div>

        <div className="filters">
          {['Latest', 'Most Liked', 'Most Replied'].map(filter => (
            <button 
              key={filter} 
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="thread-list">
          {MOCK_THREADS.map((thread, i) => (
            <motion.div 
              key={thread.id}
              className="thread-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="thread-info">
                <h4 className="thread-title">{thread.title}</h4>
                <div className="thread-meta">
                  <span>{thread.author}</span>
                  <span>•</span>
                  <span>{thread.date}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--accent-color, #4f46e5)' }}>{thread.category}</span>
                </div>
              </div>
              <div className="thread-stats">
                <div className="stat"><Heart size={18} /> {thread.likes}</div>
                <div className="stat"><MessageSquare size={18} /> {thread.replies}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
