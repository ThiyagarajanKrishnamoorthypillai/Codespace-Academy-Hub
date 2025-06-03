// ✅ UPDATED FILE: PostAnswer.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import "./css/bootstrap.min.css";
import "./css/style.css";

const PostAnswer = () => {
  const useremail = Cookies.get('email');
  const courseCookie = Cookies.get('course');
  const location = useLocation();
  const navigate = useNavigate();

  const { date, course = courseCookie, images = [] } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    stdid: '',
    dpt: '',
    college: '',
    imageFiles: []
  });
  const [status, setStatus] = useState('Pending');
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, imageFiles: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.stdid || !formData.dpt || !formData.college || formData.imageFiles.length === 0) {
      setValidationErrors({ message: 'Please fill all fields and upload at least one image.' });
      return;
    }

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('useremail', useremail);
    data.append('name', formData.name);
    data.append('stdid', formData.stdid);
    data.append('dpt', formData.dpt);
    data.append('college', formData.college);
    data.append('course', course);
    data.append('status', status);
    data.append('dateCreated', date);
    data.append('questionDateCreated', new Date().toISOString());
    data.append('questionCourse', course);
    data.append('questionImages', JSON.stringify(images));

    for (let i = 0; i < formData.imageFiles.length; i++) {
      data.append('images', formData.imageFiles[i]);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/answer/`, {
        method: 'POST',
        headers: { 'x-auth-token': token },
        body: data
      });

      if (response.ok) {
        alert('Answer submitted successfully!');
        navigate("/view_answer_user");
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}><img src={imgSmall} alt="" style={{ width: "200px", height: "70px" }} />   <Title /></div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgBg} alt="" /></div>
            <div className="user-info"><h6 className="user-name mb-1">College</h6></div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Post Answersheet</h6>
            </div>

            {validationErrors.message && <div className="alert alert-danger">{validationErrors.message}</div>}

            <div className="card user-data-card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleInputChange} />
                  <input className="form-control mb-2" name="stdid" placeholder="Student ID" onChange={handleInputChange} />
                  <input className="form-control mb-2" name="dpt" placeholder="Department" onChange={handleInputChange} />
                  <input className="form-control mb-2" name="college" placeholder="College" onChange={handleInputChange} />
{/*
                  <select className="form-control mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="On-Progress">On-Progress</option>
                  </select>*/}

                  <input className="form-control mb-3" type="file" accept="image/*" multiple onChange={handleFileChange} />
                  <button className="btn btn-success w-100" type="submit">Submit</button>
                </form>

                {/* Display question images */}
                {images && images.length > 0 && (
                  <div className="row mt-4">
                    {images.map((img, idx) => (
                      <div className="col-6 col-md-3 mb-3" key={idx}>
                        <img src={img} alt="Question Img" className="img-fluid rounded" />
                      </div>
                    ))}
                  </div>
                )}
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
    </div>
  );
};

export default PostAnswer;
