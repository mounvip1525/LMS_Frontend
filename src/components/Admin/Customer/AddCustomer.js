import React, { useState } from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Form, Button } from "react-bootstrap";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    department: "Technology",
    gender: "Other",
    designation: "Associate",
    dateOfBirth: "",
    dateOfJoining: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const customer = location.state;

    if (customer) {
      setFormData({
        employeeId: customer.employeeId,
        employeeName: customer.employeeName,
        department: customer.department,
        gender: customer.gender,
        designation: customer.designation,
        dateOfBirth: customer.dateOfBirth,
        dateOfJoining: customer.dateOfJoining,
      })
    }
  }, []);

  const handleOnSubmit = async (event) => {
    // e.preventDefault();
    // console.log(formData);

    const form = event.currentTarget;

    setValidated(true);

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("in");
      return;
    }
    else {
      event.preventDefault();
      await fetch(SERVER_URL + Url.ADD_CUSTOMER, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
        })
        .then((data) => {
          if (data != null) {
            setAlertMessage(data);
            setAlert(true);
            setTimeout(() => {
              setAlert(false)
            }, 5000);
          } else {
            setAlertMessage("Employee was NOT Added !!!!!!");
            setTimeout(() => { }, 100);
            setAlert(true);
            setValidated(false);
            setErr(true);
          }
        });
      setFormData({
        employeeId: "",
        employeeName: "",
        department: "Technology",
        gender: "Other",
        designation: "Associate",
        dateOfBirth: "",
        dateOfJoining: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <AdminSidebar activeLink="addCustomer" />
      <div className="formBox">
        <h2 className="mb-0">Add Customer</h2>
        <p style={{ color: "grey" }}>Onboard a new customer seamlessly</p>
        {alert && (
          <div
            className={err ? "alert alert-danger" : "alert alert-success"}
            role="alert"
          >
            {alertMessage}
          </div>
        )}
        <Form noValidate validated={validated} onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid employee ID!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter an employee name!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  aria-label="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="Finance">Finance</option>
                  <option value="Technology">Technology</option>
                  <option value="Operations">Operations</option>
                  <option value="Human Resources">Human Resources</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>

                <Form.Select
                  aria-label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div>
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Select
                  aria-label="Designtion"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                >
                  <option value="Manager">Manager</option>
                  <option value="Associate">Associate</option>
                  <option value="Executive">Executive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="dd/mm/yyyy"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="dd/mm/yyyy"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
          </div>

          <Button type="submit">Add Data</Button>
        </Form>
      </div>
    </div>
  );
}
