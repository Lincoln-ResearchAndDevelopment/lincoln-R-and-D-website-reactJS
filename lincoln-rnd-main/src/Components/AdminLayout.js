import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Side from "./Side";

const AdminLayout = () => {
  const { email } = useAuth();
  return (
    <div style={{ display: "flex" }}>
      <Side email={email} />
      <div style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;