import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../Storage';

export default function CustomerInfoPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Storage);
  const {
    userInfo,
    cart: { customerInformation },
  } = state;

  const [fName, setFName] = useState(customerInformation.fName || '');
  const [address, setAddress] = useState(customerInformation.address || '');
  const [city, setCity] = useState(customerInformation.city || '');
  const [pCode, setPCode] = useState(customerInformation.pCode || '');
  const [country, setCountry] = useState(customerInformation.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_CUSTOMER_INFORMATION',
      payload: {
        fName,
        address,
        city,
        pCode,
        country,
      },
    });
    localStorage.setItem(
      'customerInformation',
      JSON.stringify({
        fName,
        address,
        city,
        pCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Info</title>
      </Helmet>
      <div className="contaienr s-container">
        <h1 className="my-3"> Customer Info </h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="pCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={pCode}
              onChange={(e) => setPCode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
