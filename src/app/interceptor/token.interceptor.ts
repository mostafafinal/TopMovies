import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('token'); // Get the token from local storage
  //   // console.log(localStorage.getItem('token'));
  //   console.log('Interceptor executed. Token:', token);
  //   // If the token exists, clone the request and add the Authorization header
  //   if (token) {
  //     const authReq = req.clone({
  //       setHeaders: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return next.handle(authReq); // Pass the cloned request to the next handler
  //   }

  // If there's no token, pass the request as is
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const reqClone = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(reqClone);
    }
    // if no token
    return next.handle(req);
  }
}
