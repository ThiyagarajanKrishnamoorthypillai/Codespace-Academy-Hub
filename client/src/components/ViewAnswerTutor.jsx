import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance';
import Modal from 'react-modal';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

Modal.setAppElement('#root');

const ViewAnswerTutor = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/answer/`);
        if (response.status === 200) {
          const tutorCourse = Cookies.get('tutorcourse');
          const filtered = response.data.filter(ans => ans.course === tutorCourse);
          setAnswers(filtered);
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
      const response = await fetch(url, { method: 'GET', mode: 'cors' });
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

    const pdfBlob = doc.output('blob');
    zip.file("Answer_Report.pdf", pdfBlob);

    zip.generateAsync({ type: 'blob' }).then((zipFile) => {
      saveAs(zipFile, `${answer.name}_FullDetails.zip`);
    });
  };

  return (
    <div className="container py-3">
      <h4 className="mb-3">Tutor - View Answer Submissions</h4>

      <div className="mb-3">
        <input className="form-control" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {filteredData.map((ans) => (
        <div key={ans._id} className="card p-3 mb-3 shadow-sm">
          <div className="row">
            <div className="col-md-6">
              <h6>Answer Details</h6>
              <p><b>Name:</b> {ans.name}</p>
              <p><b>Student ID:</b> {ans.stdid}</p>
              <p><b>Department:</b> {ans.dpt}</p>
              <p><b>College:</b> {ans.college}</p>
              <p><b>Course:</b> {ans.course}</p>
              <p><b>Email:</b> {ans.useremail}</p>
              <p><b>Submitted:</b> {new Date(ans.dateCreated).toLocaleString()}</p>
              <div className="row">
                {Array.isArray(ans.image) && ans.image.map((img, i) => (
                  <div className="col-4 mb-2" key={i}>
                    <img src={img} className="img-fluid border rounded" style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(img)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <h6>Question Info</h6>
              <p><b>Question Course:</b> {ans.questionCourse}</p>
              <p><b>Question Date:</b> {new Date(ans.questionDateCreated).toLocaleString()}</p>
              <div className="row">
                {ans.questionImages && ans.questionImages.map((img, i) => (
                  <div className="col-4 mb-2" key={i}>
                    <img src={img} className="img-fluid border rounded" style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(img)} />
                  </div>
                ))}
              </div>

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

          <button className="btn btn-primary w-100 mt-3" onClick={() => handleDownloadZipWithPDFImages(ans)}>
            📥 Download ZIP (PDF + All Images)
          </button>
        </div>
      ))}

      <Modal isOpen={!!selectedImage} onRequestClose={() => setSelectedImage(null)} style={{
        content: { background: 'transparent', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }}>
        <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: 10, right: 15, fontSize: 30 }}>×</button>
        <img src={selectedImage} style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px' }} />
      </Modal>
    </div>
  );
};

export default ViewAnswerTutor;
