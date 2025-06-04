// src/components/AppFooter.jsx
import React from 'react';

const AppFooter = () => {
  return (
    <footer
      className="d-flex justify-content-between align-items-center px-4 py-2 bg-white border-top shadow-sm"
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        height: '48px',
      }}
    >
      <span className="text-muted">© Codespace Solutions | All Rights Reserved</span>
      <span className="text-muted">
        
        <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://in.linkedin.com/company/codespace-solutions&ved=2ahUKEwjqpvaZxNeNAxUTh68BHWrCNKEQjjh6BAgdEAE&usg=AOvVaw0IF9suw-kMgOp1NjNq4hR7" className="text-decoration-none text-muted me-3" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        v1.0.0
      </span>
    </footer>
  );
};

export default AppFooter;
