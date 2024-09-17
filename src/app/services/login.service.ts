import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl =
    'https://movie-app-production-bac6.up.railway.app/auth/signIn';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(this.loginUrl, { email, password });
  }

   
    googleLogin(token: string): Observable<any> {
      return this.http.post('http://localhost:3000/auth/google', { token });
    }
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }
}
