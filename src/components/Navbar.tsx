import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, Flame, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import './Navbar.css';

interface NavbarProps {
  toggleSidebar: () => void;
  unreadNotifications?: number;
  streak?: number;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, unreadNotifications = 0, streak = 7 }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = user?.name || user?.email?.split('@')[0] || 'Student';
  const userInitial = userName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="icon-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={20} />
        </button>
        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-text">CampusMatrix</span>
        </Link>
      </div>

      <div className="navbar-center hidden-mobile">
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" aria-label="Search" />
        </div>
      </div>

      <div className="navbar-right">
        <div className="streak-badge" title="Current streak">
          <Flame size={16} color="var(--color-amber)" />
          <span>{streak}</span>
        </div>
        
        <button className="icon-btn notification-btn" aria-label="Notifications">
          <Bell size={20} />
          {unreadNotifications > 0 && <span className="notification-dot">{unreadNotifications}</span>}
        </button>
        
        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            className="avatar-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="User menu"
            aria-expanded={dropdownOpen}
          >
            <div className="avatar-circle">{userInitial}</div>
            <ChevronDown size={14} style={{ opacity: 0.6 }} />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">{userInitial}</div>
                <div>
                  <p className="dropdown-name">{userName}</p>
                  <p className="dropdown-email">{user?.email || ''}</p>
                </div>
              </div>
              <div className="dropdown-divider" />
              <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                <User size={16} /> Profile
              </Link>
              <button className="dropdown-item dropdown-item-btn" onClick={handleLogout}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
