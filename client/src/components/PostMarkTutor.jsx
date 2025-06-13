import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PostMarkTutor = () => {
  const [answers, setAnswers] = useState([]);
  const [filteredAnswers, setFilteredAnswers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [imageMark, setImageMark] = useState([]);
  const [mark, setMark] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/answer/`)
      .then(res => {
        const tutorCourse = Cookies.get('tutorcourse');
        const filtered = res.data.filter(ans => ans.course === tutorCourse);
        setAnswers(filtered);
        setFilteredAnswers(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  // Date filter logic (timezone-safe)
  useEffect(() => {
    if (!fromDate || !toDate) {
      setFilteredAnswers(answers);
      return;
    }

    const filtered = answers.filter(ans => {
      const ansDate = new Date(ans.dateCreated);
      const ansLocalDate = ansDate.getFullYear() + '-' 
                         + String(ansDate.getMonth() + 1).padStart(2, '0') + '-' 
                         + String(ansDate.getDate()).padStart(2, '0');
      return ansLocalDate >= fromDate && ansLocalDate <= toDate;
    });

    setFilteredAnswers(filtered);
  }, [fromDate, toDate, answers]);

  const handleImageChange = (e) => {
    setImageMark([...e.target.files]);
  };

  const handleSubmit = async () => {
    if (!selectedId) {
      alert('Please select an answer');
      return;
    }

    if (!mark || isNaN(mark) || mark < 0 || mark > 100) {
      alert('Please enter a valid mark between 0 and 100');
      return;
    }

    const tutorEmail = Cookies.get('tutoremail');
    if (!tutorEmail) return alert("Tutor email not found");

    const formData = new FormData();
    formData.append('answerId', selectedId);
    formData.append('tutoremail', tutorEmail);
    formData.append('mark', mark);
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

      <div className="mb-3 row">
        <div className="col-md-6">
          <label>From Date</label>
          <input type="date" className="form-control" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label>To Date</label>
          <input type="date" className="form-control" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
      </div>

      <div className="mb-3">
        <label>Select Student's Answer</label>
        <select className="form-control" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select</option>
          {filteredAnswers.map(ans => (
            <option key={ans._id} value={ans._id}>
              {ans.name} - {ans.course} - {new Date(ans.dateCreated).toLocaleDateString()} - {ans.stdid}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Upload Mark Images (Optional)</label>
        <input
          type="file"
          className="form-control"
          onChange={handleImageChange}
          accept="image/*"
          multiple
        />
      </div>

      <div className="mb-3">
        <label>Marks (Out of 100)</label>
        <input
          type="number"
          className="form-control"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
          min="0"
          max="100"
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Posting...' : 'Post Mark'}
      </button>
    </div>
  );
};

export default PostMarkTutor;
