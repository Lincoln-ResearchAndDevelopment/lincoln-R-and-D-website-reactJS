import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from './Config';
import '../Css/List.css';

const ProjectListView = ({ currentDept, psaProjects, loading, API_ENDPOINT }) => {
  return (
    <div className="list" style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ marginBottom: '40px', borderBottom: '1px solid #f3f4f6', paddingBottom: '30px' }}>
        <Link to="/psa" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span style={{ fontSize: '1.2rem' }}>←</span> Back to Categories
        </Link>
        <div className="psa-table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: '#111827', margin: 0, letterSpacing: '-1px' }}>{currentDept?.name}</h2>
            <p style={{ color: '#6b7280', fontSize: '1.1rem', marginTop: '10px' }}>Repository of practical skill applications for this department.</p>
          </div>
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {psaProjects.length} Projects Found
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ width: '50px', height: '50px', border: '4px solid #f3f4f6', borderTop: '4px solid #dc2626', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ color: '#6b7280', fontWeight: '600' }}>Synchronizing projects...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1.5px', fontWeight: '800' }}>
                <th style={{ padding: '0 20px 10px' }}>Student</th>
                <th style={{ padding: '0 20px 10px' }}>Project Title</th>
                <th style={{ padding: '0 20px 10px' }}>Supervisor</th>
                <th style={{ padding: '0 20px 10px', textAlign: 'center' }}>Report</th>
                {currentDept?.name === 'Computer Software Engineering' && <th style={{ padding: '0 20px 10px', textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {psaProjects.length > 0 ? (
                psaProjects.map((project, idx) => (
                  <tr key={idx} style={{ background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <td style={{ padding: '25px 20px', borderRadius: '16px 0 0 16px', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', borderLeft: '1px solid #f3f4f6' }}>
                      <div style={{ fontWeight: '700', color: '#111827', fontSize: '1.05rem' }}>{project.student_name}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '4px' }}>ID: {project.studentid}</div>
                    </td>
                    <td style={{ padding: '25px 20px', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ color: '#374151', fontWeight: '600', lineHeight: '1.4' }}>{project.title}</div>
                    </td>
                    <td style={{ padding: '25px 20px', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#6b7280' }}>👤</span>
                        <span style={{ fontWeight: '500', color: '#4b5563' }}>{project.supervisor_name || 'Not Assigned'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '25px 20px', textAlign: 'center', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
                      {project.report_file ? (
                        <a href={`${API_ENDPOINT}${project.report_file}`} target="_blank" rel="noopener noreferrer"
                          style={{ color: '#dc2626', background: '#fef2f2', padding: '10px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', transition: 'all 0.2s' }}
                          onMouseEnter={(e) => { e.target.style.background = '#dc2626'; e.target.style.color = 'white'; }}
                          onMouseLeave={(e) => { e.target.style.background = '#fef2f2'; e.target.style.color = '#dc2626'; }}>
                          DOWNLOAD PDF
                        </a>
                      ) : <span style={{ color: '#d1d5db', fontSize: '0.85rem' }}>N/A</span>}
                    </td>
                    {currentDept?.name === 'Computer Software Engineering' && (
                      <td style={{ padding: '25px 20px', borderRadius: '0 16px 16px 0', textAlign: 'right', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6' }}>
                        {project.project_link ? (
                          <a href={project.project_link} target="_blank" rel="noopener noreferrer"
                            style={{ color: 'white', background: '#111827', padding: '10px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>
                            LIVE PROJECT
                          </a>
                        ) : <span style={{ color: '#d1d5db', fontSize: '0.85rem' }}>No Link Available</span>}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>📁</div>
                    <h3 style={{ color: '#111827', marginBottom: '10px' }}>No Projects Found</h3>
                    <p style={{ color: '#6b7280' }}>Be the first to upload a PSA project for this department!</p>
                    <Link to="/psaupload" className="button" style={{ marginTop: '20px', display: 'inline-block' }}>Upload Now</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const CategoryGridView = ({ grandTotal, departments, navigate, counts }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '60px',
        animation: 'fadeIn 0.8s ease-out'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#111827',
          marginBottom: '15px',
          letterSpacing: '-1.5px',
          fontWeight: '800'
        }}>
          Practical Skill Application <span style={{ color: '#dc2626' }}>(PSA)</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto 30px' }}>
          Explore innovative research and practical applications developed by our talented students across various departments.
        </p>
        <div className="psa-header-stats" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '20px',
          background: 'white',
          padding: '10px 30px',
          borderRadius: '50px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#374151' }}>Total Submissions: <span style={{ color: '#dc2626', fontSize: '1.2rem' }}>{grandTotal}</span></p>
          <div style={{ width: '1px', height: '20px', background: '#e5e7eb' }}></div>
          <Link to="/psaupload" style={{
            color: '#dc2626',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            + Upload New
          </Link>
        </div>
      </header>

      <div className="psa-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        animation: 'fadeInUp 1s ease-out'
      }}>
        {departments.map((d, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/psa/${d.slug}`)}
            style={{
              background: 'white',
              padding: '40px',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(220,38,38,0.12)';
              e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              boxShadow: '0 8px 16px rgba(220,38,38,0.25)'
            }}>
              <span style={{ fontSize: '28px', color: 'white' }}>📂</span>
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.4rem', color: '#111827', fontWeight: '700', lineHeight: '1.2' }}>{d.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: '#dc2626' }}>{counts[d.name] || 0}</span>
              <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '500' }}>Projects</span>
            </div>
            <div style={{
              marginTop: 'auto',
              paddingTop: '25px',
              color: '#dc2626',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              VIEW REPOSITORY <span style={{ fontSize: '1.2rem' }}>→</span>
            </div>

            {/* Decorative element */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'rgba(220,38,38,0.03)',
              borderRadius: '50%'
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PSA = () => {
  const { dept } = useParams();
  const navigate = useNavigate();
  const [psaProjects, setPsaProjects] = useState([]);
  const [counts, setCounts] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const departments = [
    { name: "Computer Software Engineering", slug: "cse" },
    { name: "English and Mass Communication", slug: "mass" },
    { name: "Physcology", slug: "psy" },
    { name: "Foundation in Nursing", slug: "nursing" },
    { name: "Business Administration", slug: "busadmin" }
  ];

  const currentDept = departments.find(d => d.slug === dept);

  useEffect(() => {
    fetchCounts();
    if (dept) {
      if (currentDept) {
        fetchPSAProjects(currentDept.name);
      } else {
        navigate('/psa');
      }
    }
  }, [dept]);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}get_psa_counts.php`);
      if (response.data.status === 'success') {
        setCounts(response.data.counts);
        setGrandTotal(response.data.grand_total);
      }
    } catch (error) {
      console.error('Error fetching PSA counts', error);
    }
  };

  const fetchPSAProjects = async (deptName) => {
    setLoading(true);
    try {
      const url = deptName ? `${API_ENDPOINT}get_psa_projects.php?department=${encodeURIComponent(deptName)}` : `${API_ENDPOINT}get_psa_projects.php`;
      const response = await axios.get(url);
      if (response.data.status === 'success') {
        setPsaProjects(response.data.data);
      } else {
        setPsaProjects([]);
      }
    } catch (error) {
      console.error('Error fetching PSA projects', error);
      setPsaProjects([]);
    }
    setLoading(false);
  };

  return (
    <div className="listbody" style={{ 
      padding: '60px 20px', 
      background: dept ? '#f9fafb' : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', 
      minHeight: '100vh' 
    }}>
      {dept ? (
        <ProjectListView 
          currentDept={currentDept} 
          psaProjects={psaProjects} 
          loading={loading} 
          API_ENDPOINT={API_ENDPOINT} 
        />
      ) : (
        <CategoryGridView 
          grandTotal={grandTotal} 
          departments={departments} 
          navigate={navigate} 
          counts={counts} 
        />
      )}

      <style>{`
        .psa-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 20px;
        }
        @media (max-width: 1100px) {
          .psa-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .psa-grid {
            grid-template-columns: 1fr;
          }
          .list {
            padding: 20px !important;
          }
          h2 {
            font-size: 1.8rem !important;
          }
          header h1 {
            font-size: 2.2rem !important;
          }
          .table-responsive {
             overflow-x: auto;
             -webkit-overflow-scrolling: touch;
          }
          .admin-table {
            min-width: 800px;
          }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default PSA;
