import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, Send, Mic, Bot, User, Info } from 'lucide-react';
import './AIMentorPage.css';

const HISTORY = [
  'React Hook optimization',
  'Resume review for Google',
  'Mock interview setup',
  'DSA array problems'
];

const SUGGESTIONS = [
  'Review my resume',
  'Career advice for CSE',
  'Mock interview tips',
  'Explain React hooks'
];

export default function AIMentorPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your AI Campus Mentor. How can I assist you today with your academics, career, or campus life?' },
    { role: 'user', content: 'Can you help me prepare for my upcoming tech interview?' },
    { role: 'ai', content: 'Absolutely! Technical interviews usually cover Data Structures, Algorithms, System Design, and language-specific questions. Which specific area would you like to focus on first?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    
    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', content: 'That sounds like a great plan. Let\'s break that down step by step to ensure you are fully prepared.' }]);
    }, 1500);
  };

  return (
    <div className="ai-container">
      <div className="ai-sidebar">
        <button className="new-chat-btn">
          <Plus size={20} /> New Chat
        </button>
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>Recent Conversations</div>
        <div className="history-list">
          {HISTORY.map((item, idx) => (
            <div key={idx} className="history-item">
              <MessageSquare size={16} />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="ai-main">
        <div className="chat-area">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              className={`message ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="avatar">
                {msg.role === 'ai' ? <Bot size={24} /> : <User size={24} />}
              </div>
              <div className="bubble">
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="message ai">
               <div className="avatar"><Bot size={24} /></div>
               <div className="bubble typing-indicator">
                 <motion.div className="dot" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                 <motion.div className="dot" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                 <motion.div className="dot" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="suggestions">
            {SUGGESTIONS.map((sug, idx) => (
              <div key={idx} className="chip" onClick={() => setInput(sug)}>
                {sug}
              </div>
            ))}
          </div>
          <div className="input-box" style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Ask your mentor anything..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              style={{ paddingRight: '120px' }}
            />
            <div style={{ position: 'absolute', right: '110px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
              {input.length}/500
            </div>
            <button className="action-btn"><Mic size={20} /></button>
            <button className="action-btn send" onClick={handleSend} disabled={!input.trim()}><Send size={18} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <Info size={14} /> AI responses are for guidance only and may not be 100% accurate.
          </div>
        </div>
      </div>
    </div>
  );
}
