import React from 'react';
import { Row } from 'react-bootstrap';
import './Shop.css';
import Product from '../../Home/Product/Product';
import useProducts from '../../../hooks/useProducts';
import ProductSkeleton from '../../Shared/share/ProductSkeleton';

// Skeleton component to mimic the Product card

const Shop = () => {
  const [products, page, setPage, loading, pageCount] = useProducts();
  const size = 10; // Match the size from useProducts hook

  return (
    <>
      <div className="header">
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Find Your Watch</h2>
      </div>
      <div className="products-container">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
          {loading
            ? Array(size)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={`skeleton-${index}`} />
                ))
            : products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
        </Row>
      </div>

      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? 'selected' : ''}
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

export default Shop;
