import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'https://movie-app-jhco.vercel.app';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(`${this.apiUrl}/movie/movies`);
  }

  getPaginatedMovies(limit: number, page: number): Observable<Movies[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<Movies[]>(`${this.apiUrl}/movie/movies`, { params });
  }

  getMoviesCategory(category: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/movie/category/${category}`);
  }

  getMoviesById(id: string): Observable<Movies> {
    return this.http.get<Movies>(`${this.apiUrl}/movie/${id}`);
  }

  addMovieToWatahLater(movieId: String): Observable<Movies> {
    return this.http.put<Movies>(
      `${this.apiUrl}/user/watctLater/${movieId}`,
      {}
    );
  }
  addMovieToFavList(movieId: String): Observable<Movies> {
    return this.http.put<Movies>(`${this.apiUrl}/user/favList/${movieId}`, {});
  }
}
