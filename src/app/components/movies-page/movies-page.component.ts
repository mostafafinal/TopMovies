import { CommonModule } from '@angular/common';
import { Component, TrackByFunction } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, NgxSpinnerModule],
 
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  AllMoives: Movies[] = [];
  filteredMovies: Movies[] = [];
  typeMoives: string[] = [];
  totalMovies: number = 133;
  currentPage: number = 1;
  limit: number = 20;
  trackByMovieId: TrackByFunction<Movies> = (index: number, movie: Movies) =>
    movie._id;

  constructor(
    private movieService: MoviesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fetchMovies(this.currentPage);
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  fetchMovies(page: number): void {
    const startIndex = (page - 1) * this.limit;
    const endIndex = startIndex + this.limit;

    this.movieService.getMovies().subscribe((data) => {
      // pagination
      this.totalMovies = data.length;
      this.AllMoives = data.slice(startIndex, endIndex);
      this.filteredMovies = [...this.AllMoives];

      this.AllMoives.forEach((movie) => {
        this.typeMoives.push(...movie.genres);
      });
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchMovies(page);
  }

  filterByGenre(genre: string): void {
    this.movieService.getMoviesCategory(genre).subscribe({
      next: (response) => {
        this.filteredMovies = response.movies;
        console.log('done');
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetAll() {
    this.filteredMovies = this.AllMoives;
  }
}
