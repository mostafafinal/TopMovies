import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    NgbTooltip,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent implements OnInit {
  AllMoives: Movies[] = [];
  filteredMovies: Movies[] = [];
  watchLater: string[] = [];
  favList: string[] = [];
  totalMovies: number = 0;
  currentPage: number = 1;
  limit: number = 20;
  pages: number = 4;
  loggedIn = sessionStorage.getItem('loggedIn');
  constructor(
    private movieService: MoviesService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.GetAllMovies();
    this.fetchMovies(this.limit, this.currentPage);
    this.getWatchLaterList();
    this.getFavList();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  fetchMovies(limit: number, page: number) {
    this.movieService.getPaginatedMovies(limit, page).subscribe((movies) => {
      this.AllMoives = movies;
      this.filteredMovies = [...this.AllMoives];
    });
  }

  changePage(event: number): void {
    this.fetchMovies(this.limit, event);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 400);
  }

  filterByGenre(genre: string): void {
    this.movieService.getMoviesCategory(genre).subscribe({
      next: (response) => {
        this.filteredMovies = response.movies;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetAll(): void {
    this.filteredMovies = this.AllMoives;
  }
  GetAllMovies(): void {
    this.movieService
      .getMovies()
      .subscribe((data) => (this.totalMovies = data.length));
  }

  getFavList() {
    this.userService.getUserFavList().subscribe((data) => {
      this.favList = Array.from(
        new Set(data.map((movie: Movies) => movie._id))
      );
    });
  }
  getWatchLaterList() {
    this.userService.getUserWatchLaterList().subscribe((data) => {
      this.watchLater = Array.from(
        new Set(data.map((movie: Movies) => movie._id))
      );
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
