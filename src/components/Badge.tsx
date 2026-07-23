import React from 'react';
import { LucideIcon } from 'lucide-react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'premium';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = ''
}) => {
  const classes = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} className="badge-icon" />}
      {children}
    </span>
  );
};

export default Badge;
