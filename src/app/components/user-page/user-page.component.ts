import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../models/movies';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: false,
    autoplaySpeed: 1000,
    navText: ['', ''],
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
    nav: false,
  };

  user: any = {};
  movies: Movies[] = [];
  watch: Movies[] = [];
  favMovies: Movies[] = [];

  constructor(
    private userService: UserService,
    private movieService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.getFavList();
    this.getWatchLaterList();
  }

  loadUser(): void {
    this.userService.getUserData().subscribe((data) => {
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
