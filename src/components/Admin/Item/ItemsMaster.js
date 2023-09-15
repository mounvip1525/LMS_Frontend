import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
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
  const [update, setUpdate] = useState(false);
  const [alert,setAlert] = useState(false);
  const [alertMessage,setAlertMessage] = useState("");
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  useEffect (() => {
    fetch(SERVER_URL + Url.GET_ITEMS)
    .then((response) => response.json())
    .then((itemsData) => setItems(itemsData))
    .catch((err) => console.log("Error in fetching items! " + err.message))
    }, [update]);

    const handleDelete = async (e, item) => {
      e.preventDefault();
  
      await fetch(SERVER_URL + Url.DELETE_ITEM, {
        method: "POST",
        body: item.itemId,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            setUpdate((bool) => !bool);
            return response.text();
          }
        }
        )
        .then((data) => {
          if (data != null) {
            setAlertMessage(data);
            setAlert(true);
            setTimeout(() => {
              setAlert(false)
            }, 5000);
          } else {
            setAlertMessage("Item was not deleted!");
            setAlert(true);
            setErr(true);
            setTimeout(() => {
              setAlert(false);
              setErr(false);
            }, 5000);
          }
        })
    };
  
    const handleEdit = async (e, item) => {
      e.preventDefault();
  
      await fetch(SERVER_URL + Url.DELETE_ITEM, {
        method: "POST",
        body: item.itemId,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then((response) => {
        if(response.ok)
        {
          setUpdate((bool) => !bool);
          return response.text();
        }
      })
  
      navigate("/admin/item/add", {replace: true, state: item});
    };

  return (
    <div className="container ">
      <AdminSidebar activeLink="allItems"/>
      <div className="formBox tableBox">
        <h2 className="mb-0">Item Data</h2>
        <p style={{ color: "grey" }}>View, edit and delete items here</p>
        {alert && (
          <div
            className={err ? "alert alert-danger" : "alert alert-success"}
            role="alert"
          >
            {alertMessage}
          </div>
        )}
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
                    className="hand-icon"
                    onClick={(e) => handleDelete(e, item)}
                  />
                  <FontAwesomeIcon 
                    icon={faEdit}
                    className="hand-icon" 
                    onClick={(e) => handleEdit(e, item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
