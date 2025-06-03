import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root'); // or '#app' based on your HTML template

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

const ViewQuestionAdmin = () => {
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
        const adminemail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)adminemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
        const filteredQuestion = data.filter((question) => question.adminemail === adminemail);
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
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
     

      {/* Main Content */}
<div className="page-content-wrapper">
  <div className="top-products-area py-0">
    <div className="container">
      <div className="section-heading d-flex align-items-center justify-content-between mb-3">
        <h6>View Question Paper Details</h6>
      </div>

      {/* Search Bar */}
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

      {/* Data Display */}
      {filteredData.length > 0 ? (
        <div className="row">
          {filteredData.map((question) => (
            <div key={question._id} className="col-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row">
                    {/* Metadata */}
                    <div className="col-12 col-md-4 mb-2">
                      <strong>Course:</strong> <span className="text-primary">{question.course}</span>
                    </div>
                   {/* <div className="col-12 col-md-4 mb-2">
                      <strong>Status:</strong>{' '}
                      <span className={`badge ${question.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {question.status}
                      </span>
                    </div>*/}
                    <div className="col-12 col-md-4 mb-3">
                      <strong>Date:</strong> {new Date(question.dateCreated).toLocaleDateString('en-GB', timeOptions)}
                    </div>
                  </div>

                  <hr />

                  {/* Images Grid */}
                  <div className="row">
                    {question.image.map((img, idx) => (
                      <div className="col-6 col-md-3 mb-3" key={idx}>
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
                          alt={`Image ${idx}`}
                          className="img-fluid border rounded shadow-sm"
                          style={{
                            height: '180px',
                            width: '100%',
                            objectFit: 'cover',
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedImage(`${import.meta.env.VITE_API_URL}/uploads/${img}`)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  
{/* Buttons */}
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
        <p className="text-center mt-4">No question details found for the specified admin email or search term.</p>
      )}
    </div>
  </div>
</div>


      {/* Modal for Image Preview */}
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
  {/* ❌ Close Button */}
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

  {/* 📷 Fullscreen Image */}
  <img
    src={selectedImage}
    alt="Preview"
    style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px' }}
  />
</Modal>



      {/* Footer */}
    <div className="footer-nav-area" id="footerNav" style={{ backgroundColor: "#fff", borderTop: "1px solid #ddd", height:"fit-content", }}>
  <div className="container h-100 px-0">
    <div className="suha-footer-nav h-100 d-flex flex-column justify-content-between">

      {/* Navigation Links */}
      <ul className="h-100 d-flex align-items-center justify-content-center ps-0 mb-2">
        <li className="active">
          <Link to="/admin_home"><i className="lni lni-home"></i> Home</Link>
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

export default ViewQuestionAdmin;
