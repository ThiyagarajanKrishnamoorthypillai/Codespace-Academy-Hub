import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');

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

const ViewQuestionCommittee = () => {
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token');
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/question/` + id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }).then(() => window.location.reload())
        .catch(err => console.log(err.message));
    }
  };

  const LoadEdit = (id) => {
    navigate("/update_question/" + id);
  };

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/question/`);
        const data = await response.json();

        const committeeemail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)committeeemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));

        const filteredQuestion = data.filter((question) => question.committeeemail === committeeemail);
        setQuestionData(filteredQuestion);
        setFilteredData(filteredQuestion);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching question data:', error.message);
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = questionData.filter((question) =>
      Object.values(question).some((field) =>
        field?.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  if (loading) return <div>Loading...</div>;

  return (
    <div>

      <div className="page-content-wrapper">
        <div className="top-products-area py-0">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between mb-3">
              <h6>View Committee Question Papers</h6>
            </div>

            <div className="row mb-4">
              <div className="col-md-10 offset-md-1">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>

            {filteredData.length > 0 ? (
              <div className="row">
                {filteredData.map((question) => (
                  <div key={question._id} className="col-12 mb-4">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 col-md-4 mb-2">
                            <strong>Course:</strong> <span className="text-primary">{question.course}</span>
                          </div>

                          <div className="col-12 col-md-4 mb-3">
                            <strong>Date:</strong> 
                            {question.committedate 
                              ? new Date(question.committedate).toLocaleDateString('en-GB', timeOptions) 
                              : 'N/A'}
                          </div>
                        </div>

                        <hr />

                        <div className="row">
                          {question.image.map((img, idx) => (
                            <div className="col-6 col-md-3 mb-3" key={idx}>
                              <img
                                src={img}
                                alt={`Image ${idx}`}
                                className="img-fluid border rounded shadow-sm"
                                style={{ height: '180px', width: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => setSelectedImage(img)}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="text-end mt-3">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            style={{ minWidth: '100px' }}
                            onClick={() => LoadEdit(question.id)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            style={{ minWidth: '100px' }}
                            onClick={() => Removefunction(question.id)}
                          >
                            Delete
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-4">No question details found for this committee account.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        style={{
          content: {
            background: 'transparent',
            border: 'none',
            inset: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            overflow: 'hidden',
            zIndex: 9999,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9998,
          },
        }}
      >
        <button
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '30px',
            fontSize: '30px',
            background: 'none',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10000
          }}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <img
          src={selectedImage}
          alt="Preview"
          style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px' }}
        />
      </Modal>
    </div>
  );
};

export default ViewQuestionCommittee;
