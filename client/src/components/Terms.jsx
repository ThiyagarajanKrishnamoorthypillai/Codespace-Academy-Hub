import React from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    navigate('/user_home');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f9ff 0%, #eaf2fb 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        padding: '40px',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#333',
        lineHeight: '1.7'
      }}>

        <h2 style={{ color: '#0d6efd', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
          Welcome to the Web Wizardry Bootcamp
        </h2>

        <p><strong>Powered by Codespace Solutions</strong><br />
        <a href="https://codespacesolutions.in" target="_blank" rel="noopener noreferrer">Codespacesolutions.in</a></p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Hello Future Developer!</h3>
        <p>You've just opened the door to a world of possibilities. For the next 15 days, you’re not just attending classes — you’re learning how to create websites, solve real-world problems, and build your own software!</p>
        <p>This isn’t just another assignment. This is your chance to prove to the world — and to yourself — that you can code, create, and shine.</p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>What Will You Learn?</h3>
        <p>By the end of this bootcamp, you will:</p>
        <ul>
          <li>Write HTML to build web pages</li>
          <li>Style with CSS like a creative pro</li>
          <li>Add smart logic using JavaScript</li>
          <li>Work as a team like IT professionals</li>
          <li>Finish a live mini project and present it like a techie!</li>
        </ul>
        <p>You’ll also learn how to:</p>
        <ul>
          <li>Upload tasks using a portal</li>
          <li>Think like a developer</li>
          <li>Record and present a demo like a confident coder</li>
        </ul>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Why Is This Important for You?</h3>
        <p>Whether you're from a city or a small town, from an arts background or not — you deserve a future in tech. This bootcamp gives you:</p>
        <ul>
          <li>Real-world project experience</li>
          <li>A strong certificate for your resume</li>
          <li>Confidence to crack internships & placements</li>
          <li>A project you can proudly show in interviews</li>
        </ul>
        <p style={{ fontStyle: 'italic' }}>“Skills don’t need background. They need courage. And you’ve got it.”</p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Who’s Behind This?</h3>
        <p>Codespace Solutions is a tech training platform built by industry mentors. We’re not here to teach you boring theory — we’re here to help you build, test, and grow.</p>
        <p>Think of us as your friendly tech mentors — guiding you from “I don’t know coding” to “I built this myself!”</p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Ready to Begin?</h3>
        <p>Your tools are ready.<br />Your team is ready.<br />Your future is waiting.</p>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={handleAccept}
            style={{
              background: '#0d6efd',
              color: '#fff',
              padding: '16px 50px',
              fontSize: '1.2rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.target.style.background = '#084298'}
            onMouseOut={e => e.target.style.background = '#0d6efd'}
          >
            Click “Accept & Start My Journey” to enter the Web Tech Bootcamp!
          </button>
        </div>

        <p style={{ marginTop: '30px', fontStyle: 'italic', textAlign: 'center' }}>
          “All great developers started by clicking one button. This is yours.”
        </p>

      </div>
    </div>
  );
};

export default Terms;
