import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // ✅ Make sure this is imported
import { useNavigate } from 'react-router-dom';

const PostMarkAdmin = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [imageMark, setImageMark] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/answer/`)
      .then(res => setAnswers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    if (!selectedId || !imageMark) return alert('All fields required');

    const formData = new FormData();
    formData.append('answerId', selectedId);
    formData.append('imageMark', imageMark);

    // ✅ Correct way to get the cookie value
const adminEmailFromCookie = Cookies.get('adminemail');
if (!adminEmailFromCookie) return alert("Admin email not found in cookies");

formData.append('adminemail', adminEmailFromCookie);


    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/mark/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }); 
      alert('Mark posted successfully');
      navigate('/admin_home');

      setSelectedId('');
      setImageMark(null);
    } catch (error) {
      console.error(error);
      alert('Failed to post mark');
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Post Mark</h4>

      <div className="mb-3">
        <label>Select Answer</label>
        <select className="form-control" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select</option>
          {answers.map(ans => (
            <option key={ans._id} value={ans._id}>
              {ans.name} - {ans.course}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Image Mark</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImageMark(e.target.files[0])}
          accept="image/*"
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>Post Mark</button>
    </div>
  );
};

export default PostMarkAdmin;
