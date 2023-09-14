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

export default function CustomerData() {

  const [customers, setCustomers] = useState([]);

  useEffect (() => {
    fetch(SERVER_URL + Url.GET_CUSTOMERS)
    .then((response) => response.json())
    .then((customersData) => setCustomers(customersData))
    .catch((err) => console.log("Error in fetching customers! " + err.message))
    }, []);

  return (
    <div className="container ">
      <AdminSidebar activeLink="allCustomers" />
      <div className="formBox tableBox">
        <h2 className="mb-0">Customer Data</h2>
        <p style={{ color: "grey" }}>View, edit and delete customers here</p>
        <Table responsive striped="columns" bordered size="sm" className="mb-3">
          <thead>
            <tr>
              <th>EID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Date of Joining</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {customers && customers.map((customer) => (
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
