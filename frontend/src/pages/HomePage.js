import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
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
      <h1>Featured Anime Merch</h1>
      <div className="merchs">
        {loading ? (
          <div> Loading Page... </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          merchs.map((merch) => (
            <div className="merch" key={merch.slug}>
              <Link to={`/merch/${merch.slug}`}>
                <img src={merch.image} alt={merch.name} />
              </Link>
              <div className="merch-info">
                <Link to={`/merch/${merch.slug}`}>
                  <p>{merch.name}</p>
                </Link>
                <p>${merch.price}</p>
                <button> Add to cart </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default HomePage;
