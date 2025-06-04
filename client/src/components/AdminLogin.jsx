import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";


const AdminLogin = () => {
  const [cookies, setCookie] = useCookies(['adminemail']);
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { email, name } = decoded;

    localStorage.setItem("token", credentialResponse.credential);
    setCookie("adminemail", email, { path: '/', sameSite: 'Strict' });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name })
      });

      if (res.ok) {
        window.location.href = "/admin_home";
      } else {
        alert("Access denied: Not an authorized admin.");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="502137770921-hge1c2omjad4e3r0t2prrg1cfn3705cm.apps.googleusercontent.com">
      <AppHeader />
      <div
  className="container d-flex align-items-center justify-content-center"
  style={{
    minHeight: 'calc(100vh - 100px)',
    background: 'linear-gradient(to right, rgb(167, 237, 240), rgb(151, 176, 190))'
  }}
>
  <div className="w-100" style={{ maxWidth: '400px' }}>
    <div className="p-4 bg-white shadow rounded text-center">
      <h5 className="mb-3 text-dark fw-semibold">Admin Login</h5>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => alert("Google Login failed")} />
    </div>
  </div>
</div>

      <AppFooter />
    </GoogleOAuthProvider>
  );
};

export default AdminLogin;
