import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Plus, Search, BookOpen, Briefcase, Cpu, Coffee, X } from 'lucide-react';
import Modal from '@/components/Modal';
import './ForumPage.css';

interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  likes: number;
  replies: number;
  liked?: boolean;
}

const MOCK_THREADS_INITIAL: Thread[] = [
  { id: 1, title: 'How to prepare for upcoming placements?', author: 'John Doe', category: 'Placements', date: '2h ago', likes: 45, replies: 23, liked: false },
  { id: 2, title: 'Study group for OS finals', author: 'Jane Smith', category: 'Academics', date: '5h ago', likes: 12, replies: 8, liked: false },
  { id: 3, title: 'Anyone interested in building a React Native app?', author: 'Dev Ninja', category: 'Tech', date: '1d ago', likes: 89, replies: 41, liked: false },
  { id: 4, title: 'Review of the new cafeteria menu', author: 'Foodie Life', category: 'Campus Life', date: '2d ago', likes: 156, replies: 67, liked: false },
  { id: 5, title: 'Tips for Google Summer of Code', author: 'Open Source Fan', category: 'Tech', date: '3d ago', likes: 210, replies: 55, liked: false },
];

const CATEGORIES = [
  { name: 'General', icon: MessageSquare },
  { name: 'Academics', icon: BookOpen },
  { name: 'Placements', icon: Briefcase },
  { name: 'Tech', icon: Cpu },
  { name: 'Campus Life', icon: Coffee }
];

export default function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS_INITIAL);
  const [activeCategory, setActiveCategory] = useState('General');
  const [activeFilter, setActiveFilter] = useState('Latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Tech');

  const toggleLike = (id: number) => {
    setThreads(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          liked: !t.liked,
          likes: t.liked ? t.likes - 1 : t.likes + 1
        };
      }
      return t;
    }));
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Thread = {
      id: Date.now(),
      title: newTitle.trim(),
      author: 'You',
      category: newCategory,
      date: 'Just now',
      likes: 1,
      replies: 0,
      liked: true,
    };

    setThreads([created, ...threads]);
    setNewTitle('');
    setIsModalOpen(false);
  };

  // Filter & sort
  const filteredThreads = threads
    .filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'General' || t.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (activeFilter === 'Most Liked') return b.likes - a.likes;
      if (activeFilter === 'Most Replied') return b.replies - a.replies;
      return b.id - a.id;
    });

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
            <input 
              type="text" 
              placeholder="Search discussions..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button className="new-thread-btn" onClick={() => setIsModalOpen(true)}>
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
          {filteredThreads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No discussions found. Be the first to start one!
            </div>
          ) : (
            filteredThreads.map((thread, i) => (
              <motion.div 
                key={thread.id}
                className="thread-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="thread-info">
                  <h4 className="thread-title">{thread.title}</h4>
                  <div className="thread-meta">
                    <span>{thread.author}</span>
                    <span>•</span>
                    <span>{thread.date}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--accent-primary, #4f46e5)' }}>{thread.category}</span>
                  </div>
                </div>
                <div className="thread-stats">
                  <button 
                    className="stat" 
                    onClick={() => toggleLike(thread.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: thread.liked ? 'var(--accent-danger, #e17055)' : 'inherit' }}
                  >
                    <Heart size={18} fill={thread.liked ? 'var(--accent-danger, #e17055)' : 'none'} /> {thread.likes}
                  </button>
                  <div className="stat"><MessageSquare size={18} /> {thread.replies}</div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Start New Discussion" size="md">
        <form onSubmit={handleCreateThread} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Discussion Title</label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. Best resources to practice System Design" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="select"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            >
              <option value="Tech">Tech</option>
              <option value="Academics">Academics</option>
              <option value="Placements">Placements</option>
              <option value="Campus Life">Campus Life</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Post Discussion</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
