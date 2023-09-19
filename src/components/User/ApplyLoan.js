import React, { useState } from "react";
import "../../styles/Home.css";
import "../../styles/Form.css"
import UserSidebar from "./Sidebar";
import { SERVER_URL } from "../../config";
import { Url } from "../../Url";
import { Button, Form } from "react-bootstrap";

export default function ApplyLoan() {
  const [formData, setFormData] = useState({
    employeeId: "",
    itemCategory: "Electronics",
    itemDescription: "",
    itemValue: "",
    itemMake: "",
  });

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [err, setErr] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await fetch(SERVER_URL + Url.APPLY_LOAN, {
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
            setAlert(false);
          }, 5000);
        } else {
          setAlertMessage("Unable to apply for loan");
          setTimeout(() => {}, 100);
          setAlert(true);
          setErr(true);
        }
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container ">
      <UserSidebar activeLink="applyLoan" />
      <div className="formBox">
      <h2 className="mb-0">Apply Loan</h2>
      <p style={{ color: "grey" }}>Apply for a Loan</p>
      {alert && (
        <div
          className={err ? "alert alert-danger" : "alert alert-success"}
          role="alert"
        >
          {alertMessage}
        </div>
      )}
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Category</Form.Label>
              <Form.Select
                aria-label="itemCategory"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleInputChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Automobiles">Automobiles</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                type="text"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Value</Form.Label>
              <Form.Control
                type="text"
                name="itemValue"
                value={formData.itemValue}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Item Make</Form.Label>
              <Form.Control
                type="text"
                name="itemMake"
                value={formData.itemMake}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <Button type="submit">Apply</Button>
      </Form>
      </div>
    </div>
  );
}
