import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
import { useCookies } from 'react-cookie';
import axios from '../utils/axiosInstance';
import { differenceInMilliseconds, formatDistanceStrict } from 'date-fns';

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgRequest from "./img/request.png";
import imgFeed from "./img/feedback.png";
import imgBook from "./img/book.png";
import imgProfile from "./img/user.png";
import Logout from './Logout';
import Title from './Title';

const UserHome = () => {
  const [cookies] = useCookies(['name', 'email','course']);
  const userName = cookies.name || 'User';
  const course = cookies.course || 'User';
  const userEmail = cookies.email || '';
  const [sessionInfo, setSessionInfo] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');

const location = useLocation();

 useEffect(() => {
  const termsAccepted = localStorage.getItem('termsAccepted');
  if (!termsAccepted) {
    navigate('/terms');
  }
}, [location]);

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
          if (ms > 0) {
            setRemainingTime(formatDistanceStrict(now, end));
          } else {
            setRemainingTime('Finished');
          }
        }
      })
      .catch(err => console.error(err));
  }, [userEmail]);

  return (
    <div>
  

  {/* Page Content */}
  <div className="page-content-wrapper">
  <div className="top-products-area py-3">
    <div className="container py-3">

      {/* Top Row */}
      <div className="row justify-content-between align-items-center mb-4">
        {/* Left: Session Info Inline */}
        {sessionInfo && (
          <div className="col-12 col-md-7">
            <div className="bg-light border rounded p-3 shadow-sm">
              <h6 className="fw-bold text-dark mb-2">Current Session</h6>
              <div className="d-flex flex-wrap gap-3">
                <span><b>Course: </b> {sessionInfo.course}</span>
                <span><b>Batch: </b> {sessionInfo.batch}</span>
                <span><b>Status: </b> <span className="text-primary">{sessionInfo.status || 'Ongoing'}</span></span>
                <span><b>Duration: </b> {sessionInfo.durationHours} hrs</span>
                <span>
  <b>Remaining: </b>
  <span className={remainingTime <= 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
    {remainingTime <= 0 ? 'Finished' : `${Math.ceil(remainingTime / (1000 * 60 * 60))} hours`}
  </span>
</span>

              </div>
            </div>
          </div>
        )}

        {/* Right: Welcome */}
        <div className="col-12 col-md-5 text-md-end text-center mt-4 mt-md-0 d-flex align-items-center justify-content-md-end justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Icon"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid #0d6efd',
              backgroundColor: '#fff',
              marginRight: '10px',
            }}
          />
          <h4 className="d-inline fw-bold text-primary mb-0">
            Welcome, <span className="text-success">{userName}</span>{' '}
              <span className="text-primary">{course}</span>
          </h4>
        </div>
      </div>

      {/* Main Cards Section */}
      <div className="row g-4 justify-content-center">

        {/* Card Item */}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center p-3 h-100 border border-primary shadow-sm hover-shadow">
            <img src={imgRequest} className="img-fluid mb-2" style={{ height: 60, objectFit: 'contain' }} />
            <Link className="text-dark fw-bold mt-1" to="/view_question_user">View Question Paper</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center p-3 h-100 border border-primary shadow-sm hover-shadow">
            <img src={imgFeed} className="img-fluid mb-2" style={{ height: 60, objectFit: 'contain' }} />
            <Link className="text-dark fw-bold mt-1" to="/view_feedback_user">View Feedback / Doubts</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center p-3 h-100 border border-primary shadow-sm hover-shadow">
            <img src={imgBook} className="img-fluid mb-2" style={{ height: 60, objectFit: 'contain' }} />
            <Link className="text-dark fw-bold mt-1" to="/view_answer_user">View Answer</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center p-3 h-100 border border-primary shadow-sm hover-shadow">
            <img src={imgProfile} className="img-fluid mb-2" style={{ height: 60, objectFit: 'contain' }} />
            <Link className="text-dark fw-bold mt-1" to="/view_marks_user">View My Marks</Link>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center p-3 h-100 border border-primary shadow-sm hover-shadow">
            <img src={imgProfile} className="img-fluid mb-2" style={{ height: 60, objectFit: 'contain' }} />
            <Link className="text-dark fw-bold mt-1" to="/user_profile">My Profile</Link>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


  {/* Footer */}
  <div className="footer-nav-area" id="footerNav">
    <div className="container h-100 px-0">
      <div className="suha-footer-nav h-100">
        <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
          <li className="active"><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>
        </ul>
      </div>
    </div>
  </div>
</div>


  );
};

export default UserHome;
