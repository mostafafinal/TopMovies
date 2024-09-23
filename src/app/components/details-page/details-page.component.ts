import { Component } from '@angular/core';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgxSpinnerModule, CommonModule, RouterModule, HomePageComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  movie: Movies = {} as Movies;
  allMovies: Movies[] = [];
  recommendedMovies: Movies[] = [];
  genres: string[] = [];
  favMovies: Movies[] = [];
  watchLaterMovies: Movies[] = [];

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
        // console.log(this.movie)
      });
    }
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data;



      this.filterRecommendedMovies();
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  filterRecommendedMovies(): void {
    this.recommendedMovies = this.allMovies
      .filter(m => {
        return m.genres.some((genre: string) => this.movie.genres.includes(genre));
      })
      .slice(0, 12);


    console.log(this.recommendedMovies);
  }

  isFavorite(movie: Movies): boolean {
    this.userService.getUserFavList().subscribe((data: Movies[]) => {
      this.favMovies = data;
    });

    return this.favMovies.some((m) => m._id === movie._id);
  }

  addToWatahLater(movieId: String) {
    this.movieService.addMovieToWatahLater(movieId).subscribe((data) => {
      console.log(data);
    });
  }

  addToFavList(movieId: String) {
    console.log(movieId);

    this.movieService.addMovieToFavList(movieId).subscribe((data) => {
      console.log(data);
    });
  }

  isWatchLater(movie: Movies): boolean {
    this.userService.getUserWatchLaterList().subscribe((data: Movies[]) => {
      this.watchLaterMovies = data;
    });
    return this.watchLaterMovies.some((m) => m._id === movie._id);
  }




  deleteFromFavList(movieId: String) {
    console.log(movieId);
    this.movieService.deleteMovieFromFavList(movieId).subscribe((data) => {
      console.log('Deleted from favorites:', data);
    });
  }

  deleteFromWatchLater(movieId: String): void {
    this.movieService.deleteMovieFromWatchLater(movieId).subscribe((data) => {
      console.log('Deleted from watch later:', data);
    });
  }

}
