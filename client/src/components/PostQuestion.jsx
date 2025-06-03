import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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



const PostQuestion = () => {

  const [formData, setFormData] = useState({
    course: '',
    image: '',
    
    
  });
  const [validationErrors, setValidationErrors] = useState({});


  const postQuestionData = async () => {
  if (!formData.course || !formData.imageFiles || formData.imageFiles.length === 0) {
    setValidationErrors({ message: "Course and at least one image are required" });
    return;
  }

  const adminEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)adminemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
  const token = localStorage.getItem('token');

  const data = new FormData();
  data.append("course", formData.course);
  data.append("adminemail", adminEmail);
  data.append("status", "pending");

  for (let i = 0; i < formData.imageFiles.length; i++) {
    data.append("image", formData.imageFiles[i]);
  }

  try {
    const response = await fetch(`https://codespace-backend-piac.onrender.com/uploads/${image}/question/`, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
      },
      body: data,
    });

    if (response.ok) {
      alert("Question papers uploaded successfully!");
      window.location.href = "admin_home";
    } else {
      alert("Upload failed!");
    }
  } catch (error) {
    console.error("Error uploading:", error);
  }
};


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
        // Reset validation error htmlFor the current field when it's being modified
        setValidationErrors({
          ...validationErrors,
          [name]: '',
        });

  };
   

  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();
 
    postQuestionData();
  };




  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt="" style={{ width: "200px", height: "70px" }} />   <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">College</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>Add Question</h6>
          </div>
          {/* Error message */}
          {validationErrors.message && (
                <div className="alert alert-danger">{validationErrors.message}</div>
              )}
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>
              <div className="mb-3">
  <div className="title mb-2"><span>Course:</span></div>
  <select
    className="form-control"
    name="course"
    value={formData.course}
    onChange={handleInputChange}
  >
    <option value="">-- Select a Course --</option>
    <option value="C">C</option>
    <option value="C++">C++</option>
    <option value="C#">C#</option>
    <option value="Java">Java</option>
    <option value="JavaScript">JavaScript</option>
    <option value="Python">Python</option>
    <option value="MERN Full Stack Development">MERN Full Stack Development</option>
    <option value="MEAN Full Stack Development">MEAN Full Stack Development</option>
    <option value="Data Structures">Data Structures</option>
    <option value="Web Development">Web Development</option>
    <option value="React Native">React Native</option>
    <option value="AI">Artificial Intelligence</option>
    <option value="Cloud Computing">Cloud Computing</option>
    <option value="Data Base">Data Bases</option>
    <option value="Fundamentals of Web Technology">Fundamentals of Web Technology</option>
  </select>
</div>

<div className="mb-3">
  <div className="title mb-2"><span>Upload Images:</span></div>
  <input
    type="file"
    multiple
    accept="image/*"
    className="form-control"
    onChange={(e) => setFormData({ ...formData, imageFiles: e.target.files })}
  />
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
            
            <div className="footer-nav-area" id="footerNav" style={{ backgroundColor: "#fff", borderTop: "1px solid #ddd", height:"fit-content", }}>
  <div className="container h-100 px-0">
    <div className="suha-footer-nav h-100 d-flex flex-column justify-content-between">

      {/* Navigation Links */}
      <ul className="h-100 d-flex align-items-center justify-content-center ps-0 mb-2">
        <li className="active">
          <Link to="/admin_home"><i className="lni lni-home"></i> Home</Link>
        </li>
        <li><Logout /></li>
      </ul>

      {/* Footer Bottom Row */}
      <div className="d-flex justify-content-between align-items-center w-100 px-0 pb-0 text-dark medium">
        <span>© Codespace Solutions | All Rights Reserved</span>
        <span className="d-flex gap-4">
  <a href="https://wa.me/" target="_blank" rel="noreferrer"><i className="fa fa-whatsapp fa-lg text-success"></i></a>
  <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg text-primary"></i></a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa fa-instagram fa-lg text-danger"></i></a>
</span>

      </div>

    </div>
  </div>
</div>


</div>
</div>
  )
}

export default PostQuestion