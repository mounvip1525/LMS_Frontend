import React from "react";
import "../../styles/Home.css";
import UserSidebar from "./Sidebar";

export default function ApplyLoan() {
  return (
    <div className="container ">
      <UserSidebar activeLink="applyLoan"/>
      <div>ApplyLoan</div>
    </div>
  );
}

