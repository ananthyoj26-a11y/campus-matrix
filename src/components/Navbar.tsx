import React from 'react';
import { Menu, Search, Bell, Flame, User, Settings, LogOut } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  toggleSidebar: () => void;
  unreadNotifications?: number;
  streak?: number;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, unreadNotifications = 0, streak = 0 }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="icon-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={20} />
        </button>
        <div className="logo">
          <span className="logo-text">CampusMatrix</span>
        </div>
      </div>

      <div className="navbar-center hidden-mobile">
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <div className="navbar-right">
        <div className="streak-badge">
          <Flame size={16} color="var(--color-amber)" />
          <span>{streak}</span>
        </div>
        
        <button className="icon-btn notification-btn" aria-label="Notifications">
          <Bell size={20} />
          {unreadNotifications > 0 && <span className="notification-dot">{unreadNotifications}</span>}
        </button>
        
        <div className="profile-dropdown">
          <button className="avatar-btn">
            <User size={20} />
          </button>
          <div className="dropdown-menu">
            <a href="/profile"><User size={16} /> Profile</a>
            <a href="/settings"><Settings size={16} /> Settings</a>
            <a href="/logout"><LogOut size={16} /> Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
