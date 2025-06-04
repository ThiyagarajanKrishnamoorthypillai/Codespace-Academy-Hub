import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from './img/logo/logo trademark.png';
import { useCookies } from 'react-cookie';
import AppFooter from './AppFooter'; // add this at the top
import AppHeader from './AppHeader';


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
    background: 'linear-gradient(to bottom, #e3f2fd, #f9f9ff)',
    borderRight: '2px solid #cfe2ff',
    overflowY: 'auto',
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
          className={`text-decoration-none px-3 py-2 rounded fw-medium ${
            location.pathname === path
              ? 'text-primary border-start border-4 border-primary bg-light'
              : 'text-dark'
          }`}
          style={{
            transition: 'all 0.2s ease-in-out',
            fontSize: '15px',
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

      {/* Sticky Footer Below Right Content Only */}
      <AppFooter />

    </>
  );
};

export default UserLayout;
