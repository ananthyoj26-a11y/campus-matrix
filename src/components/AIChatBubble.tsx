import React from 'react';
import { MessageCircle } from 'lucide-react';
import './AIChatBubble.css';

interface AIChatBubbleProps {
  onClick: () => void;
  unreadCount?: number;
}

const AIChatBubble: React.FC<AIChatBubbleProps> = ({ onClick, unreadCount = 0 }) => {
  return (
    <button className="ai-chat-bubble" onClick={onClick} aria-label="Open AI Mentor">
      <MessageCircle size={28} className="chat-icon" />
      {unreadCount > 0 && (
        <span className="chat-badge">{unreadCount}</span>
      )}
    </button>
  );
};

export default AIChatBubble;
