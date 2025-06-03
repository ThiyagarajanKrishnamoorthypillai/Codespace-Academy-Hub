import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        // Filter marks only for this admin
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
      <h4 className="mb-4">Submitted Marks</h4>

      {marks.length === 0 ? (
        <p>No marks found.</p>
      ) : (
        <div className="row">
          {marks.map((mark, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm p-3">
                <h5>{mark.name} ({mark.course})</h5>
                <p><strong>Std ID:</strong> {mark.stdid}</p>
                <p><strong>Department:</strong> {mark.dpt}</p>
                <p><strong>College:</strong> {mark.college}</p>
                <p><strong>Email:</strong> {mark.useremail}</p>
                <p><strong>Status:</strong> {mark.status}</p>
                <p><strong>Marked By:</strong> {mark.adminemail}</p>
                <p><strong>Date:</strong> {new Date(mark.dateMark).toLocaleString()}</p>

             <p><b>Mark's:</b></p>
{mark.imageMark && (
  <img
    src={mark.imageMark}
    alt="mark"
    className="img-fluid rounded"
    style={{ maxWidth: "100%", cursor: "pointer" }}
    onClick={() => setSelectedImage(mark.imageMark)}
  />
)}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMarksAdmin;
