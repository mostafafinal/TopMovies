import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from '../../../services/movies.service';


@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
  <div class='bg-dark p-3 rounded'>
		<div class="modal-header bg-dark ">
			<button type="button" class="btn-close " aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body text-light d-flex flex-column justify-content-center align-items-center">
    <ngb-rating [(rate)]="rating"  class="fs-1 text-danger"  />
    <hr />
    <pre>Rate: <b>{{ rating }}</b></pre>

		</div>
		<div class="d-flex justify-content-center">
			<button type="button" class="btn btn-danger" (click)="activeModal.close('Close click')" (click)="addRate()">Add rate</button>
		</div>
    </div>
	`,
  imports: [NgbRatingModule],

})
export class NgbdModalContent {
  constructor(private moviesService: MoviesService) { }
  activeModal = inject(NgbActiveModal);

  rating = 8;
  @Input() movieId!: string;

  addRate() {
    this.moviesService.addMovieRate(this.movieId, this.rating).subscribe((data) => {
      console.log(data);
    })
  }
}

