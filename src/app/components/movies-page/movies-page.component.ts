import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  allMovies: Movies[] = [];

  trackByMovieId(movie: any): number {
    return movie.id;
  }
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data.movies;
      console.log(this.allMovies);
    });
  }
}
