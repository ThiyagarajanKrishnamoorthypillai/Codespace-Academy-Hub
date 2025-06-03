// ✅ UPDATED FILE: ViewQuestionUser.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from 'react-modal';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewQuestionUser = () => {
  const [cookies] = useCookies(['course']);
  const [questionData, setQuestionData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const navigate = useNavigate();

  const course = cookies.course;

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/question/course/${course}`);
        if (response.status === 200) {
          setQuestionData(response.data);
        }
      } catch (error) {
        console.error('Error fetching question data:', error.message);
      }
    };

    if (course) fetchQuestionData();
  }, [course]);

  const filteredData = questionData.filter((q) => {
    const qDate = new Date(q.dateCreated);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (
      (!from || qDate >= from) &&
      (!to || qDate <= to) &&
      Object.values(q).some((field) => field.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div>
     

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Question Papers for <span className="text-success">{course}</span></h6>
            </div>

            {/* Search & Filter */}
            <div className="row mb-3">
              <div className="col-md-4 mb-2">
                <input type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="col-md-4 mb-2">
                <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div className="col-md-4 mb-2">
                <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
            </div>

            {filteredData.length > 0 ? (
              <div className="row justify-content-center mt-3">
                {filteredData.map((question) => (
                  <div key={question._id} className="col-12 mb-4">
                    <div className="card product-card">
                      <div className="card-body">
                        <p className="mb-2"><b>Course:</b> <span className="text-primary">{question.course}</span></p>
                        <div className="row">
                          {question.image.map((img, idx) => (
                            <div className="col-6 col-md-3 mb-3" key={idx}>
                              <img
                                src={`http://localhost:4000/uploads/${img}`}
                                alt={`Question ${idx}`}
                                className="img-fluid rounded shadow-sm"
                                style={{ cursor: 'pointer', width: '100%', height: 'auto', objectFit: 'cover' }}
                                onClick={() => setSelectedImage(`http://localhost:4000/uploads/${img}`)}
                              />
                            </div>
                          ))}
                        </div>
                        <p><b>Date:</b> {new Date(question.dateCreated).toLocaleDateString()}</p>
             <div className="row mt-3">
  <div className="col-12 text-end">
    <span
      className="write-answer-link me-3"
      onClick={() => navigate('/post_answer', {
        state: {
          date: question.dateCreated,
          course: question.course,
          images: question.image
        }
      })}
    >
      Write Answer
    </span>
    |
   <span
  className="write-answer-link ms-3"
  onClick={() => navigate('/post_feedback', {
    state: {
      image: question.image[0], // assuming 1st image
      course: question.course,
      dateCreated: question.dateCreated
    }
  })}
>
  Doubt / Feedback
</span>
  </div>
</div>


                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-danger mt-3">No question details found for course: {course}</p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={!!selectedImage} onRequestClose={() => setSelectedImage(null)}
        style={{ content: { background: 'rgba(0, 0, 0, 0.85)', border: 'none', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, zIndex: 9999 }, overlay: { backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 9998 } }}>
        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10000 }}>×</button>
          <img src={selectedImage} alt="Full View" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }} />
        </div>
      </Modal>

       <div className="footer-nav-area" id="footerNav" style={{ backgroundColor: "#fff", borderTop: "1px solid #ddd", height:"fit-content", }}>
  <div className="container h-100 px-0">
    <div className="suha-footer-nav h-100 d-flex flex-column justify-content-between">

      {/* Navigation Links */}
      <ul className="h-100 d-flex align-items-center justify-content-center ps-0 mb-2">
        <li className="active">
          <Link to="/user_home"><i className="lni lni-home"></i> Home</Link>
        </li>
        <li><Logout /></li>
      </ul>

      {/* Footer Bottom Row */}
      <div className="d-flex justify-content-between align-items-center w-100 px-0 pb-0 text-dark medium">
        <span>© Codespace Solutions | All Rights Reserved</span>
        <span className="d-flex gap-4">
  <a href="https://wa.me/" target="_blank" rel="noreferrer"><i className="fa fa-whatsapp fa-lg text-success"></i></a>
  <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg text-primary"></i></a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa fa-instagram fa-lg text-danger"></i></a>
</span>

      </div>

    </div>
  </div>
</div>



    </div>
  );
};

export default ViewQuestionUser;
