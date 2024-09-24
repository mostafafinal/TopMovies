import { Movies } from './../../models/movies';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarouselComponent } from '../carousel/carousel.component';
import { UserService } from './../../services/user.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    CarouselComponent,
    NgbTooltipModule,
  ],
})
export class HomePageComponent implements OnInit {
  allMovies: Movies[] = [];
  watchLater: string[] = [];
  favList: string[] = [];
  isLoading = true;
  loggedIn = sessionStorage.getItem('loggedIn');

  constructor(
    private movieService: MoviesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getWatchLaterList();
    this.getFavList();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getFavList() {
    this.userService.getUserFavList().subscribe((data) => {
      this.favList = Array.from(new Set(data.map((movie: any) => movie._id)));
    });
  }
  getWatchLaterList() {
    this.userService.getUserWatchLaterList().subscribe((data) => {
      this.watchLater = Array.from(
        new Set(data.map((movie: any) => movie._id))
      );
    });
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data;
      this.isLoading = false;
    });
  }

  addToWatahLater(movieId: string) {
    if (!this.watchLater.includes(movieId)) {
      this.watchLater.push(movieId);
      this.movieService.addMovieToWatahLater(movieId).subscribe((data) => {});
    } else {
      this.movieService.addMovieToWatahLater(movieId).subscribe((data) => {});
      this.watchLater = this.watchLater.filter((id) => id !== movieId);
    }
  }
  addToFavList(movieId: string) {
    if (!this.favList.includes(movieId)) {
      this.favList.push(movieId);
      this.movieService.addMovieToFavList(movieId).subscribe((data) => {});
    } else {
      this.movieService.addMovieToFavList(movieId).subscribe((data) => {});
      this.favList = this.favList.filter((id) => id !== movieId);
    }
  }
}
