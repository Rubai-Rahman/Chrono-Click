import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
import icon from "../../../images/favicon.png";

const Footer = () => {
  return (
    <footer>
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
      <Container>
        <div className="social my-5">
          <div className="icon">
            <img src={icon} alt="icon" />
            <span>CHRONO CLICK</span>
          </div>
        </div>
      </Container>
      <hr />
      <Container className="my-4">
        <Row>
          <Col>
            <div className="licenses">&copy;2022 Chrono Click</div>
          </Col>
          <Col>
            <div className="social">
              <a href="https://www.facebook.com/pri.abir.18">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
              <a href="https://www.instagram.com/">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a href="https://www.linkedin.com/in/rubai-rahman-116707216/">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
              <a href="https://twitter.com/home">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
