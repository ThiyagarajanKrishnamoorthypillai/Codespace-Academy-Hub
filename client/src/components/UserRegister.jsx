import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import imgfolder from "./img/core-img/logo-white.png";

const UserRegister = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        passwordHash: '',
        phone: '',
        city: '',
        course:'',
        question1: '',
        question2: '',
      });
    
      const [validationErrors, setValidationErrors] = useState({});
        
    /////////////Email Validation //////////////
      const [existingEmails, setExistingEmails] = useState([]);

      useEffect(() => {
        const fetchExistingEmails = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/v1/user/');
            const emails = response.data.map(user => user.email);
            setExistingEmails(emails);
          } catch (error) {
            console.error('Error fetching existing emails:', error);
          }
        };

        fetchExistingEmails();
      }, []);
    /////////////Email Validation //////////////

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value,
        });
    
        // Reset validation error htmlFor the current field when it's being modified
        setValidationErrors({
          ...validationErrors,
          [name]: '',
        });
      };
    
      const validateForm = () => {
        let isValid = true;
        const errors = {};
    
        // Validate phone number
        if (!/^\d{10}$/.test(userData.phone)) {
          errors.phone = 'Phone must be a 10-digit number';
          isValid = false;
        }
    
        // Validate password
        if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(userData.passwordHash)) {
          errors.password =
            'Password must have at least one digit, one uppercase letter, one special character, and be at least 8 characters long';
          isValid = false;
        }
    
      // Validate email (you might want to use a more sophisticated email validation)
      //const existingEmails = ['panner224@gmail.com', 'anotherexisting@example.com'];
      if (existingEmails.includes(userData.email.toLowerCase())) {
        errors.email = 'Email already exists';
        isValid = false;
      }

        setValidationErrors(errors);
    
        return isValid;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          // Validation failed, do not proceed with the submission
          return;
        }
        
    try {
      const response = await fetch('http://localhost:4000/api/v1/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Successfully submitted
        console.log('Form data submitted successfully!');
        //history.push('/'); // Redirect to the home page
        alert('Registered Successfully.')
        window.location.href = "/user_login";

      } else {
        // Handle errors
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }

      };
    


  return (
    <div>
            
        <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
             <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
                <img className="big-logo" src={imgfolder} alt="" ></img>                
                        <div className="register-form mt-5 px-4">
                        <form onSubmit={handleSubmit}>
  
              
                          <div className="form-group text-start mb-4"><span>Username</span>
                    <label htmlFor="username"><i className="lni lni-user"></i></label>
                    <input className="form-control" name="name" id="name"  value={userData.name} onChange={handleChange}  type="text" placeholder="Enter the name"/>
                  </div>
                  {validationErrors.email && <p style={{ color: 'white' }}>{validationErrors.email}</p>}


                  <div className="form-group text-start mb-4"><span>Email</span>
                    <label htmlFor="email"><i className="lni lni-envelope"></i></label>
                    <input className="form-control" name="email" id="email" value={userData.email} onChange={handleChange}  type="email" placeholder="Enter email id"/>
                  </div>
                  
                  {validationErrors.password && <p style={{ color: 'white' }}>{validationErrors.password}</p>}
                  <div className="form-group text-start mb-4"><span>Password</span>
                    <label htmlFor="passwordHash"><i className="lni lni-lock"></i></label>
                    <input className="input-psswd form-control"   name="passwordHash" id="passwordHash" value={userData.passwordHash} onChange={handleChange}  type="password" placeholder="Password"/>
                  </div>
                

        {validationErrors.phone && <p style={{ color: 'white' }}>{validationErrors.phone}</p>}
            <div className="form-group text-start mb-4"><span>Mobile</span>
                    <label htmlFor="mobile"><i className="lni lni-arrow-right"></i></label>
                    <input className="form-control" name="phone" id="phone"  value={userData.phone} onChange={handleChange} type="number" placeholder="Mobile"/>
                  </div>

          
            <div className="form-group text-start mb-4"><span>City</span>
                    <label htmlFor="field_2"><i className="lni lni-arrow-right"></i></label>
                    <input className="form-control" name="city" id="city"  value={userData.city} onChange={handleChange} type="text" placeholder="City"/>
                  </div>
  <div className="form-group text-start mb-4"><span>Course </span> 
  <label htmlFor="course" ><i className="lni lni-arrow-right ms-2"></i>
   
  </label>

  <select
    className="form-select"
    id="course"
    name="course"
    value={userData.course}
    onChange={handleChange}
    style={{
      color: '#000',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      padding: '0.5rem'
    }}
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




				  <div className="form-group text-start mb-4"><span>What is your pet animal name?</span>
                  <label htmlFor="field_3"><i className="lni lni-arrow-right"></i></label>
                  <input className="form-control" name="question1" id="question1"   value={userData.question1} onChange={handleChange} type="text" placeholder="enter the answer"/>
                </div>
				 <div className="form-group text-start mb-4"><span>What is your school best friend name?</span>
                  <label htmlFor="field_4"><i className="lni lni-arrow-right"></i></label>
                  <input className="form-control" name="question2"id="question2"   value={userData.question2} onChange={handleChange} type="text" placeholder="enter the answer"/>
                </div>
                <button className="btn btn-warning btn-lg w-100" type="submit">Sign Up</button>


                        </form>
                        </div>
                                
                    <div className="login-meta-data">
                    <p className="mt-3 mb-0">Already have an account?<Link to="/user_login" className="ms-1" >Sign In</Link></p>
                    </div>
        

                </div>
                </div>
            </div>
        </div>
        </div>

  )
}

export default UserRegister