import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TutorProfile = () => {
  const navigate = useNavigate();
  const EditProfile = (id) => {
    navigate("/edit_tutor_profile/" + id);
  }

  const [tutorData, setTutorData] = useState([]);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tutor/`);
        const data = await response.json();

        const tutoremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)tutoremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));

        const filtered = data.filter((tutor) => tutor.email === tutoremail);

        if (response.status === 200) {
          setTutorData(filtered);
        } else {
          console.error('Error fetching tutor data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tutor data:', error.message);
      }
    };

    fetchTutorData();
  }, []);

  return (
    <div>
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Tutor's Profile</h6>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              {tutorData.map((tutor) => (
                <div key={tutor._id} className="col-12 col-md-6">
                  <div className="card product-card" style={{ marginBottom: 10 }}>
                    <div className="card-body">
                      <p>Tutor Name: <b>{tutor.name}</b></p>
                      <p>Email: <b>{tutor.email}</b></p>
                      <p>Course: <b>{tutor.course}</b></p>

                      <p>PasswordHash: <b>{tutor.passwordHash}</b></p>
                    </div>
                  </div>

                 {/* <button className="btn btn-danger" onClick={() => EditProfile(tutor.id)}>
                    Edit Profile
                  </button>*/}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorProfile;
