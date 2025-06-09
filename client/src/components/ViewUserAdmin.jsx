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
  
 

  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/`);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

   // Filter data based on the search term
   const filteredData = userData.filter((user) =>{ 
        const isMatch = Object.values(user).some((field) =>
     field.toString().toLowerCase().includes(searchTerm.toLowerCase() )
     );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = user.status.toLowerCase() === 'approved';

    return isMatch;
  });  
const handleDelete = async (userId) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/user/${userId}`);
    setUserData((prev) => prev.filter((u) => u._id !== userId));
  } catch (err) {
    console.error("Delete error", err);
  }
};


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

            <div className="card shadow-sm p-3 bg-white rounded mt-4">
  <h5 className="mb-3 text-center text-primary fw-bold">User List</h5>
<table className="table table-hover table-bordered text-center">
  <thead className="table-primary">
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Course</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((u, index) => (
      <tr key={u._id} className="align-middle">
        <td>{index + 1}</td>
        <td className="fw-semibold text-dark">{u.name}</td>
        <td className="text-muted">{u.email}</td>
        <td className="text-info fw-medium">{u.course}</td>
        <td>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${u.name}?`)) {
                handleDelete(u._id);
              }
            }}
          >
            ❌ Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>


           
        </div>
    </div>


            
            



</div>


</div>
</div>
  )
}

export default ViewUserAdmin