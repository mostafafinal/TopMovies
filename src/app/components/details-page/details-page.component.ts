import { Component } from '@angular/core';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgxSpinnerModule, CommonModule, RouterModule, NgbTooltipModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  movie: Movies = {} as Movies;
  allMovies: Movies[] = [];
  recommendedMovies: Movies[] = [];
  genres: string[] = [];
  favMovies: string[] = [];
  watchLaterMovies: string[] = [];
  loggedIn = sessionStorage.getItem('loggedIn');

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMoviesById(id).subscribe((movie) => {
        this.movie = movie;
      });
    }
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data;
      this.filterRecommendedMovies();
    });
    this.getWatchLaterList();
    this.getFavList();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  filterRecommendedMovies(): void {
    this.recommendedMovies = this.allMovies
      .filter((m) => {
        return m.genres.some((genre: string) =>
          this.movie.genres.includes(genre)
        );
      })
      .slice(0, 12);
  }

  getFavList() {
    this.userService.getUserFavList().subscribe((data) => {
      this.favMovies = Array.from(
        new Set(data.map((movie: Movies) => movie._id))
      );
    });
  }
  getWatchLaterList() {
    this.userService.getUserWatchLaterList().subscribe((data) => {
      this.watchLaterMovies = Array.from(
        new Set(data.map((movie: Movies) => movie._id))
      );
    });
  }

  addToWatahLater(movieId: string) {
    if (!this.watchLaterMovies.includes(movieId)) {
      this.watchLaterMovies.push(movieId);
      this.movieService.addMovieToWatahLater(movieId).subscribe();
    } else {
      this.movieService.addMovieToWatahLater(movieId).subscribe();
      this.watchLaterMovies = this.watchLaterMovies.filter(
        (id) => id !== movieId
      );
    }
  }
  addToFavList(movieId: string) {
    if (!this.favMovies.includes(movieId)) {
      this.favMovies.push(movieId);
      this.movieService.addMovieToFavList(movieId).subscribe();
    } else {
      this.movieService.addMovieToFavList(movieId).subscribe();
      this.favMovies = this.favMovies.filter((id) => id !== movieId);
    }
  }
}
