import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { Form, Button } from "react-bootstrap";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";

export default function AddItem() {
  const [formData, setFormData] = useState({
    itemId: "",
    itemCategory: "Electronics",
    itemDescription: "",
    itemMake: "",
    itemValuation: "",
    issueStatus: "Y"

  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const item = location.state;

    if (item) {
      setFormData({
        itemId: item.itemId,
        itemCategory: item.itemCategory,
        itemDescription: item.itemDescription,
        itemMake: item.itemMake,
        itemValuation: item.itemValuation,
        issueStatus: item.issueStatus
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
      await fetch(SERVER_URL + Url.ADD_ITEM, {
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
            setAlertMessage("Item was not added!");
            setTimeout(() => { }, 100);
            setAlert(true);
            setErr(true);
          }
        });
      setFormData({
        itemId: "",
        itemCategory: "Electronics",
        itemDescription: "",
        itemMake: "",
        itemValuation: "",
        issueStatus: "Y"
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
      <AdminSidebar activeLink="addItem" />
      <div className="formBox">
        <h2 className="mb-0">Add Item</h2>
        <p style={{ color: "grey" }}>Add an item to the catalogue</p>
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
                <Form.Label>Item ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid item ID!
                </Form.Control.Feedback>
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
                  required
                  type="text"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the item description!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Item Make</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="itemMake"
                  value={formData.itemMake}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the item make!
                </Form.Control.Feedback>
              </Form.Group>

            </div>

            <div>
              <Form.Group className="mb-3">
                <Form.Label>Item Valuation</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="itemValuation"
                  value={formData.itemValuation}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the item valuation!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Issue Status</Form.Label>
                <Form.Select
                  aria-label="issueStatus"
                  name="issueStatus"
                  value={formData.issueStatus}
                  onChange={handleInputChange}
                >
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </Form.Select>
              </Form.Group>

            </div>
          </div>

          <Button type="submit">Add Data</Button>
        </Form>
      </div>
    </div>
  );
}
