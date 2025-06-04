// ✅ UPDATED FILE: PostAnswer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from './Title';

const PostAnswer = () => {
  const [cookies] = useCookies(['email', 'course']);
  const [formData, setFormData] = useState({
    name: '',
    stdid: '',
    dpt: '',
    college: '',
    status: 'Pending'
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { date, course, images: questionImages } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Not authenticated.');
      return;
    }

    const payload = new FormData();
    payload.append('useremail', cookies.email);
    payload.append('course', cookies.course);
    payload.append('college', formData.college);
    payload.append('name', formData.name);
    payload.append('stdid', formData.stdid);
    payload.append('dpt', formData.dpt);
    payload.append('status', formData.status);
    payload.append('dateCreated', new Date().toISOString());
    payload.append('questionDateCreated', date);
    payload.append('questionCourse', course);
    payload.append('questionImages', JSON.stringify(questionImages));

    images.forEach((img) => payload.append('images', img));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/answer`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
          }
        }
      );
      alert('Answer submitted successfully!');
      navigate('/view_answer_user');
    } catch (err) {
      console.error('Error uploading:', err);
      alert('Submission failed. Check console for details.');
    } finally {
      setUploading(false);
    }
  };console.log(localStorage.getItem('token'));


  return (
    <div className="container mt-5 mb-5">
      <Title title="Submit Your Answer" />
      <form onSubmit={handleSubmit} className="border rounded p-4 shadow bg-white">
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Student ID</label>
            <input type="text" name="stdid" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Department</label>
            <input type="text" name="dpt" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>College</label>
            <input type="text" name="college" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select name="status" className="form-control" onChange={handleChange} required>
            
          </select>
        </div>
        <div className="mb-3">
          <label>Upload Answer Images</label>
          <input type="file" multiple accept="image/*" className="form-control" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={uploading}>
          {uploading ? 'Submitting...' : 'Submit Answer'}
        </button>
      </form>
    </div>
  );
};

export default PostAnswer;
