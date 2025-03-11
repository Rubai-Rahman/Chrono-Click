import { Card, Col } from 'react-bootstrap';

const ProductSkeleton = () => {
  return (
    <Col>
      <Card className="product shadow-lg p-3 mb-5 rounded">
        <div className="skeleton-image"></div>
        <Card.Body>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="button">
            <div className="bbutton skeleton-button"></div>
            <div className="bbutton skeleton-button"></div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default ProductSkeleton;
