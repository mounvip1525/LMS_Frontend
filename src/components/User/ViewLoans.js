import React, {useState, useEffect} from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { Table, Button } from "react-bootstrap";

export default function ViewLoans() {
  const [loanCard, setLoanCard]= useState([]);

  useEffect (() => {
    fetch(SERVER_URL + Url.GET_EMP_LOANCARD)
    .then((response) => response.json())
    .then((loanCard) => setLoanCard(loanCard))
    .catch((err) => console.log("Error in fetching user Loan Cards " + err.message))
    }, []);

  return (
    <div className="container ">
      <UserSidebar activeLink="loanCards" />
      <div className="formBox tableBox">
        <h2 className="mb-0">Loan Cards Availed</h2>
        <p style={{ color: "grey" }}>View your loan cards here</p>
        <Table responsive striped="columns" bordered size="sm" className="mb-3">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Type</th>
              <th>Duration</th>
              <th>Card Issue date</th>
            </tr>
          </thead>
          <tbody>
          {loanCard && loanCard.map((loanCard) => (
              <tr>
                <td>{loanCard.loanId}</td>
                <td>{loanCard.loanType}</td>
                <td>{loanCard.duration}</td>
                <td>{loanCard.issueDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
