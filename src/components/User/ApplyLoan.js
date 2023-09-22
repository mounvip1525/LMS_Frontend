import React, { useEffect, useState } from "react";
import "../../styles/Home.css";
import "../../styles/Form.css"
import UserSidebar from "./Sidebar";
import { SERVER_URL } from "../../config";
import { Url } from "../../Url";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function ApplyLoan() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    employeeId: user.empId,
    itemCategory: "",
    itemDescription: "",
    itemValue: "",
    itemMake: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [err, setErr] = useState(false);
  const [itemCat, setItemCat] = useState([]);
  const [itemDesc, setItemDesc] = useState([]);

  useEffect(() => {
    fetch(SERVER_URL + Url.GET_ITEM_CATEGORIES)
    .then((response) => response.json())
    .then((data) => setItemCat(data))
    .catch((err) => console.log("Error in fetching Item Categories " + err.message))
  },[])

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
          setFormData({
            employeeId: user.empId,
            itemCategory: "",
            itemDescription: "",
            itemValue: "",
            itemMake: ""
          })
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

    if (name === "itemCategory") {
      fetch(SERVER_URL+Url.GET_ITEM_DESCRIPTION+"?itemCat="+value)
      .then((response) => response.json())
      .then((data) => setItemDesc(data))
      .catch((err) => console.log("Error in fetching Item Description " + err.message))
    }

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
                // onChange={handleInputChange}
                readOnly
                disabled
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
                <option>Select Item Category</option>
                {
                  itemCat.map((data) => (
                    <option value={data}>{data}</option>
                  ))
                }
                {/* <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Automobiles">Automobiles</option> */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Description</Form.Label>
              <Form.Select
                aria-label="itemDescription"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
              >
              <option>Select Item Description</option>
              {
                itemDesc.map((data) => (
                  <option value={data}>{data}</option>
                ))
              }
              </Form.Select>
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