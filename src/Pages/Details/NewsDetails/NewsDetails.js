import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./NewsDetails.css";

const NewsDetails = () => {
  const { newsId } = useParams();
  const [newsDetails, setNewsDetails] = useState({});
  useEffect(() => {
    const url = `https://chronoclick.onrender.com/news/${newsId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNewsDetails(data));
  }, []);
  console.log(newsDetails);
  return (
    <Container className="navSetup">
      <Row gap={3}>
        <Col className="image  shadow-lg p-3 mb-5  rounded" sm={12} md={6}>
          <img src={newsDetails.img} alt="" />
        </Col>
        <Col className="newsDetails shadow-lg p-3" sm={12} md={6}>
          <h3>{newsDetails.name}</h3>
          <p>{newsDetails.details}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetails;
