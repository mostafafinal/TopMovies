import { CommonModule } from '@angular/common';
import { Component, TrackByFunction, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Params } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent,
    NgxSpinnerModule,
    PaginatorModule,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent implements OnInit {
  AllMoives: Movies[] = [];
  filteredMovies: Movies[] = [];
  typeMoives: string[] = [];
  totalMovies: number = 133;
  currentPage: number = 1;
  limit: number = 20;
  pages: number = 7;
  trackByMovieId: TrackByFunction<Movies> = (index: number, movie: Movies) =>
    movie._id;

  constructor(
    private movieService: MoviesService,
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
}
