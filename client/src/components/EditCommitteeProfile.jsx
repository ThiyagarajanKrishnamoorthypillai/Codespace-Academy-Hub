import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditCommitteeProfile = () => {
  const { id } = useParams();

  const [committeeData, setCommitteeData] = useState({
    email: '',
    passwordHash: '',
  });

  useEffect(() => {
    const fetchCommitteeDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/committee/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCommitteeData({
            email: data.email,
            passwordHash: data.passwordHash
          });
        } else {
          console.error('Error fetching committee data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching committee data:', error.message);
      }
    };

    fetchCommitteeDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommitteeData({
      ...committeeData,
      [name]: value,
    });
  };

  const handleUpdateCommittee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/committee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(committeeData),
      });

      if (response.ok) {
        alert('Committee profile updated successfully!');
        window.location.href = "/committee_home/committee_profile";
      } else {
        console.error('Error updating committee profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating committee profile:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Edit Committee Profile</h4>
      <form onSubmit={handleUpdateCommittee}>
        <div className="mb-3">
          <label>Email</label>
          <input type="text" name="email" className="form-control" value={committeeData.email} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label>PasswordHash</label>
          <input type="text" name="passwordHash" className="form-control" value={committeeData.passwordHash} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    </div>
  );
};

export default EditCommitteeProfile;
