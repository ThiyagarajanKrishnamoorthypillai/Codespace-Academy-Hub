import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";


const Login = () => {
  const [cookies, setCookie] = useCookies(['email', 'name', 'course']);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
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
  };

  return (
    <GoogleOAuthProvider clientId="502137770921-hge1c2omjad4e3r0t2prrg1cfn3705cm.apps.googleusercontent.com">
      <AppHeader />
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: 'calc(100vh - 128px)',
          background: 'linear-gradient(to right, #d6e6f2, #f0f4ff)'
        }}
      >
        <div className="p-4 bg-white shadow rounded" style={{ width: '100%', maxWidth: '400px' }}>
          <h5 className="mb-3 text-primary fw-semibold">Login with Google</h5>
          <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Login failed")} />
        </div>
      </div>
      <AppFooter />
    </GoogleOAuthProvider>
  );
};

export default Login;
