import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Modal from 'react-modal';
import axios from 'axios';

import "./css/bootstrap.min.css";
import "./css/style.css";
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout';
import Title from './Title';

const ViewAnswerUser = () => {
  const [cookies] = useCookies(['email']);
  const [answers, setAnswers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/answer/');
        const filtered = response.data.filter(ans => ans.useremail === cookies.email);
        setAnswers(filtered);
      } catch (err) {
        console.error('Failed to load answers:', err);
      }
    };

    fetchAnswers();
  }, [cookies]);

  return (
    <div>
      

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Your Submitted Answers</h6>
            </div>

            {answers.length > 0 ? (
              <div className="row">
                {answers.map((ans, index) => (
                  <div className="col-12 mb-4" key={index}>
                    <div className="card p-3 shadow-sm">
                      <div className="row">
                        {/* Left: Answer Details */}
                        <div className="col-md-6">
                          <p><b>Name:</b> {ans.name}</p>
                          <p><b>Student ID:</b> {ans.stdid}</p>
                          <p><b>Department:</b> {ans.dpt}</p>
                          <p><b>College:</b> {ans.college}</p>
                          <p><b>Course:</b> {ans.course}</p>
                          {/*<p><b>Status:</b> {ans.status}</p>*/}
                          <p><b>Answer Date:</b> {new Date(ans.dateCreated).toLocaleString()}</p>
                        </div>

                        {/* Right: Question Details */}
                        <div className="col-md-6">
                          <p><b>Question Course:</b> {ans.questionCourse}</p>
                          <p><b>Question Date:</b> {new Date(ans.questionDateCreated).toLocaleString()}</p>

                          <h6 className="mt-2 text-primary">Question Images</h6>
                          <div className="row">
                            {ans.questionImages && ans.questionImages.map((img, i) => (
                              <div className="col-4 col-sm-3 mb-2" key={i}>
                                <img
                                  src={`http://localhost:4000/uploads/${img}`}
                                  alt={`Question ${i}`}
                                  className="img-fluid border rounded"
                                  style={{ width: '100%', height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                                  onClick={() => setSelectedImage(`http://localhost:4000/uploads/${img}`)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Full-Width: Answer Images */}
                      <h6 className="mt-3 text-success">Answer Images</h6>
                      <div className="row">
                        {ans.image.map((img, i) => (
                          <div className="col-4 col-sm-3 mb-2" key={i}>
                            <img
                              src={`http://localhost:4000/uploads/${img}`}
                              alt={`Answer ${i}`}
                              className="img-fluid border rounded"
                              style={{ width: '100%', height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                              onClick={() => setSelectedImage(`http://localhost:4000/uploads/${img}`)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-danger mt-3">No answers submitted yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal with Close Button */}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        style={{
          content: {
            background: 'rgba(0, 0, 0, 0.85)',
            border: 'none',
            inset: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            overflow: 'hidden',
            position: 'relative'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 1000
          },
        }}
      >
        <button
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontWeight: 'bold',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 1001
          }}
        >
          ×
        </button>
        <img
          src={selectedImage}
          alt="Full View"
          style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px' }}
        />
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

export default ViewAnswerUser;
