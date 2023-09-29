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
import { Button } from 'react-bootstrap';

export default function About() {
  return (
    <div className="about-container">

      <nav>
        <Button variant='primary'><Link to="/admin/login">Admin</Link></Button>
        <Button variant='primary'><Link to="/user/login">User</Link></Button>
      </nav>

      <h2>Lenders & Co.</h2>
      <hr></hr>
      <p style={{marginTop:"1%"}}>Welcome to Lenders & Co., where we've revolutionized the way GIS Global employees manage their benefits.</p>

      <div className='about-content'>
        <div>
          <img src={about1} alt="About us" />
          <p style={{ textAlign: "left" }}>We are a cutting-edge application designed exclusively for the valued employees of GIS Global. We understand that your comfort and convenience are paramount, and that's why we've crafted a platform that simplifies your shopping experience.</p>
        </div>
        <div>
          <p style={{ textAlign: "right", marginRight: "10px" }} >We make accessing GIS Global Mart easy. Browse, select, and buy a variety of items, including furniture, stationery, and crockery. Plus, enjoy flexible loans for a seamless shopping experience.</p>
          <img src={about2} alt="What we do" />
        </div>
        <div>
          <img src={about3} alt="Loan cards made easy" />
          <p style={{ textAlign: "left", marginLeft:"5px" }} >GIS Global offers custom loan cards for various purchase categories. Our system adapts to your needs with a range of loan types, whether it's for home essentials or office supplies. Each loan includes a tailored repayment plan for your convenience.</p>
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
