import React, { useState, useEffect } from "react";
import UserSidebar from "./Sidebar";
import { SERVER_URL } from "../../config";
import { Url } from "../../Url";
import { useAuth } from "../../context/AuthContext";

export default function ItemsPurchased() {
  const [itemsPurchased, setItemsPurchased] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch(SERVER_URL + Url.GET_ITEMS_PURCHASED + "?emplId=" + user.empId)
      .then((response) => response.json())
      .then((itemsPurchased) => setItemsPurchased(itemsPurchased))
      .catch((err) => console.log("Error in fetching user Loan Cards " + err.message))
  }, [user]);

  return (
    <div className="container ">
      <UserSidebar activeLink="itemsPurchased" />
      <div className="formBox tableBox">
        <h2 className="mb-0">Items Issued</h2>
        <p style={{ color: "grey" }}>Items Purchased</p>
        <table className="lms-table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Item Description</th>
              <th>Item Make</th>
              <th>Item Category</th>
              <th>Item Valuation</th>
            </tr>
          </thead>
          <tbody>
            {itemsPurchased.length > 0 ? itemsPurchased.map((itemsPurchased) => (
              <tr>
                <td>{itemsPurchased.issueId}</td>
                <td>{itemsPurchased.item.itemDescription}</td>
                <td>{itemsPurchased.item.itemMake}</td>
                <td>{itemsPurchased.item.itemCategory}</td>
                <td>{itemsPurchased.item.itemValuation}</td>
              </tr>
            )) : <p>No Data Available</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
