
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../models/movies';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user: any = {};
  movies: Movies[] = [];
  watch: Movies[] = [];
  favMovies: Movies[] = [];

  constructor(
    private userService: UserService,
    private movieService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.getFavList();
    this.getWatchLaterList();
  }

  loadUser(): void {
    this.userService.getUserData().subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  getFavList(): void {
    this.userService.getUserFavList().subscribe((data: Movies[]) => {
      this.favMovies = data;
      console.log(this.favMovies);
    });
  }

  getWatchLaterList(): void {
    this.userService.getUserWatchLaterList().subscribe((data: Movies[]) => {
      this.watch = data;
      console.log(this.watch);
    });
  }


  getMovies(): void {
    this.movieService.getMovies().subscribe((data: Movies[]) => {
      this.movies = data;
    });
  }
}
