import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl =
    'https://movie-app-production-bac6.up.railway.app/movie/movies';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.apiUrl);
  }
}
