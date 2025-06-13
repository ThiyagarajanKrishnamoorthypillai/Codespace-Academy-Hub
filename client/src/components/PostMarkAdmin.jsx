import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PostMarkAdmin = () => {
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
    axios.get(`${import.meta.env.VITE_API_URL}/answer/`, {
      withCredentials: true,
    })
      .then(res => {
        setAnswers(res.data);
        setFilteredAnswers(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter by date when fromDate or toDate changes
  useEffect(() => {
    if (!fromDate || !toDate) {
      setFilteredAnswers(answers);
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999); // include full to-date

    const filtered = answers.filter(ans => {
      const ansDate = new Date(ans.dateCreated);
      return ansDate >= from && ansDate <= to;
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

    const adminEmailFromCookie = Cookies.get('adminemail');
    if (!adminEmailFromCookie) return alert("Admin email not found in cookies");

    const formData = new FormData();
    formData.append('answerId', selectedId);
    formData.append('adminemail', adminEmailFromCookie);
    formData.append('mark', mark);
    imageMark.forEach(file => formData.append('imageMark', file));

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/mark/post`, formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        },
        timeout: 15000,
      });

      alert('Marks posted successfully');
      setTimeout(() => navigate('/admin_home'), 1000);
      setSelectedId('');
      setImageMark([]);
      setMark('');
    } catch (error) {
      console.error('❌ Post error:', error);
      if (error.code === 'ERR_BAD_RESPONSE') {
        alert('Upload failed. Try again later. (500 Server Error)');
      } else if (error.code === 'ECONNABORTED') {
        alert('Upload timeout. Please try again.');
      } else {
        alert('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Post Mark</h4>

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

export default PostMarkAdmin;









{/*
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
       // withCredentials: true
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
    {ans.name} - {ans.course} - {new Date(ans.dateCreated).toLocaleDateString()} - {ans.stdid}
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
*/}