import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = () => {
  if (inject(LoginService).getToken() !== null) {
    return true;
  } else {
    inject(Router).navigate(['/notfound']);
    return false;
  }
};

export const LoggedInGuard: CanActivateFn = () => {
  if (inject(LoginService).getToken() !== null) {
    inject(Router).navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
