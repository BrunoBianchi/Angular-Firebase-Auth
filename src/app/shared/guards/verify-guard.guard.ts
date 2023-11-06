import { CanActivateFn } from '@angular/router';

export const verifyGuardGuard: CanActivateFn = (route, state) => {
  console.log(route.url);
  return true;
};
