import React from 'react';
import { Button, Col, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CardList({ _id, name, productImg, description }) {
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={`http://localhost:4000/${productImg}`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description.slice(0, 30)}</Card.Text>
          <Button variant="dark" as={Link} to={'/product/' + _id}>
            View more
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}