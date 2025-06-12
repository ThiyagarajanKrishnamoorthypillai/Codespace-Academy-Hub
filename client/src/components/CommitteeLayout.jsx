import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from './img/logo/logo trademark.png';
import { useCookies } from 'react-cookie';
import AppHeader from '../components/AppHeader';

const CommitteeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      removeCookie("committeeemail", { path: '/' });
      localStorage.removeItem("token");
      navigate('/');
    }
  };

  const navItems = [
    { path: '/committee_home', label: 'Committee Home' },
    { path: '/committee_home/start_session', label: 'Duration' },
    { path: '/committee_home/post_question', label: 'Add Question Papers' },
    { path: '/committee_home/view_question_admin', label: 'View & Update Question Papers' },
    { path: '/committee_home/view_answer_admin', label: "View Student's Answer Sheet" },
    { path: '/committee_home/view_feedback_admin', label: "View Student's Doubts" },
    { path: '/committee_home/post_mark_admin', label: 'Add Marks' },
    { path: '/committee_home/view_marks_admin', label: 'View Marks' },
    { path: '/committee_home/view_user_admin', label: 'View Student Profile' },
    { path: '/committee_home/admin_profile', label: 'My Profile' }
  ];

  return (
    <>
      <div className="d-flex flex-column justify-content-between bg-white border-end px-4 py-4 shadow-sm"
        style={{ width: '300px', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000, overflowY: 'auto' }}>
        <div>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ width: '500px' }} />
            <h6 className="mt-1 text-dark">Committee Panel</h6>
          </div>

          <nav className="d-flex flex-column gap-3 mb-5">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path}
                className={`text-decoration-none px-2 py-2 rounded fw-medium ${
                  location.pathname === path
                    ? 'text-primary border-start border-4 border-primary bg-light'
                    : 'text-dark'
                }`}
                style={{ paddingLeft: '1rem' }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <button onClick={handleLogout}
            className="btn w-100 text-danger fw-semibold py-2 px-3 rounded-pill logout-btn"
            style={{ backgroundColor: '#f8d7da', border: '1px solid #f5c2c7' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="d-flex flex-column"
        style={{ marginLeft: '300px', minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '24px' }}>
        <AppHeader />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CommitteeLayout;
