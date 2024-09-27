import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule, NgbTooltip],
  templateUrl: './forlater-page.component.html',
  styleUrl: './forlater-page.component.css',
})
export class ForLaterPageComponent implements OnInit {
  forLaters: Movies[] = [];
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getForLaters();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  getForLaters() {
    this.userService.getUserWatchLaterList().subscribe((laters: Movies[]) => {
      this.forLaters = laters;
    });
  }

  removeForLater(movieId: string) {
    this.userService.removeForLater(movieId).subscribe(() => {
      this.forLaters = this.forLaters.filter((id) => id._id !== movieId);
    });
  }
}
