import React, {useState} from "react";
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
  const [err, setErr] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

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
      <AdminSidebar activeLink="addLoan"/>
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
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Loan ID</Form.Label>
                <Form.Control
                  type="text"
                  name="loanId"
                  value={formData.loanId}
                  onChange={handleInputChange}
                />
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
                  type="number"
                  name="loanDurationYrs"
                  value={formData.loanDurationYrs}
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
