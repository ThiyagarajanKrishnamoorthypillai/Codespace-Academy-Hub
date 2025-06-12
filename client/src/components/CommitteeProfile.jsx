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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const CommitteeProfile = () => {
    

  const navigate = useNavigate();

const EditProfile = (id) => {
  navigate("//" + id);
}

  const [filteredData, setBinData] = useState([]);

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/`);
        const data = await response.json();
        // Assuming 'email' is the key in cookies
        const adminemail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)adminemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter location data based on vendoremail
         const filteredBin = data.filter((admin) => admin.email === adminemail);
        if (response.status === 200) {
          setBinData(filteredBin);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchBinData();
  }, []);

  

  // Format time
  const timeOptions = { hour: '2-digit', minute: '2-digit' };


  return (
    <div>
        <div>
      
        
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>My Profile</h6>
            
          </div>
        

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((admin) => (
              <div key={admin._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body">
                  
                      
                      <a className="product-title d-block"  >Email:  <b> {admin.email} </b></a>
                                           
                      
                    </div>
                  </div>   
              </div>


              ))}
              
        </div>
           
        </div>
    </div>


            
          



</div>


</div>
</div>
  )
}

export default CommitteeProfile