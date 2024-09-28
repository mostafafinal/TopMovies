import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Movies } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://movie-app-production-bac6.up.railway.app';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/`);
  }
  getUserPaginatedFavs(limit: number, page: number): Observable<Movies[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<Movies[]>(`${this.apiUrl}/user/favList`, { params });
  }
  getUserFavList(): Observable<Movies[]> {
    return this.http.get<Movies[]>(`${this.apiUrl}/user/favList`);
  }
  getUserPaginatedWatchLaters(
    limit: number,
    page: number
  ): Observable<Movies[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<Movies[]>(`${this.apiUrl}/user/watctLater`, {
      params,
    });
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
