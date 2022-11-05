import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import "./ManageProduct.css";
const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setIsLoading] = useState(true);

  const size = 12;
  useEffect(() => {
    fetch(
      `https://chronoclick.onrender.com/products?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setIsLoading(false);
      });
  }, [page]);
  const handleDelete = (product, id) => {
    fetch(`https://chronoclick.onrender.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("The item is Deleted Please Refresh");
          const remaining = products.filter(product._id !== id);
          setProducts(remaining);
          setIsLoading(true);
        }
      });
     setTimeout(() => {
       window.location.reload(true);
     }, 2000);
  };

  return (
    <>
      <div style={{ margin: 100 }}>
        <h2>Manage Product</h2>
        {loading && <Spinner animation="grow" />}
        {loading && <Spinner animation="grow" />}
        {loading && <Spinner animation="grow" />}
      </div>
      <div className="products-container manageProductContainer ">
        <Row xs={1} md={2} lg={3} className="g-2 ">
          {products.map((product) => (
            <Col>
              <Card className="product shadow-lg p-3 mb-5 smallCard rounded">
                <Card.Img variant="top" src={product.img} />
                <Card.Body>
                  <Card.Title className="Card-title">{product.name}</Card.Title>
                  <Card.Text>
                    price: $:{product.price} <br />
                    <div className="button">
                      <button
                        onClick={() => handleDelete(product, product._id)}
                        className="bbutton"
                      >
                        Delete
                      </button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? "selected" : ""}
            key={number}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ManageProduct;
