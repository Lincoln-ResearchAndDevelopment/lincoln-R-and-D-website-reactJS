import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "./Config";
import "../Css/AdminDash.css";
import { 
  MdGroup, 
  MdOutlineWork, 
  MdSchool, 
  MdAssignment, 
  MdArrowForward 
} from "react-icons/md";

const getIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('staff')) return <MdGroup />;
  if (lowerTitle.includes('student') && lowerTitle.includes('membership')) return <MdSchool />;
  if (lowerTitle.includes('project')) return <MdAssignment />;
  if (lowerTitle.includes('internship')) return <MdOutlineWork />;
  return <MdGroup />;
};

const Cards = ({ counts }) => {
  return (
    <div className="dashboard-container">
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.025em' }}>Overview</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Welcome to the Research & Development Administrative Hub.</p>
      </header>
      
      <div className="stat-grid">
        {counts.map((item, index) => (
          <div className="premium-stat-card" key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h5>{item.title}</h5>
                <p className="stat-value">{item.total}</p>
              </div>
              <div style={{ 
                background: 'rgba(220, 38, 38, 0.08)', 
                color: '#dc2626', 
                padding: '0.85rem', 
                borderRadius: '1rem',
                fontSize: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getIcon(item.title)}
              </div>
            </div>
            <a className="stat-footer-link" href={item.link}>
              View Details <MdArrowForward style={{ marginLeft: '0.5rem' }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      const tables = [
        "staff_membership",
        "student_membership",
        "student_projects",
        "external_membership",
        "internal_internship",
        "external_internship",
      ];
      
      setLoading(true);
      try {
        const promises = tables.map(async (tableName) => {
          const response = await fetch(
            API_ENDPOINT + `admin_totals.php?table=${tableName}`
          );
          return response.json();
        });

        const results = await Promise.all(promises);
        const successfulData = results
          .filter(result => result.success)
          .map(result => result.data[0]);

        setTableData(successfulData);
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="loader">Initializing Dashboard...</div>
      </div>
    );
  }

  return <Cards counts={tableData} />;
};

export default Dashboard;
