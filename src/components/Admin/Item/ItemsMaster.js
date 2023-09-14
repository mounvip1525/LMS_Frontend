import React, {useState, useEffect} from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function ItemsMaster() {

  const [items, setItems] = useState([]);

  useEffect (() => {
    // let data = []
    fetch(SERVER_URL + Url.GET_ITEMS)
    .then((response) => response.json())
    .then((itemsData) => setItems(itemsData))
    // .then((response) => console.log(response))
    // .then((itemsData) => {data = itemsData})
    .catch((err) => console.log("Error in fetching items!!! " + err.message))

    // setItems(data)
    }, []);

  return (
    <div className="container ">
      <AdminSidebar activeLink="allItems"/>
      <div className="formBox tableBox">
        <h2 className="mb-0">Item Data</h2>
        <p style={{ color: "grey" }}>View, edit and delete items here</p>
        <Table responsive striped="columns" bordered size="sm" className="mb-3">
          <thead>
            <tr>
              <th>Item_ID</th>
              <th>Issue_Status</th>
              <th>Item_Category</th>
              <th>Item_Description</th>
              <th>Item_Make</th>
              <th>Item_Valuation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((item) => (
              <tr>
                <td>{item.itemId}</td>
                <td>{item.issueStatus}</td>
                <td>{item.itemCategory}</td>
                <td>{item.itemDescription}</td>
                <td>{item.itemMake}</td>
                <td>{item.itemValuation}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ marginRight: "4px" }}
                  />
                  <FontAwesomeIcon icon={faEdit} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
