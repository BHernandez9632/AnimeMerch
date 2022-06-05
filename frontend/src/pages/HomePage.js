import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Merch from '../sections/Products';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../sections/LoadingBox';
import MessageBox from '../sections/MessageBox';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, merchs: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, merchs }, dispatch] = useReducer(logger(reducer), {
    merchs: [],
    loading: true,
    error: '',
  });
  // const [merchs, setMerchs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/merchs');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ trype: 'FETCH_FAIL', payload: err.message });
      }

      // setMerchs(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>AnimeMerch</title>
      </Helmet>
      <h1>Anime Merch</h1>
      <div className="merchs">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {merchs.map((merch) => (
              <Col key={merch.slug} sm={6} md={5} lg={4} className="mb-2">
                <Merch merch={merch}></Merch>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomePage;
