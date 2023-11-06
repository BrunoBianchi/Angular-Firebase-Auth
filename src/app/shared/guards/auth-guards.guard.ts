import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
export const authGuardsGuard: CanActivateFn = (route, state) => {
  let router = new Router();
  let user = JSON.parse(localStorage.getItem('user')!!);
  if (user && user.emailVerified == false) {
    window.location.href = '/verify-email';
    return false;
  }
  if (AuthService.loggedIn()) {
    return true;
  } else {
    window.location.href = '/sign-in';
    return false;
  }
};
