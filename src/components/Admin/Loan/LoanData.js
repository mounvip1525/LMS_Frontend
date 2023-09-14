import React, {useState,useEffect} from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function LoanData() {

  const [loancards, setLoancards] = useState([]);

  useEffect (() => {
    fetch(SERVER_URL + Url.GET_LOANCARDS)
    .then((response) => response.json())
    .then((loancardsData) => setLoancards(loancardsData))
    .catch((err) => console.log("Error in fetching loan cards! " + err.message))
    }, []);

  return (
    <div className="container ">
      <AdminSidebar activeLink="allLoans"/>
      <div className="formBox tableBox">
        <h2 className="mb-0">Loan Cards Data</h2>
        <p style={{ color: "grey" }}>View, edit and delete loan cards here</p>
        <Table responsive striped="columns" bordered size="sm" className="mb-3">
          <thead>
            <tr>
              <th>Loan_ID</th>
              <th>Loan_Duration_In_Years</th>
              <th>Loan_Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loancards && loancards.map((loancard) => (
              <tr>
                <td>{loancard.loanId}</td>
                <td>{loancard.loanType}</td>
                <td>{loancard.loanDurationYrs}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ marginRight: "4px" }}
                  />
                  <FontAwesomeIcon icon={faEdit} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
