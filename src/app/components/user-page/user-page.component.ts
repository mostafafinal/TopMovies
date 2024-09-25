import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../models/movies';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { User } from '../../models/user';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule, NgxSpinnerModule],
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

  user: User = {} as User;
  movies: Movies[] = [];
  watch: Movies[] = [];
  favMovies: Movies[] = [];

  constructor(
    private userService: UserService,
    private movieService: MoviesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.loadUser();
    this.getFavList();
    this.getWatchLaterList();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  loadUser(): void {
    this.userService.getUserData().subscribe((data: User) => {
      this.user = {
        ...data,
        image:
          data.image ||
          'https://th.bing.com/th/id/OIP.UY0H6jNLhhjKymJWT6HsPwHaHa?rs=1&pid=ImgDetMain',
      };
    });
  }

  getFavList(): void {
    this.userService.getUserFavList().subscribe((data: Movies[]) => {
      this.favMovies = data;
    });
  }

  getWatchLaterList(): void {
    this.userService.getUserWatchLaterList().subscribe((data: Movies[]) => {
      this.watch = data;
    });
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((data: Movies[]) => {
      this.movies = data;
    });
  }
}
