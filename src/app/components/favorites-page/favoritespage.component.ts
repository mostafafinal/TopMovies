import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    PaginatorModule,
    NgbTooltip,
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent implements OnInit {
  favorites: Movies[] = [];
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getFavorites();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  getFavorites() {
    this.userService.getUserFavList().subscribe((favs: Movies[]) => {
      this.favorites = favs;
    });
  }

  removeFavorite(movieId: string) {
    this.userService.removeFavorites(movieId).subscribe(() => {
      this.favorites = this.favorites.filter((id) => id._id !== movieId);
    });
  }
}
