import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from './Config';

const StaffMembership = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = API_ENDPOINT + 'staff_membership.php';
    let fData = new FormData();
    fData.append('name', name);
    fData.append('department', department);
    fData.append('focusArea', focusArea);
    fData.append('phone', phone);
    fData.append('email', email);

    try {
      const response = await axios.post(url, fData);
      setSuccess(response.data.message || 'Submission successful.');
      setError('');
      setName('');
      setDepartment('');
      setFocusArea('');
      setPhone('');
      setEmail('');
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
          Staff Membership Form
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
            { label: 'Department', value: department, setter: setDepartment, type: 'text', id: 'department' },
            { label: 'Focus Area', value: focusArea, setter: setFocusArea, type: 'text', id: 'focus-area' },
            { label: 'Phone Number', value: phone, setter: setPhone, type: 'tel', id: 'phone' },
            { label: 'Email', value: email, setter: setEmail, type: 'email', id: 'email' },
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
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
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

export default StaffMembership;
