import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

const CommitteePostQuestion = () => {
  const [formData, setFormData] = useState({
    course: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const postQuestionData = async () => {
    if (!formData.course ||
      ((!formData.imageFiles || formData.imageFiles.length === 0) &&
        (!formData.pdfFiles || formData.pdfFiles.length === 0))) {
      setValidationErrors({ message: "Course and at least one image or one PDF is required" });
      return;
    }

    const committeeEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)committeeemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));

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
      await axios.post(`/question/`, data);
      alert("Question papers uploaded successfully!");
      window.location.href = "/committee_home/view_question_committee";
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postQuestionData();
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4">Post Question (Committee)</h4>

      {validationErrors.message && <div className="alert alert-danger">{validationErrors.message}</div>}

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label>Course</label>
          <input type="text" name="course" className="form-control"
            value={formData.course} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label>Upload Images</label>
          <input type="file" multiple accept="image/*" className="form-control"
            onChange={(e) => setFormData({ ...formData, imageFiles: e.target.files })} />
        </div>

        <div className="mb-3">
          <label>Upload PDFs</label>
          <input type="file" multiple accept="application/pdf" className="form-control"
            onChange={(e) => setFormData({ ...formData, pdfFiles: e.target.files })} />
        </div>

        <button className="btn btn-success w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommitteePostQuestion;
