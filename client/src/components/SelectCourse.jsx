import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SelectCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [cookies, setCookie] = useCookies(['email', 'name', 'course']);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedCourse) {
      alert('Please select a course');
      return;
    }

    const email = cookies.email;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/update-course`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, course: selectedCourse })
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      setCookie('course', selectedCourse, { path: '/', sameSite: 'Strict' });
      
      const termsAccepted = localStorage.getItem('termsAccepted');
if (!termsAccepted) {
  navigate('/terms');
} else {
  navigate('/user_home');
}

    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course. Try again.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h4 className="mb-3">Select Your Course</h4>
        <select
          className="form-select mb-3"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select a Course --</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="MERN Full Stack Development">MERN Full Stack Development</option>
          <option value="MEAN Full Stack Development">MEAN Full Stack Development</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Web Development">Web Development</option>
          <option value="React Native">React Native</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Data Base">Data Bases</option>
          <option value="Fundamentals of Web Technology">Fundamentals of Web Technology</option>
          
        </select>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectCourse;