import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigations from './components/Navigations';

import Home from './components/Home';
import { Route } from 'react-router';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

export class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/product')
      .then((res) =>
        this.setState({
          products: res.data.message,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Navigations />
        <Route
          path="/"
          exact
          render={(routerProps) => (
            <Home {...routerProps} products={this.state.products} />
          )}
        />
        <Route
          path="/new"
          exact
          render={(routerProps) => <AddProduct {...routerProps} />}
        />

        <Route
          path="/products"
          exact
          render={(routerProps) => (
            <ProductList {...routerProps} products={this.state.products} />
          )}
        />
        <Route
          path="/product/:id"
          exact
          render={(routerProps) => <ProductDetail {...routerProps} />}
        />
      </div>
    );
  }
}

export default App;
