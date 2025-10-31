import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from './Config';

const ExternalMembership = () => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState('');
  const [fieldStudy, setFieldStudy] = useState('');
  const [skill, setSkill] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = API_ENDPOINT + 'external_membership.php';
    let fData = new FormData();
    fData.append('name', name);
    fData.append('school', school);
    fData.append('department', department);
    fData.append('fieldStudy', fieldStudy);
    fData.append('skill', skill);
    fData.append('phone', phone);
    fData.append('email', email);
    fData.append('date', date);

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
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        padding: '4rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
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
          External Membership Form
        </h2>

        {error && (
          <p style={{ color: '#dc2626', fontWeight: '500', marginBottom: '1rem' }}>{error}</p>
        )}
        {success && (
          <p style={{ color: '#16a34a', fontWeight: '500', marginBottom: '1rem' }}>{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', value: name, setter: setName, type: 'text', id: 'name' },
            { label: 'School', value: school, setter: setSchool, type: 'text', id: 'school' },
            { label: 'Department', value: department, setter: setDepartment, type: 'text', id: 'department' },
            { label: 'Field of Study', value: fieldStudy, setter: setFieldStudy, type: 'text', id: 'field-study' },
            { label: 'Skill', value: skill, setter: setSkill, type: 'text', id: 'skill' },
            { label: 'Phone Number', value: phone, setter: setPhone, type: 'tel', id: 'phone' },
            { label: 'Email', value: email, setter: setEmail, type: 'email', id: 'email' },
            { label: 'Date', value: date, setter: setDate, type: 'date', id: 'date' },
          ].map((field, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor={field.id}
                style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#111827',
                }}
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
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#dc2626')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
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

export default ExternalMembership;
