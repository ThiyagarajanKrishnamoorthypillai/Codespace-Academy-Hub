import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

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
import Cookies from 'js-cookie';
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import axios from 'axios';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({ name: '', course: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const email = Cookies.get('email');
      if (!email) return;

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile/${email}`);
      setUser(res.data.user);
      setEditableUser({
        name: res.data.user.name || '',
        course: res.data.user.course || '',
      });
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const email = Cookies.get('email');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update-by-email/${email}`, editableUser);
      setUser(res.data.user);
      setIsEditing(false);
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile:", err.message);
      alert("Failed to update profile.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) return <div className="text-center mt-5">Loading user profile...</div>;

  // Format time
  const timeOptions = { hour: '2-digit', minute: '2-digit' };


  return (
    <div>
        <div>
      
      
    <div className="page-content-wrapper">
      <div className="top-products-area py-0">
        <div className="container">
      
        
<div className="container mt-2">
      <h2 className="mb-4 text-center">User Profile</h2>
      <div className="card p-4 shadow-lg">
        <div className="mb-3">
          <label className="form-label fw-bold">Name:</label>
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              name="name"
              value={editableUser.name}
              onChange={handleChange}
            />
          ) : (
            <div className="text-primary">{user.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email:</label>
          <div className="text-muted">{user.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label text-muted fw-bold">Course:</label>
          {isEditing ? (
            <select
              className="form-control"
              name="course"
              value={editableUser.course}
              onChange={handleChange} disabled
            >
              <option value="">-- Select Course --</option>
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
            </select>
          ) : (
            <div className="text-primary">{user.course || "Not selected"}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Admin:</label>
          <div>{user.isAdmin ? "Yes" : "No"}</div>
        </div>

        <div className="d-flex justify-content-between">
          {isEditing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={handleEditToggle}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
           
        </div>
    </div>


            
            <div className="footer-nav-area" id="footerNav" style={{ backgroundColor: "#fff", borderTop: "1px solid #ddd", height:"fit-content", }}>
             <div className="container h-100 px-0">
               <div className="suha-footer-nav h-100 d-flex flex-column justify-content-between">
           
                 {/* Navigation Links */}
                 <ul className="h-100 d-flex align-items-center justify-content-center ps-0 mb-2">
                   <li className="active">
                     <Link to="/user_home"><i className="lni lni-home"></i> Home</Link>
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
</div>
  )
}

export default UserProfile