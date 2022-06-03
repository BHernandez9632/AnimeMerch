import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Merch(props) {
  const { merch } = props;
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
        <Button>Add Cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Merch;
