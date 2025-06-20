import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [cookies] = useCookies(['name', 'email', 'course']);
  const userName = cookies.name || 'User';
  const userEmail = cookies.email || '';
  const course = cookies.course || 'User';
  const [tutor, setTutor] = useState(null);
  const [user, setUser] = useState(null);
  const [marks, setMarks] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [notifications, setNotifications] = useState([]);
const [questionData, setQuestionData] = useState([]);


  // Fetch Tutor Name
  useEffect(() => {
    if (!course) return;
    axios.get(`${import.meta.env.VITE_API_URL}/tutor/`)
      .then(res => {
        const matchedTutor = res.data.find(t => t.course === course);
        setTutor(matchedTutor || null);
      })
      .catch(err => console.error('Error fetching tutors', err));
  }, [course]);


useEffect(() => {
  if (!userEmail) return;

  axios.get(`${import.meta.env.VITE_API_URL}/user`)
    .then(res => {
      const matchedUser = res.data.find(u => u.email === userEmail);
      setUser(matchedUser || null);
    })
    .catch(err => console.error('Error fetching user data', err));
}, [userEmail]);


  // Fetch Session Info
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

          // Calculate today's minutes
          const todayDate = new Date().setHours(0, 0, 0, 0);
          const todayEntry = matched.datewise.find(entry => {
            const entryDate = new Date(Number(entry.date)).setHours(0, 0, 0, 0);
            return entryDate === todayDate;
          });
          const todayMinutes = todayEntry ? todayEntry.todayHour : 0;

          setPieData([
            { name: '', value: totalPlannedMinutes },
            { name: 'Remaining', value: remainingMinutes },
            { name: "Today's Class Hours", value: todayMinutes }
          ]);
        } else {
          setSessionInfo(null);
          setRemainingTime('');
          setPieData([]);
        }
      })
      .catch(err => console.error(err));
  }, [userEmail]);

  // Fetch Marks
  useEffect(() => {
    if (!userEmail) return;
    axios.get(`${import.meta.env.VITE_API_URL}/mark`)
      .then(res => {
        const filtered = res.data.filter(m => m.useremail === userEmail);
        setMarks(filtered);
      })
      .catch(err => console.error('Error fetching marks', err));
  }, [userEmail]);

  const COLORS = ['#673ab7', '#ffc107', '#ff5722'];
useEffect(() => {
  if (!course) return;

  axios.get(`${import.meta.env.VITE_API_URL}/question`)
    .then(res => {
      const filtered = res.data.filter(item => item.course === course);
      setNotifications(filtered);
    })
    .catch(err => console.error('Error loading notifications', err));
}, [course]);

  return (
    <div className="container py-4" style={{ background: 'linear-gradient(to right, #f5f8fd, #fdfdfd)', minHeight: 'calc(100vh - 118px)' }}>
      <div className="row justify-content-between align-items-start">

        {/* Left Side: Session Info + Marks Table */}
        <div className="col-12 col-md-7 mb-4">

          {/* Session Info */}
          <div className="p-4 shadow rounded bg-white border transition-all"
            style={{ borderColor: '#ffc107', transition: 'transform 0.3s ease, border-color 0.3s ease', animation: 'fadeIn 1s ease-in-out' }}
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

          {/* Marks Table */}
          <div className="p-4 shadow rounded bg-white border transition-all mt-3"
            style={{ borderColor: '#4caf50', transition: 'transform 0.3s ease', animation: 'fadeIn 1.5s ease-in-out' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h5 className="fw-bold mb-3" style={{ color: '#4caf50' }}>
              📝 Marks Summary
            </h5>

            <div className="table-responsive">
              <table className="table table-striped table-bordered small">
                <thead className="table-success text-center">
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No marks found.</td></tr>
                  ) : (
                    marks.map((mark, idx) => (
                      <tr key={idx} className="text-center">
                        <td>{format(new Date(mark.dateMark), 'dd/MM/yyyy')}</td>
                        <td>{mark.name}</td>
                        <td>{mark.course}</td>
                        <td><b>{mark.mark}</b></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Side: Welcome + PieChart */}
        <div className="col-12 col-md-5 text-md-end text-center">
          {/* Welcome User */}
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
               Welcome, <span style={{ color: '#673ab7', fontWeight: 500 }}>
  {user && user.name ? user.name : 'User'}
</span><br />

                <small>Course: <span style={{ color: '#673ab7', fontWeight: 500 }}>{course}</span></small><br />
                <small>Date of Joining: <span style={{ color: '#673ab7', fontWeight: 500 }}>
  {user && user.dateCreated ? format(new Date(user.dateCreated), 'dd/MM/yyyy') : ''}
</span></small>{' '}
                <small>Tutor Name: <span style={{ color: '#673ab7', fontWeight: 500 }}>{tutor ? tutor.name : ''}</span></small>
              </span>
            </div>
          </div>
<br></br>
 {/*  PieChart */}
<div className="mt-4 ">
  <h6 className="mb-3" style={{ color: '#673ab7' }}>📊 Session Progress</h6>
  {pieData.length > 0 ? (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, value }) => {
            const hrs = Math.floor(value / 60);
            const min = value % 60;
            return `${name}: ${hrs} hr ${min} min`;
          }}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => {
            const hrs = Math.floor(value / 60);
            const min = value % 60;
            return [`${hrs} hr ${min} min`, ''];
          }}
        />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <div style={{ color: '#6c757d' }}>No session data</div>
  )}
</div>

{/* Bottom Full Notifications */}
<div
  className="p-4 shadow rounded bg-white border mb-4"
  style={{
    borderColor: '#007bff',
    transition: 'transform 0.3s ease',
    animation: 'fadeIn 1.2s ease-in-out'
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
>
  <h5
    className="fw-bold mb-3"
    style={{ color: '#673ab7', animation: 'textPop 1s ease-in-out' }}
  >
    🔔 All Notifications
  </h5>

  <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
    <table className="table table-striped table-bordered small">
      <thead className="table-info text-center">
        <tr>
          <th>Date</th>
          <th>Course</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {questionData.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center">No notifications found.</td>
          </tr>
        ) : (
         notifications.map((question, idx) => {
  const matchingAnswer = answers.find((ans) => {
    const pdfMatch = question.pdf?.some(qpdf => ans.pdf?.includes(qpdf));
    const imageMatch = question.image?.some(qimg => ans.questionImages?.includes(qimg));
    const dateMatch = ans.questionDateCreated === question.dateCreated;
    const emailMatch = ans.useremail === cookies.email;
    return (pdfMatch || imageMatch) && dateMatch && emailMatch;
  });




            const status = matchingAnswer?.status || 'Pending';
            let statusClass = 'bg-secondary text-white';

            if (status === 'Submitted') statusClass = 'bg-success';
            else if (status === 'Pending') statusClass = 'bg-warning text-dark';
            else if (status === 'Completed') statusClass = 'bg-primary';
            else if (status === 'On-Progress') statusClass = 'bg-info text-dark';

            return (
              <tr key={idx} className="text-center">
                <td>{format(new Date(question.dateCreated), 'dd/MM/yyyy')}</td>
                <td>{question.course}</td>
                <td>
                  <span className={`badge ${statusClass}`}>
                    {status}
                  </span>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
</div>



        </div>





      </div>
    </div>
  );
};

export default UserDashboard;
