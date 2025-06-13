import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';

const ViewMarksAdmin = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const adminemail = Cookies.get('adminemail');
    if (!adminemail) {
      alert('Admin email not found in cookies');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/mark/`, { withCredentials: true })
      .then(res => {
        const filtered = res.data.filter(item => item.adminemail === adminemail);
        setMarks(filtered);
      })
      .catch(err => {
        console.error(err);
        alert('Error loading marks');
      });
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Submitted Marks (Admin)</h4>

      {marks.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div className="row">
          {marks.map((mark, index) => (
            <div key={index} className="col-md-12 mb-4">
              <div className="card shadow-sm p-4">

                <div className="mb-2 text-muted">
                  <small><b>ID:</b> {mark._id}</small>
                </div>

                {/* Question Section */}
                <h5 className="text-primary">Question Details</h5>
                <p><b>Course:</b> {mark.questionCourse}</p>
                <p><b>Question Date:</b> {new Date(mark.questionDateCreated).toLocaleString()}</p>
                {mark.questionImages && mark.questionImages.map((img, i) => (
                  <img key={i} src={img} alt="question" className="img-fluid mb-2 rounded border"
                    style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain" }} />
                ))}
                {mark.pdf && mark.pdf.length > 0 && (
                  <>
                    <p><b>PDF Files:</b></p>
                    {mark.pdf.map((pdfUrl, i) => (
                      <a key={i} href={pdfUrl} target="_blank" rel="noreferrer">View PDF {i + 1}</a>
                    ))}
                  </>
                )}

                <hr />

                {/* Answer Section */}
                <h5 className="text-success">Answer Details</h5>
                <p><b>Name:</b> {mark.name}</p>
                <p><b>Student ID:</b> {mark.stdid}</p>
                <p><b>Department:</b> {mark.dpt}</p>
                <p><b>College:</b> {mark.college}</p>
                <p><b>Course:</b> {mark.course}</p>
                <p><b>User Email:</b> {mark.useremail}</p>
                {mark.answerImages && mark.answerImages.map((img, i) => (
                  <img key={i} src={img} alt="answer" className="img-fluid mb-2 rounded border"
                    style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain" }} />
                ))}

                <hr />

                {/* Marks Section */}
                <h5 className="text-danger">Marks Details</h5>
                <p><b>Status:</b> {mark.status}</p>
                <p><b>Marked By:</b> {mark.adminemail}</p>
                <p><b>Mark Date:</b> {new Date(mark.dateMark).toLocaleString()}</p>
                {mark.imageMark && mark.imageMark.map((img, i) => (
                  <img key={i} src={img} alt="mark" className="img-fluid mb-2 rounded border"
                    style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain" }} />
                ))}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMarksAdmin;
