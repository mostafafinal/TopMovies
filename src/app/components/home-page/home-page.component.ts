import { Movies } from './../../models/movies';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule],
})
export class HomePageComponent implements OnInit {
  allMovies: Movies[] = [];
  isLoading = true;

  constructor(
    private movieService: MoviesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getMovies();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data.map((movie: Movies) => {
        return {
          ...movie,
          genres: JSON.parse(movie.genres[0]), // Parse genres string into an array
        };
      });
      this.isLoading = false; // Set loading to false once data is fetched
      console.log(this.allMovies); // Log after the data is fully updated
    });
  }

  trackByMovieId(movie: any): number {
    return movie.id;
  }
}
