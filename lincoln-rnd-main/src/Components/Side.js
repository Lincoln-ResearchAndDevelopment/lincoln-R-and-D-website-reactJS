import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Css/AdminDash.css"

const Side = ({ email }) => {
  const [open, setOpen] = useState(false);

  // Add/remove sidebar-open class to body for content shift
  useEffect(() => {
    if (open) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    // Clean up on unmount
    return () => document.body.classList.remove('sidebar-open');
  }, [open]);

  // Close sidebar on link click (small screens only)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) setOpen(false);
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setOpen((prev) => !prev)}
        style={{ position: 'fixed', top: 20, left: 10, zIndex: 2101, background: 'rgb(220, 38, 38)', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40 }}
      >
        {open ? '×' : '☰'}
      </button>
      <div
        id="sidebar"
        className={open ? 'sidebar-open' : 'sidebar-collapsed'}
      >
        <div className="profile">
          <p style={{ color: 'white', fontWeight: 'bold', fontSize: '24px',}}>Welcome,👋</p>
          <p className="user-email">{email}</p>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminexternalinternship" onClick={handleLinkClick}>External Internships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/admininternalinternship" onClick={handleLinkClick}>Internal Internships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminexternalmembership" onClick={handleLinkClick}>External Memberships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminstaffmembership" onClick={handleLinkClick}>Staff Memberships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminstudentmembership" onClick={handleLinkClick}>Student Memberships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminstudentproject" onClick={handleLinkClick}>Add Student Projects</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewstudentprojects" onClick={handleLinkClick}>View Student Projects</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminprojectinformation" onClick={handleLinkClick}>Add Student Projects Information</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewprojectinformation" onClick={handleLinkClick}>View Student Projects Information</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminprojectpayment" onClick={handleLinkClick}>Add Student Projects Fee</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewprojectpayment" onClick={handleLinkClick}>View Student Projects Fee</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewreceipts" onClick={handleLinkClick}>View Student Projects Receipts</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewstudents" onClick={handleLinkClick}>View Students Payment Status</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminprojectuploads" onClick={handleLinkClick}>View Project Uploads</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Side;
