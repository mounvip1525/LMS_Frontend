import React from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Form, Button } from "react-bootstrap";

export default function ItemsMaster() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="allItems"/>
      <div>ItemsMaster</div>
    </div>
  );
}
