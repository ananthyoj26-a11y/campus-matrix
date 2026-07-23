import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './Card.css'; // Will use basic classes

// Using a simple state for demonstration. In a real app, use Context.
const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="icon-btn theme-toggle" 
      aria-label="Toggle Theme"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}
    >
      {isDark ? (
        <Sun size={20} style={{ transition: 'transform 0.3s', transform: 'rotate(0deg)' }} />
      ) : (
        <Moon size={20} style={{ transition: 'transform 0.3s', transform: 'rotate(360deg)' }} />
      )}
    </button>
  );
};

export default ThemeToggle;
