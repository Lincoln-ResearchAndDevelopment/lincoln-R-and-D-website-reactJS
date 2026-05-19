import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedProjectRoute from './Components/ProtectedProjectRoute';
import Membership from './Components/Membership';
import Internship from './Components/Internship';
import Login from './Components/Login';
import ProjectSignup from './Components/ProjectSignup';
import ProjectLogin from './Components/ProjectLogin';
import ProjectDash from './Components/ProjectDash';
import ProjectUpload1 from './Components/ProjectUploads';
import ProjectInformation from './Components/ProjectInformation';
import ProjectDetails from './Components/ProjectDetails';
import PSAUpload from './Components/PSAUpload';
import ProjectPayment from './Components/ProjectPayment';
import AdminSignup from './Components/AdminSignup';
import AdminLogin from './Components/AdminLogin';
import AdminDash from './Components/AdminDash';
import ResearchAreas from './Components/ResearchAreas';
import ProjectList from './Components/StudentProjectList';
import PSA from './Components/PSA';
import StaffMembership from './Components/StaffMembership';
import StudentMembership from './Components/StudentMembership';
import ExternalMembership from './Components/ExternalMembership';
import InternalInternship from './Components/InternalInternship';
import ExternalInternship from './Components/ExternalInternship';
import AdminStaffMembership from './Components/AdminStaffMembership';
import AdminStudentMembership from './Components/AdminStudentMembership';
import AdminStudentProject from './Components/AdminStudentProject';
import AdminViewStudentProjects from './Components/AdminViewStudentProjects';
import AdminExternalMembership from './Components/AdminExternalMembership';
import AdminInternalInternship from './Components/AdminInternalInternship';
import AdminExternalInternship from './Components/AdminExternalInternship';
import AdminProjectInformation from './Components/AdminProjectInformation';
import AdminViewProjectInformation from './Components/AdminViewProjectInformation';
import AdminViewProjectDetails from './Components/AdminViewProjectDetails';
import AdminProjectPayment from './Components/AdminProjectPayment';
import AdminViewProjectPayment from './Components/AdminViewProjectPayment';
import AdminProjectUploads from './Components/AdminProjectUploads';
import AdminViewReceipts from './Components/AdminViewReceipts';
import AdminViewStudents from './Components/AdminViewStudents';
import AdminSupervisors from './Components/AdminSupervisors';
import AdminPSA from './Components/AdminPSA';
import Lincoln from './Components/Lincoln';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminLayout from './Components/AdminLayout';



const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admindash');

  return (
    <div>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Lincoln />} />
        <Route path="/researchareas" element={<ResearchAreas />} />
        <Route path="/psa" element={<PSA />} />
        <Route path="/psa/:dept" element={<PSA />} />
        <Route path="/psaupload" element={<PSAUpload />} />
        <Route path="/projectlist" element={<ProjectList />} />
        <Route path="/projectlist/:category" element={<ProjectList />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/projectsignup" element={<ProjectSignup />} />
        <Route path="/login/projectlogin" element={<ProjectLogin />} />
        <Route path="/projectdash" element={<ProtectedProjectRoute><ProjectDash /></ProtectedProjectRoute>} />
        <Route path="/projectdash/projectinformation" element={<ProtectedProjectRoute><ProjectInformation /></ProtectedProjectRoute>} />
        <Route path="/projectdash/projectupload1" element={<ProtectedProjectRoute><ProjectUpload1 /></ProtectedProjectRoute>} />

        <Route path="/projectdash/projectpayment" element={<ProtectedProjectRoute><ProjectPayment /></ProtectedProjectRoute>} />
        <Route path="/projectdash/projectdetails/:id" element={<ProtectedProjectRoute><ProjectDetails /></ProtectedProjectRoute>} />
        <Route path="/login/adminsignup" element={<AdminSignup />} />
        <Route path="/login/adminlogin" element={<AdminLogin />} />
        <Route path="/Internship" element={<Internship />} />
        <Route path="/internship/internalinternship" element={<InternalInternship />} />
        <Route path="/internship/externalinternship" element={<ExternalInternship />} />
        <Route path="/membership/staffmembership" element={<StaffMembership />} />
        <Route path="/membership/studentmembership" element={<StudentMembership />} />
        <Route path="/membership/externalmembership" element={<ExternalMembership />} />
        <Route path="/admindash/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDash />} />
          <Route path="adminexternalinternship" element={<AdminExternalInternship />} />
          <Route path="admininternalinternship" element={<AdminInternalInternship />} />
          <Route path="adminexternalmembership" element={<AdminExternalMembership />} />
          <Route path="adminstaffmembership" element={<AdminStaffMembership />} />
          <Route path="adminstudentmembership" element={<AdminStudentMembership />} />
          <Route path="adminstudentproject" element={<AdminStudentProject />} />
          <Route path="adminviewstudentprojects" element={<AdminViewStudentProjects />} />
          <Route path="adminprojectinformation" element={<AdminProjectInformation />} />
          <Route path="adminprojectpayment" element={<AdminProjectPayment />} />
          <Route path="adminviewprojectpayment" element={<AdminViewProjectPayment />} />
          <Route path="adminviewprojectinformation" element={<AdminViewProjectInformation />} />
          <Route path="adminviewprojectdetails/:id" element={<AdminViewProjectDetails />} />
          <Route path="adminprojectuploads" element={<AdminProjectUploads />} />
          <Route path="adminviewreceipts" element={<AdminViewReceipts />} />
          <Route path="adminviewstudents" element={<AdminViewStudents />} />
          <Route path="adminsupervisors" element={<AdminSupervisors />} />
          <Route path="adminpsa" element={<AdminPSA />} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

