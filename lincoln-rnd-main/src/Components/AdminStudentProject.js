import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Register.css";
import "../Css/OverlayLoader.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "./Config";

const StudentProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [student, setStudent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState([]); // Array of files
  const [document, setDocument] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const url = API_ENDPOINT + "admin_student_projects.php";

    let fData = new FormData();
    fData.append("title", title);
    fData.append("description", description);
    fData.append("student", student);
    fData.append("link", link);
    fData.append("category", category);

    // Append each selected image/video
    if (Array.isArray(image) && image.length > 0) {
      image.forEach(file => {
        fData.append("images[]", file);
      });
    }

    if (document) {
      fData.append("document", document);
    }

    try {
      const response = await axios.post(url, fData);
      setSuccess(response.data.success || "Submission successful.");
      setError("");

      // Reset form
      setTitle("");
      setDescription("");
      setStudent("");
      setLink("");
      setCategory("");
      setImage([]);
      setDocument(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (documentInputRef.current) documentInputRef.current.value = "";

      navigate("/admindash/adminviewstudentprojects");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "An error occurred while submitting."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content">
      <div className="formbody">
        <div className="form-container">
          <h2>Student Project Form</h2>
          <Link className="text-link button" to="/admindash">
            Back To Dashboard
          </Link>
          {error && <p style={{ color: "red", margin: 15 }}>{error}</p>}
          {success && <p style={{ color: "green", margin: 15 }}>{success}</p>}
          <form className="projectform">
            <div className="form-group">
              <label htmlFor="title">Project Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Project Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Abstract:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Project Abstract"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                cols="150"
              />
            </div>
            <div className="form-group">
              <label htmlFor="student">Student Name:</label>
              <input
                type="text"
                id="student"
                name="student"
                placeholder="Enter Student Name"
                required
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">Link:</label>
              <input
                type="text"
                id="link"
                name="link"
                placeholder="Enter Project Link"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Computer Software Engineering">Computer Software Engineering</option>
                <option value="English and Mass Communication">English and Mass Communication</option>
                <option value="Physcology">Physcology</option>
                <option value="Foundation in Nursing">Foundation in Nursing</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="images">
                Upload Pictures & Videos [JPG, PNG, MP4, WEBM] [10MB Limit Each]:
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*,video/*"
                ref={imageInputRef}
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImage(files);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="document">
                Upload Documentation ["pdf", "doc", "docx"] [20mb Limit]:
              </label>
              <input
                type="file"
                id="document"
                name="document"
                accept=".pdf,.doc,.docx"
                ref={documentInputRef}
                onChange={(e) => setDocument(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {loading && (
              <div className="overlay-loader">
                <div className="loader-spinner"></div>
                <span>Submitting...</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProject;