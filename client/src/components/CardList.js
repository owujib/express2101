import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CardList({ _id, name, productImg, description }) {
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={`http://localhost:4000/${productImg}`} />
        <Card.Body>
          <Card.Title>
            <Link to={'/product/' + _id}>{name}</Link>
          </Card.Title>
          <Card.Text>{description.slice(0, 30)}</Card.Text>
          <Button variant="warning" as={Link} to={'/product/' + _id}>
            add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
