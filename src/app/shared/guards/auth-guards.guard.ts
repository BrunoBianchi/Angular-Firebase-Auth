import { CanActivateFn } from '@angular/router';
import {AuthService }from '../services/auth.service';
import { Router } from "@angular/router";
export const authGuardsGuard: CanActivateFn = (route, state) => {
  let router = new Router();
  if(AuthService.loggedIn()) {
    return true;
  }else {
    router.navigateByUrl('/sign-in');
    return false;
  }
  };
