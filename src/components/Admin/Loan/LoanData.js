import React from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Form, Button } from "react-bootstrap";

export default function LoanData() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="allLoans"/>
      <div>LoanData</div>
    </div>
  );
}
