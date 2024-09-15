import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUser(login: Login) {
    throw new Error('Method not implemented.');
  }


  private loginUrl =
    'https://movie-app-production-bac6.up.railway.app/auth/signIn';
    constructor(private http: HttpClient) {}


    login(email: string, password: string): Observable<Login> {
      return this.http.post<Login>(this.loginUrl, { email, password });
    }
    
    

    // return this.http.post<Login>(this.loginUrl, {username, password});
}
