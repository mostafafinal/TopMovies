import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    NgbTooltip,
    NgbPaginationModule,
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent implements OnInit {
  favorites: Movies[] = [];
  limit: number = 20;
  currentPage: number = 1;
  totalFavs: number = 0;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getAllFavs();
    this.getFavorites(this.limit, this.currentPage);
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  getFavorites(limit: number, page: number) {
    this.userService
      .getUserPaginatedFavs(limit, page)
      .subscribe((favs: Movies[]) => {
        this.favorites = favs;
      });
  }

  changePage(event: number): void {
    this.getFavorites(this.limit, event);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 400);
  }

  getAllFavs() {
    this.userService.getUserFavList().subscribe((favs: Movies[]) => {
      this.totalFavs = favs.length;
    });
  }

  removeFavorite(movieId: string) {
    this.userService.removeFavorites(movieId).subscribe(() => {
      this.favorites = this.favorites.filter((id) => id._id !== movieId);
    });
  }
}
