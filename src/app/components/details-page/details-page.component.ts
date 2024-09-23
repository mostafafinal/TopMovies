import { Component } from '@angular/core';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [NgxSpinnerModule, CommonModule, RouterModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent {
  movie: Movies = {} as Movies;
  allMovies: Movies[] = []
  recommendedMovies: Movies[] = [];
  genres: string[] = []

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

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
  }

}


