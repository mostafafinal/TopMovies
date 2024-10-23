import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://movie-app-jhco.vercel.app';
  private data = signal(false);
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/auth/signIn`, {
      email,
      password,
    });
  }

  googleLogin(token: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/auth/google`, { token });
  }

  saveToken(token: string) {
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  clearToken(): void {
    sessionStorage.removeItem('authToken');
  }

  //login & logout state
  setData(update: boolean) {
    this.data.set(update);
  }
  getData() {
    return this.data;
  }
}
