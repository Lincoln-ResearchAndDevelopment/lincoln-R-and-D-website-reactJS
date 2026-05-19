import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from './Config';
import { 
  MdCheckCircle, 
  MdPendingActions, 
  MdRemoveRedEye, 
  MdLink, 
  MdPictureAsPdf,
  MdUndo,
  MdCheck
} from "react-icons/md";

const AdminPSA = () => {
    const [psaProjects, setPsaProjects] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchPSA();
    }, []);

    const fetchPSA = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}admin_get_all_psa.php`);
            if (response.data.status === 'success') {
                setPsaProjects(response.data.data);
            } else {
                setPsaProjects([]);
            }
        } catch (error) {
            console.error("Error fetching PSA projects", error);
            setPsaProjects([]);
        }
    };

    const handleApproval = async (id, is_approved) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}admin_approve_psa.php`, { id, is_approved });
            if (response.data.status === 'success') {
                setMessage(response.data.message);
                fetchPSA();
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("An error occurred while updating status.");
        }
    };

    return (
        <div className="admin-content">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0f172a' }}>PSA Submissions</h1>
                  <p style={{ color: '#64748b' }}>Approve or revoke Practical Skill Application (PSA) project submissions.</p>
                </div>
            </header>

            {message && (
                <div style={{ 
                    background: '#ecfdf5', 
                    color: '#059669', 
                    padding: '1rem', 
                    borderRadius: '0.5rem', 
                    marginBottom: '1.5rem',
                    border: '1px solid #10b981',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <MdCheckCircle /> {message}
                </div>
            )}

            <div className="premium-table-wrapper">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Details</th>
                            <th>Department</th>
                            <th>Project Title</th>
                            <th>Supervisor</th>
                            <th>Project Link</th>
                            <th>Report File</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {psaProjects.length > 0 ? (
                            psaProjects.map(psa => (
                                <tr key={psa.id}>
                                    <td style={{ fontWeight: 'bold', color: '#64748b' }}>#{psa.id}</td>
                                    <td>
                                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{psa.student_name}</div>
                                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: {psa.studentid}</div>
                                    </td>
                                    <td>{psa.department}</td>
                                    <td style={{ maxWidth: '200px' }}>{psa.title}</td>
                                    <td>{psa.supervisor_name || <span style={{ color: '#cbd5e1' }}>N/A</span>}</td>
                                    <td>
                                        {psa.project_link ? (
                                          <a href={psa.project_link} target="_blank" rel="noopener noreferrer" style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.25rem',
                                            color: '#2563eb',
                                            fontWeight: '600',
                                            textDecoration: 'none'
                                          }}>
                                            <MdLink /> Visit
                                          </a>
                                        ) : (
                                          <span style={{ color: '#cbd5e1' }}>No Link</span>
                                        )}
                                    </td>
                                    <td>
                                        {psa.report_file ? (
                                          <a href={`${API_ENDPOINT}${psa.report_file}`} target="_blank" rel="noopener noreferrer" style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.25rem',
                                            color: '#dc2626',
                                            fontWeight: '600',
                                            textDecoration: 'none'
                                          }}>
                                            <MdPictureAsPdf /> PDF
                                          </a>
                                        ) : (
                                          <span style={{ color: '#cbd5e1' }}>No Report</span>
                                        )}
                                    </td>
                                    <td>
                                        {psa.is_approved === '1' || psa.is_approved === 1 ? (
                                            <span style={{ 
                                              background: '#ecfdf5', 
                                              color: '#059669', 
                                              padding: '0.25rem 0.5rem', 
                                              borderRadius: '0.375rem',
                                              fontSize: '0.75rem',
                                              fontWeight: '700',
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              gap: '0.25rem'
                                            }}>
                                              <MdCheckCircle /> Approved
                                            </span>
                                        ) : (
                                            <span style={{ 
                                              background: '#fff7ed', 
                                              color: '#ea580c', 
                                              padding: '0.25rem 0.5rem', 
                                              borderRadius: '0.375rem',
                                              fontSize: '0.75rem',
                                              fontWeight: '700',
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              gap: '0.25rem'
                                            }}>
                                              <MdPendingActions /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {psa.is_approved === '1' || psa.is_approved === 1 ? (
                                            <button 
                                              onClick={() => handleApproval(psa.id, 0)} 
                                              style={{ 
                                                background: '#f1f5f9', 
                                                color: '#64748b', 
                                                border: '1px solid #e2e8f0', 
                                                padding: '0.4rem 0.75rem', 
                                                cursor: 'pointer', 
                                                borderRadius: '0.5rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                              }}
                                            >
                                              <MdUndo /> Revoke
                                            </button>
                                        ) : (
                                            <button 
                                              onClick={() => handleApproval(psa.id, 1)} 
                                              style={{ 
                                                background: '#dc2626', 
                                                color: 'white', 
                                                border: 'none', 
                                                padding: '0.4rem 0.75rem', 
                                                cursor: 'pointer', 
                                                borderRadius: '0.5rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                              }}
                                            >
                                              <MdCheck /> Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                              <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                                No PSA submissions found
                              </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPSA;
