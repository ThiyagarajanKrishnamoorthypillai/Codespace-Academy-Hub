import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useCookies } from 'react-cookie';
import { differenceInMilliseconds, formatDistanceStrict } from 'date-fns';

const UserDashboard = () => {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [cookies] = useCookies(['name', 'email', 'course']);
  const userName = cookies.name || 'User';
  const userEmail = cookies.email || '';
  const course = cookies.course || 'User';

  useEffect(() => {
    if (!userEmail) return;

    axios.get(`${import.meta.env.VITE_API_URL}/session`)
      .then(res => {
        const sessions = res.data;
        const matched = sessions.find(s => s.user.includes(userEmail));
        if (matched) {
          setSessionInfo(matched);
          const now = new Date();
          const end = new Date(matched.endTime);
          const ms = differenceInMilliseconds(end, now);
          setRemainingTime(ms > 0 ? formatDistanceStrict(now, end) : 'Finished');
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
            {sessionInfo && (
              <div className="p-4 shadow rounded bg-white border border-primary hover-scale transition-all">
                <h5 className="fw-bold text-info mb-3">📘 Current Session</h5>
                <ul className="list-unstyled">
                  <li><b>Course:</b> {sessionInfo.course}</li>
                  <li><b>Batch:</b> {sessionInfo.batch}</li>
                  <li><b>Status:</b> <span className="text-info fw-bold">{sessionInfo.status}</span></li>
                  <li><b>Duration:</b> {sessionInfo.durationHours} hrs</li>
                  <li><b>Remaining:</b> <span className={remainingTime === 'Finished' ? 'text-success fw-bold' : 'text-success fw-bold'}>{remainingTime}</span></li>
                </ul>
              </div>
            )}
          </div>

          {/* Welcome User */}
          <div className="col-12 col-md-5 text-md-end text-center">
            <div className="d-flex justify-content-md-end justify-content-center align-items-center gap-3">
            {/*  <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="User Icon"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #0d6efd',
                  backgroundColor: '#fff'
                }}
              />*/}
              <h4 className="text-dark mb-0">
                Welcome, <span className="text-success">{userName}</span><br />
                Course:<span className="text-success">{course}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
