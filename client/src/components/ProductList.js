import React, { Component } from 'react';
import CardList from './CardList';
import { Row, Col } from 'react-bootstrap';
import { authenticationService } from '../services/authentication.service';

export class ProductList extends Component {
  render() {
    const { products } = this.props;
    const productList = products.map((product) => {
      return (
        <Col md={4}>
          <CardList {...product} />
        </Col>
      );
    });
    console.log(authenticationService.currentUserValue);
    return (
      <div>
        <Row>{productList}</Row>
      </div>
    );
  }
}

export default ProductList;
