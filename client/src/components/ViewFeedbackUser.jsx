import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import AppFooter from '../components/AppFooter';
import AppFooter from '../components/AppHeader';
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewFeedbackUser = () => {
    
  ////////////////////////////////////////////////
  ////////////// Get Details Location ////////////
  ////////////////////////////////////////////////


  const [feedbackData, setFeedbackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback/`);
        const data = await response.json();

        // Assuming 'userEmail' is the key in cookies
        const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter feedback data based on vendoremail
         const filteredFeedback = data.filter((feedback) => feedback.useremail === userEmail);
         setFeedbackData(filteredFeedback);
         setFilteredData(filteredFeedback);
        
      } catch (error) {
        console.error('Error fetching feedback data:', error.message);
      
      }
    };

    fetchFeedbackData();
  }, []);



  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = feedbackData.filter((feedback) =>
      Object.values(feedback).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

          const timeOptions = { hour: '2-digit', minute: '2-digit' };


  return (
    <div>
        <div>
      
              <AppHeader />

    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>My Feedbacks</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>

                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row" style={{marginTop:10}}>
                
     {filteredData.map((feedback, index) => (
  <div key={index} className="col-12">
    <div className="card shadow-sm p-3 mb-3">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-6 border-end">
          <p><b>Name:</b> {feedback.name}</p>
          <p><b>Email:</b> {feedback.useremail}</p>
          <p><b>Course:</b> {feedback.course}</p>
          <p><b>Feedback:</b> {feedback.feedback}</p>
          <p><b>Submitted On:</b> {new Date(feedback.dateCreated).toLocaleString()}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6">
          <p><b>Admin Explanation:</b> <br />
            {feedback.explanation
              ? <span className="text-success">{feedback.explanation}</span>
              : <span className="text-muted">No explanation yet</span>}
          </p>

          <p><b>Status:</b></p>
          <select
            className="form-select mb-2"
            value={feedback.status}
            disabled={!feedback.explanation}
            onChange={(e) => {
              const updated = filteredData.map((f) =>
                f._id === feedback._id ? { ...f, status: e.target.value } : f
              );
              setFilteredData(updated);
            }}
          >
            <option value="Pending">Pending</option>
            <option value="Understand">Understand</option>
            <option value="Not-Understand">Not-Understand</option>
          </select>

          <p
            className="text-primary"
            style={{ cursor: feedback.explanation ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
            onClick={async () => {
              if (!feedback.explanation) return;

              try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback/update-status/${feedback._id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: feedback.status }),
                });

                if (res.ok) {
                  alert("Status updated successfully.");
                } else {
                  alert("Failed to update status.");
                }
              } catch (err) {
                alert("Error occurred while updating.");
                console.error(err);
              }
            }}
          >
            ✔️ Click here to update status
          </p>
        </div>
      </div>
    </div>
  </div>
))}


        </div>
           
        </div>
    </div>

<AppFooter/>
             


</div>


</div>
</div>
  )
}

export default ViewFeedbackUser