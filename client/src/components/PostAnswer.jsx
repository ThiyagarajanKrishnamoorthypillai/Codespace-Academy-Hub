// ✅ PostAnswer.jsx
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const PostAnswer = () => {
  const [formData, setFormData] = useState({ name: '', stdid: '', dpt: '', status: 'Pending' });
  const [images, setImages] = useState([]);
  const [cookies] = useCookies(['email', 'course']);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    images.forEach((file) => uploadData.append('answerImages', file));
    uploadData.append('name', formData.name);
    uploadData.append('stdid', formData.stdid);
    uploadData.append('dpt', formData.dpt);
    uploadData.append('status', formData.status);
    uploadData.append('email', cookies.email);
    uploadData.append('course', cookies.course);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/answer`, uploadData);
      alert('Answer submitted successfully');
    } catch (err) {
      console.error('Error uploading:', err);
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
      <input type="text" name="stdid" placeholder="Student ID" onChange={handleInputChange} required />
      <input type="text" name="dpt" placeholder="Department" onChange={handleInputChange} required />
      <select name="status" onChange={handleInputChange} defaultValue="Pending">
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="On-Progress">On-Progress</option>
      </select>
      <input type="file" name="answerImages" multiple onChange={handleFileChange} accept="image/*" required />
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default PostAnswer;