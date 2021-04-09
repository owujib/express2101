import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  Button,
} from 'react-bootstrap';

export class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      productImg: null,
      price: '',
      description: '',
      colour: [],
      size: [],
      err: null,
    };

    this.colourRef = React.createRef(); //id

    this.handleColourRef = this.handleColourRef.bind(this);
  }

  handleColourRef() {
    this.setState({
      colour: [...this.state.colour, this.colourRef.current.value],
    });
    this.colourRef.current.value = '';

    console.log(this.state);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log(this.state.err?.data.message);
    return (
      <div>
        {this.state.err ? (
          <div className="alert alert-danger container">
            {this.state.err?.data.message}
          </div>
        ) : (
          ''
        )}
        <Container>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              let formData = new FormData(); //helps send multipart/form-data to my express server

              formData.append('productImg', this.state.productImg);
              formData.append('name', this.state.name);
              formData.append('price', this.state.price);
              formData.append('description', this.state.description);
              formData.append('colour', this.state.colour);
              formData.append('size', this.state.size);
              console.log(this.state);

              axios
                .post('http://localhost:4000/api/product/create', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => console.log(res))
                .catch((err) =>
                  this.setState({
                    err: { ...err.response },
                  })
                );
            }}
            encType="multipart/form-data"
          >
            <FormGroup>
              <FormControl
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                onChange={this.handleChange}
                value={this.state.price}
                name="price"
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                onChange={this.handleChange}
                value={this.state.colour}
                name="colour"
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                onChange={this.handleChange}
                value={this.state.size}
                name="size"
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="file"
                onChange={(e) => {
                  this.setState({
                    productImg: e.target.files[0],
                  });
                }}
              />
            </FormGroup>
            <FormGroup>
              <textarea
                className="form-control"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
                col="50"
                rows="10"
              ></textarea>
            </FormGroup>

            <Button type="submit" variant="info">
              add product
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddProduct;
