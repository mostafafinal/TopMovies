import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movies } from './../../models/movies';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, RouterModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class=" btn rounded-circle btn-outline-danger bi bi-arrow-left-circle-fill"></i>',
      '<i class=" btn rounded-circle btn-outline-danger bi bi-arrow-right-circle-fill"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
}
