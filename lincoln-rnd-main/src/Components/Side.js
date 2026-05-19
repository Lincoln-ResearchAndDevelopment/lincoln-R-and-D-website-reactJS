import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  MdDashboard, 
  MdOutlineWork, 
  MdGroup, 
  MdAddCircleOutline, 
  MdVisibility, 
  MdPayment, 
  MdReceipt, 
  MdFileUpload,
  MdSettings,
  MdMenu,
  MdClose
} from "react-icons/md";
import "../Css/AdminDash.css";

const Side = ({ email }) => {
  const [open, setOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) setOpen(false);
  };

  const menuGroups = [
    {
      title: "Internships",
      items: [
        { name: "External Internships", path: "/admindash/adminexternalinternship", icon: <MdOutlineWork /> },
        { name: "Internal Internships", path: "/admindash/admininternalinternship", icon: <MdOutlineWork /> },
      ]
    },
    {
      title: "Memberships",
      items: [
        { name: "External Memberships", path: "/admindash/adminexternalmembership", icon: <MdGroup /> },
        { name: "Staff Memberships", path: "/admindash/adminstaffmembership", icon: <MdGroup /> },
        { name: "Student Memberships", path: "/admindash/adminstudentmembership", icon: <MdGroup /> },
      ]
    },
    {
      title: "Projects",
      items: [
        { name: "Add Student Project", path: "/admindash/adminstudentproject", icon: <MdAddCircleOutline /> },
        { name: "View Student Projects", path: "/admindash/adminviewstudentprojects", icon: <MdVisibility /> },
        { name: "Add Project Info", path: "/admindash/adminprojectinformation", icon: <MdAddCircleOutline /> },
        { name: "View Project Info", path: "/admindash/adminviewprojectinformation", icon: <MdVisibility /> },
      ]
    },
    {
      title: "Payments & Status",
      items: [
        { name: "Add Project Fee", path: "/admindash/adminprojectpayment", icon: <MdPayment /> },
        { name: "View Project Fee", path: "/admindash/adminviewprojectpayment", icon: <MdVisibility /> },
        { name: "View Receipts", path: "/admindash/adminviewreceipts", icon: <MdReceipt /> },
        { name: "Payment Status", path: "/admindash/adminviewstudents", icon: <MdGroup /> },
      ]
    },
    {
      title: "Management",
      items: [
        { name: "Project Uploads", path: "/admindash/adminprojectuploads", icon: <MdFileUpload /> },
        { name: "Manage PSA", path: "/admindash/adminpsa", icon: <MdSettings /> },
      ]
    }
  ];

  return (
    <>
      <button
        className="premium-sidebar-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        {open ? <MdClose /> : <MdMenu />}
      </button>
      
      <div
        className={`premium-sidebar ${open ? '' : 'collapsed'}`}
      >
        <div className="sidebar-profile-box">
          <h2>Lincoln Admin</h2>
          <span className="sidebar-user-tag">{email}</span>
        </div>

        <div className="premium-nav-list">
          <div className="premium-nav-item">
            <Link 
              className={`premium-nav-link ${location.pathname === '/admindash' ? 'active-link' : ''}`} 
              to="/admindash" 
              onClick={handleLinkClick}
            >
              <span className="premium-nav-icon"><MdDashboard /></span>
              Dashboard
            </Link>
          </div>

          {menuGroups.map((group, idx) => (
            <div key={idx} className="premium-nav-group">
              <p className="nav-group-title">
                {group.title}
              </p>
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className="premium-nav-item">
                  <Link 
                    className={`premium-nav-link ${location.pathname === item.path ? 'active-link' : ''}`} 
                    to={item.path} 
                    onClick={handleLinkClick}
                  >
                    <span className="premium-nav-icon">{item.icon}</span>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Side;
