import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Side from "./Side";

const AdminLayout = () => {
  const { email } = useAuth();
  return (
    <div className="admin-layout-wrapper">
      <Side email={email} />
      <div id="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;