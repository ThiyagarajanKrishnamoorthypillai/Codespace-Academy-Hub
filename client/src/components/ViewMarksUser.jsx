import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import AppFooter from '../components/AppFooter';

const ViewMarksUser = () => {
  const [markData, setMarkData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const userEmail = decodeURIComponent(
    document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/mark/`)
      .then(res => res.json())
      .then(data => {
        const userMarks = data.filter(item => item.useremail === userEmail);
        setMarkData(userMarks);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = markData.filter(mark =>
      Object.values(mark).some(field =>
        typeof field === 'string' &&
        field.toLowerCase().includes(term.toLowerCase())
      )
    );
    setMarkData(filtered);
  };

  return (
    <div>
      <div className="page-content-wrapper">
        <div className="top-products-area py-0">
          <div className="container">

            <div className="section-heading d-flex align-items-center justify-content-between">
              <h5>My Marks</h5>
            </div>

            <div className="row g-3 mb-3">
              <div className="top-search-form">
                <form>
                  <input className="form-control" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
                </form>
              </div>
            </div>

            <div className="row">
              {markData.map((mark) => (
                <div className="col-12 col-md-6 col-lg-4" key={mark._id}>
                  <div className="card shadow-sm mb-4">
                    <div className="card-body">

                      <h6 className="mb-2">{mark.name} ({mark.course})</h6>
                      <small className="text-muted">Date: {new Date(mark.dateMark).toLocaleDateString()}</small>

                      <hr />

                      {/* Question Section */}
                      <h6 className="text-primary">Question</h6>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {mark.questionImages?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Question ${i}`}
                            style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }}
                            onClick={() => setSelectedImage(img)}
                            className="border rounded p-1"
                          />
                        ))}
                      </div>

                      {mark.pdf && mark.pdf.length > 0 && (
                        <div className="mb-2">
                          <b>PDF Files:</b><br />
                          {mark.pdf.map((pdfUrl, i) => (
                            <a key={i} href={pdfUrl} target="_blank" rel="noreferrer">View PDF {i + 1}</a>
                          ))}
                        </div>
                      )}

                      <hr />

                      {/* Answer Section */}
                      <h6 className="text-success">Answer</h6>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {mark.answerImages?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Answer ${i}`}
                            style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }}
                            onClick={() => setSelectedImage(img)}
                            className="border rounded p-1"
                          />
                        ))}
                      </div>

                      <hr />

                      {/* Marks Section */}
                      <h6 className="text-danger">Marks</h6>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {mark.imageMark?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Mark ${i}`}
                            style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }}
                            onClick={() => setSelectedImage(img)}
                            className="border rounded p-1"
                          />
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Modal Preview */}
            {selectedImage && (
              <div className="modal show d-block" onClick={() => setSelectedImage(null)} style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-body text-center">
                      <img src={selectedImage} alt="Full View" className="img-fluid" />
                      <button className="btn btn-danger mt-2" onClick={() => setSelectedImage(null)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <AppFooter />
      </div>
    </div>
  );
};

export default ViewMarksUser;
