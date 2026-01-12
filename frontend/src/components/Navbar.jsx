import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Sparkles size={24} color="#00e5ff" />
        <span className="logo" style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>
          CareerForge <span style={{ color: '#00e5ff' }}>AI</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>
    </nav>
  );
};

const styles = {
  link: {
    marginLeft: '32px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease'
  }
};

export default Navbar;