import React, { useState } from "react";
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
  const [err, setErr] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

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
          setAlertMessage("Item was NOT Added !!!!!!");
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
      <AdminSidebar activeLink="addItem"/>
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
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Item ID</Form.Label>
                <Form.Control
                  type="text"
                  name="itemId"
                  value={formData.itemId}
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
                <Form.Label>Item Make</Form.Label>
                <Form.Control
                  type="text"
                  name="itemMake"
                  value={formData.itemMake}
                  onChange={handleInputChange}
                />  
              </Form.Group>

            </div>

            <div>
              <Form.Group className="mb-3">
                <Form.Label>Item Valuation</Form.Label>
                <Form.Control
                  type="number"
                  name="itemValuation"
                  value={formData.itemValuation}
                  onChange={handleInputChange}
                />
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
