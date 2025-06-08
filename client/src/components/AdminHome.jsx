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
import imgRequire from "./img/common.png";
import imgvRequire from "./img/book.png";
import imgCommon from "./img/common.png";
import imgvCommon from "./img/vcommon.png";
import view from "./img/vcommon.png";
import imgFeedback from "./img/vfeedback.png";
import imgProfile from "./img/man.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const AdminHome = () => {
  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt="" style={{ width: "200px", height: "70px" }} />  
 <Title /> </div>
        
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
            <h6 className="user-name mb-1">Codespace Academy Hub </h6>
         
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
          <div className="section-heading d-flex align-items-center justify-content-center">
            <h4 className="text-darkblue">Admin Home</h4>
          </div>
         
          
           

          <div className="row g-3">
 <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgCommon} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-darkblue" to="/start_session">
                  Duration  </Link> 
                    </div>
                </div>
              </div>
            </div>




            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgCommon} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-darkblue" to="/post_question">
                  Add Question Papers  </Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>

            
           <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgvCommon} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link className="text-darkblue" to="/view_question_admin">
                   View & Update Question Papers </Link> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgFeedback} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-darkblue" to="/view_answer_admin">
                 View Student's Answer Sheet</Link> 
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3">
              <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgRequire} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-darkblue" to="/view_feedback_admin">
                 View Student's Doubt's</Link> 
                    </div>
                </div>
              </div>
            </div>
  
              <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgvRequire} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-darkblue" to="/post_mark_admin">
                 Add Marks</Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>
              <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={view} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link className="text-darkblue" to="/view_marks_admin">
  View Marks
</Link>

                    </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={imgProfile} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link className="text-darkblue" to="/admin_profile">
  My Profile
</Link>

                    </div>
                </div>
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
</div>
  )
}

export default AdminHome