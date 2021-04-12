import React from 'react';
import { Route, Redirect } from 'react-router';

import { authenticationService } from '../services/authentication.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(routerProps) => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: routerProps.location } }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: '/' }} />;
        }

        // authorised so return component
        return <Component {...routerProps} {...rest} />;
      }}
    />
  );
};
