import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/user/');
  }
  getUserFavList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/user/favList');
  }
  getUserWatchLaterList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/user/watctLater');
  }
}
