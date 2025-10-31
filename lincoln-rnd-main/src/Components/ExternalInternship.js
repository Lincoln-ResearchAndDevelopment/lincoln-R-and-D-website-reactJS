import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from "./Config";

const ExternalInternship = () => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState('');
  const [fieldStudy, setFieldStudy] = useState('');
  const [skill, setSkill] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [internshipLetter, setInternshipLetter] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      setInternshipLetter(null);
      e.target.value = ''; // clear the file input
      return;
    }
    setError('');
    setInternshipLetter(file);
  };

  const handleSubmit = async () => {
    const url = API_ENDPOINT + "external_internship.php";

    if (!internshipLetter) {
      setError('Please upload a valid PDF file before submitting.');
      return;
    }

    let fData = new FormData();
    fData.append("name", name);
    fData.append("school", school);
    fData.append("department", department);
    fData.append("fieldStudy", fieldStudy);
    fData.append("skill", skill);
    fData.append("phone", phone);
    fData.append("email", email);
    fData.append("date", date);
    if (internshipLetter) fData.append("internshipLetter", internshipLetter);

    try {
      const response = await axios.post(url, fData);
      setSuccess(response.data.message || 'Submission successful.');
      setError('');
      setName('');
      setSchool('');
      setDepartment('');
      setFieldStudy('');
      setSkill('');
      setPhone('');
      setEmail('');
      setDate('');
      setInternshipLetter(null);
      document.getElementById("internshipLetter").value = "";
    } catch (error) {
      console.error(error);
      setError('An error occurred while submitting.');
      setSuccess('');
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        padding: '4rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '3rem 2rem',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '650px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            color: '#dc2626',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem',
            textAlign: 'center',
            borderBottom: '2px solid #dc2626',
            paddingBottom: '1rem',
          }}
        >
          External Internship Form
        </h2>

        {error && <p style={{ color: '#dc2626', fontWeight: 500, marginBottom: 16 }}>{error}</p>}
        {success && <p style={{ color: '#16a34a', fontWeight: 500, marginBottom: 16 }}>{success}</p>}

        <form>
          {[
            { label: 'Name', value: name, setter: setName, id: 'name', type: 'text' },
            { label: 'School', value: school, setter: setSchool, id: 'school', type: 'text' },
            { label: 'Department', value: department, setter: setDepartment, id: 'department', type: 'text' },
            { label: 'Field of Study', value: fieldStudy, setter: setFieldStudy, id: 'fieldStudy', type: 'text' },
            { label: 'Skill', value: skill, setter: setSkill, id: 'skill', type: 'text' },
            { label: 'Phone Number', value: phone, setter: setPhone, id: 'phone', type: 'tel' },
            { label: 'Email', value: email, setter: setEmail, id: 'email', type: 'email' },
            { label: 'Date', value: date, setter: setDate, id: 'date', type: 'date' },
          ].map((field, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor={field.id}
                style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#111827' }}
              >
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.id}
                required
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#dc2626')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>
          ))}

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="internshipLetter"
              style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#111827' }}
            >
              Internship Letter (PDF only):
            </label>
            <input
              type="file"
              id="internshipLetter"
              name="internshipLetter"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                fontSize: '1rem',
              }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#991b1b')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc2626')}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExternalInternship;
