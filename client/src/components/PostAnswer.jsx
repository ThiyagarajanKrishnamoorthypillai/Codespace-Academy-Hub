import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from './Title';
import { DateTime } from 'luxon';

const PostAnswer = () => {
  const [cookies] = useCookies(['email', 'course']);
  const dateCreated = DateTime.now().setZone('Asia/Kolkata').toISO();
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);


  const { date, course, images: questionImages, pdf } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  setShowConfirm(true); // Show modal instead of submitting directly

 };

    const confirmAndSubmit = async () => {
  setShowConfirm(false);
  setPendingSubmit(true);

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
  payload.append('dateCreated', dateCreated);
  payload.append('questionDateCreated', date);
  payload.append('questionCourse', course);
  payload.append('questionImages', JSON.stringify(questionImages));
  payload.append('pdf', JSON.stringify(pdf));
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
    navigate('/user_home');
  } catch (err) {
    console.error('Error uploading:', err);
    alert('Submission failed. Check console for details.');
  } finally {
    setPendingSubmit(false);
  }
};


  return (
    <div className="container mt-4 mb-5 px-3 px-sm-5">
      <Title title="Submit Your Answer" />
      <form onSubmit={handleSubmit} className="border rounded p-3 shadow bg-white">
        <div className="row g-3">
          <div className="col-md-6 col-12">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6 col-12">
            <label className="form-label">Student ID</label>
            <input type="text" name="stdid" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6 col-12">
            <label className="form-label">Department</label>
            <input type="text" name="dpt" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-md-6 col-12">
            <label className="form-label">College</label>
            <input type="text" name="college" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Upload Answer Images</label>
            <input type="file" multiple accept="image/*" className="form-control" onChange={handleFileChange} required />
          </div>
        </div>
       {showConfirm && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
  >
    <div className="bg-white p-4 rounded shadow" style={{ maxWidth: 400, width: '90%' }}>
      <h5 className="mb-3">Confirm Submission</h5>
      <p className="small">
        Please review all details carefully before submitting your answer for this question paper.<br />
        Once submitted, you will <b>not</b> be able to make any changes.
      </p>
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={confirmAndSubmit}
          disabled={pendingSubmit}
        >
          {pendingSubmit ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  </div>
)}

      </form>
    </div>
  );
};

export default PostAnswer;
