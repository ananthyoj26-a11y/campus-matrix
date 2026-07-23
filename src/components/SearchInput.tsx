import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  className = ''
}) => {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className={className}>
      <Search 
        size={18} 
        style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '0.75rem 2.5rem 0.75rem 2.75rem',
          color: 'var(--text-primary)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'all 0.2s ease'
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '3rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
      <div style={{
        position: 'absolute',
        right: '1rem',
        background: 'var(--bg-hover)',
        padding: '0.2rem 0.4rem',
        borderRadius: '4px',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        fontWeight: 600,
        pointerEvents: 'none'
      }}>
        Ctrl K
      </div>
    </div>
  );
};

export default SearchInput;
