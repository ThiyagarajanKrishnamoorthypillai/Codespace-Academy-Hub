import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from '../utils/axiosInstance';
import './css/style.css';
import imgfolder from './img/core-img/logo-white.png';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['adminemail']);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, {
        email,
        password
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setCookie('adminemail', email, { path: '/', sameSite: 'strict' });
        alert("Login Successful");
        window.location.href = '/admin_home';
      }
    } catch (err) {
      alert(err.response?.data || "Login Failed");
    }finally {
    }
  };


      return (
   <div
    className="min-vh-100 d-flex flex-column"
    style={{
      background: `linear-gradient(135deg, rgba(106, 17, 203, 0.5), rgba(37, 117, 252, 0.5))`,
      backgroundSize: 'cover',
      overflow: 'hidden',
    }}
  >
    <div className="w-100">
      <AppHeader />
    </div>

    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      <div
        className="p-4 shadow"
        style={{
          maxWidth: '420px',
          width: '100%',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        }}
      >
        <div className="text-center mb-4">
          <img
            src={imgfolder}
            alt="Admin Logo"
            style={{ width: '100px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          />
          <h4 className="mt-3 text-white fw-semibold">Admin Login</h4>
        </div>

        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group mb-3">
            <label className="form-label text-light">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="fa fa-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="new-email"
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label text-light">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><i className="fa fa-lock"></i></span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            className="btn w-100 fw-bold text-white"
            style={{
              background: 'linear-gradient(to right, #fc4a1a, #f7b733)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>

    <div className="w-100">
      <AppFooter />
    </div>
  </div>
);
 
};

export default AdminLogin;
