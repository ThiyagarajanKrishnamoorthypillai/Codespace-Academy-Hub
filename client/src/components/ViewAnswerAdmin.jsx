// ViewAnswerAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

import "./css/bootstrap.min.css";
import "./css/style.css";
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

Modal.setAppElement('#root');

const ViewAnswerAdmin = () => {
  const [answers, setAnswers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/answer/`);
        if (response.status === 200) {
          setAnswers(response.data);
        }
      } catch (error) {
        console.error('Error fetching answers:', error.message);
      }
    };
    fetchAnswers();
  }, []);

  const filteredData = answers.filter((answer) =>
    Object.values(answer).some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const fetchImageBlob = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.blob();
  } catch (error) {
    console.error("Image download failed:", url, error);
    return null;
  }
};



const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const handleDownloadZipWithPDFImages = async (answer) => {
  const zip = new JSZip();
  const doc = new jsPDF();
  let y = 10;

  // Text Fields
  const fields = [
    ["Name", answer.name],
    ["Student ID", answer.stdid],
    ["Department", answer.dpt],
    ["College", answer.college],
    ["Course", answer.course],
    ["Email", answer.useremail],
    ["Status", answer.status],
    ["Answer Date", new Date(answer.dateCreated).toLocaleString()],
    ["Question Course", answer.questionCourse],
    ["Question Date", new Date(answer.questionDateCreated).toLocaleString()]
  ];

  doc.setFontSize(14);
  doc.text("Answer Submission Details", 10, y); y += 10;

  fields.forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, 10, y);
    y += 8;
  });

  // Answer Images
// ✅ Download answer images from the array: answer.image[]
if (Array.isArray(answer.image) && answer.image.length > 0) {
  for (let i = 0; i < answer.image.length; i++) {
    const imgFile = answer.image[i];
    const imgUrl = `${import.meta.env.VITE_API_URL}/uploads/${imgFile}`;
    try {
      const blob = await fetchImageBlob(imgUrl);
      if (!blob) continue;
      zip.file(`Answer_Images/${imgFile}`, blob);

      const base64 = await blobToBase64(blob);
      doc.addPage();
      doc.text(`Answer Image ${i + 1}`, 10, 10);
      doc.addImage(base64, 'JPEG', 10, 20, 180, 140);
    } catch (err) {
      console.error("❌ Failed to fetch answer image:", imgUrl, err);
    }
  }
}


  // Question Images
  for (let i = 0; i < (answer.questionImages || []).length; i++) {
    const imgFile = answer.questionImages[i];
    const imgUrl = `${import.meta.env.VITE_API_URL}/uploads/${imgFile}`;
    try {
      const blob = await fetchImageBlob(imgUrl);
      const base64 = await blobToBase64(blob);
      zip.file(`Question_Images/${imgFile}`, blob);
      doc.addPage();
      doc.text(`Question Image ${i + 1}`, 10, 10);
      doc.addImage(base64, 'JPEG', 10, 20, 180, 140);
    } catch (err) {
      console.error("Question image download failed:", imgUrl, err);
    }
  }

  // Add PDF to ZIP
  const pdfBlob = doc.output('blob');
  zip.file("Answer_Report.pdf", pdfBlob);

  // Save ZIP
  zip.generateAsync({ type: 'blob' }).then((zipFile) => {
    saveAs(zipFile, `${answer.name}_Details.zip`);
  });
};

useEffect(() => {
  fetch('${import.meta.env.VITE_API_URL}/uploads/1748612110292-401063483-paper-surrounded-finance-element.jpg')
    .then(res => res.blob())
    .then(blob => console.log("Image fetched OK", blob))
    .catch(err => console.error("Image fetch failed", err));
}, []);

  return (
    <div>
      
      {/* Page Content */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-0">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>All Answer Submissions</h6>
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
{/*                    <div className="text-center mb-2">
  <div
    className={`status-blink ${
      ans.status === 'Pending'
        ? 'status-pending'
        : ans.status === 'On-Progress'
        ? 'status-on-progress'
        : 'status-completed'
    }`}
  >
    {ans.status}
  </div> 
</div>*/}


                    <div className="row">
                      {/* Answer Side */}
                      <div className="col-md-6 border-end">
                        

                        <h6 className="text-success">Answer Details</h6>
                        <p><b>Name:</b> {ans.name}</p>
                        <p><b>Student ID:</b> {ans.stdid}</p>
                        <p><b>Department:</b> {ans.dpt}</p>
                        <p><b>College:</b> {ans.college}</p>
                        <p><b>Course:</b> {ans.course}</p>
                        <p><b>Email:</b> {ans.useremail}</p>
                        <p><b>Submitted:</b> {new Date(ans.dateCreated).toLocaleString()}</p>
                        <div className="row">
                          {ans.image.map((img, i) => (
                            <div className="col-4 mb-2" key={i}>
                              <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
                                className="img-fluid border rounded"
                                style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => setSelectedImage(`${import.meta.env.VITE_API_URL}/uploads/${img}`)}
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
                                src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
                                className="img-fluid border rounded"
                                style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => setSelectedImage(`${import.meta.env.VITE_API_URL}/uploads/${img}`)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => handleDownloadZipWithPDFImages(ans)}
                    >
                      📥 Download ZIP (PDF + All Images)
                    </button>
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

export default ViewAnswerAdmin;
  