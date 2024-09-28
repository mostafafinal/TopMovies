import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from '../../../services/movies.service';
import { Rating } from '../../../models/rating';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class NgbdModalContent {
  constructor(private moviesService: MoviesService) {}
  activeModal = inject(NgbActiveModal);

  rating = 0;
  @Input() movieId!: string;

  addRate() {
    this.moviesService
      .addMovieRate(this.movieId, this.rating)
      .subscribe((data: Rating) => {
        this.activeModal.close(data.movie);
      });
  }
}
