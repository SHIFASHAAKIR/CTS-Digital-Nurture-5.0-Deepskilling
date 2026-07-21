import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Step 75: check if a property isLoggedIn = true in an AuthService. Return true if logged in, otherwise navigate to '/' and return false.
  if (authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
