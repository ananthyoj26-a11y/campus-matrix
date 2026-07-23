import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import Card, { CardBody } from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  color?: string; // e.g., 'var(--color-primary)'
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color = 'var(--color-primary)'
}) => {
  return (
    <Card hoverable>
      <CardBody>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              marginBottom: '0.5rem' 
            }}>{title}</p>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: 'var(--text-primary)',
              margin: 0
            }}>{value}</h3>
            
            {change !== undefined && trend && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem',
                marginTop: '0.75rem',
                fontSize: '0.875rem',
                color: trend === 'up' ? 'var(--color-emerald)' : 'var(--color-danger)'
              }}>
                {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{Math.abs(change)}%</span>
                <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
              </div>
            )}
          </div>
          
          <div style={{
            background: `color-mix(in srgb, ${color} 15%, transparent)`,
            padding: '0.75rem',
            borderRadius: '12px',
            color: color
          }}>
            <Icon size={24} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
