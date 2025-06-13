import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PostMarkTutor = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [imageMark, setImageMark] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/answer/`)
      .then(res => {
        const tutorCourse = Cookies.get('tutorcourse');
        const filtered = res.data.filter(ans => ans.course === tutorCourse);
        setAnswers(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  const handleImageChange = (e) => {
    setImageMark([...e.target.files]);
  };

  const handleSubmit = async () => {
    if (!selectedId || imageMark.length === 0) {
      alert('Please select answer and upload marks');
      return;
    }

    const tutorEmail = Cookies.get('tutoremail');
    if (!tutorEmail) return alert("Tutor email not found");

    const formData = new FormData();
    formData.append('answerId', selectedId);
    formData.append('tutoremail', tutorEmail);
    imageMark.forEach(file => formData.append('imageMark', file));

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/mark/post-tutor`, formData);
      alert('Marks posted successfully');
      navigate('/tutor_home');
    } catch (err) {
      console.error(err);
      alert('Failed to upload marks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Post Mark (Tutor)</h4>
      <div className="mb-3">
        <label>Select Student's Answer</label>
        <select className="form-control" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select</option>
         {answers.map(ans => (
  <option key={ans._id} value={ans._id}>
    {ans.name} - {ans.course} - {new Date(ans.dateCreated).toLocaleDateString()} - {ans.stdid}
  </option>
))}

        </select>
      </div>

      <div className="mb-3">
        <label>Upload Mark Images</label>
        <input type="file" multiple className="form-control" onChange={handleImageChange} accept="image/*" />
      </div>

      <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>Post Mark</button>
    </div>
  );
};

export default PostMarkTutor;
