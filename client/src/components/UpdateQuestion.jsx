import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const UpdateQuestion = () => {
  const { id } = useParams();

  const [editedQuestion, setEditedQuestion] = useState({
    course: '',
    adminemail: '',
    existingImages: [],
    newImages: [],
    existingPdfs: [],
    newPdfs: []
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/question/${id}`);
        const data = response.data;
        setEditedQuestion({
          course: data.course || '',
          adminemail: data.adminemail || '',
          existingImages: data.image || [],
          newImages: [],
          existingPdfs: data.pdf || [],
          newPdfs: []
        });
      } catch (error) {
        console.error('Error fetching question:', error.message);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleCourseChange = (e) => {
    setEditedQuestion({ ...editedQuestion, course: e.target.value });
  };

  const handleImageChange = (e) => {
    setEditedQuestion({ ...editedQuestion, newImages: [...e.target.files] });
  };

  const handlePdfChange = (e) => {
    setEditedQuestion({ ...editedQuestion, newPdfs: [...e.target.files] });
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = [...editedQuestion.existingImages];
    updatedImages.splice(index, 1);
    setEditedQuestion({ ...editedQuestion, existingImages: updatedImages });
  };

  const handleRemoveExistingPdf = (index) => {
    const updatedPdfs = [...editedQuestion.existingPdfs];
    updatedPdfs.splice(index, 1);
    setEditedQuestion({ ...editedQuestion, existingPdfs: updatedPdfs });
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('course', editedQuestion.course);
    formData.append('adminemail', editedQuestion.adminemail);

    formData.append('existingImages', JSON.stringify(editedQuestion.existingImages));
    formData.append('existingPdfs', JSON.stringify(editedQuestion.existingPdfs));

    for (let i = 0; i < editedQuestion.newImages.length; i++) {
      formData.append('newImages', editedQuestion.newImages[i]);
    }

    for (let i = 0; i < editedQuestion.newPdfs.length; i++) {
      formData.append('newPdfs', editedQuestion.newPdfs[i]);
    }

    try {
      await axios.put(`/question/${id}`, formData);
      alert('Question updated successfully!');
      window.location.href = '/admin_home/view_question_admin';
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update question.');
    }
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4">Update Question</h4>
      <form onSubmit={handleUpdateQuestion} className="shadow p-4 rounded bg-light">

        <div className="mb-3">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            value={editedQuestion.course}
            onChange={handleCourseChange}
          />
        </div>

        <div className="mb-3">
          <label>Existing Images:</label>
          <div className="d-flex flex-wrap">
            {editedQuestion.existingImages.map((img, index) => (
              <div key={index} className="me-3 mb-2 text-center">
                <img src={img} alt="img" className="img-thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <br />
                <button type="button" className="btn btn-sm btn-danger mt-1" onClick={() => handleRemoveExistingImage(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label>Upload New Images:</label>
          <input type="file" multiple accept="image/*" className="form-control" onChange={handleImageChange} />
        </div>

        <div className="mb-3">
          <label>Existing PDFs:</label>
          <div className="d-flex flex-wrap">
            {editedQuestion.existingPdfs.map((pdf, index) => (
              <div key={index} className="me-3 mb-2 text-center">
                <i className="fa fa-file-pdf-o text-danger" style={{ fontSize: '40px' }}></i>
                <br />
                <a href={pdf} target="_blank" rel="noopener noreferrer" className="small">View</a>
                <br />
                <button type="button" className="btn btn-sm btn-danger mt-1" onClick={() => handleRemoveExistingPdf(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label>Upload New PDFs:</label>
          <input type="file" multiple accept="application/pdf" className="form-control" onChange={handlePdfChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
