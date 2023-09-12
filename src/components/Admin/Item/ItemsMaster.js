import React from "react";
import "../../../styles/Home.css";
import AdminSidebar from "../Sidebar";

export default function ItemsMaster() {
  return (
    <div className="container ">
      <AdminSidebar activeLink="allItems"/>
      <div>ItemsMaster</div>
    </div>
  );
}
