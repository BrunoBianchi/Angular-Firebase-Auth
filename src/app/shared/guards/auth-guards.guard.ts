import { CanActivateFn } from '@angular/router';
import {AuthService }from '../services/auth.service';

export const authGuardsGuard: CanActivateFn = (route, state) => {
  return AuthService.loggedIn();
};
