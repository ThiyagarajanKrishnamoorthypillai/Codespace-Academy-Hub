import React from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgBack from "./img/bg-img/wall.jpg";
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff" }}>
      
      <AppHeader />

      <main style={{ flex: 1, marginBottom: '40px' }} className="d-flex align-items-center justify-content-center text-center">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            width: "80%",
            height: "65vh",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div
            style={{
              flex: 1,
              height: "100%",
              backgroundImage: `url(${imgBack})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></div>

          <div 
            className="d-flex flex-column align-items-center justify-content-center px-5" 
            style={{ 
              flex: 1, 
              height: "100%", 
              background: "rgba(240, 240, 240, 0.4)", 
              borderTopRightRadius: "16px", 
              borderBottomRightRadius: "16px" 
            }}
          >

            <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
              <Link 
                to="/user_login"
                className="text-decoration-none"
                style={{
                  color: "#007bff", // changed to nice blue
                  fontWeight: "600",
                  fontSize: "20px",
                  textDecoration: "underline",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={e => e.target.style.color = "#0056b3"}
                onMouseLeave={e => e.target.style.color = "#007bff"}
              >
                Student Login &rarr;
              </Link>
            </div>

          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;










{/*
import React from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgBack from "./img/bg-img/wall.jpg";
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff" }}>
      
      <AppHeader />

      <main style={{ flex: 1, marginBottom: '40px' }} className="d-flex align-items-center justify-content-center text-center ">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            width: "80%",
            height: "65vh",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
          }}
        >
          <div
            style={{
              flex: 1,
              height: "100%",
              backgroundImage: `url(${imgBack})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></div>

          <div className="d-flex flex-column align-items-center justify-content-center px-5" style={{ flex: 1 }}>
            <h4 className="mb-4" style={{ textShadow: '0 0 8px rgba(0, 128, 0, 0.4)' }}>
              Choose your Login
            </h4>

            <div className="d-flex gap-4 flex-wrap">
              <Link to="/user_login" className="text-white" style={{
                background: "rgba(13, 163, 75)",
                width: "180px",
                padding: "12px 20px",
                borderRadius: "15px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}>Student Login</Link>

       <Link to="/admin_login" className="text-white" style={{
                backgroundColor: '#004080',
                width: "180px",
                padding: "12px 20px",
                borderRadius: "15px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}>Admin Login</Link>

              <Link to="/committee_login" className="text-white" style={{
                backgroundColor: '#8e44ad',
                width: "180px",
                padding: "12px 20px",
                borderRadius: "15px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}>Committee Login</Link>

              <Link to="/tutor_login" className="text-white" style={{
                backgroundColor: '#e67e22',
                width: "180px",
                padding: "12px 20px",
                borderRadius: "15px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}>Tutor Login</Link>

            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;
*/}