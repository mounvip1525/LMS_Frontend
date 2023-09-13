import React from "react";
import "../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAddressCard,
  faLandmark,
  faRightFromBracket,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";


export default function AdminSidebar({activeLink}) {
  const navigate = useNavigate();

  function logout() {
    navigate("/admin/login", {replace: true})
  }

  return (
    <div className="sidebar">
      <div>
        <div className="profile-box">
          <FontAwesomeIcon icon={faUser} />
          Administrator
        </div>
        <hr />

        <div className="sidebar-contents">
          <div>
            <p>Customer Data Management</p>
            <div className={activeLink === "addCustomer" && "highlight"}>
              <FontAwesomeIcon icon={faAdd} />
              <Link to="/admin/customer/add">Add Customer</Link>
            </div>
            <div className={activeLink === "allCustomers" && "highlight"}>
              <FontAwesomeIcon icon={faAddressCard} />
              <Link to="/admin/customer/all">All Customers</Link>
            </div>
          </div>

          <div>
            <p>Loan Card Management</p>
            <div className={activeLink === "addLoan" && "highlight"}>
              <FontAwesomeIcon icon={faAdd} />
              <Link to="/admin/loan/add">Add Loan</Link>
            </div>
            <div className={activeLink === "allLoans" && "highlight"}>
              <FontAwesomeIcon icon={faLandmark} />
              <Link to="/admin/loan/all">Loan Cards</Link>
            </div>
          </div>
          <div>
            <p>Item Master Data</p>
            <div className={activeLink === "addItem" && "highlight"}>
              <FontAwesomeIcon icon={faAdd} />
              <Link to="/admin/item/add">Add Item</Link>
            </div>
            <div className={activeLink === "allItems" && "highlight"}>
              <FontAwesomeIcon icon={faStore} />
              <Link to="/admin/item/all">Items Master</Link>
            </div>
          </div>
        </div>
        <Button variant="outline-primary" style={{ width: "100%" }} onClick={logout}>
          Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </div>
    </div>
  );
}
