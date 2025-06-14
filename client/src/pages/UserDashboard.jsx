import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';

const UserDashboard = () => {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [cookies] = useCookies(['name', 'email', 'course']);
  const userName = cookies.name || 'User';
  const userEmail = cookies.email || '';
  const course = cookies.course || 'User';
  const [tutor, setTutor] = useState(null);

  // Fetch Tutor Name
  useEffect(() => {
    if (!course) return;
    axios.get(`${import.meta.env.VITE_API_URL}/tutor/`)
      .then(res => {
        const matchedTutor = res.data.find(t => t.course === course);
        if (matchedTutor) {
          setTutor(matchedTutor);
        } else {
          setTutor(null); // ✅ even if not found, ensure state is updated
        }
      })
      .catch(err => console.error('Error fetching tutors', err));
  }, [course]);

  // Fetch Session Info (updated logic)
  useEffect(() => {
    if (!userEmail) return;

    axios.get(`${import.meta.env.VITE_API_URL}/session`)
      .then(res => {
        const sessions = res.data;
        const matched = sessions.find(s => 
          s.users.some(u => u.email === userEmail)
        );

        if (matched) {
          setSessionInfo(matched);

          const totalPlannedMinutes = matched.durationHours * 60;
          const totalLoggedMinutes = matched.datewise.reduce((sum, entry) => sum + entry.todayHour, 0);
          const remainingMinutes = totalPlannedMinutes - totalLoggedMinutes;

          const remainingStr = remainingMinutes > 0
            ? `${Math.floor(remainingMinutes / 60)} hrs ${remainingMinutes % 60} min`
            : 'Finished';

          setRemainingTime(remainingStr);
        } else {
          setSessionInfo(null);  // ✅ handle empty case properly
          setRemainingTime('');
        }
      })
      .catch(err => console.error(err));
  }, [userEmail]);

  return (
    <>
      <div className="container py-4" style={{ background: 'linear-gradient(to right, #f5f8fd, #fdfdfd)', minHeight: 'calc(100vh - 118px)' }}>
        <div className="row justify-content-between align-items-start">

          {/* Session Info */}
          <div className="col-12 col-md-7 mb-4">
            <div
              className="p-4 shadow rounded bg-white border transition-all"
              style={{
                borderColor: '#ffc107',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                animation: 'fadeIn 1s ease-in-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h5 className="fw-bold mb-3" style={{ color: '#673ab7', animation: 'textPop 1s ease-in-out' }}>
                📘 Current Session
              </h5>

              {sessionInfo ? (
                <ul className="list-unstyled" style={{ animation: 'textFade 1.2s ease' }}>
                  <li><b style={{ color: '#e91e63' }}>Course:</b> <span style={{ color: '#3f51b5' }}>{sessionInfo.course}</span></li>
                  <li><b style={{ color: '#009688' }}>Batch:</b> <span style={{ color: '#795548' }}>{sessionInfo.batch}</span></li>
                  <li><b style={{ color: '#ff5722' }}>Status:</b> <span style={{ color: '#0d6efd', fontWeight: 'bold' }}>{sessionInfo.status}</span></li>
                  <li><b style={{ color: '#3f51b5' }}>Duration:</b> <span style={{ color: '#673ab7' }}>{sessionInfo.durationHours} hrs</span></li>
                  <li><b style={{ color: '#4caf50' }}>Remaining:</b> <span className='fw-bold text-warning'>{remainingTime}</span></li>
                </ul>
              ) : (
                <div style={{ color: '#6c757d' }}>No active session found.</div>
              )}
            </div>
          </div>

          {/* Welcome User */}
          <div className="col-12 col-md-5 text-md-end text-center">
            <div className="d-flex justify-content-md-end justify-content-center align-items-center gap-2 flex-wrap">
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="User Icon"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '2px solid #673ab7',
                  backgroundColor: '#f5efff',
                  padding: '2px'
                }}
              />
              <div className="text-md-end text-center">
                <span style={{ fontSize: '0.9rem', color: '#343a40' }}>
                  Welcome, <span style={{ color: '#673ab7', fontWeight: 500 }}>{userName}</span><br />
                  <small>Course: <span style={{ color: '#673ab7', fontWeight: 500 }}>{course}</span></small><br />
                  <small>
                    Tutor Name: <span style={{ color: '#673ab7', fontWeight: 500 }}>
                      {tutor ? tutor.name : ''}
                    </span>
                  </small>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserDashboard;
