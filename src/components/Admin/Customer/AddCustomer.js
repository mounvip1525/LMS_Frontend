import React from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Form, Button } from "react-bootstrap";

export default function AddCustomer() {
  return (
    <div className="container">
      <AdminSidebar activeLink="addCustomer" />
      <div className="formBox">
        <h2 className="mb-0">Add Customer</h2>
        <p style={{color:"grey"}}>Onboard a new customer seamlessly</p>
        <Form>
          <div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select aria-label="department">
                <option value="Finance">Finance</option>
                <option value="Technology">Technology</option>
                <option value="Operations">Operations</option>
                <option value="Human Resources">Human Resources</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>

              <Form.Select aria-label="Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Select aria-label="Designtion">
                <option value="Manager">Manager</option>
                <option value="Associate">Associate</option>
                <option value="Executive">Executive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/yyyy" />
            </Form.Group>
          </div>
          </div>

          <Button type="submit">Add Data</Button>
        </Form>
      </div>
    </div>
  );
}
