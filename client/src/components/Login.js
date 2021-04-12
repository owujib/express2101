import React, { Component } from 'react';
import { FormControl, FormGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Redirect, withRouter } from 'react-router';
import { authenticationService } from '../services/authentication.service';

export class Login extends Component {
  // super(props);
  state = {
    show: false,
    err: null,

    success: false,
  };

  //  handleChange = (e) => {
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  // handleSubmit = (e) => {
  // e.preventDefault();
  // function timeConvert(n) {
  //   var num = n;
  //   var hours = num / 60;
  //   var rhours = Math.floor(hours);
  //   var minutes = (hours - rhours) * 60;
  //   var rminutes = Math.round(minutes);
  //   return (
  //     num +
  //     ' minutes = ' +
  //     rhours +
  //     ' hour(s) and ' +
  //     rminutes +
  //     ' minute(s).'
  //   );
  // }

  // console.log(timeConvert(1000));

  //   axios
  //     .post('http://localhost:4000/api/user/login', this.state)
  //     .then(({ data: { message, token } }) => {
  //       let newData = { ...message, token };
  //       let userData = JSON.stringify(newData);
  //       console.log(userData);
  //       localStorage.setItem('user', userData);
  //       this.setState({
  //         success: true,
  //       });
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         err: { ...err.response },
  //         show: true,
  //       });
  //     });
  // };
  render() {
    console.log(this.state);
    return (
      <div className="container w-50 mt-5">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required('email is required'),
            password: Yup.string().required('password is required'),
          })}
          onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
            setStatus();
            axios
              .post('http://localhost:4000/api/user/login', { email, password })
              .then(({ data: { message, token } }) => {
                let newData = { ...message, token };
                let userData = JSON.stringify(newData);
                console.log(userData);
                localStorage.setItem('user', userData);
                this.setState({
                  success: true,
                });
              })
              .catch(({ response }) => {
                setSubmitting(false);
                setStatus(response.data.message);
                this.setState({
                  show: true,
                  err: response,
                });
              });
          }}
        >
          {({
            errors,
            status,
            values,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              {status && this.state.show === true ? (
                <Alert
                  variant="danger"
                  onClose={() => this.setState({ show: false })}
                  dismissible
                >
                  <h3>{status}</h3>
                </Alert>
              ) : (
                ''
              )}

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    'form-control' +
                    (errors.email && touched.email ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    'form-control' +
                    (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Login
                </button>
                {isSubmitting && (
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
              </div>
              {this.state.success === true ? (
                <Redirect to={{ pathname: '/' }} />
              ) : (
                ''
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(Login);
