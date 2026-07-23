import React from 'react';
import { LucideIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      textAlign: 'center',
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px dashed var(--border-color)',
      color: 'var(--text-secondary)'
    }}>
      <div style={{
        background: 'var(--bg-hover)',
        padding: '1rem',
        borderRadius: '50%',
        marginBottom: '1.5rem',
        color: 'var(--text-muted)'
      }}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h3 style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '1.25rem',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem'
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        maxWidth: '400px',
        marginBottom: actionLabel ? '1.5rem' : '0'
      }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
