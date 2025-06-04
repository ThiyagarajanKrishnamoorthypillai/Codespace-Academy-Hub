// ✅ ViewAnswerUser.jsx (Final Working Version with Correct Route & Token)
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from 'react-modal';

const ViewAnswerUser = () => {
  const [cookies] = useCookies(['email']);
  const [answers, setAnswers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const useremail = cookies.email;

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/answer/email/${useremail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnswers(res.data);
      } catch (error) {
        console.error('Failed to fetch answers:', error);
      }
    };

    if (useremail) fetchAnswers();
  }, [useremail]);

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-success">Your Submitted Answers</h4>
      {answers.length > 0 ? (
        answers.map((ans, i) => (
          <div className="card mb-4 shadow" key={i}>
            <div className="card-body">
              <p><strong>Name:</strong> {ans.name}</p>
              <p><strong>StdID:</strong> {ans.stdid}</p>
              <p><strong>Department:</strong> {ans.dpt}</p>
              <p><strong>Course:</strong> {ans.course}</p>
              <p><strong>Status:</strong> <span className="fw-bold text-primary">{ans.status}</span></p>
              <p><strong>Date:</strong> {new Date(ans.dateCreated).toLocaleDateString()}</p>
              <div className="row">
                {ans.image.map((img, idx) => (
                  <div className="col-6 col-md-3 mb-3" key={idx}>
                    <img
                      src={img}
                      alt={`Answer ${idx}`}
                      className="img-fluid rounded border shadow-sm"
                      onClick={() => setSelectedImage(img)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-danger">No answers submitted yet.</p>
      )}

      <Modal isOpen={!!selectedImage} onRequestClose={() => setSelectedImage(null)}
        style={{ content: { background: '#000', border: 'none', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, zIndex: 9999 }, overlay: { backgroundColor: 'rgba(0, 0, 0, 0.85)' } }}>
        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10000 }}>×</button>
          <img src={selectedImage} alt="Full View" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }} />
        </div>
      </Modal>
    </div>
  );
};

export default ViewAnswerUser;
