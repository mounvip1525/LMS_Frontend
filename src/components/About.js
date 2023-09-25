import React from 'react'
import "../styles/Home.css";
import "../styles/Form.css";
import "../styles/About.css";
import about1 from "../images/about1.avif";
import about2 from "../images/about2.avif";
import about3 from "../images/about3.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faClockRotateLeft,
  faStar,
  faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container">

      <nav>
        <Link to="/admin/login">Admin</Link>
        <Link to="/user/login">User</Link>
      </nav>

      <h2>LUMA Loans</h2>
      <hr></hr>
      <p style={{marginTop:"1%"}}>Welcome to LUMA, where we've revolutionized the way GIS Global employees manage their benefits.</p>

      <div className='about-content'>
        <div>
          <img src={about1} alt="About us" />
          <p style={{ textAlign: "left" }}>LUMA is a cutting-edge application designed exclusively for the valued employees of GIS Global. We understand that your comfort and convenience are paramount, and that's why we've crafted a platform that simplifies your shopping experience.</p>
        </div>
        <div>
          <p style={{ textAlign: "right", marginRight: "10px" }} >At LUMA, we empower GIS Global employees to access GIS Global Mart with ease. Here, you can browse, select, and purchase a wide range of items, from furniture to stationary, and even crockery! But that's not all. We also offer a flexible loan option for these purchases, making your shopping experience smoother than ever.</p>
          <img src={about2} alt="What we do" />
        </div>
        <div>
          <img src={about3} alt="Loan cards made easy" />
          <p style={{ textAlign: "left" }} >GIS Global issues loan cards, each tailored to specific purchase categories. We understand that your needs may vary, so our system accommodates different loan types. Whether it's a loan for your home essentials or office supplies, we've got you covered. Plus, each loan comes with a specific repayment plan designed to suit your convenience.</p>
        </div>
      </div>

      <h3 style={{ marginTop: "1%" }}>Our Features</h3><hr></hr>
      <div className='about-features'>
        <div>
          <FontAwesomeIcon icon={faRightToBracket} />
          <p>User-Friendly Login</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faAddressCard} />
          <p>Comprehensive Card Management</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faStar} />
          <p>Effortless Loan Application</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <p>Purchase History</p>
        </div>
      </div>
    </div>
  )
}
