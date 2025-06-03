import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { differenceInMilliseconds, formatDistanceStrict } from 'date-fns';

const StartSession = () => {
  const [state, setState] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [manualHours, setManualHours] = useState('');
  const intervalRef = useRef(null);

  const courseDurations = {
    C: 30,
    "C++": 30,
    "C#": 30,
    Java: 40,
    JavaScript: 40,
    Python: 40,
    "MERN Full Stack Development": 60,
    "MEAN Full Stack Development": 60,
    "Data Structures": 30,
    "Web Development": 50,
    "React Native": 50,
    AI: 50,
    "Cloud Computing": 50,
    "Data Base": 35,
    "Fundamentals of Web Technology": 30
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/`)
      .then(res => setUserList(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleStartSession = () => {
    if (!course || !batch || selectedUser.length === 0) {
      alert('Please fill all fields');
      return;
    }

    const durationHours = courseDurations[course] || 30;

    axios.post(`${import.meta.env.VITE_API_URL}/session/start`, {
      course,
      batch,
      user: selectedUser,
      durationHours
    })
    .then(res => {
      alert('Session started successfully!');
      setCourse('');
      setBatch('');
      setSelectedUser([]);
      setActiveSession(res.data); // store session for countdown
    })
    .catch(err => {
      console.error(err);
      alert('Failed to start session');
    });
  };

  const handleStartClass = (session) => {
    setActiveSession(session);
    calculateRemaining(session);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      calculateRemaining(session);
    }, 60000); // every minute
  };

  const calculateRemaining = async (session) => {
  if (!session?.endTime) {
    setRemainingTime("Invalid end time");
    return;
  }

  const now = new Date();
  const end = new Date(session.endTime);

  if (isNaN(end.getTime())) {
    setRemainingTime("Invalid date format");
    return;
  }

  const remainingMs = differenceInMilliseconds(end, now);
  if (remainingMs <= 0) {
    setRemainingTime("Finished");

    await axios.put(`http://localhost:4000/api/v1/session/${session._id}/status`);
    clearInterval(intervalRef.current);
  } else {
    const formatted = formatDistanceStrict(now, end);
    setRemainingTime(`Remaining: ${formatted}`);
  }
};


  return (
    <div className="container mt-4">
      <h4 className="mb-3">Start New Session</h4>

      <div className="mb-3">
        <label>Select Course</label>
        <select className="form-control" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">-- Select a Course --</option>
          {Object.keys(courseDurations).map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Select Batch</label>
        <select className="form-control" value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">-- Select Batch --</option>
          <option value="Batch 1">Batch 1</option>
          <option value="Batch 2">Batch 2</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Select Users</label>
        <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {userList.map(user => (
            <div key={user._id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={user._id}
                value={user.email}
                checked={selectedUser.includes(user.email)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedUser(prev =>
                    e.target.checked
                      ? [...prev, value]
                      : prev.filter(email => email !== value)
                  );
                }}
              />
              <label className="form-check-label" htmlFor={user._id}>
                {user.email}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary mb-3" onClick={handleStartSession}>
        Start Session
      </button>

      {activeSession && (
        <>
          <div className="mb-3">
            <label>Manual Duration (in hours)</label>
            <input
              type="number"
              value={manualHours}
              onChange={(e) => setManualHours(e.target.value)}
              className="form-control"
              placeholder="Enter duration in hours"
            />
          </div>

          <button
            className="btn btn-outline-warning mb-2"
            onClick={() => handleStartClass(activeSession)}
          >
            Start Class
          </button>

          {remainingTime && (
            <div className="mt-2">
              <strong>Status: </strong>
              <span className={remainingTime === 'Finished' ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                {remainingTime}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StartSession;
