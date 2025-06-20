// ✅ ViewAnswerUser.jsx (Cloned & Filtered by Email)
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
import axios from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Logout from './Logout.jsx';
import AppFooter from '../components/AppFooter';
import "./css/bootstrap.min.css";
import "./css/style.css";
import "./js/bootstrap.bundle.min.js";

Modal.setAppElement('#root');

const ViewAnswerUser = () => {
  const [answers, setAnswers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [cookies] = useCookies(['email']);
  const useremail = cookies.email;

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/answer/email/${useremail}`, {
          headers: { 'x-auth-token': token },
        });
        if (response.status === 200) {
          setAnswers(response.data);
        }
      } catch (error) {
        console.error('Error fetching user answers:', error);
      }
    };
    if (useremail) fetchAnswers();
  }, [useremail]);

  const filteredData = answers.filter((answer) =>
    Object.values(answer).some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>

      {/* Page Content */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-0">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Your Submitted Answers</h6>
            </div>

            {/* Search */}
            <div className="top-search-form mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="row">
              {filteredData.map((ans) => (
                <div key={ans._id} className="col-12 mb-4">
                  <div className="card p-3 shadow-sm">
                    <div className="row">
                      {/* Answer Side */}
                      <div className="col-md-6 border-end">
                        <h6 className="text-success">Answer Details</h6>
                        <p><b>Name:</b> {ans.name}</p>
                        <p><b>Student ID:</b> {ans.stdid}</p>
                        <p><b>Department:</b> {ans.dpt}</p>
                        <p><b>College:</b> {ans.college}</p>
                        <p><b>Course:</b> {ans.course}</p>
                        <p><b>Student Email:</b> {ans.useremail}</p>
                        <p><b>Submitted on:</b> {new Date(ans.dateCreated).toLocaleString()}</p>
                        <p><b>Status:</b> {ans.status}</p>
                        <div className="row">
                          {ans.image.map((img, i) => (
                            <div className="col-4 mb-2" key={i}>
                              <img
                                src={img}
                                className="img-fluid border rounded"
                                style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => setSelectedImage(img)}
                              />
                            </div>
                          ))}
                          
                        </div>
                      </div>

                      {/* Question Side */}
                      <div className="col-md-6">
                        <h6 className="text-primary">Question Info</h6>
                        <p><b>Question Course:</b> {ans.questionCourse}</p>
                        <p><b>Question Date:</b> {new Date(ans.questionDateCreated).toLocaleString()}</p>
                        <div className="row">
                          {ans.questionImages && ans.questionImages.map((img, i) => (
                            <div className="col-4 mb-2" key={i}>
                              <img
                                src={img}
                                className="img-fluid border rounded"
                                style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => setSelectedImage(img)}
                              />
                            </div>
                          ))}
                          {/* Display PDFs */}
{ans.pdf?.map((pdfUrl, idx) => (
  <div className="col-4 mb-2" key={`pdf-${idx}`}>
    <div
      className="border rounded shadow-sm text-center p-2"
      style={{ height: '120px', cursor: 'pointer' }}
      onClick={() => window.open(`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`, '_blank')}
    >
      <i className="fa fa-file-pdf-o text-danger mb-1" style={{ fontSize: '40px' }}></i>
      <div className="small text-truncate">PDF {idx + 1}</div>
    </div>
  </div>
))}
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

      {/* Modal for Image Preview */}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        style={{
          content: {
            background: 'rgba(0, 0, 0, 0.85)',
            border: 'none',
            inset: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9998
          },
        }}
      >
        <button
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '30px',
            color: '#fff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          &times;
        </button>
        <img
          src={selectedImage}
          alt="Full Preview"
          style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px' }}
        />
      </Modal>

     <AppFooter/>



    </div>
  );
};

export default ViewAnswerUser;
