import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProductDetail extends Component {
  state = {
    product: {},
    err: null,
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    axios
      .get('http://localhost:4000/api/product/' + id)
      .then((res) =>
        this.setState({
          product: res.data.message,
        })
      )
      .catch((err) =>
        this.setState({
          err: { ...err.response },
        })
      );
  }
  render() {
    return (
      <div className="">
        <h1 className="text-center">
          product details for {this.state.product.name}
        </h1>

        <div className="container my-5 ">
          <Card className="d-flex justify-content-center shadow">
            <Card.Img
              variant="top"
              src={`http://localhost:4000/${this.state.product.productImg}`}
            />
            <Card.Body>
              <Card.Title>{this.state.product.name}</Card.Title>
              <Card.Text>{this.state.product.description}</Card.Text>
              <Button
                variant="secondary"
                as={Link}
                to={'/product/' + this.state.product._id}
              >
                edit
              </Button>
              <Button
                variant="danger"
                className="mx-2"
                as={Link}
                to={'/product/' + this.state.product._id}
              >
                delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
