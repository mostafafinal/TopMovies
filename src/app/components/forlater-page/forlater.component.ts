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
  templateUrl: './forlater-page.component.html',
  styleUrl: './forlater-page.component.css',
})
export class ForLaterPageComponent implements OnInit {
  forLaters: Movies[] = [];
  limit: number = 12;
  currentPage: number = 1;
  totalForLaters: number = 0;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getAllFavs();
    this.getForLaters(this.limit, this.currentPage);

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  getForLaters(limit: number, page: number) {
    this.userService
      .getUserPaginatedWatchLaters(limit, page)
      .subscribe((laters: Movies[]) => {
        this.forLaters = laters;
      });
  }

  changePage(event: number): void {
    this.getForLaters(this.limit, event);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 400);
  }

  getAllFavs() {
    this.userService
      .getUserWatchLaterList()
      .subscribe((forlaters: Movies[]) => {
        this.totalForLaters = forlaters.length;
      });
  }

  removeForLater(movieId: string) {
    this.userService.removeForLater(movieId).subscribe(() => {
      this.forLaters = this.forLaters.filter((id) => id._id !== movieId);
    });
  }
}
