import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  animated = true,
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`progress-container ${className}`}>
      {showLabel && (
        <div className="progress-label">
          <span>Progress</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={`progress-track progress-${size}`}>
        <div 
          className={`progress-fill bg-${variant} ${animated ? 'progress-animated' : ''}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
