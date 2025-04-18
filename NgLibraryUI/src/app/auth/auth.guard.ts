import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if(authService.isLoggedIn()) {
    return true;
  } else {
    
    // Redirect to the login page if not logged in
    router.navigateByUrl('/login');
    return false;
  }
};
