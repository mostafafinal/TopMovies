import { Movies } from './../../models/movies';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarouselComponent } from '../carousel/carousel.component';
import { UserService } from './../../services/user.service';
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

  constructor(
    private movieService: MoviesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getMovies();
   
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  
 
  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.allMovies = data;
      this.isLoading = false;
    });
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


  trackByMovieId(movie: any): number {
    return movie.id;
  }
}
