import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ViewFeedbackTutor = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/feedback/`);
        if (res.status === 200) {
          const tutorCourse = Cookies.get('tutorcourse');
          const filtered = res.data.filter(fb => fb.course === tutorCourse);
          setFeedbackData(filtered);
        }
      } catch (err) {
        console.error("Error fetching feedback:", err.message);
      }
    };
    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/feedback/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setFeedbackData(feedbackData.filter(item => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete");
    }
  };

  return (
    <div className="container py-3">
      <h4 className="mb-3">Tutor - View Feedback</h4>

      <div className="row g-3">
        {feedbackData.map((fb) => (
          <div key={fb._id} className="col-12 col-md-6">
            <div className="card product-card p-3 shadow-sm">
              <div className="row">
                <div className="col-sm-6">
                  <h6 className="text-primary">Question</h6>
                  <p><b>Course:</b> {fb.course}</p>
                  <p><b>Question Date:</b> {new Date(fb.dateCreated).toLocaleString()}</p>
                  <div className="d-flex flex-wrap">
                    {(Array.isArray(fb.image) ? fb.image : [fb.image]).map((img, i) => (
                      <img key={i} src={img} alt="feedback" style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '5px', borderRadius: '5px' }} />
                    ))}
                  </div>
                </div>

                <div className="col-sm-6">
                  <h6 className="text-success">Answer</h6>
                  <p><b>Name:</b> {fb.name}</p>
                  <p><b>Email:</b> {fb.useremail}</p>
                  <p><b>Feedback:</b> {fb.feedback}</p>
                  <p><b>Feedback Date:</b> {new Date(fb.userFeedbackdateCreated).toLocaleString()}</p>
                  <p><b>Admin Explanation:</b> {fb.explanation || <i>Not given</i>}</p>
                  <p><b>Student Status:</b> {fb.status}</p>

                  {/* ✅ Your requested update & delete buttons */}
                  <div className="mt-2">
                    <span
                      className="text-primary me-3 text-hover"
                      onClick={() => navigate('/update_feedback_tutor', { state: { feedback: fb } })}
                      style={{ cursor: 'pointer' }}
                    >
                      Update
                    </span>
                    <span
                      className="text-danger text-hover"
                      onClick={() => handleDelete(fb._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      Delete
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ViewFeedbackTutor;
