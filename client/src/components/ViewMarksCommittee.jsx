import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';

const ViewMarksCommittee = () => {
  const [marks, setMarks] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const committeeemail = Cookies.get('committeeemail');
    if (!committeeemail) {
      alert('Admin email not found in cookies');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/mark/`, { withCredentials: true })
      .then(res => {
        const filtered = res.data.filter(item => item.committeeemail === committeeemail);
        setMarks(filtered);
      })
      .catch(err => {
        console.error(err);
        alert('Error loading marks');
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleString();
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Submitted Marks (Admin Full View)</h4>

      {marks.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div className="row">
          {marks.map((mark) => (
            <div className="col-md-6 col-lg-4 mb-4" key={mark._id}>
              <div className="card shadow-sm p-3">

                <h6 className="text-primary">Record ID: {mark._id}</h6>
                <p><b>Name:</b> {mark.name}</p>
                <p><b>Student ID:</b> {mark.stdid}</p>
                <p><b>Department:</b> {mark.dpt}</p>
                <p><b>College:</b> {mark.college}</p>
                <p><b>Course:</b> {mark.course}</p>
                <p><b>Question Course:</b> {mark.questionCourse}</p>
                <p><b>User Email:</b> {mark.useremail}</p>
                <p><b>Marks Uploaded by:</b> {mark.adminemail?.trim() || mark.tutoremail}</p>
                <p><b>Status:</b> {mark.status}</p>
                <p><b>Mark:</b> {mark.mark}</p>
                <p><b>Question Date Created:</b> {formatDate(mark.questionDateCreated)}</p>
                <p><b>Mark Date:</b> {formatDate(mark.dateMark)}</p>
                <p><b>Created At:</b> {formatDate(mark.createdAt?.$date?.$numberLong || mark.createdAt)}</p>
                <p><b>Updated At:</b> {formatDate(mark.updatedAt?.$date?.$numberLong || mark.updatedAt)}</p>

                <h6 className="mt-3 text-success">Question Images</h6>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {mark.questionImages?.map((img, i) => (
                    <img key={i} src={img} alt={`Question ${i}`} style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }} onClick={() => setSelectedImage(img)} className="border rounded p-1" />
                  ))}
                </div>

                <h6 className="mt-3 text-success">PDF Files</h6>
                {mark.pdf && mark.pdf.length > 0 ? (
                  mark.pdf.map((pdfUrl, i) => (
                    <div key={i}><a href={pdfUrl} target="_blank" rel="noreferrer">View PDF {i + 1}</a></div>
                  ))
                ) : (
                  <p>No PDF uploaded</p>
                )}

                <h6 className="mt-3 text-primary">Answer Images</h6>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {mark.answerImages?.map((img, i) => (
                    <img key={i} src={img} alt={`Answer ${i}`} style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }} onClick={() => setSelectedImage(img)} className="border rounded p-1" />
                  ))}
                </div>

                <h6 className="mt-3 text-danger">Marks Images</h6>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {mark.imageMark?.map((img, i) => (
                    <img key={i} src={img} alt={`Mark ${i}`} style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain", cursor: "pointer" }} onClick={() => setSelectedImage(img)} className="border rounded p-1" />
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
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
  );
};

export default ViewMarksCommittee;
