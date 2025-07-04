// ViewAnswerAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
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

  // Add Details to Report PDF
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
  doc.text("Answer Submission Details", 10, y);
  y += 10;

  fields.forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, 10, y);
    y += 8;
  });

  // ✅ Download Answer Images
  if (Array.isArray(answer.image) && answer.image.length > 0) {
    for (let i = 0; i < answer.image.length; i++) {
      const imgUrl = answer.image[i];
      try {
        const blob = await fetchImageBlob(imgUrl);
        if (!blob) continue;
        zip.file(`Answer_Images/Image_${i + 1}.jpg`, blob);
        const base64 = await blobToBase64(blob);
        doc.addPage();
        doc.text(`Answer Image ${i + 1}`, 10, 10);
        doc.addImage(base64, 'JPEG', 10, 20, 180, 140);
      } catch (err) {
        console.error("Failed to fetch answer image:", imgUrl, err);
      }
    }
  }

  // ✅ Download Question Images
  if (Array.isArray(answer.questionImages) && answer.questionImages.length > 0) {
    for (let i = 0; i < answer.questionImages.length; i++) {
      const imgUrl = answer.questionImages[i];
      try {
        const blob = await fetchImageBlob(imgUrl);
        if (!blob) continue;
        zip.file(`Question_Images/QuestionImage_${i + 1}.jpg`, blob);
        const base64 = await blobToBase64(blob);
        doc.addPage();
        doc.text(`Question Image ${i + 1}`, 10, 10);
        doc.addImage(base64, 'JPEG', 10, 20, 180, 140);
      } catch (err) {
        console.error("Question image download failed:", imgUrl, err);
      }
    }
  }

  // ✅ Download Question PDFs (new addition)
  if (Array.isArray(answer.pdf) && answer.pdf.length > 0) {
    for (let i = 0; i < answer.pdf.length; i++) {
      const pdfUrl = answer.pdf[i];
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const pdfBlob = await response.blob();
        zip.file(`Question_PDFs/PDF_${i + 1}.pdf`, pdfBlob);
      } catch (err) {
        console.error("Question PDF download failed:", pdfUrl, err);
      }
    }
  }

  // ✅ Add the generated Answer Report PDF
  const pdfBlob = doc.output('blob');
  zip.file("Answer_Report.pdf", pdfBlob);

  // ✅ Finally Save ZIP
  zip.generateAsync({ type: 'blob' }).then((zipFile) => {
    saveAs(zipFile, `${answer.name}_FullDetails.zip`);
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
  {Array.isArray(ans.image) && ans.image.length > 0 && ans.image.map((img, i) => (
    <div className="col-4 mb-2" key={i}>
      <img
        src={img} // ✅ FIXED
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
                          {/* PDF Files Display */}
        {Array.isArray(ans.pdf) && ans.pdf.length > 0 && (
          <div className="mt-3">
            <h6 className="text-danger">Submitted PDFs</h6>
            {ans.pdf.map((pdfUrl, index) => (
              <div key={index} className="mb-2">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                  View PDF {index + 1}
                </a>
              </div>
            ))}
          </div>
        )}
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

    


    </div>
  );
};

export default ViewAnswerAdmin;
  