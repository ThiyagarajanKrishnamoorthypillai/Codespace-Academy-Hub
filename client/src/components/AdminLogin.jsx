import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './css/style.css'; // Add your styling imports
import imgfolder from './img/core-img/logo-white.png';

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
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="background-shape"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
            <img className="big-logo" src={imgfolder} alt="logo" />
            <div className="register-form mt-5 px-4">
              <form onSubmit={handleLogin}>
                <div className="form-group text-start mb-4">
                  <span>Email</span>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    required
                  />
                </div>
                <div className="form-group text-start mb-4">
                  <span>Password</span>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="test"
                    required
                  />
                </div>
                <button className="btn btn-warning btn-lg w-100" type="submit">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
