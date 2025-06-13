import React from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    // Set the localStorage flag to mark terms accepted
    localStorage.setItem('termsAccepted', 'true');
    navigate('/user_home');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>🎓 Welcome to the Web Wizardry Bootcamp!</h2>
      <p>Powered by 🔧 <b>Codespace Solutions</b><br/> <a href="https://codespacesolutions.in" target="_blank" rel="noopener noreferrer">Codespacesolutions.in</a></p>

      <h3>🌟 Hello Future Developer!</h3>
      <p>You've just opened the door to a world of possibilities. For the next 15 days, you’re not just attending classes — you’re learning how to create websites, solve real-world problems, and build your own software!</p>
      <p>This isn’t just another assignment. 🎯 This is your chance to prove to the world — and to yourself — that you can code, create, and shine.</p>

      <h4>🚀 What Will You Learn?</h4>
      <ul>
        <li>🔤 Write HTML to build web pages</li>
        <li>🎨 Style with CSS like a creative pro</li>
        <li>💡 Add smart logic using JavaScript</li>
        <li>🧑‍💻 Work as a team like IT professionals</li>
        <li>🏁 Finish a live mini project and present it like a techie!</li>
        <li>📥 Upload tasks using a portal</li>
        <li>🧠 Think like a developer</li>
        <li>🎤 Record and present a demo like a confident coder</li>
      </ul>

      <h4>🧭 Why Is This Important for You?</h4>
      <ul>
        <li>✅ Real-world project experience</li>
        <li>✅ A strong certificate for your resume</li>
        <li>✅ Confidence to crack internships & placements</li>
        <li>✅ A project you can proudly show in interviews</li>
      </ul>

      <p>“Skills don’t need background. They need courage. And you’ve got it.” 💪</p>

      <h4>👨‍🏫 Who’s Behind This?</h4>
      <p>Codespace Solutions is a tech training platform built by industry mentors.  
      We’re not here to teach you boring theory — we’re here to help you build, test, and grow.</p>
      <p>Think of us as your friendly tech mentors — guiding you from “I don’t know coding 😟” to “I built this myself! 😎”</p>

      <h3>🥳 Ready to Begin?</h3>
      <p>Your tools are ready.<br/>
         Your team is ready.<br/>
         Your future is waiting.</p>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleAccept}
          style={{
            background: '#4CAF50',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          👉🎉 Accept & Start My Journey
        </button>
      </div>

      <p style={{ marginTop: '30px', fontStyle: 'italic', textAlign: 'center' }}>
        🧠 “All great developers started by clicking one button. This is yours.”
      </p>
    </div>
  );
};

export default Terms;
