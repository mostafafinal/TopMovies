import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    PaginatorModule,
    NgbTooltip,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent implements OnInit {
  AllMoives: Movies[] = [];
  filteredMovies: Movies[] = [];
  typeMoives: string[] = [];
  watchLater: string[] = [];
  favList: string[] = [];
  totalMovies: number = 133;
  currentPage: number = 1;
  limit: number = 20;
  pages: number = 7;
  loggedIn = sessionStorage.getItem('loggedIn');
  constructor(
    private movieService: MoviesService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.subscribe((params: Params) => {
      this.limit = +params['limit'] || 20;
      this.currentPage = +params['page'] || 1;
      this.fetchMovies(this.limit, this.currentPage);
    });
    this.getWatchLaterList();
    this.getFavList();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  fetchMovies(limit: number, page: number): void {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    this.movieService.getMovies().subscribe((data) => {
      this.totalMovies = data.length;
      this.AllMoives = data.slice(startIndex, endIndex);
      this.filteredMovies = [...this.AllMoives];

      this.typeMoives = [];
      this.AllMoives.forEach((movie) => {
        this.typeMoives.push(...movie.genres);
      });
    });
  }

  changePage(event: any): void {
    this.currentPage = event.page + 1;
    this.router.navigate([], {
      queryParams: { limit: this.limit, page: this.currentPage },
      queryParamsHandling: 'merge',
    });
    this.fetchMovies(this.limit, this.currentPage);
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
