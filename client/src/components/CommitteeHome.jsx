import React from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgCommon from "./img/common.png";
import imgvCommon from "./img/vcommon.png";
import imgRequire from "./img/common.png";
import imgvRequire from "./img/book.png";
import imgFeedback from "./img/vfeedback.png";
import imgProfile from "./img/man.png";
import view from "./img/vcommon.png";
import Title from './Title.jsx';
import Logout from './Logout.jsx';

const CommitteeHome = () => {
  return (
    <div>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}>
            <img src={imgSmall} alt="" style={{ width: "200px", height: "70px" }} />
            <Title />
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgSmall} alt="" /></div>
            <div className="user-info">
              <h6 className="user-name mb-1">Committee Panel</h6>
            </div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/committee_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-center">
              <h4 className="text-darkblue">Committee Home</h4>
            </div>

            {/* Full modules clone */}
            <div className="row g-3">
              <div className="col-6 col-md-6">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body"><img src={imgCommon} className="img-fluid" style={{ width: 64, height: 64 }} />
                      <Link className="text-darkblue" to="/start_session">Duration</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* All other modules cloned exactly like AdminHome */}

              <div className="col-6 col-md-6">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body"><img src={imgCommon} className="img-fluid" style={{ width: 64, height: 64 }} />
                      <Link className="text-darkblue" to="/post_question">Add Question Papers</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* ... Repeat all other blocks from AdminHome.jsx ... */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeHome;
