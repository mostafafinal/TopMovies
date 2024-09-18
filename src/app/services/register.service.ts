import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl =
    'https://movie-app-production-bac6.up.railway.app/auth/signUp';

  constructor(private http: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<Register> {
    return this.http.post<Register>(this.registerUrl, {
      firstName,
      lastName,
      email,
      password,
    });
  }
  static passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      return password && confirmPassword && password !== confirmPassword 
        ? { 'mismatch': true } 
        : null;
    };
  }
}

