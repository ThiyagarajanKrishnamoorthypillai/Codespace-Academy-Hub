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
      backgroundColor: '#f4f6f9', // ✅ Light background
    }}
  >
    <div className="w-100">
      <AppHeader />
    </div>

   <div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: '70vh',         // ✅ Full screen height
    overflow: 'hidden',         // ✅ Prevent scrollbars
    margin: 0,
    padding: 0,
    background: 'linear-gradient(to right, #e3f2fd, #ede7f6)', // optional light bg
  }}
>
  <div
    className="p-4 shadow"
    style={{
      maxWidth: '360px',
      width: '100%',
      borderRadius: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    }}
  >
    <div className="text-center mb-4">
      <img
        src={imgfolder}
        alt="Admin Logo"
        style={{
          width: '60px', // ✅ Smaller image
          height: '60px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
        }}
      />
      <h5 className="mt-3 text-dark fw-semibold">Admin Login</h5>
    </div>

    <form onSubmit={handleLogin} autoComplete="off">
      <div className="form-group mb-3">
        <label className="form-label text-dark">Email</label>
        <div className="input-group">
          <span className="input-group-text bg-white"><i className="fa fa-envelope"></i></span>
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
        <label className="form-label text-dark">Password</label>
        <div className="input-group">
          <span className="input-group-text bg-white"><i className="fa fa-lock"></i></span>
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
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          border: 'none',
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
