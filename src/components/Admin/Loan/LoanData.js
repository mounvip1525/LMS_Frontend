import React from "react";
import "../../../styles/Home.css";
import AdminSidebar from "../Sidebar";

export default function LoanData() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="allLoans"/>
      <div>LoanData</div>
    </div>
  );
}
