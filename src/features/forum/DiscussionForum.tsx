import { useState, useRef, useEffect } from 'react';
import { MessageCircle, ArrowUp, ThumbsUp, Plus, X, Search, Filter } from 'lucide-react';
import './DiscussionForum.css';

interface Post {
  id: string;
  author: string;
  authorCollege: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotes: number;
  comments: number;
  timeAgo: string;
  isUpvoted: boolean;
}

const CATEGORIES = ['All', 'General', 'Academics', 'Placement Prep', 'Project Ideas', 'Exam Tips'];

const MOCK_POSTS: Post[] = [
  {
    id: 'p1', author: 'Arun Kumar', authorCollege: 'Saranathan College', avatar: 'https://ui-avatars.com/api/?name=A+K&background=6c5ce7&color=fff',
    title: 'Best resources for Data Structures and Algorithms?',
    content: 'I\'m preparing for placements and looking for good DSA resources. I\'ve tried LeetCode but want structured learning paths. Any recommendations?',
    category: 'Placement Prep', tags: ['DSA', 'Placements', 'LeetCode'], upvotes: 42, comments: 15, timeAgo: '2 hours ago', isUpvoted: false,
  },
  {
    id: 'p2', author: 'Priya Sharma', authorCollege: 'NIT Trichy', avatar: 'https://ui-avatars.com/api/?name=P+S&background=00b894&color=fff',
    title: 'Tips for Anna University semester exams?',
    content: 'Final year CSE student here. What study strategies work best for the semester exams? Particularly for CN and OS subjects.',
    category: 'Exam Tips', tags: ['Anna University', 'Semester Exams', 'CSE'], upvotes: 28, comments: 9, timeAgo: '5 hours ago', isUpvoted: false,
  },
  {
    id: 'p3', author: 'Rajesh M', authorCollege: 'Saranathan College', avatar: 'https://ui-avatars.com/api/?name=R+M&background=e17055&color=fff',
    title: 'Project idea: AI-powered campus navigation system',
    content: 'I\'m thinking of building an indoor navigation system using computer vision for our campus. Would use QR codes and AR. Looking for team members interested in CV and Flutter.',
    category: 'Project Ideas', tags: ['AI', 'Computer Vision', 'Flutter', 'Team'], upvotes: 35, comments: 12, timeAgo: '1 day ago', isUpvoted: false,
  },
  {
    id: 'p4', author: 'Deepika R', authorCollege: 'IIT Madras', avatar: 'https://ui-avatars.com/api/?name=D+R&background=fdcb6e&color=333',
    title: 'How to crack Zoho campus interviews?',
    content: 'Zoho is visiting our campus next month. Anyone who got placed in Zoho — what was the interview pattern? How many rounds? What topics to focus on?',
    category: 'Placement Prep', tags: ['Zoho', 'Interview', 'Campus Placement'], upvotes: 56, comments: 22, timeAgo: '1 day ago', isUpvoted: false,
  },
  {
    id: 'p5', author: 'Karthik S', authorCollege: 'Saranathan College', avatar: 'https://ui-avatars.com/api/?name=K+S&background=a855f7&color=fff',
    title: 'React vs Angular vs Vue — which to learn in 2026?',
    content: 'I want to get into frontend development. The industry seems split between React and Angular. Vue is growing too. Which framework has the best job prospects right now?',
    category: 'General', tags: ['React', 'Angular', 'Vue', 'Frontend'], upvotes: 38, comments: 18, timeAgo: '2 days ago', isUpvoted: false,
  },
];

const DiscussionForum = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General', tags: '' });

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, upvotes: p.isUpvoted ? p.upvotes - 1 : p.upvotes + 1, isUpvoted: !p.isUpvoted } : p
    ));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: Post = {
      id: `p${Date.now()}`,
      author: 'You',
      authorCollege: 'Saranathan College',
      avatar: 'https://ui-avatars.com/api/?name=You&background=6c5ce7&color=fff',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
      upvotes: 0,
      comments: 0,
      timeAgo: 'Just now',
      isUpvoted: false,
    };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: 'General', tags: '' });
    setShowCreateModal(false);
  };

  return (
    <div className="forum-page">
      {/* Header */}
      <div className="forum-header">
        <div>
          <h1 className="forum-title">💬 Student Discussion Forum</h1>
          <p className="forum-subtitle">Ask questions, share knowledge, and connect with peers.</p>
        </div>
        <button className="forum-create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Search & Filters */}
      <div className="forum-controls">
        <div className="forum-search">
          <Search size={16} className="forum-search-icon" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="forum-category-filters">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`forum-cat-btn ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="forum-posts">
        {filtered.map(post => (
          <div key={post.id} className="forum-post-card">
            <div className="forum-post-vote">
              <button
                className={`vote-btn ${post.isUpvoted ? 'voted' : ''}`}
                onClick={() => handleUpvote(post.id)}
              >
                <ArrowUp size={18} />
              </button>
              <span className="vote-count">{post.upvotes}</span>
            </div>

            <div className="forum-post-body">
              <div className="forum-post-meta">
                <img src={post.avatar} alt={post.author} className="forum-avatar" />
                <span className="forum-author">{post.author}</span>
                <span className="forum-college-badge">{post.authorCollege}</span>
                <span className="forum-time">{post.timeAgo}</span>
              </div>

              <h3 className="forum-post-title">{post.title}</h3>
              <p className="forum-post-content">{post.content}</p>

              <div className="forum-post-footer">
                <div className="forum-tags">
                  <span className="forum-category-tag">{post.category}</span>
                  {post.tags.map(t => <span key={t} className="forum-tag">{t}</span>)}
                </div>
                <button className="forum-comments-btn">
                  <MessageCircle size={14} /> {post.comments} replies
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="forum-empty">
            <p style={{ fontSize: '2rem' }}>🔍</p>
            <p>No discussions found. Start a new one!</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="forum-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="forum-modal" onClick={e => e.stopPropagation()}>
            <div className="forum-modal-header">
              <h3>Create New Post</h3>
              <button className="forum-modal-close" onClick={() => setShowCreateModal(false)}><X size={18} /></button>
            </div>

            <form onSubmit={handleCreatePost} className="forum-modal-form">
              <div className="forum-form-field">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="What's your question or topic?"
                  value={newPost.title}
                  onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                  required
                />
              </div>

              <div className="forum-form-field">
                <label>Category</label>
                <select value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="forum-form-field">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Placements, DSA"
                  value={newPost.tags}
                  onChange={e => setNewPost(p => ({ ...p, tags: e.target.value }))}
                />
              </div>

              <div className="forum-form-field">
                <label>Content</label>
                <textarea
                  placeholder="Write your post content here..."
                  rows={6}
                  value={newPost.content}
                  onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                  required
                />
              </div>

              <div className="forum-modal-actions">
                <button type="button" className="forum-cancel-btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="forum-submit-btn">Publish Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
