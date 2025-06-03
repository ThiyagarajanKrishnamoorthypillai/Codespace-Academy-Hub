import React from 'react';
import logo from './img/logo/logo trademark.png';

const AppHeader = () => {
  return (
    <header
      className="d-flex align-items-center px-4 bg-white border-bottom shadow-sm"
      style={{
        height: '70px',
        fontFamily: 'Poppins, sans-serif',
        zIndex: 998
      }}
    >
      <img src={logo} alt="Logo" style={{ height: '80px' }} /> 
      <div className="ms-auto">
    <h6 className="mb-0 ">Codespace Academy Hub</h6>
  </div>
    </header>
  );
};

export default AppHeader;
