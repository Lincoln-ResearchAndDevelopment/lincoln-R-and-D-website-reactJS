import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/PSAUpload.css';
import { API_ENDPOINT } from './Config';

const PSAUpload = () => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const departments = [
    "Computer Software Engineering",
    "English and Mass Communication",
    "Physcology",
    "Foundation in Nursing",
    "Business Administration",
  ];


  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fData = new FormData();
    fData.append('student_name', studentName);
    fData.append('studentid', studentId);
    fData.append('department', department);
    fData.append('title', title);
    fData.append('project_link', projectLink);
    fData.append('supervisor_name', supervisorName);
    if (reportFile) {
        fData.append('report_file', reportFile);
    }

    try {
      const response = await axios.post(`${API_ENDPOINT}add_psa_project.php`, fData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.status === 'success') {
        setError('');
        setSuccess('PSA Upload was successful!');
        setStudentName('');
        setStudentId('');
        setTitle('');
        setProjectLink('');
        setSupervisorName('');
        setReportFile(null);
      } else {
        setError(response.data.message || 'Upload failed. Please check your inputs.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred while submitting.');
      setSuccess('');
    }
  };

  return (
    <div className="psa-formbody">
      <div className="psa-form-container">
        <h2>Upload Practical Skill Application (PSA)</h2>
        <p className="header-subtext">Submit your details and report below.</p>
        <Link className="psa-back-link" to="/psa">
          &larr; Back To PSA List
        </Link>
        {error && <div className="psa-alert-error">{error}</div>}
        {success && <div className="psa-alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="psa-form-group">
            <label htmlFor="studentName">Student Name:</label>
            <input type="text" id="studentName" placeholder="Enter Your Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
          </div>
          <div className="psa-form-group">
            <label htmlFor="studentid">Student ID:</label>
            <input type="text" id="studentid" placeholder="Enter Your Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          </div>
          <div className="psa-form-group">
            <label htmlFor="department">Department:</label>
            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="">Select Department</option>
                {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                ))}
            </select>
          </div>
          <div className="psa-form-group">
            <label htmlFor="title">Project Title (PSA Title):</label>
            <input type="text" id="title" placeholder="Enter Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          
          <div className="psa-form-group">
            <label htmlFor="supervisor_name">Supervisor Name:</label>
            <input type="text" id="supervisor_name" placeholder="Enter Supervisor Name" value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)} required />
          </div>

          {department === 'Computer Software Engineering' && (
            <div className="psa-form-group">
              <label htmlFor="project_link">GitHub / Live Link (Optional):</label>
              <input type="text" id="project_link" placeholder="Enter GitHub or Live URL" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
            </div>
          )}

          <div className="psa-form-group">
            <label htmlFor="reportFile">Upload PSA Report (Document/PDF):</label>
            <input type="file" id="reportFile" onChange={handleFileChange} required />
          </div>
          
          <div className="psa-form-group">
            <button type="submit" className="psa-submit-btn">
              Upload PSA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PSAUpload;
