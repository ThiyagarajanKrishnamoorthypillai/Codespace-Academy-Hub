import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useLoading } from '../context/LoadingProvider';
import { showGlobalLoader, hideGlobalLoader } from '../utils/loaderControl';


const Login = () => {
  const [cookies, setCookie] = useCookies(['email', 'name', 'course']);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
  try {
    showGlobalLoader(); // ✅ show loader on start

    const decoded = jwtDecode(credentialResponse.credential);
    const { email, name } = decoded;

    setCookie('email', email, { path: '/', sameSite: 'Strict' });
    setCookie('name', name, { path: '/', sameSite: 'Strict' });
    localStorage.setItem('token', credentialResponse.credential);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });

    const result = await res.json();
    if (result.firstTime) {
      navigate('/select_course');
    } else {
      setCookie('course', result.user.course, { path: '/', sameSite: 'Strict' });
      navigate('/user_home');
    }
  } catch (error) {
    alert("Login failed");
  } finally {
    hideGlobalLoader(); // ✅ hide loader after all
  }
};


  return (
    <GoogleOAuthProvider clientId="502137770921-hge1c2omjad4e3r0t2prrg1cfn3705cm.apps.googleusercontent.com">
      <AppHeader />
      <div
  className="container d-flex align-items-center justify-content-center"
  style={{
    minHeight: 'calc(100vh - 128px)',
    background: 'linear-gradient(to right, #d6e6f2, #f0f4ff)'
  }}
>
  <div className="w-100" style={{ maxWidth: '400px' }}>
    <div
  className="p-4 bg-white rounded-4 shadow-sm text-center"
  style={{
    transition: 'all 0.3s ease',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fdfdfd'
  }}
>
  <h5 className="mb-4 fw-bold text-secondary" style={{ fontSize: '1.25rem' }}>
    Sign in with Google
  </h5>

  <div
    className="p-2 rounded-3 d-inline-block"
    style={{
      border: '1px solid #d6d6d6',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'scale(1.02)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Login failed")}
    />
  </div>

  <p className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
    Your Google account is safe and never shared.
  </p>
</div>

  </div>
</div>

      <AppFooter />
    </GoogleOAuthProvider>
  );
};

export default Login;
