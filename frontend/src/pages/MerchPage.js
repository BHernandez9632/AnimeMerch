import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Rating from '../sections/Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, merch: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function MerchPage() {
  const area = useParams();
  const { slug } = area;
  const [{ loading, error, merch }, dispatch] = useReducer(reducer, {
    merch: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/merchs/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ trype: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div> Loading Page... </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={merch.image} alt={merch.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{merch.name}</title>
              </Helmet>
              <h1>{merch.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={merch.rating}
                numReviews={merch.numReviews}
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price : ${merch.price}</ListGroup.Item>

            <ListGroup.Item>
              Description: <p>{merch.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${merch.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {merch.stockCount > 0 ? (
                        <Badge bg="success">Stocked</Badge>
                      ) : (
                        <Badge bg="danger">Sold Out</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {merch.stockCount > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default MerchPage;
