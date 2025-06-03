import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const UpdateQuestion = () => {
  const { id } = useParams();
  const [editedQuestion, setEditedQuestion] = useState({
  adminemail: '',
  course: '',
  existingImages: [],
  newImages: [],
});


  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/question/${id}`)
    .then(res => res.json())
    .then(data => {
      setEditedQuestion({
        adminemail: data.adminemail,
        course: data.course,
        existingImages: data.image,
        newImages: []
      });
    });
}, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({
      ...editedQuestion,
      [name]: value,
    });
  };

  const handleUpdateQuestion = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('course', editedQuestion.course);
  formData.append('adminemail', editedQuestion.adminemail);
  formData.append('existingImages', JSON.stringify(editedQuestion.existingImages));
  for (let i = 0; i < editedQuestion.newImages.length; i++) {
    formData.append('newImages', editedQuestion.newImages[i]);
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/question/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (response.ok) {
      alert("Updated successfully !");
      window.location.href = "/admin_home/view_question_admin";
    } else {
      console.error('Update failed');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
const handleRemoveImage = (imgToRemove) => {
  setEditedQuestion((prev) => ({
    ...prev,
    existingImages: prev.existingImages.filter((img) => img !== imgToRemove),
  }));
};


  // Function to add point-wise numbering to the description
  const formatDescription = (description) => {
    return description.split('\n').map((line, index) => {
      return <p key={index}>{index + 1}. {line}</p>;
    });
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

      </div>

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Edit Question details</h6>
            </div>

            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdateQuestion}>
                    <div className="mb-3">
  <div className="title mb-2"><span>Course:</span></div>
  <select
    className="form-control"
    name="course"
    value={editedQuestion.course}
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
  <div className="title mb-2"><span>Existing Images:</span></div>
  <div className="row">
    {editedQuestion.existingImages.map((img, index) => (
      <div key={index} className="col-4 position-relative mb-3">
      <img
  src={img} // ✅ Now uses full Cloudinary URL
  alt="existing"
  className="img-fluid border rounded"
/>

        <button
          type="button"
          className="btn btn-sm btn-danger position-absolute"
          style={{ top: 5, right: 5 }}
          onClick={() => handleRemoveImage(img)}
        >
          &times;
        </button>
      </div>
    ))}
  </div>
</div>


                    
                    
                    <button className="btn btn-success w-100" type="submit">Update</button>
                  </form>
                </div>
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
  )
}

export default UpdateQuestion;
