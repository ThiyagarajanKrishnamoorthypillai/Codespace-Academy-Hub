import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CommitteeProfile = () => {
  const navigate = useNavigate();
  const EditProfile = (id) => {
    navigate("/edit_committee_profile/" + id);
  }

  const [committeeData, setCommitteeData] = useState([]);

  useEffect(() => {
    const fetchCommitteeData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/committee/`);
        const data = await response.json();

        const committeeemail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)committeeemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));

        const filtered = data.filter((committee) => committee.email === committeeemail);

        if (response.status === 200) {
          setCommitteeData(filtered);
        } else {
          console.error('Error fetching committee data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching committee data:', error.message);
      }
    };

    fetchCommitteeData();
  }, []);

  return (
    <div>
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Committee Profile</h6>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              {committeeData.map((committee) => (
                <div key={committee._id} className="col-12 col-md-6">
                  <div className="card product-card" style={{ marginBottom: 10 }}>
                    <div className="card-body">
                      <p>Email: <b>{committee.email}</b></p>
                      <p>PasswordHash: <b>{committee.passwordHash}</b></p>
                    </div>
                  </div>

                 {/* <button className="btn btn-danger" onClick={() => EditProfile(committee.id)}>
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

export default CommitteeProfile;
