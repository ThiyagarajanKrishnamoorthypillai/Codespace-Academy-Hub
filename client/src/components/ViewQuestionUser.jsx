// ✅ UPDATED FILE: ViewQuestionUser.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from '../utils/axiosInstance';
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
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  const course = cookies.course;

useEffect(() => {
  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/answer`);
      if (res.status === 200) setAnswers(res.data);
    } catch (err) {
      console.error('Error fetching answers:', err.message);
    }
  };
  fetchAnswers();
}, []);


  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/question/course/${course}`);
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

const findAnswerStatus = (question) => {
  for (const ans of answers) {
    const pdfMatch = question.pdf.some(qpdf => ans.pdf.includes(qpdf));
    const imageMatch = question.image.some(qimg => ans.questionImages.includes(qimg));
    if (pdfMatch || imageMatch) return ans.status;
     console.log('✅ Match found for:', question._id, '→', ans.status);
  }
  return 'Pending'; // Default fallback
};


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
    <div className="d-flex justify-content-end mb-2">
      <span className="badge bg-info text-dark">
        Status: {findAnswerStatus(question)}
      </span>
    </div>

                        <p className="mb-2"><b>Course:</b> <span className="text-primary">{question.course}</span></p>
                        <div className="row">
  {question.image.map((img, idx) => (
    <div className="col-6 col-md-3 mb-3" key={`image-${idx}`}>
      <img
        src={img}
        alt={`Question ${idx}`}
        className="img-fluid rounded shadow-sm"
        style={{ cursor: 'pointer', width: '100%', height: 'auto', objectFit: 'cover' }}
        onClick={() => setSelectedImage(img)}
      />
    </div>
  ))}

 {question.pdf?.map((pdfUrl, idx) => (
  <div className="col-6 col-md-3 mb-3" key={`pdf-${idx}`}>
    <div 
      className="border rounded shadow-sm text-center p-3"
      style={{ height: '180px', cursor: 'pointer' }}
      onClick={() => window.open(`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`, '_blank')}
    >
      <i className="fa fa-file-pdf-o text-danger mb-2" style={{ fontSize: '50px' }}></i>
      <div className="text-truncate small">PDF File {idx + 1}</div>
    </div>
  </div>
))}


</div>

                        <p><b>Date:</b> {new Date(question.dateCreated).toLocaleDateString()}</p>
             <div className="row mt-3">
  <div className="col-12 text-end">
   <span
  className="write-answer-link me-3"
  onClick={() => navigate('/user_home/post_answer', {
    state: {
      date: question.dateCreated,
      course: question.course,
      images: question.image,
      pdf: question.pdf  // ✅ Add this line only
    }
  })}
>
  Write Answer
</span>

    |
  <span
  className="write-answer-link ms-3"
  onClick={() => navigate('/user_home/post_feedback', {
    state: {
      image: question.image,    // ✅ full image array
      pdf: question.pdf,        // ✅ full pdf array
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

      



    </div>
  );
};

export default ViewQuestionUser;
