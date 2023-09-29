import React, { useState, useEffect } from "react";
import "../../../styles/Home.css";
import "../../../styles/Form.css";
import AdminSidebar from "../Sidebar";
import { SERVER_URL } from "../../../config";
import { Url } from "../../../Url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function LoanData() {

  const [loancards, setLoancards] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SERVER_URL + Url.GET_LOANCARDS)
      .then((response) => response.json())
      .then((loancardsData) => setLoancards(loancardsData))
      .catch((err) => console.log("Error in fetching loan cards! " + err.message))
  }, [update]);

  const handleDelete = async (e, loancard) => {
    e.preventDefault();

    await fetch(SERVER_URL + Url.DELETE_LOAN_CARD, {
      method: "POST",
      body: loancard.loanId,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUpdate((bool) => !bool);
          return response.text();
        }
      }
      )
      .then((data) => {
        if (data != null) {
          setAlertMessage(data);
          setAlert(true);
          setTimeout(() => {
            setAlert(false)
          }, 5000);
        } else {
          setAlertMessage("Loan Card was not deleted!");
          setAlert(true);
          setErr(true);
          setTimeout(() => {
            setAlert(false);
            setErr(false);
          }, 5000);
        }
      })
  };

  const handleEdit = async (e, loancard) => {
    e.preventDefault();

    await fetch(SERVER_URL + Url.DELETE_LOAN_CARD, {
      method: "POST",
      body: loancard.loanId,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((response) => {
        if (response.ok) {
          setUpdate((bool) => !bool);
          return response.text();
        }
      })

    navigate("/admin/loan/add", { replace: true, state: loancard });
  };

  return (
    <div className="container ">
      <AdminSidebar activeLink="allLoans" />
      <div className="formBox tableBox">
        <h2 className="mb-0">Loan Cards Data</h2>
        <p style={{ color: "grey" }}>View, edit and delete loan cards here</p>
        {alert && (
          <div
            className={err ? "alert alert-danger" : "alert alert-success"}
            role="alert"
          >
            {alertMessage}
          </div>
        )}
        <table className="lms-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Type</th>
              <th>Loan Duration(in yrs)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loancards.length > 0 ? loancards.map((loancard) => (
              <tr>
                <td>{loancard.loanId}</td>
                <td>{loancard.loanType}</td>
                <td>{loancard.loanDurationYrs}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ marginRight: "6px" }}
                    className="hand-icon"
                    onClick={(e) => handleDelete(e, loancard)}
                  />
                  <FontAwesomeIcon icon={faEdit}
                    className="hand-icon"
                    onClick={(e) => handleEdit(e, loancard)}
                  />
                </td>
              </tr>
            )) : <p>No Data Available</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
