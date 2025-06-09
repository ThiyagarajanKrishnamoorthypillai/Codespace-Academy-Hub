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
    className="vh-100 overflow-hidden"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(rgba(106, 17, 203, 0.6), rgba(37, 117, 252, 0.6))`,
    }}
  >
    <AppHeader />
    <div
      className="card p-4 shadow-lg"
      style={{
        width: '100%',
        maxWidth: '400px',
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1,
      }}
    >
      <div className="text-center mb-4">
        <img src={imgfolder} alt="Admin Logo" style={{ maxWidth: '120px' }} />
        <h4 className="mt-3" style={{ color: '#333', fontWeight: 'bold' }}>Admin Login</h4>
      </div>
      <form onSubmit={handleLogin} autoComplete="off">
        <div className="form-group mb-3">
          <label className="form-label">Email</label>
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
          <label className="form-label">Password</label>
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

        <button className="btn w-100 text-white fw-bold" style={{ background: 'linear-gradient(to right, #fc4a1a, #f7b733)' }}>
          Log In
        </button>
      </form>
    </div>
    <AppFooter />
  </div>
);
 
};

export default AdminLogin;
