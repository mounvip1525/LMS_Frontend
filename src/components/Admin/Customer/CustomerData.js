import React from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomerData() {
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
            {Array.from({ length: 12 }).map((_, index) => (
              <tr>
                <td>E0001</td>
                <td>Mounvi Podapati</td>
                <td>Executive</td>
                <td>Technology</td>
                <td>Female</td>
                <td>2001-10-15</td>
                <td>2001-10-15</td>
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
