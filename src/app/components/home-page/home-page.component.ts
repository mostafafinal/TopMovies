import { Movies } from './../../models/movies';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesPageComponent } from '../movies-page/movies-page.component';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule, CarouselComponent],
})
export class HomePageComponent implements OnInit {
  allMovies: Movies[] = [];
  isLoading = true;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data.map((movie: any) => {
        return {
          ...movie,
          genres: JSON.parse(movie.genres[0]),
        };
      });
      this.isLoading = false;
      console.log(this.allMovies);
    });
  }

  trackByMovieId(movie: any): number {
    return movie.id;
  }
}
