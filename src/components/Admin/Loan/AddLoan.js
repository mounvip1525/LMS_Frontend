import React from "react";
import "../../../styles/Home.css";
import AdminSidebar from "../Sidebar";

export default function AddLoan() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="addLoan"/>
      <div>AddLoan</div>
    </div>
  );
}
