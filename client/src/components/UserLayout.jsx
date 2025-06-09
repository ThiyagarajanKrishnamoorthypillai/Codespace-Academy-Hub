import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from './img/logo/logo trademark.png';
import { useCookies } from 'react-cookie';
import AppHeader from '../components/AppHeader';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
const [cookies, setCookie, removeCookie] = useCookies();

const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    // Clear all relevant cookies
    removeCookie("email", { path: '/' });
    removeCookie("adminemail", { path: '/' });
    removeCookie("name", { path: '/' });
    removeCookie("course", { path: '/' });

    // Clear token
    localStorage.removeItem("token");

    // Navigate to home page
    navigate('/');
  }
};
  const navItems = [
    { path: '/user_home', label: 'Home' },
    { path: '/user_home/view_question_user', label: 'View Question Paper' },
    { path: '/user_home/view_feedback_user', label: 'View Feedback' },
    { path: '/user_home/view_answer_user', label: 'View My Answer' },
    { path: '/user_home/view_marks_user', label: 'View My Marks' },
    { path: '/user_home/user_profile', label: 'My Profile' }
  ];

  return (
    
    <>
      {/* Sidebar */}
<div
  className="d-flex flex-column justify-content-between"
  style={{
    width: '300px',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    background: 'linear-gradient(to bottom right,rgb(255, 255, 255),rgb(243, 244, 255))',
    borderRight: '1px solid #dee2e6',
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
    fontFamily: 'Poppins, sans-serif',
  }}
>

  <div>
    <div className="text-center mb-4 pt-4">
      <img src={logo} alt="Logo" style={{ width: '80%' }} />
      <h6 className="mt-2 text-dark fw-semibold">Codespace Academy Hub</h6>
    </div>

    <nav className="d-flex flex-column gap-2 px-3">
      {navItems.map(({ path, label }) => (
   <Link
  key={path}
  to={path}
  className="text-decoration-none px-3 py-2 rounded fw-medium"
  style={{
    transition: 'all 0.4s ease',
    transform: 'scale(1)',
    fontSize: '15px',
    color: location.pathname === path ? '#673ab7' : '#212529',
    backgroundColor: location.pathname === path ? '#f5efff' : 'transparent',
    borderLeft: location.pathname === path ? '4px solid #673ab7' : '4px solid transparent',
    fontWeight: location.pathname === path ? '600' : '500',
  }}
  onMouseOver={(e) => {
    if (location.pathname !== path) {
      e.currentTarget.style.backgroundColor = '#f5efff';
      e.currentTarget.style.color = '#0d6efd'; // ✅ Blue on hover
      e.currentTarget.style.borderLeft = '4px solid #673ab7';
      e.currentTarget.style.transform = 'scale(1.03)';
    }
  }}
  onMouseOut={(e) => {
    if (location.pathname !== path) {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#212529';
      e.currentTarget.style.borderLeft = '4px solid transparent';
      e.currentTarget.style.transform = 'scale(1)';
    }
  }}
>
  {label}
</Link>






      ))}
    </nav>
  </div>

  <div className="text-center p-3">
    <button
      onClick={handleLogout}
      className="btn text-danger text-decoration-underline fw-semibold w-100"
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        transition: 'background-color 0.2s ease-in-out',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fcebea')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      Logout
    </button>
  </div>
</div>


      {/* Right Content */}
      <div
        className="d-flex flex-column"
        style={{
          marginLeft: '300px',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          padding: '24px',
          paddingBottom: '70px', // space for fixed footer
        }}
      > <AppHeader />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <button
            className="btn btn-outline-secondary mb-3 d-md-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>
          <Outlet />
        </div>
      </div>

      {/* Sticky Footer under dashboard only */}
      <footer
        className="d-flex justify-content-between align-items-center px-4 py-2 bg-white border-top shadow-sm"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          position: 'fixed',
          bottom: 0,
          left: '300px',
          right: 0,
          height: '48px',
          zIndex: 999,
        }}
      >
        <span className="text-muted">© Codespace Solutions | All Rights Reserved</span>
        <span className="text-muted">
         {/* <a
            href="https://www.instagram.com/codespace"
            className="text-decoration-none text-muted me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>*/}
          <a
            href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://in.linkedin.com/company/codespace-solutions&ved=2ahUKEwjqpvaZxNeNAxUTh68BHWrCNKEQjjh6BAgdEAE&usg=AOvVaw0IF9suw-kMgOp1NjNq4hR7"
            className="text-decoration-none text-muted me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          v1.0.0
        </span>
      </footer>
  

    </>
  );
};

export default UserLayout;
