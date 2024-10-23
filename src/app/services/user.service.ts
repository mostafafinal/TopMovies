import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Movies } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://movie-app-jhco.vercel.app';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/`);
  }
  getUserFavList(): Observable<Movies[]> {
    return this.http.get<Movies[]>(`${this.apiUrl}/user/favList`);
  }
  getUserWatchLaterList(): Observable<Movies[]> {
    return this.http.get<Movies[]>(`${this.apiUrl}/user/watctLater`);
  }
  removeFavorites(movieId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/user/favList/${movieId}`, {});
  }
  removeForLater(movieId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/user/watctLater/${movieId}`, {});
  }
}
