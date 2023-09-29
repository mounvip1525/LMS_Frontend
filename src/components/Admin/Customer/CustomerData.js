import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomerData() {

  const [customers, setCustomers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SERVER_URL + Url.GET_CUSTOMERS)
      .then((response) => response.json())
      .then((customersData) => setCustomers(customersData))
      .catch((err) => console.log("Error in fetching customers! " + err.message))
  }, [update])

  const handleDelete = async (e, customer) => {
    e.preventDefault();

    await fetch(SERVER_URL + Url.DELETE_CUSTOMER, {
      method: "POST",
      body: customer.employeeId,
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
          setAlertMessage("Employee was not deleted!");
          setAlert(true);
          setErr(true);
          setTimeout(() => {
            setAlert(false);
            setErr(false);
          }, 5000);
        }
      })
  };

  const handleEdit = async (e, customer) => {
    e.preventDefault();

    await fetch(SERVER_URL + Url.DELETE_CUSTOMER, {
      method: "POST",
      body: customer.employeeId,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((response) => {
        if (response.ok) {
          setUpdate((bool) => !bool);
          return response.text();
        }
      })

    navigate("/admin/customer/add", { replace: true, state: customer });
  };

  return (
    <div className="container ">
      <AdminSidebar activeLink="allCustomers" />
      <div className="formBox tableBox">
        <h2 className="mb-0">Customer Data</h2>
        <p style={{ color: "grey" }}>View, edit and delete customers here</p>
        {alert && (
          <div
            className={err ? "alert alert-danger" : "alert alert-success"}
            role="alert"
          >
            {alertMessage}
          </div>
        )}
        <table className="lms-table">
          <thead>
            <tr>
              <th>EID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>DOJ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.length>0 ? customers.map((customer) => (
              <tr>
                <td>{customer.employeeId}</td>
                <td>{customer.employeeName}</td>
                <td>{customer.designation}</td>
                <td>{customer.department}</td>
                <td>{customer.gender}</td>
                <td>{customer.dateOfBirth}</td>
                <td>{customer.dateOfJoining}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="hand-icon"
                    style={{ marginRight: "6px" }}
                    onClick={(e) => handleDelete(e, customer)}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="hand-icon"
                    onClick={(e) => handleEdit(e, customer)}
                  />
                </td>
              </tr>
            )) : <p>No Data Available</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
