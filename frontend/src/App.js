import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import MerchPage from './pages/MerchPage';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Storage } from './Storage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import CustomerInfoPage from './pages/CustomerInfoPage';
import PaymentPage from './pages/PaymentPage';
import SignUpPage from './pages/SignUpPage';
import OrderPage from './pages/OrderPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Storage);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('customerInformation');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="top-center" limit={1} />
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
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Account</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="orderhistory">
                      <NavDropdown.Item> Check History </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#logout"
                      onClick={logoutHandler}
                    >
                      Log Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Log In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-1">
            <Routes>
              <Route path="/merch/:slug" element={<MerchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<OrderPage />} />
              <Route path="/shipping" element={<CustomerInfoPage />} />
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
