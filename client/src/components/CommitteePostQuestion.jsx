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
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const CommitteePostQuestion = () => {
  const [formData, setFormData] = useState({
    course: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const postQuestionData = async () => {
    if (!formData.course || !formData.imageFiles || formData.imageFiles.length === 0) {
      setValidationErrors({ message: "Course and at least one image are required" });
      return;
    }

    // ✅ Read committeeemail from cookie
    const committeeEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)committeeemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append("course", formData.course);
    data.append("committeeemail", committeeEmail);
    data.append("status", "pending");

   for (let i = 0; i < (formData.imageFiles?.length || 0); i++) {
  data.append("images", formData.imageFiles[i]);
}
for (let i = 0; i < (formData.pdfFiles?.length || 0); i++) {
  data.append("pdfs", formData.pdfFiles[i]);
}


    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/question/`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: data,
      });

      if (response.ok) {
        alert("Question papers uploaded successfully!");
        window.location.href = "/committee_home/view_question_committee";
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postQuestionData();
  };

  return (
    <div>
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Add Question (Committee Panel)</h6>
            </div>

            {validationErrors.message && (
              <div className="alert alert-danger">{validationErrors.message}</div>
            )}

            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                      <div className="title mb-2"><span>Course:</span></div>
                      <select
                        className="form-control"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
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

                    <div className="mb-3">
  <div className="title mb-2"><span>Upload PDFs:</span></div>
  <input
    type="file"
    multiple
    accept="application/pdf"
    className="form-control"
    onChange={(e) => setFormData({ ...formData, pdfFiles: e.target.files })}
  />
</div>


                    <button className="btn btn-success w-100" type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteePostQuestion;
