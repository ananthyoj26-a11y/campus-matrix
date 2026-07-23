import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './AIMentor.css';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface AIMentorProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "Help me prepare for my next interview",
  "What skills should I learn next?",
  "Review my coding approach",
  "Career advice for a fresher"
];

const MOCK_AI_RESPONSES = [
  "That's a great question! Based on your current profile, I'd recommend focusing on advanced React patterns and system design basics.",
  "I can definitely help with that. Here are a few tips to get started:\n1. Understand the core requirements.\n2. Break the problem into smaller pieces.\n3. Write pseudo-code before actual implementation.",
  "Your recent activity shows great progress in algorithms! To take it to the next level, try tackling some dynamic programming challenges on LeetCode.",
  "Here is a quick overview of what interviewers look for:\n- Clear communication\n- Problem-solving approach\n- Clean and efficient code\n- Handling edge cases effectively."
];

const AIMentor: React.FC<AIMentorProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Mock API call delay
    setTimeout(() => {
      const randomResponse = MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)];
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      <div className={`ai-mentor-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="header-title">
            <Sparkles className="ai-icon" size={20} />
            <h2>AI Mentor</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="ai-greeting">
                <div className="greeting-icon-wrapper">
                  <Bot size={32} />
                </div>
                <h3>Hi, I'm your AI Mentor</h3>
                <p>Ask me anything about coding, interviews, or your career path.</p>
              </div>
              <div className="quick-prompts">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button key={idx} className="prompt-card" onClick={() => handleSend(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-content-wrapper">
                    <div className="message-bubble">
                      {msg.role === 'ai' ? (
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message-wrapper ai">
                  <div className="message-avatar"><Bot size={16} /></div>
                  <div className="message-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="drawer-footer">
          <div className="input-wrapper">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask your mentor..."
              rows={1}
            />
            <button 
              className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
            </button>
          </div>
          <div className="footer-meta">
            <span>{inputValue.length}/500</span>
            <span className="powered-by">Powered by Gemini <Sparkles size={12} /></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIMentor;
