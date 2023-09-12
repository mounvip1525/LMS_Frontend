import React from "react";
import "../../../styles/Home.css";
import AdminSidebar from "../Sidebar";

export default function CustomerData() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="allCustomers"/>
      <div>CustomerData</div>
    </div>
  );
}
