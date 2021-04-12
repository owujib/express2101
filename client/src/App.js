import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigations from './components/Navigations';

import Home from './components/Home';
import { Route, Switch, withRouter } from 'react-router';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { authenticationService } from './services/authentication.service';
import { Role } from './helpers/Role';
import { PrivateRoute } from './components/PrivateRoute';

export class App extends Component {
  state = {
    products: [],

    currentUser: null,
    isAdmin: false,
  };

  componentDidMount() {
    //auth services
    authenticationService.currentUser.subscribe((user) =>
      this.setState({
        currentUser: user,
        isAdmin: user && user.role === Role.Admin,
      })
    );

    //fetch products
    axios
      .get('http://localhost:4000/api/product')
      .then((res) =>
        this.setState({
          products: res.data.message,
        })
      )
      .catch((err) => console.log(err));
  }

  logout = () => {
    authenticationService.logout();
    this.props.history.push('/login');
  };

  //
  render() {
    return (
      <div className="bg-light pb-5">
        <Navigations
          currentUser={this.state.currentUser}
          isAdmin={this.state.isAdmin}
          logout={this.logout}
        />
        <Switch>
          <PrivateRoute
            path="/"
            exact
            products={this.state.products}
            component={Home}
          />
          <PrivateRoute
            path="/new"
            products={this.state.products}
            exact
            component={AddProduct}
          />

          <PrivateRoute
            path="/products"
            products={this.state.products}
            exact
            component={ProductList}
          />
          <PrivateRoute
            path="/product/:id"
            exact
            products={this.state.products}
            component={ProductDetail}
          />
          <Route
            path="/login"
            render={(routerProps) => <Login {...routerProps} />}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
