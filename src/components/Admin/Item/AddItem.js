import React from "react";
import "../../../styles/Home.css";
import AdminSidebar from "../Sidebar";

export default function AddItem() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="addItem"/>
      <div>AddItem</div>
    </div>
  );
}
