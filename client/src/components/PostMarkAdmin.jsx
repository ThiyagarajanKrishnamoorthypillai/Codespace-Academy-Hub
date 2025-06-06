import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PostMarkAdmin = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [imageMark, setImageMark] = useState([]);
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/answer/`, {
      withCredentials: true,
    })
      .then(res => setAnswers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleImageChange = (e) => {
    setImageMark([...e.target.files]);
  };

  const handleSubmit = async () => {
    if (!selectedId || imageMark.length === 0) {
  alert('Please select an answer and upload at least one image');
  return;
}

    const adminEmailFromCookie = Cookies.get('adminemail');
    if (!adminEmailFromCookie) return alert("Admin email not found in cookies");

    const formData = new FormData();
    formData.append('answerId', selectedId);
    formData.append('adminemail', adminEmailFromCookie);
    imageMark.forEach(file => formData.append('imageMark', file));
setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/mark/post`, formData, {
        headers: {
          
          'x-auth-token': localStorage.getItem('token')  // ✅ Important
        },
        timeout: 15000, // 15 seconds
        withCredentials: true
      });

      alert('Marks posted successfully');
setTimeout(() => navigate('/admin_home'), 1000);
      setSelectedId('');
      setImageMark([]);
    }  catch (error) {
  console.error('❌ Post error:', error);
  if (error.code === 'ERR_BAD_RESPONSE') {
    alert('Upload failed. Try again later. (500 Server Error)');
  } else if (error.code === 'ECONNABORTED') {
    alert('Upload timeout. Please try again.');
  } else {
    alert('Something went wrong');
  }
}
finally {
  setLoading(false);
}
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Post Mark</h4>

      <div className="mb-3">
        <label>Select Student's Answer</label>
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
        <label>Upload Mark Images</label>
        <input
          type="file"
          className="form-control"
          onChange={handleImageChange}
          accept="image/*"
          multiple
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>Post Mark</button>
    </div>
  );
};

export default PostMarkAdmin;
