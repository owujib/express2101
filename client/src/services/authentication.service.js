import { BehaviorSubject } from 'rxjs';

import config from '../config';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('user'))
);

function login(username, password) {
  const data = { username, password };

  axios
    .get(`${config.SERVER_URL}/api/user/login`, data)
    .then((res) => res.data)
    .catch(({ response }) => {
      if (!response.statusText !== 'OK') {
        if ([401, 403].indexOf(response.status) !== -1) {
          //auto logout if 401 unauthorized or 403 forbidden response returned from api

          logout();
          window.location.reload(true);

          const error =
            (response.data && response.data.message) || response.statusText;
          return error;
        }
      }
    });
}

function logout() {
  //remove user from local storage to log user out
  localStorage.removeItem('user');
  currentUserSubject.next(null);
}

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
