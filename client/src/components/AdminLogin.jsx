import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './css/style.css';
import imgfolder from './img/core-img/logo-white.png';
import { useLoading } from '../context/LoadingProvider'; // adjust path as needed

const AdminLogin = () => {
  const { showLoader, hideLoader } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['adminemail']);

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoader(); // ✅ show global spinner
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
      hideLoader(); // ✅ hide spinner
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        padding: '20px'
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <div className="text-center mb-4">
          <img src={imgfolder} alt="Admin Logo" style={{ maxWidth: '150px' }} />
          <h4 className="mt-3" style={{ color: '#333', fontWeight: 'bold' }}>Admin Login</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="form-label" style={{ color: '#333', fontWeight: '500' }}>Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label" style={{ color: '#333', fontWeight: '500' }}>Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="test"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="btn w-100"
            style={{
              background: 'linear-gradient(to right, #fc4a1a, #f7b733)',
              color: 'white',
              fontWeight: '600',
              border: 'none'
            }}
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
