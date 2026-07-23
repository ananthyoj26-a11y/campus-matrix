import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = ''
}) => {
  const elements = [];
  
  for (let i = 0; i < count; i++) {
    elements.push(
      <div 
        key={i} 
        className={`skeleton skeleton-${variant} ${className}`}
        style={{ width, height }}
      />
    );
  }

  return <>{elements}</>;
};

export default Skeleton;
