import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ViewAnswerTutor = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="container py-3">
      <h4 className="mb-3">Tutor - View Answer Submissions</h4>

      {answers.map((ans) => (
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
                    <img src={img} className="img-fluid border" style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
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
                    <img src={img} className="img-fluid border" style={{ height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(img)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
