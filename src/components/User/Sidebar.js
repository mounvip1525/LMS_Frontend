import React from "react";
import "../../styles/Home.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAddressCard,
  faEdit,
  faLandmark,
  faMoneyBill1Wave,
  faMugHot,
  faRightFromBracket,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function UserSidebar({activeLink}) {
  return (
    <div className="sidebar">
      <div>
        <div className="profile-box">
          <FontAwesomeIcon icon={faUser} />
          User K070653
        </div>

        <div className="sidebar-contents">
          <div>
            <p>Loan Management</p>
            <div className={activeLink === "applyLoan" && "highlight"} style={{marginBottom:"15px"}}>
              <FontAwesomeIcon icon={faAdd} />
              <Link to="/user/loan/apply">Apply Loan</Link>
            </div>
           
            <div className={activeLink === "loanCards" && "highlight"} style={{marginBottom:"15px"}}>
              <FontAwesomeIcon icon={faAddressCard} />
              <Link to="/user/loan/all">My Loan Cards</Link>
            </div>
            <div className={activeLink === "itemsPurchased" && "highlight"}>
              <FontAwesomeIcon icon={faMoneyBill1Wave} />
              <Link to="/user/item/all">Items Purchased</Link>
            </div>
          </div>

        </div>
        <Button variant="primary" style={{ width: "100%" }}>
          Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </div>
    </div>
  );
}
