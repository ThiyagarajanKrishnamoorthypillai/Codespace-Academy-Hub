import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from './img/logo/logo trademark.png';
import { useCookies } from 'react-cookie';


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
        className="d-flex flex-column justify-content-between bg-white border-end px-4 py-4 shadow-sm"
        style={{
          width: '300px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <div>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ width: '500px' }} />
            <h6 className="mt-1  text-dark">Codespace Academy Hub</h6>
          </div>

          <nav className="d-flex flex-column gap-3 mb-5">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-decoration-none px-2 py-2 rounded fw-medium ${
                  location.pathname === path
                    ? 'text-primary border-start border-4 border-primary bg-light'
                    : 'text-dark'
                }`}
                style={{
                  transition: 'all 0.2s ease-in-out',
                  paddingLeft: '1rem'
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="btn w-100 text-danger fw-semibold py-2 px-3 rounded-pill logout-btn"
            style={{
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c2c7',
              transition: 'all 0.2s ease-in-out',
              textAlign: 'center',
            }}
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
      >
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

      {/* Sticky Footer Below Right Content Only */}
      <footer
        className="d-flex justify-content-between align-items-center px-4 py-2 bg-white border-top shadow-sm"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          position: 'fixed',
          bottom: 0,
          left: '300px', // starts after sidebar
          right: 0,
          height: '48px',
          zIndex: 999,
        }}
      >
        <span className="text-muted">© Codespace Solutions | All Rights Reserved</span>
        <span className="text-muted">
          <a
            href="https://www.instagram.com/codespace"
            className="text-decoration-none text-muted me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/codespace"
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
