import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Map as MapIcon, Layers, Book, Coffee, Home, Activity } from 'lucide-react';
import './CampusMapPage.css';

const CATEGORIES = [
  { id: 'academic', label: 'Academic Blocks', color: '#3b82f6', icon: Book },
  { id: 'hostel', label: 'Hostels', color: '#10b981', icon: Home },
  { id: 'sports', label: 'Sports Complex', color: '#f59e0b', icon: Activity },
  { id: 'admin', label: 'Admin Block', color: '#8b5cf6', icon: Layers },
  { id: 'amenities', label: 'Amenities', color: '#ec4899', icon: Coffee },
];

const BUILDINGS = [
  { id: 'cs-dept', name: 'Computer Science Dept', category: 'academic', col: '2/4', row: '2/4', floors: 5 },
  { id: 'ec-dept', name: 'Electronics Dept', category: 'academic', col: '5/7', row: '2/4', floors: 4 },
  { id: 'mech-dept', name: 'Mechanical Dept', category: 'academic', col: '8/10', row: '2/4', floors: 3 },
  { id: 'main-admin', name: 'Main Administrative Block', category: 'admin', col: '4/8', row: '5/7', floors: 2 },
  { id: 'boys-hostel', name: 'Boys Hostel A', category: 'hostel', col: '2/4', row: '8/10', floors: 6 },
  { id: 'girls-hostel', name: 'Girls Hostel A', category: 'hostel', col: '8/10', row: '8/10', floors: 6 },
  { id: 'sports-arena', name: 'Indoor Stadium', category: 'sports', col: '1/3', row: '5/7', floors: 1 },
  { id: 'cafeteria', name: 'Central Cafeteria', category: 'amenities', col: '5/6', row: '7/8', floors: 2 },
  { id: 'library', name: 'Central Library', category: 'academic', col: '6/8', row: '7/9', floors: 4 },
];

export default function CampusMapPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  return (
    <div className="map-container">
      <div className="map-sidebar">
        <h3>Campus Navigator</h3>
        <div className="map-search">
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search buildings..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div className="category-list">
          <button 
            className={`map-category-btn ${activeCategory === null ? 'active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapIcon size={18} /> All Buildings
            </div>
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              className={`map-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <cat.icon size={18} /> {cat.label}
              </div>
              <div className="color-indicator" style={{ backgroundColor: cat.color }} />
            </button>
          ))}
        </div>
      </div>

      <div className="map-area">
        <div className="css-map">
          {BUILDINGS.filter(b => b.name.toLowerCase().includes(search.toLowerCase())).map((b) => {
            const cat = CATEGORIES.find(c => c.id === b.category);
            const isFaded = activeCategory && activeCategory !== b.category;
            
            return (
              <motion.div
                key={b.id}
                className="building-block"
                style={{
                  gridColumn: b.col,
                  gridRow: b.row,
                  backgroundColor: cat?.color || '#cbd5e1',
                  opacity: isFaded ? 0.2 : 1,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <div style={{ fontSize: '0.8rem', textAlign: 'center', padding: '4px' }}>
                  {b.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="building-tooltip">
                  <h4>{b.name}</h4>
                  <p>Category: {cat?.label}</p>
                  <p>Floors: {b.floors}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
