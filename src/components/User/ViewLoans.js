import React from "react";
import "../../styles/Home.css";
import UserSidebar from "./Sidebar";

export default function ViewLoans() {
  return (
    <div className="container ">
      <UserSidebar activeLink="loanCards" />
      <div>ViewLoans</div>
    </div>
  );
}
