import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from '../utils/axiosInstance';
import './css/style.css';
import imgfolder from './img/core-img/logo-white.png';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const TutorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['tutoremail', 'tutorcourse']);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tutor/login`, {
        email,
        password
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setCookie('tutoremail', res.data.tutor, { path: '/', sameSite: 'strict' });
        setCookie('tutorcourse', res.data.course, { path: '/', sameSite: 'strict' });
        alert("Tutor Login Successful");
        window.location.href = '/tutor_home';
      }
    } catch (err) {
      alert(err.response?.data || "Login Failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f4f6f9' }}>
      <div className="w-100">
        <AppHeader />
      </div>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', background: 'linear-gradient(to right, #e3f2fd, #ede7f6)' }}>
        <div className="p-4 shadow" style={{ maxWidth: '360px', width: '100%', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)' }}>
          <div className="text-center mb-4">
            <img src={imgfolder} alt="Tutor Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            <h5 className="mt-3 text-dark fw-semibold">Tutor Login</h5>
          </div>

          <form onSubmit={handleLogin} autoComplete="off">
            <div className="form-group mb-3">
              <label className="form-label text-dark">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="fa fa-envelope"></i></span>
                <input type="email" className="form-control" placeholder="Enter tutor email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-email" />
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label text-dark">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="fa fa-lock"></i></span>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
              </div>
            </div>

            <button className="btn w-100 fw-bold text-white" style={{ background: 'linear-gradient(to right, #e67e22, #d35400)', border: 'none' }}>
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

export default TutorLogin;
