import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, User, Send, Clock, CheckCircle, AlertCircle, 
  BarChart, RotateCcw, History, Code, Briefcase, Users 
} from 'lucide-react';
import './MockInterview.css';

type ScreenState = 'setup' | 'chat' | 'feedback';
type InterviewType = 'technical' | 'behavioral' | 'hr';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function MockInterview() {
  const [screen, setScreen] = useState<ScreenState>('setup');
  
  // Setup State
  const [type, setType] = useState<InterviewType>('technical');
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Timer effect
  useEffect(() => {
    let timer: number;
    if (screen === 'chat') {
      timer = window.setInterval(() => setTimeElapsed(p => p + 1), 1000);
    }
    return () => window.clearInterval(timer);
  }, [screen]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleStart = () => {
    setScreen('chat');
    setTimeElapsed(0);
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Hi! I'm your AI interviewer. I'll be conducting a ${difficulty.toLowerCase()} ${type} interview for the ${role} position. Let's begin. Can you start by telling me a little bit about yourself and your background?`
      }
    ]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "That's very interesting. Given your background, how would you approach solving a complex problem when you have tight deadlines and incomplete information?"
      };
      setMessages(prev => [...prev, aiMsg]);
      
      // End interview automatically after 5 user messages for demo
      if (messages.length >= 8) {
         handleEndInterview();
      }
    }, 2000);
  };

  const handleEndInterview = () => {
    setScreen('feedback');
  };

  const reset = () => {
    setScreen('setup');
    setMessages([]);
    setRole('');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mock-interview-container">
      <div className="mock-interview-content">
        
        {screen === 'setup' && (
          <div className="setup-screen">
            <h1 className="gradient-title">AI Mock Interview Simulator</h1>
            <p className="subtitle">Practice interviews with our AI-powered interviewer</p>
            
            <div className="setup-grid">
              <div 
                className={`type-card ${type === 'technical' ? 'selected' : ''}`}
                onClick={() => setType('technical')}
              >
                <h3><Code size={20} /> Technical Interview</h3>
                <p>Data structures, algorithms, system design</p>
              </div>
              <div 
                className={`type-card ${type === 'behavioral' ? 'selected' : ''}`}
                onClick={() => setType('behavioral')}
              >
                <h3><Users size={20} /> Behavioral Interview</h3>
                <p>Tell me about a time..., leadership, teamwork</p>
              </div>
              <div 
                className={`type-card ${type === 'hr' ? 'selected' : ''}`}
                onClick={() => setType('hr')}
              >
                <h3><Briefcase size={20} /> HR Interview</h3>
                <p>Salary, culture fit, career goals</p>
              </div>
            </div>

            <div className="setup-form">
              <div className="form-group">
                <label>Target Role</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g., Frontend Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Difficulty</label>
                <div className="difficulty-selector">
                  {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                    <button 
                      key={d}
                      className={`diff-btn ${difficulty === d ? 'selected' : ''}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="start-btn" 
                onClick={handleStart}
                disabled={!role.trim()}
              >
                Start Interview
              </button>
            </div>
          </div>
        )}

        {screen === 'chat' && (
          <div className="chat-interface">
            <div className="chat-header">
              <div className="chat-header-info">
                <span className="type-badge">
                  {type.charAt(0).toUpperCase() + type.slice(1)} - {difficulty}
                </span>
                <div className="timer">
                  <Clock size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/>
                  {formatTime(timeElapsed)}
                </div>
              </div>
              <button className="end-btn" onClick={handleEndInterview}>End Interview</button>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                  <div className={`avatar ${msg.sender}`}>
                    {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-wrapper ai">
                  <div className="avatar ai"><Bot size={20} /></div>
                  <div className="message-bubble typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <textarea 
                className="chat-input"
                placeholder="Type your answer here..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button 
                className="send-btn" 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}

        {screen === 'feedback' && (
          <div className="feedback-container">
            <h1 className="gradient-title text-center" style={{textAlign: 'center'}}>Interview Feedback</h1>
            
            <div className="feedback-header">
              <div className="score-circle">
                <span className="score">82</span>
                <span>/100</span>
              </div>
              <h2>Great Job!</h2>
              <p className="subtitle" style={{marginBottom: 0}}>You showed strong potential for the {role} role.</p>
            </div>

            <div className="feedback-grid">
              <div className="feedback-card">
                <h3><BarChart size={20} color="#818cf8"/> Category Scores</h3>
                
                <div className="category-row">
                  <div className="category-label">
                    <span>Communication</span>
                    <span>85/100</span>
                  </div>
                  <div className="category-bar-bg">
                    <div className="category-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="category-row">
                  <div className="category-label">
                    <span>Technical Skills</span>
                    <span>72/100</span>
                  </div>
                  <div className="category-bar-bg">
                    <div className="category-bar-fill" style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div className="category-row">
                  <div className="category-label">
                    <span>Problem Solving</span>
                    <span>90/100</span>
                  </div>
                  <div className="category-bar-bg">
                    <div className="category-bar-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>

              <div className="feedback-card">
                <h3><CheckCircle size={20} color="#10b981"/> Strengths</h3>
                <ul className="feedback-list">
                  <li><CheckCircle size={16} color="#10b981"/> Clear and concise communication style.</li>
                  <li><CheckCircle size={16} color="#10b981"/> Strong structured approach to problem solving.</li>
                  <li><CheckCircle size={16} color="#10b981"/> Good usage of past experiences to validate points.</li>
                </ul>
              </div>

              <div className="feedback-card">
                <h3><AlertCircle size={20} color="#f59e0b"/> Areas for Improvement</h3>
                <ul className="feedback-list">
                  <li><AlertCircle size={16} color="#f59e0b"/> Elaborate more on technical trade-offs.</li>
                  <li><AlertCircle size={16} color="#f59e0b"/> Speak slightly slower during complex explanations.</li>
                </ul>
              </div>
            </div>

            <div className="feedback-actions">
              <button className="action-btn primary" onClick={reset}>
                <RotateCcw size={18} /> Practice Again
              </button>
              <button className="action-btn secondary">
                <History size={18} /> View History
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
