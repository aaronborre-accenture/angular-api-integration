import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const AuthenticatedGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const router: Router = inject(Router);
  return localStorage.getItem('token') ? router.createUrlTree(['/users/list']) : true
 
};