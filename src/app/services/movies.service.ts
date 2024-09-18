import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private allMoviesApiUrl =
    'https://movie-app-production-bac6.up.railway.app/movie/movies';
  private movieDetailsApiUrl =
    'https://movie-app-production-bac6.up.railway.app/movie';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.allMoviesApiUrl);
  }

  getMoviesById(id: string): Observable<Movies> {
    return this.http.get<Movies>(`${this.movieDetailsApiUrl}/${id}`);
  }

  addMovieToWatahLater(movieId: String): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers)
    return this.http.put<any>(`http://localhost:3000/user/watctLater/${movieId}`,{}, {headers})
  }
  addMovieToFavList(movieId: String): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/user/favList/${movieId}`, {})
  }
}
