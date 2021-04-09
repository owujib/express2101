import { Button, Col, Card, Row } from 'react-bootstrap';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardList from './CardList';

export class Home extends Component {
  render() {
    const { products } = this.props;

    const productList = products.slice(0, 3).map((product) => {
      return (
        <Col md={4}>
          <CardList {...product} />
        </Col>
      );
    });
    return (
      <div>
        <div className="jumbotron">
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            ratione veniam hic aliquid inventore labore, delectus voluptatem
            impedit, tenetur debitis illo reiciendis repellendus obcaecati? Ad
            beatae deleniti in, sint ipsam nostrum voluptatem fuga placeat.
          </p>

          <Button as={Link} to="/products">
            Readmore
          </Button>
        </div>

        <div>
          <h4 className="text-center">Latest products</h4>
          <Row>{productList}</Row>
        </div>
      </div>
    );
  }
}

export default Home;
