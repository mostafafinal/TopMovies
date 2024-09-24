import { Component } from '@angular/core';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HomePageComponent } from '../home-page/home-page.component';
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
      this.favMovies = Array.from(new Set(data.map((movie: any) => movie._id)));
    });
  }
  getWatchLaterList() {
    this.userService.getUserWatchLaterList().subscribe((data) => {
      this.watchLaterMovies = Array.from(
        new Set(data.map((movie: any) => movie._id))
      );
    });
  }

  addToWatahLater(movieId: string) {
    if (!this.watchLaterMovies.includes(movieId)) {
      this.watchLaterMovies.push(movieId);
      this.movieService.addMovieToWatahLater(movieId).subscribe((data) => {});
    } else {
      this.movieService.addMovieToWatahLater(movieId).subscribe((data) => {});
      this.watchLaterMovies = this.watchLaterMovies.filter(
        (id) => id !== movieId
      );
    }
  }
  addToFavList(movieId: string) {
    if (!this.favMovies.includes(movieId)) {
      this.favMovies.push(movieId);
      this.movieService.addMovieToFavList(movieId).subscribe((data) => {});
    } else {
      this.movieService.addMovieToFavList(movieId).subscribe((data) => {});
      this.favMovies = this.favMovies.filter((id) => id !== movieId);
    }
  }

  // isFavorite(movie: Movies): boolean {
  //   this.userService.getUserFavList().subscribe((data: Movies[]) => {
  //     this.favMovies = data;
  //   });

  //   return this.favMovies.some((m) => m._id === movie._id);
  // }

  // addToWatahLater(movieId: String) {
  //   this.movieService.addMovieToWatahLater(movieId).subscribe();
  // }

  // addToFavList(movieId: String) {
  //   this.movieService.addMovieToFavList(movieId).subscribe();
  // }

  // isWatchLater(movie: Movies): boolean {
  //   this.userService.getUserWatchLaterList().subscribe((data: Movies[]) => {
  //     this.watchLaterMovies = data;
  //   });
  //   return this.watchLaterMovies.some((m) => m._id === movie._id);
  // }

  // deleteFromFavList(movieId: String) {
  //   this.movieService.deleteMovieFromFavList(movieId).subscribe();
  // }

  // deleteFromWatchLater(movieId: String): void {
  //   this.movieService.deleteMovieFromWatchLater(movieId).subscribe();
  // }
}
