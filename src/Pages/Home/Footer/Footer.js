import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <Container className="footer">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          <div className="row">
            <div className="col-6 col-lg-3">
              <ul>
                <li>
                  <h2>Information</h2>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Shipping Details
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Information
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-3">
              <ul>
                <li>
                  <h2>My Account</h2>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Return Centre
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Deliveries
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-3">
              <ul>
                <li>
                  <h2>Help</h2>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Search Terms
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Advanced Search
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Help & FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Store Locations
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Orders and Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-3">
              <ul>
                <li>
                  <h2>Support</h2>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Chat Support
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    E-mail Support
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    24/7 Support
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Customer Stories
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: 15,
                      color: "#181714",
                    }}
                    to="#"
                  >
                    Term of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
