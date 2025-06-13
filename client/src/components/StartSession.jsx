import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const StartSession = () => {
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [savedSessions, setSavedSessions] = useState([]);

  const courseDurations = {
    C: 30, "C++": 30, "C#": 30, Java: 40, JavaScript: 40,
    Python: 40, "MERN Full Stack Development": 60, "MEAN Full Stack Development": 60,
    "Data Structures": 30, "Web Development": 50, "React Native": 50,
    AI: 50, "Cloud Computing": 50, "Data Base": 35, "Fundamentals of Web Technology": 30
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/`)
      .then(res => setAllUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (course) {
      const filtered = allUsers.filter(u => u.course === course);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
    setSelectedUser([]);
  }, [course, allUsers]);

  const handleSaveSession = () => {
    if (!course || !batch || selectedUser.length === 0) {
      alert('Please fill all fields');
      return;
    }

    const newEntry = {
      id: Date.now(), // temporary ID for UI display
      course,
      batch,
      selectedUser,
      durationHours: courseDurations[course] || 30,
      savedAt: new Date()
    };

    setSavedSessions([...savedSessions, newEntry]);

    // clear fields after save
    setCourse('');
    setBatch('');
    setSelectedUser([]);
  };

  const handleStartSession = (entry) => {
    axios.post(`${import.meta.env.VITE_API_URL}/session/start`, {
      course: entry.course,
      batch: entry.batch,
      user: entry.selectedUser,
      durationHours: entry.durationHours
    })
    .then(res => {
      alert('Session started successfully!');
      setSavedSessions(savedSessions.filter(s => s.id !== entry.id)); // remove from local list after start
    })
    .catch(err => {
      console.error(err);
      alert('Failed to start session');
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Prepare Session</h4>

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
        <label>Select Users (filtered)</label>
        <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {filteredUsers.map(user => (
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
                    e.target.checked ? [...prev, value] : prev.filter(email => email !== value)
                  );
                }}
              />
              <label className="form-check-label" htmlFor={user._id}>
                {user.name} ({user.email})
              </label>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-success mb-3" onClick={handleSaveSession}>
        Save to Session List
      </button>

      <hr />

      <h5>Prepared Sessions:</h5>
      {savedSessions.length === 0 ? (
        <p>No saved sessions yet</p>
      ) : (
        savedSessions.map(entry => (
          <div key={entry.id} className="border p-2 mb-2">
            <p><strong>Course:</strong> {entry.course}</p>
            <p><strong>Batch:</strong> {entry.batch}</p>
            <p><strong>Users:</strong> {entry.selectedUser.join(", ")}</p>
            <p><strong>Saved At:</strong> {format(entry.savedAt, 'dd/MM/yyyy hh:mm a')}</p>

            <button className="btn btn-primary" onClick={() => handleStartSession(entry)}>
              Start Session
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default StartSession;
