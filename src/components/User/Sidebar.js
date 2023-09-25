import React from "react";
import "../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAddressCard,
  faMoneyBill1Wave,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserSidebar({ activeLink }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();

  function onLogout() {
    logout();
    navigate("/user/login", { replace: true })
  }

  return (
    <div className="sidebar">
      <div>
        <div className="profile-box">
          <FontAwesomeIcon icon={faUser} />
          Hii {user.name}!!
        </div>

        <div className="sidebar-contents">
          <div>
            <p>Loan Management</p>
            <div className={activeLink === "applyLoan" && "highlight"} style={{ marginBottom: "15px" }}>
              <FontAwesomeIcon icon={faAdd} />
              <Link to="/user/loan/apply">Apply Loan</Link>
            </div>

            <div className={activeLink === "loanCards" && "highlight"} style={{ marginBottom: "15px" }}>
              <FontAwesomeIcon icon={faAddressCard} />
              <Link to="/user/loan/all">My Loan Cards</Link>
            </div>
            <div className={activeLink === "itemsPurchased" && "highlight"}>
              <FontAwesomeIcon icon={faMoneyBill1Wave} />
              <Link to="/user/item/all">Items Purchased</Link>
            </div>
          </div>

        </div>
        <Button variant="outline-primary" style={{ width: "100%" }} onClick={onLogout}>
          Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </div>
    </div>
  );
}
