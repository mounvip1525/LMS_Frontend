import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import UserSidebar from "./Sidebar";
import { Url } from "../../Url";
import { SERVER_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
// Form and Home css

export default function ViewLoans() {
  const [viewLoanCard, setViewLoanCard]= useState([]);
  const { user } = useAuth();

  useEffect (() => {
    fetch(SERVER_URL + Url.GET_EMP_LOANCARD+"?emplId="+user.empId)
    .then((response) => response.json())
    .then((loanCard) => setViewLoanCard(loanCard))
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
          {viewLoanCard && viewLoanCard.map((data) => (
              <tr>
                <td>{data.loanCard.loanId}</td>
                <td>{data.loanCard.loanType}</td>
                <td>{data.loanCard.loanDurationYrs}</td>
                <td>{data.cardIssueDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
