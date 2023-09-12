import React from "react";
import "../../../styles/Home.css";
import AdminSidebar from "../Sidebar";

export default function AddCustomer() {
  return (
    <div className="container">
      <AdminSidebar activeLink="addCustomer" />
    </div>
  );
}
