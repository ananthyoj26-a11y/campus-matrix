import React from 'react';
import { NavLink } from 'react-router';
import { 
  LayoutDashboard, Map, Code2, MessageSquare, 
  Briefcase, Trophy, Users, Medal, BarChart3, User, Shield,
  School, Calendar, FileSearch
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isExpanded: boolean;
  isAdmin?: boolean;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: School, label: 'Colleges', path: '/colleges' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Map, label: 'Career Roadmap', path: '/career-roadmap' },
  { icon: Code2, label: 'Coding Hub', path: '/coding-hub' },
  { icon: MessageSquare, label: 'Mock Interviews', path: '/mock-interview' },
  { icon: Briefcase, label: 'Campus Careers', path: '/careers' },
  { icon: Trophy, label: 'Hackathons', path: '/hackathons' },
  { icon: Users, label: 'Student Guilds', path: '/guilds' },
  { icon: Medal, label: 'Leaderboard', path: '/leaderboard' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: FileSearch, label: 'ATS Checker', path: '/tools/ats-checker' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, isAdmin = false }) => {
  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-content">
        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={!isExpanded ? item.label : undefined}
            >
              <item.icon size={20} className="nav-icon" />
              {isExpanded && <span className="nav-label">{item.label}</span>}
            </NavLink>
          ))}
          
          {isAdmin && (
            <>
              <div className="nav-divider" />
              <NavLink 
                to="/admin" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                title={!isExpanded ? "Admin Panel" : undefined}
              >
                <Shield size={20} className="nav-icon" />
                {isExpanded && <span className="nav-label">Admin Panel</span>}
              </NavLink>
            </>
          )}
        </nav>
        
        <div className="user-mini-card">
          <div className="user-avatar">
            <User size={20} />
          </div>
          {isExpanded && (
            <div className="user-info">
              <span className="user-name">Alex Dev</span>
              <span className="user-level">Lvl 12 Coder</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
