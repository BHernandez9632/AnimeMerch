import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Storage } from '../Storage';

function Merch(props) {
  const { merch } = props;

  const { state, dispatch: ctxDispatch } = useContext(Storage);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const merchLocated = cartItems.find((x) => x._id === merch._id);
    const total = merchLocated ? merchLocated.total + 1 : 1;
    const { data } = await axios.get(`/api/merchs/${item._id}`);
    if (data.stockCount < total) {
      window.alert('Out of Stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, total },
    });
  };
  return (
    <Card>
      <Link to={`/merch/${merch.slug}`}>
        <img src={merch.image} className="card-img-top" alt={merch.name} />
      </Link>
      <Card.Body>
        <Link to={`/merch/${merch.slug}`}>
          <Card.Title>{merch.name}</Card.Title>
        </Link>
        <Rating rating={merch.srating} review={merch.reviews} />
        <Card.Text>${merch.price}</Card.Text>
        {merch.stockCount === 0 ? (
          <Button variant="dark" disabled>
            Sold Out
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(merch)}>Add Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Merch;
