import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/style.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewFeedbackAdmin = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/feedback/`);
        if (res.status === 200) setFeedbackData(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err.message);
      }
    };
    fetchFeedback();
  }, []);

  const filteredData = feedbackData.filter((fb) =>
    Object.values(fb).some(val => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this feedback?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/feedback/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setFeedbackData(prev => prev.filter(item => item._id !== id));
      alert("Feedback deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Delete failed.");
    }
  };

  return (
    <div>
     

      {/* Page Body */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-0">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Students Feedback & Doubts</h6>
            </div>

            <div className="row g-3">
              {filteredData.map((fb) => (
                <div key={fb._id} className="col-12 col-md-6">
                  <div className="card product-card p-3 shadow-sm">
                    {/* Blinking Status */}
                    <div className="mb-2">
                      <span className="badge status-blink">{fb.status}</span>
                    </div>

                   <div className="row">
  {/* LEFT: Question Details */}
  <div className="col-12 col-sm-6">
    <h6 className="text-primary">Question</h6>
    <p><b>Course:</b> {fb.course}</p>
    <p><b>Question Date:</b> {new Date(fb.dateCreated).toLocaleString()}</p>
    <div className="d-flex flex-wrap">
      {(Array.isArray(fb.image) ? fb.image : [fb.image]).map((img, i) => (
        <img
          key={i}
          src={img}
          alt="feedback"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            marginRight: '5px',
            borderRadius: '5px'
          }}
        />
      ))}
    </div>
  </div>

  {/* RIGHT: Feedback Details */}
  <div className="col-12 col-sm-6">
    <h6 className="text-success">Answer</h6>
    <p><b>Name:</b> {fb.name}</p>
    <p><b>Email:</b> {fb.useremail}</p>
    <p><b>Feedback:</b> {fb.feedback}</p>
    <p><b>Feedback Date:</b> {new Date(fb.userFeedbackdateCreated).toLocaleString()}</p>

    {/* NEW: Admin Explanation */}
    <p><b>Admin Explanation:</b> {fb.explanation ? fb.explanation : <i>Not given</i>}</p>

    {/* NEW: Student Status */}
   <p>
  <b>Student Status:</b>{' '}
  <span className={`fw-bold ${
    fb.status === "Understand" ? "text-success" :
    fb.status === "Not-Understand" ? "text-danger" :
    "text-warning"
  }`}>
    {fb.status === "Understand" && "🟢 Understand"}
    {fb.status === "Not-Understand" && "🔴 Not-Understand"}
    {fb.status === "Pending" && "🟡 Pending"}
  </span>
</p>


    {/* Action Links */}
    <div className="mt-2">
      <span
        className="text-primary me-3 text-hover"
        onClick={() => navigate('/update_feedback_admin', { state: { feedback: fb } })}
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
        </div>
      </div>

      {/* Footer */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li className="active"><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedbackAdmin;
