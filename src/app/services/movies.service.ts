import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AllMoives, Movies } from '../models/movies';


const options={
  params:{
    pages:'1',
  },
}
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl ='https://movie-app-production-bac6.up.railway.app/movie/movies';
  constructor(private http: HttpClient) {}

 getmoives():Observable<AllMoives>
 {
return this.http.get<any>(this.apiUrl, options)
  
 }
  
}
