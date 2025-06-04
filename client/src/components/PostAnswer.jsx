import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const PostAnswer = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'email', 'course']);
  const [formData, setFormData] = useState({
    name: '',
    stdid: '',
    dpt: '',
    status: 'Pending',
  });
  const [answerImages, setAnswerImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setAnswerImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cookies.email || !cookies.course) {
      toast.error('Login and select a course before submitting.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('stdid', formData.stdid);
    data.append('dpt', formData.dpt);
    data.append('email', cookies.email);
    data.append('course', cookies.course);
    data.append('status', formData.status);
    answerImages.forEach((file) => data.append('answerImages', file));

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/answer`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      toast.success('Answer submitted successfully');
      navigate('/view_answer_user');
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Submission failed');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-primary mb-4">Submit Your Answer</h3>
      <form onSubmit={handleSubmit} className="bg-light p-4 shadow rounded">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Student ID</label>
          <input
            type="text"
            className="form-control"
            name="stdid"
            value={formData.stdid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="dpt"
            value={formData.dpt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="On-Progress">On-Progress</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Answer Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Submit Answer</button>
      </form>
    </div>
  );
};

export default PostAnswer;