// token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginService); // You can inject services like this
  const token = authService.getToken();

  if (token) {
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`), // Template literal for token
    });
    return next(reqClone);
  }

  // if no token, continue without modification
  return next(req);
};
