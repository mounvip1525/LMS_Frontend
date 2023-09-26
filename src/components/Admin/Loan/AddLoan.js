import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Form, Button } from "react-bootstrap";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";

export default function AddLoan() {

  const [formData, setFormData] = useState({
    loanId: "",
    loanType: "Electronics",
    loanDurationYrs: ""
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loancard = location.state;

    if (loancard) {
      setFormData({
        loanId: loancard.loanId,
        loanType: loancard.loanType,
        loanDurationYrs: loancard.loanDurationYrs
      })
    }
  }, []);

  const handleOnSubmit = async (event) => {
    // event.preventDefault();
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
      await fetch(SERVER_URL + Url.ADD_LOANCARD, {
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
            setAlertMessage("Loan Card was not added!");
            setTimeout(() => { }, 100);
            setAlert(true);
            setErr(true);
          }
        });
      setFormData({
        loanId: "",
        loanType: "Electronics",
        loanDurationYrs: ""
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
    <div className="container ">
      <AdminSidebar activeLink="addLoan" />
      <div className="formBox">
        <h2 className="mb-0">Add Loan Card</h2>
        <p style={{ color: "grey" }}>Add a Loan Card to the collection</p>
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
                <Form.Label>Loan ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="loanId"
                  value={formData.loanId}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid loan ID!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Loan Type</Form.Label>
                <Form.Select
                  aria-label="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Automobiles">Automobiles</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Loan Duration in years</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="loanDurationYrs"
                  value={formData.loanDurationYrs}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the loan duration in years!
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <Button type="submit">Add Data</Button>
        </Form>
      </div>
    </div>
  );
}
