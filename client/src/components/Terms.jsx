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
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f0fa 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '40px',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#333'
      }}>
        <h2 style={{ color: '#0d6efd', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
          Welcome to Web Wizardry Bootcamp
        </h2>

        <p><strong>Powered by Codespace Solutions</strong> | <a href="https://codespacesolutions.in" target="_blank" rel="noopener noreferrer">Visit Website</a></p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>About The Bootcamp</h3>
        <p>
          Over the next 15 days, you'll learn how to create websites, solve real-world problems,
          and build your own software products. This is your opportunity to strengthen your skills
          and gain real project experience.
        </p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>What You'll Learn</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Write HTML to build web pages</li>
          <li>Style beautifully using CSS</li>
          <li>Add dynamic logic with JavaScript</li>
          <li>Collaborate like industry professionals</li>
          <li>Complete and present a live mini project</li>
          <li>Upload tasks on the portal</li>
          <li>Think like a real developer</li>
          <li>Present your work confidently</li>
        </ul>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Why This Matters</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Real-world project experience</li>
          <li>Strong certification for your resume</li>
          <li>Confidence for internships & placements</li>
          <li>A portfolio project you can showcase in interviews</li>
        </ul>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Meet Your Mentors</h3>
        <p>
          Codespace Solutions is built by industry professionals. Our mentors guide you beyond theory,
          helping you build, test, and grow your skills for the real world.
        </p>

        <h3 style={{ color: '#222', marginTop: '30px' }}>Start Your Journey</h3>
        <p>Your resources are ready. Your mentors are ready. Your future starts now.</p>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={handleAccept}
            style={{
              background: '#0d6efd',
              color: '#fff',
              padding: '15px 40px',
              fontSize: '1.2rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
            onMouseOver={e => e.target.style.background = '#084298'}
            onMouseOut={e => e.target.style.background = '#0d6efd'}
          >
            Accept & Start My Bootcamp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
