import React, {useState, useEffect} from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { Table, Button } from "react-bootstrap";

export default function ItemsPurchased() {
  const [itemsPurchased, setItemsPurchased]= useState([]);
  useEffect (() => {
    fetch(SERVER_URL + Url.GET_ITEMS_PURCHASED)
    .then((response) => response.json())
    .then((itemsPurchased) => setItemsPurchased(itemsPurchased))
    .catch((err) => console.log("Error in fetching user Loan Cards " + err.message))
    }, []);

  return (
    <div className="container ">
      <UserSidebar activeLink="itemsPurchased" />
      <div>ItemsPurchased</div>
      <div className="formBox tableBox">
        <h2 className="mb-0">Loan Cards Availed</h2>
        <p style={{ color: "grey" }}>Items Purchased</p>
        <Table responsive striped="columns" bordered size="sm" className="mb-3">
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
          {itemsPurchased && itemsPurchased.map((itemsPurchased) => (
              <tr>
                <td>{itemsPurchased.issueId}</td>
                <td>{itemsPurchased.itemDesc}</td>
                <td>{itemsPurchased.itemMake}</td>
                <td>{itemsPurchased.itemCategory}</td>
                <td>{itemsPurchased.itemValuation}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
