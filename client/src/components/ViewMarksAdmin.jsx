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

    axios.get(`${import.meta.env.VITE_API_URL}/mark/`, {
      withCredentials: true
    })
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
              <div className="card shadow-sm p-3">

                {/* Question Section */}
                <h5>Question Details</h5>
                <p><strong>Course:</strong> {mark.questionCourse}</p>
                <p><strong>Question Date:</strong> {new Date(mark.questionDateCreated).toLocaleString()}</p>
                {mark.questionImages && mark.questionImages.map((img, i) => (
                  <img key={i} src={img} alt="question" className="img-fluid rounded mb-2" />
                ))}
                {mark.pdf && mark.pdf.length > 0 && (
                  <>
                    <p><strong>PDF:</strong></p>
                    {mark.pdf.map((pdfUrl, i) => (
                      <a key={i} href={pdfUrl} target="_blank" rel="noreferrer">View PDF {i+1}</a>
                    ))}
                  </>
                )}

                <hr />

                {/* Answer Section */}
                <h5>Answer Details</h5>
                <p><strong>Name:</strong> {mark.name}</p>
                <p><strong>Student ID:</strong> {mark.stdid}</p>
                <p><strong>Department:</strong> {mark.dpt}</p>
                <p><strong>College:</strong> {mark.college}</p>
                <p><strong>Course:</strong> {mark.course}</p>
                <p><strong>User Email:</strong> {mark.useremail}</p>
                {mark.answerImages && mark.answerImages.map((img, i) => (
                  <img key={i} src={img} alt="answer" className="img-fluid rounded mb-2" />
                ))}

                <hr />

                {/* Marks Section */}
                <h5>Marks Details</h5>
                <p><strong>Status:</strong> {mark.status}</p>
                <p><strong>Marked By:</strong> {mark.adminemail}</p>
                <p><strong>Mark Date:</strong> {new Date(mark.dateMark).toLocaleString()}</p>
                {mark.imageMark && mark.imageMark.map((img, i) => (
                  <img key={i} src={img} alt="mark" className="img-fluid rounded mb-2" />
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
