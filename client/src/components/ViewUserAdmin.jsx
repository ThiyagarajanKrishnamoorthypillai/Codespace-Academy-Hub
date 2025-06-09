import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
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
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewUserAdmin = () => {
  
 

  const [donationData, setDonationData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/`);
        if (response.status === 200) {
          setDonationData(response.data);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchDonationData();
  }, []);

   // Filter data based on the search term
   const filteredData = donationData.filter((user) =>{ 
        const isMatch = Object.values(user).some((field) =>
     field.toString().toLowerCase().includes(searchTerm.toLowerCase() )
     );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = user.status.toLowerCase() === 'approved';

    return isMatch;
  });  

  return (
    <div>
        <div>
      
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>User Details</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((user) => (
              <div key={user._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >Student Name:  <b> {user.name} </b></a>
                      <a className="product-title d-block"  >Student's Email: {user.email} </a>
                      <a className="product-title d-block"  >Course: {user.course}  </a>
                      
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

export default ViewUserAdmin