import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Cookies from 'js-cookie';

const ViewMarksTutor = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const tutorEmail = Cookies.get('tutoremail');
    if (!tutorEmail) {
      alert('Tutor email not found');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/mark/`)
      .then(res => {
        const filtered = res.data.filter(mark => mark.tutoremail === tutorEmail);
        setMarks(filtered);
      })
      .catch(err => {
        console.error(err);
        alert('Error loading marks');
      });
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Submitted Marks (Tutor)</h4>

      {marks.length === 0 ? (
        <p>No marks found.</p>
      ) : (
        <div className="row">
          {marks.map((mark, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm p-3">
                <h5>{mark.name} ({mark.course})</h5>
                <p><strong>Std ID:</strong> {mark.stdid}</p>
                <p><strong>Email:</strong> {mark.useremail}</p>
                <p><strong>Marked By:</strong> {mark.tutoremail}</p>
                <p><strong>Date:</strong> {mark.dateMark}</p>

                <p><b>Marks:</b></p>
                {mark.imageMark.map((img, i) => (
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

export default ViewMarksTutor;
