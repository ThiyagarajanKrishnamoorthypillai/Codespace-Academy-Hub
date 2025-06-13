import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString();
  };

  return (
    <div className="page-content-wrapper">
      <div className="top-products-area py-0">
        <div className="container">

          <div className="section-heading d-flex align-items-center justify-content-between">
            <h5>My Marks - Full Details View</h5>
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

                    <h6 className="mb-2 text-primary">Record ID: {mark._id}</h6>
                    <p><b>Name:</b> {mark.name}</p>
                    <p><b>Student ID:</b> {mark.stdid}</p>
                    <p><b>Department:</b> {mark.dpt}</p>
                    <p><b>College:</b> {mark.college}</p>
                    <p><b>Course:</b> {mark.course}</p>
                    <p><b>Question Course:</b> {mark.questionCourse}</p>

                    <p><b>User Email:</b> {mark.useremail}</p>
                    <p><b>Admin Email:</b> {mark.adminemail}</p>

                    <p><b>Status:</b> {mark.status}</p>
                    <p><b>Question Date Created:</b> {formatDate(mark.questionDateCreated)}</p>
                    <p><b>Mark Date:</b> {formatDate(mark.dateMark)}</p>
                    <p><b>Created At:</b> {formatDate(mark.createdAt?.$date?.$numberLong || mark.createdAt)}</p>
                    <p><b>Updated At:</b> {formatDate(mark.updatedAt?.$date?.$numberLong || mark.updatedAt)}</p>

                    {/* Question Images */}
                    <h6 className="mt-3 text-success">Question Images</h6>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {mark.questionImages?.map((img, i) => (
                        <img key={i} src={img} alt={`Question ${i}`} style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }} onClick={() => setSelectedImage(img)} className="border rounded p-1" />
                      ))}
                    </div>

                    {/* PDF Files */}
                    <h6 className="mt-3 text-success">PDF Files</h6>
                    {mark.pdf && mark.pdf.length > 0 ? (
                      mark.pdf.map((pdfUrl, i) => (
                        <div key={i}><a href={pdfUrl} target="_blank" rel="noreferrer">View PDF {i + 1}</a></div>
                      ))
                    ) : (
                      <p>No PDF uploaded</p>
                    )}

                    {/* Answer Images */}
                    <h6 className="mt-3 text-primary">Answer Images</h6>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {mark.answerImages?.map((img, i) => (
                        <img key={i} src={img} alt={`Answer ${i}`} style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }} onClick={() => setSelectedImage(img)} className="border rounded p-1" />
                      ))}
                    </div>

                    {/* Mark Images */}
                    <h6 className="mt-3 text-danger">Marks Images</h6>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {mark.imageMark?.map((img, i) => (
                        <img key={i} src={img} alt={`Mark ${i}`} style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }} onClick={() => setSelectedImage(img)} className="border rounded p-1" />
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
  );
};

export default ViewMarksUser;
