import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MerchPage from './pages/MerchPage';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Storage } from './Storage';
import CartPage from './pages/CartPage';

function App() {
  const { state } = useContext(Storage);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="primary" varian="primary">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Anime Merch</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, b) => a + b.total, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-1">
            <Routes>
              <Route path="/merch/:slug" element={<MerchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
