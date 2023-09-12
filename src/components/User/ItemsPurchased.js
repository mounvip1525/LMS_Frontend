import React from "react";
import "../../styles/Home.css";
import UserSidebar from "./Sidebar";

export default function ItemsPurchased() {
  return (
    <div className="container ">
      <UserSidebar activeLink="itemsPurchased" />
      <div>ItemsPurchased</div>
    </div>
  );
}
