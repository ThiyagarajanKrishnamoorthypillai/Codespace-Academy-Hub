// ✅ ViewAnswerUser.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ViewAnswerUser = () => {
  const [answers, setAnswers] = useState([]);
  const [cookies] = useCookies(['email']);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/answer/email/${cookies.email}`);
        if (res.status === 200) setAnswers(res.data);
      } catch (err) {
        console.error('Failed to fetch answers:', err);
      }
    };
    if (cookies.email) fetchAnswers();
  }, [cookies.email]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">My Submitted Answers</h4>
      {answers.length === 0 ? (
        <p>No answers found.</p>
      ) : (
        answers.map((item, index) => (
          <div key={index} className="card mb-4 p-3 shadow-sm">
            <p><b>Name:</b> {item.name}</p>
            <p><b>Email:</b> {item.email}</p>
            <p><b>Student ID:</b> {item.stdid}</p>
            <p><b>Department:</b> {item.dpt}</p>
            <p><b>Status:</b> <span className="text-warning fw-bold blinking">{item.status}</span></p>
            <p><b>Date Submitted:</b> {new Date(item.dateCreated).toLocaleDateString()}</p>
            <div className="d-flex flex-wrap gap-2">
              {item.answerImages?.map((img, i) => (
                <img key={i} src={img} alt="Answer" style={{ width: '200px', height: 'auto', borderRadius: '10px' }} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAnswerUser;