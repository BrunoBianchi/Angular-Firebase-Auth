import { CanActivateFn } from '@angular/router';
import {AuthService }from '../services/auth.service';
export const logoutGuardGuard: CanActivateFn = (route, state) => {
  AuthService.logout();
  return true;
};
