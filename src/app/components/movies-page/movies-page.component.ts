import { CommonModule } from '@angular/common';
import { Component, TrackByFunction } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';
import { PaginationModule } from '../../models/pagination.module';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationModule, PaginationComponent],
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css'],
})
export class MoviesPageComponent {
  AllMoives: Movies[] = []; 
  filteredMovies: Movies[] = []; 
  typeMoives: string[] = [];
  totalMovies: number = 138;
  currentPage: number = 1;
  limit: number = 18;
  trackByMovieId: TrackByFunction<Movies> = (index: number, movie: Movies) => movie.id;


  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.fetchMovies(this.currentPage);
  }

  fetchMovies(page: number): void {
    const startIndex = (page - 1) * this.limit;
    const endIndex = startIndex + this.limit;

    this.movieService.getmoives().subscribe((data) => {
      // pagination
      this.totalMovies = data.movies.length;
      this.AllMoives = data.movies.slice(startIndex, endIndex);
      this.filteredMovies = [...this.AllMoives]; 
      
     
      this.AllMoives.forEach((movie) => {
        let genres = JSON.parse(movie.genres.toString());
        this.typeMoives.push(...genres); 
         
      });
      console.log(this.filteredMovies)
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchMovies(page);  
    
  }

  
  filterByGenre(genre: string): void {
    // console.log("hello")
    this.filteredMovies = this.AllMoives.filter(movie => {
      let genres = JSON.parse(movie.genres.toString());
      return genres.includes(genre);
    });
  }

  GetAll()
  {
    this.filteredMovies=this.AllMoives
  }
}
