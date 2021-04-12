import { authenticationService } from '../services/authentication.service';

export function authHeader() {
  // return auth header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${urrentUser.token}` };
  } else {
    return {};
  }
}
