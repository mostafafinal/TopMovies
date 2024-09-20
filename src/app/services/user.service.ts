import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    // let headers = new HttpHeaders()
    // headers = headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.get<any>(
      'https://movie-app-production-bac6.up.railway.app/user/'
    );
  }
  getUserFavList(): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.append(
    //   'Authorization',
    //   `Bearer ${localStorage.getItem('authToken')}`
    // );

    return this.http.get<any>(
      'https://movie-app-production-bac6.up.railway.app/user/favList'
    );
  }
  getUserWatchLaterList(): Observable<any> {
    // let headers = new HttpHeaders();
    // headers = headers.append(
    //   'Authorization',
    //   `Bearer ${localStorage.getItem('authToken')}`
    // );
    return this.http.get<any>(
      'https://movie-app-production-bac6.up.railway.app/user/watctLater'
    );
  }
}
