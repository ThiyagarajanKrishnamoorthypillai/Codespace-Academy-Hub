import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// vendoremail  useremail  complaint mobile lat long status

const PostFeedback = () => {
  const location = useLocation();
const { image, course, dateCreated } = location.state || {};
const [cookies] = useCookies(['email']);

  //const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
const imageArray = Array.isArray(image) ? image : image ? [image] : [];

  const [formData, setFormData] = useState({
  useremail: cookies.email || '',
  name: '',
  feedback: '',
  image: imageArray || '',
  course: course || '',
  dateCreated: dateCreated || '',
  userFeedbackdateCreated: '',
  status: 'Pending'
});

  const postFeedback = async () => {
    const token = localStorage.getItem('token');
    //console.log(userEmail);  // Output: donar@gmail.com
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      body: JSON.stringify({
  ...formData,
  useremail: cookies.email
}),

      });

      if (response.ok) {
        console.log('Feedback data posted successfully!');
        // Handle success, e.g., redirect to another page
        alert('Submitted Successful');
        window.location.href = "/user_home";

      } else {
        console.error('Error posting Feedback data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting Feedback data:', error.message);
    }
  }



  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
  };


const handleSubmit = (e) => {
  e.preventDefault();

  const now = new Date().toISOString(); // ✅ current time

  setFormData((prev) => ({
    ...prev,
    userFeedbackdateCreated: now,
  }));

  // Ensure postFeedback is called AFTER state is updated
  setTimeout(() => postFeedback(), 100);
};




  return (
    <div>
        <div>
      <AppHeader />
       
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>Post Feedback</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>

              <div className="mb-3">
                  <div className="title mb-2"><span>Name</span></div>
                  <input className="form-control"
                    name="name" id="name"
                    value={formData.name}
                    onChange={handleInputChange}    type="text"  />
                </div>
  				
                <div className="mb-3">
                  <div className="title mb-2"><span>Feedback | Doubt</span></div>
                  <input className="form-control" name="feedback" id="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}   type="text"/>
                </div>          
              
                <button className="btn btn-success w-100"  type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}



        </div>
      </div>
    </div>
            
                   <AppFooter />
             


</div>
</div>
  )
}

export default PostFeedback